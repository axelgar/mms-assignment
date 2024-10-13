import Spinner from "@/atoms/Spinner/Spinner";
import { S } from "./styled";

export const Loading = () => {
  return (
    <S.Container>
      <Spinner />
    </S.Container>
  );
};
