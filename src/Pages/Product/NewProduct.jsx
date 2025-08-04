import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import {
  RegisterProduct,
  resetRegisterProductState,
} from "../../Redux/slices/productSlice";

import { showWarningMessage } from "../../Redux/slices/globalMessageSlice";
import { confirmAction } from "../../Components/WarningMessage";
import ProductForm from "./ProductForm";

const NewProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [registerProductForm, setRegisterProductForm] = useState({});
  const [areFieldsModified, setAreFieldsModified] = useState(false);
  const [formKey, setFormKey] = useState(Date.now());

  const { registerProductData, registerProductLoading, registerProductError } =
    useSelector((state) => state.product.registerProductState);

  /* Catch response of backend API */
  useEffect(() => {
    if (registerProductData) {
      toast.success(registerProductData?.data);
      setFormKey(Date.now());
    }

    if (registerProductError) {
      toast.error(registerProductError);
    }
    dispatch(resetRegisterProductState());
  }, [registerProductData, registerProductError, dispatch]);

  /* Handle form changes received from ProductForm component */
  const handleRegisterProductChange = (
    updatedProductData,
    areFieldsModified,
    hasErrors
  ) => {
    if (hasErrors) {
      setAreFieldsModified(false);
    } else {
      setAreFieldsModified(areFieldsModified);
    }
    setRegisterProductForm(updatedProductData);
  };

  /* Handle Register button click */
  const handleRegisterProductClick = () => {
    dispatch(RegisterProduct(registerProductForm));
  };

  /* Handle Cancel button click */
  const handleCancelClick = () => {
    confirmAction.current = () => {
      navigate("/homepage");
    };

    if (areFieldsModified) {
      dispatch(
        showWarningMessage({
          message: "Are you sure, you want to discard changes ?",
          loadingKey: "",
        })
      );
    } else {
      navigate("/homepage");
    }
  };

  return (
    <>
      {/* Render Product Form */}
      <ProductForm
        key={formKey}
        onProductFormChange={handleRegisterProductChange}
        isEdit={false}
      />

      {/* Buttons */}
      <div className="row my-4">
        <div className="col text-center">
          <button className="btn btn-primary mx-2" onClick={handleCancelClick}>
            Cancel
          </button>
          <button
            className="btn btn-primary mx-2"
            onClick={handleRegisterProductClick}
            disabled={registerProductLoading || !areFieldsModified}
          >
            {registerProductLoading ? (
              <>
                &nbsp; Registering{" "}
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                />
              </>
            ) : (
              "Register"
            )}
          </button>
        </div>
      </div>
    </>
  );
};
export default NewProduct;
