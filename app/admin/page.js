import { redirect } from "next/navigation";

// Bare /admin has no content of its own — Overview is the intended landing
// page for the admin section (ROADMAP.md admin-dashboard rebuild).
export default function AdminIndexPage() {
  redirect("/admin/overview");
}
