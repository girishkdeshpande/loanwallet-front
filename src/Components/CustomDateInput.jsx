import { forwardRef, useId } from "react";
import "../Styles/DateTimePicker.css"; // Import your CSS file for styling

const CustomDateInput = forwardRef(
  ({ value, onIconClick, label = "", disabled }, ref) => {
    const id = useId();

    return (
      <div className="input-group">
        <div className={"form-floating flex-grow-1 position-relative"}>
          <input
            id={`floatingCustomDateInput-${id}`}
            type="text"
            name="plandate"
            className={`form-control mb-0 rounded-4 pe-5 border border-1 border-dark ${
              disabled
                ? "bg-light text-muted cursor-not-allowed"
                : "border-dark"
            }`}
            placeholder=" "
            value={value || ""}
            onClick={onIconClick}
            ref={ref}
            readOnly
            disabled={disabled}
          />

          <label htmlFor={`floatingCustomDateInput-${id}`}>{label}</label>

          <span
            className={`position-absolute end-0 top-50 translate-middle-y px-3 mt-1 text-muted cursor-pointer ${
              disabled ? "cursor-not-allowed" : "text-primary"
            }`}
            onClick={(e) => {
              if (disabled) return;
              e.stopPropagation(); // Prevent bubbling to input
              onIconClick();
            }}
          >
            <i
              className={
                disabled
                  ? "bi bi-calendar3 text-muted cursor-not-allowed"
                  : "bi bi-calendar3 text-primary"
              }
            ></i>
          </span>
        </div>
      </div>
    );
  }
);

export default CustomDateInput;
