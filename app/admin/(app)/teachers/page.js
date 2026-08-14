"use client";

import { useCallback, useEffect, useState } from "react";
import { IconPlus, IconAlertCircle, IconCircleCheck } from "@tabler/icons-react";
import SortableTable from "@/components/admin/SortableTable";
import AddTeacherModal from "@/components/admin/AddTeacherModal";
import { getAdminTeachers } from "@/lib/adminApi";
import { getAdminToken } from "@/lib/adminAuth";

const columns = [
  { key: "name", label: "Name" },
  { key: "email", label: "Email", render: (row) => row.email || "—" },
  { key: "phone", label: "Phone" },
  { key: "assignedStudentCount", label: "Students" },
];

function TeachersTableSkeleton() {
  return (
    <div className="overflow-hidden rounded-md border border-border">
      <div className="h-11 border-b border-border bg-muted" />
      {[0, 1, 2, 3, 4].map((row) => (
        <div key={row} className="flex items-center gap-6 border-b border-border px-3 py-3 last:border-b-0">
          <div className="h-4 w-32 animate-pulse rounded bg-muted" />
          <div className="h-4 w-40 animate-pulse rounded bg-muted" />
          <div className="h-4 w-28 animate-pulse rounded bg-muted" />
          <div className="h-4 w-12 animate-pulse rounded bg-muted" />
        </div>
      ))}
    </div>
  );
}

export default function TeachersPage() {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);

  const load = useCallback(async () => {
    const token = getAdminToken();
    if (!token) return;
    setError(null);
    try {
      const res = await getAdminTeachers(token);
      setTeachers(res.teachers);
    } catch (err) {
      setError(err.message || "Could not load teachers.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  function handleCreated(newTeacher) {
    setShowForm(false);
    setSuccessMessage(`${newTeacher.name} was added.`);
    load();
    window.setTimeout(() => setSuccessMessage(null), 4000);
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-8 lg:px-10">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Teachers</h1>
          <p className="mt-1 text-sm text-secondary">
            {loading ? "Loading…" : `${teachers.length} teacher${teachers.length === 1 ? "" : "s"}`}
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="inline-flex h-11 items-center gap-2 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          <IconPlus size={18} stroke={2} aria-hidden="true" />
          Add Teacher
        </button>
      </div>

      {successMessage ? (
        <div role="status" className="mb-4 flex items-center gap-2 rounded-md bg-success-soft px-4 py-3 text-sm text-success">
          <IconCircleCheck size={18} stroke={2} aria-hidden="true" />
          {successMessage}
        </div>
      ) : null}

      {loading ? (
        <TeachersTableSkeleton />
      ) : error ? (
        <div className="flex items-center gap-2 rounded-md bg-destructive-soft px-4 py-3 text-sm text-destructive">
          <IconAlertCircle size={18} stroke={2} aria-hidden="true" />
          {error}
        </div>
      ) : (
        <SortableTable columns={columns} rows={teachers} emptyMessage="No teachers yet — add one to get started." />
      )}

      {showForm ? <AddTeacherModal onClose={() => setShowForm(false)} onCreated={handleCreated} /> : null}
    </div>
  );
}
