// Initials-based colored circle — no photo asset needed.
const PALETTE = ["bg-primary", "bg-accent", "bg-secondary"];

function getInitials(name) {
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0] || "";
  const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
  return (first + last).toUpperCase();
}

export default function Avatar({ name, index = 0 }) {
  const colorClassName = PALETTE[index % PALETTE.length];

  return (
    <div
      aria-hidden="true"
      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${colorClassName} text-sm font-semibold text-white`}
    >
      {getInitials(name)}
    </div>
  );
}
