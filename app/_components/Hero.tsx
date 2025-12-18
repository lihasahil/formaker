import { Button } from "@/components/ui/button";
import Image from "next/image";

interface Avatar {
  initials: string;
  color: string;
}

const avatars: Avatar[] = [
  { initials: "JD", color: "bg-gray-900" },
  { initials: "SM", color: "bg-gray-800" },
  { initials: "AR", color: "bg-gray-700" },
  { initials: "KB", color: "bg-gray-600" },
  { initials: "LC", color: "bg-gray-500" },
  { initials: "MN", color: "bg-gray-400" },
];

function Hero() {
  return (
    <section className="bg-white pt-20 sm:pt-24 md:pt-24 min-h-screen flex items-center">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32">
        <div className="mx-auto max-w-2xl text-center">
          <div className="relative mb-6 sm:mb-8">
            <Image
              src="/logo/hero.svg"
              alt="hero"
              width={80}
              height={80}
              className="absolute  -top-16 sm:-left-20 sm:-top-20 w-20 h-20 sm:w-28 sm:h-28"
            />
            <span className="inline-block text-gray-600 bg-gray-200 rounded-md px-3 py-1 text-xs mb-4">
              Gemini Powered
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-gray-900 leading-tight">
              Create your Form
              <br />
              <em className="text-gray-700 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light">
                within seconds
              </em>
            </h1>
          </div>

          <p className="mt-6 sm:mt-8 text-sm sm:text-base md:text-lg text-gray-500 leading-relaxed max-w-xl mx-auto">
            A super-easy platform that instantly whips up smart, customizable
            forms for you.
          </p>

          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
            <Button
              variant="brutalDown"
              className="rounded-md px-6 sm:px-8 py-2.5 sm:py-3 font-medium bg-background transition-colors text-sm sm:text-base"
            >
              Create Form
            </Button>

            <Button
              variant="brutalDown"
              className="rounded-md px-6 sm:px-8 py-2.5 sm:py-3 font-medium bg-foreground text-gray-700 transition-colors text-sm sm:text-base"
            >
              Learn More
            </Button>
          </div>

          {/* Trust Section */}
          <div className="mt-12 sm:mt-16 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            <div className="flex -space-x-3">
              {avatars.map((avatar, index) => (
                <div
                  key={index}
                  className={`relative w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full border-2 border-white flex items-center justify-center font-bold text-white text-xs sm:text-sm hover:z-10 transition-transform hover:scale-110 ${avatar.color}`}
                >
                  {avatar.initials}
                </div>
              ))}
            </div>
            <p className="text-gray-600 text-xs sm:text-sm md:text-base">
              Trusted by{" "}
              <span className="font-bold text-gray-900">10+ users</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
