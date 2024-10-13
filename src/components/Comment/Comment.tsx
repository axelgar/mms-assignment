import { IssueWithComments } from "@/types";
import { S } from "./styled";
import { formatDistance } from "date-fns";

type Props = {
  comment: IssueWithComments["comments"]["nodes"][number];
};

export const Comment = (props: Props) => {
  const { comment } = props;

  return (
    <S.Container>
      <S.Avatar width={40} height={40} src={comment.author.avatarUrl} alt="Avatar image of user" />
      <S.Article>
        <S.Header>
          <S.AuthorName>{comment.author.login}</S.AuthorName>
          <S.Date>
            commented{" "}
            {formatDistance(new Date(comment.createdAt), new Date(), {
              addSuffix: true,
            })}
          </S.Date>
        </S.Header>
        <S.Body>{comment.body}</S.Body>
      </S.Article>
    </S.Container>
  );
};
