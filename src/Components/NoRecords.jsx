import no_records2 from "D:/loanwallet-front/src/Assets/Images/no_record_found_1.png";

const NoRecords = () => {
  return (
    <div
      style={{
        height: "60vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        color: "#6c757d", // Bootstrap's secondary text color
      }}
    >
      <img
        src={no_records2}
        alt="No Results"
        style={{ maxWidth: "300px", marginBottom: "1rem", marginTop: "8rem" }}
      />
      <p style={{ fontSize: "1.25rem" }}>
        No records to display. To view records use Dropdown or Search Box.
      </p>
    </div>
  );
};

export default NoRecords;
