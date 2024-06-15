import React from "react";

interface ForumQuestionProps {
  title: string;
  category: string;
  subcategory: string;
  description: string;
  answerCount: number;
}


const ForumQuestion = ({title, category, subcategory, description, answerCount }: ForumQuestionProps) => {
  const getRandomInt = () => {
    return Math.floor(Math.random() * 10);
  };
  return (
    <div className="broder border-primary p-6 rounded-lg shadow-lg h-56 hover:bg-blue-200 transition duration-300 shadow-blue-200">
      <div className="flex flex-wrap">
        <div className="text-primary font-bold text-xl w-5/6 text-start m-auto">{title}</div>
        <div className="text-secondary font-bold text-lg text-start w-5/6 m-auto">{category}</div>
        <div className="text-gray-700 font-normal text-sm text-start w-5/6 m-auto">{subcategory}</div>
      </div>
      <div className="w-2/3 h-[80px] m-auto overflow-hidden py-2">
        <p className="text-gray-600 text-sm">{description} </p><p>...</p>
      </div>
      <div className="inline-flex">
        <div className="text-primary font-bold text-lg w-full mx-10">{answerCount} Answers</div>
        <span className="text-[#f7b602] text-xl font-bold">{getRandomInt()}</span>
        <div className="items-center place-content-center">
          <svg fill="#f7b602" width="20px" height="20px" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
            <path d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 0 0 .6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0 0 46.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z"/>
          </svg>          
        </div>

      </div>
    </div>
  );
};

export default ForumQuestion;
