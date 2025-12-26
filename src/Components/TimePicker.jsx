import { useState } from "react";
import DatePicker from "react-datepicker";

import CustomTimeInput from "./CustomTimeInput";

import "react-datepicker/dist/react-datepicker.css";
import "../Styles/DateTimePicker.css"; // Import your CSS file for styling

const CustomTimePicker = ({ value, onChange }) => {
  const [selectedTime, setSelectedTime] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleOnChange = (time) => {
    if (time instanceof Date && !isNaN(time)) {
      onChange(time);
    }
    setIsOpen(false); // Close the calendar when a date is selected
  };

  const handleIconClick = () => setIsOpen((prev) => !prev);

  return (
    <>
      <DatePicker
        showPopperArrow={false}
        autoComplete="off"
        selected={value}
        onChange={handleOnChange}
        showTimeSelect
        showTimeSelectOnly
        timeIntervals={15}
        dateFormat="HH:mm:ss"
        customInput={<CustomTimeInput onIconClick={handleIconClick} />}
        open={isOpen}
        onClickOutside={() => setIsOpen(false)} // Close the calendar when clicking outside
      />
    </>
  );
};

export default CustomTimePicker;
