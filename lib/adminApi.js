import { apiUrl } from "@/lib/api";

export class AdminApiError extends Error {}

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
    throw new AdminApiError(data?.message ?? "Something went wrong. Please try again.");
  }
  return data;
}

export function adminLogin(email, password) {
  return adminRequest("/api/admin/login", { method: "POST", body: { email, password } });
}

export function getAdminTeachers(token) {
  return adminRequest("/api/admin/teachers", { token });
}

export function getAdminStudents(token) {
  return adminRequest("/api/admin/students", { token });
}

export function getAdminFeedback(token) {
  return adminRequest("/api/feedback", { token });
}
