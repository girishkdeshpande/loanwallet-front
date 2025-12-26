import { useState } from "react";
import DatePicker from "react-datepicker";

import CustomDateInput from "./CustomDateInput";

import "react-datepicker/dist/react-datepicker.css";
import "../Styles/DateTimePicker.css"; // Import your CSS file for styling

const CustomDatePicker = ({ value, onChange }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [viewDate, setViewDate] = useState(new Date()); // Tracks visible calendar month
  const [isOpen, setIsOpen] = useState(false);

  // Update when user navigates months
  const handleMonthChange = (date) => {
    setViewDate(new Date(date.getFullYear(), date.getMonth(), 1));
  };

  const handleYearChange = (date) => {
    setViewDate(new Date(date.getFullYear(), viewDate.getMonth(), 1));
  };

  const filterVisibleMonthDates = (date) => {
    return (
      date.getMonth() === viewDate.getMonth() &&
      date.getFullYear() === viewDate.getFullYear()
    );
  };

  const handleOnChange = (date) => {
    // setSelectedDate(date);
    onChange(date);
    setIsOpen(false); // Close the calendar when a date is selected
  };

  const handleOnClickOutSide = () => {
    setIsOpen(false); // Close the calendar when clicking outside
  };

  const handleIconClick = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <DatePicker
        showPopperArrow={false}
        selected={value}
        dateFormat="dd-MM-yyyy"
        customInput={<CustomDateInput onIconClick={handleIconClick} />}
        showMonthDropdown
        showYearDropdown
        dropdownMode="select"
        calendarClassName="custom-calendar-dropdown"
        onMonthChange={handleMonthChange}
        onYearChange={handleYearChange}
        filterDate={filterVisibleMonthDates}
        onChange={handleOnChange}
        onClickOutside={handleOnClickOutSide}
        open={isOpen}
        renderDayContents={(day, date) =>
          filterVisibleMonthDates(date) ? day : "\u00A0"
        }
        dayClassName={(date) =>
          date.getDay() === 0 ? "sunday-cell" : undefined
        }
      />
    </>
  );
};

export default CustomDatePicker;
