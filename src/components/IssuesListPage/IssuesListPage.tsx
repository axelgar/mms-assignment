import { Search } from "../Search";
import { IssuesList } from "../IssuesList";
import { Pagination } from "../Pagination";
import { Filter, Issue, PageInfo } from "@/types";
import { Page } from "../Page";
import { S } from "./styled";

type Props = {
  keyword: string;
  issues: { node: Issue }[];
  filter?: Filter;
  openIssues: number;
  closedIssues: number;
  pageInfo: PageInfo;
};

export const IssuesListPage = (props: Props) => {
  const { keyword, issues, filter, openIssues, closedIssues, pageInfo } = props;

  return (
    <Page>
      <S.Title>Welcome to the React repo issues tracker! 👋</S.Title>

      <Search keyword={keyword} />

      {issues.length ? (
        <IssuesList filter={filter} issues={issues} openIssues={openIssues} closedIssues={closedIssues} />
      ) : (
        <S.NotFoundMessage>No issues found</S.NotFoundMessage>
      )}

      <Pagination pageInfo={pageInfo} />
    </Page>
  );
};
