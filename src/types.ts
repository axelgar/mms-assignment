export type PageInfo = {
  startCursor: string;
  endCursor: string;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
};

export type Issue = {
  node: {
    id: string;
    title: string;
    body: string;
    url: string;
    number: number;
    createdAt: string;
    state: "OPEN" | "CLOSED";
  };
};
