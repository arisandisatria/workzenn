import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";

function InterviewItemCard({ interview }) {
  const router = useRouter();

  const onStart = () => {
    router.push(`/dashboard/interview/${interview?.mockId}`);
  };

  const onFeedback = () => {
    router.push(`/dashboard/interview/${interview?.mockId}/feedback`);
  };

  return (
    <div className="shadow-sm bg-white rounded-lg p-3 flex flex-col gap-1.5">
      <h2 className="font-bold text-primary">{interview?.jobPosition}</h2>
      <h2 className="text-xs text-gray-400">
        Created At: {interview?.createdAt}
      </h2>

      <div className="flex justify-between gap-1.5 md:gap-2">
        <Button variant="outline" className="w-full" onClick={onFeedback}>
          Feedback
        </Button>
        <Button onClick={onStart} className="w-full">
          Start
        </Button>
      </div>
    </div>
  );
}

export default InterviewItemCard;
