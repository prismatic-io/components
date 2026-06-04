import { input, util } from "@prismatic-io/spectral";
import {
  connectionInput,
  customerIdInput,
  fetchAll,
  managerCustomerIdInput,
  pageTokenInput,
} from "./common";

const managerLinkId = input({
  label: "Manager Link ID",
  placeholder: "Enter manager link ID",
  type: "string",
  required: true,
  example: "1234567890",
  comments:
    "The unique identifier of the manager link. See [Customer manager link documentation](https://developers.google.com/google-ads/api/reference/rpc/latest/CustomerManagerLink).",
  clean: util.types.toString,
});

export const confirmClientLinkInputs = {
  connection: connectionInput,
  managerCustomerId: managerCustomerIdInput,
  customerId: customerIdInput,
  managerLinkId,
};

export const createClientLinkInputs = {
  connection: connectionInput,
  managerCustomerId: managerCustomerIdInput,
  customerId: customerIdInput,
};

export const listAccessibleCustomersInputs = {
  connection: connectionInput,
};

export const listCustomersInputs = {
  connection: connectionInput,
  managerCustomerId: managerCustomerIdInput,
  fetchAll,
  pageToken: pageTokenInput,
};
