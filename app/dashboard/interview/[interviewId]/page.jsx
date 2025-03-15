"use client";

import { Button } from "@/components/ui/button";
import { db } from "@/utils/db";
import { mockInterviewSchema } from "@/utils/schema";
import { eq } from "drizzle-orm";
import {
  AudioLines,
  Lightbulb,
  LoaderCircle,
  Mic,
  WebcamIcon,
} from "lucide-react";
import Link from "next/link";
import React, { useEffect, use, useState } from "react";
import Webcam from "react-webcam";
import useSpeechToText from "react-hook-speech-to-text";

function Interview({ params }) {
  const { interviewId } = use(params);
  const [interviewData, setInterviewData] = useState();
  const [webCamEnabled, setWebCamEnabled] = useState(false);
  const [isTalking, setIsTalking] = useState(false);
  const [userMedia, setUserMedia] = useState({
    webcam: false,
    microphone: false,
  });
  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
    setResults,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  useEffect(() => {
    getInterviewDetails();
    checkMediaAvailability();
  }, []);

  useEffect(() => {
    if (interimResult) {
      setIsTalking(true);
      setTimeout(() => setIsTalking(false), 100);
    }
  }, [interimResult]);

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

      const cameraPermission = await navigator.permissions.query({
        name: "camera",
      });
      const microphonePermission = await navigator.permissions.query({
        name: "microphone",
      });

      const cameraAllowed = cameraPermission.state === "granted";
      const microphoneAllowed = microphonePermission.state === "granted";

      setUserMedia({
        webcam: hasWebcam && cameraAllowed,
        microphone: hasMicrophone && microphoneAllowed,
      });

      cameraPermission.onchange = () => checkMediaAvailability();
      microphonePermission.onchange = () => checkMediaAvailability();
    } catch (error) {
      setUserMedia({ webcam: false, microphone: false });
    }
  };

  return (
    <div className="my-10">
      <div className="flex flex-col">
        <div className="flex flex-col-reverse my-5 gap-5">
          <div className="flex flex-col p-5 rounded-lg border gap-5">
            {!interviewData ? (
              <div className="flex justify-center items-center w-full col-span-4">
                <LoaderCircle className="animate-spin" size={48} />
              </div>
            ) : (
              <>
                <h2 className="font-bold text-2xl">
                  {interviewData?.jobPosition}
                </h2>
                <p>{interviewData?.jobDesc}</p>
                <p className="text-sm text-gray-400">
                  {interviewData?.createdAt}
                </p>
              </>
            )}
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
        <div className="text-center">
          {webCamEnabled ? (
            <Webcam
              style={{ height: 400, width: "100%" }}
              onUserMedia={() => setWebCamEnabled(true)}
              onUserMediaError={() => setWebCamEnabled(false)}
              mirrored={true}
            />
          ) : (
            <WebcamIcon className="h-[400px] w-fit mx-auto p-20 rounded-lg bg-gray-200" />
          )}
          <div className="flex flex-col justify-center items-center mt-5 gap-5">
            <div className="flex gap-2">
              <WebcamIcon
                className={`${
                  userMedia.webcam == false ? "text-gray-400" : "text-green-500"
                }`}
              />
              <div className="flex gap-1.5 relative">
                <Mic
                  className={`${
                    userMedia.microphone == false
                      ? "text-gray-400"
                      : "text-green-500"
                  }`}
                />
                {isTalking && <AudioLines className="absolute -right-6" />}
              </div>
            </div>
            <Button
              variant="outline"
              className="w-fit hover:border"
              onClick={() => setWebCamEnabled(!webCamEnabled)}
            >
              {!webCamEnabled ? "Enable" : "Disable"} Web Cam
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-col-reverse justify-center items-center gap-3 mt-10">
        <Link href={`/dashboard`} className="w-full text-center">
          <Button variant="outline" className="w-[80%] mx-auto">
            Cancel
          </Button>
        </Link>
        <Link
          href={`/dashboard/interview/${interviewId}/start`}
          className="w-full text-center"
        >
          <Button className="w-[80%] mx-auto">Start Interview</Button>
        </Link>
      </div>
    </div>
  );
}

export default Interview;
