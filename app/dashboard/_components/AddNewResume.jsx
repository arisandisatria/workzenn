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
import { LoaderCircle } from "lucide-react";
import { db } from "@/utils/db";
import { v4 as uuidv4 } from "uuid";
import { resumeSchema } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { useRouter } from "next/navigation";

function AddNewResume() {
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [jobTitle, setJobTitle] = useState("");
  const { user } = useUser();
  const router = useRouter();

  const onSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const insertToDb = await db
        .insert(resumeSchema)
        .values({
          resumeId: uuidv4(),
          resumeTitle: jobTitle,
          createdBy: user?.primaryEmailAddress?.emailAddress,
          createdAt: moment().format("DD-MM-YYYY"),
        })
        .returning({ resumeId: resumeSchema.resumeId });

      if (insertToDb) {
        setOpenDialog(false);
        router.push(`/dashboard/resume-builder/${insertToDb[0]?.resumeId}`);
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Button disabled onClick={() => setOpenDialog(true)}>
        + New
      </Button>

      <Dialog open={openDialog}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="font-bold text-2xl">
              What's your job position?
            </DialogTitle>
            <DialogDescription>
              Tell us your job position you want to apply
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={onSubmit}>
            <div className="flex flex-col gap-1.5">
              <label>Job Role/Position</label>
              <Input
                placeholder="Frontend Developer"
                required
                onChange={(event) => setJobTitle(event.target.value)}
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
                  "Create Resume"
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddNewResume;
