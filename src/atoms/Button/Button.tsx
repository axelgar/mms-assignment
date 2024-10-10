import { ReactNode } from "react";
import { S } from "./styled";

type Props = {
  children: ReactNode;
  href?: string;
  disabled?: boolean;
};

export const Button = (props: Props) => {
  const { children, href, disabled } = props;

  const as = href ? "a" : "button";
  console.log({ disabled });
  return (
    <S.Button
      as={as}
      href={href}
      className={`${disabled ? "isDisabled" : ""}`}
      disabled={disabled}
    >
      {children}
    </S.Button>
  );
};
