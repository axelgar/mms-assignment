import { ReactNode } from "react";
import { S } from "./styled";

type Props = {
  children: ReactNode;
};

export const Page = (props: Props) => {
  return <S.Container>{props.children}</S.Container>;
};
