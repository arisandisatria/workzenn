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
    <div className="p-5 rounded-lg">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
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
      <div className="md:mt-10">
        <h2 className="my-5 text-md md:text-lg text-justify">
          {mockInterviewQuestion[activeQuestion]?.question}
        </h2>
        <Volume2
          className="cursor-pointer"
          onClick={() =>
            textToSpeech(mockInterviewQuestion[activeQuestion]?.question)
          }
        />
      </div>
    </div>
  );
}

export default QuestionSection;
