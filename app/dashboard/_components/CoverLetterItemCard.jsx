import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";

function CoverLetterItemCard({ coverLetter }) {
  const router = useRouter();

  const onStart = () => {
    router.push(`/dashboard/cover-letter/${coverLetter?.coverLetterId}`);
  };

  return (
    <div className="shadow-sm bg-white rounded-lg p-3 flex flex-col gap-1.5">
      <h2 className="font-bold text-primary text-sm md:text-base">
        {coverLetter?.coverLetterTitle}
      </h2>
      <p className="text-xs text-gray-400">
        Created At: {coverLetter?.createdAt}
      </p>

      <Button onClick={onStart} className="w-full">
        Show
      </Button>
    </div>
  );
}

export default CoverLetterItemCard;
