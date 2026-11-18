import type { TriggerPayload } from "@prismatic-io/spectral";

export * from "./company";
export * from "./components";
export * from "./misc";
export * from "./orders";
export * from "./users";

export const pollChangesExamplePayload = {
  payload: {
    headers: {},
    queryParameters: {},
    rawBody: {
      data: "",
      contentType: "application/json",
    },
    body: {
      data: {
        created: [
          {
            id: "666c5a8828e82100081595b0",
            name: "High-Performance IC",
            created: "2024-06-14T14:58:16.638Z",
            lastModified: "2024-06-14T14:58:16.638Z",
          },
        ],
        updated: [
          {
            id: "666c5a9528e821000815990e",
            name: "Precision Resistor 10k",
            created: "2024-06-10T09:12:04.118Z",
            lastModified: "2024-06-14T14:58:18.069Z",
          },
        ],
      },
    },
    pathFragment: "",
    webhookUrls: {
      "Polling Flow": "https://hooks.example.com/trigger/EXAMPLE",
    },
    webhookApiKeys: {
      "Polling Flow": ["example-api-key"],
    },
    invokeUrl: "https://hooks.example.com/trigger/EXAMPLE",
    executionId: "SW5zdGFuY2VFeGVjdXRpb246MTIzNDU=",
    customer: {
      id: "Q3VzdG9tZXI6MTIzNDU=",
      externalId: "example-customer-external-id",
      name: "Example Customer",
    },
    instance: {
      id: "SW5zdGFuY2U6MTIzNDU=",
      name: "Example Instance",
    },
    user: {
      id: "VXNlcjoxMjM0NQ==",
      externalId: "example-user-external-id",
      name: "Example User",
      email: "user@example.com",
    },
  } as unknown as TriggerPayload,
  polledNoChanges: false,
};
