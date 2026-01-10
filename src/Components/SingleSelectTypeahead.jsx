import { Typeahead } from "react-bootstrap-typeahead";

import "../Styles/SingleSelectTypeahead.css";

const SingleSelectTypeahead = ({
  id,
  label,
  options = [],
  selected = null,
  onChange,
  placeholder,
  multiple = false,
  disabled = false,
  labelKey = "label",
  className = "",
  typeaheadRef,
  isLocked = false,
}) => {
  const handleCaretClick = (e) => {
    e.stopPropagation();
    typeaheadRef?.current.toggleMenu();
  };

  return (
    <div className="typeahead-wrapper">
      <Typeahead
        id={id}
        ref={typeaheadRef}
        multiple={multiple}
        options={options}
        selected={selected}
        onChange={onChange}
        labelKey={labelKey}
        minLength={0}
        disabled={disabled}
        placeholder={placeholder}
        className={className}
        // filterBy={filterByHandler(labelKey)}
      />

      <label className="typeahead-label">{label}</label>

      <span className="typeahead-caret" onClick={handleCaretClick}>
        <i className="bi bi-chevron-down"></i>
      </span>
    </div>
  );
};

export default SingleSelectTypeahead;
