import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ProductProvider } from "./components/context/ProductContext";
import { UserProvider } from "./components/context/UserContext";
import UserTable from "./components/user/UserTable";
import ProductTable from "./components/product/ProductTable";
import Navbar from "./components/common/Navbar";
import HomePage from "./pages/HomePage";
import Footer from "./components/common/Footer"; // Import the Footer component

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
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
        <Footer />
      </Router>
    </>
  );
}

export default App;
