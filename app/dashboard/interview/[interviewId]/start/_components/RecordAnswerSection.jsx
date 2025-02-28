"use client";

import { Button } from "@/components/ui/button";
import { Mic, WebcamIcon } from "lucide-react";
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
  interviewData,
}) {
  const [userAnswer, setUserAnswer] = useState("");
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

  useEffect(() => {
    results.map((result) => {
      setUserAnswer((prevAns) => prevAns + result?.transcript);
    });
  }, [results]);

  useEffect(() => {
    if (!isRecording && userAnswer?.length > 10) {
      updateUserAnswer();
    }
  }, [userAnswer]);

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
    const response = JSON.parse(result.response.text());

    const insertUserAnswerToDb = await db.insert(userAnswerSchema).values({
      mockIdRef: interviewData?.mockId,
      question: mockInterviewQuestion[activeQuestion]?.question,
      correctAnswer: mockInterviewQuestion[activeQuestion]?.answer,
      userAnswer: userAnswer,
      feedback: response?.feedback,
      rating: response?.rating,
      userEmail: user?.primaryEmailAddress?.emailAddress,
      createdAt: moment().format("DD-MM-YYYY"),
    });

    if (insertUserAnswerToDb) {
      toast("User answer recorded successfully");
      setResults([]);
      setUserAnswer("");
    }
    setResults([]);
    setUserAnswer("");
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col justify-center items-center rounded-lg p-5 mt-20">
        <WebcamIcon
          width={200}
          height={200}
          className="absolute"
          color="black"
        />
        <Webcam
          mirrored={true}
          style={{ height: 370, width: "100%", Index: 10 }}
        />
      </div>

      {mockInterviewQuestion?.length > 0 && (
        <Button
          disabled={loading}
          variant="outline"
          className="my-10"
          onClick={startStopRecording}
        >
          {isRecording ? (
            <h2 className="text-red-600 flex gap-2 items-center">
              <Mic /> Stop Recording
            </h2>
          ) : (
            <h2 className="text-primary flex gap-2 items-center">
              <Mic /> Record Answer
            </h2>
          )}
        </Button>
      )}
    </div>
  );
}

export default RecordAnswerSection;
