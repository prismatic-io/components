import { input } from "@prismatic-io/spectral";
import { cleanStringInput } from "../../util";

const customerContactId = input({
  label: "Customer Contact ID",
  comments: "The ID of the customer contact to retrieve",
  type: "string",
  required: true,
  placeholder: "27914",
  example: "27914",
  dataSource: "selectCustomerContact",
  clean: cleanStringInput,
});

export default {
  customerContactId,
};
