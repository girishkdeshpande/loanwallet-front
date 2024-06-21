const NewCompany = () => {
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
                <a>Company</a>
              </li>
              <li class="breadcrumb-item" aria-current="page">
                New Company
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
                    aria-describedby="companyName"
                    placeholder="Company Name"
                    required
                  />
                </div>
                <div className="col-3">
                  <input
                    type="text"
                    className="form-control my-2"
                    aria-describedby="addressLine1"
                    placeholder="Address Line 1"
                    required
                  />
                </div>
                <div className="col-3">
                  <input
                    type="text"
                    className="form-control my-2"
                    aria-describedby="addressLine2"
                    placeholder="Address Line 2"
                    required
                  />
                </div>
                <div className="col-2">
                  <input
                    type="text"
                    className="form-control my-2"
                    aria-describedby="gstNumber"
                    placeholder="GSTN"
                    required
                  />
                </div>
                <div className="col-3">
                  <input
                    type="text"
                    className="form-control my-2"
                    aria-describedby="lattitude"
                    placeholder="Lattitude"
                    required
                  />
                </div>
                <div className="col-3">
                  <input
                    type="text"
                    className="form-control my-2"
                    aria-describedby="longitude"
                    placeholder="Longitude"
                    required
                  />
                </div>
                <div className="col-3">
                  <input
                    type="text"
                    className="form-control my-2"
                    aria-describedby="tonnagePerMonth"
                    placeholder="Tonnage Per Month"
                    required
                  />
                </div>
                <div className="col-3">
                  <input
                    type="text"
                    className="form-control my-2"
                    aria-describedby="customerRepresentative"
                    placeholder="Customer Representative"
                    required
                  />
                </div>

                <div className="col-12">
                  <label className="bg-info rounded text-start col-form-label col-form-label-sm fw-normal fs-6 px-2 w-100 mt-1">
                    Contact Person
                  </label>
                </div>
                <div className="col-2 my-2">
                  <input
                    type="text"
                    className="form-control"
                    aria-describedby="fullName"
                    placeholder="Full Name"
                    required
                  />
                </div>
                <div className="col-3 my-2">
                  <input
                    type="text"
                    className="form-control"
                    aria-describedby="designation"
                    placeholder="Designation"
                    required
                  />
                </div>
                <div className="col-3 my-2">
                  <input
                    type="text"
                    className="form-control"
                    aria-describedby="email"
                    placeholder="Email"
                    required
                  />
                </div>
                <div className="col-3 my-2">
                  <input
                    type="text"
                    className="form-control"
                    aria-describedby="contactNumber"
                    placeholder="Contact Number"
                    required
                  />
                </div>

                <div className="col-12">
                  <label className="bg-info rounded text-start col-form-label col-form-label-sm fw-normal fs-6 px-2 w-100 mt-1">
                    Foundry Type
                  </label>
                </div>
                <div className="col-2">
                  <div class="form-check mt-2">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                    />
                    <label class="form-check-label" for="flexCheckDefault">
                      Non Ferrous Foundry
                    </label>
                  </div>
                </div>
                <div className="col-2">
                  <div class="form-check mt-2">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                    />
                    <label class="form-check-label" for="flexCheckDefault">
                      Iron Foundry
                    </label>
                  </div>
                </div>
                <div className="col-2">
                  <div class="form-check mt-2">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                    />
                    <label class="form-check-label" for="flexCheckDefault">
                      Steel Foundry
                    </label>
                  </div>
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
                      Alluminium Alloys
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
                    Furnace Details
                  </label>
                </div>
                <div className="col-2 ms-1">
                  <label className="col-form-label w-75">
                    Number of Furnace
                  </label>
                </div>
                <div className="col-1">
                  <input
                    className="form-control mt-1 w-50"
                    type="text"
                    placeholder=""
                  />
                </div>
                <div className="col-2">
                  <label className="col-form-label">Furnace Type</label>
                </div>
                <div className="col-3 mt-2">
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      id="inlineCheckbox1"
                      value="option1"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="inlineCheckbox1"
                    >
                      Crucible
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      id="inlineCheckbox2"
                      value="option2"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="inlineCheckbox2"
                    >
                      Other Furnace
                    </label>
                  </div>
                </div>
                <div className="col-6">
                  <label className="bg-info rounded text-start col-form-label col-form-label-sm fw-normal fs-6 px-2 w-100 mt-1">
                    Transfer Ladle
                  </label>
                </div>
                <div className="col-6">
                  <label className="bg-info rounded text-start col-form-label col-form-label-sm fw-normal fs-6 px-2 w-100 mt-1">
                    Flux Injector Machine
                  </label>
                </div>

                <div className="col-3 my-2">
                  <input
                    type="text"
                    className="form-control"
                    aria-describedby="liningMaterial"
                    placeholder="Lining Material"
                    required
                  />
                </div>
                <div className="col-2 my-2">
                  <input
                    type="text"
                    className="form-control"
                    aria-describedby="capacity"
                    placeholder="Capacity(KG)"
                    required
                  />
                </div>
                <div className="col-1 my-2">
                  <input
                    type="text"
                    className="form-control"
                    aria-describedby="ladleQuantity"
                    placeholder="Qty"
                    required
                  />
                </div>

                <div className="col-2 my-2">
                  <input
                    type="text"
                    className="form-control"
                    aria-describedby="fluxMake"
                    placeholder="Make"
                    required
                  />
                </div>
                <div className="col-1 my-2">
                  <input
                    type="text"
                    className="form-control"
                    aria-describedby="fluxQuantity"
                    placeholder="Qty"
                    required
                  />
                </div>
                <div className="col-3 my-2">
                  <input
                    type="text"
                    className="form-control"
                    aria-describedby="fluxRemark"
                    placeholder="Remark"
                    required
                  />
                </div>

                <div className="col-12">
                  <label className="bg-info rounded col-form-label col-form-label-sm fw-normal fs-6 px-2 w-100 mt-1">
                    Capex Details<a href="#">Add</a>
                  </label>
                </div>
                <div className="col-2 my-2">
                  <input
                    type="text"
                    className="form-control"
                    aria-describedby="degassingMachine"
                    placeholder="Degassing Machine"
                    required
                  />
                </div>
                <div className="col-1 my-2">
                  <input
                    type="text"
                    className="form-control"
                    aria-describedby="capexMake"
                    placeholder="Make"
                    required
                  />
                </div>
                <div className="col-1 my-2">
                  <input
                    type="text"
                    className="form-control"
                    aria-describedby="capexQuantity"
                    placeholder="Qty"
                    required
                  />
                </div>
                <div className="col-1 my-2">
                  <input
                    type="text"
                    className="form-control"
                    aria-describedby="capexDensity"
                    placeholder="Density"
                    required
                  />
                </div>
                <div className="col-1 my-2">
                  <input
                    type="text"
                    className="form-control"
                    aria-describedby="rpt"
                    placeholder="RPT"
                    required
                  />
                </div>
                <div className="col-2 my-2">
                  <input
                    type="text"
                    className="form-control"
                    aria-describedby="consumableProduct"
                    placeholder="Consumable Product"
                    required
                  />
                </div>
                <div className="col-2 my-2">
                  <input
                    type="text"
                    className="form-control"
                    aria-describedby="productList"
                    placeholder="Product List"
                    required
                  />
                </div>
                <div className="col-2 my-2">
                  <input
                    type="text"
                    className="form-control"
                    aria-describedby="capexRemark"
                    placeholder="Remark"
                    required
                  />
                </div>
              </div>
              <div className="col-12">
                <label className="bg-info rounded col-form-label col-form-label-sm fw-normal fs-6 px-2 w-100 mt-1">
                  Other Information
                </label>
              </div>
              <div className="col-12">
                <textarea
                  type="text"
                  className="form-control mt-2"
                  aria-describedby="otherInfo"
                  rows="2"
                  placeholder=""
                  required
                />
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

export default NewCompany;
