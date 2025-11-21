import { Link } from "react-router-dom";
import "./Main.css";

function Home() {
  return (
    <div className="main-container a">
      <h1 className="main-title">Welcome to Product Inventory System</h1>
      <p className="main-subtext">Manage products, update stock, and track history.</p>

      <Link to="/login" className="main-btn">Get Started</Link>
    </div>
  );
}

export default Home;
