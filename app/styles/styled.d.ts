import "styled-components";
import { ButtonStyleProps } from "@/app/components/UI/ButtonBase";

declare module "styled-components" {
  export interface DefaultTheme {
    name: string;
    colors: {
      background: string;
      background2: string;
      surface: string;
      text: string;
      text2: string;
      buttonText: string;
      primary: string;
      danger: string;
      lightGray: string;
    };
    borderRadius: string;
    buttonVariants: {
      [key: string]: Partial<ButtonStyleProps>;
    };
  }
}
