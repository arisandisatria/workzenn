import Link from "next/link";
import React from "react";

function aboutUs() {
  return (
    <div className="py-5">
      <h2 className="font-bold text-2xl mb-4">About Workzenn</h2>
      <div className="mb-3">
        <h3 className="font-bold text-xl">Empowering Job Seekers with AI</h3>
        <p className="mt-2 text-justify">
          At Workzenn, we believe that job searching should be smarter, faster,
          and stress-free. Our AI-powered platform is designed to help job
          seekers prepare for interviews, craft standout resumes, and write
          compelling cover letters—all in one place.
        </p>
      </div>
      <div className="mb-3">
        <h3 className="font-bold text-xl">Our Mission</h3>
        <p className="mt-2 text-justify">
          We aim to bridge the gap between job seekers and opportunities by
          providing intelligent tools that enhance job applications and
          interview performance. Whether you're a fresh graduate or an
          experienced professional, Workzenn is here to help you land your dream
          job with confidence.
        </p>
      </div>
      <div className="mb-3">
        <h3 className="font-bold text-xl">Why Workzenn?</h3>
        <ul className="mt-2">
          <li>
            ✅ AI-Powered Interview Simulation – Practice real interview
            scenarios with instant feedback.
          </li>
          <li>
            ✅ Professional Resume Builder – Create a compelling resume
            effortlessly (coming soon).
          </li>
          <li>
            ✅ Smart Cover Letter Generator – Stand out with AI-assisted cover
            letters (coming soon).
          </li>
          <li>
            ✅ Career Growth Support – Gain insights and improve your
            job-seeking strategy.
          </li>
        </ul>
      </div>
      <div className="mb-3">
        <h3 className="font-bold text-xl">Our Vision</h3>
        <p className="mt-2 text-justify">
          We envision a world where everyone has equal access to career success.
          Workzenn empowers individuals with cutting-edge AI solutions, ensuring
          they can confidently showcase their skills and expertise to potential
          employers.
        </p>
      </div>
      <div className="mb-3">
        <h3 className="font-bold text-xl">Join Us on This Journey</h3>
        <p className="mt-2 text-justify">
          Start your career journey today with Workzenn. Let AI simplify your
          job search and help you land the perfect opportunity!
        </p>
      </div>
      <footer className="text-center">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
          <Link href={"/"}>
            <h1 className="font-extrabold text-center text-4xl text-primary">
              <strong>Workzenn</strong>
            </h1>
          </Link>

          <p className="mx-auto mt-6 max-w-xl text-center leading-relaxed text-gray-500">
            Boost your job search with Workzenn. AI-driven resume builder,
            interview prep, and career insights to land your dream job.
          </p>

          <div className="mt-12 flex justify-center gap-6 md:gap-8">
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
          <p className="mt-12 text-gray-500">
            © {new Date().getFullYear()} Workzenn. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default aboutUs;
