import { Button } from "@/atoms";
import { S } from "./styled";
import { PageInfo } from "@/types";
import { useUrlUpdater } from "@/hooks";

type Props = {
  pageInfo: PageInfo;
};

export const Pagination = (props: Props) => {
  const { pageInfo } = props;
  const { endCursor, hasNextPage, hasPreviousPage, startCursor } = pageInfo;
  const { updateAfterCursor, updateBeforeCursor } = useUrlUpdater();

  return (
    <S.Container>
      <Button onClick={() => updateBeforeCursor(startCursor)} disabled={!hasPreviousPage}>
        ← Previous
      </Button>
      <Button onClick={() => updateAfterCursor(endCursor)} disabled={!hasNextPage}>
        Next →
      </Button>
    </S.Container>
  );
};
