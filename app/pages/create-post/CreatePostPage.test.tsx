import { render, screen, fireEvent } from "@testing-library/react";
import CreatePostPage from "./page";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { act } from "react";

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: jest.fn() }),
}));

const mockDispatch = jest.fn();
jest.mock("@/app/store/hooks", () => ({
  useAppDispatch: () => mockDispatch,
}));

jest.mock("@/app/store/postsSlice", () => {
  const createPost = Object.assign(jest.fn(), {
    fulfilled: {
      match: jest.fn(
        (action: { type: string }) =>
          action.type === "posts/createPost/fulfilled"
      ),
    },
  });

  const reducer = () => ({
    posts: [],
    loading: false,
    error: null,
  });

  return { createPost, default: reducer };
});

import postsReducer, { createPost } from "@/app/store/postsSlice";

const store = configureStore({
  reducer: {
    posts: postsReducer,
  },
});

describe("CreatePostPage", () => {
  beforeEach(() => {
    (mockDispatch as jest.Mock).mockResolvedValue({
      type: "posts/createPost/fulfilled",
    });
    jest.clearAllMocks();
  });

  const renderWithProviders = () =>
    render(
      <Provider store={store}>
        <CreatePostPage />
      </Provider>
    );

  it("renders all form fields", () => {
    renderWithProviders();

    expect(screen.getByLabelText("Title")).toBeInTheDocument();
    expect(screen.getByLabelText("Description")).toBeInTheDocument();
    expect(screen.getByLabelText("Content")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /create/i })).toBeInTheDocument();
  });

  it("shows validation errors on empty submit", async () => {
    renderWithProviders();

    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: /create/i }));
    });

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

  it("submits valid form and redirects", async () => {
    const mockPush = jest.fn();
    jest.spyOn(require("next/navigation"), "useRouter").mockReturnValue({
      push: mockPush,
    });

    renderWithProviders();

    fireEvent.change(screen.getByLabelText("Title"), {
      target: { value: "Test title" },
    });
    fireEvent.change(screen.getByLabelText("Description"), {
      target: { value: "Test description" },
    });
    fireEvent.change(screen.getByLabelText("Content"), {
      target: { value: "Test content" },
    });

    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: /create/i }));
    });

    expect(mockPush).toHaveBeenCalledWith("/");
  });
});
