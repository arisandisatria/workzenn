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
import { toast } from "sonner";
import { useRouter } from "next/navigation";

function CoverLetter({ params }) {
  const { coverLetterId } = use(params);
  const [coverLetterData, setCoverLetterData] = useState("");
  const [coverLetterTitle, setCoverLetterTitle] = useState("");
  const [coverLetterCreatedAt, setCoverLetterCreatedAt] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

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
    getCoverLetterDetails();
  }, [coverLetterId]);

  useEffect(() => {
    if (editor && coverLetterData) {
      editor.commands.setContent(formattedContent);
    }
  }, [coverLetterData, editor]);

  const getCoverLetterDetails = async () => {
    setLoading(true);
    setCoverLetterData("");
    try {
      const result = await db
        .select()
        .from(coverLetterSchema)
        .where(eq(coverLetterSchema.coverLetterId, coverLetterId));

      setCoverLetterCreatedAt(result[0]?.createdAt);
      setCoverLetterTitle(result[0]?.coverLetterTitle);
      setCoverLetterData(result[0]?.coverLetterResp || "");
    } catch (error) {
      console.error("Error fetching cover letter data:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateCoverLetter = async () => {
    setLoading(true);
    const updatedContent = editor?.getHTML();
    try {
      await db
        .update(coverLetterSchema)
        .set({ coverLetterResp: updatedContent })
        .where(eq(coverLetterSchema.coverLetterId, coverLetterId));

      setCoverLetterData(updatedContent);

      toast.success("Cover letter changes saved succesfully", {
        style: {
          background: "green",
          color: "white",
        },
      });
    } catch (error) {
      console.log(error.message);
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

  return (
    <div className="my-10">
      {loading ? (
        <div className="flex justify-center items-center w-full col-span-4 mt-20">
          <LoaderCircle className="animate-spin" size={48} />
        </div>
      ) : (
        coverLetterData !== "" && (
          <>
            <div className="flex justify-between items-center">
              <h2 className="font-bold text-2xl mb-4">
                {coverLetterTitle} Cover Letter
              </h2>
              <p className="text-gray-400">
                Created At: {coverLetterCreatedAt}
              </p>
            </div>
            <EditorContent editor={editor} />
            <div className="mt-5 flex justify-between">
              <Button variant="destructive" onClick={() => setOpenDialog(true)}>
                Delete
              </Button>
              <div className="flex gap-5">
                <Link href={"/dashboard"}>
                  <Button variant="outline">Back</Button>
                </Link>
                <Button onClick={() => updateCoverLetter()}>
                  Save Changes
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
                    delete. No way to recover.
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
