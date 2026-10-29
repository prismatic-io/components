import { input, util } from "@prismatic-io/spectral";
import { connection, restaurantExternalId } from "./shared";

const businessDate = input({
  label: "Business Date",
  comments:
    "The business date the deposits were created, in the format yyyymmdd.",
  type: "string",
  required: true,
  example: "20180228",
  placeholder: "20180228",
  clean: util.types.toString,
});

export const listDepositsInputs = {
  connection,
  restaurantExternalId,
  businessDate,
};
