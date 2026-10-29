import { input } from "@prismatic-io/spectral";
import { cleanStringInput } from "../../util";

const customerPriceBandId = input({
  label: "Customer Price Band ID",
  comments: "The ID of the customer price band to retrieve",
  type: "string",
  required: true,
  placeholder: "1064",
  example: "1064",
  clean: cleanStringInput,
});

export default {
  customerPriceBandId,
};
