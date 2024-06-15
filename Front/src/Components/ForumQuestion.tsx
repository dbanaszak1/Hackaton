import React from "react";

interface ForumQuestionProps {
  category: string;
  subcategory: string;
  question: string;
  description: string;
  answerCount: number;
}

const ForumQuestion: React.FC<ForumQuestionProps> = ({ category, subcategory, question, description, answerCount }) => {
  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md grid grid-cols-4 grid-rows-3 gap-4 h-80">
      <div className="col-span-1 row-span-1 flex flex-col space-y-2">
        <div className="font-bold">{category}</div>
        <div className="font-normal">{subcategory}</div>
      </div>
      <div className="col-span-3 row-span-1 flex items-center justify-center">
        <h2 className="text-xl">{question}</h2>
      </div>
      <div className="col-span-4 row-span-1">
        <p>{description}</p>
      </div>
      <div className="col-span-1 col-start-4 row-span-1 row-start-3 self-end justify-self-end">
        <div>{answerCount} ODP</div>
      </div>
    </div>
  );
};

export default ForumQuestion;
