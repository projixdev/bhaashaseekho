"use client";

import { useState } from "react";
import { IconAlertTriangle, IconX } from "@tabler/icons-react";
import { AdminApiError } from "@/lib/adminApi";
import { getAdminToken } from "@/lib/adminAuth";

// Shared deactivate confirmation for both Teachers and Students — soft
// delete (isActive: false), blocked by the backend with a 409 when the
// account still has an active enrollment. Matching UserFormModal/
// AddTeacherModal's own substring-matching idiom for turning a backend
// message into UI state (fieldFromDuplicateMessage) rather than a second,
// parallel error-code contract: a 409 mentioning "force=true" flips this
// into a "deactivate anyway" retry rather than a dead end.
export default function ConfirmDeactivateModal({ role, user, deactivateFn, onClose, onDeactivated }) {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [needsForce, setNeedsForce] = useState(false);

  async function handleConfirm(force) {
    setSubmitting(true);
    setError(null);
    try {
      const token = getAdminToken();
      await deactivateFn(token, user._id, { force });
      onDeactivated(user._id);
    } catch (err) {
      if (err instanceof AdminApiError) {
        setError(err.message);
        setNeedsForce(!force && err.message.toLowerCase().includes("force=true"));
      } else {
        setError("Could not deactivate. Please try again.");
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
        role="dialog"
        aria-modal="true"
        aria-labelledby="deactivate-title"
        className="w-full max-w-sm rounded-lg border border-border bg-card p-6 shadow-xl"
      >
        <div className="mb-4 flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-destructive-soft">
              <IconAlertTriangle size={18} stroke={2} className="text-destructive" aria-hidden="true" />
            </span>
            <h2 id="deactivate-title" className="text-base font-semibold text-card-foreground">
              Deactivate {user.name}?
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md text-secondary transition-colors hover:bg-muted hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring"
          >
            <IconX size={20} stroke={2} />
          </button>
        </div>

        <p className="mb-4 text-sm text-secondary">
          {role === "teacher"
            ? "They'll no longer be selectable for new classes or assignments. Their history stays intact and this can be undone."
            : "They'll be marked inactive. Their history stays intact and this can be undone."}
        </p>

        {error ? (
          <p role="alert" className="mb-4 text-sm text-destructive">
            {error}
          </p>
        ) : null}

        <div className="flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="h-11 flex-1 rounded-md border border-border text-sm font-medium text-foreground transition-colors hover:bg-muted"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={submitting}
            onClick={() => handleConfirm(needsForce)}
            className="h-11 flex-1 rounded-md border border-destructive bg-destructive-soft text-sm font-medium text-destructive transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? "Deactivating…" : needsForce ? "Deactivate anyway" : "Deactivate"}
          </button>
        </div>
      </div>
    </div>
  );
}
