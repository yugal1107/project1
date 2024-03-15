import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './styles/home.css'
import Map from './components/Map'
import User from './components/User'
import Admin from './components/Admin'
import {BrowserRouter , Routes , Route} from 'react-router-dom'
import Home from './components/Home'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/user" element={<User />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
    // <Map />
    
  )
}

export default App
