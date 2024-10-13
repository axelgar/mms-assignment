import { gql } from "@apollo/client";

export const SEARCH_ISSUES = gql`
  query SearchIssues($queryString: String!, $first: Int, $after: String, $last: Int, $before: String) {
    search(query: $queryString, type: ISSUE, first: $first, after: $after, last: $last, before: $before) {
      edges {
        node {
          ... on Issue {
            title
            body
            url
            number
            createdAt
            state
          }
        }
      }
      pageInfo {
        startCursor
        hasPreviousPage
        endCursor
        hasNextPage
      }
    }
  }
`;

export const COUNT_ISSUES = gql`
  query SearchIssues($queryString: String!) {
    search(query: $queryString, type: ISSUE, first: 0) {
      issueCount
    }
  }
`;

export const GET_ISSUE_AND_COMMENTS = gql`
  query GetIssueAndComments($issueNumber: Int!, $commentsFirst: Int!) {
    repository(owner: "facebook", name: "react") {
      issue(number: $issueNumber) {
        title
        body
        url
        number
        createdAt
        state
        comments(first: $commentsFirst) {
          nodes {
            id
            body
            createdAt
            author {
              login
              avatarUrl(size: 48)
            }
          }
        }
      }
    }
  }
`;
