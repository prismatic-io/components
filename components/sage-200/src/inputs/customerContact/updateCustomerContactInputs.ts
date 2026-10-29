import { input } from "@prismatic-io/spectral";
import { cleanStringInput } from "../../util";
import { optionalUpdateBoolean } from "../general";
import sharedInputs from "./sharedInputs";

const customerId = input({
  label: "Customer ID",
  comments: "The ID of the customer contact to update",
  type: "string",
  required: true,
  placeholder: "27914",
  example: "27914",
  dataSource: "selectCustomer",
  clean: cleanStringInput,
});

const isToDelete = input({
  ...optionalUpdateBoolean,
  label: sharedInputs.isToDelete.label,
  comments: sharedInputs.isToDelete.comments,
});

export default {
  customerId,
  ...sharedInputs,
  isToDelete,
};
