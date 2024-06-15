import React, { useState } from "react"
import axios from "axios"
import Navbar from "../Components/Navbar"

const Planner: React.FC = () => {
  const [query, setQuery] = useState("")
  const [response, setResponse] = useState("")

  const handleSubmit = async () => {
    if (!query) return

    try {
      const apiKey = "" // Replace with your actual OpenAI API key
      const endpoint = "https://api.openai.com/v1/chat/completions"

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      }

      const data = {
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: `You just receive a question from a passionate user that wants to learn as much as possible. 
            Make your answer a JSON so I can display it on my website for the user. 
            This is the JSON template example for you: {
                "learning_plan": [
                {
                "topic": "Topic 1",
                "weeks": 1,
                "tasks": [ "Task1" , "Task2", "Task3"
                ]
                }, {
                "topic": "Topic2",
                "weeks": 2,
                "tasks": ["Task1" , "Task2", ... etc
                ]
                }, .... }
                Can you create a learning plan for this topic: ${query} `,
          },
          {
            role: "user",
            content: query, // Use the query input from the user
          },
        ],
      }

      const response = await axios.post(endpoint, data, { headers })
      const message = response.data.choices[0].message.content

      console.log("Response from OpenAI:", response.data)
      console.log(
        "Response from OpenAI:",
        response.data.choices[0].message.content
      )

      setResponse(message)
    } catch (error) {
      console.error("Error fetching the response:", error)
      console.log(error)
      setResponse("Something went wrong. Please try again later.")
    }
  }

  const renderLearningPlan = () => {
    if (!response) return null

    try {
      const jsonResponse = JSON.parse(response)
      const { learning_plan } = jsonResponse

      return (
        <div className="mt-4">
          {learning_plan.map((item: any, index: number) => (
            <div key={index} className="mb-6 p-4 border rounded shadow-md">
              <div className="inline-flex w-full">
                <div className="text-xl font-bold mb-2 w-5/6 text-secondary">{item.topic}</div>
                <div className="text-xl  w-1/6 font-bold text-secondary text-center">{index + 1}</div>
              </div>
              <p className="text-gray-600 mb-2">
                Duration: {item.weeks} week(s)
              </p>
              <ul className="list-disc list-inside">
                {item.tasks.map((task: string, taskIndex: number) => (
                  <li key={taskIndex}>{task}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )
    } catch (error) {
      console.error("Error parsing JSON response:", error)
      return <p>Invalid response format. Please try again later.</p>
    }
  }

  return (
    <>
      <Navbar />
      <div className="max-w-[1240px] mx-auto p-4">
        <div className="flex my-4 gap-4">
          <div className="w-3/5 p-4 border rounded bg-white">
            <textarea
              className="w-full h-20 p-2 border rounded outline-none"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask for anything you would like to learn about..."
            />
            <button
              className="mt-2 p-2 bg-primary text-white rounded shadow hover:bg-blue-600 transition duration-300"
              onClick={handleSubmit}
            >
              Wyślij
            </button>
          </div>
          <div className="w-2/5 p-4 border rounded bg-white flex flex-col items-center">
            <div className="flex-1 flex flex-col items-center justify-center">
              <img
                src="src/Assets/Images/ai-planner.png"
                alt="AI Planner Logo"
                className="w-64 h-64 mb-4 rounded-full object-cover shadow-lg shadow-blue-500"
              />
            </div>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="w-3/5 p-4 border rounded bg-white">
            <h2 className="text-2xl text-secondary">
              {response.length === 0
                ? "Waiting for input...."
                : "Learning Plan"}
            </h2>
            {renderLearningPlan()}
          </div>
          <div className="w-2/5 p-4 border rounded bg-white flex flex-col items-center">
            <div className="p-4 border rounded w-full bg-gray-50 shadow-inner">
              INSTRUKCJA
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Planner
