"use client";

import { Button } from "@/components/ui/button";
import { db } from "@/utils/db";
import { mockInterviewSchema } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { Lightbulb, WebcamIcon } from "lucide-react";
import Link from "next/link";
import React, { useEffect, use, useState } from "react";
import Webcam from "react-webcam";

function Interview({ params }) {
  const { interviewId } = use(params);
  const [interviewData, setInterviewData] = useState();
  const [webCamEnabled, setWebCamEnabled] = useState(false);

  useEffect(() => {
    getInterviewDetails();
  }, [interviewId]);

  const getInterviewDetails = async () => {
    const result = await db
      .select()
      .from(mockInterviewSchema)
      .where(eq(mockInterviewSchema.mockId, interviewId));

    setInterviewData(result[0]);
  };

  return (
    <div className="my-10">
      <h2 className="font-bold text-2xl">Let's Get Started</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="flex flex-col my-5 gap-5">
          <div className="flex flex-col p-5 rounded-lg border gap-5">
            <h2 className="text-lg">
              <strong>Job Role/Position: </strong>
              {interviewData?.jobPosition}
            </h2>
            <h2 className="text-lg">
              <strong>Job Description: </strong>
              {interviewData?.jobDesc}
            </h2>
            <h2 className="text-lg">
              <strong>Years of Experience: </strong>
              {interviewData?.jobExp} years
            </h2>
          </div>
          <div className="p-5 border rounded-lg border-yellow-300 bg-yellow-100">
            <h2 className="flex gap-2 items-center text-yellow-600">
              <Lightbulb />
              <strong>Information</strong>
            </h2>
            <h2 className="mt-3 text-yellow-700">
              Press "Enable Web Cam and Microphone" to open your web cam and
              microphone to start. Press "Start Interview" and answer the
              questions given. You will get the result after you finish answer
              your question by pressing "Stop Interview" button. We{" "}
              <strong>NEVER </strong>
              record your web cam. You can disabled it anytime. If your web cam
              and/or microphone doesn't start, please check your device and/or
              enable it on your browser
            </h2>
          </div>
        </div>
        <div className="my-5">
          {webCamEnabled ? (
            <Webcam
              style={{ height: 370, width: "100%" }}
              onUserMedia={() => setWebCamEnabled(true)}
              onUserMediaError={() => setWebCamEnabled(false)}
              mirrored={true}
            />
          ) : (
            <WebcamIcon className="h-[370px] w-full p-20 bg-secondary rounded-lg border" />
          )}
          <Button
            variant="ghost"
            className="w-full mt-5 hover:border"
            onClick={() => setWebCamEnabled(!webCamEnabled)}
          >
            Enable Web Cam and Microphone
          </Button>
        </div>
      </div>

      <div className="flex justify-end items-end gap-5">
        <Link href={`/dashboard`}>
          <Button variant="outline">Cancel</Button>
        </Link>
        <Link href={`/dashboard/interview/${interviewId}/start`}>
          <Button>Start Interview</Button>
        </Link>
      </div>
    </div>
  );
}

export default Interview;
