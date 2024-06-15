import React from "react";

interface CommentProps {
    comment: string;
    creator: CreatorProps
}

interface CreatorProps {
    completedTests: any[],
    forumPoints: number,
    id: string,
    isPremium: boolean,
    name: string,
    testPoints: number
}

const Comment = ({comment, creator}: CommentProps) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h1 className="text-3xl font-bold mb-4">{comment}</h1>
            <p className="text-gray-700 mb-4">{creator.name}</p>
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-lg font-semibold">Category: {comment}</h2>
                    <h2 className="text-lg font-semibold">Subcategory: {comment}</h2>
                    <p className="text-gray-600">Status: {comment}</p>
                </div>
                <div>
                    {<><p className="text-gray-600">Posted by: {comment}</p><p className="text-gray-600">Forum
                        Points: {comment}</p></>}
                </div>
            </div>
        </div>
    )
}

export default Comment