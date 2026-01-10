import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import "../Styles/DateTimePicker.css"; // Import your CSS file for styling

import CustomDateInput from "./CustomDateInput";

const CustomDatePicker = ({
  value,
  onChange,
  disablePastDates = false,
  showEventDots = false,
  hasEventForDate,
  onMonthYearChange,
  label = "",
  disabled = false,
}) => {
  const [viewDate, setViewDate] = useState(new Date()); // Tracks visible calendar month
  const [isOpen, setIsOpen] = useState(false);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const noop = () => {};

  useEffect(() => {
    if (value) {
      setViewDate(new Date(value.getFullYear(), value.getMonth(), 1));
    } else {
      setViewDate(new Date());
    }
  }, [value]);

  // Update when user navigates months
  const handleMonthChange = (date) => {
    setViewDate(new Date(date.getFullYear(), date.getMonth(), 1));
    onMonthYearChange?.(date);
  };

  const handleYearChange = (date) => {
    setViewDate(new Date(date.getFullYear(), viewDate.getMonth(), 1));
    onMonthYearChange?.(date);
  };

  const filterVisibleMonthDates = (date) => {
    return (
      date.getMonth() === viewDate.getMonth() &&
      date.getFullYear() === viewDate.getFullYear()
    );
  };

  const isDateSelectable = (date) => {
    // Must be in view month
    if (!filterVisibleMonthDates(date)) return false;

    // Optional past-date restriction
    if (disablePastDates) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return date >= today;
    }

    return true;
  };

  const handleOnChange = (date) => {
    onChange(date);
    setIsOpen(false); // Close the calendar when a date is selected
  };

  const handleOnClickOutSide = () => {
    setIsOpen(false); // Close the calendar when clicking outside
  };

  const handleIconClick = () => {
    if (value) {
      setViewDate(new Date(value.getFullYear(), value.getMonth(), 1));
    }
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <DatePicker
        showPopperArrow={false}
        selected={value}
        dateFormat="dd-MM-yyyy"
        customInput={
          <CustomDateInput
            onIconClick={disabled ? noop : handleIconClick}
            label={label}
            disabled={disabled}
          />
        }
        popperClassName="datepicker-on-top"
        showMonthDropdown
        showYearDropdown
        dropdownMode="select"
        calendarClassName="custom-calendar-dropdown"
        onMonthChange={disabled ? undefined : handleMonthChange}
        onYearChange={disabled ? undefined : handleYearChange}
        filterDate={isDateSelectable}
        onChange={disabled ? undefined : handleOnChange}
        onClickOutside={handleOnClickOutSide}
        open={disabled ? false : isOpen}
        minDate={disablePastDates ? today : undefined}
        disabled={disabled}
        openToDate={viewDate}
        renderDayContents={(day, date) => {
          if (!filterVisibleMonthDates(date)) {
            return "\u00A0";
          }

          return (
            <div className="date-cell">
              <span className="day-number">{day}</span>

              {showEventDots && hasEventForDate?.(date) && (
                <span className="event-dot" />
              )}
            </div>
          );
        }}
        dayClassName={(date) =>
          date.getDay() === 0 ? "sunday-cell" : undefined
        }
      />
    </>
  );
};

export default CustomDatePicker;
