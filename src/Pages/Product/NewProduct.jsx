import ProductForm from "./ProductForm";

const NewProduct = () => {
  return (
    <>
      {/* Render Product Form */}
      <ProductForm />

      {/* Buttons */}
      <div className="row my-4">
        <div className="col text-center">
          <button
            className="btn btn-primary mx-2"
            //   onClick={handleCancelClick}
          >
            Cancel
          </button>
          <button
            className="btn btn-primary mx-2"
            //   onClick={handleRegisterClick}
          >
            {/* {registerUserLoading ? (
                <>
                  &nbsp; Registering{" "}
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  />
                </>
              ) : ( */}
            Register
            {/* )} */}
          </button>
        </div>
      </div>
    </>
  );
};
export default NewProduct;
