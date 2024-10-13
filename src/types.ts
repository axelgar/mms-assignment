export type PageInfo = {
  startCursor: string;
  endCursor: string;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
};

export type Issue = {
  title: string;
  body: string;
  url: string;
  number: number;
  createdAt: string;
  state: "OPEN" | "CLOSED";
};

export type IssueWithComments = Issue & {
  comments: { nodes: { id: string; body: string; createdAt: string; author: { login: string; avatarUrl: string } }[] };
};
