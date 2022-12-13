import React from "react";
import DatePicker from "./DateTImePickerLibrary/DateTimePicker";
import { DATE_FORMATS } from "../../util/constants/Constants";
import { styles } from "./DatePickerCustomStyles";
export default function DatePickerCustom({
  onDateChange,
  date,
  placeholder,
  mode = "date",
  showIcon = true,
}) {
  return (
    <DatePicker
      style={styles.datePickerStyle}
      date={date} // Initial date from state
      mode={mode} // The enum of date, datetime and time
      placeholder={placeholder}
      allowFontScaling={true}
      format={
        mode == "date"
          ? DATE_FORMATS.PICKER_DATE_FORMAT
          : DATE_FORMATS.PICKER_TIME_FORMAT
      }
      showIcon={showIcon}
      // minDate="01-01-1970"
      // maxDate="01-01-3050"
      confirmBtnText="Confirm"
      cancelBtnText="Cancel"
      customStyles={{
        dateIcon: {
          position: "absolute",
          left: 0,
          top: 4,
          marginLeft: 0,
        },
        dateInput: {
          marginLeft: 36,
        },
      }}
      onDateChange={onDateChange}
    />
  );
}
