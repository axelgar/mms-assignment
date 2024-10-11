import { ElementType, InputHTMLAttributes } from "react";
import { S } from "./styled";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  frontIcon?: ElementType;
};

export const Input = (props: Props) => {
  const { frontIcon: FrontIcon, ...rest } = props;

  return (
    <S.Container>
      {FrontIcon && <FrontIcon />}
      <S.Input {...rest} />
    </S.Container>
  );
};

Input.S = S;
