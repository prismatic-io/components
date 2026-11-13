import type { Event } from "@microsoft/microsoft-graph-types";
import type { TriggerPayload } from "@prismatic-io/spectral";
import type { ODataAttrs, PaginatedResponse } from "../types";
import { getCalendarEventExamplePayload } from "./calendars";

export const listEventsExamplePayload = {
  data: {
    "@odata.context":
      "https://graph.microsoft.com/v1.0/$metadata#users('cd209b0b-3f83-4c35-82d2-d88a61820480')/events(subject,body,bodyPreview,organizer,attendees,start,end,location)",
    value: [
      {
        "@odata.etag": 'W/"ZlnW4RIAV06KYYwlrfNZvQAAKGWwbw=="',
        id: "AAMkAGIAAAoZDOFAAA=",
        subject: "Orientation ",
        bodyPreview: "Please join us for the team orientation. Bring any questions you may have.",
        body: {
          contentType: "html",
          content:
            "<html><head></head><body><p>Please join us for the team orientation. Bring any questions you may have.</p></body></html>",
        },
        start: {
          dateTime: "2017-04-21T10:00:00.0000000",
          timeZone: "Pacific Standard Time",
        },
        end: {
          dateTime: "2017-04-21T12:00:00.0000000",
          timeZone: "Pacific Standard Time",
        },
        location: {
          displayName: "Assembly Hall",
          locationType: "default",
          uniqueId: "Assembly Hall",
          uniqueIdType: "private",
        },
        locations: [
          {
            displayName: "Assembly Hall",
            locationType: "default",
            uniqueIdType: "unknown",
          },
        ],
        attendees: [
          {
            type: "required",
            status: {
              response: "none",
              time: "0001-01-01T00:00:00Z",
            },
            emailAddress: {
              name: "John Doe",
              address: "john.doe@example.com",
            },
          },
          {
            type: "required",
            status: {
              response: "none",
              time: "0001-01-01T00:00:00Z",
            },
            emailAddress: {
              name: "Jane Smith",
              address: "jane.smith@example.com",
            },
          },
        ],
        organizer: {
          emailAddress: {
            name: "Samantha Booth",
            address: "samanthab@a830edad905084922E17020313.onmicrosoft.com",
          },
        },
      },
    ],
  } as PaginatedResponse<Event & ODataAttrs>,
};

export const createEventExamplePayload = {
  data: {
    id: "AAMkAGViNDU7zAAAAA7zAAAZe6CkAAA=",
    subject: "Let's go for lunch",
    body: {
      contentType: "html",
      content: "Does noon work for you?",
    },
    start: {
      dateTime: "2017-04-15T12:00:00",
      timeZone: "Pacific Standard Time",
    },
    end: {
      dateTime: "2017-04-15T14:00:00",
      timeZone: "Pacific Standard Time",
    },
    location: {
      displayName: "Conference Room A",
    },
    attendees: [
      {
        emailAddress: {
          address: "john.doe@example.com",
          name: "John Doe",
        },
        type: "required",
      },
    ],
    allowNewTimeProposals: true,
    transactionId: "7E163156-7762-4BEB-A1C6-729EA81755A7",
  } as Event,
};

export const updateEventExamplePayload = {
  data: {
    id: "AAMkAGViNDU7zAAAAA7zAAAZe6CkAAA=",
    subject: "Let's go for lunch",
    body: {
      contentType: "html",
      content: "Does noon work for you?",
    },
    start: {
      dateTime: "2017-04-15T12:00:00",
      timeZone: "Pacific Standard Time",
    },
    end: {
      dateTime: "2017-04-15T14:00:00",
      timeZone: "Pacific Standard Time",
    },
    location: {
      displayName: "Conference Room A",
    },
    attendees: [
      {
        emailAddress: {
          address: "john.doe@example.com",
          name: "John Doe",
        },
        type: "required",
      },
    ],
    allowNewTimeProposals: true,
    transactionId: "7E163156-7762-4BEB-A1C6-729EA81755A7",
  } as Event,
};

export const deleteEventExamplePayload = {
  data: { success: true, id: "AAMkAGIAAAoZDOFAAA=", message: "Event deleted successfully" },
};

export const cancelEventExamplePayload = {
  data: { success: true, id: "AAMkAGIAAAoZDOFAAA=", message: "Event cancelled successfully" },
};

export const webhookLifecycleExamplePayload = {
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
            subscriptionId: "e9d5b726-4478-4412-bfba-268530484566",
            subscriptionExpirationDateTime: "2024-12-31T23:59:59.999Z",
            changeType: "updated",
            resource: "me/events/AAMkAGIAAAoZDOFAAA=",
            resourceData: {
              "@odata.type": "#Microsoft.Graph.Event",
              "@odata.id": "me/events/AAMkAGIAAAoZDOFAAA=",
              "@odata.etag": 'W/"ZlnW4RIAV06KYYwlrfNZvQAAKGWwbw=="',
              id: "AAMkAGIAAAoZDOFAAA=",
            },
            clientState: "secretClientValue",
            tenantId: "1717622f-1d94-4d0c-9d74-709fad664b77",
            eventData: getCalendarEventExamplePayload.data,
          },
        ],
      },
      contentType: "application/json",
    },
    pathFragment: "",
    webhookUrls: {
      "Calendar Event Webhook Flow": "https://hooks.example.com/trigger/EXAMPLE",
    },
    webhookApiKeys: {
      "Calendar Event Webhook Flow": ["example-api-key"],
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

export const selectEventExamplePayload = {
  result: [{ label: "Orientation ", key: "AAMkAGIAAAoZDOFAAA=" }],
};
