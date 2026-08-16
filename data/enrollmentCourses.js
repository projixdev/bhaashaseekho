// The admin dashboard's course taxonomy (Phase 21) — 3 languages x 4
// sub-courses, giving 12 real courseSlug values (e.g. "kannada-speaking",
// "hindi-academics"). Sub-course names are pulled from data/courses.js's own
// `goals` array rather than redefined here, since that's already the real
// per-language course content shown on the public site — reusing it means
// there's exactly one place these 4 names live, not two that could drift.
import { courses } from "./courses.js";

const SUB_COURSE_KEYS = ["speaking", "reading-writing", "academics", "competitive-exams"];

export const LANGUAGES = courses.map((c) => ({ slug: c.slug, name: c.name }));

// { key, label } for the 4 sub-courses of one language, in the same order as
// SUB_COURSE_KEYS/each course's `goals` array — courseSlug is always
// `${languageSlug}-${key}`.
export function getSubCourses(languageSlug) {
  const language = courses.find((c) => c.slug === languageSlug);
  if (!language) return [];
  return language.goals.map((goal, index) => ({
    courseSlug: `${languageSlug}-${SUB_COURSE_KEYS[index]}`,
    label: goal.title,
  }));
}

export function getAllCourseSlugs() {
  return LANGUAGES.flatMap((l) => getSubCourses(l.slug).map((sc) => sc.courseSlug));
}

// Resolves a stored courseSlug back to a display label, e.g.
// "kannada-speaking" -> "Kannada — Speak Kannada Confidently". Falls back to
// the raw slug for anything outside the 12 known values (e.g. a
// pre-Phase-21 flat slug like "hindi" still on an old Enrollment record) so
// the UI never just shows a blank.
export function getCourseLabel(courseSlug) {
  for (const language of LANGUAGES) {
    const match = getSubCourses(language.slug).find((sc) => sc.courseSlug === courseSlug);
    if (match) return `${language.name} — ${match.label}`;
  }
  return courseSlug;
}

// The language a courseSlug belongs to, e.g. "kannada-speaking" ->
// "kannada" — used to filter the tutor dropdown by a teacher's
// User.languages. Returns null for a slug outside the known taxonomy (same
// legacy-data case as getCourseLabel above) so filtering degrades to
// "show everyone" rather than throwing.
export function getLanguageForCourseSlug(courseSlug) {
  const language = LANGUAGES.find((l) => courseSlug.startsWith(`${l.slug}-`));
  return language?.slug ?? null;
}
