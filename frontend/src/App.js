import { useState } from "react";
import { Link, Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./component/Home";
import Login from "./component/Login";
import Products from "./component/Products";
import Register from "./component/Registration";
import './Navbar.css';
function App() {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <div className="pro">

      
   <nav className="navbar">
  <Link to="/" className="nav-link a">Home</Link>

  {!user && (
    <>
      <Link to="/login" className="nav-link">Login</Link>
      <Link to="/register" className="nav-link">Register</Link>
    </>
  )}

  {user && (
    <>
      <Link to="/products" className="nav-link">Products</Link>
      <button className="logout-btn" onClick={() => setUser(null)}>
        Logout
      </button>
    </>
  )}
</nav>


      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login setUser={setUser} />} />

        <Route path="/register" element={<Register />} />

        <Route
          path="/products"
          element={user ? <Products /> : <Navigate to="/login" replace />}
        />
      </Routes>
      </div>
    </Router>
  );
}

export default App;
