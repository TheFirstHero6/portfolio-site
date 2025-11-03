"use client";

import ContactForm from "./ContactForm";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";
import PulseCircle from "./ui/PulseCircle";

export default function Contact() {
  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "klaus.dev@kclabs.app",
      href: "mailto:klaus.dev@kclabs.app",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+614-612-0032",
      href: "tel:+6146120032",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Columbus, Ohio",
      href: null,
    },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-heading-xl text-white mb-3">Get in Touch</h2>
          <p className="text-body-lg text-white/80 max-w-2xl mx-auto">
            Have a project in mind or a question? Send me a message and I'll reply soon.
          </p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {contactInfo.map((info, index) => {
          const Icon = info.icon;
          return (
            <motion.div
              key={info.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -4 }}
              className="glass-medium glass-border rounded-2xl p-6 text-center group transition-all duration-300 hover:glass-strong"
            >
              <div className="flex justify-center mb-4">
                <div className="relative">
                  <div className="glass glass-border rounded-full p-3 group-hover:glass-medium transition-all duration-300">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1">
                    <PulseCircle size={8} color="bg-brand-purple" />
                  </div>
                </div>
              </div>
              <div className="text-sm text-white/70 mb-1">{info.label}</div>
              {info.href ? (
                <a
                  href={info.href}
                  className="text-white font-medium hover:text-brand-purple transition-colors"
                >
                  {info.value}
                </a>
              ) : (
                <div className="text-white font-medium">{info.value}</div>
              )}
            </motion.div>
          );
        })}
      </div>

      <ContactForm />
    </div>
  );
}