import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import PostPage from "./page";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { useRouter, useParams } from "next/navigation";
import * as api from "@/app/lib/postApi";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  useParams: jest.fn(),
}));

jest.mock("@/app/lib/postApi", () => ({
  getPostById: jest.fn(),
  updatePost: jest.fn(),
  deletePost: jest.fn(),
}));

jest.mock("@/app/lib/postApi", () => ({
  getPostById: jest.fn(() => Promise.resolve({})),
  updatePost: jest.fn(),
  deletePost: jest.fn(),
}));

jest.mock("@/app/components/CommentsWrapper/CommentsWrapper", () => () => {
  return <div data-testid="mock-comments" />;
});

const fakeStore = configureStore({
  reducer: () => ({}),
});

const mockPost = {
  id: "1",
  title: "Test title",
  description: "Test description",
  content: "Test content",
  createdAt: new Date().toISOString(),
};

describe("PostPage", () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    (useParams as jest.Mock).mockReturnValue({ id: "1" });

    (api.getPostById as jest.Mock).mockResolvedValue(mockPost);
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
  });

  const renderWithProvider = () =>
    render(
      <Provider store={fakeStore}>
        <PostPage />
      </Provider>
    );

  it("renders post in view mode", async () => {
    renderWithProvider();

    expect(await screen.findByText("Test title")).toBeInTheDocument();
    expect(await screen.findByText("Test description")).toBeInTheDocument();
    expect(await screen.findByText("Test content")).toBeInTheDocument();

    expect(
      await screen.getByRole("button", { name: /edit/i })
    ).toBeInTheDocument();
    expect(
      await screen.getByRole("button", { name: /delete/i })
    ).toBeInTheDocument();
  });

  it("navigates to edit page on edit button click", async () => {
    renderWithProvider();

    const editButton = await screen.findByRole("button", { name: /edit/i });
    fireEvent.click(editButton);

    expect(await screen.findByLabelText("Title")).toBeInTheDocument();
    expect(screen.getByLabelText("Description")).toBeInTheDocument();
    expect(screen.getByLabelText("Content")).toBeInTheDocument();
  });

  it("validates form fields on edit", async () => {
    renderWithProvider();

    const editButton = await screen.findByRole("button", { name: /edit/i });
    fireEvent.click(editButton);

    const titleInput = screen.getByLabelText("Title");
    const descriptionInput = screen.getByLabelText("Description");
    const contentInput = screen.getByLabelText("Content");

    fireEvent.change(titleInput, { target: { value: "" } });
    fireEvent.change(descriptionInput, { target: { value: "" } });
    fireEvent.change(contentInput, { target: { value: "" } });

    fireEvent.click(screen.getByRole("button", { name: /save/i }));

    expect(
      await screen.findByText(/Title must be at least 3 characters/i)
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/Description must be at least 5 characters/i)
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/Content must be at least 10 characters/i)
    ).toBeInTheDocument();
  });

  it("saves post", async () => {
    renderWithProvider();

    const editButton = await screen.findByRole("button", { name: /edit/i });
    fireEvent.click(editButton);

    const titleInput = screen.getByLabelText("Title");
    const descriptionInput = screen.getByLabelText("Description");
    const contentInput = screen.getByLabelText("Content");

    fireEvent.change(titleInput, { target: { value: "Updated title" } });
    fireEvent.change(descriptionInput, {
      target: { value: "Updated description" },
    });
    fireEvent.change(contentInput, { target: { value: "Updated content" } });

    const saveButton = screen.getByRole("button", { name: /save/i });
    fireEvent.click(saveButton);

    expect(await screen.findByText("Updated title")).toBeInTheDocument();
    expect(screen.getByText("Updated description")).toBeInTheDocument();
    expect(screen.getByText("Updated content")).toBeInTheDocument();

    expect(screen.getByRole("button", { name: /edit/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /delete/i })).toBeInTheDocument();
  });

  it("deletes post", async () => {
    renderWithProvider();

    const deleteButton = await screen.findByRole("button", { name: /delete/i });
    fireEvent.click(deleteButton);

    expect(api.deletePost).toHaveBeenCalledWith("1");

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith("/");
    });
  });
});
