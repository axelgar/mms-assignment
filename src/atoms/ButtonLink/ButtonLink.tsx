import { ReactNode } from "react";
import { S } from "./styled";
import Link from "next/link";

type Props = {
  children: ReactNode;
  href: string;
  disabled?: boolean;
};

export const ButtonLink = (props: Props) => {
  const { children, href, disabled } = props;

  return (
    <Link href={href} passHref legacyBehavior>
      <S.A className={`${disabled ? "isDisabled" : ""}`}>{children}</S.A>
    </Link>
  );
};
