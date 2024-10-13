import createApolloClient from "@/apollo-client";
import { FormEvent, useState } from "react";
import { GetServerSidePropsContext } from "next";
import { Page, Pagination } from "@/components";
import { COUNT_ISSUES, SEARCH_ISSUES_QUERY } from "@/api/queries";
import { IssuesList } from "@/components";
import { Input } from "@/atoms";
import { useUrlUpdater } from "@/hooks";

// TODO fix any type
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function IssuesPage(props: any) {
  const { issues, keyword, pageInfo, filter, openIssues, closedIssues } = props;
  const [searchTerm, setSearchTerm] = useState(keyword);
  const { updateKeyword } = useUrlUpdater();

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    updateKeyword(searchTerm);
  };

  return (
    <Page>
      <h1
        style={{
          fontSize: "24px",
          fontWeight: 600,
          margin: "24px 0",
          textAlign: "center",
        }}
      >
        Welcome to the React repo issues tracker! 👋
      </h1>
      <form onSubmit={handleSearch} style={{ display: "flex", gap: "12px", marginBottom: "24px" }}>
        <Input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search issues..."
        />

        <button
          style={{
            background: "transparent",
            border: "1px solid rgb(61, 68, 77)",
            padding: "6px 10px",
            borderRadius: "6px",
          }}
          type="submit"
        >
          Search
        </button>
      </form>

      {issues.length ? (
        <IssuesList filter={filter} issues={issues} openIssues={openIssues} closedIssues={closedIssues} />
      ) : (
        <></>
      )}

      <Pagination keyword={keyword} pageInfo={pageInfo} />
    </Page>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { query } = context;
  const keyword = query.keyword || "";
  const filter = query.filter || "";
  const after = query.after || null;
  const before = query.before || null;

  const client = createApolloClient();

  try {
    const variables = {
      queryString: `repo:facebook/react is:issue sort:created-desc ${filter && `is:${filter}`} ${keyword}`,
      after,
      first: after || !before ? 10 : null,
      before,
      last: before ? 10 : null,
    };

    const { data } = await client.query({
      query: SEARCH_ISSUES_QUERY,
      variables,
    });

    const { data: countClosedIssues } = await client.query({
      query: COUNT_ISSUES,
      variables: { queryString: "repo:facebook/react is:issue is:closed" },
    });
    const { data: countOpenIssues } = await client.query({
      query: COUNT_ISSUES,
      variables: { queryString: "repo:facebook/react is:issue is:open" },
    });

    return {
      props: {
        issues: data.search.edges,
        keyword,
        filter,
        pageInfo: data.search.pageInfo,
        openIssues: countOpenIssues.search.issueCount,
        closedIssues: countClosedIssues.search.issueCount,
      },
    };
  } catch (error) {
    console.error("Error searching issues:", error);
    return { props: {} };
  }
}
