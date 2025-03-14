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
import { chatSession } from "@/utils/aiModel";
import { LoaderCircle } from "lucide-react";
import { db } from "@/utils/db";
import { v4 as uuidv4 } from "uuid";
import { mockInterviewSchema } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { useRouter } from "next/navigation";
import { PROMPT } from "@/utils/constants";

function AddNewInterview() {
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [job, setJob] = useState({
    position: "",
    description: "",
    experience: "",
  });
  const [aiResp, setAiResp] = useState([]);
  const { user } = useUser();
  const router = useRouter();

  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);

      const generatedQuestion = await chatSession.sendMessage(
        PROMPT(job.position, job.description, job.experience)
      );
      const result = generatedQuestion.response.text();
      setAiResp(result);

      if (generatedQuestion) {
        const insertToDb = await db
          .insert(mockInterviewSchema)
          .values({
            mockId: uuidv4(),
            jsonMockResp: result,
            jobPosition: job.position,
            jobDesc: job.description,
            jobExp: job.experience,
            createdBy: user?.primaryEmailAddress?.emailAddress,
            createdAt: moment().format("DD-MM-YYYY"),
          })
          .returning({ mockId: mockInterviewSchema.mockId });

        if (insertToDb) {
          setOpenDialog(false);
          router.push(`/dashboard/interview/${insertToDb[0]?.mockId}`);
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
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle className="font-bold text-2xl">
              Tell us more
            </DialogTitle>
            <DialogDescription>
              Add more details about your job
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={onSubmit}>
            <div className="flex flex-col gap-1.5">
              <label>Job Role/Position</label>
              <Input
                placeholder="ex. Frontend Developer"
                required
                onChange={(event) =>
                  setJob({
                    ...job,
                    position: event.target.value,
                  })
                }
              />
            </div>
            <div className="mt-2 flex flex-col gap-1.5">
              <label>Job Description</label>
              <Textarea
                className="resize-none"
                placeholder="ex. Optimizing user interface"
                required
                onChange={(event) =>
                  setJob({
                    ...job,
                    description: event.target.value,
                  })
                }
              />
            </div>
            <div className="mt-2 flex flex-col gap-1.5">
              <label>Years of Experience</label>
              <Input
                placeholder="ex. 2"
                type="number"
                min="0"
                max="99"
                required
                onChange={(event) =>
                  setJob({
                    ...job,
                    experience: event.target.value,
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
                    Generating...
                  </>
                ) : (
                  "Add Interview"
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddNewInterview;
