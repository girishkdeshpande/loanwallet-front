import { forwardRef } from "react";

const Search = forwardRef(
  ({ value, onChange, onSearch, onFocus, onKeyDown, label }, ref) => {
    const handleSearchClick = () => {
      if (!value.trim()) {
        onSearch(""); // empty search string
        return;
      }

      // Keep filtering logic outside for reusability
      onSearch(value);
    };

    return (
      <>
        <div className="col position-relative" ref={ref}>
          <div className="input-group">
            <div className="form-floating flex-grow-1">
              <input
                id="floatingSearch"
                type="text"
                name="Search"
                className="form-control mt-1 mb-0 rounded-4 pe-5 border border-1 border-dark"
                placeholder=" "
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onFocus={onFocus}
                onKeyDown={onKeyDown}
                // disabled={disabled}
                autoComplete="off"
              />
              <label htmlFor="floatingSearch">{label}</label>
              <button
                className="btn position-absolute end-0 top-50 translate-middle-y px-3 mt-1 rounded-end-4 text-primary"
                type="button"
                style={{
                  backgroundColor: "transparent",
                  border: "none",
                  right: "10ox",
                }}
                onClick={handleSearchClick}
                onFocus={onFocus}
                // disabled={disabled}
              >
                <i className="bi bi-search"></i>
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
);

export default Search;
