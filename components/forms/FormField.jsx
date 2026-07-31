// Shared labeled input / select / textarea + inline error message. Keeps
// RegisterForm and ContactForm from repeating the same label/error markup.
export default function FormField({
  label,
  name,
  type = "text",
  as = "input",
  value,
  onChange,
  error,
  required = false,
  options = [],
  placeholder,
  rows = 4,
}) {
  const baseClassName =
    "w-full rounded-md border border-border bg-background px-3.5 py-2.5 text-foreground placeholder:text-secondary focus:border-accent focus:outline-none focus:ring-2 focus:ring-ring";

  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-medium text-foreground">
        {label}
        {required && <span className="text-destructive"> *</span>}
      </label>

      {as === "select" && (
        <select id={name} name={name} value={value} onChange={onChange} required={required} className={baseClassName}>
          <option value="" disabled>
            {placeholder || `Select ${label.toLowerCase()}`}
          </option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      )}

      {as === "textarea" && (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          rows={rows}
          placeholder={placeholder}
          className={baseClassName}
        />
      )}

      {as === "input" && (
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          required={required}
          placeholder={placeholder}
          className={baseClassName}
        />
      )}

      {error && (
        <p role="alert" className="mt-1 text-sm text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}
