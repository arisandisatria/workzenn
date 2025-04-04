import { SkillSContext } from "@/app/(context)/SkillsContext";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ChevronLeft, Plus } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";

function Skills({ setForm }) {
  const [detail, setDetail] = useState({
    type: "",
    details: "",
  });
  const { skills, setSkills } = useContext(SkillSContext);

  useEffect(() => {
    setSkills(detail);
  }, [detail]);
  return (
    <div className="relative">
      <h2 className="flex gap-2 items-center text-xl font-bold mb-3">
        <ChevronLeft
          onClick={() => setForm("resumeDetail")}
          className="cursor-pointer hover:text-primary text-gray-400 transition-all"
        />
        <span>Skills</span>
      </h2>

      <div className="flex flex-col gap-2 mt-8">
        <div className="flex flex-col gap-1.5 w-full">
          <label htmlFor="">Type</label>
          <Input
            placeholder="Framework"
            onChange={(event) =>
              setDetail({
                ...detail,
                type: event.target.value,
              })
            }
          />
        </div>
        <div className="flex flex-col gap-1.5 w-full">
          <label htmlFor="">Details</label>
          <Textarea
            placeholder="React, Next, Laravel"
            className="resize-none"
            onChange={(event) =>
              setDetail({
                ...detail,
                details: event.target.value,
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

export default Skills;
