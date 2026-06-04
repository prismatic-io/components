export const pollEventsTriggerPayload = {
  branch: "default",
  payload: {
    headers: {},
    queryParameters: null,
    rawBody: {
      data: null,
      contentType: null,
    },
    body: {
      data: {
        changes: {
          summary: {
            totalChanges: 0,
            created: 0,
            updated: 0,
            deleted: 0,
            syncTokenAvailable: true,
          },
          createdEvents: [],
          updatedEvents: [],
          deletedEvents: [],
          allChanges: [],
        },
        calendarId: "example@group.calendar.google.com",
        syncToken: "exampleSyncToken",
      },
    },
    pathFragment: "",
    webhookUrls: {},
    webhookApiKeys: {},
    invokeUrl: "",
    executionId:
      "RXhhbXBsZUV4ZWN1dGlvblJlc3VsdElkMTIzNDU2Nzg5MDEyMzQ1Njc4OTAxMjM0NTY=",
    customer: {
      id: "testCustomerId",
      name: "Test Customer",
      externalId: "testCustomerExternalId",
    },
    instance: {
      id: "SW5zdGFuY2U6OGRiNWQ4NmYtMjBkYS00MzI5LWI2MmMtM2ZhOWFiNDUwYjUw",
      name: "Google Calendar - Polling Events",
    },
    user: {
      id: "testUserId",
      email: "testUserEmail@example.com",
      name: "Test User",
      externalId: "testUserExternalId",
    },
    integration: {
      id: "SW50ZWdyYXRpb246ZDk2YzcxNmItODFmMS00NmQ4LTk0NzItNDU3NDZmMzg2Mjgw",
      name: "Google Calendar - DEV",
      versionSequenceId: "testIntegrationVersionSequenceId",
      externalVersion: "",
    },
    flow: {
      id: "SW50ZWdyYXRpb25GbG93OmM4Y2IzY2UwLTFjYTUtNDVhZC04Yjc1LWNmNDc4YWE1Y2RlYQ==",
      name: "Poll Events",
    },
    startedAt: "2026-01-07 14:22:38.313677+00",
    globalDebug: false,
  },
  polledNoChanges: false,
};

export const calendarChangeEventsPayload = {
  branch: "Push Notifications",
  payload: {
    headers: {
      Accept: "*/*",
      "Accept-Encoding": "gzip, deflate, br",
      Host: "hooks.example.com",
      "User-Agent":
        "APIs-Google; (+https://developers.google.com/webmasters/APIs-Google.html)",
      "X-Amz-Cf-Id":
        "ExampleCloudFrontId123456789012345678901234567890123456==",
      "X-Amzn-Trace-Id": "Root=1-12345678-abcdef0123456789abcdef01",
      "X-Forwarded-For": "192.0.2.1, 198.51.100.1",
      "X-Goog-Changed": "content,properties",
      "X-Goog-Channel-Expiration": "Wed, 07 Jan 2026 07:10:37 GMT",
      "X-Goog-Channel-ID": "12345678-abcd-1234-abcd-123456789012",
      "X-Goog-Message-Number": "123456",
      "X-Goog-Resource-ID": "ExampleResourceId1234567890",
      "X-Goog-Resource-State": "update",
      "X-Goog-Resource-URI":
        "https://www.googleapis.com/calendar/v3/calendars/primary/events?alt=json",
    },
    queryParameters: null,
    rawBody: {
      data: null,
      contentType: "application/octet-stream",
    },
    body: {
      data: {
        calendar: {
          id: "primary",
          summary: "Example Calendar",
          description: "This is an example calendar",
          timeZone: "America/Chicago",
        },
        events: {
          totalEvents: 2,
          recentEvents: [
            {
              id: "example_event_1",
              summary: "Team Meeting",
              start: {
                dateTime: "2026-01-07T10:00:00-06:00",
                timeZone: "America/Chicago",
              },
              end: {
                dateTime: "2026-01-07T11:00:00-06:00",
                timeZone: "America/Chicago",
              },
              updated: "2026-01-07T08:30:00.000Z",
            },
            {
              id: "example_event_2",
              summary: "Lunch Break",
              start: {
                dateTime: "2026-01-07T12:00:00-06:00",
                timeZone: "America/Chicago",
              },
              end: {
                dateTime: "2026-01-07T13:00:00-06:00",
                timeZone: "America/Chicago",
              },
              updated: "2026-01-07T08:15:00.000Z",
            },
          ],
        },
        notification: {
          resourceState: "update",
          changedFields: "content,properties",
          resourceId: "ExampleResourceId1234567890",
          timestamp: "2026-01-07T14:26:35.618Z",
        },
      },
      contentType: "application/octet-stream",
    },
    pathFragment: "",
    webhookUrls: {
      "Calendar Change Events":
        "https://hooks.example.com/trigger/RXhhbXBsZUluc3RhbmNlRmxvd0NvbmZpZ0lkMTIzNDU2Nzg5MDEyMzQ1Njc4OTA=",
    },
    webhookApiKeys: {
      "Calendar Change Events": [],
    },
    invokeUrl:
      "https://hooks.example.com/trigger/RXhhbXBsZUluc3RhbmNlRmxvd0NvbmZpZ0lkMTIzNDU2Nzg5MDEyMzQ1Njc4OTA=",
    executionId:
      "RXhhbXBsZUV4ZWN1dGlvblJlc3VsdElkMTIzNDU2Nzg5MDEyMzQ1Njc4OTAxMjM0NTY=",
    customer: {
      id: "testCustomerId",
      name: "Test Customer",
      externalId: "testCustomerExternalId",
    },
    instance: {
      id: "SW5zdGFuY2U6OGRiNWQ4NmYtMjBkYS00MzI5LWI2MmMtM2ZhOWFiNDUwYjUw",
      name: "Google Calendar - DEV - Calendar Change Events",
    },
    user: {
      id: "testUserId",
      email: "testUserEmail@example.com",
      name: "Test User",
      externalId: "testUserExternalId",
    },
    integration: {
      id: "SW50ZWdyYXRpb246ZDk2YzcxNmItODFmMS00NmQ4LTk0NzItNDU3NDZmMzg2Mjgw",
      name: "Google Calendar - DEV",
      versionSequenceId: "testIntegrationVersionSequenceId",
      externalVersion: "",
    },
    flow: {
      id: "SW50ZWdyYXRpb25GbG93OmM4Y2IzY2UwLTFjYTUtNDVhZC04Yjc1LWNmNDc4YWE1Y2RlYQ==",
      name: "Calendar Change Events",
    },
    startedAt: "2026-01-07 14:22:38.313677+00",
    globalDebug: false,
  },
  response: { statusCode: 200, contentType: "application/json" },
};
