import { useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Routes,Route } from 'react-router-dom'
import SignUp from './components/SignupPage/SignUp'
import SignIn from './components/SignInPage/SignIn'
import Home from './components/Home/Home'
import About from './components/About/About'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='w-full relative'>
      <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/signup' element={<SignUp/>} />
            <Route path='/login' element={<SignIn/>} />
            <Route path='/about' element={<About/>} />
            
          </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
