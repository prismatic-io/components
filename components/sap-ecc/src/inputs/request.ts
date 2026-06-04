import { input, util } from "@prismatic-io/spectral";
import { connection } from "./common";

const soapBody = input({
  label: "SOAP Body",
  type: "code",
  language: "xml",
  required: true,
  comments:
    "The full SOAP XML envelope to send in the request body. Must be a valid SOAP 1.1 or 1.2 envelope.",
  example: `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope
  xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"
  xmlns:urn="urn:sap-com:document:sap:rfc:functions">

  <soap:Header/>

  <soap:Body>
    <urn:STFC_CONNECTION>
      <REQUTEXT>Hello SAP</REQUTEXT>
    </urn:STFC_CONNECTION>
  </soap:Body>

</soap:Envelope>`,
  placeholder: "Enter SOAP XML envelope",
  clean: util.types.toString,
});

const soapAction = input({
  label: "SOAP Action",
  type: "string",
  required: true,
  comments:
    "The SOAP Action header value, typically the RFC function module name.",
  example: "urn:sap-com:document:sap:rfc:functions:STFC_CONNECTION",
  placeholder: "Enter SOAP action URI",
  clean: util.types.toString,
});

const endpoint = input({
  label: "Endpoint",
  type: "string",
  required: true,
  default: "/sap/bc/soap/rfc",
  comments: "The SAP SOAP endpoint path.",
  example: "/sap/bc/soap/rfc",
  placeholder: "Enter endpoint path",
  clean: util.types.toString,
});

const responseAsJson = input({
  label: "Response as JSON",
  type: "boolean",
  required: false,
  default: "false",
  comments: "When true, the XML response will be parsed and returned as JSON.",
  clean: util.types.toBool,
});

const commitTransaction = input({
  label: "Commit Transaction",
  type: "boolean",
  required: false,
  default: "false",
  comments:
    "When true, automatically calls BAPI_TRANSACTION_COMMIT after the SOAP request succeeds, using the same HTTP session.",
  clean: util.types.toBool,
});

const waitOnCommit = input({
  label: "Wait on Commit",
  type: "boolean",
  required: false,
  default: "false",
  comments:
    "When true, passes WAIT='X' to BAPI_TRANSACTION_COMMIT, which waits for the update task to complete before returning.",
  clean: util.types.toBool,
});

export const sendSoapRequestInputs = {
  connection,
  endpoint,
  soapAction,
  soapBody,
  responseAsJson,
  commitTransaction,
  waitOnCommit,
};
