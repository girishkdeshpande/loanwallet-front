import React, { forwardRef } from "react";
import "../Styles/DateTimePicker.css"; // Import your CSS file for styling

const CustomDateInput = forwardRef(
  ({ value, onClick, onIconClick, onClickOutside, open }, ref) => (
    <div className="input-group">
      <div className="form-floating flex-grow-1 position-relative">
        <input
          id="floatingCustomDateInput"
          type="text"
          name="customDateInput"
          className="form-control mt-1 mb-0 rounded-4 pe-5 border border-1 border-dark"
          placeholder=" "
          value={value}
          onClick={onClick}
          ref={ref}
          open={open}
          onClickOutside={onClickOutside}
        />
        <label htmlFor="floatingCustomDateInput">Select Date</label>
        <span
          className="position-absolute end-0 top-50 translate-middle-y px-3 mt-1 text-muted"
          onClick={(e) => {
            e.stopPropagation(); // Prevent bubbling to input
            onIconClick();
          }}
          style={{ cursor: "pointer" }}
        >
          <i className="bi bi-calendar3 text-primary"></i>
        </span>
      </div>
    </div>
  )
);

export default CustomDateInput;
