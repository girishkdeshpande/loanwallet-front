import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import CustomDatePicker from "../../Components/DatePicker";
import CustomTimePicker from "../../Components/TimePicker";

import {
  RegisterEvent,
  resetRegisterEventState,
} from "../../Redux/slices/todoSlices";

const ToDos = () => {
  const dispatch = useDispatch();

  const { registerEventData, registerEventLoading, registerEventError } =
    useSelector((state) => state.todo.registerEventState);

  const [formKey, setFormKey] = useState(Date.now());
  const [scheduleEventData, setScheduleEventData] = useState({
    plandate: null,
    plantime: null,
    title: "",
    description: "",
  });

  useEffect(() => {
    if (registerEventData) {
      toast.success(registerEventData?.data);
      setScheduleEventData({
        plandate: null,
        plantime: null,
        title: "",
        description: "",
      });
    }

    if (registerEventError) {
      toast.error(registerEventError);
    }
  }, [registerEventData, registerEventError]);

  const handleScheduleEventChange = (field, value) => {
    setScheduleEventData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCancelClick = () => {
    setScheduleEventData({
      plandate: null,
      plantime: null,
      title: "",
      description: "",
    });
  };

  const handleScheduleClick = () => {
    const user_id = localStorage.getItem("id");

    console.log("User Id", user_id);
    const payload = {
      user_id,
      plandate: scheduleEventData.plandate
        ? scheduleEventData.plandate.toISOString().split("T")[0] // YYYY-MM-DD
        : null,
      plantime: scheduleEventData.plantime
        ? `${scheduleEventData.plantime
            .getHours()
            .toString()
            .padStart(2, "0")}:${scheduleEventData.plantime
            .getMinutes()
            .toString()
            .padStart(2, "0")}:${scheduleEventData.plantime
            .getSeconds()
            .toString()
            .padStart(2, "0")}`
        : null,
      title: scheduleEventData.title,
      description: scheduleEventData.description,
    };
    // console.log("ToDo Payload", payload);
    dispatch(RegisterEvent(payload));
  };

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
                <CustomDatePicker
                  value={scheduleEventData?.plandate}
                  onChange={(plandate) =>
                    handleScheduleEventChange("plandate", plandate)
                  }
                />
              </div>
              <div className="col-md-2">
                <CustomTimePicker
                  value={scheduleEventData.plantime}
                  onChange={(plantime) =>
                    handleScheduleEventChange("plantime", plantime)
                  }
                />
              </div>
            </div>
            <div className="row g-1 mt-1">
              {[
                { label: "Title *", name: "title" },
                { label: "Description *", name: "description" },
              ].map(({ label, name }) => (
                <div className="col-md-6 gap-1" key={name}>
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control form-control-sm rounded-4 border border-1 border-dark"
                      placeholder={label}
                      value={scheduleEventData[name]}
                      onChange={(e) =>
                        handleScheduleEventChange(name, e.target.value)
                      }
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
              <button
                className="btn btn-primary mx-2"
                onClick={handleCancelClick}
              >
                Cancel
              </button>
              <button
                className="btn btn-primary mx-2"
                onClick={handleScheduleClick}
              >
                Schedule
              </button>
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
