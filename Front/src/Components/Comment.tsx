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
        <div className="bg-white p-6 rounded-lg shadow-md my-8 shadow-secondary">
            <h1 className="text-xl font-semibold mb-4">{comment}</h1>
            <p className="text-gray-700 mb-4">{creator.name}</p>
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-gray-600">Status: {}</p>
                </div>
                <div>
                    {<><p className="text-gray-600">Posted by: {creator.name}</p><p className="text-gray-600">Forum
                        Points: {creator.forumPoints}</p></>}
                </div>
            </div>
        </div>
    )
}

export default Comment