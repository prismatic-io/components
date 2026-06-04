import { input } from "@prismatic-io/spectral";
import { cleanStringInput } from "../../util";

const customerId = input({
  label: "Customer ID",
  type: "string",
  comments: "The ID of the customer to delete.",
  required: true,
  placeholder: "82060",
  example: "82060",
  dataSource: "selectCustomer",
  clean: cleanStringInput,
});

export default {
  customerId,
};
