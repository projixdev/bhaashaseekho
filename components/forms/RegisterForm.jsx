"use client";

import { useState } from "react";
import { registerPage } from "@/content";
import { getStoredUtmParams } from "@/lib/utm";
import FormField from "@/components/forms/FormField";

const { fields, interestOptions, submitLabel, successMessage, errorMessage } = registerPage.form;

function pushLeadSubmitEvent() {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: "lead_submit" });
}

// The single lead-capture form used site-wide: the dedicated /register page
// and the one lead-form section at the bottom of the homepage. Both places
// want every field, so there's no variant switching here anymore.
export default function RegisterForm() {
  const [values, setValues] = useState({
    name: "",
    phone: "",
    email: "",
    interest: "",
    honeypot: "",
  });
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

    const utm = getStoredUtmParams();

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, ...utm }),
      });
      const data = await response.json();

      if (!response.ok) {
        setErrors(data.errors || {});
        setStatus("error");
        return;
      }

      setStatus("success");
      pushLeadSubmitEvent();
      setValues({ name: "", phone: "", email: "", interest: "", honeypot: "" });
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
      <FormField
        label={fields.name}
        name="name"
        value={values.name}
        onChange={handleChange}
        error={errors.name}
        required
      />
      <FormField
        label={fields.phone}
        name="phone"
        type="tel"
        value={values.phone}
        onChange={handleChange}
        error={errors.phone}
        required
      />
      <FormField
        label={fields.email}
        name="email"
        type="email"
        value={values.email}
        onChange={handleChange}
        error={errors.email}
      />
      <FormField
        label={fields.interest}
        name="interest"
        as="select"
        options={interestOptions}
        value={values.interest}
        onChange={handleChange}
        error={errors.interest}
        required
      />

      {/* Honeypot: visually hidden from real visitors, bots that fill every field trip it */}
      <div className="absolute left-[-9999px]" aria-hidden="true">
        <label htmlFor="rf-company">Company</label>
        <input
          id="rf-company"
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
