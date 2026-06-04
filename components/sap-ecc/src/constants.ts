export const RFC_FUNCTIONS = {
  READ_TABLE: "RFC_READ_TABLE",
  TRANSACTION_COMMIT: "BAPI_TRANSACTION_COMMIT",
} as const;

export const ENDPOINTS = {
  SOAP_RFC: "/sap/bc/soap/rfc",
  IDOC_INBOUND: "/sap/bc/idoc_xml/inbound",
} as const;

export const SOAP_URN = "urn:sap-com:document:sap:rfc:functions";

export const DEFAULT_DELIMITER = "|";

export const DEFAULT_DOCNUM = "0000000000000000";

export const EDIDC_FIELDS = [
  "DOCNUM",
  "STATUS",
  "MESTYP",
  "IDOCTP",
  "CREDAT",
  "CRETIM",
  "DIRECT",
];
