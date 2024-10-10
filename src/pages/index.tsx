import { gql } from "@apollo/client";
import createApolloClient from "@/apollo-client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { GetServerSidePropsContext } from "next";
import { Button } from "@/components";

export default function IssuesPage({ issues, keyword, pageInfo }) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState(keyword);

  const handleSearch = (e) => {
    e.preventDefault();
    router.push(`/?keyword=${searchTerm}`);
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search issues..."
        />
        <button type="submit">Search</button>
      </form>

      <h1>Search Results for &quot;{keyword}&quot;</h1>
      <ul>
        {issues?.map((issue) => (
          <li key={issue.node.number}>
            <a href={issue.node.url} target="_blank" rel="noopener noreferrer">
              {issue.node.title}
            </a>
            {/* <p>{issue.node.body}</p> */}
          </li>
        ))}
      </ul>

      {/* Pagination controls */}
      <div>
        {pageInfo?.hasNextPage && (
          <Button href={`/?keyword=${keyword}&before=${pageInfo.startCursor}`}>
            Previous
          </Button>
        )}
        {pageInfo?.hasNextPage && (
          <a href={`/?keyword=${keyword}&after=${pageInfo.endCursor}`}>Next</a>
        )}
      </div>
    </div>
  );
}

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

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { query } = context;
  const keyword = query.keyword || "";
  const after = query.after || null;
  const before = query.before || null;

  const client = createApolloClient();

  try {
    const variables = {
      queryString: `repo:facebook/react is:issue ${keyword}`,
      first: after || !before ? 10 : null,
      after: after || null,
      last: before ? 10 : null,
      before: before || null,
    };

    const { data } = await client.query({
      query: SEARCH_ISSUES_QUERY,
      variables,
    });

    return {
      props: {
        issues: data.search.edges,
        keyword,
        pageInfo: data.search.pageInfo,
      },
    };
  } catch (error) {
    console.error("Error searching issues:", error);
    return { props: {} };
  }
}
