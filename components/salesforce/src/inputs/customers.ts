import { input, util } from "@prismatic-io/spectral";
import { cleanStringInput } from "../util";
import { connectionInput, listInputs, name, recordId, version } from "./common";

const customerStatusType = input({
  label: "Customer Status Type",
  type: "string",
  required: false,
  comments: "The status of the customer account.",
  model: [
    {
      label: "Active",
      value: "Active",
    },
    {
      label: "Inactive",
      value: "Inactive",
    },
  ],
  clean: cleanStringInput,
  default: "Active",
});

const lastReferenceDate = input({
  label: "Last Reference Date",
  type: "string",
  required: false,
  placeholder: "Enter date (ISO 8601)",
  comments: "The timestamp for when the current user last viewed a record related to this record.",
  clean: cleanStringInput,
  example: "2021-09-01T00:00:00.000Z",
});

const lastViewedDate = input({
  label: "Last Viewed Date",
  type: "string",
  required: false,
  placeholder: "Enter date (ISO 8601)",
  comments:
    "The timestamp for when the current user last viewed this record. If this value is null, it's possible that this record was referenced (LastReferencedDate) and not viewed.",
  clean: cleanStringInput,
  example: "2021-09-01T00:00:00.000Z",
});

const ownerId = input({
  label: "Owner ID",
  placeholder: "Enter owner ID",
  type: "string",
  required: false,
  comments: "The ID of the user who owns the record.",
  clean: cleanStringInput,
  example: "00570000001a2fF",
});

const partyId = input({
  label: "Party ID",
  placeholder: "Enter party ID",
  type: "string",
  required: true,
  comments: "The unique identifier of the individual object related to this customer record.",
  clean: util.types.toString,
  example: "0697000000K2g5AAAR",
});

const totalLifeTimeValue = input({
  label: "Total Lifetime Value",
  type: "string",
  required: false,
  placeholder: "Enter total lifetime value",
  comments: "The total revenue amount gained from this customer.",
  clean: (value: unknown) => {
    const totalLifeTimeValue = util.types.toInt(value);
    if (Number.isNaN(totalLifeTimeValue) || totalLifeTimeValue <= 0) {
      return undefined;
    }
    return totalLifeTimeValue;
  },
  example: "1000",
});

export const createCustomerInputs = {
  version,
  name: {
    ...name,
    comments: "Name of this customer.",
    required: true,
  },
  partyId,
  customerStatusType,
  lastReferenceDate,
  lastViewedDate,
  ownerId,
  totalLifeTimeValue,
  connection: connectionInput,
};

export const updateCustomerInputs = {
  recordId: {
    ...recordId,
    dataSource: "selectCustomer",
  },
  version,
  name: {
    ...name,
    comments: "Name of this customer.",
    required: true,
  },
  partyId,
  customerStatusType,
  lastReferenceDate,
  lastViewedDate,
  ownerId,
  totalLifeTimeValue,
  connection: connectionInput,
};

export const deleteCustomerInputs = {
  version,
  recordId: {
    ...recordId,
    dataSource: "selectCustomer",
  },
  connection: connectionInput,
};

export const getCustomerInputs = {
  version,
  recordId: {
    ...recordId,
    dataSource: "selectCustomer",
  },
  connection: connectionInput,
};

export const listCustomersInputs = { ...listInputs };

export const describeCustomerSObjectInputs = {
  version,
  connection: connectionInput,
};
