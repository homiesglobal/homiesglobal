import { createTheme, responsiveFontSizes } from "@mui/material/styles";

// Theme for overall app. Mui component styles and default props can be
// overriden here.
export const theme = responsiveFontSizes(
  createTheme({
    spacing: (factor) => `${10 * factor}px`,
    typography: {
      fontFamily: ['"Open Sans"'].join(","),
    },
    palette: {
      primary: {
        main: "#0046AF",
      },
      secondary: {
        main: "#ffffff",
      },
    },
    components: {
      MuiButton: {
        defaultProps: {
          variant: "contained",
          // making default button secondary since it aligns well with the designs
          color: "secondary",
        },
        styleOverrides: {
          root: {
            borderRadius: "1.5rem",
            fontSize: "20px",
            fontWeight: 400,
            textTransform: "none",
          },
        },
      },
      MuiDialog: {
        styleOverrides: {
          paper: {
            borderRadius: "12px",
          },
        },
      },
    },
  })
);
