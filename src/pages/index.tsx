import { client } from "@/apollo-client";

import { GetServerSidePropsContext } from "next";
import { IssuesListPage } from "@/components";
import { COUNT_ISSUES, SEARCH_ISSUES } from "@/api/queries";
import { Filter, Issue, PageInfo } from "@/types";

type Props = {
  keyword: string;
  issues: { node: Issue }[];
  filter?: Filter;
  openIssues: number;
  closedIssues: number;
  pageInfo: PageInfo;
};

export default function Page(props: Props) {
  return <IssuesListPage {...props} />;
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

    const { data } = await client.query({
      query: SEARCH_ISSUES,
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
