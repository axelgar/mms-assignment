import createApolloClient from "@/apollo-client";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { GetServerSidePropsContext } from "next";
import { Page, Pagination } from "@/components";
import { COUNT_ISSUES, SEARCH_ISSUES_QUERY } from "@/api/queries";
import { IssuesList } from "@/components";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function IssuesPage(props: any) {
  const { issues, keyword, pageInfo, openIssues, closedIssues } = props;
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState(keyword);

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/?keyword=${searchTerm}`);
  };

  return (
    <Page>
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

      {issues.length ? (
        <IssuesList
          issues={issues}
          openIssues={openIssues}
          closedIssues={closedIssues}
        />
      ) : (
        <></>
      )}

      {/* <ul>
        {issues?.map((issue) => (
          <li key={issue.node.number}>
            <a href={issue.node.url} target="_blank" rel="noopener noreferrer">
              {issue.node.title}
            </a>
            <p>{issue.node.body}</p>
          </li>
        ))}
      </ul> */}

      <Pagination keyword={keyword} pageInfo={pageInfo} />
    </Page>
  );
}

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
