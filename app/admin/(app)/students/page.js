"use client";

import { useEffect, useState } from "react";
import { IconAlertCircle, IconClock, IconSend2, IconCircleCheck, IconMinus } from "@tabler/icons-react";
import SortableTable from "@/components/admin/SortableTable";
import { getAdminStudents } from "@/lib/adminApi";
import { getAdminToken } from "@/lib/adminAuth";

// Every color pair here was checked with an actual contrast calculation
// (see the Teachers/Overview reports) — accent-soft's own base color
// wasn't dark enough to hit 4.5:1 against any light background, hence
// "warning" as its own darker token rather than reusing text-accent.
const STATUS_CONFIG = {
  pending: { label: "Pending", icon: IconClock, className: "bg-accent-soft text-warning" },
  submitted: { label: "Submitted", icon: IconSend2, className: "bg-info-soft text-info" },
  reviewed: { label: "Reviewed", icon: IconCircleCheck, className: "bg-success-soft text-success" },
  none: { label: "No assignments", icon: IconMinus, className: "bg-muted text-foreground" },
};

function AssignmentStatusBadge({ status }) {
  const config = STATUS_CONFIG[status] ?? STATUS_CONFIG.none;
  const Icon = config.icon;
  return (
    <span
      className={`inline-flex items-center gap-1 whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-medium ${config.className}`}
    >
      <Icon size={14} stroke={2} aria-hidden="true" />
      {config.label}
    </span>
  );
}

function AttendanceBadge({ completed, total, unlocked }) {
  return (
    <span
      className={`inline-flex items-center whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-medium ${
        unlocked ? "bg-success-soft text-success" : "bg-muted text-foreground"
      }`}
    >
      {completed}/{total} classes
    </span>
  );
}

function flattenStudent(s) {
  return {
    _id: s._id,
    name: s.name,
    phone: s.phone,
    teachersLabel: s.teachers.length > 0 ? s.teachers.map((t) => `${t.courseSlug} (${t.name ?? "—"})`).join(", ") : "—",
    completedClassCount: s.completedClassCount,
    assessmentsUnlockAt: s.assessmentsUnlockAt,
    assessmentsUnlocked: s.assessmentsUnlocked,
    assignmentStatus: s.assignmentStatus,
  };
}

const columns = [
  { key: "name", label: "Name" },
  { key: "phone", label: "Phone" },
  { key: "teachersLabel", label: "Teacher(s)" },
  {
    key: "completedClassCount",
    label: "Attendance",
    render: (row) => (
      <AttendanceBadge
        completed={row.completedClassCount}
        total={row.assessmentsUnlockAt}
        unlocked={row.assessmentsUnlocked}
      />
    ),
  },
  {
    key: "assignmentStatus",
    label: "Assignments",
    render: (row) => <AssignmentStatusBadge status={row.assignmentStatus} />,
  },
];

function StudentsTableSkeleton() {
  return (
    <div className="overflow-hidden rounded-md border border-border">
      <div className="h-11 border-b border-border bg-muted" />
      {[0, 1, 2, 3, 4].map((row) => (
        <div key={row} className="flex items-center gap-6 border-b border-border px-3 py-3 last:border-b-0">
          <div className="h-4 w-28 animate-pulse rounded bg-muted" />
          <div className="h-4 w-24 animate-pulse rounded bg-muted" />
          <div className="h-4 w-40 animate-pulse rounded bg-muted" />
          <div className="h-4 w-20 animate-pulse rounded bg-muted" />
          <div className="h-4 w-24 animate-pulse rounded bg-muted" />
        </div>
      ))}
    </div>
  );
}

export default function StudentsPage() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = getAdminToken();
    if (!token) return;
    getAdminStudents(token)
      .then((res) => setStudents(res.students.map(flattenStudent)))
      .catch((err) => setError(err.message || "Could not load students."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="mx-auto max-w-6xl px-6 py-8 lg:px-10">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-foreground">Students</h1>
        <p className="mt-1 text-sm text-secondary">
          {loading ? "Loading…" : `${students.length} student${students.length === 1 ? "" : "s"}`}
        </p>
      </div>

      {loading ? (
        <StudentsTableSkeleton />
      ) : error ? (
        <div className="flex items-center gap-2 rounded-md bg-destructive-soft px-4 py-3 text-sm text-destructive">
          <IconAlertCircle size={18} stroke={2} aria-hidden="true" />
          {error}
        </div>
      ) : (
        <SortableTable columns={columns} rows={students} emptyMessage="No students yet." />
      )}
    </div>
  );
}
