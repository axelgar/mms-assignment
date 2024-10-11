export type PageInfo = {
  startCursor: string;
  endCursor: string;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
};

export type Issue = {
  node: {
    title: string;
    body: string;
    url: string;
    number: number;
    createdAt: string;
    state: "OPEN" | "CLOSED";
  };
};
