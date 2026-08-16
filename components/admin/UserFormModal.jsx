"use client";

import { useEffect, useState } from "react";
import { IconX } from "@tabler/icons-react";
import {
  AdminApiError,
  createAdminTeacher,
  updateAdminTeacher,
  createAdminStudent,
  updateAdminStudent,
} from "@/lib/adminApi";
import { getAdminToken } from "@/lib/adminAuth";

// Shared Add/Edit form for both Teachers and Students — the field shape
// (name/email/phone) and validation flow are identical either way, differing
// only in title, whether email is required (a student can't ever receive a
// login OTP without one; a teacher can be created without one and
// backfilled later, same as scripts/createUser.js), and which admin API
// function to call. Part 1's AddTeacherModal is left as its own separate
// component rather than folded into this one — this covers the three cases
// that are new: Edit Teacher, Add Student, Edit Student.
function fieldFromDuplicateMessage(message) {
  const lower = message.toLowerCase();
  if (lower.includes("email")) return "email";
  if (lower.includes("phone")) return "phone";
  return null;
}

function Field({ label, required, hint, error, children }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-foreground">
        {label}
        {required ? <span className="text-destructive"> *</span> : null}
      </label>
      {children}
      {hint && !error ? <p className="mt-1 text-xs text-secondary">{hint}</p> : null}
      {error ? (
        <p role="alert" className="mt-1 text-xs text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function inputClassName(hasError) {
  return `h-11 w-full rounded-md border bg-background px-3.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring ${
    hasError ? "border-destructive" : "border-border"
  }`;
}

const ROLE_LABEL = { teacher: "Teacher", student: "Student" };

export default function UserFormModal({ mode, role, user, onClose, onSaved }) {
  const [name, setName] = useState(user?.name ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [phone, setPhone] = useState(user?.phone ?? "");
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const emailRequired = role === "student";

  async function handleSubmit(event) {
    event.preventDefault();
    setErrors({});
    setSubmitting(true);
    try {
      const token = getAdminToken();
      // In edit mode, an empty email field is a deliberate signal (clears a
      // teacher's email; the student endpoint rejects it as required). In
      // create mode, empty just means "not provided" — undefined, not "".
      const body = {
        name: name.trim(),
        phone: phone.trim(),
        email: email.trim() || (mode === "create" ? undefined : ""),
      };

      let res;
      if (mode === "create") {
        res = role === "teacher" ? await createAdminTeacher(token, body) : await createAdminStudent(token, body);
      } else {
        res =
          role === "teacher"
            ? await updateAdminTeacher(token, user._id, body)
            : await updateAdminStudent(token, user._id, body);
      }
      onSaved(res.teacher ?? res.student);
    } catch (err) {
      if (err instanceof AdminApiError && err.errors) {
        setErrors(err.errors);
      } else if (err instanceof AdminApiError) {
        const field = fieldFromDuplicateMessage(err.message);
        setErrors(field ? { [field]: err.message } : { form: err.message });
      } else {
        setErrors({ form: `Could not save this ${ROLE_LABEL[role].toLowerCase()}. Please try again.` });
      }
    } finally {
      setSubmitting(false);
    }
  }

  const title = mode === "create" ? `Add ${ROLE_LABEL[role]}` : `Edit ${ROLE_LABEL[role]}`;

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
        aria-labelledby="user-form-title"
        className="w-full max-w-md rounded-lg border border-border bg-card p-6 shadow-xl"
      >
        <div className="mb-5 flex items-center justify-between">
          <h2 id="user-form-title" className="text-lg font-semibold text-card-foreground">
            {title}
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

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Field label="Name" required error={errors.name}>
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
              autoFocus
              autoComplete="name"
              className={inputClassName(errors.name)}
            />
          </Field>

          <Field
            label="Email"
            required={emailRequired}
            hint={
              emailRequired
                ? "Needed for the student to receive login codes"
                : "Optional — needed for the teacher to receive login codes"
            }
            error={errors.email}
          >
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required={emailRequired}
              autoComplete="email"
              className={inputClassName(errors.email)}
            />
          </Field>

          <Field label="Phone" required hint="This is how they log in" error={errors.phone}>
            <input
              type="tel"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              required
              autoComplete="tel"
              className={inputClassName(errors.phone)}
            />
          </Field>

          {errors.form ? (
            <p role="alert" className="text-sm text-destructive">
              {errors.form}
            </p>
          ) : null}

          <div className="mt-2 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="h-11 flex-1 rounded-md border border-border text-sm font-medium text-foreground transition-colors hover:bg-muted"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="h-11 flex-1 rounded-md bg-primary text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? "Saving…" : mode === "create" ? `Add ${ROLE_LABEL[role]}` : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
