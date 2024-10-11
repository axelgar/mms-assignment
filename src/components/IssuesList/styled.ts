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

  FilterButton: styled.button`
    display: flex;
    gap: 8px;
    align-items: center;
    background: transparent;
    border: 1px solid rgb(61, 68, 77);
    padding: 6px 10px;
    border-radius: 6px;
    cursor: pointer;
  `,

  Issue: styled.li`
    display: flex;
    gap: 8px;
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

  IssueDetails: styled.p`
    display: flex;
    gap: 4px;
    margin-top: 8px;
    font-size: 12px;
    color: rgb(145, 152, 161);
  `,
};
