import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f0f0f0;
  color: #333;
`;

const Title = styled.h1`
  font-size: 36px;
  margin-bottom: 20px;
`;

const Description = styled.p`
  font-size: 18px;
  text-align: center;
  max-width: 600px;
  margin-bottom: 40px;
`;

const Button = styled.button`
  background-color: #007bff;
  color: #fff;
  padding: 10px 20px;
  font-size: 18px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const HomePage = () => {
  return (
    <Container>
      <Title>Welcome to ASTUDIO</Title>
      <Description>
        We are architects that leave the place better than we found it
      </Description>
      <Button>Get Started</Button>
    </Container>
  );
};

export default HomePage;
