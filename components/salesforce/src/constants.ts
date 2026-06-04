import type { HttpResponse } from "@prismatic-io/spectral/dist/types";

export const DEFAULT_SF_VERSION = "63.0";
export const DEFAULT_MAX_RECORDS = 20000;


export const WEBHOOK_SFDC_RESPONSE: HttpResponse = {
  statusCode: 200,
  contentType: "text/xml; charset=utf-8",
  body: `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
  <soapenv:Body>
    <notificationsResponse xmlns="http://soap.sforce.com/2005/09/outbound">
      <Ack>true</Ack>
    </notificationsResponse>
  </soapenv:Body>
  </soapenv:Envelope>`,
};
