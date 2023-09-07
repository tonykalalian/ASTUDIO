import React from "react";
import styled from "styled-components";
import LuxBackground from ".././assets/background.jpg";
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-image: url(${LuxBackground});
  background-size: cover;
  background-position: center;
  color: #fff;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 48px;
  margin-bottom: 20px;
  font-family: "Playfair Display", serif;
`;

const Description = styled.p`
  font-size: 24px;
  max-width: 800px;
  margin-bottom: 40px;
  font-family: "Neutra Text", sans-serif; 
`;

const Button = styled.button`
  background-color: #ffd700;
  color: #333;
  padding: 15px 30px;
  font-size: 24px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #f5c542;
  }
`;

const HomePage = () => {
  return (
    <Container>
      <Title>Welcome to ASTUDIO</Title>
      <Description>
        Crafting Timeless Architecture for a Luxurious Lifestyle
      </Description>
      <Button>Explore Our Projects</Button>
    </Container>
  );
};

export default HomePage;
