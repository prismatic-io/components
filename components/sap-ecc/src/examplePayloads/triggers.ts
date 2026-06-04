import type { TriggerPayload } from "@prismatic-io/spectral";

export const pollIdocExamplePayload: { payload: TriggerPayload } = {
  payload: {
    headers: {},
    queryParameters: {},
    pathFragment: "",
    webhookUrls: {},
    webhookApiKeys: {},
    invokeUrl: "",
    executionId: "",
    integration: {
      id: "",
      name: "",
      versionSequenceId: "0",
      externalVersion: "",
    },
    flow: {
      id: "",
      name: "",
    },
    startedAt: "",
    globalDebug: false,
    customer: {
      id: "",
      externalId: "",
      name: "",
    },
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
    body: {
      data: {
        records: [
          {
            idocNumber: "0000000000000025",
            status: "53",
            messageType: "ORDERS",
            idocType: "ORDERS05",
            createdDate: "20260311",
            createdTime: "104530",
            direction: "2",
          },
          {
            idocNumber: "0000000000000026",
            status: "53",
            messageType: "ORDERS",
            idocType: "ORDERS05",
            createdDate: "20260311",
            createdTime: "104535",
            direction: "2",
          },
        ],
        recordCount: 2,
        lastDocnum: "0000000000000026",
      },
    },
    rawBody: {
      data: "<data (2 bytes)>",
    },
  },
};
