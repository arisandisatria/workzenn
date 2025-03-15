"use client";

import { db } from "@/utils/db";
import { mockInterviewSchema, userAnswerSchema } from "@/utils/schema";
import { eq } from "drizzle-orm";
import React, { use, useEffect, useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronsUpDownIcon, Info, LoaderCircle, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function Feedback({ params }) {
  const { interviewId } = use(params);
  const [feedbacklist, setFeedbackList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [interviewData, setInterviewData] = useState();

  useEffect(() => {
    getFeedback();
    getOverallRating();
    getInterviewDetails();
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

  const getInterviewDetails = async () => {
    const result = await db
      .select()
      .from(mockInterviewSchema)
      .where(eq(mockInterviewSchema.mockId, interviewId));

    setInterviewData(result[0]);
  };

  const getOverallRating = () => {
    const totalRating = feedbacklist.reduce(
      (sum, item) => sum + +item.rating,
      0
    );

    return +(totalRating / feedbacklist.length).toFixed(1);
  };

  return (
    <div className="py-10">
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
          <h2 className="text-5xl font-bold mb-3">Congratulations!</h2>
          <p className="text-sm text-gray-400">
            Find below interview question with correct answer, your answer, and
            feedback for improvement
          </p>
          <p className="text-primary text-lg my-6 flex items-end gap-2">
            Your overall interview rating:
            <strong className="text-xl flex items-center gap-1">
              <Star className="text-yellow-300" />
              {getOverallRating()}/5
            </strong>
          </p>

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
          {feedbacklist?.map((item, index) => (
            <Collapsible key={index + 1} className="my-5 border rounded-lg">
              <CollapsibleTrigger className="p-2 bg-slate-200 rounded-lg flex justify-between items-start gap-7 text-left w-full">
                {item.question}{" "}
                <ChevronsUpDownIcon className="h-5 w-5 flex-shrink-0" />
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="flex flex-col gap-2 p-4 rounded-lg">
                  <h2 className="text-primary p-2 rounded-lg">
                    <strong className="flex gap-1">
                      Rating: <Star className="text-yellow-300" /> {item.rating}
                    </strong>
                  </h2>
                  <div className="rounded-lg p-5 bg-yellow-100">
                    <h2 className="flex gap-2 items-center">
                      <Info className="text-yellow-500" />
                      <strong>Your Answer: </strong>
                    </h2>
                    <div className="text-sm my-2">
                      <p className="font-medium">{item.userAnswer}</p>
                    </div>
                  </div>
                  <div className="rounded-lg p-5 bg-green-100">
                    <h2 className="flex gap-2 items-center">
                      <Info className="text-green-500" />
                      <strong>Correct Answer: </strong>
                    </h2>
                    <div className="text-sm my-2">
                      <p className="font-medium">{item.correctAnswer}</p>
                    </div>
                  </div>
                  <div className="rounded-lg p-5 bg-blue-100">
                    <h2 className="flex gap-2 items-center">
                      <Info className="text-blue-500" />
                      <strong>Feedback: </strong>
                    </h2>
                    <div className="text-sm my-2">
                      <p className="font-medium">{item.feedback}</p>
                    </div>
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>
          ))}

          <Link href={"/dashboard"}>
            <Button>Back to Home</Button>
          </Link>
        </>
      )}
    </div>
  );
}

export default Feedback;
