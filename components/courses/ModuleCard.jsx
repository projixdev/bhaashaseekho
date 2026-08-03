export default function ModuleCard({ module, index, themeColor }) {
  return (
    <div className="rounded-lg border border-border bg-background p-3">
      <span
        className="flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold text-white"
        style={{ backgroundColor: themeColor }}
      >
        {index + 1}
      </span>
      <p className="mt-3 font-heading font-semibold text-foreground">{module.title}</p>
      <p className="mt-1.5 text-sm text-secondary">{module.description}</p>
    </div>
  );
}
