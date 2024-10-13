import styled from "styled-components";

const Form = styled.form`
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
`;

const Button = styled.button`
  background: transparent;
  border: 1px solid rgb(61, 68, 77);
  padding: 6px 10px;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background-color: rgb(38, 44, 54);
  }
`;

export const S = { Button, Form };
