import React from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Home from "./Pages/Home"
import Tests from "./Pages/Tests"
import Forum from "./Pages/Forum"
import Planner from "./Pages/Planner"

function App() {
  
  return (
    <>
      <Router>
        <Routes>
          <Route path="" Component={Home} />
          <Route path="/tests" Component={Tests} />
          <Route path="/forum" Component={Forum} />
          <Route path="/planner" Component={Planner} />
        </Routes>
      </Router>
    </>
  )
}

export default App
