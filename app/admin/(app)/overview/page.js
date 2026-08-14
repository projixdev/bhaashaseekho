"use client";

import { useEffect, useState } from "react";
import { IconChalkboardTeacher, IconSchool, IconCircleCheck, IconMessage2 } from "@tabler/icons-react";
import StatCard from "@/components/admin/StatCard";
import { getAdminTeachers, getAdminStudents, getAdminFeedback } from "@/lib/adminApi";
import { getAdminToken } from "@/lib/adminAuth";

// Rolling 7 days, not calendar-week (Mon-Sun vs Sun-Sat) — avoids a
// timezone/week-start convention nobody asked for. "This week" in the UI
// label, 7*24h under the hood.
const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;

export default function OverviewPage() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = getAdminToken();
    if (!token) return;

    Promise.all([getAdminTeachers(token), getAdminStudents(token), getAdminFeedback(token)])
      .then(([teachersRes, studentsRes, feedbackRes]) => {
        const totalClassesCompleted = teachersRes.teachers.reduce((sum, t) => sum + t.classesCompleted, 0);
        const feedbackThisWeek = feedbackRes.feedback.filter(
          (f) => Date.now() - new Date(f.createdAt).getTime() <= SEVEN_DAYS_MS
        ).length;

        setStats({
          totalTeachers: teachersRes.teachers.length,
          totalStudents: studentsRes.students.length,
          totalClassesCompleted,
          feedbackThisWeek,
        });
      })
      .catch((err) => setError(err.message || "Could not load overview."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="mx-auto max-w-6xl px-6 py-8 lg:px-10">
      <h1 className="mb-6 text-2xl font-semibold text-foreground">Overview</h1>

      {error ? (
        <div className="flex items-center gap-2 rounded-md bg-destructive-soft px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard icon={IconChalkboardTeacher} label="Total Teachers" value={stats?.totalTeachers} loading={loading} />
          <StatCard icon={IconSchool} label="Total Students" value={stats?.totalStudents} loading={loading} />
          <StatCard
            icon={IconCircleCheck}
            label="Classes Completed"
            value={stats?.totalClassesCompleted}
            loading={loading}
          />
          <StatCard icon={IconMessage2} label="Feedback This Week" value={stats?.feedbackThisWeek} loading={loading} />
        </div>
      )}
    </div>
  );
}
