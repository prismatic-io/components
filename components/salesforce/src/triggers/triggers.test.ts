import { webhook } from ".";
import { invokeTrigger, defaultTriggerPayload } from "@prismatic-io/spectral/dist/testing";

describe("test salesforce webhook trigger", () => {
  test("verify the return value of salesforce webhook trigger", async () => {
    const payload = defaultTriggerPayload();
    payload.body.data = "<xml><foo>bar</foo></xml>";
    payload.body.contentType = "text/xml; charset=utf-8";

    const expectedData = { xml: { foo: "bar" } };
    const expectedResponse = {
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
    const {
      result: {
        payload: {
          body: { data },
        },
        response,
      },
    } = await invokeTrigger(webhook, {}, payload);
    expect(data).toStrictEqual(expectedData);
    expect(response).toStrictEqual(expectedResponse);
  });
});
