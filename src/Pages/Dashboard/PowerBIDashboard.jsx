import { PowerBILink } from "../../Utilities/ListConstants";

const PowerBIDashboard = () => {
  return (
    <div className="container-fluid py-4">
      <div className="ratio ratio-16x9">
        <iframe
          title="Power BI Dashboard"
          src={PowerBILink}
          className="border rounded rounded-4 border-dark"
          style={{ width: "100%", height: "100%" }}
          allowFullScreen
        />
      </div>
    </div>
  );
};

export default PowerBIDashboard;
