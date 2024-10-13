import { GET_ISSUE_AND_COMMENTS } from "@/api/queries";
import { client } from "@/apollo-client";
import { NotFoundPage } from "@/components";
import { IssuePage } from "@/components/IssuePage";
import { IssueWithComments } from "@/types";
import { GetServerSidePropsContext } from "next";

type Props = {
  issue: IssueWithComments;
};

export default function Page(props: Props) {
  if (!props.issue) {
    return <NotFoundPage />;
  }

  return <IssuePage {...props} />;
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { number } = context.query;

  try {
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
  } catch (error) {
    console.error(error);
    return { props: {} };
  }
}
