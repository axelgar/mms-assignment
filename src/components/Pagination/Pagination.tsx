import { ButtonLink } from "@/atoms";
import { S } from "./styled";
import { PageInfo } from "@/types";

type Props = {
  keyword: string;
  pageInfo: PageInfo;
};

export const Pagination = (props: Props) => {
  const { keyword, pageInfo } = props;
  const { endCursor, hasNextPage, hasPreviousPage, startCursor } = pageInfo;

  return (
    <S.Container>
      <ButtonLink
        href={`/?keyword=${keyword}&before=${startCursor}`}
        disabled={!hasPreviousPage}
      >
        ← Previous
      </ButtonLink>
      <ButtonLink
        href={`/?keyword=${keyword}&after=${endCursor}`}
        disabled={!hasNextPage}
      >
        Next →
      </ButtonLink>
    </S.Container>
  );
};
