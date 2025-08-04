import CustomDatePicker from "../../Components/DatePicker";
import CustomTimePicker from "../../Components/TimePicker";

const ToDos = () => {
  return (
    <>
      <div className="col">
        <h5 className="my-2">Schedule Event</h5>

        <div className="row align-items-start mt-4">
          <div className="col-md-2">
            <h6>Event Information</h6>
          </div>
          <div className="col">
            <div className="row">
              <div className="col-md-2">
                <CustomDatePicker />
              </div>
              <div className="col-md-2">
                <CustomTimePicker />
              </div>
            </div>
            <div className="row g-1 mt-1">
              {[
                { label: "Title", name: "title" },
                { label: "Description", name: "description" },
              ].map(({ label, name }) => (
                <div className="col-md-6 gap-1" key={name}>
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control form-control-sm rounded-4 border border-1 border-dark"
                      placeholder={label}
                    />
                    <label>{label}</label>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="row mt-4">
            <div className="col text-center">
              <button className="btn btn-primary mx-2">Cancel</button>
              <button className="btn btn-primary mx-2">Schedule</button>
            </div>
          </div>
        </div>
      </div>

      <hr></hr>

      <div className="col">
        <h5 className="mt-4">Scheduled Events</h5>

        <div className="col">
          <div className="row g-1 d-flex justify-content-center align-items-center">
            <div className="col-auto me-5">
              <i className="bi bi-chevron-left fs-4 cursor-pointer"></i>
            </div>

            <div className="col-md-2">
              <CustomDatePicker />
            </div>

            <div className="col-auto ms-5">
              <i className="bi bi-chevron-right fs-4 cursor-pointer"></i>
            </div>
          </div>
        </div>

        <div className="col mt-3">
          <table className="table table-striped table-bordered">
            <thead className="table-dark">
              <tr>
                <th style={{ width: "5%" }}>Sr. No.</th>
                <th style={{ width: "15%" }}>Event Scheduler</th>
                <th style={{ width: "10%" }}>Event Time</th>
                <th style={{ width: "35%" }}>Event Title</th>
                <th style={{ width: "35%" }}>Event Description</th>
              </tr>
            </thead>
            <tbody></tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ToDos;
