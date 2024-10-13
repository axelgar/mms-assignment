import { client } from "@/apollo-client";
import { GetServerSidePropsContext } from "next";
import { IssuesListPage } from "@/components";
import { COUNT_ISSUES, SEARCH_ISSUES } from "@/api/queries";
import { Filter, Issue, PageInfo } from "@/types";
import Head from "next/head";

type Props = {
  keyword: string;
  issues: { node: Issue }[];
  filter?: Filter;
  openIssues: number;
  closedIssues: number;
  pageInfo: PageInfo;
};

export default function Page(props: Props) {
  return (
    <>
      <Head>
        <title>React repo issues tracker</title>
        <meta
          name="description"
          content="Website to track all issues from GitHub in the React repository from Facebook. Using GraphQL API."
        />
        <meta property="og:title" content="React repo issues tracker" key="title" />
      </Head>
      <IssuesListPage {...props} />
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { query } = context;
  const keyword = query.keyword || "";
  const filter = query.filter || "";
  const after = query.after || null;
  const before = query.before || null;

  try {
    const variables = {
      queryString: `repo:facebook/react is:issue sort:created-desc ${filter && `is:${filter}`} ${keyword}`,
      after,
      first: after || !before ? 10 : null,
      before,
      last: before ? 10 : null,
    };

    const [search, countClosedIssues, countOpenIssues] = await Promise.all([
      await client.query({
        query: SEARCH_ISSUES,
        variables,
      }),
      await client.query({
        query: COUNT_ISSUES,
        variables: { queryString: "repo:facebook/react is:issue is:closed" },
      }),
      await client.query({
        query: COUNT_ISSUES,
        variables: { queryString: "repo:facebook/react is:issue is:open" },
      }),
    ]);

    return {
      props: {
        issues: search.data.search.edges,
        keyword,
        filter,
        pageInfo: search.data.search.pageInfo,
        openIssues: countOpenIssues.data.search.issueCount,
        closedIssues: countClosedIssues.data.search.issueCount,
      },
    };
  } catch (error) {
    console.error(error);
    return { props: {} };
  }
}
