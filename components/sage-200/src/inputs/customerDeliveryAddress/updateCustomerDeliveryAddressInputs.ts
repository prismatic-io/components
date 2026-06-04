import { input } from "@prismatic-io/spectral";
import { cleanStringInput } from "../../util";
import { optionalUpdateBoolean } from "../general";
import sharedInputs from "./sharedInputs";

const deliveryAddressId = input({
  label: "Delivery Address ID",
  comments: "The ID of the customer delivery addresses to update.",
  type: "string",
  required: true,
  example: "82780",
  placeholder: "82780",
  dataSource: "selectCustomerDeliveryAddress",
  clean: cleanStringInput,
});

const isDefault = input({
  ...optionalUpdateBoolean,
  label: sharedInputs.isDefault.label,
  comments: sharedInputs.isDefault.comments,
});

export default {
  deliveryAddressId,
  ...sharedInputs,
  isDefault,
};
