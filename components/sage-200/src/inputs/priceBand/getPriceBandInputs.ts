import { input } from "@prismatic-io/spectral";
import { cleanStringInput } from "../../util";

const priceBandId = input({
  label: "Price Band ID",
  comments: "The ID of the price band to retrieve",
  type: "string",
  required: true,
  placeholder: "1064",
  example: "1064",
  dataSource: "selectPriceBand",
  clean: cleanStringInput,
});

export default {
  priceBandId,
};
