"use client";

import { db } from "@/utils/db";
import { coverLetterSchema } from "@/utils/schema";
import { eq } from "drizzle-orm";
import React, { use, useEffect, useRef, useState } from "react";
import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";
import "froala-editor/js/plugins/markdown.min.js";
import FroalaEditor from "react-froala-wysiwyg";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LoaderCircle } from "lucide-react";

function CoverLetter({ params }) {
  const { coverLetterId } = use(params);
  const [coverLetterData, setCoverLetterData] = useState("");
  const [loading, setLoading] = useState(false);

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

      setCoverLetterData(JSON.parse(result[0]?.coverLetterResp));
    } catch (error) {
      console.error("Error fetching cover letter data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="my-10">
      <h2 className="font-bold text-2xl mb-4">Cover Letter</h2>
      {loading ? (
        <div className="flex justify-center items-center w-full col-span-4 mt-20">
          <LoaderCircle className="animate-spin" size={48} />
        </div>
      ) : (
        coverLetterData?.[0]?.cover_letter !== undefined && (
          <>
            <FroalaEditor
              model={coverLetterData[0]?.cover_letter || ""}
              tag="textarea"
              config={{
                placeholderText: "Result will be here...",
              }}
            />
            <Link href={"/dashboard"}>
              <Button className="mt-5">Go Home</Button>
            </Link>
          </>
        )
      )}
    </div>
  );
}

export default CoverLetter;
