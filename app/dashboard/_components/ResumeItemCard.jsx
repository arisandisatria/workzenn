import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";

function ResumeItemCard({ resume }) {
  const router = useRouter();

  const onDetail = () => {
    router.push(`/dashboard/resume/${resume?.mockId}`);
  };

  return (
    <div className="shadow-sm bg-white rounded-lg p-3 flex flex-col gap-1.5">
      <h2 className="font-bold text-primary text-sm md:text-base">
        {resume?.jobPosition}
      </h2>
      <h2 className="text-xs text-gray-400">Created At: {resume?.createdAt}</h2>

      <Button onClick={onDetail} className="w-full">
        Details
      </Button>
    </div>
  );
}

export default ResumeItemCard;
