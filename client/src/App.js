import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './resources/global.css';
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";



function App() {
  //<Route path="/dashboard" element={<dashboard/>} />
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;