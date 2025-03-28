import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import globalColors from "../../themes/globalColors";
export const textfieldsxBorder = {
  "& .MuiOutlinedInput-root .MuiAutocomplete-input": {
    borderRadius: "0",
    paddingRight: "12px",
  },
  "& .MuiInputBase-root": {
    padding: "6px 12px",
  },
  "& .MuiInputBase-input": {
    minHeight: "22.9px",
    color: "#32383e", // sets the color of the label text to red
    fontSize: "0.875rem",
    borderRadius: "6px",
    background: "transparent",
    padding: "6px 12px",
    "&:fieldset": {
      background: "transparent",
    },
    "&:-webkit-autofill": {
      background: "transparent",
    },
    "&:-internal-autofill-selected": {
      background: "transparent",
    },
  },

  "& .MuiInputLabel-root": {
    color: "#32383e", // sets the color of the label text to red
    fontSize: "0.875rem",
  },

  "& .MuiButtonBase-root ": {
    color: "#374957",
  },
  "& .MuiPaper-root": {
    borderRadius: "6px",
    margin: "2px 0 0 0",
  },
  "& .MuiOutlinedInput-root": {
    borderColor: "transparent",
    "& fieldset": {
      borderColor: "#CDD7E3 !important", // mostLightGrey, // sets the border color to purple
      borderRadius: "6px",
      borderWidth: "1px",
      background: "transparent",
      // #fbfcfe
      boxShadow: "0 0 #000,0px 1px 2px 0px rgba(21 21 21 / 0.08)",
    },
    "& input": {
      color: "#32383e", // sets the color of the label text to red
      fontSize: "0.875rem",
    },
    "&:hover fieldset": {
      borderColor: "transparent", // sets the border color to orange on hover
      borderRadius: "6px",
      borderWidth: "1px",
      background: "transparent",
    },
    "& .Mui-disabled:hover fieldset": {
      borderColor: "transparent",
    },
    "&.Mui-focused fieldset": {
      borderWidth: "1px",
      background: "transparent",
      borderColor: "transparent", // sets the border color to orange on hover
    },
    "&:-webkit-autofill": {
      borderWidth: "1px",
      background: "transparent",
    },
    "&:-internal-autofill-selected": {
      borderWidth: "1px",
      background: "transparent",
    },
  },
  // ".MuiFormHelperText-root.Mui-disabled"

  "&  .MuiFormHelperText-root.Mui-disabled": {
    color: globalColors.primary.white, // sets the color of the helper text to blue
    opacity: 0,
    background: "transparent",
  },
  "& .MuiInputBase-input::placeholder": {
    color: "#636b74",
  },
  "&.MuiPopover-paper": {
    borderRadius: "6px",
  },
  "& .MuiFormHelperText-root": {
    color: globalColors.primary.white, // sets the color of the helper text to blue
    opacity: 0,
    background: "transparent",
  },
  //  "&.MuiInputLabel-outlined": {
  //     transform: "translate(12px , 8px) scale(1)",
  //   },
  //   "& .MuiInputLabel-outlined": {
  //     transform: "translate(12px , 8px) scale(1)",
  //   },
  // "& .MuiInputLabel-outlined.MuiInputLabel-shrink": {
  //   transform: "translate(12px, -8px) scale(0.75)",
  // },
};
export const textfieldsx = {
  // "& input:-webkit-autofill": {
  //     "-webkit-box-shadow": "0 0 0 30px transparent inset",
  //     "-webkit-text-fill-color": "#333",
  //     "background-color": "transparent",
  //     transition: "background-color 5000s ease-in-out 0s",
  //   },
  "& .MuiOutlinedInput-root .MuiAutocomplete-input": {
    borderRadius: "0",
    paddingRight: "12px",
  },
  "& .MuiInputBase-root": {
    padding: "6px 12px",
  },
  "& .MuiInputBase-input": {
    minHeight: "22.9px",
    color: "#32383e", // sets the color of the label text to red
    fontSize: "0.875rem",
    borderRadius: "6px",
    background: "transparent",
    padding: "6px 12px",
    "&:fieldset": {
      background: "transparent",
    },
    "&:-webkit-autofill": {
      background: "transparent",
    },
    "&:-internal-autofill-selected": {
      background: "transparent",
    },
  },

  "& .MuiInputLabel-root": {
    color: "#32383e", // sets the color of the label text to red
    fontSize: "0.875rem",
  },

  "& .MuiButtonBase-root ": {
    color: "#374957",
  },
  "& .MuiFormHelperText-root": {
    color: globalColors.primary.white, // sets the color of the helper text to blue
    opacity: 0,
    background: "transparent",
  },
  "& .MuiPaper-root": {
    borderRadius: "6px",
    margin: "2px 0 0 0",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: globalColors.primary.grey, // mostLightGrey, // sets the border color to purple
      borderRadius: "6px",
      borderWidth: "1px",
      background: "transparent",
    },

    // -input
    "&:hover fieldset": {
      borderColor: globalColors.primary.grey, // sets the border color to orange on hover
      borderRadius: "6px",
      borderWidth: "1px",
      background: "transparent",
    },
    "& .Mui-disabled:hover fieldset": {
      borderColor: "transparent",
    },
    "&.Mui-focused fieldset": {
      borderWidth: "1px",
      background: "transparent",
      borderColor: globalColors.primary.grey, // sets the border color to orange on hover
    },
    "&:-webkit-autofill": {
      borderWidth: "1px",
      background: "transparent",
    },
    "&:-internal-autofill-selected": {
      borderWidth: "1px",
      background: "transparent",
    },
  },
  "&  .MuiFormHelperText-root.Mui-disabled": {
    color: globalColors.primary.white, // sets the color of the helper text to blue
    opacity: 0,
    background: "transparent",
  },
  "& .MuiInputBase-input::#636b74": {
    color: "transparent",
    opacity: 0,
  },
  "&.MuiPopover-paper": {
    borderRadius: "6px",
  },
  //  "&.MuiInputLabel-outlined": {
  //     transform: "translate(12px , 8px) scale(1)",
  //   },
  //   "& .MuiInputLabel-outlined": {
  //     transform: "translate(12px , 8px) scale(1)",
  //   },
  //   "& .MuiInputLabel-outlined.MuiInputLabel-shrink": {
  //     transform: "translate(12px, -8px) scale(0.75)",
  //   },
};
const CustomTextField = styled(TextField)(() => textfieldsx);
export const CustomTextFieldBorder = styled(TextField)(() => textfieldsxBorder);

export default CustomTextField;
