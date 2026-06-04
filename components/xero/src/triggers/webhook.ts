import { HttpResponse, trigger, util } from "@prismatic-io/spectral";
import crypto, { BinaryLike } from "crypto";

const validateSignature = (
  signature: string,
  payload: BinaryLike,
  webhookKey: unknown,
): boolean => {
  const hash = crypto
    .createHmac("sha256", util.types.toString(webhookKey))
    .update(payload)
    .digest("base64");

  return signature === hash;
};

export const webhook = trigger({
  display: {
    label: "Webhook",
    description:
      "Receive and validate webhook requests from Xero for webhooks you configure.",
  },
  perform: async (context, payload, params) => {
    if (context.isSimulatedTestExecution) {
      return Promise.resolve({
        payload,
        response: {
          statusCode: 200,
          contentType: "text/plain; charset=utf-8",
        },
      });
    }
    const incomingSignature = payload.headers["x-xero-signature"];
    const incomingPayload = payload.rawBody.data as BinaryLike;

    const response: HttpResponse = {
      statusCode: 200,
      contentType: "text/plain; charset=utf-8",
    };
    const error: HttpResponse = {
      contentType: "text/plain; charset=utf-8",
      statusCode: 401,
    };

    const isValid = validateSignature(
      incomingSignature,
      incomingPayload,
      params.webhookKey,
    );

    if (isValid) {
      return Promise.resolve({
        payload,
        response,
      });
    } else {
      return Promise.resolve({
        payload,
        response: error,
      });
    }
  },
  inputs: {
    webhookKey: {
      label: "Webhook Key",
      type: "string",
      comments: "Provide the webhook key that was created upon subscription.",
      example: "up/tz7l0Q9FM6Wyq3Rli0bqJrfqmtl4idswda/LQ==",
    },
  },
  synchronousResponseSupport: "invalid",
  scheduleSupport: "invalid",
  examplePayload: {
    response: {
      contentType: "application/json; charset=UTF-8",
      statusCode: 200,
    },
    payload: {
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        Host: "hooks.example.com",
        "x-xero-signature": "ubUJMsDNGuunnCBc/n1g0wc2SpjplAb",
      },
      body: {
        data: {
          events: null,
          firstEventSequence: 0,
          lastEventSequence: 0,
          entropy: "FMLHZNKCVK",
        },
        contentType: "application/json; charset=UTF-8",
      },
      rawBody: { data: Buffer.from("Example") },
      queryParameters: {},
      webhookUrls: {
        "Flow 1":
          "https://hooks.example.com/trigger/EXAMPLEGbG93Q29uZmlnOmRlNmNmNDMyLTliNWMtN0005NDMxLTRmYzA4ZjViODgxOA==",
      },
      webhookApiKeys: {
        "Flow 1": ["abc-123"],
      },
      customer: {
        externalId: "customer-example-external-id",
        name: "John Doe",
        id: "",
      },
      pathFragment: "",
      invokeUrl: "",
      executionId: "",
      instance: {
        id: "",
        name: "",
      },
      user: {
        id: "",
        name: "",
        email: "",
        externalId: "",
      },
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
    },
  },
});
