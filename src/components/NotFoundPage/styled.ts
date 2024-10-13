import styled from "styled-components";

const Title = styled.h1`
  margin-top: 32px;
  text-align: center;
`;

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

export const S = { BackButton, Title };
