import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import UserTable from "./components/UserTable";
import ProductTable from "./components/ProductTable";

function App() {
  return (
    <>
      <Router>
        <Link to="/users">Users</Link>
        <Link to="/products">Products</Link>

        <Routes>
          <Route path="/users" element={<UserTable />} />
          <Route path="/products" element={<ProductTable />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
