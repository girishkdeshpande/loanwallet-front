import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CustomTimeInput from "./CustomTimeInput";
import "../Styles/DateTimePicker.css"; // Import your CSS file for styling

const CustomTimePicker = () => {
  const [selectedTime, setSelectedTime] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleOnChange = (time) => {
    setSelectedTime(time);
    setIsOpen(false); // Close the calendar when a date is selected
  };

  const handleIconClick = () => setIsOpen((prev) => !prev);

  return (
    <>
      <DatePicker
        showPopperArrow={false}
        autoComplete="off"
        selected={selectedTime}
        onChange={handleOnChange}
        showTimeSelect
        showTimeSelectOnly
        timeIntervals={15}
        dateFormat="h:mm aa"
        customInput={<CustomTimeInput onIconClick={handleIconClick} />}
        open={isOpen}
        onClickOutside={() => setIsOpen(false)} // Close the calendar when clicking outside
      />
    </>
  );
};

export default CustomTimePicker;
