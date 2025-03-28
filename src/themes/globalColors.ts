import { ObjectValues } from "../interfaces";

const primary: ObjectValues = {
  black: "#000000",
  primary: "#000000",
  appBackground: "#FFFFFF",
  bgLight: "#FBFCFE",
  listselected: "#DDE7EE",
  appBackgroundWeb: "#F4F5FA",
  // "#F4F5FA",
  white: "#FAFAFA",
  pureWhite: "#FFFFFF",
  chipGreyColor: "#DFDFDF",
  grey: "#9B9B9B",
  darkGrey: "#444444",
  disableBg: "rgb(200 200 200 / 10%)",
  disableText: "rgba(131, 131, 131, 1)",
  lightGrey: "rgb(246 246 246 / 4)",
  selectedColor: "rgb(157 28 0 / 0.1)",
  purple: "#793ED6",
  normalText: "#636b74",
  borderColor: "#EBEBEB",
  green: "#02B534",
  green1: "rgba(23, 167, 0, 1)",
  green2: "rgba(23, 167, 0, 0.1)",
  harvestGold: "#FAEEDD",
};
const colorCombinations: ObjectValues = {
  new: {
    bg: "#e3fbe3",
    color: "#0A470A",
  }, approved:{
    bg:"#a6db82",
    color:"#134913"
  }, 
};
const globalColors = {
  primary,
  colorCombinations,
};

export default globalColors;
