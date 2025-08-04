"use client";
// redux
import { Provider } from "react-redux";
import { store } from "@/app/store/store";
// style
import { ThemeProvider } from "styled-components";
import { theme } from "@/app/styles/theme";
import GlobalStyle from "@/app/styles/GlobalStyle";

export default function AppProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        {children}
      </ThemeProvider>
    </Provider>
  );
}
