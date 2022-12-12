import React, { FC } from 'react'
import HomePage from './pages/home'
import LoginPage from './pages/login'
import { Routes, Route } from 'react-router-dom'

const App: FC = () => {
  return (
    <Routes>
      <Route element={<LoginPage />} path="/login" />
      <Route element={<div>hola este es signup</div>} path="/signup" />
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
