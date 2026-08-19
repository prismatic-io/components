import type { HttpResponse } from "@prismatic-io/spectral/dist/types";
export const DEFAULT_SF_VERSION = "63.0";
export const DEFAULT_MAX_RECORDS = 20000;
export const MAX_BATCHED_PAGE_SIZE = 1000;
export const REQUIRED_POLL_FIELDS = ["Id", "CreatedDate", "LastModifiedDate"];
export const LONG_TEXT_CLAMP_THRESHOLD = 2;
export const SHORT_TEXT_AREA_MAX_LENGTH = 255;
export const SF_DELETED_WINDOW_DAYS = 15;
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
