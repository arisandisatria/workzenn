"use client";

import { useUser } from "@clerk/nextjs";
import { File, LoaderCircle } from "lucide-react";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import AddNewResume from "./AddNewResume";
import { resumeSchema } from "@/utils/schema";
import { db } from "@/utils/db";
import { desc, eq } from "drizzle-orm";
import ResumeItemCard from "./ResumeItemCard";
function ResumeList() {
  const { user, isLoaded } = useUser();
  const [loading, setLoading] = useState(false);
  const [resumeList, setResumeList] = useState([]);
  const pathname = usePathname();

  useEffect(() => {
    if (isLoaded || pathname || user) getResumeList();
  }, [pathname, user]);

  const getResumeList = async () => {
    setLoading(true);

    try {
      const result = await db
        .select()
        .from(resumeSchema)
        .where(
          eq(resumeSchema.createdBy, user?.primaryEmailAddress?.emailAddress)
        )
        .orderBy(desc(resumeSchema.id));

      setResumeList(result);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-5">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-medium">Resume</h2>
        <AddNewResume />
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {loading ? (
          <div className="mt-8 ml-20">
            <LoaderCircle className="animate-spin" size={48} />
          </div>
        ) : resumeList?.length > 0 ? (
          resumeList?.map((item, index) => (
            <ResumeItemCard key={index + 1} resume={item} />
          ))
        ) : (
          <div className="flex items-center gap-1 ml-5 text-gray-500">
            <File color="#6b7280" />
            <span className="text-xs ">No item</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default ResumeList;
