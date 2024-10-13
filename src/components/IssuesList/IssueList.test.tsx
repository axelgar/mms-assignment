import { expect, test, describe, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { IssuesList } from "./IssuesList";
import { Issue } from "@/types";
import { setup } from "@/tests/uilts";
import * as nextRouter from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

vi.mock("next/navigation");

const issues = [
  {
    node: { title: "foo", body: "", url: "string", number: 1, createdAt: new Date().toISOString(), state: "OPEN" },
  },
] as { node: Issue }[];

describe("IssuesList", () => {
  test("should render correclty", () => {
    render(<IssuesList closedIssues={10} issues={issues} openIssues={10} />);
    expect(screen.getByRole("list")).toBeDefined();
  });

  test("should render the list of issues", () => {
    render(<IssuesList closedIssues={10} issues={issues} openIssues={10} />);
    expect(screen.getAllByRole("listitem").length).toBe(issues.length);
  });

  test("open filter correclty calls router.push to update the filter", async () => {
    const push = vi.fn();
    vi.spyOn(nextRouter, "useRouter").mockImplementation(() => ({ push }) as unknown as AppRouterInstance);

    const { user } = setup(<IssuesList closedIssues={10} issues={issues} openIssues={10} />);

    await user.click(screen.getByRole("button", { name: `10 Open` }));

    expect(push).toHaveBeenCalledWith(`/?filter=open`);
  });

  test("closed filter correclty calls router.push to update the filter", async () => {
    const push = vi.fn();
    vi.spyOn(nextRouter, "useRouter").mockImplementation(() => ({ push }) as unknown as AppRouterInstance);

    const { user } = setup(<IssuesList closedIssues={10} issues={issues} openIssues={10} />);

    await user.click(screen.getByRole("button", { name: `10 Close` }));

    expect(push).toHaveBeenCalledWith(`/?filter=closed`);
  });
});
