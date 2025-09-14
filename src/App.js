
import { Link, Route, Routes } from 'react-router-dom';
import './App.css'
import AdminRoutes from './routes/AdminRoutes';



function App() {


  return (
    <Routes>
      {/* <Route path="/" element={<Link to="/admin">Go to Admin</Link>} /> */}

      {/* Admin Dashboard */}
      {/* <Route path="/admin/*" element={<AdminRoutes />} /> */}
      <Route path="/" element={<AdminRoutes />} />
    </Routes>
  )
}

export default App
