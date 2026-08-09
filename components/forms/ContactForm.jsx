"use client";

import { useState } from "react";
import { contactPage } from "@/content";
import { apiUrl } from "@/lib/api";
import FormField from "@/components/forms/FormField";

const { fields, submitLabel, successMessage, errorMessage } = contactPage.form;

export default function ContactForm() {
  const [values, setValues] = useState({ name: "", email: "", message: "", honeypot: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error

  function handleChange(event) {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus("submitting");
    setErrors({});

    try {
      const response = await fetch(apiUrl("/api/contact"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await response.json();

      if (!response.ok) {
        setErrors(data.errors || {});
        setStatus("error");
        return;
      }

      setStatus("success");
      setValues({ name: "", email: "", message: "", honeypot: "" });
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-lg border border-border bg-muted p-6 text-center">
        <p className="font-medium text-foreground">{successMessage}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <FormField label={fields.name} name="name" value={values.name} onChange={handleChange} error={errors.name} required />
      <FormField
        label={fields.email}
        name="email"
        type="email"
        value={values.email}
        onChange={handleChange}
        error={errors.email}
        required
      />
      {/* Optional — this is a lightweight support/query form, not lead capture */}
      <FormField
        label={fields.message}
        name="message"
        as="textarea"
        value={values.message}
        onChange={handleChange}
        error={errors.message}
      />

      {/* Honeypot: visually hidden from real visitors, bots that fill every field trip it */}
      <div className="absolute left-[-9999px]" aria-hidden="true">
        <label htmlFor="cf-company">Company</label>
        <input
          id="cf-company"
          name="honeypot"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.honeypot}
          onChange={handleChange}
        />
      </div>

      {status === "error" && Object.keys(errors).length === 0 && (
        <p role="alert" className="text-sm text-destructive">
          {errorMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="cursor-pointer rounded-md bg-accent px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "submitting" ? "Sending…" : submitLabel}
      </button>
    </form>
  );
}
