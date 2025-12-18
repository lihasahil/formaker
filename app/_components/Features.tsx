"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Zap, Palette, Share2, BarChart3, Lock, Edit3 } from "lucide-react";
import { motion } from "framer-motion";

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: <Zap className="w-6 h-6" />,
    title: "AI Form Builder",
    description:
      "Create AI-powered forms in seconds —just describe what you need.",
  },
  {
    icon: <Palette className="w-6 h-6" />,
    title: "Easy Customization",
    description:
      "Edit questions, layouts, and colors easily to match your style or brand.",
  },
  {
    icon: <Edit3 className="w-6 h-6" />,
    title: "Edit Anytime",
    description:
      "Update your form anytime, even after sharing it, without losing responses.",
  },
  {
    icon: <Share2 className="w-6 h-6" />,
    title: "Share & Collect",
    description:
      "Share your form with a link and start collecting responses instantly.",
  },
  {
    icon: <BarChart3 className="w-6 h-6" />,
    title: "View Responses",
    description:
      "See all responses in one place, organized and easy to understand.",
  },
  {
    icon: <Lock className="w-6 h-6" />,
    title: "Safe & Secure",
    description:
      "Your forms and responses are protected with secure data handling.",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (custom: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: custom * 0.1,
      duration: 0.5,
      ease: "easeOut" as const,
    },
  }),
};

function Features() {
  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center mb-12 sm:mb-16 lg:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-black font-extrabold mb-4 sm:mb-6 leading-tight">
            Features of Formaker
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed">
            Everything you need to create amazing forms, all in one place
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={cardVariants}
              className="h-full"
            >
              <Card
                variant="hover-down"
                className="bg-background rounded-lg p-6 sm:p-8 transform transition-all duration-300 ease-out hover:scale-105 hover:shadow-lg h-full flex flex-col"
              >
                <div className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-lg bg-gray-950 text-white transition-colors duration-300 mb-4 sm:mb-6 shrink-0">
                  {feature.icon}
                </div>
                <CardContent className="p-0 grow flex flex-col">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-black mb-2 sm:mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-sm sm:text-base md:text-lg">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;
