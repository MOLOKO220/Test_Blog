"use client";

import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { setTheme } from "@/app/store/themeSlice";
import FlexBox from "../UI/FlexBox";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import FreeBreakfastIcon from "@mui/icons-material/FreeBreakfast";
import { useTheme } from "styled-components";

const themes = [
  {
    name: "light",
    icon: <LightModeIcon />,
    label: "Switch to light theme",
  },
  {
    name: "dark",
    icon: <DarkModeIcon />,
    label: "Switch to dark theme",
  },
  {
    name: "sepia",
    icon: <FreeBreakfastIcon />,
    label: "Switch to sepia theme",
  },
] as const;

export default function ThemeSwitcher() {
  const dispatch = useAppDispatch();
  const current = useAppSelector((state) => state.themes.theme);
  const theme = useTheme();

  return (
    <FlexBox
      style={{
        position: "absolute",
        top: 0,
        right: -20,
        gap: 8,
        zIndex: 1000,
        padding: "6px",
        borderRadius: "8px",
        transition: "background 0.3s ease",
        flexDirection: "column",
      }}
    >
      {themes.map((t) => (
        <Tooltip key={t.name} title={t.label} arrow>
          <IconButton
            onClick={() => dispatch(setTheme(t.name))}
            sx={{
              backgroundColor:
                current === t.name ? theme.colors.primary : "transparent",
              color: current === t.name ? "#fff" : theme.colors.text,
              "&:hover": {
                backgroundColor: theme.colors.primary,
                color: "#fff",
              },
              transition: "all 0.2s ease",
            }}
          >
            {t.icon}
          </IconButton>
        </Tooltip>
      ))}
    </FlexBox>
  );
}
