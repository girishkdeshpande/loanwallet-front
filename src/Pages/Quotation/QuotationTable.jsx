import { formatINR } from "../../Utilities/GlobalFunctions";

const QuotationTable = ({ data, columns, onDelete }) => {
  return (
    <>
      <table className="table table-striped table-bordered table-fixed">
        <thead className="table-dark">
          <tr>
            <th className="text-center" style={{ width: "3%" }}>
              Sr.
            </th>
            {columns.map((column) => (
              <th key={column.key} style={{ width: column.width }}>
                {column.label}
              </th>
            ))}
            <th className="text-center" style={{ width: "3%" }}>
              <i className="bi bi-trash"></i>
            </th>
          </tr>
        </thead>

        <tbody>
          {data?.map((row, index) => (
            <tr key={index}>
              <td className="text-center">{index + 1}</td>
              {columns.map((column) => (
                <td key={column.key} className="text-left">
                  {column.render
                    ? column.render(row)
                    : column.key === "price" || column.key === "total_price"
                      ? `₹ ${formatINR(row[column.key])}`
                      : column.key === "gst"
                        ? row[column.key] + " %"
                        : row[column.key]}
                </td>
              ))}
              <td>
                <i
                  className="bi bi-trash text-primary menu-pointer"
                  onClick={() => onDelete(row.id)}
                  style={{
                    pointerEvents: "auto",
                    cursor: "pointer",
                  }}
                ></i>
              </td>
            </tr>
          ))}
          {/* {data?.length > 0 && (
            <tr>
              <td colSpan={3} className="text-start fw-bold">
                Total Quotation Amount
              </td>
              <td className="text-left fw-bold">{`₹ ${formatINR(
                data.total_price,
              )}`}</td>
            </tr>
          )} */}
        </tbody>
      </table>
    </>
  );
};
export default QuotationTable;
