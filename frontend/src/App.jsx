import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard.jsx'
import Login from './pages/Login.jsx'
import StudentList from './pages/StudentList.jsx'
import StudentForm from './pages/StudentForm.jsx'
import StudentView from './pages/StudentView.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/students" 
        element={
          <ProtectedRoute>
            <StudentList />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/students/create" 
        element={
        <ProtectedRoute>
          <StudentForm />
        </ProtectedRoute>
      }
      />
      <Route 
        path="/students/:id" 
        element={
          <ProtectedRoute>
            <StudentView />
          </ProtectedRoute>
        } 
      />
    </Routes>
  )
}

export default App