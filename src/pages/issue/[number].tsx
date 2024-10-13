import { GET_ISSUE_AND_COMMENTS } from "@/api/queries";
import { client } from "@/apollo-client";
import { IssuePage } from "@/components/IssuePage";
import { IssueWithComments } from "@/types";
import { GetServerSidePropsContext } from "next";

type Props = {
  issue: IssueWithComments;
};

export default function Page(props: Props) {
  return <IssuePage {...props} />;
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { number } = context.query;

  const { data } = await client.query({
    query: GET_ISSUE_AND_COMMENTS,
    variables: {
      issueNumber: Number(number),
      commentsFirst: 10,
    },
  });

  return {
    props: {
      issue: data.repository.issue,
    },
  };
}
