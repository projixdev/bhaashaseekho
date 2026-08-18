"use client";

import { useCallback, useEffect, useState } from "react";
import { IconPlus, IconAlertCircle, IconCircleCheck, IconPencil, IconUserOff, IconUserCheck } from "@tabler/icons-react";
import SortableTable from "@/components/admin/SortableTable";
import AddTeacherModal from "@/components/admin/AddTeacherModal";
import UserFormModal from "@/components/admin/UserFormModal";
import ConfirmDeactivateModal from "@/components/admin/ConfirmDeactivateModal";
import { AdminApiError, getAdminTeachers, deleteAdminTeacher, reactivateAdminTeacher } from "@/lib/adminApi";
import { getAdminToken } from "@/lib/adminAuth";

function StatusBadge({ isActive }) {
  if (isActive) return null;
  return (
    <span className="inline-flex items-center whitespace-nowrap rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-secondary">
      Inactive
    </span>
  );
}

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
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState(null);
  const [deactivatingTeacher, setDeactivatingTeacher] = useState(null);
  const [reactivatingId, setReactivatingId] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [actionError, setActionError] = useState(null);

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

  function flashSuccess(message) {
    setSuccessMessage(message);
    window.setTimeout(() => setSuccessMessage(null), 4000);
  }

  function handleCreated(newTeacher) {
    setShowAddForm(false);
    flashSuccess(`${newTeacher.name} was added.`);
    load();
  }

  function handleSaved(updatedTeacher) {
    setEditingTeacher(null);
    flashSuccess(`${updatedTeacher.name} was updated.`);
    load();
  }

  function handleDeactivated() {
    const name = deactivatingTeacher?.name;
    setDeactivatingTeacher(null);
    flashSuccess(`${name} was deactivated.`);
    load();
  }

  async function handleReactivate(teacher) {
    setReactivatingId(teacher._id);
    setActionError(null);
    try {
      const token = getAdminToken();
      await reactivateAdminTeacher(token, teacher._id);
      flashSuccess(`${teacher.name} was reactivated.`);
      load();
    } catch (err) {
      setActionError(err instanceof AdminApiError ? err.message : "Could not reactivate this teacher.");
    } finally {
      setReactivatingId(null);
    }
  }

  const columns = [
    { key: "name", label: "Name" },
    { key: "email", label: "Email", render: (row) => row.email || "—" },
    { key: "phone", label: "Phone" },
    { key: "assignedStudentCount", label: "Students" },
    { key: "isActive", label: "Status", render: (row) => <StatusBadge isActive={row.isActive} /> },
    {
      key: "actions",
      label: "",
      render: (row) => (
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setEditingTeacher(row)}
            aria-label={`Edit ${row.name}`}
            className="flex h-8 w-8 items-center justify-center rounded-md text-secondary transition-colors hover:bg-muted hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring"
          >
            <IconPencil size={16} stroke={1.75} aria-hidden="true" />
          </button>
          {row.isActive ? (
            <button
              type="button"
              onClick={() => setDeactivatingTeacher(row)}
              aria-label={`Deactivate ${row.name}`}
              className="flex h-8 w-8 items-center justify-center rounded-md text-secondary transition-colors hover:bg-destructive-soft hover:text-destructive focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring"
            >
              <IconUserOff size={16} stroke={1.75} aria-hidden="true" />
            </button>
          ) : (
            <button
              type="button"
              disabled={reactivatingId === row._id}
              onClick={() => handleReactivate(row)}
              aria-label={`Reactivate ${row.name}`}
              className="flex h-8 w-8 items-center justify-center rounded-md text-secondary transition-colors hover:bg-success-soft hover:text-success focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring disabled:cursor-not-allowed disabled:opacity-50"
            >
              <IconUserCheck size={16} stroke={1.75} aria-hidden="true" />
            </button>
          )}
        </div>
      ),
    },
  ];

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
          onClick={() => setShowAddForm(true)}
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

      {actionError ? (
        <div role="alert" className="mb-4 flex items-center gap-2 rounded-md bg-destructive-soft px-4 py-3 text-sm text-destructive">
          <IconAlertCircle size={18} stroke={2} aria-hidden="true" />
          {actionError}
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
        <SortableTable
          columns={columns}
          rows={teachers}
          emptyMessage="No teachers yet — add one to get started."
          rowClassName={(row) => (row.isActive === false ? "opacity-60" : "")}
        />
      )}

      {showAddForm ? <AddTeacherModal onClose={() => setShowAddForm(false)} onCreated={handleCreated} /> : null}

      {editingTeacher ? (
        <UserFormModal
          mode="edit"
          role="teacher"
          user={editingTeacher}
          onClose={() => setEditingTeacher(null)}
          onSaved={handleSaved}
        />
      ) : null}

      {deactivatingTeacher ? (
        <ConfirmDeactivateModal
          role="teacher"
          user={deactivatingTeacher}
          deactivateFn={deleteAdminTeacher}
          onClose={() => setDeactivatingTeacher(null)}
          onDeactivated={handleDeactivated}
        />
      ) : null}
    </div>
  );
}
