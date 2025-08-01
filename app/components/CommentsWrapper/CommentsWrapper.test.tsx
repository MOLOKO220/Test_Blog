import { render, screen, fireEvent, act } from "@testing-library/react";
import CommentsWrapper from "./CommentsWrapper";

jest.mock("@/app/lib/commentsApi", () => ({
  fetchComments: jest.fn().mockResolvedValue([]),
  addComment: jest.fn(),
}));

describe("CommentsWrapper", () => {
  it("renders heading", async () => {
    await act(async () => {
      render(<CommentsWrapper postId="test-post-id" />);
    });
    expect(screen.getByText("Comments")).toBeInTheDocument();
  });

  it("shows error when trying to submit empty comment", async () => {
    await act(async () => {
      render(<CommentsWrapper postId="test-post-id" />);
    });

    const button = screen.getByRole("button", { name: /send/i });
    fireEvent.click(button);

    expect(
      await screen.findByText("Comment cannot be empty")
    ).toBeInTheDocument();
  });
});
