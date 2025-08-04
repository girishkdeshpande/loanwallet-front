import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

import { showWarningMessage } from "../../Redux/slices/globalMessageSlice";
import { confirmAction } from "../../Components/WarningMessage";
import {
  UpdateProduct,
  resetUpdateProductState,
} from "../../Redux/slices/productSlice";
import ProductForm from "./ProductForm";

const EditProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const initialData = location.state.initialData;
  const [updateProductFormData, setUpdateProductFormData] = useState({});
  const [areFieldsModified, setAreFieldsModified] = useState(false);
  const [modifiedFields, setModifiedFields] = useState({});

  const { updateProductData, updateProductLoading, updateProductError } =
    useSelector((state) => state.product.updateProductState);

  useEffect(() => {
    if (updateProductData) {
      toast.success(updateProductData.data);
      navigate("/homepage/product_records");
    }
    if (updateProductError) {
      toast.error(updateProductError);
    }
    dispatch(resetUpdateProductState());
  }, [updateProductData, updateProductError, dispatch, navigate]);

  const handleUpdateFormChange = (
    updatedProductData,
    areFieldsModified,
    hasErrors
  ) => {
    if (hasErrors) {
      setAreFieldsModified(false);
    } else {
      setAreFieldsModified(areFieldsModified);
    }
    setUpdateProductFormData(updatedProductData);
  };

  /* Handle Update button click */
  const handleUpdateProductClick = () => {
    dispatch(UpdateProduct(updateProductFormData));
  };

  /* Handle Cancel button click */
  const handleCancelClick = () => {
    confirmAction.current = () => {
      navigate("/homepage/product_records");
    };

    if (areFieldsModified) {
      dispatch(
        showWarningMessage({
          message: "Are you sure, you want to discard changes ?",
          loadingKey: "",
        })
      );
    } else {
      navigate("/homepage/product_records");
    }
  };

  return (
    <>
      {/* Render ProductForm Component*/}
      <ProductForm
        productData={initialData}
        onProductFormChange={handleUpdateFormChange}
        isEdit={true}
      />

      {/* Buttons */}
      <div className="row mt-4">
        <div className="col text-center">
          <button className="btn btn-primary mx-2" onClick={handleCancelClick}>
            Cancel
          </button>
          <button
            className="btn btn-primary mx-2"
            onClick={handleUpdateProductClick}
            disabled={updateProductLoading || !areFieldsModified}
          >
            {updateProductLoading ? (
              <>
                &nbsp;"Updating..."
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                />
              </>
            ) : (
              "Update"
            )}
          </button>
        </div>
      </div>
    </>
  );
};

export default EditProduct;
