"use client";

import { LANGUAGES } from "@/data/enrollmentCourses";

// Shared by AddTeacherModal and UserFormModal's teacher-edit path (Phase
// 21) — which languages a teacher teaches, used to filter the tutor
// dropdown in the Add Student flow. Optional: a teacher with none checked
// still shows up for every language until at least one teacher in the
// system is tagged (see CourseSelector's fallback), so leaving this blank
// today doesn't hide anyone.
export default function LanguagesField({ value, onChange, error }) {
  function toggle(slug) {
    onChange(value.includes(slug) ? value.filter((v) => v !== slug) : [...value, slug]);
  }

  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-foreground">Languages taught</label>
      <div className="flex flex-wrap gap-4">
        {LANGUAGES.map((lang) => (
          <label key={lang.slug} className="flex items-center gap-2 text-sm text-foreground">
            <input
              type="checkbox"
              checked={value.includes(lang.slug)}
              onChange={() => toggle(lang.slug)}
              className="h-4 w-4 rounded border-border text-primary focus:outline-none focus:ring-2 focus:ring-ring"
            />
            {lang.name}
          </label>
        ))}
      </div>
      {!error ? (
        <p className="mt-1 text-xs text-secondary">
          {value.length === 0
            ? "Optional — leave blank and this teacher shows up for every language's tutor list."
            : "Used to filter the tutor list when enrolling a student in a course."}
        </p>
      ) : null}
      {error ? (
        <p role="alert" className="mt-1 text-xs text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  );
}
