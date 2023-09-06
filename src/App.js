import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { ProductProvider } from "./ProductContext";
import { UserProvider } from "./UserContext";
import UserTable from "./components/UserTable";
import ProductTable from "./components/ProductTable";

function App() {
  return (
    <>
      <Router>
        <Link to="/users">Users</Link>
        <Link to="/products">Products</Link>

        <Routes>
          <Route
            path="/users"
            element={
              <UserProvider>
                <UserTable />
              </UserProvider>
            }
          />
          <Route
            path="/products"
            element={
              <ProductProvider>
                <ProductTable />
              </ProductProvider>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
