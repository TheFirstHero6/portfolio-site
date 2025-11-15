"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import Stepper, { Step } from "./ui/Stepper";

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

  async function onSubmit() {
    if (!canSubmit) {
      setTouched({ name: true, email: true, message: true });
      return;
    }
    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
    if (!serviceId || !templateId || !publicKey) {
      setSent({
        ok: false,
        error:
          "Email service not configured. Please set NEXT_PUBLIC_EMAILJS_* env vars.",
      });
      return;
    }
    setLoading(true);
    setSent(null);
    try {
      const result = await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: form.name.trim(),
          from_email: form.email.trim(),
          message: form.message.trim(),
        },
        { publicKey }
      );
      if (
        !(result && (result.text === "OK" || (result as any).status === 200))
      ) {
        throw new Error("EmailJS failed to send.");
      }
      setSent({ ok: true });
      setForm({ name: "", email: "", message: "" });
      setTouched({});
    } catch (err: any) {
      console.error("EmailJS error:", err);
      setSent({
        ok: false,
        error: err?.message || "Failed to send. Try again later.",
      });
    } finally {
      setLoading(false);
    }
  }

  const canProceedStep = (step: number) => {
    if (step === 1) return true;
    if (step === 2) return form.name.trim().length >= 2;
    if (step === 3) return validEmail(form.email);
    if (step === 4) return form.message.trim().length >= 10;
    return true;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="glass-medium glass-border rounded-2xl p-6 md:p-8 glass-shadow max-w-2xl mx-auto relative"
      style={{
        borderColor: "rgba(236, 72, 153, 0.4)",
        boxShadow:
          "0 0 30px rgba(236, 72, 153, 0.3), 0 0 60px rgba(236, 72, 153, 0.15)",
        backgroundColor: "rgba(0, 5, 16, 0.7)",
      }}
    >
      <Stepper
        initialStep={1}
        onFinalStepCompleted={onSubmit}
        canProceed={canProceedStep}
        backButtonText="Previous"
        nextButtonText={loading ? "Sending…" : "Next"}
      >
        <Step>
          <h3 className="text-heading-md text-white mb-2">Say hello 👋</h3>
          <p className="text-body text-white/75">
            I'll reply as soon as I can.
          </p>
        </Step>
        <Step>
          <label className="block text-left">
            <span className="block text-sm font-medium text-white/85 mb-2">
              Name
            </span>
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              onBlur={() => setTouched((t) => ({ ...t, name: true }))}
              aria-invalid={touched.name && form.name.trim().length < 2}
              aria-describedby="name-help"
              placeholder="Your name"
              className="w-full rounded-xl glass glass-border px-4 py-3 text-white placeholder-white/50 outline-none focus:glass-medium transition-all duration-200"
              required
              minLength={2}
            />
            {touched.name && form.name.trim().length < 2 && (
              <span id="name-help" className="mt-1 block text-xs text-red-300">
                Please enter at least 2 characters.
              </span>
            )}
          </label>
        </Step>
        <Step>
          <label className="block text-left">
            <span className="block text-sm font-medium text-white/85 mb-2">
              Email
            </span>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              onBlur={() => setTouched((t) => ({ ...t, email: true }))}
              aria-invalid={touched.email && !validEmail(form.email)}
              aria-describedby="email-help"
              placeholder="you@example.com"
              className="w-full rounded-xl glass glass-border px-4 py-3 text-white placeholder-white/50 outline-none focus:glass-medium transition-all duration-200"
              required
            />
            {touched.email && !validEmail(form.email) && (
              <span id="email-help" className="mt-1 block text-xs text-red-300">
                Enter a valid email address.
              </span>
            )}
          </label>
        </Step>
        <Step>
          <label className="block text-left">
            <span className="block text-sm font-medium text-white/85 mb-2">
              Message
            </span>
            <textarea
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              onBlur={() => setTouched((t) => ({ ...t, message: true }))}
              aria-invalid={touched.message && form.message.trim().length < 10}
              aria-describedby="message-help"
              placeholder="Tell me about your project or question..."
              rows={6}
              className="w-full rounded-xl glass glass-border px-4 py-3 text-white placeholder-white/50 outline-none focus:glass-medium transition-all duration-200 resize-y"
              required
              minLength={10}
            />
            {touched.message && form.message.trim().length < 10 && (
              <span
                id="message-help"
                className="mt-1 block text-xs text-red-300"
              >
                Please write at least 10 characters.
              </span>
            )}
          </label>
          <p className="mt-3 text-xs text-white/65">
            Powered by EmailJS. Your message is sent securely using your email
            provider.
          </p>
        </Step>
      </Stepper>

      <div className="mt-4 min-h-[20px]" aria-live="polite" role="status">
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
      </div>
    </motion.div>
  );
}
