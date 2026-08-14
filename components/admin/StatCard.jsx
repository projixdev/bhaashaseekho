// Shared summary-card pattern for Overview (and any future page that wants
// an aggregate row above its table) — same card language already
// established on the Teachers page (bg-card / border-border / text tokens).
export default function StatCard({ icon: Icon, label, value, loading }) {
  return (
    <div className="rounded-lg border border-border bg-card p-5">
      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-md bg-muted">
        {/* text-info, not text-primary — primary is reserved for button
            fills holding white text; as a bare icon color it fails dark
            mode's contrast requirement (2.83:1 against 3:1 needed). info is
            verified to pass in both modes (5.17:1 light, 5.75:1 dark). */}
        <Icon size={20} stroke={1.75} className="text-info" aria-hidden="true" />
      </div>
      <p className="text-sm text-secondary">{label}</p>
      {loading ? (
        <div className="mt-2 h-8 w-16 animate-pulse rounded bg-muted" aria-hidden="true" />
      ) : (
        <p className="mt-1 text-3xl font-semibold text-card-foreground">{value}</p>
      )}
    </div>
  );
}
