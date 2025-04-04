import Link from "next/link";
import React from "react";

function aboutUs() {
  return (
    <section className="">
      <div className="py-12 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <p className="font-heading mt-2 text-3xl leading-8 font-semibold tracking-tight text-primary sm:text-4xl">
              Empowering Job Seekers with AI
            </p>
            <p className="mt-4 max-w-2xl text-lg text-gray-600 lg:mx-auto">
              At Workzenn, we believe that job searching should be smarter,
              faster, and stress-free. Our AI-powered platform is designed to
              help job seekers prepare for interviews, craft standout resumes,
              and write compelling cover letters—all in one place.
            </p>
          </div>

          <div className="mt-10">
            <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              <div className="relative">
                <dt>
                  <p className="font-heading md:ml-16 text-lg leading-6 font-bold text-primary">
                    Our Mission
                  </p>
                </dt>
                <dd className="mt-2 md:ml-16 text-base text-gray-600">
                  {" "}
                  We aim to bridge the gap between job seekers and opportunities
                  by providing intelligent tools that enhance job applications
                  and interview performance. Whether you're a fresh graduate or
                  an experienced professional, Workzenn is here to help you land
                  your dream job with confidence.
                </dd>
              </div>
              <div className="relative">
                <dt>
                  <p className="font-heading md:ml-16 text-lg leading-6 font-bold text-primary">
                    Why Workzenn?
                  </p>
                </dt>
                <dd className="mt-2 md:ml-16 text-base text-gray-600">
                  <ul className="mt-2">
                    {" "}
                    <li>
                      ✅ AI-Powered Interview Simulation – Practice real
                      interview scenarios with instant feedback.{" "}
                    </li>{" "}
                    <li>
                      ✅ Professional Resume Builder – Create a compelling
                      resume effortlessly (coming soon).{" "}
                    </li>{" "}
                    <li>
                      ✅ Smart Cover Letter Generator – Stand out with
                      AI-assisted cover letters (coming soon).{" "}
                    </li>
                  </ul>
                </dd>
              </div>
              <div className="relative">
                <dt>
                  <p className="font-heading md:ml-16 text-lg leading-6 font-bold text-primary">
                    Our Vision
                  </p>
                </dt>
                <dd className="mt-2 md:ml-16 text-base text-gray-600">
                  We envision a world where everyone has equal access to career
                  success. Workzenn empowers individuals with cutting-edge AI
                  solutions, ensuring they can confidently showcase their skills
                  and expertise to potential employers.
                </dd>
              </div>
            </dl>
          </div>

          <footer className="text-center">
            <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
              <div className="mt-12 flex justify-center gap-1 text-gray-600">
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
              <p className="mt-12 text-gray-600">
                © {new Date().getFullYear()} Workzenn. All rights reserved.
              </p>
            </div>
          </footer>
        </div>
      </div>
    </section>
  );
}

export default aboutUs;
