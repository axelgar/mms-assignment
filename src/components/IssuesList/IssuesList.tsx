import { Issue } from "@/types";
import { S } from "./styled";

type Props = {
  issues: Issue[];
  openIssues: number;
  closedIssues: number;
};

export const IssuesList = (props: Props) => {
  const { issues, openIssues, closedIssues } = props;

  return (
    <S.Container>
      <S.Header>
        <button>{openIssues} Open</button>
        <button>{closedIssues} Close</button>
      </S.Header>

      <ul style={{ listStyle: "none" }}>
        {issues.map(({ node }) => (
          <S.Issue key={node.title}>
            <S.IssueTitle>{node.title}</S.IssueTitle>
            <p style={{ fontSize: "12px" }}># {node.number}</p>
          </S.Issue>
        ))}
      </ul>
    </S.Container>
  );
};
