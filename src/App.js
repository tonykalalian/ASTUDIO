import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";
import { ProductProvider } from "./ProductContext";
import { UserProvider } from "./UserContext";
import UserTable from "./components/UserTable";
import ProductTable from "./components/ProductTable";
import "./App.css";

function App() {
  return (
    <>
      <Router>
        <nav>
          <NavLink to="/users" className="active-link">
            Users
          </NavLink>
          <span>/</span>
          <NavLink to="/products" className="active-link">
            Products
          </NavLink>
        </nav>

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
