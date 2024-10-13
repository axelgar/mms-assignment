import { Button } from "@/atoms";
import { S } from "./styled";
import { PageInfo } from "@/types";
import { useRouter } from "next/navigation";

type Props = {
  pageInfo: PageInfo;
};

export const Pagination = (props: Props) => {
  const { pageInfo } = props;
  const { endCursor, hasNextPage, hasPreviousPage, startCursor } = pageInfo;
  const router = useRouter();

  const handleOnPageClick = (key: "before" | "after") => () => {
    const url = new URL(window.location.href);

    if (key === "after") {
      url.searchParams.delete("before");
      url.searchParams.set(key, endCursor);
    } else {
      url.searchParams.delete("after");
      url.searchParams.set(key, startCursor);
    }

    router.push(`/${url.search}`);
  };

  return (
    <S.Container>
      <Button onClick={handleOnPageClick("before")} disabled={!hasPreviousPage}>
        ← Previous
      </Button>
      <Button onClick={handleOnPageClick("after")} disabled={!hasNextPage}>
        Next →
      </Button>
    </S.Container>
  );
};
