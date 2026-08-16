"use client";

import { IconPlus, IconTrash } from "@tabler/icons-react";
import { LANGUAGES, getSubCourses } from "@/data/enrollmentCourses";

function selectClassName(hasError) {
  return `h-10 w-full rounded-md border bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring ${
    hasError ? "border-destructive" : "border-border"
  }`;
}

// A teacher with no languages tagged yet still appears everywhere, rather
// than vanishing from every dropdown the moment this field existed — see
// LanguagesField's own comment. Once at least one active teacher is tagged
// for a given language, the list narrows to just those.
function tutorsForLanguage(teachers, language) {
  const active = teachers.filter((t) => t.isActive !== false);
  if (!language) return { list: active, filtered: false };
  const matching = active.filter((t) => (t.languages ?? []).includes(language));
  return matching.length > 0 ? { list: matching, filtered: true } : { list: active, filtered: false };
}

let rowSeq = 0;
export function newCourseRow() {
  rowSeq += 1;
  return { key: `course-row-${rowSeq}`, language: "", courseSlug: "", tutorId: "" };
}

// Shared by UserFormModal (Add Student, Phase 21 Part 2) and
// ManageEnrollmentsModal (adding a course to an existing student, Part 4) —
// one or more rows of language -> sub-course -> tutor, the sub-course
// dropdown only enabled once a language is picked. `errors` is the
// backend's flat "courses.<index>.<field>" object
// (adminController.validateCourseSelections) keyed by each row's position.
export default function CourseSelector({ rows, onChange, teachers, errors = {} }) {
  function updateRow(index, patch) {
    const next = rows.slice();
    next[index] = { ...next[index], ...patch };
    onChange(next);
  }

  function addRow() {
    onChange([...rows, newCourseRow()]);
  }

  function removeRow(index) {
    onChange(rows.filter((_, i) => i !== index));
  }

  const anyTeacherTagged = teachers.some((t) => (t.languages ?? []).length > 0);

  return (
    <div className="flex flex-col gap-3">
      <label className="block text-sm font-medium text-foreground">Courses</label>

      {rows.length === 0 ? <p className="text-xs text-secondary">Optional — add one or more courses below, or skip and enroll later.</p> : null}

      {rows.map((row, index) => {
        const subCourses = row.language ? getSubCourses(row.language) : [];
        const { list: tutorOptions, filtered } = tutorsForLanguage(teachers, row.language);
        const courseSlugError = errors[`courses.${index}.courseSlug`];
        const tutorError = errors[`courses.${index}.tutorId`];
        const languageName = LANGUAGES.find((l) => l.slug === row.language)?.name;

        return (
          <div key={row.key} className="rounded-md border border-border p-3">
            <div className="flex items-start gap-2">
              <div className="grid flex-1 grid-cols-2 gap-2">
                <select
                  value={row.language}
                  onChange={(event) => updateRow(index, { language: event.target.value, courseSlug: "", tutorId: "" })}
                  className={selectClassName(courseSlugError)}
                >
                  <option value="" disabled>
                    Language…
                  </option>
                  {LANGUAGES.map((lang) => (
                    <option key={lang.slug} value={lang.slug}>
                      {lang.name}
                    </option>
                  ))}
                </select>

                <select
                  value={row.courseSlug}
                  onChange={(event) => updateRow(index, { courseSlug: event.target.value })}
                  disabled={!row.language}
                  className={selectClassName(courseSlugError)}
                >
                  <option value="" disabled>
                    {row.language ? "Sub-course…" : "Choose a language first"}
                  </option>
                  {subCourses.map((sc) => (
                    <option key={sc.courseSlug} value={sc.courseSlug}>
                      {sc.label}
                    </option>
                  ))}
                </select>

                <select
                  value={row.tutorId}
                  onChange={(event) => updateRow(index, { tutorId: event.target.value })}
                  disabled={!row.courseSlug}
                  className={`col-span-2 ${selectClassName(tutorError)}`}
                >
                  <option value="" disabled>
                    {row.courseSlug ? "Tutor…" : "Choose a course first"}
                  </option>
                  {tutorOptions.map((t) => (
                    <option key={t._id} value={t._id}>
                      {t.name}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="button"
                onClick={() => removeRow(index)}
                aria-label="Remove this course"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md text-secondary transition-colors hover:bg-destructive-soft hover:text-destructive focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring"
              >
                <IconTrash size={16} stroke={1.75} aria-hidden="true" />
              </button>
            </div>

            {courseSlugError ? (
              <p role="alert" className="mt-1.5 text-xs text-destructive">
                {courseSlugError}
              </p>
            ) : null}
            {tutorError ? (
              <p role="alert" className="mt-1.5 text-xs text-destructive">
                {tutorError}
              </p>
            ) : null}
            {!courseSlugError && !tutorError && row.courseSlug && !filtered ? (
              <p className="mt-1.5 text-xs text-secondary">
                {anyTeacherTagged
                  ? `No teachers tagged for ${languageName} yet — showing all active teachers.`
                  : "No teachers have languages tagged yet — showing all active teachers."}
              </p>
            ) : null}
          </div>
        );
      })}

      <button
        type="button"
        onClick={addRow}
        className="inline-flex h-9 items-center gap-1.5 self-start rounded-md border border-border px-3 text-xs font-medium text-foreground transition-colors hover:bg-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring"
      >
        <IconPlus size={14} stroke={2} aria-hidden="true" />
        Add another course
      </button>
    </div>
  );
}
