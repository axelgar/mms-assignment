import { GET_ISSUE_AND_COMMENTS } from "@/api/queries";
import { client } from "@/apollo-client";
import { NotFoundPage, IssuePage } from "@/components";
import { IssueWithComments } from "@/types";
import { GetServerSidePropsContext } from "next";
import Head from "next/head";

type Props = {
  issue: IssueWithComments;
};

export default function Page(props: Props) {
  if (!props.issue) {
    return <NotFoundPage />;
  }

  return (
    <>
      <Head>
        <title>{props.issue.title}</title>
        <meta name="description" content={props.issue.body} />
        <meta property="og:title" content={props.issue.title} key="title" />
      </Head>
      <IssuePage {...props} />
    </>
  );
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
