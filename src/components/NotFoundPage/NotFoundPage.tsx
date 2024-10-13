import { useRouter } from "next/navigation";
import { Page } from "../Page";
import { S } from "./styled";

export const NotFoundPage = () => {
  const router = useRouter();

  const handleOnClick = () => {
    router.push("/");
  };

  return (
    <Page>
      <S.BackButton onClick={handleOnClick}>Go to issues list</S.BackButton>
      <S.Title>404 - Not found</S.Title>
    </Page>
  );
};
