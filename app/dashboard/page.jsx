import React from "react";
import InterviewList from "./_components/InterviewList";
import CoverLetterList from "./_components/CoverLetterList";
import ResumeList from "./_components/ResumeList";

function Dashboard() {
  return (
    <div className="py-5 relative">
      <h2 className="font-bold text-2xl mb-4">Dashboard</h2>

      <InterviewList />
      <CoverLetterList />
      <ResumeList />
    </div>
  );
}

export default Dashboard;
