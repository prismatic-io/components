import { TriggerPayload } from "@prismatic-io/spectral";
import { webhook } from "./triggers/webhook";
import { invokeTrigger } from "@prismatic-io/spectral/dist/testing";

describe("test Xero webhook trigger", () => {
  test("returns 401 upon incorrect signature", async () => {
    const myPayload: TriggerPayload = {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
      },
      queryParameters: {
        "x-xero-signature": "rarSvEji8ph/12JQgy7V4prXpMDTZ66K45wRaOQRSk0=",
      },
      rawBody: {
        data: Buffer.from("Helo World"),
        contentType: "text/plain; charset=utf-8",
      },
      body: { data: null, contentType: "text/plain; charset=utf-8" },
      webhookUrls: {
        "Flow 1": "Example Flow URL",
      },
      webhookApiKeys: {
        "Flow 1": ["abc-123"],
      },
      customer: { id: "", name: "Spears-Miller", externalId: "" },
      invokeUrl: "",
      executionId: "",
      instance: {
        id: "",
        name: "",
      },
      user: {
        id: "",
        email: "",
        name: "",
        externalId: "",
      },
      pathFragment: "",
      integration: {
        id: "",
        name: "",
        versionSequenceId: "",
        externalVersion: "",
      },
      flow: {
        id: "",
        name: "",
      },
      startedAt: "",
      globalDebug: false,
    };

    const { result } = await invokeTrigger(webhook, {}, myPayload, {
      webhookKey: "notMyKey",
    });
    expect(result.response?.statusCode).toBe(401);
  });
});
