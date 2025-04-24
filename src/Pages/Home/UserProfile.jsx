import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import {
  LogoutData,
  resetLoginState,
  resetLogoutState,
  resetPassword,
  resetResetPasswordState,
} from "../../Redux/slices/loginSlice";
import {
  SingleUser,
  UpdateUser,
  resetUpdateUserState,
} from "../../Redux/slices/userSlice";
import {
  CustomSetting,
  UpdateCustomSetting,
  resetCustomSettingState,
  resetNotificationState,
} from "../../Redux/slices/otherSlice";

import { resetPasswordValidation } from "../../Utilities/validations";
import avatar from "D:/loanwallet-front/src/Assets/Images/user_avatar.jpg";

const UserProfile = ({ handleUserClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { singleUserData } = useSelector((state) => state.user.singleUserState);
  const { updateUserData, updateUserLoading, updateUserError } = useSelector(
    (state) => state.user.updateUserState
  );
  const { logoutData, logoutLoading, logoutError } = useSelector(
    (state) => state.login.logoutState
  );
  const { resetPasswordData, resetPasswordLoading, resetPasswordError } =
    useSelector((state) => state.login.resetPasswordState);
  const { customSettingData } = useSelector(
    (state) => state.other.customSettingState
  );
  const {
    updateCustomSettingData,
    updateCustomSettingLoading,
    updateCustomSettingError,
  } = useSelector((state) => state.other.updateCustomSettingState);

  const [isUserSettingClicked, setIsUserSettingClicked] = useState(false);
  const [isUserSettingEdit, setIsUserSettingEdit] = useState(false);
  const [isUserSettingSave, setIsUserSettingSave] = useState(false);
  const [navTabDisabled, setNavTabDisabled] = useState(true);
  const [isUserSettingDisabled, setIsUserSettingDisabled] = useState(false);

  const [isCustomSettingClicked, setIsCustomSettingClicked] = useState(false);
  const [customSettingDataDisabled, setCustomSettingDataDisabled] =
    useState(true);
  const [isCustomSettingEdit, setIsCustomSettingEdit] = useState(false);
  const [isCustomSettingSave, setIsCustomSettingSave] = useState(false);
  const [isCustomSettingDisabled, setIsCustomSettingDisabled] = useState(false);

  const [individualUserData, setIndividualUserData] = useState({});
  const [customSettingResult, setCustomSettingResult] = useState(null);
  const [isUserDetailsChanged, setIsUserDetailsChanged] = useState(false);
  const [isResetPasswordChanged, setIsResetPasswordChanged] = useState(false);

  const [resetPasswordInfo, setResetPasswordInfo] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const userId = localStorage.getItem("id");
  let logoutPayload = { refresh: localStorage.getItem("refresh_token") };

  useEffect(() => {
    if (userId) {
      dispatch(SingleUser(userId));
    }
  }, [dispatch, userId]);

  useEffect(() => {
    if (singleUserData && Object.keys(singleUserData).length > 0) {
      setIndividualUserData({
        ...singleUserData,
        full_name: `${singleUserData.first_name} ${singleUserData.last_name}`,
      });
      if (singleUserData.isAdmin === true) {
        dispatch(CustomSetting());
      }
    }
  }, [dispatch, singleUserData]);

  useEffect(() => {
    if (customSettingData) {
      setCustomSettingResult(customSettingData.data);
    }
  }, [customSettingData]);

  useEffect(() => {
    if (logoutData) {
      toast.success(logoutData.data, { className: "toast-font" });
      setIsUserDetailsChanged(false);
      setIsResetPasswordChanged(false);
      dispatch(resetLoginState());
      dispatch(resetCustomSettingState());
      dispatch(resetNotificationState());
      dispatch(resetLogoutState());
      dispatch(resetResetPasswordState());
      dispatch(resetUpdateUserState());
      navigate("/");
    }

    if (logoutError) {
      toast.error(logoutError);
    }
  }, [logoutData, logoutError, navigate, dispatch]);

  useEffect(() => {
    if (updateCustomSettingData) {
      setIsCustomSettingSave(false);
      setIsCustomSettingEdit(false);
      setCustomSettingDataDisabled(true);
      setIsCustomSettingDisabled(false);
      toast.success(updateCustomSettingData.data);
    }

    if (updateCustomSettingError) {
      setIsCustomSettingSave(true);
      setIsCustomSettingEdit(false);
      setCustomSettingDataDisabled(false);
      setIsCustomSettingDisabled(true);
      toast.error(updateCustomSettingData.error);
    }
  }, [updateCustomSettingData, updateCustomSettingError]);

  useEffect(() => {
    if (isUserDetailsChanged && updateUserData) {
      toast.success(updateUserData.data);
      setIsUserSettingSave(false);
      setIsUserSettingEdit(false);
      setNavTabDisabled(true);
      setIsUserSettingDisabled(false);
      setIsUserDetailsChanged(false);
    }
    if (isResetPasswordChanged && resetPasswordData) {
      toast.success(resetPasswordData.data);
      setIsUserSettingSave(false);
      setIsUserSettingEdit(false);
      setNavTabDisabled(true);
      setIsUserSettingDisabled(false);
      setIsResetPasswordChanged(false);
      setResetPasswordInfo({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      toast.info("Relogin with new password");
      navigate("/");
    }

    if (updateUserError) {
      toast.error(updateUserData);
      setIsUserSettingSave(true);
      setIsUserSettingEdit(false);
      setNavTabDisabled(false);
      setIsUserSettingDisabled(false);
    }
    if (resetPasswordError) {
      setNavTabDisabled(false);
      toast.error(resetPasswordError);
      setIsUserSettingSave(true);
      setIsUserSettingEdit(false);
      setIsUserSettingDisabled(false);
    }
  }, [
    updateUserData,
    resetPasswordData,
    updateUserError,
    resetPasswordError,
    navigate,
  ]);

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
    if (isUserDetailsChanged) {
      const nameParts = individualUserData.full_name.trim().split(" ");
      const firstName = nameParts[0];
      const lastName = nameParts.slice(1).join(" ");

      let userPayload = {
        id: individualUserData.id,
        first_name: firstName,
        last_name: lastName,
        contactNo: individualUserData.contactNo,
        address: individualUserData.address,
      };

      dispatch(UpdateUser({ updateData: userPayload, id: userPayload.id }));
    }

    if (isResetPasswordChanged) {
      if (
        resetPasswordInfo.oldPassword?.trim() &&
        resetPasswordInfo.newPassword?.trim() &&
        resetPasswordInfo.confirmPassword?.trim()
      ) {
        if (!resetPasswordValidation(resetPasswordInfo)) {
          return;
        }
        let passwordPayload = {
          old_password: resetPasswordInfo.oldPassword,
          new_password: resetPasswordInfo.newPassword,
          retype_password: resetPasswordInfo.confirmPassword,
        };
        dispatch(resetPassword(passwordPayload));
      }
    }
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
    let customPayload = {
      ...customSettingResult,
      email: customSettingResult.email
        .split(",")
        .map((email) => email.trim())
        .filter((email) => email !== ""),
    };

    Object.keys(customPayload).forEach((key) => {
      if (key !== "email") {
        customPayload[key] = parseInt(customPayload[key], 10) || 0; // Convert to integer, default to 0 if NaN
      }
    });
    dispatch(UpdateCustomSetting(customPayload));
  };

  const handleUserDetails = (event) => {
    const { name, value } = event.target;
    setIndividualUserData((prev) => ({ ...prev, [name]: value }));
    setIsUserDetailsChanged(true);
  };

  const handleResetPassword = (event) => {
    const { name, value } = event.target;
    setResetPasswordInfo((prev) => ({ ...prev, [name]: value }));
    setIsResetPasswordChanged(true);
  };

  const handleCustomSettingData = (event) => {
    const { name, value } = event.target;
    setCustomSettingResult((prev) => ({
      ...prev,
      [name]: name === "email" ? value : value,
    }));
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
            Hello ! {individualUserData?.full_name}
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
              className="border border-dark d-flex rounded mx-auto user-img p-2"
            />
          </div>

          <div>
            <button
              className="btn btn-info mx-2 my-3"
              type="button"
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
              {updateUserLoading || resetPasswordLoading ? (
                <>
                  &nbsp;
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  />
                </>
              ) : (
                <i className="bi bi-floppy"></i>
              )}
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
                    name="full_name"
                    placeholder="First Name"
                    value={individualUserData?.full_name}
                    onChange={handleUserDetails}
                    disabled={navTabDisabled}
                  />
                  <input
                    className="form-control mt-1"
                    type="text"
                    name="contactNo"
                    placeholder="Contact Number"
                    onChange={handleUserDetails}
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
                    name="address"
                    onChange={handleUserDetails}
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
                    type="password"
                    placeholder="Old Password"
                    name="oldPassword"
                    value={resetPasswordInfo.oldPassword}
                    onChange={handleResetPassword}
                    disabled={navTabDisabled}
                  />
                  <input
                    className="form-control mt-1"
                    type="password"
                    placeholder="New Password"
                    name="newPassword"
                    value={resetPasswordInfo.newPassword}
                    onChange={handleResetPassword}
                    disabled={navTabDisabled}
                  />
                  <input
                    className="form-control mt-1"
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={resetPasswordInfo.confirmPassword}
                    onChange={handleResetPassword}
                    disabled={navTabDisabled}
                  />
                </div>
              </div>
            </div>
          </div>
          {individualUserData?.isAdmin ? (
            <>
              <div className="mx-auto">
                {/* <i className="bi bi-gear me-2"></i>
                <span className="fs-5">Custom Setting</span> */}
                <button
                  className="btn btn-info mx-2 my-2"
                  type="button"
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
                  {updateCustomSettingLoading ? (
                    <>
                      &nbsp;
                      <span
                        className="spinner-border spinner-border-sm"
                        role="status"
                        aria-hidden="true"
                      />
                    </>
                  ) : (
                    <i className="bi bi-floppy"></i>
                  )}
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
                    className="float-end custom_setting_input"
                    name="notification_days"
                    value={customSettingResult?.notification_days}
                    onChange={handleCustomSettingData}
                    disabled={customSettingDataDisabled}
                  />
                  <label htmlFor="carExpense" className="col-form-label">
                    Car Expense (Rs/Km) :
                  </label>
                  <input
                    type="text"
                    name="vehicalCarRate"
                    className="float-end custom_setting_input"
                    value={customSettingResult?.vehicalCarRate}
                    onChange={handleCustomSettingData}
                    disabled={customSettingDataDisabled}
                  />
                  <label htmlFor="carExpense" className="col-form-label">
                    Two Wheeler Expense (Rs/Km) :
                  </label>
                  <input
                    type="text"
                    name="vehicalBikeRate"
                    className="float-end custom_setting_input"
                    value={customSettingResult?.vehicalBikeRate}
                    onChange={handleCustomSettingData}
                    disabled={customSettingDataDisabled}
                  />
                  <label htmlFor="visitSummaryCount" className="col-form-label">
                    Visit Summary Word Count :
                  </label>
                  <input
                    type="text"
                    className="float-end custom_setting_input"
                    name="visit_summary_word_count"
                    value={customSettingResult?.visit_summary_word_count}
                    onChange={handleCustomSettingData}
                    disabled={customSettingDataDisabled}
                  />
                  <label htmlFor="emailAddress" className="col-form-label">
                    Email Address for Expense Report :
                  </label>
                  <textarea
                    className="form-control"
                    rows={4}
                    name="email"
                    value={customSettingResult?.email}
                    onChange={handleCustomSettingData}
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
export default UserProfile;
