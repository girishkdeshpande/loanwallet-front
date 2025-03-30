import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import moment from "moment";

import { Notification } from "../../Redux/slices/otherSlice";

const Alerts = ({ notificationCount }) => {
  const dispatch = useDispatch();

  const [showNotification, setShowNotification] = useState({});

  const { notificationData, notificationLoading, notificationError } =
    useSelector((state) => state.other.notificationState);

  useEffect(() => {
    dispatch(Notification());
  }, [dispatch]);

  useEffect(() => {
    if (notificationData) {
      setShowNotification(notificationData?.data);
      notificationCount(showNotification?.length);
    }
  }, [notificationData, showNotification, notificationCount]);

  return (
    <>
      <div
        className="offcanvas offcanvas-end"
        tabIndex="-1"
        id="offcanvasRight"
        aria-labelledby="offcanvasRightLabel"
      >
        <div className="offcanvas-header label-color">
          <h5 className="offcanvas-title" id="offcanvasRightLabel">
            Notifications
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <ol className="list-group list-group-flush">
            {showNotification && showNotification.length > 0 ? (
              showNotification.map((item, index) => (
                <li
                  key={index}
                  id={item.id}
                  className="list-group-item fw-bold fs-6 float-start"
                >
                  <div className="ms-2 me-auto">
                    {item.module_name === "Company" &&
                    item.action_name === "Add" ? (
                      <span className="">{"New Company: " + item.new_value}</span>
                    ) : item.module_name === "Quotation" &&
                      item.action_name === "Add" ? (
                      <span>{"New Quotation: " + item.new_value}</span>
                    ) : item.module_name === "Quotation" &&
                      item.action_name === "Open" ? (
                      <span>{"Open Quotation: " + item.new_value}</span>
                    ) : null}
                    <div>
                      <span className="fw-normal float-start">
                        {moment(item.created_date).format("DD-MM-YYYY")}{" "}
                      </span>
                    </div>
                  </div>
                </li>
              ))
            ) : (
              <li className="list-group-item fw-bold fs-6">
                <span>No Notifications</span>
              </li>
            )}
          </ol>
        </div>
      </div>
    </>
  );
};

export default Alerts;
