import { input, util } from "@prismatic-io/spectral";
import { ENDPOINTS } from "../constants";
import { toOptionalInt, toOptionalString } from "../util/cleanInput";
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

const rowCount = input({
  label: "Row Count",
  type: "string",
  required: false,
  default: "50",
  comments: "Maximum number of IDocs to return per poll cycle.",
  example: "50",
  placeholder: "Enter row count",
  clean: toOptionalInt,
});

const messageType = input({
  label: "Message Type",
  type: "string",
  required: false,
  comments:
    "Optional IDoc message type filter (MESTYP). Only IDocs matching this type will be returned.",
  example: "ORDERS",
  placeholder: "Enter message type (e.g., ORDERS)",
  clean: toOptionalString,
});

const direction = input({
  label: "Direction",
  type: "string",
  required: false,
  comments: "Optional IDoc direction filter (DIRECT).",
  model: [
    { label: "Outbound (1)", value: "1" },
    { label: "Inbound (2)", value: "2" },
  ],
  clean: toOptionalString,
});

const startingDocnum = input({
  label: "Starting DOCNUM",
  type: "string",
  required: false,
  comments:
    "Used only on the very first poll when no cursor state exists yet. Once polling begins and state is saved, this value is ignored. Set this to the last known DOCNUM in your SAP system to avoid processing historical records.",
  example: "0000000000012345",
  placeholder: "Enter starting DOCNUM",
  clean: toOptionalString,
});

export const pollIdocInputs = {
  connection,
  endpoint,
  rowCount,
  messageType,
  direction,
  startingDocnum,
};
