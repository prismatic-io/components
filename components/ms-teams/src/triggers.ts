import { HttpResponse, input, trigger, util } from "@prismatic-io/spectral";
import { responseType } from "@prismatic-io/spectral/dist/clients/http/inputs";
import crypto from "node:crypto";

export const webhook = trigger({
  display: {
    label: "Webhook",
    description:
      "Receive and validate webhook requests from Microsoft Teams for webhooks you configure.",
  },
  perform: async (context, payload, params) => {
    const signingSecrets = Array.isArray(params.signingSecrets)
      ? params.signingSecrets.map((secret) => util.types.toString(secret))
      : [util.types.toString(params.signingSecrets)];

    const triggerResponse = JSON.parse(
      params.triggerResponse
        ? util.types.toString(params.triggerResponse)
        : "{}",
    );
    const failedResponse = params.failedResponse
      ? JSON.parse(util.types.toString(params.failedResponse))
      : undefined;

    const requestBody = util.types.toString(payload.rawBody.data);

    
    const verified = signingSecrets.find((secret) => {
      const signature = crypto
        .createHmac("sha256", Buffer.from(secret, "base64"))
        .update(requestBody, "utf-8")
        .digest("base64");
      const match = `HMAC ${signature}` === payload.headers.Authorization;

      if (params.debugVerification) {
        console.log("Authorization Header: ", payload.headers.Authorization);
        console.log("Calculated Signature: ", `HMAC ${signature}`);
        console.log("HMAC Signatures Matched: ", match);
      }
      return match;
    });
    if (params.debugVerification) {
      console.log("Signature Verified: ", verified ? "True" : "False");
    }
    const responseBody = verified
      ? JSON.stringify(triggerResponse)
      : JSON.stringify(failedResponse ? failedResponse : triggerResponse);

    return Promise.resolve({
      payload,
      response: {
        statusCode: 200,
        contentType: "application/json",
        body: responseBody,
      },
    });
  },
  inputs: {
    signingSecrets: input({
      label: "Signing Secrets",
      type: "data",
      comments:
        "Can be a single secret or a list of secrets for HMAC verification",
      required: true,
    }),
    triggerResponse: input({
      label: "Trigger Response",
      type: "code",
      language: "json",
      required: false,
      default: `
      {
        "text": "Request Received..."
      }
      `,
    }),
    failedResponse: input({
      label: "Failed Verification Trigger Response",
      type: "code",
      language: "json",
      required: false,
      default: `
      {
        "text": "Request Not Authorized..."
      }
      `,
    }),
    debugVerification: input({
      label: "Debug HMAC Verification",
      type: "boolean",
      default: "false",
    }),
  },
  synchronousResponseSupport: "valid",
  scheduleSupport: "invalid",
  examplePayload: {
    response: {
      statusCode: 200,
      contentType: "application/json",
      body: "{ 'text': 'test' }",
    },
    payload: {
      user: {
        id: "123",
        name: "John Doe",
        email: "john.doe@example.com",
        externalId: "123",
      },
      integration: {
        id: "123",
        name: "Example Integration",
        versionSequenceId: "123",
        externalVersion: "123",
      },
      flow: {
        id: "123",
        name: "Example Flow",
      },
      startedAt: "2021-01-01T00:00:00Z",
      globalDebug: false,
      executionId: "123123123",
      instance: {
        id: "123",
        name: "Example Instance",
      },
      invokeUrl: "https://hooks.example.com/trigger/asdfasdfasdf",
      pathFragment: "",
      headers: {
        accept: "*/*",
        "Content-Type": "application/json",
        Host: "hooks.example.com",
      },
      body: { data: {} },
      rawBody: { data: Buffer.from("Example") },
      queryParameters: null,
      webhookUrls: {
        "Flow 1":
          "https://hooks.example.com/trigger/EXAMPLEGbG93Q29uZmlnOmRlNmNmNDMyLTliNWMtN0005NDMxLTRmYzA4ZjViODgxOA==",
      },
      webhookApiKeys: {
        "Flow 1": ["abc-123"],
      },
      customer: {
        id: "123",
        externalId: "customer-example-external-id",
        name: "John Doe",
      },
    },
  },
});

export default { webhook };
