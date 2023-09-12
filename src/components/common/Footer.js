import React from "react";
import styled from "styled-components";

const FooterContainer = styled.footer`
  background-color: #ffd700;
  color: #322625;
  padding: 20px 0;
  text-align: center;
`;

const CopyrightText = styled.p`
  font-size: 16px;
  margin-top: 10px;
`;

const NameText = styled.p`
  font-size: 24px;
  margin: 0;
  color: #322625;
`;

const FooterLinks = styled.div`
  margin-top: 10px;
`;

const FooterLink = styled.a`
  font-size: 16px;
  text-decoration: none;
  color: #322625;

  margin: 0 15px;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <NameText>Tony Kalalian</NameText>
      <FooterLinks>
        <FooterLink href="/faq">FAQ</FooterLink>
        <FooterLink href="/privacy">Privacy</FooterLink>
        <FooterLink href="/terms">Terms</FooterLink>
        <FooterLink href="/policy">Policy</FooterLink>
      </FooterLinks>
      <CopyrightText>
        &copy; {new Date().getFullYear()} All rights reserved.
      </CopyrightText>
    </FooterContainer>
  );
};

export default Footer;
