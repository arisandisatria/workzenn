"use client";

import { PersonalDetailContext } from "@/app/(context)/PersonalDetailContext";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ChevronLeft } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";

function PersonalDetail({ setForm }) {
  const [detail, setDetail] = useState({
    fullname: "",
    jobPosition: "",
    phoneNumber: "",
    email: "",
    personalWebsite: "",
    githubLink: "",
    address: "",
    summary: "",
  });
  const { personalDetail, setPersonalDetail } = useContext(
    PersonalDetailContext
  );

  useEffect(() => {
    setPersonalDetail(detail);
  }, [detail]);

  return (
    <>
      <h2 className="flex gap-2 items-center text-xl font-bold mb-3">
        <ChevronLeft
          onClick={() => setForm("resumeDetail")}
          className="cursor-pointer hover:text-primary text-gray-400 transition-all"
        />
        <span>Resume Detail</span>
      </h2>

      <div className="flex flex-col gap-2 mt-8">
        <div className="flex gap-5">
          <div className="flex flex-col gap-1.5 w-full">
            <label htmlFor="">Fullname</label>
            <Input
              placeholder="John Doe"
              onChange={(event) =>
                setDetail({
                  ...detail,
                  fullname: event.target.value,
                })
              }
            />
          </div>
          <div className="flex flex-col gap-1.5 w-full">
            <label htmlFor="">Job Position</label>
            <Input
              placeholder="Frontend Developer"
              onChange={(event) =>
                setDetail({
                  ...detail,
                  jobPosition: event.target.value,
                })
              }
            />
          </div>
        </div>
        <div className="flex gap-5">
          <div className="flex flex-col gap-1.5 w-full">
            <label htmlFor="">Phone Number</label>
            <Input
              type="tel"
              placeholder="08xxxxxxxxxx"
              onChange={(event) =>
                setDetail({
                  ...detail,
                  phoneNumber: event.target.value,
                })
              }
            />
          </div>
          <div className="flex flex-col gap-1.5 w-full">
            <label htmlFor="">Email</label>
            <Input
              type="email"
              placeholder="example@gmail.com"
              onChange={(event) =>
                setDetail({
                  ...detail,
                  email: event.target.value,
                })
              }
            />
          </div>
        </div>
        <div className="flex gap-5">
          <div className="flex flex-col gap-1.5 w-full">
            <label htmlFor="">Personal Website</label>
            <Input
              placeholder="example.com"
              onChange={(event) =>
                setDetail({
                  ...detail,
                  personalWebsite: event.target.value,
                })
              }
            />
          </div>
          <div className="flex flex-col gap-1.5 w-full">
            <label htmlFor="">Github Link</label>
            <Input
              placeholder="https://github.com/blablabla"
              onChange={(event) =>
                setDetail({
                  ...detail,
                  githubLink: event.target.value,
                })
              }
            />
          </div>
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="">Address</label>
          <Textarea
            className="resize-none"
            placeholder="Sesame Street 15"
            onChange={(event) =>
              setDetail({
                ...detail,
                address: event.target.value,
              })
            }
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="">Summary</label>
          <Textarea
            className="resize-none"
            placeholder="This is the detail of you. Please type any relevant information with the job position you want to apply."
            onChange={(event) =>
              setDetail({
                ...detail,
                summary: event.target.value,
              })
            }
          />
        </div>
      </div>
    </>
  );
}

export default PersonalDetail;
