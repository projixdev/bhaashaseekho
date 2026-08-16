"use client";

import { useEffect, useState } from "react";
import { IconX, IconCheck } from "@tabler/icons-react";
import { AdminApiError, getAdminTeachers, createAdminEnrollment, reassignAdminEnrollmentTutor } from "@/lib/adminApi";
import { getAdminToken } from "@/lib/adminAuth";

// Loosely coupled to this fixed list on purpose, matching the backend
// (adminController.createEnrollment doesn't validate against an enum
// either) and scripts/createUser.js/assignTutor.js before it — course
// content lives in the website repo's data/courses.js, not this database.
const COURSES = [
  { value: "kannada", label: "Kannada" },
  { value: "hindi", label: "Hindi" },
  { value: "telugu", label: "Telugu" },
];

function courseLabel(slug) {
  return COURSES.find((c) => c.value === slug)?.label ?? slug;
}

// The "founder teaches the first few classes, then hands off to a
// permanent tutor" workflow (scripts/createUser.js --course/--tutor +
// scripts/assignTutor.js), as dashboard actions instead of CLI-only.
export default function ManageEnrollmentsModal({ student, onClose, onChanged }) {
  const [teachers, setTeachers] = useState([]);
  const [loadingTeachers, setLoadingTeachers] = useState(true);
  const [enrollments, setEnrollments] = useState(student.teachers ?? []);
  const [reassigning, setReassigning] = useState({});
  const [savingId, setSavingId] = useState(null);
  const [error, setError] = useState(null);

  const [newCourse, setNewCourse] = useState("");
  const [newTutorId, setNewTutorId] = useState("");
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

  async function handleEnroll(event) {
    event.preventDefault();
    setEnrollErrors({});
    setEnrolling(true);
    try {
      const token = getAdminToken();
      const res = await createAdminEnrollment(token, student._id, { courseSlug: newCourse, tutorId: newTutorId });
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
      setNewCourse("");
      setNewTutorId("");
      onChanged();
    } catch (err) {
      if (err instanceof AdminApiError && err.errors) {
        setEnrollErrors(err.errors);
      } else {
        setError(err instanceof AdminApiError ? err.message : "Could not enroll student.");
      }
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
        className="w-full max-w-md rounded-lg border border-border bg-card p-6 shadow-xl"
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
                <p className="mb-2 text-sm font-medium text-foreground">{courseLabel(e.courseSlug)}</p>
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
                    aria-label={`Save new teacher for ${courseLabel(e.courseSlug)}`}
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
          <h3 className="text-sm font-semibold text-foreground">Enroll in a course</h3>

          <div className="flex flex-col gap-1">
            <select
              value={newCourse}
              onChange={(event) => setNewCourse(event.target.value)}
              required
              className={`h-11 rounded-md border bg-background px-3.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring ${
                enrollErrors.courseSlug ? "border-destructive" : "border-border"
              }`}
            >
              <option value="" disabled>
                Choose a course…
              </option>
              {COURSES.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
            {enrollErrors.courseSlug ? (
              <p role="alert" className="text-xs text-destructive">
                {enrollErrors.courseSlug}
              </p>
            ) : null}
          </div>

          <div className="flex flex-col gap-1">
            <select
              value={newTutorId}
              onChange={(event) => setNewTutorId(event.target.value)}
              required
              disabled={loadingTeachers}
              className={`h-11 rounded-md border bg-background px-3.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring ${
                enrollErrors.tutorId ? "border-destructive" : "border-border"
              }`}
            >
              <option value="" disabled>
                Choose a teacher…
              </option>
              {teachers.map((t) => (
                <option key={t._id} value={t._id}>
                  {t.name}
                </option>
              ))}
            </select>
            {enrollErrors.tutorId ? (
              <p role="alert" className="text-xs text-destructive">
                {enrollErrors.tutorId}
              </p>
            ) : null}
          </div>

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
