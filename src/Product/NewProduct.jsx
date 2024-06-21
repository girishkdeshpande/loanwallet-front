const NewProduct = () => {
  return (
    <div className="container-fluid h-100">
      <div className="row">
        <div className="col-12 mt-2">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <a href="#">Home</a>
              </li>
              <li class="breadcrumb-item">
                <a>Product</a>
              </li>
              <li class="breadcrumb-item" aria-current="page">
                New Product
              </li>
            </ol>
          </nav>

          <hr></hr>

          <div className="container-fluid">
            <form className="float-start rounded w-100 mb-1">
              <div className="row">
                <div className="col-12">
                  <label className="bg-info rounded text-start col-form-label col-form-label-sm fw-normal fs-6 px-2 w-100 mt-1">
                    Primary Information
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
                <div className="col-3">
                  <input
                    type="text"
                    className="form-control my-2"
                    aria-describedby="stdPackSize"
                    placeholder="Standard Pack Size"
                    required
                  />
                </div>
                <div className="col-1">
                  <input
                    type="text"
                    className="form-control my-2"
                    aria-describedby="price"
                    placeholder="Price"
                    required
                  />
                </div>
                <div className="col-1">
                  <input
                    type="text"
                    className="form-control my-2"
                    aria-describedby="capex"
                    placeholder="Capex"
                    required
                  />
                </div>

                <div className="col-12">
                  <label className="bg-info rounded text-start col-form-label col-form-label-sm fw-normal fs-6 px-2 w-100 mt-1">
                    Product Group
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
                    <label className="form-check-label" for="flexCheckDefault">
                      Crucible
                    </label>
                  </div>
                  <div className="form-check my-2">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                    />
                    <label className="form-check-label" for="flexCheckDefault">
                      Binder
                    </label>
                  </div>
                  <div className="form-check my-2">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                    />
                    <label className="form-check-label" for="flexCheckDefault">
                      Feeding
                    </label>
                  </div>
                  <div className="form-check my-2">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                    />
                    <label className="form-check-label" for="flexCheckDefault">
                      Copper Alloy Metal Treatment
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
                    <label className="form-check-label" for="flexCheckDefault">
                      Powder Flux
                    </label>
                  </div>
                  <div className="form-check my-2">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                    />
                    <label className="form-check-label" for="flexCheckDefault">
                      Granular Flux
                    </label>
                  </div>
                  <div className="form-check my-2">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                    />
                    <label className="form-check-label" for="flexCheckDefault">
                      Filteration
                    </label>
                  </div>
                  <div className="form-check my-2">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                    />
                    <label className="form-check-label" for="flexCheckDefault">
                      Degassing & Metal Treatment Station
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
                    <label className="form-check-label" for="flexCheckDefault">
                      DX Tube
                    </label>
                  </div>
                  <div className="form-check my-2">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                    />
                    <label className="form-check-label" for="flexCheckDefault">
                      DG Shape
                    </label>
                  </div>
                  <div className="form-check my-2">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                    />
                    <label className="form-check-label" for="flexCheckDefault">
                      Machines
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
                    <label className="form-check-label" for="flexCheckDefault">
                      MOD Alloy
                    </label>
                  </div>
                  <div className="form-check my-2">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                    />
                    <label className="form-check-label" for="flexCheckDefault">
                      Crucible Stand
                    </label>
                  </div>
                  <div className="form-check my-2">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                    />
                    <label className="form-check-label" for="flexCheckDefault">
                      Metal Treatment
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
                    <label className="form-check-label" for="flexCheckDefault">
                      Melting
                    </label>
                  </div>
                  <div className="form-check my-2">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                    />
                    <label className="form-check-label" for="flexCheckDefault">
                      Diecoatings
                    </label>
                  </div>
                  <div className="form-check my-2">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                    />
                    <label className="form-check-label" for="flexCheckDefault">
                      Melt Shop Refactories
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
                    <label className="form-check-label" for="flexCheckDefault">
                      Mould & Core Prep
                    </label>
                  </div>
                  <div className="form-check my-2">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                    />
                    <label className="form-check-label" for="flexCheckDefault">
                      Mould & Core Coatings
                    </label>
                  </div>
                  <div className="form-check my-2">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                    />
                    <label className="form-check-label" for="flexCheckDefault">
                      Other Products
                    </label>
                  </div>
                </div>

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
                <div className="col-1">
                  <input
                    type="text"
                    className="form-control my-2"
                    aria-describedby="height"
                    placeholder="Height"
                    required
                  />
                </div>
                <div className="col-1">
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

                <div className="col-12">
                  <label className="bg-info rounded text-start col-form-label col-form-label-sm fw-normal fs-6 px-2 w-100 mt-1">
                    Manufacturing Method
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
                    <label className="form-check-label" for="flexCheckDefault">
                      GDC
                    </label>
                  </div>
                  <div className="form-check my-2">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                    />
                    <label className="form-check-label" for="flexCheckDefault">
                      LPDC
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
                    <label className="form-check-label" for="flexCheckDefault">
                      HPDC
                    </label>
                  </div>
                  <div className="form-check my-2">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                    />
                    <label className="form-check-label" for="flexCheckDefault">
                      Centrifugal
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
                    <label className="form-check-label" for="flexCheckDefault">
                      Sand Moulding
                    </label>
                  </div>
                  <div className="form-check my-2">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                    />
                    <label className="form-check-label" for="flexCheckDefault">
                      Shell Moulding
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
                    <label className="form-check-label" for="flexCheckDefault">
                      Investment Casting
                    </label>
                  </div>
                  <div className="form-check my-2">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                    />
                    <label className="form-check-label" for="flexCheckDefault">
                      Plaster Casting
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
                    <label className="form-check-label" for="flexCheckDefault">
                      Continuous Casting
                    </label>
                  </div>
                  <div className="form-check my-2">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                    />
                    <label className="form-check-label" for="flexCheckDefault">
                      Vaccum Casting
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
                    <label className="form-check-label" for="flexCheckDefault">
                      Lost Foam
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
                    <label className="form-check-label" for="flexCheckDefault">
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
                    <label className="form-check-label" for="flexCheckDefault">
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
                    <label className="form-check-label" for="flexCheckDefault">
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
                    <label className="form-check-label" for="flexCheckDefault">
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
                    <label className="form-check-label" for="flexCheckDefault">
                      Copper Alloys
                    </label>
                  </div>
                </div>

                <div className="col-12">
                  <label className="bg-info rounded text-start col-form-label col-form-label-sm fw-normal fs-6 px-2 w-100 mt-1">
                    Customer Type
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
                    <label className="form-check-label" for="flexCheckDefault">
                      Casting Manufacturer
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
                    <label className="form-check-label" for="flexCheckDefault">
                      Alloy Manufacturer
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
                    <label className="form-check-label" for="flexCheckDefault">
                      Core Manufacturer
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
                    <label className="form-check-label" for="flexCheckDefault">
                      Furnace Manufacturer
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
                    <label className="form-check-label" for="flexCheckDefault">
                      Utensil Manufacturer
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
                    <label className="form-check-label" for="flexCheckDefault">
                      Rolling & Extrusion Factory
                    </label>
                  </div>
                </div>

                <div className="col-4">
                  <label className="bg-info rounded text-start col-form-label col-form-label-sm fw-normal fs-6 px-2 w-100 mt-1">
                    Summary
                  </label>
                </div>
                <div className="col-4">
                  <label className="bg-info rounded text-start col-form-label col-form-label-sm fw-normal fs-6 px-2 w-100 mt-1">
                    Terms & Conditions
                  </label>
                </div>
                <div className="col-4 input-group mt-1 " style={{ width: 300 }}>
                  <input
                    type="file"
                    className="form-control"
                    id="inputGroupFile02"
                  />
                  <label
                    className="input-group-text"
                    htmlFor="inputGroupFile02"
                  >
                    Upload
                  </label>
                </div>
                <div className="col-4">
                  <textarea
                    type="text"
                    className="form-control mt-1"
                    aria-describedby="summary"
                    rows="2"
                    placeholder=""
                    required
                  />
                </div>
                <div className="col-4">
                  <textarea
                    type="text"
                    className="form-control mt-1"
                    aria-describedby="t&c"
                    rows="2"
                    placeholder=""
                    required
                  />
                </div>
              </div>
              <div>
                <button className="btn btn-primary mx-3 mt-3">Cancel</button>
                <button className="btn btn-primary mx-3 mt-3">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default NewProduct;
