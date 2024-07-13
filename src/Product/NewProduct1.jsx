import avatar from "D:/loanwallet-front/src/Image/user_avatar.jpg";

const NewProduct1 = () => {
  const ProductInfo = () => {
    return (
      <>
        <div className="row">
          <div className="col-12">
            <label className="bg-info rounded text-start col-form-label col-form-label-sm fw-normal fs-6 px-2 w-100 mt-1">
              Product Information
            </label>
          </div>
          <div className="col-3">
            <input
              type="text"
              className="form-control my-2"
              aria-describedby="productName"
              placeholder="Product Name"
              required
            />
          </div>
          <div className="col-2">
            <input
              type="text"
              className="form-control my-2"
              aria-describedby="hsnCode"
              placeholder="HSN Code"
              required
            />
          </div>
          <div className="col-2">
            <input
              type="text"
              className="form-control my-2"
              aria-describedby="stdPackSize"
              placeholder="Standard Pack Size"
              required
            />
          </div>
          <div className="col-1 my-2">
            <input
              className="form-control"
              list="unitOptions"
              id="unitDataList"
              placeholder="Unit"
            />
            <datalist id="unitOptions">
              <option value="Kg" />
              <option value="Nos" />
              <option value="Box" />
              <option value="Liters" />
            </datalist>
          </div>
          <div className="col-2">
            <input
              type="text"
              className="form-control my-2"
              aria-describedby="price"
              placeholder="Price"
              required
            />
          </div>
          <div className="col-2 my-2">
            <input
              className="form-control"
              list="capexOptions"
              id="capexDataList"
              placeholder="Is Capex ?"
            />
            <datalist id="capexOptions">
              <option value="Yes" />
              <option value="No" />
            </datalist>
          </div>

          <div className="col-12">
            <label className="bg-info rounded text-start col-form-label col-form-label-sm fw-normal fs-6 px-2 w-100 mt-1">
              Product Group
            </label>
          </div>
          <div className="col-4 my-2">
            <input
              className="form-control"
              list="productGroupOptions"
              id="productGroupDataList"
              placeholder="Product Type"
            />
            <datalist id="productGroupOptions">
              <option value="Crucible" />
              <option value="Binder" />
              <option value="Feeding" />
              <option value="Powder Flux" />
              <option value="Granular Flux" />
              <option value="Filteration" />
              <option value="Copper Alloy Metal Treatment" />
              <option value="Degassing & Metal Treatment Station" />
              <option value="DX Tube" />
              <option value="DG Shape" />
              <option value="Machines" />
              <option value="MOD Alloy" />
              <option value="Crucible Stand" />
              <option value="Metal Treatment" />
              <option value="Melting" />
              <option value="Diecoatings" />
              <option value="Melt Shop Refactories" />
              <option value="Mould & Core Prep" />
              <option value="Mould & Core Coatings" />
              <option value="Other Products" />
            </datalist>
          </div>

          <div className="row">
            <div className="col-2">
              <input
                type="text"
                className="form-control my-2"
                aria-describedby="topDiameter"
                placeholder="Top Diameter"
                required
              />
            </div>
            <div className="col-2">
              <input
                type="text"
                className="form-control my-2"
                aria-describedby="bottomDiameter"
                placeholder="Bottom Diameter"
                required
              />
            </div>
            <div className="col-2">
              <input
                type="text"
                className="form-control my-2"
                aria-describedby="height"
                placeholder="Height"
                required
              />
            </div>
            <div className="col-2">
              <input
                type="text"
                className="form-control my-2"
                aria-describedby="weight"
                placeholder="Weight"
                required
              />
            </div>
            <div className="col-2">
              <input
                type="text"
                className="form-control my-2"
                aria-describedby="waterCapacity"
                placeholder="Water Capacity"
                required
              />
            </div>
            <div className="col-2">
              <input
                type="text"
                className="form-control my-2"
                aria-describedby="aluminiumCapacity"
                placeholder="Aluminium Capacity"
                required
              />
            </div>
          </div>

          <div className="col-12">
            <label className="bg-info rounded text-start col-form-label col-form-label-sm fw-normal fs-6 px-2 w-100 mt-1">
              Customer Type
            </label>
          </div>

          <div className="col-3">
            <div className="form-check my-2">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label className="form-check-label" for="flexCheckDefault">
                Alloy Manufacturer
              </label>
            </div>
          </div>
          <div className="col-3">
            <div className="form-check my-2">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label className="form-check-label" for="flexCheckDefault">
                Core Manufacturer
              </label>
            </div>
          </div>
          <div className="col-3">
            <div className="form-check my-2">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label className="form-check-label" for="flexCheckDefault">
                Casting Manufacturer
              </label>
            </div>
          </div>
          <div className="col-3">
            <div className="form-check my-2">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label className="form-check-label" for="flexCheckDefault">
                Furnace Manufacturer
              </label>
            </div>
          </div>
          <div className="col-3">
            <div className="form-check my-2">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label className="form-check-label" for="flexCheckDefault">
                Utensil Manufacturer
              </label>
            </div>
          </div>
          <div className="col-3">
            <div className="form-check my-2">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label className="form-check-label" for="flexCheckDefault">
                Rolling & Extrusion Factory
              </label>
            </div>
          </div>
        </div>
      </>
    );
  };

  const MethodMetalAlloy = () => {
    return (
      <>
        <div className="col-12">
          <label className="bg-info rounded text-start col-form-label col-form-label-sm fw-normal fs-6 px-2 w-100 mt-1">
            Manufacturing Method
          </label>
        </div>
        <div className="row">
          <div className="col-3">
            <div className="form-check my-2">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label className="form-check-label" htmlFor="flexCheckDefault">
                GDC
              </label>
            </div>
          </div>
          <div className="col-3">
            <div className="form-check my-2">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label className="form-check-label" htmlFor="flexCheckDefault">
                LPDC
              </label>
            </div>
          </div>
          <div className="col-3">
            <div className="form-check my-2">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label className="form-check-label" htmlFor="flexCheckDefault">
                HPDC
              </label>
            </div>
          </div>
          <div className="col-3">
            <div className="form-check my-2">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label className="form-check-label" htmlFor="flexCheckDefault">
                Centrifugal
              </label>
            </div>
          </div>
          <div className="col-3">
            <div className="form-check my-2">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label className="form-check-label" htmlFor="flexCheckDefault">
                Sand Moulding
              </label>
            </div>
          </div>
          <div className="col-3">
            <div className="form-check my-2">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label className="form-check-label" htmlFor="flexCheckDefault">
                Shell Moulding
              </label>
            </div>
          </div>
          <div className="col-3">
            <div className="form-check my-2">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label className="form-check-label" htmlFor="flexCheckDefault">
                Investment Casting
              </label>
            </div>
          </div>
          <div className="col-3">
            <div className="form-check my-2">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label className="form-check-label" htmlFor="flexCheckDefault">
                Plaster Casting
              </label>
            </div>
          </div>
          <div className="col-3">
            <div className="form-check my-2">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label className="form-check-label" htmlFor="flexCheckDefault">
                Continuous Casting
              </label>
            </div>
          </div>
          <div className="col-3">
            <div className="form-check my-2">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label className="form-check-label" htmlFor="flexCheckDefault">
                Vaccum Casting
              </label>
            </div>
          </div>
          <div className="col-3">
            <div className="form-check my-2">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label className="form-check-label" htmlFor="flexCheckDefault">
                Lost Foam
              </label>
            </div>
          </div>
          <div className="col-3">
            <div className="form-check my-2">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label className="form-check-label" htmlFor="flexCheckDefault">
                Utensil
              </label>
            </div>
          </div>

          <div className="col-12">
            <label className="bg-info rounded text-start col-form-label col-form-label-sm fw-normal fs-6 px-2 w-100 mt-1">
              Melting Metals & Alloys
            </label>
          </div>
          <div className="col-2">
            <div className="form-check my-2">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label className="form-check-label" htmlFor="flexCheckDefault">
                Aluminium Alloys
              </label>
            </div>
          </div>
          <div className="col-2">
            <div className="form-check my-2">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label className="form-check-label" htmlFor="flexCheckDefault">
                Steel Alloys
              </label>
            </div>
          </div>
          <div className="col-2">
            <div className="form-check my-2">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label className="form-check-label" htmlFor="flexCheckDefault">
                Iron Alloys
              </label>
            </div>
          </div>
          <div className="col-2">
            <div className="form-check my-2">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label className="form-check-label" htmlFor="flexCheckDefault">
                Zinc Alloys
              </label>
            </div>
          </div>
          <div className="col-2">
            <div className="form-check my-2">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label className="form-check-label" htmlFor="flexCheckDefault">
                Copper Alloys
              </label>
            </div>
          </div>
          <div className="row mt-2">
            <div className="col-3">
              <div className="form-check my-2">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="flexCheckDefault"
                />
                <label className="form-check-label" htmlFor="flexCheckDefault">
                  Commercial Copper
                </label>
              </div>
            </div>
            <div className="col-3">
              <div className="form-check my-2">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="flexCheckDefault"
                />
                <label className="form-check-label" htmlFor="flexCheckDefault">
                  High Conductivity Copper
                </label>
              </div>
            </div>
            <div className="col-3">
              <div className="form-check my-2">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="flexCheckDefault"
                />
                <label className="form-check-label" htmlFor="flexCheckDefault">
                  Brass
                </label>
              </div>
            </div>
            <div className="col-3">
              <div className="form-check my-2">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="flexCheckDefault"
                />
                <label className="form-check-label" htmlFor="flexCheckDefault">
                  Bronze & Gun Metal
                </label>
              </div>
            </div>
            <div className="col-3">
              <div className="form-check my-2">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="flexCheckDefault"
                />
                <label className="form-check-label" htmlFor="flexCheckDefault">
                  Aluminium Bronze & Manganeze Bronze
                </label>
              </div>
            </div>
            <div className="col-3">
              <div className="form-check my-2">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="flexCheckDefault"
                />
                <label className="form-check-label" htmlFor="flexCheckDefault">
                  Nickel Silver Alloys - Casting
                </label>
              </div>
            </div>
            <div className="col-3">
              <div className="form-check my-2">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="flexCheckDefault"
                />
                <label className="form-check-label" htmlFor="flexCheckDefault">
                  Nickel Silver Alloys - Hot & Cold Work
                </label>
              </div>
            </div>
            <div className="col-3">
              <div className="form-check my-2">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="flexCheckDefault"
                />
                <label className="form-check-label" htmlFor="flexCheckDefault">
                  Nickel Bronze & Nickel Copper Alloys
                </label>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  const SummaryTerms = () => {
    return (
      <>
        <div className="row">
          <div className="col-6">
            <label className="bg-info rounded text-start col-form-label col-form-label-sm fw-normal fs-6 px-2 w-100 mt-1">
              Summary
            </label>
          </div>
          <div className="col-6">
            <label className="bg-info rounded text-start col-form-label col-form-label-sm fw-normal fs-6 px-2 w-100 mt-1">
              Terms & Conditions
            </label>
          </div>
          <div className="col-6">
            <textarea
              type="text"
              className="form-control mt-1"
              aria-describedby="summary"
              rows="4"
              placeholder=""
              required
            />
          </div>
          <div className="col-6">
            <textarea
              type="text"
              className="form-control mt-1"
              aria-describedby="t&c"
              rows="4"
              placeholder=""
              required
            />
          </div>
        </div>
      </>
    );
  };

  const UploadImage = () => {
    return (
      <>
        <div className="row">
          <div className="col-4">
            <label className="bg-info rounded text-center col-form-label col-form-label-sm fw-normal fs-6 px-2 w-100 mt-1">
              Product Image
            </label>
            <div>
              <img
                src={avatar}
                className="img-fluid rounded d-block border border-dark mt-3 mb-3 mx-auto"
                alt="..."
                style={{ width: 200, height: 200 }}
              />
            </div>
            <div className="input-group mb-3 mx-auto" style={{ width: 300 }}>
              <input
                type="file"
                className="form-control"
                id="inputGroupFile02"
              />
              <label className="input-group-text" htmlFor="inputGroupFile02">
                Upload
              </label>
            </div>
          </div>
          <div className="col-4">
            <label className="bg-info rounded text-center col-form-label col-form-label-sm fw-normal fs-6 px-2 w-100 mt-1">
              PDS Image
            </label>
            <div>
              <img
                src={avatar}
                className="img-fluid rounded d-block border border-dark mt-3 mb-3 mx-auto"
                alt="..."
                style={{ width: 200, height: 200 }}
              />
            </div>
            <div className="input-group mb-3 mx-auto" style={{ width: 300 }}>
              <input
                type="file"
                className="form-control"
                id="inputGroupFile02"
              />
              <label className="input-group-text" htmlFor="inputGroupFile02">
                Upload
              </label>
            </div>
          </div>
          <div className="col-4">
            <label className="bg-info rounded text-center col-form-label col-form-label-sm fw-normal fs-6 px-2 w-100 mt-1">
              MSDS Image
            </label>
            <div>
              <img
                src={avatar}
                className="img-fluid rounded d-block border border-dark mt-3 mb-3 mx-auto"
                alt="..."
                style={{ width: 200, height: 200 }}
              />
            </div>
            <div className="input-group mb-3 mx-auto" style={{ width: 300 }}>
              <input
                type="file"
                className="form-control"
                id="inputGroupFile02"
              />
              <label className="input-group-text" htmlFor="inputGroupFile02">
                Upload
              </label>
            </div>
          </div>
        </div>
      </>
    );
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12 mb-2 mx-2">
          <label className="col-12 border border-2 border-secondary rounded text-center col-form-label col-form-label-sm fw-normal fs-6 px-2 w-100">
            New Product
          </label>
        </div>

        <div className="col-2">
          <div className="container rounded border border-2 border-secondary ms-2 h-100">
            <label className="my-4">
              Product Information Product Group Customer Type
            </label>
            <label className="my-4">
              Manufacturing Method Melting Metals & Alloys
            </label>
            <label className="my-4">Summary and Terms & Conditions</label>
            <label className="my-4 me-3">Upload Images</label>
          </div>
        </div>

        <div className="col-10">
          <div className="container border border-2 border-secondary rounded h-100 ms-2"></div>
        </div>
      </div>
      <div className="d-flex justify-content-center">
        <button className="btn btn-primary my-3 mx-2">Cancel</button>
        <button className="btn btn-primary my-3 mx-2">Submit</button>
      </div>
    </div>
  );
};
export default NewProduct1;
