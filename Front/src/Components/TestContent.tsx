import React from 'react';
import { useNavigate } from 'react-router-dom';

interface TestContentProps {
  category: string;
  subcategory: string;
  level: string;
  id: string;
}

const TestContent: React.FC<TestContentProps> = ({ category, subcategory, level, id }) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/tests/${id}`);
  };

  return (
    <div className="category mb-4 p-4 border border-gray-300 rounded">
      <div className="items-center inline-flex w-full">
        <div className="circle bg-gray-400 rounded-full w-24 h-24 mr-4"></div>
        <div className="w-4/6">
          <h2 className="text-xl py-3 font-bold text-primary">
            Test topic: <span className="italic text-3xl" style={{ textTransform: 'capitalize' }}>{category}</span>
          </h2>
          <p className="text-m pb-1 text-secondary">
            Field: <span className="italic text-lg" style={{ textTransform: 'capitalize' }}>{subcategory}</span>
          </p>
          <p className="text-sm pb-1 text-secondary">
            Level: <span className="italic text-lg" style={{ textTransform: 'capitalize' }}>{level}</span>
          </p>
        </div>
        <div className="w-1/6">
          <button className="text-4xl" onClick={handleNavigate}>
            ╰┈➤
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestContent;
