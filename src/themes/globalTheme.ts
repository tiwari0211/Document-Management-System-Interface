import { createTheme, Theme } from "@mui/material/styles";
import globalColors from "./globalColors";
declare module "@mui/material/styles" {
  interface TypographyVariants {
    heading1: React.CSSProperties;
    Heading2: React.CSSProperties;
    Heading3: React.CSSProperties;
    subheading1: React.CSSProperties;
    subheading2: React.CSSProperties;
    buttonText1: React.CSSProperties;
    buttonText2: React.CSSProperties;
    sectionText1: React.CSSProperties;
    title1: React.CSSProperties;
    accordianHeading: React.CSSProperties;
    body1: React.CSSProperties;
    content1: React.CSSProperties;
    content2: React.CSSProperties;
    centreHeading1: React.CSSProperties;
    centreHeading2: React.CSSProperties;
  }

  interface TypographyVariantsOptions {
    heading1?: React.CSSProperties;
    Heading2?: React.CSSProperties;
    Heading3?: React.CSSProperties;
    subheading1?: React.CSSProperties;
    subheading2?: React.CSSProperties;
    buttonText1?: React.CSSProperties;
    buttonText2?: React.CSSProperties;
    sectionText1?: React.CSSProperties;
    title1?: React.CSSProperties;
    accordianHeading?: React.CSSProperties;
    body1?: React.CSSProperties;
    content1?: React.CSSProperties;
    content2?: React.CSSProperties;
    centreHeading1?: React.CSSProperties;
    centreHeading2?: React.CSSProperties;
  }
}

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    heading1: true;
    Heading2: true;
    Heading3: true;
    subheading1: true;
    subheading2: true;
    sectionText1: true;
    buttonText1: true;
    buttonText2: true;
    title1: true;
    accordianHeading: true;
    body1: true;
    content1: true;
    content2: true;
    centreHeading1: true;
    centreHeading2: true;
  }
}

const theme: Theme = createTheme({
  palette: {
    primary: {
      main: globalColors.primary.primary, // Replace with your desired primary color
    },  
    secondary: {
      main: globalColors.primary.white, // Replace with your desired secondary color
    },
  },
  typography: {
    fontFamily:"Inter",
    heading1: {
      fontFamily: "Inter",
    },
    Heading2: {
      fontFamily: "Inter",
    },
    Heading3: {
      fontFamily: "Inter",
    },
    subheading1: {
      fontFamily: "Inter",
    },
    subheading2: {
      fontFamily: "Inter",
    },
    buttonText2: {
      fontFamily: "Inter",
    },
    buttonText1: {
      fontFamily: "Inter",
    },
    sectionText1: {
      fontFamily: "Inter",
    },
    title1: {
      fontFamily: "Inter",
    },
    content2: {
      fontFamily: "Inter",
    },
    centreHeading1: {
      fontFamily: "Inter",
      textTransform: "uppercase",
      textAlign: "center",
    },
    centreHeading2: {
      fontFamily: "Inter",
      textTransform: "uppercase",
      textAlign: "center",
    },
    accordianHeading: {
      fontFamily: "Inter",
    },
    body1: {
      fontFamily: "Inter",
    },
    content1: {
      fontFamily: "Inter",
    },

    // Add more typography customizations as needed
  },
  components: {
    MuiButton: {
      styleOverrides: {
        // {
        //   "root": {
        //     "&.Mui-disabled": {
        //       "backgroundColor": "rgba(200, 200, 200, 1)",
        //       "color": "rgba(131, 131, 131, 1)"
        //     }
        //   }
        // }
        
        root: {
          // color: (theme) => (theme.palette.primary.main === globalColors.primary.black ? theme.palette.common.white : 'inherit'),
        },
        outlined:{border:`1px solid ${globalColors.primary.primary}`},
        contained: {
          backgroundColor: globalColors.primary.primary, // Customize the background color for contained buttons
          color: globalColors.primary.white, // Customize the text color for contained buttons
          '&:hover': {
            // backgroundColor: globalColors.primary.darkBlack, // Customize the background color on hover for contained buttons
          },
        },
        // disabled: {
        //   // Styles for the disabled state
        //   backgroundColor: globalColors.primary.disableBg, // Customize the background color for disabled buttons
        //   color: globalColors.primary.disableText, // Customize the text color for disabled buttons
        // },
      },
    },
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          heading1: "p",
          Heading2: "p",
          Heading3: "p",
          subheading1: "p",
          subheading2: "p",
          buttonText1: "p",
          buttonText2: "p",
          sectionText1: "p",
          title1: "p",
          accordianHeading: "p",
          body1: "p",
          content1: "p",
          content2: "p",
          centreHeading1: "p",
          centreHeading2: "p",
        },
      },
    },
  
  },
});

export default theme;
