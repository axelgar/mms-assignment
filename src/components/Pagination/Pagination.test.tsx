import { expect, test, describe, vi } from "vitest";
import { screen } from "@testing-library/react";
import { Pagination } from "./Pagination";
import { setup } from "@/tests/uilts";
import * as nextRouter from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

vi.mock("next/navigation");

const pageInfo = { endCursor: "foo", hasNextPage: true, hasPreviousPage: true, startCursor: "bar" };

const renderPagination = () => setup(<Pagination pageInfo={pageInfo} />);

describe("Pagination", () => {
  test("should render correclty", () => {
    renderPagination();
    expect(screen.getAllByRole("button").length).toBe(2);
  });

  test("should have next disabeld if not nextPage", async () => {
    pageInfo.hasNextPage = false;
    setup(<Pagination pageInfo={pageInfo} />);

    expect(screen.getByRole<HTMLButtonElement>("button", { name: /Next/i })).toBeDisabled();
  });

  test("should have previous disabeld if not previousPage", async () => {
    pageInfo.hasPreviousPage = false;
    setup(<Pagination pageInfo={pageInfo} />);

    expect(screen.getByRole<HTMLButtonElement>("button", { name: /Previous/i })).toBeDisabled();
  });

  test("should update the url with the correct search query param when click on Next", async () => {
    const push = vi.fn();
    vi.spyOn(nextRouter, "useRouter").mockImplementation(() => ({ push }) as unknown as AppRouterInstance);

    pageInfo.hasNextPage = true;
    pageInfo.hasPreviousPage = true;
    const { user } = setup(<Pagination pageInfo={pageInfo} />);

    await user.click(screen.getByRole("button", { name: /Next/i }));

    expect(push).toHaveBeenCalledWith(`/?after=${pageInfo.endCursor}`);
  });

  test("should update the url with the correct search query param when click on Previous", async () => {
    const push = vi.fn();
    vi.spyOn(nextRouter, "useRouter").mockImplementation(() => ({ push }) as unknown as AppRouterInstance);

    pageInfo.hasNextPage = true;
    pageInfo.hasPreviousPage = true;
    const { user } = setup(<Pagination pageInfo={pageInfo} />);

    await user.click(screen.getByRole("button", { name: /Previous/i }));

    expect(push).toHaveBeenCalledWith(`/?before=${pageInfo.startCursor}`);
  });
});
