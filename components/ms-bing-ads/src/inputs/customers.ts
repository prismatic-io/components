import { input, util } from "@prismatic-io/spectral";
import { cleanOptionalString } from "../util";
import { connectionInput, customerIdInput } from "./common";

const customerNameFilterInput = input({
  label: "Customer Name Filter",
  placeholder: "Enter customer name filter",
  type: "string",
  required: false,
  comments:
    "A partial or full name of the customers to retrieve. The operation includes the customer in the result if the customer's name begins with the specified filter name. This element is optional. To skip filtering by customer name, set this element to an empty string.",
  clean: cleanOptionalString,
});

const topNInput = input({
  label: "Top Number",
  type: "string",
  default: "5",
  comments:
    "A nonzero positive integer that specifies the number of customers to return in the result.",
  required: false,
  example: "5",
  clean: util.types.toNumber,
});

const onlyParentAccountsInput = input({
  label: "Only Parent Accounts",
  type: "boolean",
  default: "false",
  comments:
    "Determines whether to return only the advertiser accounts that belong to the customer or to also return linked customers and linked advertiser accounts under other customers. To limit the results to advertiser accounts directly under the specified customer, set this element to true, and otherwise leave it empty or set the property to false. The default value is false.",
  required: false,
  clean: util.types.toBool,
});

export const getCustomerInputs = {
  connection: connectionInput,
  customerId: {
    ...customerIdInput,
    comments:
      "The identifier of the customer whose information you want to get.",
    required: true,
  },
};

export const getCustomersInfoInputs = {
  connection: connectionInput,
  customerNameFilter: customerNameFilterInput,
  topN: topNInput,
};

export const getLinkedAccountsAndCustomersInfoInputs = {
  connection: connectionInput,
  customerId: {
    ...customerIdInput,
    comments: "The identifier of the customer whose hierarchy you want to get.",
    required: true,
  },
  onlyParentAccounts: onlyParentAccountsInput,
};

export const selectCustomerIdInputs = {
  connection: connectionInput,
};
