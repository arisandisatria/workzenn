"use client";

import { EducationContext } from "@/app/(context)/EducationContext";
import { ExperienceContext } from "@/app/(context)/ExperienceContext";
import { PersonalDetailContext } from "@/app/(context)/PersonalDetailContext";
import { ProjectsContext } from "@/app/(context)/ProjectsContext";
import { SkillSContext } from "@/app/(context)/SkillsContext";
import React, { useContext } from "react";

function ResumePreview() {
  const { personalDetail, setPersonalDetail } = useContext(
    PersonalDetailContext
  );
  const { education, setEducation } = useContext(EducationContext);
  const { skills, setSkills } = useContext(SkillSContext);
  const { experience, setExperience } = useContext(ExperienceContext);
  const { projects, setProjects } = useContext(ProjectsContext);

  const isEmpty =
    Object.keys(personalDetail || {}).length === 0 &&
    Object.keys(education || {}).length === 0 &&
    Object.keys(skills || {}).length === 0 &&
    Object.keys(experience || {}).length === 0 &&
    Object.keys(projects || {}).length === 0;

  return isEmpty ? (
    <div className="p-10 bg-white rounded-lg shadow-sm flex justify-center items-center">
      <h2 className="uppercase font-semibold text-primary text-3xl animate-pulse">
        Your resume will be displayed here
      </h2>
    </div>
  ) : (
    <div className="p-10 bg-white rounded-lg shadow-sm">
      <h2 className="font-bold text-xl text-center">
        {personalDetail?.fullname}
      </h2>
      <p className="text-center text-sm font-medium">
        {personalDetail?.jobPosition}
      </p>
      <p className="text-center text-xs font-medium">
        {personalDetail?.address}
      </p>
      <div className="flex justify-center gap-1">
        <p className="text-xs">
          {personalDetail?.phoneNumber && personalDetail.phoneNumber + " | "}
        </p>
        <p className="text-xs">
          {personalDetail?.email && personalDetail.email + " | "}
        </p>
        <p className="text-xs">
          {personalDetail?.personalWebsite &&
            personalDetail.personalWebsite + " | "}
        </p>
        <p className="text-xs">
          {personalDetail?.githubLink && personalDetail.githubLink + " | "}
        </p>
      </div>
      {personalDetail?.summary ? (
        <>
          <hr className="border-[1.5px] my-2 border-primary" />
          <p className="text-xs">{personalDetail.summary}</p>
        </>
      ) : (
        ""
      )}

      <div className="my-2">
        {education?.place ? (
          <>
            {" "}
            <p className="text-center font-bold text-sm mb-2 uppercase">
              Education
            </p>
            <hr className="border-[1.5px] my-2 border-primary" />
          </>
        ) : (
          ""
        )}

        <div className="flex flex-col gap-2">
          <div>
            <p className="text-sm font-bold">{education?.place}</p>
            <div className="flex justify-between">
              {education?.degree && (
                <p className="text-xs">
                  {education?.degree} in {education?.major}
                  {education?.gpa && (
                    <span className="font-semibold">
                      {", "}
                      {education?.gpa}/4.00
                    </span>
                  )}
                </p>
              )}
              {education?.startDate && (
                <p className="text-xs">
                  {education?.startDate && education?.startDate + " - "}
                  {education?.endDate}
                </p>
              )}
            </div>
            <p className="text-xs mt-1">{education?.description}</p>
          </div>
        </div>
      </div>
      <div className="my-2">
        {skills?.type ? (
          <>
            <p className="text-center font-bold text-sm mb-2 uppercase">
              Skill
            </p>
            <hr className="border-[1.5px] my-2 border-primary" />
          </>
        ) : (
          ""
        )}

        <div>
          <div className="flex items-center gap-1">
            <p className="text-sm font-bold">
              {skills?.type && skills?.type + ":"}{" "}
            </p>
            <p className="text-sm">{skills?.details}</p>
          </div>
        </div>
      </div>
      <div className="my-2">
        {experience?.position ? (
          <>
            <p className="text-center font-bold text-sm mb-2 uppercase">
              Experience
            </p>
            <hr className="border-[1.5px] my-2 border-primary" />
          </>
        ) : (
          ""
        )}

        <div className="flex flex-col gap-2">
          <div>
            <p className="text-sm font-bold">{experience?.position}</p>
            <p className="text-xs flex justify-between">
              {experience?.company && experience?.company + ","}{" "}
              {experience?.location}
              <span>
                {experience?.startDate && experience?.startDate + " - "}
                {experience?.endDate}
              </span>
            </p>
            <div>
              <p className="text-xs mt-1">{experience?.description}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="my-2">
        {projects?.name ? (
          <>
            <p className="text-center font-bold text-sm mb-2 uppercase">
              Project
            </p>
            <hr className="border-[1.5px] my-2 border-primary" />
          </>
        ) : (
          ""
        )}

        <div className="my-5 flex flex-col gap-2">
          <div>
            <p className="text-sm font-bold">{projects?.name}</p>
            <p className="text-xs flex justify-between">
              {projects?.position}
              <span>
                {projects?.startDate && projects?.startDate + " - "}
                {projects?.endDate}
              </span>
            </p>
            <p className="text-xs italic">{projects?.link}</p>
            <div className="text-xs mt-1">{projects?.description}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResumePreview;
