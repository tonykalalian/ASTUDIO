import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";
import LogoImage from "../../assets/logo.png";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";

const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: Arial, sans-serif;
    background-color: #f7f7f7; 
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
  min-height: 10vh;
  background-color: #fff;
  color: #f0c14b;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
  transition: background-color 0.3s ease;

  &.collapsed {
    background-color: #222;
  }

  @media (max-width: 768px) {
    padding: 0 1rem;
  }
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;

  a {
    text-decoration: none;
    color: #ffd700;
    display: flex;
    align-items: center;
  }
`;

const AppleImg = styled.img`
  width: 40px;
  margin-right: 10px;
`;

const NavItems = styled.ul`
  list-style: none;
  display: flex;

  @media (max-width: 768px) {
    display: ${({ open }) => (open ? "flex" : "none")};
    flex-direction: column;
    position: absolute;
    top: 10vh;
    right: 2rem;
    width: 150px;
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    padding: 1rem;
    z-index: 1;
    margin: 0;
  }
`;

const NavItem = styled.li`
  margin-left: 1.5rem;

  @media (max-width: 768px) {
    margin: 0.5rem 0;
  }

  a {
    text-decoration: none;
    color: #ffd700;
    font-weight: bold;

    &.active {
      color: #322625;
    }

    @media (max-width: 768px) {
      text-align: center;
      width: 100%;
      padding: 0.5rem 0;
      display: block;
    }
  }

  @media (min-width: 768px) {
    margin-left: 2rem;
  }
`;

const HamburgerMenu = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    font-size: 1.5rem;
    padding: 5px;
  }
`;

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <GlobalStyles />
      <Container className={mobileMenuOpen ? "collapsed" : ""}>
        <Logo>
          <a href="/">
            <AppleImg src={LogoImage} alt="Company Logo" />
          </a>
        </Logo>

        <NavItems open={mobileMenuOpen}>
          <NavItem>
            <NavLink
              to="/"
              activeClassName="active"
              exact={true}
              onClick={closeMobileMenu}
            >
              Home
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              to="/users"
              activeClassName="active"
              onClick={closeMobileMenu}
            >
              Users
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              to="/products"
              activeClassName="active"
              onClick={closeMobileMenu}
            >
              Products
            </NavLink>
          </NavItem>
        </NavItems>

        <HamburgerMenu onClick={handleMenuToggle}>
          {mobileMenuOpen ? (
            <MenuRoundedIcon style={{ color: "#ffd700" }} />
          ) : (
            <MenuRoundedIcon style={{ color: "#f0c14b" }} />
          )}
        </HamburgerMenu>
      </Container>
    </>
  );
};

export default Navbar;
