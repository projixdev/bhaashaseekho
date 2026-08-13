"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAdminTeachers, getAdminStudents, getAdminFeedback } from "@/lib/adminApi";
import { getAdminToken, clearAdminToken } from "@/lib/adminAuth";
import SortableTable from "@/components/admin/SortableTable";

const teacherColumns = [
  { key: "name", label: "Name" },
  { key: "phone", label: "Phone" },
  { key: "email", label: "Email", render: (r) => r.email || "—" },
  { key: "assignedStudentCount", label: "Students" },
  { key: "classesCompleted", label: "Completed" },
  { key: "classesScheduled", label: "Scheduled" },
];

const studentColumns = [
  { key: "name", label: "Name" },
  { key: "phone", label: "Phone" },
  { key: "email", label: "Email", render: (r) => r.email || "—" },
  { key: "completedClassCount", label: "Classes done" },
  { key: "assessmentsUnlocked", label: "Assessments", render: (r) => (r.assessmentsUnlocked ? "Unlocked" : "Locked") },
  { key: "homeworkSubmitted", label: "Homework", render: (r) => `${r.homeworkSubmitted}/${r.homeworkAssigned}` },
  {
    key: "assessmentSubmitted",
    label: "Assessments done",
    render: (r) => `${r.assessmentSubmitted}/${r.assessmentAssigned}`,
  },
  {
    key: "isTrial",
    label: "Trial",
    render: (r) => (r.isTrial ? `Yes, until ${new Date(r.accessExpiresAt).toLocaleDateString()}` : "No"),
  },
];

const feedbackColumns = [
  { key: "student", label: "Student" },
  { key: "tutor", label: "Tutor" },
  { key: "subject", label: "Class" },
  { key: "sentiment", label: "Sentiment", render: (r) => (r.sentiment === "agree" ? "👍 Good" : "👎 Not great") },
  { key: "comment", label: "Comment", render: (r) => r.comment || "—" },
  { key: "createdAt", label: "Date", render: (r) => new Date(r.createdAt).toLocaleDateString() },
];

function flattenStudent(s) {
  return {
    _id: s._id,
    name: s.name,
    phone: s.phone,
    email: s.email,
    completedClassCount: s.completedClassCount,
    assessmentsUnlocked: s.assessmentsUnlocked,
    homeworkSubmitted: s.homework.submitted,
    homeworkAssigned: s.homework.assigned,
    assessmentSubmitted: s.assessments.submitted,
    assessmentAssigned: s.assessments.assigned,
    isTrial: s.isTrial,
    accessExpiresAt: s.accessExpiresAt,
  };
}

function flattenFeedback(f) {
  return {
    _id: f._id,
    student: f.student?.name ?? "—",
    tutor: f.tutor?.name ?? "—",
    subject: f.class?.subject ?? "—",
    sentiment: f.sentiment,
    comment: f.comment,
    createdAt: f.createdAt,
  };
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);
  const [feedback, setFeedback] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = getAdminToken();
    // UX convenience only, not the security boundary — a missing/expired/
    // forged token still gets a real 401/403 from every call below
    // regardless of this check; requireAdmin on the backend is what
    // actually protects the data.
    if (!token) {
      router.replace("/admin/login");
      return;
    }

    Promise.all([getAdminTeachers(token), getAdminStudents(token), getAdminFeedback(token)])
      .then(([teachersRes, studentsRes, feedbackRes]) => {
        setTeachers(teachersRes.teachers);
        setStudents(studentsRes.students.map(flattenStudent));
        setFeedback(feedbackRes.feedback.map(flattenFeedback));
      })
      .catch((err) => {
        // An expired/invalid/forged token surfaces here as a 401/403 from
        // the API — treated the same as "not logged in."
        clearAdminToken();
        setError(err.message);
        router.replace("/admin/login");
      })
      .finally(() => setLoading(false));
  }, [router]);

  function handleLogout() {
    clearAdminToken();
    router.replace("/admin/login");
  }

  if (loading) {
    return <p className="px-4 py-16 text-center text-sm text-secondary">Loading…</p>;
  }

  if (error) {
    return <p className="px-4 py-16 text-center text-sm text-destructive">{error}</p>;
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="font-heading text-2xl font-semibold text-foreground">Admin dashboard</h1>
        <button
          onClick={handleLogout}
          className="cursor-pointer rounded-md border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-muted"
        >
          Log out
        </button>
      </div>

      <section className="mb-10">
        <h2 className="mb-3 font-heading text-lg font-semibold text-foreground">Teachers</h2>
        <SortableTable columns={teacherColumns} rows={teachers} emptyMessage="No teachers yet." />
      </section>

      <section className="mb-10">
        <h2 className="mb-3 font-heading text-lg font-semibold text-foreground">Students</h2>
        <SortableTable columns={studentColumns} rows={students} emptyMessage="No students yet." />
      </section>

      <section>
        <h2 className="mb-3 font-heading text-lg font-semibold text-foreground">Feedback</h2>
        <SortableTable columns={feedbackColumns} rows={feedback} emptyMessage="No feedback yet." />
      </section>
    </div>
  );
}
