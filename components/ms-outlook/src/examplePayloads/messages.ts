import type { Message } from "@microsoft/microsoft-graph-types";
import type { TriggerPayload } from "@prismatic-io/spectral";
import type { ODataAttrs, PaginatedResponse } from "../types";

export const listMessagesExamplePayload = {
  data: {
    "@odata.context":
      "https://graph.microsoft.com/v1.0/$metadata#users('bb8775a4-4d8c-42cf-a1d4-4d58c2bb668f')/messages(sender,subject)",
    value: [
      {
        "@odata.etag": 'W/"CQAAABYAAADHcgC8Hl9tRZ/hc1wEUs1TAAAwR4Hg"',
        id: "AAMkAGUAAAwTW09AAA=",
        subject: "You have late tasks!",
        sender: {
          emailAddress: {
            name: "Microsoft Planner",
            address: "noreply@Planner.Office365.com",
          },
        },
      },
    ],
  } as PaginatedResponse<Message & ODataAttrs>,
};

export const getMessageByIdExamplePayload = {
  data: {
    message: {
      headers: {
        "mime-version": "1.0",
        date: "2022-09-19T20:09:01.000Z",
        "message-id": "<CAJx8Kq3vR2mWm7pN4dX1yZ0aBcD9eFgH@mail.example.com>",
        subject: "Q3 vendor contract renewal",
        from: {
          value: [{ address: "john.doe@example.com", name: "John Doe" }],
          html: '<span class="mp_address_group"><span class="mp_address_name">John Doe</span> &lt;<a href="mailto:john.doe@example.com" class="mp_address_email">john.doe@example.com</a>&gt;</span>',
          text: "John Doe <john.doe@example.com>",
        },
        to: {
          value: [{ address: "jane.smith@example.com", name: "Jane Smith" }],
          html: '<span class="mp_address_group"><span class="mp_address_name">Jane Smith</span> &lt;<a href="mailto:jane.smith@example.com" class="mp_address_email">jane.smith@example.com</a>&gt;</span>',
          text: "Jane Smith <jane.smith@example.com>",
        },
        "content-type": {
          value: "multipart/mixed",
          params: { boundary: "000000000000680fa005e90d488f" },
        },
      } as Record<string, unknown>,
      attachments: [
        {
          filename: "quarterly-report.pdf",
          contentType: "application/pdf",
          size: 20,
          data: Buffer.from("example file content"),
        },
        {
          filename: "image001.png",
          contentType: "image/png",
          size: 13,
          contentId: "<image001.png@01DC4A2B.5E6F7A80>",
          related: true,
          data: Buffer.from("example image"),
        },
      ] as Array<{
        filename?: string;
        contentType: string;
        size: number;
        contentId?: string;
        related?: boolean;
        data: unknown;
      }>,
      text: "Example email body" as string | undefined,
      html: '<div dir="ltr">Example email body<div><br></div></div>\n' as
        | string
        | false
        | undefined,
    },
    rawMessage:
      'MIME-Version: 1.0\r\nDate: Mon, 19 Sep 2022 20:09:01 +0000\r\nMessage-ID: <CAJx8Kq3vR2mWm7pN4dX1yZ0aBcD9eFgH@mail.example.com>\r\nSubject: Q3 vendor contract renewal\r\nFrom: John Doe <john.doe@example.com>\r\nTo: Jane Smith <jane.smith@example.com>\r\nContent-Type: multipart/mixed; boundary="000000000000680fa005e90d488f"\r\n\r\n--000000000000680fa005e90d488f\r\nContent-Type: text/html; charset="UTF-8"\r\n\r\n<div dir="ltr">Example email body<div><br></div></div>\r\n\r\n--000000000000680fa005e90d488f--\r\n',
  },
};

export const sendMessageExamplePayload = { data: null };

export const deleteMessageExamplePayload = {
  data: { success: true, id: "AAMkAGUAAAwTW09AAA=", message: "Message deleted successfully" },
};

export const mailFolderWebhookExamplePayload = {
  payload: {
    headers: {
      "Content-Type": "application/json",
    },
    queryParameters: {},
    rawBody: {
      data: "",
      contentType: "application/json",
    },
    body: {
      data: {
        value: [
          {
            subscriptionId: "7f105c7d-2dc5-4530-97cd-4e7ae6534c07",
            subscriptionExpirationDateTime: "2024-12-31T23:59:59.999Z",
            changeType: "created",
            resource: "me/mailFolders('Inbox')/messages/AAMkAGUAAAwTW09AAA=",
            resourceData: {
              "@odata.type": "#Microsoft.Graph.Message",
              "@odata.id": "me/mailFolders('Inbox')/messages/AAMkAGUAAAwTW09AAA=",
              "@odata.etag": 'W/"CQAAABYAAADHcgC8Hl9tRZ/hc1wEUs1TAAAwR4Hg"',
              id: "AAMkAGUAAAwTW09AAA=",
            },
            clientState: "secretClientValue",
            tenantId: "1717622f-1d94-4d0c-9d74-709fad664b77",
            messageData: listMessagesExamplePayload.data.value[0],
          },
        ],
      },
      contentType: "application/json",
    },
    pathFragment: "",
    webhookUrls: {
      "Mail Message Webhook Flow": "https://hooks.example.com/trigger/EXAMPLE",
    },
    webhookApiKeys: {
      "Mail Message Webhook Flow": ["example-api-key"],
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
  branch: "Notification",
};

export const pollChangesTriggerExamplePayload = {
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
            "@odata.etag": 'W/"CQAAABYAAADHcgC8Hl9tRZ/hc1wEUs1TAAAwR4Hg"',
            id: "AAMkAGUAAAwTW09AAA=",
            subject: "Welcome to the project",
            createdDateTime: "2026-05-20T14:20:00Z",
            lastModifiedDateTime: "2026-05-20T14:20:00Z",
            sender: {
              emailAddress: {
                name: "Samantha Booth",
                address: "samanthab@adatum.onmicrosoft.com",
              },
            },
            from: {
              emailAddress: {
                name: "Samantha Booth",
                address: "samanthab@adatum.onmicrosoft.com",
              },
            },
            toRecipients: [
              {
                emailAddress: {
                  name: "John Doe",
                  address: "john.doe@example.com",
                },
              },
            ],
          },
        ],
        updated: [
          {
            "@odata.etag": 'W/"ZlnW4RIAV06KYYwlrfNZvQAAKGWwbw=="',
            id: "AAMkAGIAAAoZDOFAAA=",
            subject: "You have late tasks!",
            createdDateTime: "2026-05-12T09:00:00Z",
            lastModifiedDateTime: "2026-05-20T13:15:00Z",
            sender: {
              emailAddress: {
                name: "Microsoft Planner",
                address: "noreply@Planner.Office365.com",
              },
            },
            from: {
              emailAddress: {
                name: "Microsoft Planner",
                address: "noreply@Planner.Office365.com",
              },
            },
            toRecipients: [
              {
                emailAddress: {
                  name: "John Doe",
                  address: "john.doe@example.com",
                },
              },
            ],
          },
        ],
      },
      contentType: "application/json",
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
  polledNoChanges: false as boolean | undefined,
};

export const selectMessageExamplePayload = {
  result: [{ label: "You have late tasks!", key: "AAMkAGUAAAwTW09AAA=" }],
};
