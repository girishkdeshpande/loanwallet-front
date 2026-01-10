import React from "react";
import moment from "moment";
import { formatINR } from "../Utilities/GlobalFunctions";

const Table = ({ columns, data, extraProps = {} }) => {
  console.log("Columns ", columns);
  return (
    <>
      <div className="table-wrapper mt-4">
        <table className="table table-striped table-bordered">
          <thead className="table-dark">
            <tr>
              <th className="text-center">
                <i className="bi bi-record-circle" style={{ width: "3%" }}></i>
              </th>
              {columns.map((col) => (
                <th key={col.key} style={{ width: col.width }}>
                  {col.key === "total_amount" ? col.label + " (₹)" : col.label}
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
                    name="selectedRadio"
                    value={row.id}
                    checked={extraProps.selectedRow === row.id}
                    onClick={() => extraProps.handleRadioSelection(row.id)}
                    disabled={row.status === false}
                    readOnly
                  />
                </td>
                {columns.map(({ key, render, valueResolver }) => (
                  <td key={key}>
                    {render
                      ? render(row)
                      : valueResolver
                      ? valueResolver(row)
                      : key === "total_amount"
                      ? `₹ ${formatINR(row[key])}`
                      : key === "trasaction_date"
                      ? moment(row[key]).format("DD-MM-YYYY")
                      : row[key]}
                  </td>
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
