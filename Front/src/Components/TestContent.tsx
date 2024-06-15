import React from "react"

interface TestContentProps {
  category: string
  subcategory: string
  level: string
}

const TestContent: React.FC<TestContentProps> = ({ category, subcategory, level }) => {
  return (
    <div className="category mb-4 p-4 border border-gray-300 rounded">
      <div className="flex items-center">
        <div className="circle bg-gray-400 rounded-full w-16 h-16 mr-4"></div>
        <div>
          <h2 className="text-lg font-bold">{category}</h2>
          <p className="text-sm">{subcategory}</p>
          <p className="text-sm">{level}</p>
        </div>
      </div>
    </div>
  )
}

export default TestContent
