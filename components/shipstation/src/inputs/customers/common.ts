import { input, util } from "@prismatic-io/spectral";
import { cleanStringInput } from "../../util";

export const customerId = input({
  label: "Customer ID",
  type: "string",
  required: true,
  comments: "The unique identifier for the customer.",
  placeholder: "Enter customer ID",
  dataSource: "selectCustomers",
  clean: util.types.toString,
});

export const stateCode = input({
  label: "State Code",
  type: "string",
  required: false,
  comments:
    "The two-letter state or province abbreviation for the customer address.",
  placeholder: "Enter state code",
  clean: cleanStringInput,
});

export const countryCode = input({
  label: "Country Code",
  type: "string",
  required: false,
  comments: "The two-letter ISO country code to filter customers.",
  placeholder: "Enter country code",
  clean: cleanStringInput,
});
