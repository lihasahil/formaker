"use client";

import { MessageSquareText, Sparkles, Send } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  {
    icon: <MessageSquareText className="w-6 h-6" />,
    title: "Describe your form",
    description:
      "Tell the AI what you need in plain words - a survey, signup, or feedback form.",
  },
  {
    icon: <Sparkles className="w-6 h-6" />,
    title: "Customize it",
    description:
      "Tweak questions, colors, and layout until it looks exactly right.",
  },
  {
    icon: <Send className="w-6 h-6" />,
    title: "Share & collect",
    description:
      "Send the link and watch responses arrive, ready to view and download.",
  },
];

function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-black mb-4 sm:mb-6 leading-tight">
            How it works
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed">
            From idea to live form in three simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: index * 0.1, duration: 0.5, ease: "easeOut" }}
              className="relative text-center px-4"
            >
              <div className="mx-auto mb-5 flex items-center justify-center w-14 h-14 rounded-full bg-gray-950 text-white">
                {step.icon}
              </div>
              <span className="text-xs font-semibold tracking-widest text-gray-500">
                STEP {index + 1}
              </span>
              <h3 className="mt-1 mb-2 text-xl sm:text-2xl font-bold text-black">
                {step.title}
              </h3>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
