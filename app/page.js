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
    }
  }, [user]);

  return (
    <main className="pb-10 max-w-7xl mx-auto">
      <nav className="flex py-6 justify-between items-center border border-b-gray-200 border-t-0 border-l-0 border-r-0 rounded-sm">
        <Link href={"/"}>
          <h1 className="font-extrabold text-4xl text-primary">
            <strong>Workzenn</strong>
          </h1>
        </Link>
        <Link href={"/sign-up"}>
          <Button>Get Started</Button>
        </Link>
      </nav>

      <div className="mx-auto text-center mt-24 flex items-center flex-col gap-5">
        <h1 className="uppercase text-5xl md:text-6xl lg:text-7xl xl:text-8xl bg-gradient-to-b from-primary via-gray-500 to-gray-600 font-extrabold text-transparent bg-clip-text tracking-tighter">
          RELAX. You'll Get Hired Faster with Less effort
        </h1>
        <p className="text-base text-gray-600 max-w-xl">
          Boost your job search with Workzenn. AI-driven resume builder,
          interview prep, and career insights to land your dream job.{" "}
        </p>
        <Link href={"/sign-up"}>
          <Button>Get Started</Button>
        </Link>
      </div>

      <Image
        src={"/banner.png"}
        width={900}
        height={600}
        alt="hero banner"
        className="mx-auto my-20 rounded-lg shadow-xl"
      />

      <div className="flex gap-10 justify-evenly text-center">
        <div className="shadow-lg bg-primary hover:bg-secondary hover:outline outline-primary outline-1 hover:text-primary transition-all text-white p-5 rounded-lg w-[60%] flex flex-col gap-2">
          <Bot className="mx-auto" />
          <h3 className="font-bold text-lg">Interview Simulation</h3>
          <p className="text-xs">Train your interview with AI</p>
        </div>
        <div className="shadow-lg bg-primary hover:bg-secondary hover:outline outline-primary outline-1 hover:text-primary transition-all text-white p-5 rounded-lg w-[60%] flex flex-col gap-2">
          <Scroll className="mx-auto" />
          <h3 className="font-bold text-lg">Cover Letter Maker</h3>
          <p className="text-xs">
            Make a very attractive cover letter with AI help
          </p>
        </div>
        <div className="shadow-lg bg-primary hover:bg-secondary hover:outline outline-primary outline-1 hover:text-primary transition-all text-white p-5 rounded-lg w-[60%] flex flex-col gap-2">
          <Newspaper className="mx-auto" />
          <h3 className="font-bold text-lg">Resume Builder</h3>
          <p className="text-xs">Make a resume easily</p>
        </div>
      </div>

      <div className="mx-auto my-20 flex flex-col gap-10 py-20 items-center border border-r-0 border-l-0 border-primary">
        <h2 className="text-4xl font-bold text-primary">
          You too much thinking. Join us now!
        </h2>
        <Link href={"/sign-up"}>
          <Button className="animate-bounce w-fit">Start Here</Button>
        </Link>
      </div>

      <footer className="text-center text-primary text-sm py-4">
        <p>© {new Date().getFullYear()} Workzenn. All rights reserved.</p>
        <div className="flex justify-center space-x-4 mt-2">
          <a
            href="https://www.linkedin.com/in/arisandisatriajeujanan/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-700"
          >
            LinkedIn
          </a>
          <a
            href="https://www.instagram.com/arisandi_satria/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-pink-500"
          >
            Instagram
          </a>
        </div>
      </footer>
    </main>
  );
}
