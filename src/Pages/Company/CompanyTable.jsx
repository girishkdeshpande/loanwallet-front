import React from "react";

const CompanyTable = ({
  columns,
  data,
  selectedId,
  onSelect,
  onDelete,
  groupKey,
  page,
}) => {
  const showRadioAndDelete = page === "View";

  return (
    <>
      <table className="table table-striped table-bordered">
        <thead className="table-dark">
          <tr>
            {!showRadioAndDelete && (
              <th className="text-center">
                <i className="bi bi-record-circle" style={{ width: "3%" }}></i>
              </th>
            )}
            {columns.map((col) => (
              <th key={col.key} style={{ width: col.width }}>
                {col.label}
              </th>
            ))}
            {!showRadioAndDelete && (
              <th className="text-center" style={{ width: "3%" }}>
                <i className="bi bi-trash"></i>
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {data
            ?.filter((row) => !row.delete)
            .map((row, index) => {
              const rowIndex = row._originalIndex ?? index; // Fallback to idx if no original index
              return (
                <tr key={rowIndex}>
                  {!showRadioAndDelete && (
                    <td className="text-center">
                      <input
                        type="radio"
                        name={`${groupKey}-selectedRadio`}
                        checked={selectedId === rowIndex ? "selected" : ""}
                        onClick={() => onSelect(groupKey, rowIndex)}
                        readOnly
                      />
                    </td>
                  )}
                  {columns.map(({ key, render }) => (
                    <td key={key}>{render ? render(row) : row[key]}</td>
                  ))}
                  {!showRadioAndDelete && (
                    <td>
                      <i
                        className={`bi bi-trash ${
                          selectedId === rowIndex
                            ? "text-primary menu-pointer"
                            : "text-secondary opacity-50 disabled"
                        }`}
                        onClick={() => {
                          onDelete(groupKey, rowIndex);
                        }}
                        style={{
                          pointerEvents:
                            selectedId === rowIndex ? "auto" : "none",
                          cursor:
                            selectedId === rowIndex ? "pointer" : "default",
                        }}
                      ></i>
                    </td>
                  )}
                </tr>
              );
            })}
        </tbody>
      </table>
    </>
  );
};
export default CompanyTable;
