import { apiUrl } from "@/lib/api";

// errors carries the backend's per-field validation object (400s from
// e.g. POST /api/admin/teachers) when present, so a form can show inline
// field errors instead of one generic message — mirrors the app's ApiError.
export class AdminApiError extends Error {
  constructor(message, errors) {
    super(message);
    this.errors = errors;
  }
}

async function adminRequest(path, { method = "GET", body, token } = {}) {
  const headers = { "Content-Type": "application/json" };
  if (token) headers.Authorization = `Bearer ${token}`;

  const response = await fetch(apiUrl(path), {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await response.json().catch(() => null);
  if (!response.ok || !data?.success) {
    throw new AdminApiError(data?.message ?? "Something went wrong. Please try again.", data?.errors);
  }
  return data;
}

export function adminLogin(email, password) {
  return adminRequest("/api/admin/login", { method: "POST", body: { email, password } });
}

export function getAdminTeachers(token) {
  return adminRequest("/api/admin/teachers", { token });
}

export function createAdminTeacher(token, { name, phone, email }) {
  return adminRequest("/api/admin/teachers", { method: "POST", token, body: { name, phone, email } });
}

export function getAdminStudents(token) {
  return adminRequest("/api/admin/students", { token });
}

export function getAdminFeedback(token) {
  return adminRequest("/api/feedback", { token });
}
