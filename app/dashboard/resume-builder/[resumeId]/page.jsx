import React from "react";
import FormSection from "./_components/FormSection";
import ResumePreview from "./_components/ResumePreview";

function ResumeBuilder() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 mt-10 gap-10 absolute left-20 right-20 pb-10">
      <FormSection />
      <ResumePreview />
    </div>
  );
}

export default ResumeBuilder;
