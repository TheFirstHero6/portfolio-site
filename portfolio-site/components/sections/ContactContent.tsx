"use client";

import { motion } from "framer-motion";
import { Mail, Github, Linkedin, Send, MapPin, Phone, Download } from "lucide-react";
import { useState } from "react";
import ContactForm from "../ContactForm";
import { getSectionColor } from "../../lib/sectionColors";

const socialLinks = [
  {
    icon: Github,
    label: "GitHub",
    href: "https://github.com/TheFirstHero6",
    gradient: "from-purple-500 to-indigo-500",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/klaus-chamberlain/",
    gradient: "from-blue-500 to-cyan-500",
  },
];

export function ContactContent() {
  return (
    <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-16 xl:gap-20">
      {/* Contact Form */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className="mb-6 sm:mb-8 p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl bg-black/70 backdrop-blur-2xl border-2 relative overflow-hidden"
          style={{
            borderColor: '#ec489960',
            boxShadow: '0 0 40px rgba(236, 72, 153, 0.3), 0 0 80px rgba(236, 72, 153, 0.15)',
          }}
          whileHover={{ scale: 1.02 }}
        >
          <motion.div
            className="absolute inset-0 opacity-30"
            style={{
              background: 'radial-gradient(circle at center, rgba(236, 72, 153, 0.4) 0%, transparent 70%)',
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <h2 className="relative z-10 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-1 sm:mb-2">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
              Get In Touch
            </span>
          </h2>
          <p className="relative z-10 text-white/80 text-xs sm:text-sm">
            Have a project in mind? Let's work together to create something amazing.
          </p>
        </motion.div>

        <ContactForm />
      </motion.div>

      {/* Contact Info */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-6 sm:space-y-8 md:space-y-10 lg:space-y-12"
      >
        <div 
          className="p-5 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl bg-black/70 backdrop-blur-2xl border-2 relative"
          style={{
            borderColor: '#ec489960',
            boxShadow: '0 0 30px rgba(236, 72, 153, 0.3), 0 0 60px rgba(236, 72, 153, 0.15)',
          }}
        >
          <h3 className="text-white mb-4 sm:mb-5 md:mb-6 font-semibold text-base sm:text-lg">Let's Connect</h3>
          <p className="text-white/90 text-xs sm:text-sm leading-relaxed mb-6 sm:mb-8">
            I'm always open to discussing new projects, creative ideas, or opportunities
            to be part of your vision.
          </p>

          <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
            <motion.a
              href="mailto:klaus.dev@kclabs.app"
              whileHover={{ x: 8 }}
              className="flex items-center gap-3 sm:gap-4 text-white/70 hover:text-white transition-colors"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                <Mail size={18} className="sm:w-5 sm:h-5 text-blue-400" />
              </div>
                    <div>
                      <p className="text-[10px] sm:text-xs text-white/70">Email</p>
                      <p className="text-xs sm:text-sm text-white font-medium break-all">klaus.dev@kclabs.app</p>
                    </div>
                  </motion.a>

                  <motion.a
                    href="/Klaus_Chamberlain.pdf"
                    download="Klaus_Chamberlain_Resume.pdf"
                    whileHover={{ x: 8 }}
                    className="flex items-center gap-3 sm:gap-4 text-white/70 hover:text-white transition-colors"
                  >
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-purple-500/10 flex items-center justify-center flex-shrink-0">
                      <Download size={18} className="sm:w-5 sm:h-5 text-purple-400" />
                    </div>
                    <div>
                      <p className="text-[10px] sm:text-xs text-white/70">Resume</p>
                      <p className="text-xs sm:text-sm text-white font-medium">Download PDF</p>
                    </div>
                  </motion.a>

                  <motion.a
                    href="tel:+6146120032"
                    whileHover={{ x: 8 }}
                    className="flex items-center gap-3 sm:gap-4 text-white/90 hover:text-white transition-colors"
                  >
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-pink-500/20 flex items-center justify-center border border-pink-500/30 flex-shrink-0">
                      <Phone size={18} className="sm:w-5 sm:h-5 text-pink-400" />
                    </div>
                    <div>
                      <p className="text-[10px] sm:text-xs text-white/70">Phone</p>
                      <p className="text-xs sm:text-sm text-white font-medium">+614-612-0032</p>
                    </div>
                  </motion.a>

                  <motion.div
                    whileHover={{ x: 8 }}
                    className="flex items-center gap-3 sm:gap-4 text-white/90 hover:text-white transition-colors"
                  >
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-pink-500/20 flex items-center justify-center border border-pink-500/30 flex-shrink-0">
                      <MapPin size={18} className="sm:w-5 sm:h-5 text-pink-400" />
                    </div>
                    <div>
                      <p className="text-[10px] sm:text-xs text-white/70">Location</p>
                      <p className="text-xs sm:text-sm text-white font-medium">Columbus, Ohio</p>
                    </div>
            </motion.div>
          </div>
        </div>

        {/* Social Links */}
        <div 
          className="p-8 rounded-2xl bg-black/70 backdrop-blur-2xl border-2 relative"
          style={{
            borderColor: '#ec489960',
            boxShadow: '0 0 30px rgba(236, 72, 153, 0.3), 0 0 60px rgba(236, 72, 153, 0.15)',
          }}
        >
          <h3 className="text-white mb-4 sm:mb-5 md:mb-6 font-semibold text-base sm:text-lg">Social Media</h3>
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {socialLinks.map((link, index) => (
              <motion.a
                key={link.label}
                href={link.href}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -4 }}
                whileTap={{ scale: 0.95 }}
                      className="relative p-3 sm:p-4 rounded-lg sm:rounded-xl bg-black/50 border-2 transition-all group overflow-hidden"
                      style={{
                        borderColor: `${link.gradient.includes('purple') ? '#ec489960' : '#ec489960'}`,
                        boxShadow: '0 0 15px rgba(236, 72, 153, 0.2)',
                      }}
                    >
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${link.gradient} opacity-0 group-hover:opacity-20 transition-opacity`}
                />

                      <div className="relative z-10 flex flex-col items-center gap-1.5 sm:gap-2">
                        <link.icon 
                          className="text-white group-hover:text-pink-300 transition-colors w-5 h-5 sm:w-6 sm:h-6" 
                        />
                        <span className="text-white group-hover:text-pink-300 text-xs sm:text-sm transition-colors font-medium">
                    {link.label}
                  </span>
                </div>

                <div className={`absolute inset-0 bg-gradient-to-br ${link.gradient} opacity-0 group-hover:opacity-100 blur-xl transition-opacity -z-10`} />
              </motion.a>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div 
          className="text-center p-3 sm:p-4 rounded-lg sm:rounded-xl bg-black/60 backdrop-blur-2xl border-2"
          style={{
            borderColor: '#ec489960',
            boxShadow: '0 0 20px rgba(236, 72, 153, 0.2)',
          }}
        >
          <p className="text-white/70 text-xs sm:text-sm">
            © 2025 Klaus Chamberlain
          </p>
          <p className="text-white/30 text-[10px] sm:text-xs mt-1">
            Built with React, Three.js & ❤️
          </p>
        </div>
      </motion.div>
    </div>
  );
}

