import { useRouter } from "next/navigation";
import { Page } from "../Page";
import { S } from "./styled";
import Head from "next/head";

export const NotFoundPage = () => {
  const router = useRouter();

  const handleOnClick = () => {
    router.push("/");
  };

  return (
    <>
      <Head>
        <title>Not found</title>
        <meta property="og:title" content="Not found" key="title" />
      </Head>
      <Page>
        <S.BackButton onClick={handleOnClick}>Go to issues list</S.BackButton>
        <S.Title>404 - Not found</S.Title>
      </Page>
    </>
  );
};
