"use client";

import React, { useState } from "react";
import Header from "../../components/Header";
import SideNav from "@/components/SideNav";
import { PersonalDetailContext } from "../(context)/PersonalDetailContext";
import { EducationContext } from "../(context)/EducationContext";
import { SkillSContext } from "../(context)/SkillsContext";
import { ExperienceContext } from "../(context)/ExperienceContext";
import { ProjectsContext } from "../(context)/ProjectsContext";

function DashboardLayout({ children }) {
  const [isSideNavOpen, setIsSideNavOpen] = useState(false);
  const [personalDetail, setPersonalDetail] = useState();
  const [education, setEducation] = useState();
  const [skills, setSkills] = useState();
  const [experience, setExperience] = useState();
  const [projects, setProjects] = useState();

  const toggleSideNav = () => {
    setIsSideNavOpen(!isSideNavOpen);
  };

  return (
    <PersonalDetailContext.Provider
      value={{ personalDetail, setPersonalDetail }}
    >
      <EducationContext.Provider value={{ education, setEducation }}>
        <SkillSContext.Provider value={{ skills, setSkills }}>
          <ExperienceContext.Provider value={{ experience, setExperience }}>
            <ProjectsContext.Provider value={{ projects, setProjects }}>
              <div className="max-w-7xl mx-auto">
                <div className="w-64 absolute">
                  <SideNav
                    closeSideNav={toggleSideNav}
                    isSideNavOpen={isSideNavOpen}
                  />
                </div>
                <Header toggleSideNav={toggleSideNav} />
                <div className="mx-5 md:mx-20 lg:mx-36">{children}</div>
              </div>
            </ProjectsContext.Provider>
          </ExperienceContext.Provider>
        </SkillSContext.Provider>
      </EducationContext.Provider>
    </PersonalDetailContext.Provider>
  );
}

export default DashboardLayout;
