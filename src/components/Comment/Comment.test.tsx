import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import { Comment } from "./Comment";

test("Page", () => {
  render(
    <Comment
      comment={{ author: { avatarUrl: "", login: "Me" }, body: "foo", createdAt: new Date().toISOString(), id: "1" }}
    />,
  );
  expect(screen.getByRole("img")).toBeDefined();
});
