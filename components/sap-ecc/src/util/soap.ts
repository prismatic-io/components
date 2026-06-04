import type { AxiosInstance } from "axios";
import { RFC_FUNCTIONS, SOAP_URN } from "../constants";
import { getResponseBody, parseAndCheckFault } from "./xml";


const normalizeXml = (xml: string): string =>
  xml.replace(
    /<([^>]*\n[^>]*)>/g,
    (_, inner) => `<${(inner as string).replace(/\s+/g, " ").trim()}>`,
  );

export const buildSoapEnvelope = (
  functionName: string,
  params: string,
): string =>
  normalizeXml(`<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="${SOAP_URN}">
  <soap:Body>
    <urn:${functionName}>
      ${params}
    </urn:${functionName}>
  </soap:Body>  
</soap:Envelope>`);

export const buildSoapAction = (functionName: string): string =>
  `${SOAP_URN}:${functionName}`;

export const performCommit = async (
  client: AxiosInstance,
  endpoint: string,
  waitOnCommit: boolean,
) => {
  const params = waitOnCommit ? "<WAIT>X</WAIT>" : "";
  const soapBody = buildSoapEnvelope(RFC_FUNCTIONS.TRANSACTION_COMMIT, params);
  const { data } = await client.post(endpoint, soapBody, {
    headers: { SOAPAction: buildSoapAction(RFC_FUNCTIONS.TRANSACTION_COMMIT) },
  });
  const parsed = await parseAndCheckFault(data);
  return getResponseBody(parsed);
};
