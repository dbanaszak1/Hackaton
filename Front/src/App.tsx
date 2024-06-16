import React from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Home from "./Pages/Home"
import Tests from "./Pages/Tests"
import Forum from "./Pages/Forum"
import Planner from "./Pages/Planner"
import LoginPage from "./Pages/LoginPage"
import RegisterPage from "./Pages/RegisterPage"
import SingleTest from "./Pages/SingleTest"
import SinglePost from "./Pages/SinglePost"
import Leaders from "./Pages/Leaders"

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/home" Component={Home} />
          <Route path="/tests" Component={Tests} />
          <Route path="/forum" Component={Forum} />
          <Route path="/planner" Component={Planner} />
          <Route path="/login" Component={LoginPage} />
          <Route path="/register" Component={RegisterPage} />
          <Route path="/tests/:id" Component={SingleTest} />
          <Route path="/forum/:id" Component={SinglePost} />
          <Route path="/tests/leaders" Component={Leaders} />
        </Routes>
      </Router>
    </>
  )
}

export default App
