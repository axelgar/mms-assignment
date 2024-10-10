import { ReactNode } from "react";
import { S } from "./styled";

type Props = {
  children: ReactNode;
  href?: string;
};

export const Button = (props: Props) => {
  const { children, href } = props;

  const as = href ? "a" : "button";

  return (
    <S.Button as={as} href={href}>
      {children}
    </S.Button>
  );
};
