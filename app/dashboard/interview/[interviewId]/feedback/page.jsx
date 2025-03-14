"use client";

import { db } from "@/utils/db";
import { userAnswerSchema } from "@/utils/schema";
import { eq } from "drizzle-orm";
import React, { use, useEffect, useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronsUpDownIcon, LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function Feedback({ params }) {
  const { interviewId } = use(params);
  const [feedbacklist, setFeedbackList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getFeedback();
    getOverallRating();
  }, []);

  const getFeedback = async () => {
    setLoading(true);
    const result = await db
      .select()
      .from(userAnswerSchema)
      .where(eq(userAnswerSchema.mockIdRef, interviewId))
      .orderBy(userAnswerSchema.id);

    setFeedbackList(result);
    setLoading(false);
  };

  const getOverallRating = () => {
    const totalRating = feedbacklist.reduce(
      (sum, item) => sum + +item.rating,
      0
    );

    return +(totalRating / feedbacklist.length).toFixed(1);
  };

  return (
    <div className="p-10">
      {loading ? (
        <div className="flex justify-center items-center w-full col-span-4 mt-20">
          <LoaderCircle className="animate-spin" size={48} />
        </div>
      ) : feedbacklist?.length < 1 ? (
        <div className="flex flex-col text-center justify-center items-center h-[70vh]">
          <h2 className="text-xl md:text-3xl font-bold mb-5">
            No interview feedback found! Please start interview simulator
          </h2>
          <Link href={"/dashboard"}>
            <Button>Back to Home</Button>
          </Link>
        </div>
      ) : (
        <>
          <h2 className="text-5xl font-bold text-green-500 mb-3">
            Congratulation!
          </h2>
          <h2 className="font-bold text-2xl">
            Here is your interview feedback
          </h2>
          <h2 className="text-primary text-lg my-3">
            Your overall interview rating:{" "}
            <strong>{getOverallRating()}/5</strong>
          </h2>
          <h2 className="text-sm text-gray-500">
            Find below interview question with correct answer, your answer, and
            feedback for improvement
          </h2>
          {feedbacklist?.map((item, index) => (
            <Collapsible key={index + 1} className="my-5">
              <CollapsibleTrigger className="p-2 bg-slate-200 flex justify-between items-start rounded-lg gap-7 my-2 text-left w-full">
                {item.question}{" "}
                <ChevronsUpDownIcon className="h-5 w-5 flex-shrink-0" />
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="flex flex-col gap-2 border p-2 rounded-lg">
                  <h2 className="text-primary p-2 rounded-lg">
                    <strong>Rating: {item.rating}</strong>
                  </h2>
                  <h2 className="p-2 rounded-lg bg-red-50 text-sm text-red-900">
                    <strong>Your Answer: {item.userAnswer}</strong>
                  </h2>
                  <h2 className="p-2 rounded-lg bg-green-50 text-sm text-green-900">
                    <strong>Correct Answer: {item.correctAnswer}</strong>
                  </h2>
                  <h2 className="p-2 rounded-lg bg-blue-50 text-sm text-blue-700">
                    <strong>Feedback: {item.feedback}</strong>
                  </h2>
                </div>
              </CollapsibleContent>
            </Collapsible>
          ))}

          <Link href={"/dashboard"}>
            <Button>Go Home</Button>
          </Link>
        </>
      )}
    </div>
  );
}

export default Feedback;
