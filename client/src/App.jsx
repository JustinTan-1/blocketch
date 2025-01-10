import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Draw from './pages/Draw'
import Login from './pages/Login'
import Register from './pages/Register'
import Logout from './pages/Logout'

export default function App() {
  return(
    <Router>
      <Routes>
        <Route index element={<Draw></Draw>} />
        <Route path="/home" element={<Draw></Draw>} />
        <Route path="/login" element={<Login></Login>} />
        <Route path="/register" element={<Register></Register>} />
        <Route path="/logout" element={<Logout></Logout>} />
      </Routes>
    </Router>
  )
}