import { expect, test, describe } from "vitest";
import { render, screen } from "@testing-library/react";
import { Comment } from "./Comment";

const comment = {
  author: { avatarUrl: "", login: "Me" },
  body: "foo",
  createdAt: new Date().toISOString(),
  id: "1",
};

describe("Comment", () => {
  test("should render correclty", () => {
    render(<Comment comment={comment} />);
    expect(screen.getByRole("img")).toBeDefined();
    expect(screen.getByText(comment.author.login)).toBeDefined();
  });
});
