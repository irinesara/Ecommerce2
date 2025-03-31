import './App.css'
import { Route, Routes } from 'react-router-dom'
import { Login } from './Components/Login'
import { Signup } from './Components/Signup'

function App() {
  

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  )
}

export default App