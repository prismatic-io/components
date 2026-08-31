import {
  connectionInput,
  customerClientLevel,
  customerIdInput,
} from "./common";
export const listAccessibleCustomersInputs = {
  connection: connectionInput,
};
export const listAccessibleSubAccountsInputs = {
  connection: connectionInput,
  customerId: { ...customerIdInput, dataSource: undefined },
  customerClientLevel,
};
