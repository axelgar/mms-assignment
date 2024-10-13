import { Issue } from "@/types";
import { S } from "./styled";
import { formatDistance } from "date-fns";
import { ClosedIcon, OpenIcon } from "@/atoms";
import { useRouter } from "next/navigation";
import Link from "next/link";

type Props = {
  filter?: string;
  issues: { node: Issue }[];
  openIssues: number;
  closedIssues: number;
};

export const IssuesList = (props: Props) => {
  const { issues, openIssues, closedIssues, filter } = props;
  const router = useRouter();

  const handleOnFilter = (newFilter: "open" | "closed") => () => {
    const url = new URL(window.location.href);

    if (newFilter === filter) {
      url.searchParams.delete("filter");
    } else {
      url.searchParams.set("filter", newFilter);
    }

    router.push(`/${url.search}`);
  };

  return (
    <S.Container>
      <S.Header>
        <S.FilterButton onClick={handleOnFilter("open")}>
          <OpenIcon fill="rgb(145, 152, 161)" /> {openIssues} Open
        </S.FilterButton>
        <S.FilterButton onClick={handleOnFilter("closed")}>
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
