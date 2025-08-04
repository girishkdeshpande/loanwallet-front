import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import Search from "../../Components/Search";
import Table from "../../Components/Table";
import Pagination from "../../Components/Pagination";
import { confirmAction } from "../../Components/WarningMessage";
import {
  ProductsByNameAndType,
  DeleteProduct,
  resetProductsByNameAndTypeState,
  resetDeleteProductState,
} from "../../Redux/slices/productSlice";
import { showWarningMessage } from "../../Redux/slices/globalMessageSlice";

import { sortedProductType } from "../../Utilities/ListConstants";
import { productColumns } from "../../Utilities/TableColumns";

import ViewSingleProduct from "./ViewSingleProduct"; // Assuming this is the correct import path
import PageSpinner from "../../Components/PageSpinner";
import NoRecordsFound from "../../Components/NoRecordsFound";
import NoRecords from "../../Components/NoRecords";

const ViewProducts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchRef = useRef(null);
  const selectRef = useRef(null);

  const {
    productsByNameAndTypeData,
    productsByNameAndTypeLoading,
    productsByNameAndTypeError,
  } = useSelector((state) => state.product.productsByNameAndTypeState);
  //   const { deleteProductData, deleteProductLoading, deleteProductError } =
  //     useSelector((state) => state.product.deleteProductState);

  const [productsData, setProductsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchString, setSearchString] = useState("");
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedType, setSelectedType] = useState("");
  const [isRequestRaised, setIsRequestRaised] = useState(false);
  const [modalProductData, setModalProductData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [shouldRenderModal, setShouldRenderModal] = useState(false);

  const isBackendPaginated = false;

  // Pagination Logic
  const recordsPerPage = 10;
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const paginatedProducts = productsData.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );

  useEffect(() => {
    // Reset state on component mount
    return () => {
      setProductsData([]);
      setCurrentPage(1);
      dispatch(resetProductsByNameAndTypeState());
    };
  }, [dispatch]);

  useEffect(() => {
    if (productsByNameAndTypeData) {
      console.log("All Product Data", productsByNameAndTypeData.data);
      setProductsData(productsByNameAndTypeData.data);
      setIsRequestRaised(true);
    }

    if (productsByNameAndTypeError) {
      setProductsData([]);
      setIsRequestRaised(false);
      //   toast.error(productsByNameAndTypeError);
    }
    dispatch(resetProductsByNameAndTypeState());
  }, [productsByNameAndTypeData, productsByNameAndTypeError, dispatch]);

  const handleSearchByProductType = (event) => {
    setSelectedType(event.target.value);
    if (event.target.value === "") {
      setProductsData([]);
      setIsRequestRaised(false);
      return;
    }
    dispatch(
      ProductsByNameAndType(
        `?product_name=${""}&product_type=${event.target.value}`
      )
    );
  };

  /* Handle change in Search component */
  const handleSearchChange = (value) => {
    setSearchString(value);
    if (value.trim() === "") {
      setProductsData([]);
      setIsRequestRaised(false);
    }
  };

  /* Handle Search click event */
  const handleSearchClick = (searchString) => {
    dispatch(
      ProductsByNameAndType(`?product_name=${searchString}&product_type=${""}`)
    );
  };

  /* Handle Enter Key Press in Search event */
  const handleSearchKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearchClick(searchString); // This is your existing function to trigger the API
    }
  };

  /* Handle focus of Search component */
  const handleSearchFocus = () => {
    const hasValue = searchString.trim() !== "";
    if (!hasValue) {
      setSelectedRow(null);
      setSelectedType("");
      setProductsData([]);
      setIsRequestRaised(false);
    }
  };

  /* Handle focus of Select component */
  const handleSelectFocus = () => {
    const hasValue = selectedType.trim() !== "";
    if (!hasValue) {
      setSelectedRow(null);
      setSearchString("");
      setProductsData([]);
      setIsRequestRaised(false);
    }
  };

  /* Handle Radio button selection */
  const handleRadioSelection = (productId) => {
    setSelectedRow((prevSelected) =>
      prevSelected === productId ? null : productId
    );
  };

  /* Handle View button click */
  const handleViewClick = (productId) => {
    let productData = productsData.find((product) => product.id === productId);
    setModalProductData(productData);
    setShouldRenderModal(true);
    setShowModal(true);
  };

  /* Handle Close button click of View Single User Information click */
  const handleViewClose = () => {
    const modalEl = document.getElementById("productDetailsModal");

    if (window.bootstrap && modalEl) {
      // Prevent focus-related accessibility warning
      if (document.activeElement && modalEl.contains(document.activeElement)) {
        document.activeElement.blur();
      }

      const instance = window.bootstrap.Modal.getInstance(modalEl);
      instance?.hide(); // Trigger Bootstrap fade-out
    }

    // Delay unmounting to match fade-out duration (300ms)
    setTimeout(() => {
      setShowModal(false); // Hide modal JSX
      setShouldRenderModal(false); // Actually remove from DOM
    }, 300);
  };

  /* Handle Delete button click */
  const handleDeleteClick = (productId) => {
    console.log("Delete Product ID:", productId);
    confirmAction.current = () => {
      dispatch(DeleteProduct(productId)).then((response) => {
        console.log("Delete Product Response:", response.type);
        if (response.type === "product/deleteProduct/fulfilled") {
          toast.success(response.payload.data);
          navigate("/homepage");
        } else {
          toast.error(response.payload.error);
        }
      });
      dispatch(resetDeleteProductState());
    };

    dispatch(
      showWarningMessage({
        message: "Are you sure, you want to delete this Product ?",
        loadingKey: "product.deleteProductState.deleteProductLoading",
      })
    );
  };

  /* Handle Edit button click */
  const handleEditClick = (productId) => {
    let productData = productsData.find((product) => product.id === productId);
    navigate("/homepage/update_product", {
      state: { initialData: productData },
    });
  };

  return (
    <>
      <div className="row align-items-center">
        <div className="col text-start">
          <h5> Product Records </h5>
        </div>

        <Search
          ref={searchRef}
          value={searchString}
          onChange={handleSearchChange}
          onSearch={handleSearchClick}
          onFocus={handleSearchFocus}
          onKeyDown={handleSearchKeyDown}
          label="Search Product by Name"
        />

        <div className="col text-end">
          <div className="form-floating d-inline-block mt-1">
            <select
              className="form-select rounded-4 border border-1 border-dark"
              id="floatingSelect"
              ref={selectRef}
              onFocus={handleSelectFocus}
              value={selectedType}
              onChange={handleSearchByProductType}
            >
              <option value="">-- Select --</option>
              {sortedProductType.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <label htmlFor="floatingSelect">Search By Product Type</label>
          </div>
        </div>

        {productsByNameAndTypeLoading ? (
          <PageSpinner />
        ) : !isRequestRaised ? (
          <NoRecords />
        ) : productsData.length === 0 ? (
          <NoRecordsFound />
        ) : (
          <>
            <Table
              columns={productColumns}
              data={paginatedProducts}
              extraProps={{
                selectedRow,
                handleRadioSelection,
                handleViewClick,
                handleEditClick,
                handleDeleteClick,
              }}
            />

            {/* Pagination Component */}
            <div className="pagination-wrapper">
              <Pagination
                data={productsData}
                recordsPerPage={recordsPerPage}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
                isBackendPaginated={isBackendPaginated}
              />
            </div>
          </>
        )}

        {/* View Single User Information Component */}
        {showModal && shouldRenderModal && (
          <ViewSingleProduct
            productData={modalProductData}
            show={showModal}
            onClose={handleViewClose}
          />
        )}
      </div>
    </>
  );
};
export default ViewProducts;
