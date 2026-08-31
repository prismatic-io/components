import { connectionInput, forwardCursorPagination, timeout } from "./common";
export const listAccountsInputs = {
  timeout,
  pagination: forwardCursorPagination,
  stripeConnection: connectionInput,
};
