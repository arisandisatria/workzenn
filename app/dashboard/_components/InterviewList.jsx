"use client";

import { db } from "@/utils/db";
import { mockInterviewSchema } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { desc, eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import InterviewItemCard from "./InterviewItemCard";
import { usePathname } from "next/navigation";
import AddNewInterview from "./AddNewInterview";
import { LoaderCircle } from "lucide-react";

function InterviewList() {
  const { user, isLoaded } = useUser();
  const [interviewList, setInterviewList] = useState([]);
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (isLoaded || user) getInterviewList();
  }, [pathname, user]);

  const getInterviewList = async () => {
    setLoading(true);
    const result = await db
      .select()
      .from(mockInterviewSchema)
      .where(
        eq(
          mockInterviewSchema.createdBy,
          user?.primaryEmailAddress?.emailAddress
        )
      )
      .orderBy(desc(mockInterviewSchema.id));

    setInterviewList(result);
    setLoading(false);
  };

  return (
    <div className="mb-5">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-medium">Interview Simulator</h2>
        <AddNewInterview />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {loading ? (
          <div className="mt-8 ml-20">
            <LoaderCircle className="animate-spin" size={48} />
          </div>
        ) : (
          interviewList?.map((item, index) => (
            <InterviewItemCard key={index + 1} interview={item} />
          ))
        )}
      </div>
    </div>
  );
}

export default InterviewList;
