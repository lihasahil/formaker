import { Button } from "@/components/ui/button";
import Image from "next/image";

function Hero() {
  return (
    <section className="bg-white lg:place-content-center">
      <div className="mx-auto w-screen max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
        <div className="mx-auto max-w-prose text-center">
          <div className="relative">
            <Image
              src="/logo/hero.svg"
              alt="hero"
              width={100}
              height={100}
              className="absolute -left-6 -top-14 sm:-left-30 sm:-top-15 sm:ml-30"
            />
            <span className="text-gray-600 bg-gray-200 rounded-md p-1 text-xs">
              Gemini Powered
            </span>
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
              Create your Form
              <br />
              <em className="text-gray-700 text-3xl font-light">
                within seconds
              </em>
            </h1>
          </div>

          <p className="mt-4 text-base text-pretty text-gray-500 sm:text-lg/relaxed">
            A super-easy platform that instantly whips up smart, customizable
            forms for you.
          </p>

          <div className="mt-4 flex justify-center gap-4 sm:mt-6">
            <Button
              variant="brutalDown"
              className=" rounded-md  px-5 py-3 font-medium bg-background transition-colors "
            >
              Create Form
            </Button>

            <Button
              variant="brutalDown"
              className="rounded-md bg-foreground px-5 py-3 font-medium text-gray-700  transition-colors"
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
