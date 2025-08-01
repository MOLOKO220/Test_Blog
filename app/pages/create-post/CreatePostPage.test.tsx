import { render, screen, fireEvent } from "@testing-library/react";
import CreatePostPage from "./page";
import { Provider } from "react-redux";
import { useRouter } from "next/navigation";
import { configureStore } from "@reduxjs/toolkit";
import { act } from "react";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

const mockDispatch = jest.fn();
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => mockDispatch,
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

  return { createPost };
});

const fakeStore = configureStore({
  reducer: {
    posts: () => ({}),
  },
});

describe("CreatePostPage", () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });

    mockDispatch.mockResolvedValue({
      type: "posts/createPost/fulfilled",
    });

    jest.clearAllMocks();
  });

  const renderWithProviders = () =>
    render(
      <Provider store={fakeStore}>
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

    expect(
      screen.queryByText(/Title must be at least 3 characters/i)
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText(/Description must be at least 5 characters/i)
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText(/Content must be at least 10 characters/i)
    ).not.toBeInTheDocument();

    expect(mockPush).toHaveBeenCalledWith("/");
  });
});
