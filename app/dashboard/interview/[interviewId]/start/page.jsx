"use client";

import { db } from "@/utils/db";
import { mockInterviewSchema } from "@/utils/schema";
import { eq } from "drizzle-orm";
import React, { use, useEffect, useState } from "react";
import QuestionSection from "./_components/QuestionSection";
import RecordAnswerSection from "./_components/RecordAnswerSection";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LoaderCircle } from "lucide-react";

function StartInterview({ params }) {
  const { interviewId } = use(params);
  const [interviewData, setInterviewData] = useState();
  const [mockInterviewQuestion, setMockInterviewQuestion] = useState([]);
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getInterviewDetails();
  }, []);

  const getInterviewDetails = async () => {
    setLoading(true);

    try {
      const result = await db
        .select()
        .from(mockInterviewSchema)
        .where(eq(mockInterviewSchema.mockId, interviewId));

      if (result.length == 0 || !result) {
        setMockInterviewQuestion([]);
        setInterviewData(null);
      } else {
        const response = JSON.parse(result[0]?.jsonMockResp);
        setMockInterviewQuestion(response);
        setInterviewData(result[0]);
      }
    } catch (error) {
      console.log(error.message);
      setMockInterviewQuestion([]);
      setInterviewData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {loading ? (
        <div className="flex justify-center items-center w-full col-span-4 mt-40">
          <LoaderCircle className="animate-spin" size={48} />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 place-items-center">
            <QuestionSection
              mockInterviewQuestion={mockInterviewQuestion}
              activeQuestion={activeQuestion}
            />
            <RecordAnswerSection
              mockInterviewQuestion={mockInterviewQuestion}
              activeQuestion={activeQuestion}
              interviewData={interviewData}
            />
          </div>
          {mockInterviewQuestion?.length > 0 && (
            <div className="flex justify-end gap-6">
              {activeQuestion > 0 && (
                <Button onClick={() => setActiveQuestion(activeQuestion - 1)}>
                  Prev Question
                </Button>
              )}
              {activeQuestion != mockInterviewQuestion?.length - 1 && (
                <Button onClick={() => setActiveQuestion(activeQuestion + 1)}>
                  Next Question
                </Button>
              )}
              {activeQuestion == mockInterviewQuestion?.length - 1 && (
                <Link
                  href={`/dashboard/interview/${interviewData.mockId}/feedback`}
                >
                  <Button>End Interview</Button>
                </Link>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default StartInterview;
