import styled from "styled-components";

export const S = {
  Container: styled.div`
    border: 1px solid rgb(61, 68, 77);
    border-radius: 6px;
  `,

  Header: styled.header`
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 16px;
    background-color: rgb(38, 44, 54);
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
    border-bottom: 1px solid rgb(61, 68, 77);
  `,

  Issue: styled.li`
    border-top-color: transparent;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    color: rgb(209, 215, 224);
    padding: 8px 16px;
    border-top: 1px solid rgba(61, 68, 77, 0.7);

    &:hover {
      background-color: rgb(38, 44, 54);
    }

    &:first-child {
      border-top-color: transparent;
      border-top-left-radius: 0;
      border-top-right-radius: 0;
    }
  `,

  IssueTitle: styled.p`
    font-size: 16px;
    font-weight: 600;
  `,
};
