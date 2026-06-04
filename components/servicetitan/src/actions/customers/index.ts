import { createCustomer } from "./create";
import customerContact from "./customerContact";
import { getCustomer } from "./get";
import { listCustomers } from "./list";
import { updateCustomer } from "./update";

export default {
  createCustomer,
  updateCustomer,
  listCustomers,
  getCustomer,
  ...customerContact,
};
