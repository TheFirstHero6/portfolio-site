"use client";

import { useState } from "react";
import { motion } from "framer-motion";

type FormState = {
  name: string;
  email: string;
  message: string;
};

export default function ContactForm() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState<null | { ok: boolean; error?: string }>(
    null
  );
  const [touched, setTouched] = useState<{
    name?: boolean;
    email?: boolean;
    message?: boolean;
  }>({});

  const validEmail = (value: string) => /.+@.+\..+/.test(value);
  const canSubmit =
    form.name.trim().length >= 2 &&
    validEmail(form.email) &&
    form.message.trim().length >= 10 &&
    !loading;

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Double-check validation before submitting
    if (!canSubmit) {
      console.log("Form validation failed:", {
        name: form.name.trim().length,
        emailValid: validEmail(form.email),
        messageLength: form.message.trim().length,
        loading,
      });
      return;
    }

    setLoading(true);
    setSent(null);

    try {
      // Send request to API
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          message: form.message.trim(),
        }),
      });

      // Parse response
      const json = await res.json().catch(() => ({}));

      // Check if request was successful
      if (!res.ok) {
        throw new Error(json?.error || `Server error: ${res.status}`);
      }

      // Success!
      setSent({ ok: true });
      setForm({ name: "", email: "", message: "" });
      setTouched({}); // Reset touched state
    } catch (err: any) {
      console.error("Form submission error:", err);
      setSent({ ok: false, error: err?.message || "Something went wrong" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <motion.form
      onSubmit={onSubmit}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="glass glass-border rounded-2xl p-6 md:p-8 border border-white/10 max-w-2xl mx-auto"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <label className="text-left">
          <span className="block text-sm text-white/80 mb-1">Name</span>
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            onBlur={() => setTouched((t) => ({ ...t, name: true }))}
            aria-invalid={touched.name && form.name.trim().length < 2}
            aria-describedby="name-help"
            placeholder="Your name"
            className="w-full rounded-lg bg-white/10 border border-white/20 px-3 py-2 text-white placeholder-white/50 outline-none focus:border-white/40"
            required
            minLength={2}
          />
          {touched.name && form.name.trim().length < 2 && (
            <span id="name-help" className="mt-1 block text-xs text-red-300">
              Please enter at least 2 characters.
            </span>
          )}
        </label>
        <label className="text-left">
          <span className="block text-sm text-white/80 mb-1">Email</span>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            onBlur={() => setTouched((t) => ({ ...t, email: true }))}
            aria-invalid={touched.email && !validEmail(form.email)}
            aria-describedby="email-help"
            placeholder="you@example.com"
            className="w-full rounded-lg bg-white/10 border border-white/20 px-3 py-2 text-white placeholder-white/50 outline-none focus:border-white/40"
            required
          />
          {touched.email && !validEmail(form.email) && (
            <span id="email-help" className="mt-1 block text-xs text-red-300">
              Enter a valid email address.
            </span>
          )}
        </label>
      </div>
      <label className="block mt-4 text-left">
        <span className="block text-sm text-white/80 mb-1">Message</span>
        <textarea
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          onBlur={() => setTouched((t) => ({ ...t, message: true }))}
          aria-invalid={touched.message && form.message.trim().length < 10}
          aria-describedby="message-help"
          placeholder="Tell me about your project or question..."
          rows={6}
          className="w-full rounded-lg bg-white/10 border border-white/20 px-3 py-2 text-white placeholder-white/50 outline-none focus:border-white/40 resize-y"
          required
          minLength={10}
        />
        {touched.message && form.message.trim().length < 10 && (
          <span id="message-help" className="mt-1 block text-xs text-red-300">
            Please write at least 10 characters.
          </span>
        )}
      </label>

      <div className="mt-5 flex items-center gap-3">
        <motion.button
          whileTap={{ scale: canSubmit ? 0.98 : 1 }}
          type="submit"
          disabled={!canSubmit}
          className={`px-5 py-2 rounded-lg text-sm font-semibold transition-colors ${
            canSubmit
              ? "bg-white/20 hover:bg-white/30 text-white"
              : "bg-white/10 text-white/60 cursor-not-allowed"
          }`}
        >
          {loading ? "Sending…" : "Send Message"}
        </motion.button>
        <span aria-live="polite" role="status" className="min-w-[1ch]">
          {sent?.ok && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-green-300 text-sm"
            >
              Message sent! I’ll get back to you soon.
            </motion.span>
          )}
          {sent && !sent.ok && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-300 text-sm"
            >
              {sent.error}
            </motion.span>
          )}
        </span>
      </div>

      <p className="mt-3 text-xs text-white/60">
        This will email klaus.dev@kclabs.app via your API route.
      </p>
    </motion.form>
  );
}
