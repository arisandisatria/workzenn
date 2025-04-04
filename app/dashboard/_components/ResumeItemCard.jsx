import { Newspaper } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

function ResumeItemCard({ resume }) {
  const router = useRouter();

  return (
    <Link
      href={`/dashboard/resume-builder/${resume?.resumeId}`}
      className="shadow-sm bg-white rounded-lg p-8 md:p-14 flex flex-col justify-center items-center gap-1.5 hover:shadow-md cursor-pointer transition-all"
    >
      <Newspaper />
      <h2 className="font-bold text-primary text-center text-sm md:text-base">
        {resume?.resumeTitle}
      </h2>
    </Link>
  );
}

export default ResumeItemCard;
