"use client";

import { db } from "@/utils/db";
import { coverLetterSchema } from "@/utils/schema";
import { eq } from "drizzle-orm";
import React, { use, useEffect, useState } from "react";
import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";
import "froala-editor/js/plugins/markdown.min.js";
import FroalaEditor from "react-froala-wysiwyg";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";

function CoverLetter({ params }) {
  const { coverLetterId } = use(params);
  const [coverLetterData, setCoverLetterData] = useState("");
  const [coverLetterTitle, setCoverLetterTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    getCoverLetterDetails();
  }, [coverLetterId]);

  const getCoverLetterDetails = async () => {
    setLoading(true);
    setCoverLetterData("");
    try {
      const result = await db
        .select()
        .from(coverLetterSchema)
        .where(eq(coverLetterSchema.coverLetterId, coverLetterId));

      console.log(result[0]?.coverLetterResp);

      setCoverLetterTitle(result[0]?.coverLetterTitle);
      setCoverLetterData(result[0]?.coverLetterResp);
    } catch (error) {
      console.error("Error fetching cover letter data:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateCoverLetter = async () => {
    setLoading(true);

    try {
      await db
        .update(coverLetterSchema)
        .set({ coverLetterResp: coverLetterData })
        .where(eq(coverLetterSchema.coverLetterId, coverLetterId));
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  const formattedCoverLetter = coverLetterData?.replace(/\n/g, "<br>") || "";

  return (
    <div className="my-10">
      <h2 className="font-bold text-2xl mb-4">
        {coverLetterTitle} Cover Letter
      </h2>
      {loading ? (
        <div className="flex justify-center items-center w-full col-span-4 mt-20">
          <LoaderCircle className="animate-spin" size={48} />
        </div>
      ) : (
        coverLetterData !== "" && (
          <>
            <FroalaEditor
              model={formattedCoverLetter}
              tag="textarea"
              config={{
                placeholderText: "Result will be here...",
              }}
              onModelChange={(e) => setCoverLetterData(e)}
            />
            <div className="flex justify-end mt-5 gap-5">
              <Link href={"/dashboard"}>
                <Button variant="outline">Go Home</Button>
              </Link>
              <Button onClick={() => updateCoverLetter()}>
                Save Cover Letter
              </Button>
            </div>
          </>
        )
      )}
    </div>
  );
}

export default CoverLetter;
