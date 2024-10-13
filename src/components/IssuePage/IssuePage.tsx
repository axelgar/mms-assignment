/* eslint-disable @next/next/no-img-element */
import { IssueWithComments } from "@/types";
import { Page } from "../Page";
import { Comment } from "../Comment";

import { S } from "./styled";
import { useRouter } from "next/navigation";

type Props = {
  issue: IssueWithComments;
};

export const IssuePage = (props: Props) => {
  const { issue } = props;
  const router = useRouter();

  const handleOnClick = () => {
    router.back();
  };

  return (
    <Page>
      <S.BackButton onClick={handleOnClick}>Go to issues list</S.BackButton>

      <S.Header>
        <S.Title>{issue.title}</S.Title>
        <S.Number>#{issue.number}</S.Number>
      </S.Header>

      <S.Body>{issue.body}</S.Body>

      <ul>
        {issue.comments.nodes.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </ul>
    </Page>
  );
};
