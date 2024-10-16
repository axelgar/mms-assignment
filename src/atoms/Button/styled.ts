import styled from "styled-components";

const Button = styled.button`
  color: rgb(71, 139, 230);
  min-width: 32px;
  padding: 5px 10px;
  text-align: center;
  border: 1px solid transparent;
  border-radius: 6px;
  transition: border-color 0.2s cubic-bezier(0.3, 0, 0.5, 1);
  background: transparent;
  cursor: pointer;

  &:hover {
    border-color: rgba(61, 68, 77, 1);
  }

  &:disabled {
    cursor: default;
    color: rgb(101, 108, 118);
  }

  &:disabled:hover {
    border-color: transparent;
  }
`;

export const S = {
  Button,
};
