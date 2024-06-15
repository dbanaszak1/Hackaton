import React, { useState } from 'react';
import categories from '../Data/categories';

interface AddForumQuestionModalProps {
  isVisible: boolean;
  onClose: () => void;
}

const AddForumQuestionModal: React.FC<AddForumQuestionModalProps> = ({ isVisible, onClose }) => {
  const [category, setCategory] = useState('');
  const [subcategory, setSubcategory] = useState('');

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
    setSubcategory(''); // Reset subcategory when category changes
  };

  const handleSubcategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSubcategory(e.target.value);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg relative w-full max-w-lg">
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-2xl mb-4">Add a New Question</h2>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
              Category
            </label>
            <select
              id="category"
              value={category}
              onChange={handleCategoryChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">Select a category</option>
              {Object.keys(categories).map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          {category && (
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="subcategory">
                Subcategory
              </label>
              <select
                id="subcategory"
                value={subcategory}
                onChange={handleSubcategoryChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="">Select a subcategory</option>
                {categories[category].map((subcat) => (
                  <option key={subcat} value={subcat}>
                    {subcat}
                  </option>
                ))}
              </select>
            </div>
          )}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="question">
              Question
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="question"
              type="text"
              placeholder="Enter your question"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
              Description
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="description"
              placeholder="Enter the description"
              maxLength={2000}
              rows={5}
            />
            <p className="text-sm text-gray-600">Max 2000 characters</p>
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Submit
            </button>
            <button
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              onClick={onClose}
              type="button"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddForumQuestionModal;
