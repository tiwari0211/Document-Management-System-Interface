import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { textfieldsx } from "../CustomTextfield";
// import Calander from "../../assets/svgs/Calander";
import dayjs from "dayjs";
import { inputProp } from "../CustomAutocomplete";
import globalColors from "../../themes/globalColors";

export default function CustomDatePicker({
  value,
  onChange,
  disabled,
  helperText,
  showhelperText,
  minDate,
  maxDate
}: inputProp) {
  
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        disabled={disabled ?? false}
        minDate={minDate ? dayjs(minDate) : undefined}
        maxDate={maxDate ? dayjs(maxDate) : undefined}
        format="DD MMM YYYY"
        //  defaultValue={dayjs('2022-04-17')}
        value={value ? dayjs(value) : null}
        onChange={(newValue: any) => {
          if (onChange) onChange(newValue);
        }}
        slots={
          {
            // openPickerIcon: EditCalendarRoundedIcon,
            // openPickerButton: StyledButton,
            // day: StyledDay,
          }
        }
        //   value={value??""}
        //   onChange={onChange}a
        slotProps={{
          openPickerIcon: { fontSize: "medium" },
          openPickerButton: { color: "secondary" },
          textField: {
            sx: {
              ...textfieldsx,
              "& .MuiFormHelperText-root": showhelperText
                ? {
                    color: `${globalColors.primary.grey} !important`,
                    opacity: `1 !important`,
                    background: "transparent",
                  }
                : {},
              "& .MuiInputBase-input": {
                padding: "0",
              },
            },

            helperText: helperText,
          },
        }}
      />
    </LocalizationProvider>
  );
}
