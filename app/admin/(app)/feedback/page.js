"use client";

import { useEffect, useState } from "react";
import { IconAlertCircle } from "@tabler/icons-react";
import SortableTable from "@/components/admin/SortableTable";
import { getAdminFeedback } from "@/lib/adminApi";
import { getAdminToken } from "@/lib/adminAuth";

function formatDate(iso) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

function SentimentBadge({ sentiment }) {
  const isPositive = sentiment === "agree";
  return (
    <span
      className={`inline-flex items-center gap-1 whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-medium ${
        isPositive ? "bg-success-soft text-success" : "bg-destructive-soft text-destructive"
      }`}
    >
      {isPositive ? "👍 Good" : "👎 Not great"}
    </span>
  );
}

// class.subject + class.scheduledAt collapsed into one column (not two) to
// keep the table to a reasonable width — clicking it still sorts
// meaningfully (groups by subject, then date within subject).
function flattenFeedback(entry) {
  return {
    _id: entry._id,
    student: entry.student?.name ?? "—",
    teacher: entry.tutor?.name ?? "—",
    classLabel: entry.class ? `${entry.class.subject} · ${formatDate(entry.class.scheduledAt)}` : "—",
    sentiment: entry.sentiment,
    comment: entry.comment,
    createdAt: entry.createdAt,
  };
}

const columns = [
  { key: "student", label: "Student" },
  { key: "teacher", label: "Teacher" },
  { key: "classLabel", label: "Class" },
  { key: "sentiment", label: "Feedback", render: (row) => <SentimentBadge sentiment={row.sentiment} /> },
  { key: "comment", label: "Comment", render: (row) => row.comment || "—" },
  { key: "createdAt", label: "Submitted", render: (row) => formatDate(row.createdAt) },
];

function FeedbackTableSkeleton() {
  return (
    <div className="overflow-hidden rounded-md border border-border">
      <div className="h-11 border-b border-border bg-muted" />
      {[0, 1, 2, 3, 4].map((row) => (
        <div key={row} className="flex items-center gap-6 border-b border-border px-3 py-3 last:border-b-0">
          <div className="h-4 w-28 animate-pulse rounded bg-muted" />
          <div className="h-4 w-28 animate-pulse rounded bg-muted" />
          <div className="h-4 w-36 animate-pulse rounded bg-muted" />
          <div className="h-4 w-20 animate-pulse rounded bg-muted" />
          <div className="h-4 w-40 animate-pulse rounded bg-muted" />
        </div>
      ))}
    </div>
  );
}

export default function FeedbackPage() {
  const [feedback, setFeedback] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = getAdminToken();
    if (!token) return;
    getAdminFeedback(token)
      .then((res) => setFeedback(res.feedback.map(flattenFeedback)))
      .catch((err) => setError(err.message || "Could not load feedback."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="mx-auto max-w-6xl px-6 py-8 lg:px-10">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-foreground">Feedback</h1>
        <p className="mt-1 text-sm text-secondary">
          {loading ? "Loading…" : `${feedback.length} submission${feedback.length === 1 ? "" : "s"}`}
        </p>
      </div>

      {loading ? (
        <FeedbackTableSkeleton />
      ) : error ? (
        <div className="flex items-center gap-2 rounded-md bg-destructive-soft px-4 py-3 text-sm text-destructive">
          <IconAlertCircle size={18} stroke={2} aria-hidden="true" />
          {error}
        </div>
      ) : (
        <SortableTable
          columns={columns}
          rows={feedback}
          defaultSort={{ key: "createdAt", dir: "desc" }}
          emptyMessage="No feedback yet — check back after a class wraps up."
        />
      )}
    </div>
  );
}
