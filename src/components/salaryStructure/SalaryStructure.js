import React from "react";

const SalaryStructure = (props) => {
  const {isViewMode} = props;
  return (
    <div className="section-background-shadow-radius p-3 mt-4">
      <span className="emp-heading color-2E3192">Salary Structure</span>
      <div className="row mt-4">
        <div className="col-4">
          <label htmlFor="basic-pay" className="d-block label-text">
            Basic Pay
          </label>
          <span className="salary-input">
            <input
              type="number"
              id="basic-pay"
              placeholder="0.00"
              className="input-section ps-3 pe-2"
              min={0}
              disabled={isViewMode}
            />
          </span>
        </div>
        <div className="col-4">
          <label htmlFor="tax" className="d-block label-text">
            Professional Tax
          </label>
          <span className="salary-input">
            <input
              type="number"
              id="tax"
              placeholder="0.00"
              className="input-section ps-3 pe-2"
              min={0}
              disabled={isViewMode}
            />
          </span>
        </div>
        <div className="col-4">
          <label htmlFor="leave" className="d-block label-text">
            Leave Deuctions
          </label>
          <span className="salary-input">
            <input
              type="number"
              id="leave"
              placeholder="0.00"
              className="input-section ps-3 pe-2"
              min={0}
              disabled={isViewMode}
            />
          </span>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-4">
          <label htmlFor="reten-money" className="d-block label-text">
            Retention Money
          </label>
          <span className="salary-input">
            <input
              type="number"
              id="reten-money"
              placeholder="0.00"
              className="input-section ps-3 pe-2"
              min={0}
              disabled={isViewMode}
            />
          </span>
        </div>
        <div className="col-4">
          <label htmlFor="other" className="d-block label-text">
            Other Allowances
          </label>
          <span className="salary-input">
            <input
              type="number"
              id="other"
              placeholder="0.00"
              className="input-section ps-3 pe-2"
              min={0}
              disabled={isViewMode}
            />
          </span>
        </div>
        <div className="col-4">
          <label htmlFor="total" className="d-block label-text">
            Total
          </label>
          <span className="salary-input">
            <input
              type="number"
              id="total"
              placeholder="0.00"
              className="input-section ps-3 pe-2"
              min={0}
              disabled={isViewMode}
            />
          </span>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-4">
          <label htmlFor="total-earn" className="d-block label-text">
            Total Earnings
          </label>
          <span className="salary-input">
            <input
              type="number"
              id="total-earn"
              placeholder="0.00"
              className="input-section ps-3 pe-2"
              min={0}
              disabled={isViewMode}
            />
          </span>
        </div>
        <div className="col-4">
          <label htmlFor="total-deduction" className="d-block label-text">
            Total Deductions
          </label>
          <span className="salary-input">
            <input
              type="number"
              id="total-deduction"
              placeholder="0.00"
              className="input-section ps-3 pe-2"
              min={0}
              disabled={isViewMode}
            />
          </span>
        </div>
        <div className="col-4">
          <label htmlFor="net-pay" className="d-block label-text">
            Net Pay
          </label>
          <span className="salary-input">
            <input
              type="number"
              id="net-pay"
              placeholder="0.00"
              className="input-section ps-3 pe-2"
              min={0}
              disabled={isViewMode}
            />
          </span>
        </div>
      </div>
      {!isViewMode &&<div className="d-flex justify-content-end mt-4 mb-2">
        <span className="cancel-button px-5 py-1 ">Cancel</span>
        <span className="apply-pro-save-btn px-5 py-1 text-white ms-3">
          Save
        </span>
      </div>}
    </div>
  );
};

export default SalaryStructure;
