"use client";

import { EducationContext } from "@/app/(context)/EducationContext";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ChevronLeft, Plus } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";

function Education({ setForm }) {
  const [detail, setDetail] = useState({
    place: "",
    degree: "",
    major: "",
    gpa: "",
    startDate: "",
    endDate: "",
    description: "",
  });
  const [presentChecked, setPresentChecked] = useState(false);
  const { education, setEducation } = useContext(EducationContext);

  useEffect(() => {
    setEducation(detail);
  }, [detail]);

  return (
    <div className="relative">
      <h2 className="flex gap-2 items-center text-xl font-bold mb-3">
        <ChevronLeft
          onClick={() => setForm("resumeDetail")}
          className="cursor-pointer hover:text-primary text-gray-400 transition-all"
        />
        <span>Education</span>
      </h2>

      <div className="flex flex-col gap-2 mt-8">
        <div className="flex gap-5">
          <div className="flex flex-col gap-1.5 w-full">
            <label htmlFor="">Place</label>
            <Input
              placeholder="University of Earth"
              onChange={(event) =>
                setDetail({
                  ...detail,
                  place: event.target.value,
                })
              }
            />
          </div>
          <div className="flex flex-col gap-1.5 w-full">
            <label htmlFor="">Degree</label>
            <Input
              placeholder="Bachelor"
              onChange={(event) =>
                setDetail({
                  ...detail,
                  degree: event.target.value,
                })
              }
            />
          </div>
        </div>
        <div className="flex gap-5">
          <div className="flex flex-col gap-1.5 w-full">
            <label htmlFor="">Major</label>
            <Input
              placeholder="Informatics"
              onChange={(event) =>
                setDetail({
                  ...detail,
                  major: event.target.value,
                })
              }
            />
          </div>
          <div className="flex flex-col gap-1.5 w-full">
            <label htmlFor="">GPA</label>
            <Input
              placeholder="3.50"
              onChange={(event) =>
                setDetail({
                  ...detail,
                  gpa: event.target.value,
                })
              }
            />
          </div>
        </div>
        <div className="flex gap-5">
          <div className="flex flex-col gap-1.5 w-full">
            <label htmlFor="">Start Date</label>
            <Input
              placeholder="10 Jan 2001"
              onChange={(event) =>
                setDetail({
                  ...detail,
                  startDate: event.target.value,
                })
              }
            />
          </div>
          <div className="flex flex-col gap-1.5 w-full">
            <label htmlFor="">End Date</label>
            <div className="flex gap-5">
              <Input
                disabled={presentChecked}
                placeholder="20 Feb 2035"
                onChange={(event) =>
                  setDetail({
                    ...detail,
                    endDate: event.target.value,
                  })
                }
              />
              <div className="flex items-center gap-1.5 w-fit">
                <Checkbox
                  onCheckedChange={() => {
                    setPresentChecked(!presentChecked);
                    !presentChecked
                      ? setDetail({
                          ...detail,
                          endDate: "present",
                        })
                      : "";
                  }}
                />
                <label htmlFor="">Present</label>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-1.5 w-full">
          <label htmlFor="">Description</label>
          <Textarea
            placeholder="I got so many achivements here"
            className="resize-none"
            onChange={(event) =>
              setDetail({
                ...detail,
                description: event.target.value,
              })
            }
          />
        </div>
      </div>

      <div className="absolute -bottom-28 left-1/2 -translate-x-1/2 w-fit rounded-full border-2 animate-pulse border-primary cursor-pointer">
        <Plus size={35} />
      </div>
    </div>
  );
}

export default Education;
