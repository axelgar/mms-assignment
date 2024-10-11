import { gql } from "@apollo/client";

export const SEARCH_ISSUES_QUERY = gql`
  query SearchIssues(
    $queryString: String!
    $first: Int
    $after: String
    $last: Int
    $before: String
  ) {
    search(
      query: $queryString
      type: ISSUE
      first: $first
      after: $after
      last: $last
      before: $before
    ) {
      issueCount
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
