import { Lightbulb, Volume2 } from "lucide-react";
import React from "react";

function QuestionSection({
  mockInterviewQuestion,
  activeQuestion,
  setActiveQuestion,
}) {
  const textToSpeech = (text) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const speech = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(speech);
    } else {
      alert("Your browser does not support text to speech!");
    }
  };

  return (
    <div className="p-5 rounded-lg my-10">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {mockInterviewQuestion?.map((question, index) => (
          <p
            onClick={() => setActiveQuestion(index)}
            key={index + 1}
            className={`p-2 rounded-full text-center text-xs md:text-sm cursor-pointer ${
              activeQuestion == index
                ? "bg-primary text-white"
                : "border border-black"
            }`}
          >
            Question {index + 1}
          </p>
        ))}
      </div>
      <h2 className="my-5 text-md md:text-lg text-justify">
        {mockInterviewQuestion[activeQuestion]?.question}
      </h2>
      <Volume2
        className="cursor-pointer"
        onClick={() =>
          textToSpeech(mockInterviewQuestion[activeQuestion]?.question)
        }
      />

      <div className="border rounded-lg p-5 bg-blue-100 mt-20">
        <h2 className="flex gap-2 items-center text-primary">
          <Lightbulb />
          <strong>Note: </strong>
        </h2>
        <h2 className="text-sm text-primary my-2">
          Press "Record Answer" when you will answer the question. You will get
          the feedback along with the correct answer of each question and your
          answer for comparing.
        </h2>
      </div>
    </div>
  );
}

export default QuestionSection;
