import React from "react";
function ResumeList() {
  return (
    <div className="mb-3">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-medium">Resume List</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-3"></div>
    </div>
  );
}

export default ResumeList;
