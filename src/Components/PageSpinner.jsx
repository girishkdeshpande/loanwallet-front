const PageSpinner = ({
  color = "secondary",
  size = "4rem",
  height = "60vh",
}) => {
  return (
    <div
      style={{
        height,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        className={`spinner-border text-${color}`}
        style={{ width: size, height: size }}
        role="status"
      ></div>
      {/* <span className="visually-hidden">Loading...</span> */}
    </div>
  );
};

export default PageSpinner;
