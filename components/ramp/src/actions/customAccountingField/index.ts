import { createCustomAccountingField } from "./create";
import { deleteCustomAccountingField } from "./delete";
import { getCustomAccountingField } from "./get";
import { listCustomAccountingField } from "./list";
import options from "./options";
import { updateCustomAccountingField } from "./update";

export default {
  createCustomAccountingField,
  getCustomAccountingField,
  listCustomAccountingField,
  deleteCustomAccountingField,
  updateCustomAccountingField,
  ...options,
};
