import {
  type HttpResponse,
  type TriggerPayload,
  trigger,
  util,
} from "@prismatic-io/spectral";
import { webhookExamplePayload } from "../examplePayloads";
import { webhookInputs } from "../inputs";
import { parseXml } from "../util/xml";

export const webhook = trigger({
  display: {
    label: "Webhook",
    description:
      "Receive and validate webhook requests from Salesforce for manually configured webhook subscriptions.",
  },
  perform: async (_context, payload) => {
    const response: HttpResponse = {
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

    const finalPayload: TriggerPayload = { ...payload };

    finalPayload.body.data = parseXml(
      util.types.toString(finalPayload.body.data),
    );
    finalPayload.body.contentType = undefined;

    return Promise.resolve({
      payload: finalPayload,
      response,
    });
  },
  inputs: webhookInputs,
  synchronousResponseSupport: "invalid",
  scheduleSupport: "invalid",
  examplePayload: webhookExamplePayload,
});
