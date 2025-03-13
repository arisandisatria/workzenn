import Link from "next/link";
import React from "react";

function aboutUs() {
  return (
    // <div className="py-5">
    //   <h2 className="font-bold text-2xl mb-4">About Workzenn</h2>
    //   <div className="mb-3">
    //     <h3 className="font-semibold text-xl">
    //
    //     </h3>
    //     <p className="mt-2 text-justify">
    //
    //     </p>
    //   </div>
    //   <div className="mb-3">
    //     <h3 className="font-semibold text-xl"></h3>
    //     <p className="mt-2 text-justify">
    //
    //     </p>
    //   </div>
    //   <div className="mb-3">
    //     <h3 className="font-semibold text-xl"></h3>
    //
    //   </div>
    //   <div className="mb-3">
    //     <h3 className="font-semibold text-xl"></h3>
    //     <p className="mt-2 text-justify">
    //
    //     </p>
    //   </div>
    //   <div className="mb-3">
    //     <h3 className="font-semibold text-xl"></h3>
    //     <p className="mt-2 text-justify">
    //
    //     </p>
    //   </div>
    //
    // </div>
    <section class="">
      <div class="py-12 ">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="lg:text-center">
            <p class="font-heading mt-2 text-3xl leading-8 font-semibold tracking-tight text-primary sm:text-4xl">
              Empowering Job Seekers with AI
            </p>
            <p class="mt-4 max-w-2xl text-lg text-gray-500 lg:mx-auto">
              At Workzenn, we believe that job searching should be smarter,
              faster, and stress-free. Our AI-powered platform is designed to
              help job seekers prepare for interviews, craft standout resumes,
              and write compelling cover letters—all in one place.
            </p>
          </div>

          <div class="mt-10">
            <dl class="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              <div class="relative">
                <dt>
                  <p class="font-heading ml-16 text-lg leading-6 font-bold text-primary">
                    Our Mission
                  </p>
                </dt>
                <dd class="mt-2 ml-16 text-base text-gray-500">
                  {" "}
                  We aim to bridge the gap between job seekers and opportunities
                  by providing intelligent tools that enhance job applications
                  and interview performance. Whether you're a fresh graduate or
                  an experienced professional, Workzenn is here to help you land
                  your dream job with confidence.
                </dd>
              </div>
              <div class="relative">
                <dt>
                  <p class="font-heading ml-16 text-lg leading-6 font-bold text-primary">
                    Why Workzenn?
                  </p>
                </dt>
                <dd class="mt-2 ml-16 text-base text-gray-500">
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
                    </li>{" "}
                    <li>
                      ✅ Career Growth Support – Gain insights and improve your
                      job-seeking strategy.{" "}
                    </li>{" "}
                  </ul>
                </dd>
              </div>
              <div class="relative">
                <dt>
                  <p class="font-heading ml-16 text-lg leading-6 font-bold text-primary">
                    Our Vision
                  </p>
                </dt>
                <dd class="mt-2 ml-16 text-base text-gray-500">
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
                  href="https:www.linkedin.com/in/arisandisatriajeujanan/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-700"
                >
                  LinkedIn
                </a>
                <a
                  href="https:www.instagram.com/arisandi_satria/"
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
      </div>
    </section>
  );
}

export default aboutUs;
