import { input, util } from "@prismatic-io/spectral";
import { ENDPOINTS } from "../constants";
import { connection } from "./common";

const idocEndpoint = input({
  label: "Endpoint",
  type: "string",
  required: true,
  default: ENDPOINTS.IDOC_INBOUND,
  comments: "The SAP IDoc inbound endpoint path.",
  example: ENDPOINTS.IDOC_INBOUND,
  placeholder: "Enter endpoint path",
  clean: util.types.toString,
});

const rfcEndpoint = input({
  label: "Endpoint",
  type: "string",
  required: true,
  default: ENDPOINTS.SOAP_RFC,
  comments: "The SAP SOAP endpoint path.",
  example: ENDPOINTS.SOAP_RFC,
  placeholder: "Enter endpoint path",
  clean: util.types.toString,
});

const idocData = input({
  label: "IDoc XML Data",
  type: "code",
  language: "xml",
  required: true,
  comments: "The full IDoc XML payload to send to SAP.",
  example: `<?xml version="1.0" encoding="utf-8"?>
<MATMAS05>
  <IDOC BEGIN="1">
    <EDI_DC40 SEGMENT="1">
      <MESTYP>MATMAS</MESTYP>
      <IDOCTYP>MATMAS05</IDOCTYP>
    </EDI_DC40>
  </IDOC>
</MATMAS05>`,
  placeholder: "Enter IDoc XML payload",
  clean: util.types.toString,
});

const idocNumber = input({
  label: "IDoc Number",
  type: "string",
  required: true,
  comments: "The IDoc number to retrieve status for.",
  example: "0000000001234567",
  placeholder: "Enter IDoc number",
  clean: util.types.toString,
});

export const sendIdocInputs = {
  connection,
  idocData,
  endpoint: idocEndpoint,
};

export const getIdocStatusInputs = {
  connection,
  idocNumber,
  endpoint: rfcEndpoint,
};
