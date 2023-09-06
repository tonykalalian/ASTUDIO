import React from "react";
import styled from "styled-components";

const FooterContainer = styled.footer`
  background-color: #322625; /* Dark Brown */
  color: #ebebeb; /* Light Grey */
  padding: 20px 0;
  text-align: center;
`;

const CopyrightText = styled.p`
  font-size: 16px;
  margin: 0;
`;

const NameText = styled.p`
  font-size: 24px;
  margin: 0;
  color: #f0c14b; /* Gold */
`;

const Footer = () => {
  return (
    <FooterContainer>
      <NameText>Tony Kalalian</NameText>
      <CopyrightText>
        &copy; {new Date().getFullYear()} All rights reserved.
      </CopyrightText>
    </FooterContainer>
  );
};

export default Footer;
