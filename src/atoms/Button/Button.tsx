import { MouseEvent, ReactNode } from "react";
import { S } from "./styled";

type Props = {
  children: ReactNode;
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
};

export const Button = (props: Props) => {
  const { children, disabled, onClick } = props;

  return (
    <S.Button disabled={disabled} onClick={onClick}>
      {children}
    </S.Button>
  );
};
