"use client";

import { Button } from "@/components/ui/button";
import { db } from "@/utils/db";
import { mockInterviewSchema } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { Lightbulb, Mic, WebcamIcon } from "lucide-react";
import Link from "next/link";
import React, { useEffect, use, useState } from "react";
import Webcam from "react-webcam";

function Interview({ params }) {
  const { interviewId } = use(params);
  const [interviewData, setInterviewData] = useState();
  const [webCamEnabled, setWebCamEnabled] = useState(false);
  const [userMedia, setUserMedia] = useState({
    webcam: false,
    microphone: false,
  });

  useEffect(() => {
    getInterviewDetails();
    checkMediaAvailability();
  }, [interviewId]);

  const getInterviewDetails = async () => {
    const result = await db
      .select()
      .from(mockInterviewSchema)
      .where(eq(mockInterviewSchema.mockId, interviewId));

    setInterviewData(result[0]);
  };

  const checkMediaAvailability = async () => {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const hasWebcam = devices.some((device) => device.kind === "videoinput");
      const hasMicrophone = devices.some(
        (device) => device.kind === "audioinput"
      );

      setUserMedia({ webcam: hasWebcam, microphone: hasMicrophone });
    } catch (error) {
      console.error("Error checking media devices:", error);
      setUserMedia({ webcam: false, microphone: false });
    }
  };

  return (
    <div className="my-10">
      <div className="flex flex-col">
        <div className="flex flex-col-reverse my-5 gap-5">
          <div className="flex flex-col p-5 rounded-lg border gap-5">
            <h2 className="font-bold text-2xl">{interviewData?.jobPosition}</h2>
            <p>{interviewData?.jobDesc}</p>
            <p className="text-sm text-gray-400">{interviewData?.createdAt}</p>
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
        <div className="my-5 text-center">
          {webCamEnabled ? (
            <Webcam
              style={{ height: 370, width: "100%" }}
              onUserMedia={() => setWebCamEnabled(true)}
              onUserMediaError={() => setWebCamEnabled(false)}
              mirrored={true}
            />
          ) : (
            <WebcamIcon className="h-[370px] w-fit mx-auto p-20 rounded-lg bg-gray-200" />
          )}
          <div className="flex flex-col justify-center items-center mt-5 gap-5">
            <div className="flex gap-2">
              <WebcamIcon
                className={`${
                  userMedia.webcam == false ? "text-gray-400" : "text-green-500"
                }`}
              />
              <Mic
                className={`${
                  userMedia.microphone == false
                    ? "text-gray-400"
                    : "text-green-500"
                }`}
              />
            </div>
            <Button
              className="w-fit hover:border"
              onClick={() => setWebCamEnabled(!webCamEnabled)}
            >
              {!webCamEnabled ? "Enable" : "Disable"} Web Cam and Microphone
            </Button>
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center gap-5 mt-10">
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
