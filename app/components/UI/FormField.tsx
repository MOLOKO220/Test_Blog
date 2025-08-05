"use client";

import styled, { css, useTheme } from "styled-components";
import { useId } from "react";
import { FieldError } from "react-hook-form";

type StyledProps = {
  $error?: boolean;
  $bg: string;
  $color: string;
  $borderColor: string;
  $focusBorderColor: string;
  $errorColor: string;
};

type Props = {
  label: string;
  error?: FieldError;
  multiline?: boolean;
  rows?: number;
  margin?: string;
} & React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>;

const Wrapper = styled.div<{ $margin?: string }>`
  position: relative;
  margin-top: ${({ $margin }) => $margin || "24px"};
  width: 100%;
`;

const sharedStyles = css<StyledProps>`
  width: 100%;
  padding: 14px;
  font-size: 1rem;
  border: 1px solid
    ${({ $error, $borderColor, $errorColor }) =>
      $error ? $errorColor : $borderColor};
  border-radius: 8px;
  background: ${({ $bg }) => $bg};
  color: ${({ $color }) => $color};
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${({ $error, $focusBorderColor, $errorColor }) =>
      $error ? $errorColor : $focusBorderColor};
  }

  &:focus + label {
    transform: translate(0px, -27px) scale(0.75);
    color: ${({ $error, $focusBorderColor, $errorColor }) =>
      $error ? $errorColor : $focusBorderColor};
  }

  &:not(:placeholder-shown):not(:focus) + label {
    transform: translate(0px, -27px) scale(0.75);
    color: ${({ $error, $color, $errorColor }) =>
      $error ? $errorColor : $color};
  }
`;

const Input = styled.input<StyledProps>`
  height: 53px;
  ${sharedStyles}
`;

const Textarea = styled.textarea<StyledProps>`
  resize: vertical;
  min-height: 120px;
  ${sharedStyles}
`;

const Label = styled.label<StyledProps>`
  background: ${({ $bg }) => $bg};
  position: absolute;
  top: 20px;
  left: 14px;
  font-size: 1rem;
  color: ${({ $error, $errorColor }) => ($error ? $errorColor : "#666")};
  pointer-events: none;
  transition: 0.2s ease;
  padding: 0 4px;
`;

const ErrorText = styled.div`
  color: #d32f2f;
  font-size: 0.75rem;
  margin-top: 4px;
`;

export default function FormField({
  label,
  error,
  value,
  multiline,
  rows,
  margin,
  ...rest
}: Props) {
  const id = useId();
  const theme = useTheme();

  const themeProps: StyledProps = {
    $error: !!error,
    $bg: theme.colors.background,
    $color: theme.colors.text,
    $borderColor: theme.colors.text,
    $focusBorderColor: theme.colors.primary,
    $errorColor: theme.colors.danger,
  };

  return (
    <Wrapper $margin={margin}>
      {multiline ? (
        <Textarea
          rows={rows || 4}
          id={id}
          placeholder=" "
          value={value}
          {...themeProps}
          {...rest}
        />
      ) : (
        <Input
          id={id}
          placeholder=" "
          value={value}
          {...themeProps}
          {...rest}
        />
      )}

      <Label htmlFor={id} {...themeProps}>
        {label}
      </Label>

      {error && <ErrorText>{error.message}</ErrorText>}
    </Wrapper>
  );
}
