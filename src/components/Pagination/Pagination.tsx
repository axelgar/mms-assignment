import { Button } from "@/atoms";
import { S } from "./styled";
import { PageInfo } from "@/types";

type Props = {
  keyword: string;
  pageInfo: PageInfo;
};

export const Pagination = (props: Props) => {
  const { keyword, pageInfo } = props;
  const { endCursor, hasNextPage, hasPreviousPage, startCursor } = pageInfo;
  console.log({ hasNextPage, hasPreviousPage });
  return (
    <S.Container>
      <Button
        href={`/?keyword=${keyword}&before=${startCursor}`}
        disabled={!hasPreviousPage}
      >
        ← Previous
      </Button>
      <Button
        href={`/?keyword=${keyword}&after=${endCursor}`}
        disabled={!hasNextPage}
      >
        Next →
      </Button>
    </S.Container>
  );
};
