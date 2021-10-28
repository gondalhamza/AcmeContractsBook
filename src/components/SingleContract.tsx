import React, { FormEvent, useEffect, useState } from "react";
import { Contract } from "../models/contract";

type Props = {
  details: Contract;
  update: (contract: Contract) => void;
};

function SingleContract(props: Props) {
  const update = props.update;
  const [contract, setContract] = useState(props.details);
  const [isEdit, setIsEdit] = useState(false);

  const handleChange = (event: FormEvent) => {
    const target = event.target as HTMLInputElement;
    const key = target.name;
    const value = target.type === "checkbox" ? target.checked : target.value;
    setContract((oldState) => ({ ...oldState, [key]: value }));
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    update(contract);
    setIsEdit(false);
  };

  return (
    <div className="contract">
      {!isEdit ? (
        <>
          <div className="link" onClick={() => setIsEdit(true)}>
            edit
          </div>
          <div className="contract-id">{contract.contractId}</div>
          <div className="company">{contract.company}</div>
          <div className="dates">
            <div className="period-start">{contract.periodStart}</div>
            <div className="period-end">{contract.periodEnd}</div>
          </div>
          <div className="schedule-for-renewal">
            <b>Schedule for Renewal:</b>{" "}
            {contract.scheduledForRenewal ? "Yes" : "No"}
          </div>
          <div className="negotiation-renewal-date">
            <b>Negotiation Date:</b> {contract.negotiationRenewalDate}
          </div>
        </>
      ) : (
        <>
          <form method="post" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder={"contractId"}
              value={contract.contractId}
              name="contractId"
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder={"company"}
              value={contract.company}
              name="company"
              onChange={handleChange}
            />
            <input
              type="datetime-local"
              placeholder={"periodStart"}
              value={contract.periodStart}
              name="periodStart"
              onChange={handleChange}
            />
            <input
              type="datetime-local"
              placeholder={"periodEnd"}
              value={contract.periodEnd}
              name="periodEnd"
              onChange={handleChange}
            />
            <label>
              Scheduled for Renewal
              <input
                type="checkbox"
                placeholder={"scheduledForRenewal"}
                checked={contract.scheduledForRenewal}
                name="scheduledForRenewal"
                onChange={handleChange}
              />
            </label>
            <input
              type="datetime-local"
              placeholder={"negotiationRenewalDate"}
              value={contract.negotiationRenewalDate}
              name="negotiationRenewalDate"
              onChange={handleChange}
            />
            <input
              className="update-contract"
              type="submit"
              value="Update Contract"
            />
          </form>
          <button onClick={() => setIsEdit(false)}>Cancel</button>
        </>
      )}
    </div>
  );
}

export default SingleContract;
