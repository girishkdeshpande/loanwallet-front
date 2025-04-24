import React from "react";

const Table = ({ columns, data, extraProps = {} }) => {
  return (
    <>
      <div className="table-wrapper mt-4">
        <table className="table table-striped">
          <thead className="table-dark">
            <tr>
              <th className="text-center">
                <i className="bi bi-record-circle" style={{ width: "3%" }}></i>
              </th>
              {columns.map((col) => (
                <th key={col.key} style={{ width: col.width }}>
                  {col.label}
                </th>
              ))}
              <th className="text-center" style={{ width: "3%" }}>
                <i className="bi bi-eye-fill"></i>
              </th>
              <th className="text-center" style={{ width: "3%" }}>
                <i className="bi bi-pencil"></i>
              </th>
              <th className="text-center" style={{ width: "3%" }}>
                <i className="bi bi-trash"></i>
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.map((row, index) => (
              <tr key={index}>
                <td className="text-center">
                  <input
                    type="radio"
                    name="selectedUser"
                    value={row.id}
                    checked={extraProps.selectedRow === row.id}
                    onClick={() => extraProps.handleRadioSelection(row.id)}
                    disabled={row.status === false}
                    readOnly
                  />
                </td>
                {columns.map(({ key, render }) => (
                  <td key={key}>{render ? render(row) : row[key]}</td>
                ))}
                <td className="text-center" href="#">
                  <i
                    className={`bi bi-eye-fill ${
                      extraProps.selectedRow === row.id
                        ? "text-primary menu-pointer"
                        : "text-secondary opacity-50 disabled"
                    }`}
                    onClick={() =>
                      extraProps.selectedRow === row.id &&
                      extraProps.handleViewClick(row.id)
                    }
                    style={{
                      pointerEvents:
                        extraProps.selectedRow === row.id ? "auto" : "none",
                      cursor:
                        extraProps.selectedRow === row.id
                          ? "pointer"
                          : "default",
                    }}
                  ></i>
                </td>
                <td className="text-center" href="#">
                  <i
                    className={`bi bi-pencil ${
                      extraProps.selectedRow === row.id
                        ? "text-primary menu-pointer"
                        : "text-secondary opacity-50 disabled"
                    }`}
                    onClick={() =>
                      extraProps.selectedRow === row.id &&
                      extraProps.handleEditClick(row.id)
                    }
                    style={{
                      pointerEvents:
                        extraProps.selectedRow === row.id ? "auto" : "none",
                      cursor:
                        extraProps.selectedRow === row.id
                          ? "pointer"
                          : "default",
                    }}
                  ></i>
                </td>
                <td>
                  <i
                    className={`bi bi-trash ${
                      extraProps.selectedRow === row.id
                        ? "text-primary menu-pointer"
                        : "text-secondary opacity-50 disabled"
                    }`}
                    onClick={() =>
                      extraProps.selectedRow === row.id &&
                      extraProps.handleDeleteClick(row.id)
                    }
                    style={{
                      pointerEvents:
                        extraProps.selectedRow === row.id ? "auto" : "none",
                      cursor:
                        extraProps.selectedRow === row.id
                          ? "pointer"
                          : "default",
                    }}
                  ></i>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
export default Table;
