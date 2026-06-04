import { confirmClientLink } from "./confirmClientLink";
import { createClientLink } from "./createClientLink";
import { customerEntityActions } from "./customerEntity";
import { listAccessibleCustomers } from "./listAccessibleCustomers";
import { listCustomers } from "./listCustomers";

export default {
  listAccessibleCustomers,
  listCustomers,
  ...customerEntityActions,
  createClientLink,
  confirmClientLink,
};
