import React, { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import axios from "axios"

interface Task {
  question: string
  answers: string[]
  shuffledAnswers?: string[]
}

interface Test {
  id: string
  category: string
  description: string
  subcategory: string
  level: string
  name: string
  tasks: Task[]
}

const shuffleArray = (array: any) => {
  return array.sort(() => Math.random() - 0.5)
}

const SingleTest: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const [test, setTest] = useState<Test | null>(null)
  const [userAnswers, setUserAnswers] = useState<string[]>([])
  const [correctAnswers, setCorrectAnswers] = useState<string[]>([])
  const [showModal, setShowModal] = useState(false)
  const [score, setScore] = useState(0)
  const navigate = useNavigate()

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:5000/test/${id}`)
      .then((response) => {
        const testData: Test = response.data.test
        testData.tasks.forEach((task) => {
          task.shuffledAnswers = shuffleArray([...task.answers])
        })
        setTest(testData)
        setCorrectAnswers(testData.tasks.map((task) => task.answers[0]))
      })
      .catch((error) => {
        console.log("There was an error fetching the test data!", error)
      })
  }, [id])

  const handleAnswerSelection = (
    selectedAnswer: string,
    questionIndex: number
  ) => {
    const updatedUserAnswers = [...userAnswers]
    updatedUserAnswers[questionIndex] = selectedAnswer
    setUserAnswers(updatedUserAnswers)
  }

  const handleSave = () => {
    const score = userAnswers.filter(
      (answer, index) => answer === correctAnswers[index]
    ).length
    setScore(score)
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    navigate("/home")
  }

  if (!test) {
    return <div>Loading...</div>
  }

  return (
    <div className="test-page text-center mx-auto my-10 max-w-[740px]">
      <div className="text-4xl py-10 text-secondary font-bold">TEST</div>
      <div className="border mb-10 border-secondary shadow-2xl shadow-secondary rounded-lg p-10  text-primary text-[22px] text-italic text-justify">
        {test.description}
      </div>
      {test.tasks.map((task, index) => (
        <div
          key={index}
          className="border rounded-3xl border-primary p-4 my-5 mx-auto max-w-[560px]"
        >
          <h4 className="text-primary m-7 text-lg text-justify">
            {task.question}
          </h4>
          <div className="answers-grid grid grid-cols-2 gap-4 mx-auto">
            {task.shuffledAnswers?.map((answer: any, answerIndex: any) => (
              <label
                key={answerIndex}
                className="answer-button flex items-center border rounded-lg border-secondary p-2 cursor-pointer hover:bg-gray-100"
              >
                <input
                  type="checkbox"
                  className="mr-2"
                  name={`question-${index}`}
                  value={answer}
                  checked={userAnswers[index] === answer}
                  onChange={() => handleAnswerSelection(answer, index)}
                />
                {answer}
              </label>
            ))}
          </div>
        </div>
      ))}
      <div className="">
        <button
          className="border text-primary font-semibold border-primary p-2 mt-4 rounded-full hover:bg-primary hover:text-white transition hover:scale-110 duration-300"
          onClick={handleSave}
        >
          SEND
        </button>
      </div>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50">
          <div className="bg-white rounded-lg p-8 shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Test Result</h2>
            <p className="mb-4">
              You got {score} out of {correctAnswers.length} correct!
            </p>
            <button
              className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
              onClick={handleCloseModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default SingleTest
