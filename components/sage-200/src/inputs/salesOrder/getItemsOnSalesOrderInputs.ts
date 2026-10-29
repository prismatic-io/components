import { input } from "@prismatic-io/spectral";
import { cleanStringInput } from "../../util";

const orderLineId = input({
  label: "Order Line ID",
  comments:
    "The Sales Order Line ID. This can be found in the Sales Order Line 'lines' array attribute.",
  type: "string",
  required: true,
  placeholder: "38292",
  example: "38292",
  clean: cleanStringInput,
});

export default {
  orderLineId,
};
