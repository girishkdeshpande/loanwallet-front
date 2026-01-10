import { Typeahead } from "react-bootstrap-typeahead";
import { useRef } from "react";

import "../Styles/MultiSelectTypeahead.css";

const MultiSelectTypeahead = ({
  id,
  label,
  options = [],
  selected = [],
  onChange,
  placeholder,
  multiple = true,
  disabled = false,
  labelKey = "label",
  className = "",
  typeaheadRef,
  isLocked = false,
}) => {
  const typeaheadFilterBy = (option, props, labelKey) => {
    const text = props.text?.toLowerCase() || "";

    return typeof option === "string"
      ? option.toLowerCase().includes(text)
      : option[labelKey]?.toLowerCase().includes(text);
  };

  const filterByHandler = (labelKey) => (option, props) =>
    typeaheadFilterBy(option, props, labelKey);

  const handleCaretClick = (e) => {
    e.stopPropagation();

    if (!typeaheadRef?.current?.props?.disabled && !isLocked) {
      typeaheadRef.current.toggleMenu();
    }
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
        filterBy={filterByHandler(labelKey)}
      />

      <label className="typeahead-label">{label}</label>

      <span className="typeahead-caret" onClick={handleCaretClick}>
        <i className="bi bi-chevron-down"></i>
      </span>
    </div>
  );
};

export default MultiSelectTypeahead;
