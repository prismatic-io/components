import { input, util } from "@prismatic-io/spectral";
import { ENDPOINTS } from "../constants";
import { connection } from "./common";

const endpoint = input({
  label: "Endpoint",
  type: "string",
  required: true,
  default: ENDPOINTS.SOAP_RFC,
  comments: "The SAP SOAP endpoint path.",
  example: ENDPOINTS.SOAP_RFC,
  placeholder: "Enter endpoint path",
  clean: util.types.toString,
});

const searchPattern = input({
  label: "Search Pattern",
  type: "string",
  required: false,
  default: "BAPI_%",
  comments:
    "ABAP LIKE pattern to filter function module names. Use '%' as wildcard. Defaults to all BAPIs.",
  example: "BAPI_CUSTOMER%",
  placeholder: "Enter search pattern",
  clean: util.types.toString,
});

export const selectBapiInputs = {
  connection,
  endpoint,
  searchPattern,
};
