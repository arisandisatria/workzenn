"use client";

import React, { useEffect, useState } from "react";
import AddNewCoverLetter from "./AddNewCoverLetter";
import { LoaderCircle } from "lucide-react";
import { coverLetterSchema } from "@/utils/schema";
import CoverLetterItemCard from "./CoverLetterItemCard";
import { usePathname } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { desc, eq } from "drizzle-orm";
import { db } from "@/utils/db";

function CoverLetterList() {
  const { user, isLoaded } = useUser();
  const [coverLetterList, setCoverLetterList] = useState([]);
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (isLoaded || user) getCoverLetterList();
  }, [pathname, user]);

  const getCoverLetterList = async () => {
    setLoading(true);
    const result = await db
      .select()
      .from(coverLetterSchema)
      .where(
        eq(coverLetterSchema.createdBy, user?.primaryEmailAddress?.emailAddress)
      )
      .orderBy(desc(coverLetterSchema.id));

    setCoverLetterList(result);
    setLoading(false);
  };
  return (
    <div className="mb-3">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-medium">Cover Letter</h2>
        <AddNewCoverLetter />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {loading ? (
          <div className="mt-8 ml-20">
            <LoaderCircle className="animate-spin" size={48} />
          </div>
        ) : (
          coverLetterList?.map((item, index) => (
            <CoverLetterItemCard key={index + 1} coverLetter={item} />
          ))
        )}
      </div>
    </div>
  );
}

export default CoverLetterList;
