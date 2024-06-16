import React from 'react';
import Navbar from '../Components/Navbar';

const leadersData = [
  { id: 1, name: 'Alice', points: 1950 },
  { id: 2, name: 'Bob', points: 1880 },
  { id: 3, name: 'Charlie', points: 7120 },
  { id: 4, name: 'David', points: 1600 },
  { id: 5, name: 'Eve', points: 1550 },
  { id: 6, name: 'Eve', points: 1550 },
  { id: 7, name: 'Eve', points: 1330 },
  { id: 8, name: 'Eve', points: 1200 },
  { id: 9, name: 'Eve', points: 1020 },
  { id: 10, name: 'Eve', points: 950 },
  { id: 11, name: 'Eve', points: 850 },
];

const Leaders = () => {
  return (
   <>
   <Navbar/>
    <div className="container max-w-[1040px] mx-auto p-4 shadow-2xl shadow-primary my-10">
      <h1 className="text-2xl font-bold text-center mb-6 text-primary">Leaderboard</h1>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-secondary text-left text-xs font-semibold text-white uppercase tracking-wider">
                Rank
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-secondary  text-left text-xs font-semibold text-white uppercase tracking-wider">
                Name
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-secondary  text-left text-xs font-semibold text-white uppercase tracking-wider">
                Points
              </th>
            </tr>
          </thead>
          <tbody>
            {leadersData.map((leader, index) => (
              <tr key={leader.id}>

                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm items-center inline-flex">
                  { index === 0 ? (
                     <svg className='w-6' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 8L6 20H18L20 8M4 8L5.71624 9.37299C6.83218 10.2657 7.39014 10.7121 7.95256 10.7814C8.4453 10.8421 8.94299 10.7173 9.34885 10.4314C9.81211 10.1051 10.0936 9.4483 10.6565 8.13476L12 5M4 8C4.55228 8 5 7.55228 5 7C5 6.44772 4.55228 6 4 6C3.44772 6 3 6.44772 3 7C3 7.55228 3.44772 8 4 8ZM20 8L18.2838 9.373C17.1678 10.2657 16.6099 10.7121 16.0474 10.7814C15.5547 10.8421 15.057 10.7173 14.6511 10.4314C14.1879 10.1051 13.9064 9.4483 13.3435 8.13476L12 5M20 8C20.5523 8 21 7.55228 21 7C21 6.44772 20.5523 6 20 6C19.4477 6 19 6.44772 19 7C19 7.55228 19.4477 8 20 8ZM12 5C12.5523 5 13 4.55228 13 4C13 3.44772 12.5523 3 12 3C11.4477 3 11 3.44772 11 4C11 4.55228 11.4477 5 12 5ZM12 4H12.01M20 7H20.01M4 7H4.01" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                     ) :
                     (<div></div>)
                  }{index + 1}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  {leader.name}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  {leader.points}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </>
  );
}

export default Leaders;
