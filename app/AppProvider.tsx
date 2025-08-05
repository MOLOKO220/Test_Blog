"use client";

import { Provider, useSelector } from "react-redux";
import { store } from "@/app/store/store";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "@/app/styles/GlobalStyle";
import { themes } from "@/app/styles/theme";
import ThemeSwitcher from "./components/ThemeSwitcher/ThemeSwitcher";
import { RootState } from "@/app/store/store";

function ThemeWrapper({ children }: { children: React.ReactNode }) {
  const currentTheme = useSelector((state: RootState) => state.themes.theme);

  return (
    <ThemeProvider theme={themes[currentTheme]}>
      <div
        style={{
          maxWidth: "960px",
          margin: "auto",
          position: "relative",
        }}
      >
        <ThemeSwitcher />
        <GlobalStyle />
        {children}
      </div>
    </ThemeProvider>
  );
}

export default function AppProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <ThemeWrapper>{children}</ThemeWrapper>
    </Provider>
  );
}
