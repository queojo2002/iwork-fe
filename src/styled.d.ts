// styled.d.ts
// Augment styled-components DefaultTheme to match the actual theme object
// defined in src/@crema/constants/defaultConfig.ts

import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    spacing: number;
    cardRadius: number | string;
    cardRadius30: number | string;
    cardShadow: string;
    direction: string;
    divider: string;

    palette: {
      mode: string;
      borderColor: string;
      dividerColor: string;
      tooltipBg: string;
      background: {
        paper: string;
        default: string;
      };
      primary: {
        main: string;
        contrastText: string;
      };
      secondary: {
        main: string;
      };
      success: {
        main: string;
        light: string;
      };
      warning: {
        main: string;
        light: string;
      };
      gray: {
        50: string;
        100: string;
        200: string;
        300: string;
        400: string;
        500: string;
        600: string;
        700: string;
        800: string;
        900: string;
        A100: string;
        A200: string;
        A400: string;
        A700: string;
        [key: string]: string;
      };
      black: string;
      white: string;
      orange: {
        5: string;
        6: string;
        [key: number]: string;
      };
      cyan: {
        7: string;
        [key: number]: string;
      };
      red: {
        6: string;
        [key: number]: string;
      };
      green: {
        3: string;
        5: string;
        6: string;
        7: string;
        [key: number]: string;
      };
      blue: {
        5: string;
        7: string;
        [key: number]: string;
      };
      text: {
        primary: string;
        secondary: string;
        disabled: string;
        hint?: string;
      };
    };

    status: {
      danger: string;
    };

    font: {
      family: string;
      weight: {
        light: number;
        regular: number;
        medium: number;
        bold: number;
        extraBold: number;
      };
      size: {
        base: string;
        lg: string;
        sm: string;
      };
    };

    sidebar: {
      light: {
        sidebarBgColor: string;
        sidebarTextColor: string;
        sidebarHeaderColor: string;
        sidebarMenuSelectedBgColor: string;
        sidebarMenuSelectedTextColor: string;
        mode: string;
      };
      dark: {
        sidebarBgColor: string;
        sidebarTextColor: string;
        sidebarHeaderColor: string;
        sidebarMenuSelectedBgColor: string;
        sidebarMenuSelectedTextColor: string;
        mode: string;
      };
    };

    breakpoints: {
      xs: number;
      sm: number;
      md: number;
      lg: number;
      xl: number;
      xxl: number;
      [key: string]: number;
    };

    sizes: {
      line: {
        base: number;
      };
      borderRadius: {
        base: string;
        circle: string;
      };
      framed: {
        base: string;
      };
    };
  }
}
