import {
  connectionInput,
  customerClientLevel,
  customerIdInput,
} from "./common";

export const listAccessibleCustomersDataSourceInputs = {
  connection: connectionInput,
};

export const listAccessibleSubAccountsDataSourceInputs = {
  connection: connectionInput,
  customerId: { ...customerIdInput, dataSource: undefined },
  customerClientLevel,
};
