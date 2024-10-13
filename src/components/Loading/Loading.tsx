import { Spinner } from "@/atoms";
import { S } from "./styled";

export const Loading = () => {
  return (
    <S.Container>
      <Spinner />
    </S.Container>
  );
};
