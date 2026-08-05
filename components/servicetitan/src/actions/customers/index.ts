import { createCustomer } from "./createCustomer";
import customerContact from "./customerContact";
import { getCustomer } from "./getCustomer";
import { listCustomers } from "./listCustomers";
import { updateCustomer } from "./updateCustomer";
export default {
  createCustomer,
  updateCustomer,
  listCustomers,
  getCustomer,
  ...customerContact,
};
