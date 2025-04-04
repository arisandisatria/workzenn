import { ProjectsContext } from "@/app/(context)/ProjectsContext";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ChevronLeft, Plus } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";

function Projects({ setForm }) {
  const [detail, setDetail] = useState({
    name: "",
    position: "",
    link: "",
    startDate: "",
    endDate: "",
    description: "",
  });
  const [presentChecked, setPresentChecked] = useState(false);
  const { projects, setProjects } = useContext(ProjectsContext);

  useEffect(() => {
    setProjects(detail);
  }, [detail]);

  return (
    <div className="relative">
      <h2 className="flex gap-2 items-center text-xl font-bold mb-3">
        <ChevronLeft
          onClick={() => setForm("resumeDetail")}
          className="cursor-pointer hover:text-primary text-gray-400 transition-all"
        />
        <span>Projects</span>
      </h2>

      <div className="flex flex-col gap-2 mt-8">
        <div className="flex gap-5">
          <div className="flex flex-col gap-1.5 w-full">
            <label htmlFor="">Name</label>
            <Input
              placeholder="BlueSky"
              onChange={(event) =>
                setDetail({
                  ...detail,
                  name: event.target.value,
                })
              }
            />
          </div>
          <div className="flex flex-col gap-1.5 w-full">
            <label htmlFor="">Position</label>
            <Input
              placeholder="Frontend Developer"
              onChange={(event) =>
                setDetail({
                  ...detail,
                  position: event.target.value,
                })
              }
            />
          </div>
          <div className="flex flex-col gap-1.5 w-full">
            <label htmlFor="">Link</label>
            <Input
              placeholder="https://example.com"
              onChange={(event) =>
                setDetail({
                  ...detail,
                  link: event.target.value,
                })
              }
            />
          </div>
        </div>
        <div className="flex flex-col gap-1.5 w-full">
          <label htmlFor="">Description</label>
          <Textarea
            placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam vel faucibus dui."
            className="resize-none"
            onChange={(event) =>
              setDetail({
                ...detail,
                description: event.target.value,
              })
            }
          />
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
      </div>

      <div className="absolute -bottom-28 left-1/2 -translate-x-1/2 w-fit rounded-full border-2 animate-pulse border-primary cursor-pointer">
        <Plus size={35} />
      </div>
    </div>
  );
}

export default Projects;
