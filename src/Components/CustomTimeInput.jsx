import React, { forwardRef } from "react";

const CustomTimeInput = forwardRef(
  ({ value, onClick, onIconClick, open, onClickOutside }, ref) => (
    <div className="input-group">
      <div className="form-floating flex-grow-1 position-relative">
        <input
          id="floatingCustomTimeInput"
          type="text"
          name="customTimeInput"
          className="form-control mt-1 mb-0 rounded-4 pe-5 border border-1 border-dark"
          placeholder=" "
          value={value}
          onClick={onClick}
          ref={ref}
          open={open}
          onClickOutside={onClickOutside}
        />
        <label htmlFor="floatingCustomTimeInput">Select Time</label>
        <span
          className="position-absolute end-0 top-50 translate-middle-y px-3 mt-1 text-muted"
          onClick={(e) => {
            e.stopPropagation(); // Prevent bubbling to input
            onIconClick();
          }}
          style={{ cursor: "pointer" }}
        >
          <i className="bi bi-clock text-primary"></i>
        </span>
      </div>
    </div>
  )
);

export default CustomTimeInput;
