"use client";

import {
  Briefcase,
  ChevronRight,
  CircleUser,
  GraduationCap,
  HardHat,
  Zap,
} from "lucide-react";
import React, { useState } from "react";
import PersonalDetail from "./_components/PersonalDetail";
import Education from "./_components/Education";
import Skills from "./_components/Skills";
import Experience from "./_components/Experience";
import Projects from "./_components/Projects";

function FormSection() {
  const [form, setForm] = useState("resumeDetail");

  const renderForm = () => {
    switch (form) {
      case "personal":
        return <PersonalDetail setForm={setForm} />;
      case "education":
        return <Education setForm={setForm} />;
      case "skills":
        return <Skills setForm={setForm} />;
      case "experience":
        return <Experience setForm={setForm} />;
      case "project":
        return <Projects setForm={setForm} />;
      default:
        return (
          <>
            <h2 className="text-xl font-bold mb-3">Resume Detail</h2>
            <ul className="flex flex-col gap-3 text-sm">
              <li
                onClick={() => setForm("personal")}
                className="flex justify-between font-semibold w-full p-4 rounded-lg cursor-pointer hover:shadow-sm hover:bg-gray-100 transition-all"
              >
                <p className="flex items-center gap-2">
                  <CircleUser /> Personal Detail
                </p>
                <ChevronRight />
              </li>
              <li
                onClick={() => setForm("education")}
                className="flex justify-between font-semibold w-full p-4 rounded-lg cursor-pointer hover:shadow-sm hover:bg-gray-100 transition-all"
              >
                <p className="flex items-center gap-2">
                  <GraduationCap />
                  Education
                </p>
                <ChevronRight />
              </li>
              <li
                onClick={() => setForm("skills")}
                className="flex justify-between font-semibold w-full p-4 rounded-lg cursor-pointer hover:shadow-sm hover:bg-gray-100 transition-all"
              >
                <p className="flex items-center gap-2">
                  <Zap />
                  Skills
                </p>
                <ChevronRight />
              </li>
              <li
                onClick={() => setForm("experience")}
                className="flex justify-between font-semibold w-full p-4 rounded-lg cursor-pointer hover:shadow-sm hover:bg-gray-100 transition-all"
              >
                <p className="flex items-center gap-2">
                  <Briefcase />
                  Experience
                </p>
                <ChevronRight />
              </li>
              <li
                onClick={() => setForm("project")}
                className="flex justify-between font-semibold w-full p-4 rounded-lg cursor-pointer hover:shadow-sm hover:bg-gray-100 transition-all"
              >
                <p className="flex items-center gap-2">
                  <HardHat />
                  Project
                </p>
                <ChevronRight />
              </li>
            </ul>
          </>
        );
    }
  };

  return (
    <div className="bg-white p-10 rounded-lg h-fit shadow-sm">
      {renderForm()}
    </div>
  );
}

export default FormSection;
