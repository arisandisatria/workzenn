"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { coverLetterChatSession } from "@/utils/aiModel";
import { LoaderCircle } from "lucide-react";
import { db } from "@/utils/db";
import { coverLetterSchema } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
import { useRouter } from "next/navigation";
import { COVER_LETTER_PROMPT } from "@/utils/constants";

function AddNewCoverLetter() {
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [info, setInfo] = useState({
    name: "",
    address: "",
    email: "",
    phoneNumber: "",
    jobExperience: "",
    jobPosition: "",
    receiverName: "",
    receiverPosition: "",
    companyName: "",
    companyAddress: "",
    jobInformationSource: "",
  });
  const [aiResp, setAiResp] = useState([]);
  const { user } = useUser();
  const router = useRouter();

  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);

      const generatedCoverLetter = await coverLetterChatSession.sendMessage(
        COVER_LETTER_PROMPT(info)
      );
      const result = generatedCoverLetter.response.text();
      setAiResp(result);

      if (generatedCoverLetter) {
        const insertToDb = await db
          .insert(coverLetterSchema)
          .values({
            coverLetterId: uuidv4(),
            coverLetterResp: result,
            coverLetterTitle: info.jobPosition,
            createdBy: user?.primaryEmailAddress?.emailAddress,
            createdAt: moment().format("DD-MM-YYYY"),
          })
          .returning({ coverLetterId: coverLetterSchema.coverLetterId });

        if (insertToDb) {
          setOpenDialog(false);
          router.push(
            `/dashboard/cover-letter/${insertToDb[0]?.coverLetterId}`
          );
        }
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Button onClick={() => setOpenDialog(true)}>+ New</Button>

      <Dialog open={openDialog}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="font-bold text-2xl">
              Fill Your Details
            </DialogTitle>
            <DialogDescription>Provide us all your details</DialogDescription>
          </DialogHeader>
          <form onSubmit={onSubmit}>
            <div className="flex gap-5 mb-2">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm md:text-base">Your Name*</label>
                <Input
                  placeholder="John Doe"
                  required
                  onChange={(event) =>
                    setInfo({
                      ...info,
                      name: event.target.value,
                    })
                  }
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm md:text-base">Phone Number</label>
                <Input
                  placeholder="0812345678"
                  type="tel"
                  onChange={(event) =>
                    setInfo({
                      ...info,
                      phoneNumber: event.target.value,
                    })
                  }
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm md:text-base">Email</label>
                <Input
                  type="email"
                  placeholder="example@gmail.com"
                  onChange={(event) =>
                    setInfo({
                      ...info,
                      email: event.target.value,
                    })
                  }
                />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm md:text-base">Your Address</label>
              <Input
                placeholder="Sesame Street"
                onChange={(event) =>
                  setInfo({
                    ...info,
                    address: event.target.value,
                  })
                }
              />
            </div>
            <div className="mt-2 flex flex-col gap-1.5">
              <label className="text-sm md:text-base">Job Position*</label>
              <Input
                placeholder="Frontend Developer"
                required
                onChange={(event) =>
                  setInfo({
                    ...info,
                    jobPosition: event.target.value,
                  })
                }
              />
            </div>
            <div className="flex gap-2 md:gap-5">
              <div className="mt-2 flex flex-col gap-1.5">
                <label className="text-sm md:text-base">Receiver Name*</label>
                <Input
                  placeholder="Mr. Andrew Smith"
                  required
                  onChange={(event) =>
                    setInfo({
                      ...info,
                      receiverName: event.target.value,
                    })
                  }
                />
              </div>
              <div className="mt-2 flex flex-col gap-1.5">
                <label className="text-sm md:text-base">
                  Receiver Position*
                </label>
                <Input
                  placeholder="Recruitment Team"
                  required
                  onChange={(event) =>
                    setInfo({
                      ...info,
                      receiverPosition: event.target.value,
                    })
                  }
                />
              </div>
              <div className="mt-2 flex flex-col gap-1.5">
                <label className="text-sm md:text-base">Company Name*</label>
                <Input
                  placeholder="Meta, Google, Alibaba"
                  required
                  onChange={(event) =>
                    setInfo({
                      ...info,
                      companyName: event.target.value,
                    })
                  }
                />
              </div>
              <div className="mt-2 flex flex-col gap-1.5">
                <label className="text-sm md:text-base">Job Info Source*</label>
                <Input
                  placeholder="Linkedin"
                  required
                  onChange={(event) =>
                    setInfo({
                      ...info,
                      jobInformationSource: event.target.value,
                    })
                  }
                />
              </div>
            </div>

            <div className="mt-2 flex flex-col gap-1.5">
              <label className="text-sm md:text-base">Company Address*</label>
              <Input
                placeholder="Wall Street"
                required
                onChange={(event) =>
                  setInfo({
                    ...info,
                    companyAddress: event.target.value,
                  })
                }
              />
            </div>

            <div className="mt-2 flex flex-col gap-1.5">
              <label className="text-sm md:text-base">Your Experience*</label>
              <Textarea
                className="resize-none"
                placeholder="I have been a frontend developer for about 3 years. I've manage to develop a website and increasing the team work effeciency for about 20% and I always love to work as a team."
                required
                onChange={(event) =>
                  setInfo({
                    ...info,
                    jobExperience: event.target.value,
                  })
                }
              />
            </div>
            <div className="flex gap-5 justify-end mt-5">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setOpenDialog(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? (
                  <>
                    <LoaderCircle className="animate-spin" />
                    Creating...
                  </>
                ) : (
                  "Create Cover Letter"
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddNewCoverLetter;
