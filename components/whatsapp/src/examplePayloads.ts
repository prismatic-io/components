import type { TriggerPayload } from "@prismatic-io/spectral";

export const sendMessageExamplePayload = {
  data: {
    messaging_product: "whatsapp",
    contacts: [
      {
        input: "16505555555",
        wa_id: "16505555555",
      },
    ],
    messages: [
      {
        id: "wamid.HBgLMTY1MDUwNzY1MjAVAgARGBI5QTNDQTVCM0Q0Q0Q2RTY3RTcA",
        message_status: "accepted",
      },
    ],
  },
};

export const requestVerificationCodeExamplePayload = {
  data: {
    success: true,
  },
};

export const registerPhoneNumberExamplePayload = {
  data: {
    success: true,
  },
};

export const uploadMediaExamplePayload = {
  data: {
    id: "1376223850496189",
  },
};

export const getMediaExamplePayload = {
  data: {
    messaging_product: "whatsapp",
    url: "https://lookaside.fbsbx.com/whatsapp_business/attachments/?mid=1376223850496189&ext=1718312400&hash=ATt9Xc3K2pQ8mZ1nLrV",
    mime_type: "image/jpeg",
    sha256: "e9b1f4c2a7d83e5f0c6b1a9d4e7f2c8b5a3d6e9f1c4b7a0d3e6f9c2b5a8d1e4f",
    file_size: 84512,
    id: "1376223850496189",
  },
};

export const deleteMediaExamplePayload = {
  data: {
    success: true,
  },
};

export const getMediafromURLExamplePayload = {
  data: "/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAABAAEDASIA",
};

export const webhookExamplePayload: {
  payload: TriggerPayload;
  branch: string;
} = {
  branch: "Event Notification",
  payload: {
    headers: {
      "content-type": "application/json",
      "x-hub-signature-256":
        "sha256=7f3b2c1d9e0a4b5c6d7e8f90a1b2c3d4e5f60718293a4b5c6d7e8f90a1b2c3d4",
    },
    queryParameters: {},
    rawBody: { data: null },
    body: {
      data: {
        object: "whatsapp_business_account",
        entry: [
          {
            id: "102290129340398",
            changes: [
              {
                value: {
                  messaging_product: "whatsapp",
                  metadata: {
                    display_phone_number: "15550783881",
                    phone_number_id: "106540352242922",
                  },
                  contacts: [
                    {
                      profile: {
                        name: "Jane Smith",
                      },
                      wa_id: "16505555555",
                    },
                  ],
                  messages: [
                    {
                      from: "16505555555",
                      id: "wamid.HBgLMTY1MDUwNzY1MjAVAgASGBQzQTRCNUM2RDdFOEY5MEExQjJDMwA=",
                      timestamp: "1718312400",
                      text: {
                        body: "Hello, this is a test message",
                      },
                      type: "text",
                    },
                  ],
                },
                field: "messages",
              },
            ],
          },
        ],
      },
    },
    pathFragment: "",
    webhookUrls: {},
    webhookApiKeys: {},
    invokeUrl: "",
    executionId: "RXhhbXBsZUV4ZWN1dGlvblJlc3VsdElk",
    customer: {
      id: "testCustomerId",
      name: "Test Customer",
      externalId: "testExternalId",
    },
    instance: { id: "testInstanceId", name: "Test Instance" },
    user: {
      id: "testUserId",
      email: "user@example.com",
      name: "Test User",
      externalId: "testUserExternalId",
    },
    integration: {
      id: "testIntegrationId",
      name: "Test Integration",
      versionSequenceId: "1",
      externalVersion: "",
    },
    flow: { id: "testFlowId", name: "Test Flow", stableId: "testFlowStableId" },
    startedAt: "2024-01-15T00:00:00.000Z",
    globalDebug: false,
  },
};
