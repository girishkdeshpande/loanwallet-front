import { formatINR } from "../../Utilities/GlobalFunctions";

const TransactionTable = ({ data, columns }) => {
  const tableData = data.tally_trans;

  return (
    <>
      <table className="table table-striped table-bordered">
        <thead className="table-dark">
          <tr>
            {columns.map((column) => (
              <th key={column.key} style={{ width: column.width }}>
                {column.key === "item_code"
                  ? data.transaction_type === "Sale"
                    ? "Products Sold"
                    : "Products Purchased"
                  : column.label}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {tableData?.map((row, index) => (
            <tr key={index}>
              {columns.map((column) => (
                <td key={column.key} className="text-left">
                  {column.key === "unit_price" ||
                  column.key === "taxable_amount"
                    ? `₹ ${formatINR(row[column.key])}`
                    : row[column.key]}
                </td>
              ))}
            </tr>
          ))}
          {tableData?.length > 0 && (
            <tr>
              <td colSpan={3} className="text-start fw-bold">
                Total Transaction Amount (Including Tax)
              </td>
              <td className="text-left">{`₹ ${formatINR(
                data.total_amount
              )}`}</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};
export default TransactionTable;
