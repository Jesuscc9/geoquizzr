import React, { FC } from 'react'
import HomePage from './pages/home'
import LoginPage from './pages/login'
import SignupPage from './pages/signup'
import QuizzGame from './pages/quizzes/game/[uuid]'
import NewQuizzPage from './pages/quizzes'
import { Routes, Route } from 'react-router-dom'

const App: FC = () => {
  return (
    <Routes>
      <Route element={<LoginPage />} path="/login" />
      <Route element={<SignupPage />} path="/signup" />
      <Route element={<NewQuizzPage />} path="/quizzes/" />
      <Route element={<NewQuizzPage />} path="/quizzes/new" />
      <Route element={<QuizzGame />} path="/quizzes/game/:uuid" />
      <Route element={<HomePage />} path="/" />
      <Route
        element={
          <div>
            <h1>no encontramos la ruta que buscas xd</h1>
          </div>
        }
        path="*"
      />
    </Routes>
  )
}

export default App
