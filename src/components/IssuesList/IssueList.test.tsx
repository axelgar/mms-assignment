import { expect, test, describe, vi } from "vitest";
import { screen } from "@testing-library/react";
import { IssuesList } from "./IssuesList";
import { Issue } from "@/types";
import { setup } from "@/tests/uilts";
import * as nextRouter from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

vi.mock("next/navigation");

const issues = [
  { node: { title: "foo", body: "", url: "string", number: 1, createdAt: new Date().toISOString(), state: "OPEN" } },
] as { node: Issue }[];

const renderIssuesList = () => setup(<IssuesList closedIssues={10} issues={issues} openIssues={10} />);

describe("IssuesList", () => {
  test("should render correclty", () => {
    renderIssuesList();
    expect(screen.getByRole("list")).toBeInTheDocument();
  });

  test("should render the list of issues", () => {
    renderIssuesList();
    expect(screen.getAllByRole("listitem").length).toBe(issues.length);
  });

  test("open filter correclty calls router.push to update the filter", async () => {
    const push = vi.fn();
    vi.spyOn(nextRouter, "useRouter").mockImplementation(() => ({ push }) as unknown as AppRouterInstance);
    const { user } = renderIssuesList();

    await user.click(screen.getByRole("button", { name: /10 Open/i }));

    expect(push).toHaveBeenCalledWith(`/?filter=open`);
  });

  test("closed filter correclty calls router.push to update the filter", async () => {
    const push = vi.fn();
    vi.spyOn(nextRouter, "useRouter").mockImplementation(() => ({ push }) as unknown as AppRouterInstance);
    const { user } = renderIssuesList();

    await user.click(screen.getByRole("button", { name: /10 Close/i }));

    expect(push).toHaveBeenCalledWith(`/?filter=closed`);
  });
});
