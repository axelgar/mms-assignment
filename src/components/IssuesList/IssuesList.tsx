import { Filter, Issue } from "@/types";
import { S } from "./styled";
import { formatDistance } from "date-fns";
import { ClosedIcon, OpenIcon } from "@/atoms";
import Link from "next/link";
import { useUrlUpdater } from "@/hooks";

type Props = {
  filter?: string;
  issues: { node: Issue }[];
  openIssues: number;
  closedIssues: number;
};

export const IssuesList = (props: Props) => {
  const { issues, openIssues, closedIssues, filter } = props;
  const { updateFilter } = useUrlUpdater();

  const handleOnFilter = (newFilter: Filter) => () => updateFilter(newFilter);

  return (
    <S.Container>
      <S.Header>
        <S.FilterButton onClick={handleOnFilter("open")} $active={filter === "open"} $type="open">
          <OpenIcon fill="rgb(145, 152, 161)" /> {openIssues} Open
        </S.FilterButton>
        <S.FilterButton onClick={handleOnFilter("closed")} $active={filter === "closed"} $type="closed">
          <ClosedIcon fill="rgb(145, 152, 161)" /> {closedIssues} Close
        </S.FilterButton>
      </S.Header>

      <ul>
        {issues.map(({ node }) => (
          <S.Issue key={node.number}>
            <Link href={`/issue/${node.number}`}>
              {node.state === "OPEN" ? <OpenIcon /> : <ClosedIcon />}
              <div>
                <S.IssueTitle>{node.title}</S.IssueTitle>
                <S.IssueDetails>
                  # {node.number}{" "}
                  {formatDistance(new Date(node.createdAt), new Date(), {
                    addSuffix: true,
                  })}
                </S.IssueDetails>
              </div>
            </Link>
          </S.Issue>
        ))}
      </ul>
    </S.Container>
  );
};
