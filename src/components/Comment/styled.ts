import styled from "styled-components";

const Container = styled.li`
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
`;

const Avatar = styled.img`
  border-radius: 100%;
`;

const Article = styled.article`
  border: 1px solid rgb(61, 68, 77);
  border-radius: 6px;
  width: 100%;
  color: rgb(209, 215, 224);
  font-size: 14px;
`;

const Header = styled.header`
  padding-bottom: 8px;
  padding-top: 8px;
  border-bottom: 1px solid rgb(61, 68, 77);
  background: rgb(38, 44, 54);
  font-weight: 600;
  display: flex;
  gap: 8px;
`;

const AuthorName = styled.p`
  padding-left: 16px;
`;

const Date = styled.p`
  color: rgb(145, 152, 161);
`;

const Body = styled.p`
  padding: 16px;
  white-space: pre-wrap;
`;

export const S = { Avatar, Article, AuthorName, Body, Container, Date, Header };
