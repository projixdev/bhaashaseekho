"use client";

import { useEffect, useRef, useState } from "react";
import { IconX } from "@tabler/icons-react";
import { createAdminTeacher, AdminApiError } from "@/lib/adminApi";
import { getAdminToken } from "@/lib/adminAuth";

// The backend reports a 409 as a plain message ("This phone number is
// already registered." / "This email is already registered to another
// account.") rather than a structured field name — both strings are ones
// this app controls (adminController.createTeacher), so matching on them
// here is reliable, not guesswork against unrelated text.
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

export default function AddTeacherModal({ onClose, onCreated }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const dialogRef = useRef(null);

  // Escape-to-close — the one piece of native <dialog> behavior worth
  // replicating by hand here; backdrop click (below) covers the other.
  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  async function handleSubmit(event) {
    event.preventDefault();
    setErrors({});
    setSubmitting(true);
    try {
      const token = getAdminToken();
      const res = await createAdminTeacher(token, {
        name: name.trim(),
        phone: phone.trim(),
        email: email.trim() || undefined,
      });
      onCreated(res.teacher);
    } catch (err) {
      if (err instanceof AdminApiError && err.errors) {
        setErrors(err.errors);
      } else if (err instanceof AdminApiError) {
        const field = fieldFromDuplicateMessage(err.message);
        setErrors(field ? { [field]: err.message } : { form: err.message });
      } else {
        setErrors({ form: "Could not create teacher. Please try again." });
      }
    } finally {
      setSubmitting(false);
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
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="add-teacher-title"
        className="w-full max-w-md rounded-lg border border-border bg-card p-6 shadow-xl"
      >
        <div className="mb-5 flex items-center justify-between">
          <h2 id="add-teacher-title" className="text-lg font-semibold text-card-foreground">
            Add Teacher
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

          <Field label="Email" hint="Optional — needed for the teacher to receive login codes" error={errors.email}>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="email"
              className={inputClassName(errors.email)}
            />
          </Field>

          <Field label="Phone" required hint="This is how the teacher logs in" error={errors.phone}>
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
              {submitting ? "Adding…" : "Add Teacher"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
