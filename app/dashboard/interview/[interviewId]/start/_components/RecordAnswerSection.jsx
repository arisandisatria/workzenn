"use client";

import { Camera, Check, Loader, Mic, Save, WebcamIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";
import useSpeechToText from "react-hook-speech-to-text";
import { toast } from "sonner";
import { chatSession } from "@/utils/aiModel";
import { db } from "@/utils/db";
import { userAnswerSchema } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import moment from "moment";

function RecordAnswerSection({
  mockInterviewQuestion,
  activeQuestion,
  setActiveQuestion,
  interviewData,
}) {
  const [userAnswer, setUserAnswer] = useState({});
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
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [webCamEnabled, setWebCamEnabled] = useState(true);

  useEffect(() => {
    setUserAnswer((prevAns) => ({
      ...prevAns,
      [activeQuestion]: prevAns[activeQuestion] || "",
    }));
  }, [activeQuestion]);

  useEffect(() => {
    if (results.length === 0) return;

    setUserAnswer((prevAns) => ({
      ...prevAns,
      [activeQuestion]: results.reduce((acc, result) => {
        return acc.includes(result.transcript)
          ? acc
          : acc + " " + result.transcript;
      }, prevAns[activeQuestion] || ""),
    }));
  }, [results]);

  useEffect(() => {
    if (!isRecording && userAnswer[activeQuestion]?.length > 10) {
      updateUserAnswer();
    }
  }, [isRecording, userAnswer]);

  useEffect(() => {
    try {
      setWebCamEnabled(true);
    } catch (error) {
      console.error("Webcam access denied:", error);
      setWebCamEnabled(false);
    }
  }, []);

  const startStopRecording = async () => {
    if (isRecording) {
      stopSpeechToText();
    } else {
      startSpeechToText();
    }
  };

  const updateUserAnswer = async () => {
    setLoading(true);
    const aiFeedbackPrompt = `Question: ${mockInterviewQuestion[activeQuestion]?.question}, User Answer: ${userAnswer}. Depends on question and user answer for give interview question. Please give the rating 0 - 5 for answer and feedback as area of improvement if any. In just 4 to 6 lines to improve it in JSON format with rating field and feedback field.`;

    const result = await chatSession.sendMessage(aiFeedbackPrompt);
    const response = await JSON.parse(result.response.text());

    const insertUserAnswerToDb = await db.insert(userAnswerSchema).values({
      mockIdRef: interviewData?.mockId,
      question: mockInterviewQuestion[activeQuestion]?.question,
      correctAnswer: mockInterviewQuestion[activeQuestion]?.answer,
      userAnswer: userAnswer[activeQuestion],
      feedback: response?.feedback,
      rating: response?.rating,
      userEmail: user?.primaryEmailAddress?.emailAddress,
      createdAt: moment().format("DD-MM-YYYY"),
    });

    if (insertUserAnswerToDb) {
      toast.success("User answer recorded successfully!");
      setResults([]);
      setUserAnswer({});
      setActiveQuestion(activeQuestion + 1);
    }
    setResults([]);
    setUserAnswer({});
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full p-5">
      <div className="flex flex-col justify-center items-center rounded-lg">
        {webCamEnabled ? (
          <Webcam
            style={{ height: "auto", width: "100%" }}
            onUserMedia={() => setWebCamEnabled(true)}
            onUserMediaError={() => setWebCamEnabled(false)}
            mirrored={true}
          />
        ) : (
          <WebcamIcon className="mx-auto p-20 rounded-lg bg-gray-200" />
        )}
      </div>

      <div className="my-10 flex gap-5">
        <Camera
          className={`cursor-pointer ${!webCamEnabled && "text-gray-400"}`}
          onClick={() => setWebCamEnabled(!webCamEnabled)}
        />
        <Mic
          onClick={() => startStopRecording()}
          className={`cursor-pointer ${
            !isRecording ? "text-gray-400" : "text-red-500"
          }`}
        />
        {loading && <Loader className="animate-spin" />}
      </div>

      <div className="border rounded-lg p-5 w-full flex flex-col gap-3">
        <p className="font-semibold text-2xl">Your Answer: </p>
        <p>
          Current Answer:{" "}
          {userAnswer[activeQuestion]?.length > 0
            ? userAnswer[activeQuestion]
            : "Start recording to see your answer here..."}
        </p>

        {interimResult && <p>{interimResult}</p>}
      </div>
    </div>
  );
}

export default RecordAnswerSection;
