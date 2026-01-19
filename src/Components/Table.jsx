import moment from "moment";

import "../Styles/Table.css";
import { formatINR } from "../Utilities/GlobalFunctions";

const Table = ({ columns, data, page, extraProps = {} }) => {
  const DATE_FIELDS = ["trasaction_date", "date_of_visit", "timeline", "date"];
  const CURRENCY_FIELDS = ["total_amount", "price", "total_price"];
  const HIDE_RADIO_COLUMN = [
    "view_visits",
    "view_todos",
    "preview_quotation",
  ].includes(page);
  const HIDE_EDIT_DELETE_COLUMN = [
    "view_visits",
    "view_todos",
    "view_sales",
    "view_expenses",
    "view_quotations",
  ].includes(page);

  return (
    <>
      <div className="table-wrapper mt-4">
        <table className="table table-striped table-bordered table-fixed">
          <thead className="table-dark">
            <tr>
              {HIDE_RADIO_COLUMN ? (
                <th className="text-center" style={{ width: "4%" }}>
                  Sr.No.
                </th>
              ) : (
                <th className="text-center" style={{ width: "3%" }}>
                  <i className="bi bi-record-circle"></i>
                </th>
              )}
              {columns.map((col) => (
                <th key={col.key} style={{ width: col.width }}>
                  {CURRENCY_FIELDS.includes(col.key)
                    ? col.label + " (₹)"
                    : col.label}
                </th>
              ))}
              {!HIDE_RADIO_COLUMN && (
                <th className="text-center" style={{ width: "3%" }}>
                  {/* {HIDE_EDIT_DELETE_COLUMN === "view_expenses" ? ( */}
                  {/* <i className="bi bi-paperclip"></i> */}
                  {/* ) : ( */}
                  <i className="bi bi-eye-fill"></i>
                  {/* )} */}
                </th>
              )}
              {!HIDE_EDIT_DELETE_COLUMN && (
                <>
                  <th className="text-center" style={{ width: "3%" }}>
                    <i className="bi bi-pencil"></i>
                  </th>
                  <th className="text-center" style={{ width: "3%" }}>
                    <i className="bi bi-trash"></i>
                  </th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {data?.map((row, index) => (
              <tr key={index}>
                {HIDE_RADIO_COLUMN ? (
                  <td className="text-center">{index + 1}</td>
                ) : (
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
                )}
                {columns.map(({ key, render, truncate, width }) => (
                  <td
                    key={key}
                    className={truncate ? "text-truncate" : ""}
                    style={
                      truncate
                        ? {
                            maxWidth: width,
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }
                        : undefined
                    }
                    title={truncate ? row[key] : undefined}
                  >
                    {render
                      ? render(row)
                      : CURRENCY_FIELDS.includes(key)
                        ? `₹ ${formatINR(row[key])}`
                        : DATE_FIELDS.includes(key)
                          ? moment(row[key]).format("DD-MM-YYYY")
                          : row[key]}
                  </td>
                ))}
                {!HIDE_RADIO_COLUMN && (
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
                )}
                {!HIDE_EDIT_DELETE_COLUMN && (
                  <>
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
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
export default Table;
