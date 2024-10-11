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

  // TODO refactor ButtonLink component to be a button only use router to navigate with query params
  //   const handleOnPageClick = (key: "before" | "after") => () => {
  //     const url = new URL(window.location.href);
  //     url.searchParams.set("key", key === "after" ? endCursor : startCursor);
  //     router.push(`/${url.search}`);
  //   };

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
