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

export const isToday = (date) => {
  if (!date) return false;
  const today = new Date();
  return (
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate()
  );
};

export const isPastTimeForToday = (date, time) => {
  if (!date || !time) return false;
  if (!isToday(date)) return false;

  const now = new Date();
  return time.getTime() < now.getTime();
};

export const formatINR = (value) => {
  if (value === null || value === undefined) return "";
  return new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 0,
  }).format(value);
};
