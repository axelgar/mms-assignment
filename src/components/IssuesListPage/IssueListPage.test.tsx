import { expect, test, describe, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { IssuesListPage } from "./IssuesListPage";
import { Issue } from "@/types";

vi.mock("next/navigation");

const issues = [
  {
    node: { title: "foo", body: "", url: "string", number: 1, createdAt: new Date().toISOString(), state: "OPEN" },
  },
] as { node: Issue }[];
const pageInfo = { startCursor: "", endCursor: "", hasPreviousPage: true, hasNextPage: true };

describe("IssuesListPage", () => {
  test("should render correclty", () => {
    render(<IssuesListPage closedIssues={10} issues={issues} keyword="" openIssues={10} pageInfo={pageInfo} />);

    expect(
      screen.getByRole("heading", { level: 1, name: "Welcome to the React repo issues tracker! 👋" }),
    ).toBeDefined();
  });

  test("should render not found message when no issues", () => {
    render(<IssuesListPage closedIssues={10} issues={[]} keyword="" openIssues={10} pageInfo={pageInfo} />);

    expect(screen.getByText("No issues found")).toBeDefined();
  });
});
