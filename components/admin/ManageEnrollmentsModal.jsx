"use client";

import { useEffect, useState } from "react";
import { IconX, IconCheck, IconTrash } from "@tabler/icons-react";
import {
  AdminApiError,
  getAdminTeachers,
  createAdminEnrollment,
  reassignAdminEnrollmentTutor,
  deleteAdminEnrollment,
} from "@/lib/adminApi";
import { getAdminToken } from "@/lib/adminAuth";
import { getCourseLabel } from "@/data/enrollmentCourses";
import CourseSelector, { newCourseRow } from "./CourseSelector";

// The "founder teaches the first few classes, then hands off to a
// permanent tutor" workflow (scripts/createUser.js --course/--tutor +
// scripts/assignTutor.js), as dashboard actions instead of CLI-only. Phase
// 21 extended this with the same language/sub-course taxonomy and tutor
// picker the Add Student form uses (CourseSelector), plus removing a course
// entirely — the one piece that didn't already exist in any form.
export default function ManageEnrollmentsModal({ student, onClose, onChanged }) {
  const [teachers, setTeachers] = useState([]);
  const [loadingTeachers, setLoadingTeachers] = useState(true);
  const [enrollments, setEnrollments] = useState(student.teachers ?? []);
  const [reassigning, setReassigning] = useState({});
  const [savingId, setSavingId] = useState(null);
  const [confirmingRemoveId, setConfirmingRemoveId] = useState(null);
  const [removingId, setRemovingId] = useState(null);
  const [error, setError] = useState(null);

  const [newRows, setNewRows] = useState([newCourseRow()]);
  const [enrolling, setEnrolling] = useState(false);
  const [enrollErrors, setEnrollErrors] = useState({});

  useEffect(() => {
    const token = getAdminToken();
    getAdminTeachers(token)
      .then((res) => setTeachers(res.teachers.filter((t) => t.isActive !== false)))
      .catch(() => setError("Could not load teachers."))
      .finally(() => setLoadingTeachers(false));
  }, []);

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  async function handleReassign(enrollmentId) {
    const tutorId = reassigning[enrollmentId];
    if (!tutorId) return;
    setSavingId(enrollmentId);
    setError(null);
    try {
      const token = getAdminToken();
      const res = await reassignAdminEnrollmentTutor(token, enrollmentId, { tutorId });
      setEnrollments((current) =>
        current.map((e) =>
          e.enrollmentId === enrollmentId ? { ...e, tutorId: res.enrollment.tutorId, name: res.enrollment.tutorName } : e
        )
      );
      setReassigning((current) => {
        const next = { ...current };
        delete next[enrollmentId];
        return next;
      });
      onChanged();
    } catch (err) {
      setError(err instanceof AdminApiError ? err.message : "Could not reassign teacher.");
    } finally {
      setSavingId(null);
    }
  }

  async function handleRemove(enrollmentId) {
    setRemovingId(enrollmentId);
    setError(null);
    try {
      const token = getAdminToken();
      await deleteAdminEnrollment(token, enrollmentId);
      setEnrollments((current) => current.filter((e) => e.enrollmentId !== enrollmentId));
      setConfirmingRemoveId(null);
      onChanged();
    } catch (err) {
      setError(err instanceof AdminApiError ? err.message : "Could not remove this course.");
    } finally {
      setRemovingId(null);
    }
  }

  async function handleEnroll(event) {
    event.preventDefault();
    setEnrollErrors({});

    const activeRows = newRows.filter((row) => row.courseSlug);
    if (activeRows.length === 0) return;

    // createAdminEnrollment (below) is a single-course endpoint, unlike the
    // Add Student form's bulk create — so the "every selected course needs
    // a tutor" check that endpoint gets for free has to happen here instead,
    // before any of the rows are submitted.
    const rowErrors = {};
    newRows.forEach((row, index) => {
      if (row.courseSlug && !row.tutorId) rowErrors[`courses.${index}.tutorId`] = "A tutor is required for every selected course.";
    });
    if (Object.keys(rowErrors).length > 0) {
      setEnrollErrors(rowErrors);
      return;
    }

    setEnrolling(true);
    try {
      const token = getAdminToken();
      // Sequential, not Promise.all — same reasoning as
      // adminController.createStudent's own loop server-side: each
      // enrollment succeeding before the next request starts keeps error
      // attribution simple (which row failed) at this scale.
      for (const row of activeRows) {
        const res = await createAdminEnrollment(token, student._id, { courseSlug: row.courseSlug, tutorId: row.tutorId });
        setEnrollments((current) => {
          const withoutSameCourse = current.filter((e) => e.courseSlug !== res.enrollment.courseSlug);
          return [
            ...withoutSameCourse,
            {
              enrollmentId: res.enrollment._id,
              courseSlug: res.enrollment.courseSlug,
              tutorId: res.enrollment.tutorId,
              name: res.enrollment.tutorName,
            },
          ];
        });
      }
      setNewRows([newCourseRow()]);
      onChanged();
    } catch (err) {
      setError(err instanceof AdminApiError ? err.message : "Could not enroll student.");
    } finally {
      setEnrolling(false);
    }
  }

  return (
    <div
      role="presentation"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="enrollments-title"
        className="w-full max-w-lg rounded-lg border border-border bg-card p-6 shadow-xl"
      >
        <div className="mb-5 flex items-center justify-between">
          <h2 id="enrollments-title" className="text-lg font-semibold text-card-foreground">
            Enrollments — {student.name}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex h-9 w-9 items-center justify-center rounded-md text-secondary transition-colors hover:bg-muted hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring"
          >
            <IconX size={20} stroke={2} />
          </button>
        </div>

        {error ? (
          <p role="alert" className="mb-4 text-sm text-destructive">
            {error}
          </p>
        ) : null}

        <div className="mb-6 flex flex-col gap-3">
          {enrollments.length === 0 ? (
            <p className="text-sm text-secondary">Not enrolled in any course yet.</p>
          ) : (
            enrollments.map((e) => (
              <div key={e.enrollmentId} className="rounded-md border border-border p-3">
                <div className="mb-2 flex items-center justify-between gap-2">
                  <p className="text-sm font-medium text-foreground">{getCourseLabel(e.courseSlug)}</p>
                  {confirmingRemoveId === e.enrollmentId ? (
                    <div className="flex shrink-0 items-center gap-1.5">
                      <span className="text-xs text-secondary">Remove?</span>
                      <button
                        type="button"
                        disabled={removingId === e.enrollmentId}
                        onClick={() => handleRemove(e.enrollmentId)}
                        className="rounded-md border border-destructive bg-destructive-soft px-2 py-1 text-xs font-medium text-destructive transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {removingId === e.enrollmentId ? "Removing…" : "Confirm"}
                      </button>
                      <button
                        type="button"
                        onClick={() => setConfirmingRemoveId(null)}
                        className="rounded-md border border-border px-2 py-1 text-xs font-medium text-foreground transition-colors hover:bg-muted"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setConfirmingRemoveId(e.enrollmentId)}
                      aria-label={`Remove ${getCourseLabel(e.courseSlug)}`}
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-secondary transition-colors hover:bg-destructive-soft hover:text-destructive focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring"
                    >
                      <IconTrash size={16} stroke={1.75} aria-hidden="true" />
                    </button>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <select
                    value={reassigning[e.enrollmentId] ?? e.tutorId ?? ""}
                    onChange={(event) => setReassigning((current) => ({ ...current, [e.enrollmentId]: event.target.value }))}
                    disabled={loadingTeachers}
                    className="h-10 flex-1 rounded-md border border-border bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    {teachers.map((t) => (
                      <option key={t._id} value={t._id}>
                        {t.name}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    disabled={savingId === e.enrollmentId || !reassigning[e.enrollmentId] || reassigning[e.enrollmentId] === e.tutorId}
                    onClick={() => handleReassign(e.enrollmentId)}
                    aria-label={`Save new teacher for ${getCourseLabel(e.courseSlug)}`}
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <IconCheck size={18} stroke={2} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <form onSubmit={handleEnroll} className="flex flex-col gap-3 border-t border-border pt-5">
          <CourseSelector rows={newRows} onChange={setNewRows} teachers={teachers} errors={enrollErrors} />

          <button
            type="submit"
            disabled={enrolling}
            className="h-11 rounded-md bg-primary text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {enrolling ? "Enrolling…" : "Enroll"}
          </button>
        </form>
      </div>
    </div>
  );
}
