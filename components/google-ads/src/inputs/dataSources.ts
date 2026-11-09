import { toOptionalCustomerId } from "../util";
import {
  connectionInput,
  customerClientLevel,
  customerIdInput,
  managerCustomerIdInput,
} from "./common";

export const listAccessibleCustomersInputs = {
  connection: connectionInput,
};

export const listAccessibleSubAccountsInputs = {
  connection: connectionInput,
  customerId: { ...customerIdInput, dataSource: undefined },
  customerClientLevel,
};

export const selectUserListInputs = {
  connection: connectionInput,
  customerId: { ...customerIdInput, dataSource: undefined },
  managerCustomerId: {
    ...managerCustomerIdInput,
    required: false,
    clean: toOptionalCustomerId,
    dataSource: undefined,
    comments:
      "The Google Ads manager account the request is made through, when the customer is reached through a manager. Accepts hyphenated or number forms.",
  },
};
