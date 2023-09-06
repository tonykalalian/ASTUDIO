import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";
import { ProductProvider } from "./components/context/ProductContext";
import { UserProvider } from "./components/context/UserContext";
import UserTable from "./components/user/UserTable";
import ProductTable from "./components/product/ProductTable";

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
