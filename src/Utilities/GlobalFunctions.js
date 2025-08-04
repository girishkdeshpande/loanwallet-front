const camelCaseExceptions = ["GDC", "LPDC", "HPDC"];

export const CamelCase = (str) => {
  if (camelCaseExceptions.includes(str)) {
    return str;
  }

  return str
    .toLowerCase()
    .replace(/(^\w|\s\w)/g, (match) => match.toUpperCase());
};

/* Enable/Disable Select or Search component */
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       const clickedOutsideSearch =
//         searchRef.current && !searchRef.current.contains(event.target);
//       const clickedOutsideSelect =
//         selectRef.current && !selectRef.current.contains(event.target);

//       if (clickedOutsideSearch && clickedOutsideSelect) {
//         setIsSearchDisabled(false);
//         setIsSelectDisabled(false);
//       }
//     };

//     document.addEventListener("click", handleClickOutside);
//     return () => document.removeEventListener("click", handleClickOutside);
//   }, []);
