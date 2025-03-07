import { useState } from "react";

const NewCompany = ({ handleMenuClick }) => {
  const [showPrimaryInfo, setShowPrimaryInfo] = useState(false);

  const handleNewCompanyMenuClick = (e) => {
    setShowPrimaryInfo(!showPrimaryInfo);
  };

  const PrimaryInfo = () => {
    return (
      <>
        <div className="col-12">
          <label className="bg-info rounded text-start col-form-label col-form-label-sm fw-normal fs-6 px-2 w-100 mt-2">
            Primary Information
          </label>
        </div>
        <div className="col-3">
          <input
            type="text"
            className="form-control mt-1"
            aria-describedby="companyName"
            placeholder="Company Name"
            required
          />
        </div>
        <div className="col-3">
          <input
            type="text"
            className="form-control mt-1"
            aria-describedby="addressLine1"
            placeholder="Address Line 1"
            required
          />
        </div>
        <div className="col-3">
          <input
            type="text"
            className="form-control mt-1"
            aria-describedby="addressLine2"
            placeholder="Address Line 2"
            required
          />
        </div>
        <div className="col-3">
          <input
            type="text"
            className="form-control mt-1"
            aria-describedby="gstNumber"
            placeholder="GSTN"
            required
          />
        </div>
        <div className="col-3">
          <input
            type="text"
            className="form-control mt-1"
            aria-describedby="lattitude"
            placeholder="Lattitude"
            required
          />
        </div>
        <div className="col-3">
          <input
            type="text"
            className="form-control mt-1"
            aria-describedby="longitude"
            placeholder="Longitude"
            required
          />
        </div>
        <div className="col-3">
          <input
            type="text"
            className="form-control mt-1"
            aria-describedby="tonnagePerMonth"
            placeholder="Tonnage Per Month"
            required
          />
        </div>
        <div className="col-3">
          <input
            className="form-control mt-1"
            list="datalistOptions"
            id="exampleDataList"
            placeholder="Customer Repesentative..."
          />
          <datalist id="datalistOptions">
            <option value="Swapnil Vyavahare" />
            <option value="Vaibhav Jadhav" />
            <option value="Jai Shilwant" />
            <option value="Vicky Mahore" />
          </datalist>
        </div>
        <div className="col-12">
          <label className="bg-info rounded d-flex justify-content-between text-start col-form-label col-form-label-sm fw-normal fs-6 px-2 w-100 mt-2">
            <span>Contact Person</span>
            <a href="#" className="text-dark">
              <a href="#" className="text-dark me-2">
                Remove
              </a>
              Add
            </a>
          </label>
        </div>
        <div className="col-2 mt-1">
          <input
            type="text"
            className="form-control"
            aria-describedby="firstName"
            placeholder="First Name"
            required
          />
        </div>
        <div className="col-2 mt-1">
          <input
            type="text"
            className="form-control"
            aria-describedby="lastName"
            placeholder="Last Name"
            required
          />
        </div>
        <div className="col-2 mt-1">
          <input
            className="form-control"
            list="designationList"
            id="designationOpt"
            placeholder="Designation"
          />
          <datalist id="designationList">
            <option value="Owner" />
            <option value="Head" />
            <option value="Accountant" />
            <option value="Supervisor" />
            <option value="Maintenance Head" />
            <option value="Other Designation" />
          </datalist>
        </div>
        <div className="col-4 mt-1">
          <input
            type="text"
            className="form-control"
            aria-describedby="email"
            placeholder="Email"
            required
          />
        </div>
        <div className="col-2 mt-1">
          <input
            type="text"
            className="form-control"
            aria-describedby="contactNumber"
            placeholder="Contact Number"
            required
          />
        </div>
        <div className="col-12 mt-2">
          <table className="table table-secondary table-bordered border-info">
            <tbody>
              <tr>
                <td style={{ width: "180px" }}>First Name</td>
                <td style={{ width: "180px" }}>Last Name</td>
                <td style={{ width: "181px" }}>Designation</td>
                <td style={{ width: "360px" }}>Email</td>
                <td>Contact Number</td>
              </tr>
            </tbody>
          </table>
        </div>
      </>
    );
  };

  const FoundryFurnaceType = () => {
    return (
      <>
        <div className="col-12">
          <label className="bg-info rounded text-start col-form-label col-form-label-sm fw-normal fs-6 px-2 w-100 mt-1">
            Foundry Type
          </label>
        </div>
        <div className="form-check form-check-inline mt-2">
          <input
            className="form-check-input"
            type="checkbox"
            value=""
            id="flexCheckDefault"
          />
          <label className="form-check-label" htmlfor="flexCheckDefault">
            Non Ferrous Foundry
          </label>
        </div>
        <div className="form-check form-check-inline mt-2">
          <input
            className="form-check-input"
            type="checkbox"
            value=""
            id="flexCheckDefault"
          />
          <label className="form-check-label" htmlfor="flexCheckDefault">
            Iron Foundry
          </label>
        </div>
        <div className="form-check form-check-inline mt-2">
          <input
            className="form-check-input"
            type="checkbox"
            value=""
            id="flexCheckDefault"
          />
          <label className="form-check-label" htmlfor="flexCheckDefault">
            Steel Foundry
          </label>
        </div>

        <div className="row">
          <div className="col-12">
            <label className="bg-info rounded text-start col-form-label col-form-label-sm fw-normal fs-6 px-2 w-100 mt-1">
              Furnace Details
            </label>
          </div>
          <div className="col-2 ms-1">
            <label className="col-form-label">Number of Furnace</label>
          </div>
          <div className="col-1">
            <input className="form-control mt-1 w-75" type="text" />
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
              <label className="form-check-label" htmlFor="inlineCheckbox1">
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
              <label className="form-check-label" htmlFor="inlineCheckbox2">
                Other Furnace
              </label>
            </div>
          </div>
        </div>
      </>
    );
  };

  const CrucibleDetails = () => {
    return (
      <>
        <div className="row">
          <div className="col-2 mt-2">
            <input
              className="form-control"
              list="crucibleSizeList"
              id="crucibleOpt"
              placeholder="Crucible Size"
            />
            <datalist id="crucibleSizeList">
              <option value="Owner" />
              <option value="Head" />
              <option value="Accountant" />
              <option value="Supervisor" />
              <option value="Maintenance Head" />
              <option value="Other Designation" />
            </datalist>
          </div>
          <div className="col-1">
            <input
              className="form-control mt-2"
              type="text"
              placeholder="Qty"
            />
          </div>
          <div className="col-2 mt-2">
            <input
              className="form-control"
              list="crucibleStandList"
              id="crucibleStandOpt"
              placeholder="Crucible Stand"
            />
            <datalist id="crucibleStandList">
              <option value="Owner" />
              <option value="Head" />
              <option value="Accountant" />
              <option value="Supervisor" />
              <option value="Maintenance Head" />
              <option value="Other Designation" />
            </datalist>
          </div>
          <div className="col-1">
            <input
              className="form-control mt-2"
              type="text"
              placeholder="Qty"
            />
          </div>
          <div className="col-3 mt-2">
            <input
              className="form-control"
              list="furnaceFunctionList"
              id="furnaceFunctionOpt"
              placeholder="Furnace Function"
            />
            <datalist id="furnaceFunctionList">
              <option value="Holding" />
              <option value="Melting" />
              <option value="Melting cum Holding" />
            </datalist>
          </div>
          <div className="col-3 mt-2">
            <input
              className="form-control"
              list="furnaceChargeMediaList"
              id="furnaceChanrgeMediaOpt"
              placeholder="Furnace Charge Media"
            />
            <datalist id="furnaceChargeMediaList">
              <option value="Electric Resistance" />
              <option value="Gas Fired" />
              <option value="Oil Fired" />
              <option value="Coal" />
              <option value="Induction" />
            </datalist>
          </div>
          <div className="col-12 mt-2">
            <table className="table table-secondary table-bordered border-info">
              <tbody>
                <tr>
                  <td style={{ width: "175px" }}>Crucible Size</td>
                  <td style={{ width: "90px" }}>Qty</td>
                  <td style={{ width: "180px" }}>Crucible Stand</td>
                  <td style={{ width: "85px" }}>Qty</td>
                  <td style={{ width: "265px" }}>Furnace Function</td>
                  <td>Furnace Charge Media</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
  };

  const OtherFurnaceDetails = () => {
    return (
      <>
        <div className="row">
          <div className="col-3 mt-2">
            <input
              className="form-control"
              list="otherFurnaceList"
              id="otherFurnaceOpt"
              placeholder="Furnace Type"
            />
            <datalist id="otherFurnaceList">
              <option value="Skelner" />
              <option value="Induction" />
              <option value="Tower" />
              <option value="Cupola" />
              <option value="Reverberatory" />
              <option value="Electric Arc" />
            </datalist>
          </div>
          <div className="col-2">
            <input
              className="form-control mt-2"
              type="text"
              placeholder="Melting Capacity"
            />
          </div>
          <div className="col-3 mt-2">
            <input
              className="form-control"
              list="otherFurnaceFunctionList"
              id="otherFurnaceFunctionOpt"
              placeholder="Furnace Function"
            />
            <datalist id="otherFurnaceFunctionList">
              <option value="Holding" />
              <option value="Melting" />
              <option value="Melting cum Holding" />
            </datalist>
          </div>
          <div className="col-3 mt-2">
            <input
              className="form-control"
              list="furnaceChargeMediaList"
              id="furnaceChanrgeMediaOpt"
              placeholder="Furnace Charge Media"
            />
            <datalist id="furnaceChargeMediaList">
              <option value="Electric Resistance" />
              <option value="Gas Fired" />
              <option value="Oil Fired" />
              <option value="Coal" />
              <option value="Induction" />
            </datalist>
          </div>
          <div className="col-11 mt-2">
            <table className="table table-secondary table-bordered border-info">
              <tbody>
                <tr>
                  <td style={{ width: "275px" }}>Furnace Type</td>
                  <td style={{ width: "180px" }}>Melting Capacity</td>
                  <td style={{ width: "270px" }}>Furnace Function</td>
                  <td>Furnace Charge Media</td>
                </tr>
              </tbody>
            </table>
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
          <div className="col-2">
            <div className="form-check my-2">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label className="form-check-label" htmlfor="flexCheckDefault">
                GDC
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
              <label className="form-check-label" htmlfor="flexCheckDefault">
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
              <label className="form-check-label" htmlfor="flexCheckDefault">
                HPDC
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
              <label className="form-check-label" htmlfor="flexCheckDefault">
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
              <label className="form-check-label" htmlfor="flexCheckDefault">
                Sand Moulding
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
              <label className="form-check-label" htmlfor="flexCheckDefault">
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
              <label className="form-check-label" htmlfor="flexCheckDefault">
                Investment Casting
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
              <label className="form-check-label" htmlfor="flexCheckDefault">
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
              <label className="form-check-label" htmlfor="flexCheckDefault">
                Continuous Casting
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
              <label className="form-check-label" htmlfor="flexCheckDefault">
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
              <label className="form-check-label" htmlfor="flexCheckDefault">
                Lost Foam
              </label>
            </div>
          </div>

          <div className="col-12">
            <label className="bg-info rounded text-start col-form-label col-form-label-sm fw-normal fs-6 px-2 w-100 mt-1">
              Melting Metals & Alloys
            </label>
          </div>
          <div className="row">
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
                <label className="form-check-label" htmlFor="flexCheckDefault">
                  Copper Alloys
                </label>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  const CopperAlloyDetails = () => {
    return (
      <>
        <div className="container border border-1 border-secondary">
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
                  Nickel Silver Alloys - Castings
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

  const LadleFlux = () => {
    return (
      <>
        <div className="row">
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

          <div className="col-2">
            <input
              className="form-control mt-2"
              type="text"
              placeholder="Lining Material"
            />
          </div>
          <div className="col-2">
            <input
              className="form-control mt-2"
              type="text"
              placeholder="Capacity (KG)"
            />
          </div>
          <div className="col-2">
            <input
              className="form-control mt-2"
              type="text"
              placeholder="Quantity"
            />
          </div>

          <div className="col-2">
            <input
              className="form-control mt-2"
              type="text"
              placeholder="Make"
            />
          </div>
          <div className="col-2">
            <input
              className="form-control mt-2"
              type="text"
              placeholder="Quantity"
            />
          </div>
          <div className="col-2">
            <input
              className="form-control mt-2"
              type="text"
              placeholder="Remark"
            />
          </div>

          <div className="col-6 mt-2">
            <table className="table table-secondary table-bordered border-info">
              <tbody>
                <tr>
                  <td style={{ width: "180px" }}>Lining Material</td>
                  <td style={{ width: "182px" }}>Capacity(KG)</td>
                  <td>Quantity</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="col-6 mt-2">
            <table className="table table-secondary table-bordered border-info">
              <tbody>
                <tr>
                  <td style={{ width: "180px" }}>Make</td>
                  <td style={{ width: "182px" }}>Quantity</td>
                  <td>Remark</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
  };

  const CapexDetails = () => {
    return (
      <>
        <div className="row">
          <div className="col-12">
            <label className="bg-info d-flex justify-content-between rounded col-form-label col-form-label-sm fw-normal fs-6 px-2 w-100 mt-1">
              <span>Capex Details</span>
              <a href="#" className="text-dark">
                Add
              </a>
            </label>
          </div>
          <div className="col-2 my-2">
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
        </div>
        <div className="row">
          <div className="col-2 my-2">
            <input
              className="form-control"
              list="datalistOptions"
              id="exampleDataList"
              placeholder="Degassing Machine"
            />
            <datalist id="datalistOptions">
              <option value="Swapnil Vyavahare" />
              <option value="Vaibhav Jadhav" />
              <option value="Jai Shilwant" />
              <option value="Vicky" />
            </datalist>
          </div>
          <div className="col-2 my-2">
            <input
              type="text"
              className="form-control"
              aria-describedby="make"
              placeholder="Make"
              required
            />
          </div>
          <div className="col-1">
            <input
              className="form-control mt-2"
              type="text"
              placeholder="Qty"
            />
          </div>
          <div className="col-2">
            <div className="form-check mt-2">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label className="form-check-label" htmlFor="flexCheckDefault">
                Rotar
              </label>
            </div>
            <div className="form-check mt-4">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label className="form-check-label" htmlFor="flexCheckDefault">
                Shaft
              </label>
            </div>
            <div className="form-check mt-4">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label className="form-check-label" htmlFor="flexCheckDefault">
                Bottle Plate
              </label>
            </div>
          </div>
          <div className="col-3">
            <div className="mt-2">
              <input
                className="form-control"
                list="datalistOptions"
                id="exampleDataList"
                placeholder="Product List"
              />
              <datalist id="datalistOptions">
                <option value="Swapnil Vyavahare" />
                <option value="Vaibhav Jadhav" />
                <option value="Jai Shilwant" />
                <option value="Vicky" />
              </datalist>
            </div>
            <div className="mt-1">
              <input
                className="form-control"
                list="datalistOptions"
                id="exampleDataList"
                placeholder="Product List"
              />
              <datalist id="datalistOptions">
                <option value="Swapnil Vyavahare" />
                <option value="Vaibhav Jadhav" />
                <option value="Jai Shilwant" />
                <option value="Vicky" />
              </datalist>
            </div>
            <div className="mt-1">
              <input
                className="form-control"
                list="datalistOptions"
                id="exampleDataList"
                placeholder="Product List"
              />
              <datalist id="datalistOptions">
                <option value="Swapnil Vyavahare" />
                <option value="Vaibhav Jadhav" />
                <option value="Jai Shilwant" />
                <option value="Vicky" />
              </datalist>
            </div>
          </div>
          <div className="col-2">
            <input
              className="form-control mt-2"
              type="text"
              placeholder="Remark"
            />
          </div>
          <div className="col-12 mt-2">
            <table className="table table-secondary table-bordered border-info">
              <tbody>
                <tr>
                  <td style={{ width: "170px" }}>Degassing Machine</td>
                  <td style={{ width: "150px" }}>Make</td>
                  <td style={{ width: "80px" }}>Qty</td>
                  <td style={{ width: "172px" }}>Consumable Product</td>
                  <td style={{ width: "240px" }}>Product List</td>
                  <td style={{ width: "140px" }}>Remark</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12 mb-2 mx-2">
          {/* <label className="col-12 bg-info border border-1 border-secondary rounded text-center col-form-label col-form-label-sm fw-normal fs-6 px-2 w-100">
            New Company
          </label> */}
        </div>

        <div className="col-2">
          <div className="container rounded border border-1 border-secondary ms-2 h-100">
            <label
              className="my-4"
              href="#"
              onClick={() => handleNewCompanyMenuClick("PrimaryInfo")}
            >
              Company Information & Contact Person
            </label>
            <label className="my-4">Foundry & Furnace Type</label>
            <label className="my-4">
              Manufacturing Method and Melting Metals & Alloys
            </label>
            <label className="my-4">
              Transfer Ladle & Flux Injector Machine
            </label>
            <label className="my-4 me-3">Capex & Other Information</label>
          </div>
        </div>

        <div className="col-10">
          <div className="container border border-1 border-secondary rounded h-100 ms-2">
            <div className="row">{showPrimaryInfo && <PrimaryInfo />}</div>
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-center">
        <button className="btn btn-primary my-3 mx-2">Cancel</button>
        <button className="btn btn-primary my-3 mx-2">Submit</button>
      </div>
    </div>
  );
};

export default NewCompany;
