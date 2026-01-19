import { Typeahead } from "react-bootstrap-typeahead";

import "../Styles/SingleSelectTypeahead.css";

const SingleSelectTypeahead = ({
  id,
  label,
  options = [],
  selected = [],
  onChange,
  placeholder,
  multiple = false,
  disabled = false,
  labelKey,
  className = "",
  typeaheadRef,
}) => {
  const isObjectOptions =
    Array.isArray(options) &&
    options.length > 0 &&
    typeof options[0] === "object";

  /* ✅ Normalize selected to ARRAY */
  const normalizedSelected = Array.isArray(selected)
    ? selected
    : selected
    ? [selected]
    : [];

  //   const resolvedLabelKey = isObjectOptions
  //     ? labelKey || ((option) => option?.label ?? "")
  //     : (option) => option;

  //   const typeaheadFilterBy = (option, props, labelKey) => {
  //     const text = props.text?.toLowerCase() || "";

  //     return typeof option === "string"
  //       ? option.toLowerCase().includes(text)
  //       : option[labelKey]?.toLowerCase().includes(text);
  //   };

  //   const filterByHandler = (labelKey) => (option, props) =>
  //     typeaheadFilterBy(option, props, labelKey);
  const safeSelected = normalizedSelected.filter((opt) => !opt?.isPlaceholder);

  const handleChange = (items) => {
    if (!items || items.length === 0) {
      onChange(null);
      return;
    }

    const value = items[0];

    if (value?.isPlaceholder || value === "-- Select --") {
      onChange(null);
      return;
    }

    onChange(value);
  };

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
        selected={safeSelected}
        onChange={handleChange}
        labelKey={isObjectOptions ? labelKey : undefined}
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
