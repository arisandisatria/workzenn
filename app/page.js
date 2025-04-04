"use client";

import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { Bot, Newspaper, Scroll } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.replace("/dashboard");
    } else {
      router.replace("/");
    }
  }, [user]);
  return (
    <main className="pb-10 mx-auto px-2 max-w-lg md:max-w-7xl">
      <nav className="flex py-6 justify-center md:justify-between items-center border border-b-gray-200 border-t-0 border-l-0 border-r-0 rounded-sm">
        <Link href={"/"}>
          <h1 className="font-extrabold text-4xl text-primary">
            <strong>Workzenn</strong>
          </h1>
        </Link>
        <div className="hidden md:flex gap-5">
          <Link href={"/sign-in"}>
            <Button variant="outline">Sign In</Button>
          </Link>
          <Link href={"/sign-up"}>
            <Button>Get Started</Button>
          </Link>
        </div>
      </nav>

      <div className="mx-auto text-center mt-10 md:mt-24 flex items-center flex-col gap-10">
        <h1 className="uppercase text-5xl text-primary md:text-6xl lg:text-7xl xl:text-8xl font-extrabold  tracking-tighter">
          RELAX. You'll Get Hired Faster with Less effort
        </h1>
        <p className="text-xs md:text-lg text-gray-600">
          Practice your interview, make cover letter, and even your resume in
          one platform.
        </p>
        <Link href={"/sign-up"}>
          <Button>Get Started</Button>
        </Link>
      </div>

      <Image
        src={"/banner.jpg"}
        width={1000}
        height={1000}
        alt="hero banner"
        className="mx-auto my-10 md:my-20 rounded-lg shadow-xl w-[350px] h-[220px] md:w-[1000px] md:h-[600px]"
      />

      <div className="flex gap-2 md:gap-10 max-w-lg md:max-w-3xl mx-auto justify-around md:justify-evenly text-center">
        <div className="shadow-lg bg-primary hover:bg-secondary hover:outline outline-primary outline-1 hover:text-primary transition-all text-white p-3 md:p-5 rounded-lg w-[50%] md:w-[60%] flex flex-col gap-2">
          <Bot className="mx-auto" />
          <h3 className="font-bold text-base md:text-lg">
            Interview Simulation
          </h3>
          <p className="hidden md:block text-xs">Train your interview</p>
        </div>
        <div className="shadow-lg bg-primary hover:bg-secondary hover:outline outline-primary outline-1 hover:text-primary transition-all text-white p-3 md:p-5 rounded-lg w-[50%] md:w-[60%] flex flex-col gap-2">
          <Scroll className="mx-auto" />
          <h3 className="font-bold text-base md:text-lg">Cover Letter Maker</h3>
          <p className="hidden md:block text-xs">
            Make a very attractive cover letter
          </p>
        </div>
        <div className="shadow-lg bg-primary hover:bg-secondary hover:outline outline-primary outline-1 hover:text-primary transition-all text-white p-3 md:p-5 rounded-lg w-[50%] md:w-[60%] flex flex-col gap-2">
          <Newspaper className="mx-auto" />
          <h3 className="font-bold text-base md:text-lg">Resume Builder</h3>
          <p className="hidden md:block text-xs">Make a resume easily</p>
        </div>
      </div>

      <div className="space-y-4 mx-auto max-w-2xl my-20">
        <details
          className="group [&_summary::-webkit-details-marker]:hidden border border-primary rounded-lg"
          open
        >
          <summary className="flex cursor-pointer items-center justify-between gap-1.5 p-4 text-primary ">
            <h2 className="font-medium">What is Workzenn?</h2>

            <svg
              className="size-5 shrink-0 transition duration-300 group-open:-rotate-180"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </summary>

          <p className="px-4 pb-4 leading-relaxed text-gray-700">
            Workzenn is an AI-powered job search assistant that helps you
            prepare for interviews, create professional resumes, and craft
            compelling cover letters to land your dream job.
          </p>
        </details>

        <details className="group [&_summary::-webkit-details-marker]:hidden border border-primary rounded-lg">
          <summary className="flex cursor-pointer items-center justify-between gap-1.5 p-4 text-gray-900">
            <h2 className="font-medium">
              How does the interview simulator work?
            </h2>

            <svg
              className="size-5 shrink-0 transition duration-300 group-open:-rotate-180"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </summary>

          <p className="px-4 pb-4 leading-relaxed text-gray-700">
            Our AI-driven mock interview feature simulates real interview
            scenarios by asking industry-specific questions and providing
            feedback on your responses to help you improve.
          </p>
        </details>

        <details className="group [&_summary::-webkit-details-marker]:hidden border border-primary rounded-lg">
          <summary className="flex cursor-pointer items-center justify-between gap-1.5 p-4 text-gray-900">
            <h2 className="font-medium">
              Can I generate a CV and cover letter?
            </h2>

            <svg
              className="size-5 shrink-0 transition duration-300 group-open:-rotate-180"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </summary>

          <p className="px-4 pb-4 leading-relaxed text-gray-700">
            Yes! Workzenn provides an AI-powered CV builder (coming soon) and
            cover letter generator to help you create professional job
            application documents effortlessly.
          </p>
        </details>

        <details className="group [&_summary::-webkit-details-marker]:hidden border border-primary rounded-lg">
          <summary className="flex cursor-pointer items-center justify-between gap-1.5 p-4 text-gray-900">
            <h2 className="font-medium">Can Workzenn help me get a job?</h2>

            <svg
              className="size-5 shrink-0 transition duration-300 group-open:-rotate-180"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </summary>

          <p className="px-4 pb-4 leading-relaxed text-gray-700">
            While Workzenn doesn’t directly provide jobs, it equips you with the
            right tools to increase your chances of getting hired by enhancing
            your resume, interview skills, and job application process.
          </p>
        </details>

        <details className="group [&_summary::-webkit-details-marker]:hidden border border-primary rounded-lg">
          <summary className="flex cursor-pointer items-center justify-between gap-1.5 p-4 text-gray-900">
            <h2 className="font-medium">Is my data safe with Workzenn?</h2>

            <svg
              className="size-5 shrink-0 transition duration-300 group-open:-rotate-180"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </summary>

          <p className="px-4 pb-4 leading-relaxed text-gray-700">
            Absolutely! We prioritize your privacy and security. Your data is
            encrypted and never shared without your consent.
          </p>
        </details>

        <details className="group [&_summary::-webkit-details-marker]:hidden border border-primary rounded-lg">
          <summary className="flex cursor-pointer items-center justify-between gap-1.5 p-4 text-gray-900">
            <h2 className="font-medium">Who can use Workzenn?</h2>

            <svg
              className="size-5 shrink-0 transition duration-300 group-open:-rotate-180"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </summary>

          <p className="px-4 pb-4 leading-relaxed text-gray-700">
            Anyone looking for a job! Whether you're a fresh graduate, a career
            switcher, or an experienced professional, Workzenn provides tools to
            boost your job search.
          </p>
        </details>
      </div>

      <div className="mx-auto my-10 flex flex-col gap-10 py-10 md:py-20 items-center border border-r-0 border-l-0 border-primary">
        <h2 className="text-center text-4xl font-bold text-primary">
          Click below and get your job ASAP!
        </h2>
        <Link href={"/sign-up"}>
          <Button className="animate-bounce w-fit">Get Started</Button>
        </Link>
      </div>

      <footer className="text-center text-primary text-sm py-4">
        <p>© {new Date().getFullYear()} Workzenn. All rights reserved.</p>
        <div className="mt-12 flex justify-center gap-1 text-primary">
          <p>
            Hi, I'm Aris the creator of{" "}
            <Link
              href={"/"}
              className="text-primary hover:underline font-semibold"
            >
              Workzenn
            </Link>
            . You can find me on my{" "}
            <Link
              href="https:www.instagram.com/arisandi_satria/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-600 hover:underline font-semibold"
            >
              Instagram.
            </Link>
          </p>
        </div>
      </footer>
    </main>
  );
}
