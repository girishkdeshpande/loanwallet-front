import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  RegisterEvent,
  resetRegisterEventState,
  MonthlyEvents,
} from "../../Redux/slices/todoSlices";

import "../../Styles/DateTimePicker.css";

import CustomDatePicker from "../../Components/DatePicker";
import CustomTimePicker from "../../Components/TimePicker";
import Table from "../../Components/Table";

import { isPastTimeForToday } from "../../Utilities/GlobalFunctions.js";
import { todoColumns } from "../../Utilities/TableColumns.js";

const ToDos = () => {
  const dispatch = useDispatch();

  const { registerEventData, registerEventLoading, registerEventError } =
    useSelector((state) => state.todo.registerEventState);
  const { monthlyEventData, monthlyEventLoading, monthlyEventError } =
    useSelector((state) => state.todo.monthlyEventState);

  const [formKey, setFormKey] = useState(Date.now());
  const [viewPlanDate, setViewPlanDate] = useState(new Date());
  const [eventData, setEventData] = useState({});
  const [activeMonth, setActiveMonth] = useState(() => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
  });

  const [scheduleEventData, setScheduleEventData] = useState({
    plandate: new Date(),
    plantime: new Date(),
    title: "",
    description: "",
  });
  const isScheduleEventValid =
    scheduleEventData &&
    Object.values(scheduleEventData).every((value) => {
      if (value instanceof Date) return true;
      if (typeof value === "string") return value.trim() !== "";
      return value !== null && value !== undefined;
    });

  useEffect(() => {
    dispatch(resetRegisterEventState());
    if (registerEventData) {
      toast.success(registerEventData?.data);
      setScheduleEventData({
        plandate: new Date(),
        plantime: new Date(),
        title: "",
        description: "",
      });
      handleScheduleSuccess(
        scheduleEventData?.plandate.toISOString().split("T")[0]
      );
    }

    if (registerEventError) {
      toast.error(registerEventError);
    }
  }, [registerEventData, registerEventError, dispatch]);

  useEffect(() => {
    dispatch(MonthlyEvents({ date: activeMonth }))
      .unwrap()
      .then((response) => setEventData(response.data.eventObject))
      .catch((error) => {
        toast.error(error);
      });
  }, [activeMonth, dispatch]);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === "ArrowLeft") handlePrevDate();
      if (e.key === "ArrowRight") handleNextDate();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  useEffect(() => {
    const { plandate, plantime } = scheduleEventData;

    if (isPastTimeForToday(plandate, plantime)) {
      const now = new Date();

      setScheduleEventData((prev) => ({
        ...prev,
        plantime: now, // ✅ auto-correct
      }));
    }
  }, [scheduleEventData.plandate]);

  const getDateKey = (date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  };

  const selectedDateKey = getDateKey(viewPlanDate);
  const selectedDateRecords = eventData?.[selectedDateKey] || [];

  const handleScheduleSuccess = (scheduledDate) => {
    const scheduledMonth = scheduledDate.slice(0, 7); // yyyy-mm

    // Only refetch if this month is already loaded
    if (scheduledMonth === activeMonth) {
      dispatch(MonthlyEvents({ date: activeMonth }))
        .unwrap()
        .then((response) => setEventData(response.data.eventObject))
        .catch((error) => toast.error(error));
    }
  };

  const handleMonthYearChange = (date) => {
    setActiveMonth(
      `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`
    );
  };
  const handleScheduleEventChange = (field, value) => {
    setScheduleEventData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCancelClick = () => {
    setScheduleEventData({
      plandate: new Date(),
      plantime: new Date(),
      title: "",
      description: "",
    });
  };

  const handleScheduleClick = () => {
    const user_id = localStorage.getItem("id");

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
    console.log("ToDo Payload", payload);
    dispatch(RegisterEvent(payload));
  };

  const addDays = (date, days) => {
    const d = new Date(date);
    d.setDate(d.getDate() + days);
    return d;
  };

  const isDifferentMonth = (d1, d2) =>
    d1.getFullYear() !== d2.getFullYear() || d1.getMonth() !== d2.getMonth();

  const handlePrevDate = () => {
    setViewPlanDate((prev) => {
      const newDate = addDays(prev, -1);

      if (isDifferentMonth(prev, newDate)) {
        handleMonthYearChange(newDate); // 🔥 trigger API
      }

      return newDate;
    });
  };

  const handleNextDate = () => {
    setViewPlanDate((prev) => {
      const newDate = addDays(prev, 1);

      if (isDifferentMonth(prev, newDate)) {
        handleMonthYearChange(newDate); // 🔥 trigger API
      }

      return newDate;
    });
  };

  const hasEventsForDate = (date) => {
    const key = getDateKey(date);
    return Boolean(eventData?.[key]?.length);
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
                  disablePastDates
                  label="Select Date *"
                />
              </div>
              <div className="col-md-2">
                <CustomTimePicker
                  value={scheduleEventData.plantime}
                  selectedDate={scheduleEventData.plandate}
                  onChange={(plantime) =>
                    handleScheduleEventChange("plantime", plantime)
                  }
                  disablePastTimes
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
                disabled={!isScheduleEventValid}
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
              <i
                className="bi bi-chevron-left fs-4 cursor-pointer"
                onClick={handlePrevDate}
              ></i>
            </div>

            <div className="col-md-2">
              <CustomDatePicker
                value={viewPlanDate}
                onChange={(date) => setViewPlanDate(date)}
                onMonthYearChange={handleMonthYearChange}
                showEventDots
                hasEventForDate={hasEventsForDate}
                label="Select Date *"
              />
            </div>

            <div className="col-auto ms-5">
              <i
                className="bi bi-chevron-right fs-4 cursor-pointer"
                onClick={handleNextDate}
              ></i>
            </div>
          </div>
        </div>

        {selectedDateRecords.length > 0 ? (
          <div className="col mt-3">
            <Table
              columns={todoColumns}
              data={selectedDateRecords}
              page="view_todos"
            />
            {/* <table className="table table-striped table-bordered">
              <thead className="table-dark">
                <tr>
                  <th style={{ width: "5%" }}>Sr. No.</th>
                  <th style={{ width: "15%" }}>Event Scheduler</th>
                  <th style={{ width: "10%" }}>Event Time</th>
                  <th style={{ width: "35%" }}>Event Title</th>
                  <th style={{ width: "35%" }}>Event Description</th>
                </tr>
              </thead>
              <tbody>
                {selectedDateRecords.map((event, index) => (
                  <tr key={event.id}>
                    <td>{index + 1}</td>
                    <td>{event.user_name}</td>
                    <td>{event.plan_time}</td>
                    <td>{event.title}</td>
                    <td>{event.description}</td>
                  </tr>
                ))}
              </tbody>
            </table> */}
          </div>
        ) : (
          <div className="col mt-5">
            <p style={{ fontSize: "1.25rem" }} className="text-center">
              No Events Scheduled for the selected date.
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default ToDos;
