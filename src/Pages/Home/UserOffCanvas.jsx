import avatar from "D:/loanwallet-front/src/Assets/Images/user_avatar.jpg";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { LogoutData, resetLoginState, resetLogoutState } from "../../Redux/slices/loginSlice";
import { singleUser } from "../../Redux/slices/userSlice";
import {
  customSetting,
  resetCustomSettingState,
  resetNotificationState,
} from "../../Redux/slices/otherSlice";

const UserOffCanvas = ({ handleUserClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { singleUserData } = useSelector((state) => state.user.singleUserState);
  const { customSettingData } = useSelector((state) => state.other.customSettingState);
  const { logoutData, logoutLoading, logoutError } = useSelector(
    (state) => state.login.logoutState
  );

  const [isUserSettingClicked, setIsUserSettingClicked] = useState(false);
  const [isUserSettingEdit, setIsUserSettingEdit] = useState(false);
  const [isUserSettingSave, setIsUserSettingSave] = useState(false);
  const [navTabDisabled, setNavTabDisabled] = useState(true);
  const [isUserSettingDisabled, setIsUserSettingDisabled] = useState(false);

  const [isCustomSettingClicked, setIsCustomSettingClicked] = useState(false);
  const [customSettingDataDisabled, setCustomSettingDataDisabled] = useState(true);
  const [isCustomSettingEdit, setIsCustomSettingEdit] = useState(false);
  const [isCustomSettingSave, setIsCustomSettingSave] = useState(false);
  const [isCustomSettingDisabled, setIsCustomSettingDisabled] = useState(false);

  const [individualUserData, setIndividualUserData] = useState({});
  const [customSettingResult, setCustomSettingResult] = useState({
    notificationDays: "",
    carExpense: "",
    twoWheelerExpense: "",
    visitSummaryCount: "",
    emailAddress: "",
  });

  const userId = localStorage.getItem("id");
  let logoutPayload = { refresh: localStorage.getItem("refresh_token") };

  useEffect(() => {
    if (userId) {
      dispatch(singleUser(userId));
    }
  }, [dispatch, userId]);

  useEffect(() => {
    if (singleUserData && Object.keys(singleUserData).length > 0) {
      setIndividualUserData(singleUserData);
      if (singleUserData.isAdmin === true) {
        dispatch(customSetting());
      }
    }
  }, [dispatch, singleUserData]);

  useEffect(() => {
    if (customSettingData) {
      setCustomSettingResult({
        notificationDays: customSettingData.data.notification_days,
        carExpense: customSettingData.data.vehicalCarRate,
        twoWheelerExpense: customSettingData.data.vehicalBikeRate,
        visitSummaryCount: customSettingData.data.visit_summary_word_count,
        emailAddress: customSettingData.data.email.join("\n"),
      });
    }
  }, [customSettingData]);

  useEffect(() => {
    if (logoutData) {
      toast.success(logoutData.data, {className: "toast-font"});
      dispatch(resetLoginState());
      dispatch(resetCustomSettingState());
      dispatch(resetNotificationState());
      dispatch(resetLogoutState());
      navigate("/");
    }
  }, [logoutData, navigate, dispatch]);

  useEffect(() => {
    if (logoutError) {
      toast.error(logoutError, {className: "toast-font"});
    }
  }, [logoutError]);

  const handleLogout = () => {
    dispatch(LogoutData(logoutPayload));
  };

  const handleUserSetting = () => {
    setIsUserSettingClicked((prev) => !prev);
    if (!isUserSettingClicked) {
      setIsUserSettingEdit(true);
    } else {
      setIsUserSettingEdit(false);
      setIsUserSettingSave(false);
      setNavTabDisabled(true);
    }
  };

  const handleUserSettingEdit = () => {
    setIsUserSettingEdit(false); // Disable Edit button
    setIsUserSettingSave(true); // Enable Save button
    setNavTabDisabled(false); // Enable input fields
    setIsUserSettingDisabled(true);
  };

  const handleUserSettingSave = () => {
    setIsUserSettingSave(false);
    setIsUserSettingEdit(false);
    setNavTabDisabled(true);
    setIsUserSettingDisabled(false);
  };

  const handleCustomSetting = () => {
    setIsCustomSettingClicked((prev) => !prev);
    if (!isCustomSettingClicked) {
      setIsCustomSettingEdit(true);
    } else {
      setIsCustomSettingEdit(false);
      setIsCustomSettingSave(false);
      setCustomSettingDataDisabled(true);
    }
  };

  const handleCustomSettingEdit = () => {
    setIsCustomSettingEdit(false); // Disable Edit button
    setIsCustomSettingSave(true); // Enable Save button
    setCustomSettingDataDisabled(false); // Enable input fields
    setIsCustomSettingDisabled(true);
  };

  const handleCustomSettingSave = () => {
    setIsCustomSettingSave(false);
    setIsCustomSettingEdit(false);
    setCustomSettingDataDisabled(true);
    setIsCustomSettingDisabled(false);
  };

  return (
    <>
      <div
        className="offcanvas offcanvas-start"
        tabIndex="-1"
        id="offcanvasLeft"
        aria-labelledby="offcanvasLeftLabel"
      >
        <div className="offcanvas-header label-color">
          <h6
            className="offcanvas-title text-secondary"
            id="OffcanvasLeftLabel"
          >
            Hello ! {individualUserData?.first_name}{" "}
            {individualUserData?.last_name}
          </h6>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
            onClick={handleUserClose}
          ></button>
        </div>

        <div className="offcanvas-body">
          <div>
            <img
              src={avatar}
              alt="..."
              className="border border-dark d-flex rounded mx-auto offcanvas_img p-2"
            />
          </div>

          <div>
            <button
              className="btn btn-info mx-2 my-3"
              type="button"
              // data-bs-toggle="collapse"
              // data-bs-target="#userCollapse"
              // aria-expanded="false"
              // aria-controls="userCollapse"
              onClick={handleUserSetting}
              disabled={isUserSettingDisabled}
            >
              User Setting
            </button>
            <button
              className="btn btn-primary float-end my-3 ms-2"
              type="button"
              onClick={handleUserSettingSave}
              disabled={!isUserSettingSave}
            >
              <i className="bi bi-floppy"></i>
            </button>
            <button
              className="btn btn-primary float-end my-3"
              type="button"
              onClick={handleUserSettingEdit}
              disabled={!isUserSettingEdit}
            >
              <i className="bi bi-pencil"></i>
            </button>

            <div
              className={`collapse ${isUserSettingClicked ? "show" : "hide"}`}
            >
              <ul className="nav nav-tabs rounded" role="tablist">
                <li className="nav-item" role="tabitem">
                  <a
                    className="nav-link active"
                    data-bs-toggle="tab"
                    data-bs-target="#user-general-info"
                    id="user-general"
                    role="tab"
                    aria-selected="true"
                    aria-controls="user-general-info"
                    href="user-general-info"
                  >
                    General Info
                  </a>
                </li>
                <li className="nav-item" role="tabitem">
                  <a
                    className="nav-link"
                    data-bs-toggle="tab"
                    data-bs-target="#user-profile-picture"
                    id="user-picture"
                    role="tab"
                    aria-selected="false"
                    aria-controls="user-profile-picture"
                    href="user-profile-picture"
                  >
                    Photo
                  </a>
                </li>
                <li className="nav-item" role="tabitem">
                  <a
                    className="nav-link"
                    data-bs-toggle="tab"
                    data-bs-target="#user-reset-password"
                    id="user-password"
                    role="tab"
                    aria-selected="false"
                    aria-controls="user-reset-password"
                    href="user-reset-password"
                  >
                    Reset Password
                  </a>
                </li>
              </ul>

              <div className="tab-content" id="user-content">
                <div
                  className="tab-pane fade show active"
                  id="user-general-info"
                  role="tabpanel"
                  aria-labelledby="user-general"
                >
                  <input
                    className="form-control mt-1"
                    type="text"
                    placeholder="Full Name"
                    value={
                      individualUserData?.first_name +
                      " " +
                      individualUserData?.last_name
                    }
                    disabled={navTabDisabled}
                  />
                  <input
                    className="form-control mt-1"
                    type="text"
                    placeholder="Contact No"
                    value={individualUserData?.contactNo}
                    disabled={navTabDisabled}
                  />
                  <input
                    className="form-control mt-1"
                    type="text"
                    placeholder="Email"
                    value={individualUserData?.email}
                    disabled
                  />
                  <input
                    className="form-control mt-1"
                    type="text"
                    placeholder="Address"
                    value={individualUserData?.address}
                    disabled={navTabDisabled}
                  />
                </div>

                <div
                  className="tab-pane fade"
                  id="user-profile-picture"
                  role="tabpanel"
                  aria-labelledby="user-picture"
                >
                  Upload Photo
                  <div
                    className="input-group mt-2 mx-auto"
                    disabled={navTabDisabled}
                  >
                    <input
                      type="file"
                      className="form-control"
                      disabled={navTabDisabled}
                    />
                    <label className="input-group-text">Upload</label>
                  </div>
                </div>

                <div
                  className="tab-pane fade"
                  id="user-reset-password"
                  role="tabpanel"
                  aria-labelledby="user-password"
                >
                  <input
                    className="form-control mt-1"
                    type="text"
                    placeholder="New Password"
                    disabled={navTabDisabled}
                  />
                  <input
                    className="form-control mt-1"
                    type="text"
                    placeholder="Confirm Password"
                    disabled={navTabDisabled}
                  />
                </div>
              </div>
            </div>
          </div>
          {individualUserData?.isAdmin ? (
            <>
              <div className="mx-auto">
                <button
                  className="btn btn-info mx-2 my-2"
                  type="button"
                  // data-bs-toggle="collapse"
                  // data-bs-target="#customCollapse"
                  // aria-expanded="false"
                  // aria-controls="customCollapse"
                  onClick={handleCustomSetting}
                  disabled={isCustomSettingDisabled}
                >
                  Custom Setting
                </button>
                <button
                  className="btn btn-primary float-end my-2 ms-2"
                  type="button"
                  onClick={handleCustomSettingSave}
                  disabled={!isCustomSettingSave}
                >
                  <i className="bi bi-floppy"></i>
                </button>
                <button
                  className="btn btn-primary float-end my-2"
                  type="button"
                  onClick={handleCustomSettingEdit}
                  disabled={!isCustomSettingEdit}
                >
                  <i className="bi bi-pencil"></i>
                </button>
                <div
                  className={`collapse ${
                    isCustomSettingClicked ? "show" : "hide"
                  }`}
                  id="customCollapse"
                >
                  <label htmlFor="notificationDays" className="col-form-label">
                    Open Quotation Notification Days :
                  </label>
                  <input
                    type="text"
                    style={{ width: 40 }}
                    className="float-end"
                    value={customSettingResult["notificationDays"]}
                    disabled={customSettingDataDisabled}
                  />
                  <label htmlFor="carExpense" className="col-form-label">
                    Car Expense (Rs/Km) :
                  </label>
                  <input
                    type="text"
                    style={{ width: 40 }}
                    className="float-end"
                    value={customSettingResult["carExpense"]}
                    disabled={customSettingDataDisabled}
                  />
                  <label htmlFor="carExpense" className="col-form-label">
                    Two Wheeler Expense (Rs/Km) :
                  </label>
                  <input
                    type="text"
                    style={{ width: 40 }}
                    className="float-end"
                    value={customSettingResult["twoWheelerExpense"]}
                    disabled={customSettingDataDisabled}
                  />
                  <label htmlFor="visitSummaryCount" className="col-form-label">
                    Visit Summary Word Count :
                  </label>
                  <input
                    type="text"
                    style={{ width: 40 }}
                    className="float-end"
                    value={customSettingResult["visitSummaryCount"]}
                    disabled={customSettingDataDisabled}
                  />
                  <label htmlFor="emailAddress" className="col-form-label">
                    Email Address for Expense Report :
                  </label>
                  <textarea
                    className="form-control"
                    rows={2}
                    value={customSettingResult["emailAddress"]}
                    disabled={customSettingDataDisabled}
                  />
                </div>
              </div>{" "}
            </>
          ) : (
            ""
          )}
          <div>
            <button
              className="btn btn-primary d-flex mx-auto my-3"
              type="button"
              data-bs-dismiss="offcanvas"
              onClick={handleLogout}
            >
              {logoutLoading ? (
                <>
                  &nbsp; Logging out{" "}
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  />
                </>
              ) : (
                "Logout"
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default UserOffCanvas;
