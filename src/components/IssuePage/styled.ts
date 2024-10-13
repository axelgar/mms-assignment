import styled from "styled-components";

const BackButton = styled.button`
  font-size: 14px;
  color: rgb(145, 152, 161);
  background: transparent;
  border: none;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const Header = styled.header`
  margin-bottom: 32px;
  font-size: 32px;
`;

const Title = styled.h1`
  font-size: 32px;
`;

const Number = styled.p`
  color: rgb(145, 152, 161);
`;

const Body = styled.p`
  padding: 16px;
  font-size: 14px;
  border: 1px solid rgb(61, 68, 77);
  border-radius: 6px;
  margin-bottom: 24px;
  white-space: pre-wrap;
  overflow-wrap: break-word;
`;

export const S = { Body, Header, BackButton, Title, Number };
