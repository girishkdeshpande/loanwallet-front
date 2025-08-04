import no_records1 from "D:/loanwallet-front/src/Assets/Images/no_record_found_2.png";
// import no_records2 from "D:/loanwallet-front/src/Assets/Images/no_record_found_1.png";

const NoRecordsFound = () => {
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
        src={no_records1}
        alt="No Results"
        style={{ maxWidth: "300px", marginBottom: "1rem", marginTop: "8rem" }}
      />
      <p style={{ fontSize: "1.25rem" }}>
        Records not found for searched query
      </p>
    </div>
  );
};

export default NoRecordsFound;
