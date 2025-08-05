"use client";

import { useTheme } from "styled-components";
import ButtonBase, { ButtonStyleProps } from "./ButtonBase";
import type { ElementType, ComponentPropsWithoutRef } from "react";

type ButtonVariant = "primary" | "outlined" | "delete" | "edit";

type ButtonProps<C extends ElementType = "button"> = {
  as?: C;
  variant?: ButtonVariant;
} & ButtonStyleProps &
  ComponentPropsWithoutRef<C>;

export default function Button<C extends ElementType = "button">(
  props: ButtonProps<C>
) {
  const theme = useTheme();
  const {
    variant = "primary",
    $bg,
    $color,
    $border,
    $hoverBg,
    $shadow,
    $height,
    ...rest
  } = props;

  const variantStyles: Partial<ButtonStyleProps> =
    theme.buttonVariants?.[variant] || {};

  return (
    <ButtonBase
      $bg={$bg || (variantStyles as any).bg || theme.colors.primary}
      $color={$color || (variantStyles as any).color || theme.colors.text2}
      $border={$border || (variantStyles as any).border || "none"}
      $hoverBg={$hoverBg}
      $shadow={$shadow}
      $height={$height}
      {...rest}
    />
  );
}
