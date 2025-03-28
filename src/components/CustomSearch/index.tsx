import React, { useEffect } from "react";
import { CustomTextFieldBorder } from "../CustomTextfield";
import { svgs } from "../../assets";
import { Box } from "@mui/material";
import { ObjectValues } from "../../interfaces";
import {
  Search,
} from "@mui/icons-material";
interface CustomSearchProps {
  readonly placeholder?: string;
  readonly helper?: string;
  submit?(data: string | undefined): void;
  readonly disabled?: boolean;
  readonly focusSearch?: boolean;
  readonly onlyNum?: boolean;
  readonly padding?: string;
  readonly copyData?: ObjectValues[];
  readonly fieldName?: string[];
  readonly value?: string;
  onClear?(): void;
  filteredData?(array: ObjectValues[]): void;
  onChange?(data: string | number): void;
  panelChange?(): void;
  onSearch?(data: any): any;
  updateOnChange?: any;
  searchData?: string;
}
// const fuzzySearch = (query: string, text: string): boolean => {

//   query = query?.toLowerCase()??"";
//   text = text?.toString().toLowerCase()??"";
//   let i = 0;
//   for (let j = 0; j < text.length; j++) {
//     if (query[i] === text[j]) {
//       i++;
//     }
//     if (i === query.length) {
//       return true;
//     }
//   }
//   return false;
// };

function CustomSearch(props: CustomSearchProps) {
  const {
    disabled,
    copyData,
    fieldName,
    searchData,
    onClear,
    onSearch,
    filteredData,
    placeholder,helper
  } = props;

  const [searchBarValue, setSearchBarValue] = React.useState<
    string | undefined
  >(searchData ?? "");
  useEffect(() => {
    setSearchBarValue(searchData ?? "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchData]);
  return (
    <CustomTextFieldBorder
      {...{
        variant: "outlined",
        autoFocus: false,
        type: "text",
        onKeyPress: (ev: any) => {
          if (ev.key === "Enter") {
            ev.preventDefault();
            if (onSearch) {
              onSearch(searchBarValue);
            }
          }
        },
        placeholder: placeholder ?? "Search",
        helperText:helper??"",
        InputProps: {
          startAdornment: onSearch ? "" : svgs.search,
          endAdornment: onSearch ? (
            <Box sx={{ display: "flex" }}>
              <Box
                sx={{
                  padding: "0 5px 0 10px",
                  maxHeight: "23px",
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                }}
                onClick={() => {
                  onSearch(searchBarValue);
                }}
              >
                {svgs.search}
              </Box>
              <Box
                sx={{
                  padding: "0 10px 0 0",
                  maxHeight: "23px",
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                }}
                onClick={() => {
                  onSearch("");
                }}
              >
                {svgs.Cross}
              </Box>
            </Box>
          ) : (
            ""
          ),
        },
        value: searchBarValue ? searchBarValue : "",
        disabled:disabled?disabled: onSearch
          ? false
          :copyData?.length === 0
          ? true
          : false,
        sx: {
          minHeight: "0",
          width: "100%",
          maxWidth: "100%",
          "& .MuiInputBase-root": { padding: "7px !important" },
          "& .MuiInputBase-input": { padding: "0 0 0 5px !important" },
        },
        onChange: (e) => {
          setSearchBarValue(e.target.value);
          if (e.target.value) {
            const filterData: ObjectValues[] = [];
            if (copyData && fieldName) {
              copyData.map((data) => {
                return fieldName.map((singleField) => {
                  if (
                    data[singleField] &&
                    data[singleField]
                      .toString()
                      .toLowerCase()
                      .includes(e.target.value.toString().toLowerCase())
                    //      ||
                    // (fuzzySearch &&
                    //   fuzzySearch(e.target.value, data[singleField]))
                  ) {
                    if (!filterData.includes(data)) {
                      return filterData.push(data);
                    } else {
                      return null;
                    }
                  } else {
                    return null;
                  }
                });
              });
              if (filteredData) {
                filteredData(filterData);
              }
            }
          } else {
            if (onClear) {
              onClear();
            }
          }
        },
      }}
    />
  );
}

export default CustomSearch;
