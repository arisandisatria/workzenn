"use client";

import { db } from "@/utils/db";
import { coverLetterSchema } from "@/utils/schema";
import { eq } from "drizzle-orm";
import React, { use, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LoaderCircle } from "lucide-react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";

function CoverLetter({ params }) {
  const { coverLetterId } = use(params);
  const [coverLetterData, setCoverLetterData] = useState("");
  const [coverLetterTitle, setCoverLetterTitle] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
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

      setCoverLetterTitle(result[0]?.coverLetterTitle);
      setCoverLetterData(result[0]?.coverLetterResp);
    } catch (error) {
      console.error("Error fetching cover letter data:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteCoverLetter = async () => {
    setLoading(true);
    try {
      await db
        .delete(coverLetterSchema)
        .where(eq(coverLetterSchema.coverLetterId, coverLetterId));

      router.replace("/dashboard");
    } catch (error) {
      console.log(error.message);
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

  const formattedContent = coverLetterData
    .replace(/ /g, "&nbsp;")
    .replace(/\n/g, "<br>");

  const editor = useEditor({
    extensions: [StarterKit],
    content: formattedContent,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none bg-white p-4 rounded-lg",
      },
    },
  });

  useEffect(() => {
    if (editor && coverLetterData) {
      editor.commands.setContent(formattedContent);
    }
  }, [coverLetterData, editor]);

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
            <EditorContent editor={editor} />
            <div className="mt-5 flex justify-between">
              <Button variant="destructive" onClick={() => setOpenDialog(true)}>
                Delete
              </Button>
              <div className="flex gap-5">
                <Link href={"/dashboard"}>
                  <Button variant="outline">Go Home</Button>
                </Link>
                <Button onClick={() => updateCoverLetter()}>
                  Save Cover Letter
                </Button>
              </div>
            </div>

            <Dialog open={openDialog}>
              <DialogContent className="max-w-xl">
                <DialogHeader>
                  <DialogTitle className="font-bold text-2xl">
                    Are you sure?
                  </DialogTitle>
                  <DialogDescription>
                    You're about to delete this cover letter. Remember, once you
                    delete. No way to recover
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <div className="flex gap-5 justify-end">
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => setOpenDialog(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={() => deleteCoverLetter()}
                      variant="destructive"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <LoaderCircle className="animate-spin" />
                          Deleting...
                        </>
                      ) : (
                        "Yes, I'm sure"
                      )}
                    </Button>
                  </div>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </>
        )
      )}
    </div>
  );
}

export default CoverLetter;
