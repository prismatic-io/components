export const getActivityExamplePayload = {
  data: {
    activities: [
      {
        primaryActionDetail: {
          create: {
            upload: {},
          },
        },
        actors: [
          {
            user: {
              knownUser: {
                personName: "people/114118080512406438242",
                isCurrentUser: true,
              },
            },
          },
        ],
        actions: [
          {
            detail: {
              create: {
                upload: {},
              },
            },
          },
        ],
        targets: [
          {
            driveItem: {
              name: "items/1fs5xXnjTgQP6-p9LMXYX3_i9hjXl2Ump",
              title: "untitled text 3.csv",
              file: {},
              mimeType: "text/csv",
              owner: {
                user: {
                  knownUser: {
                    personName: "people/114118080512406438242",
                    isCurrentUser: true,
                  },
                },
              },
              driveFile: {},
            },
          },
        ],
        timestamp: "2025-03-11T15:58:37.276Z",
      },
    ],
    nextPageToken:
      "CoUBADFn3tFqHUj7yCuV1klvj0yytkQy7+pfLdrj1eepGfjkD3FB5tGKr3KfLViTU1NXF2EPzJADxALt8O7M1rC98LjHnv9YG6Sl5sxU8F7UOYI1nzzpXhFNaxmAnNmlzBbdRHKt33n2KeX/wKd8uvLETNydZ/9SEYYRlB2aIqzTf41Cp2CUvxIMEgppdGVtcy9yb290GoUBADFn3tFN3fZknT3aMUZoAhEoqOy0S2eimkjEsCV1+t01uERxyQKMsgS5Zn9cSJOzDIj2BR7jkbfIQeDbBLgMhjrtaVaAMppVhBOdQKtn9+u5CKE1JNIuVXREsrEago3Bbd77pDvQJNYTIeW0P+NYbPPP7oRCWTbBZ9soopmJnkyjUX/m5A==",
  },
};

export const LIST_CHANGES_EXAMPLE_PAYLOAD = {
  kind: "drive#changeList",
  newStartPageToken: "247040",
  changes: [
    {
      kind: "drive#change",
      removed: false,
      file: {
        kind: "drive#file",
        mimeType: "image/png",
        id: "14FSE_ESVGWta4XlzWGHVm0VultNS-1uO",
        name: "example.png",
      },
      fileId: "14FSE_ESVGWta4XlzWGHVm0VultNS-1uO",
      time: "2022-09-20T21:36:23.687Z",
      type: "file",
      changeType: "file",
    },
  ],
};

export const BASE_EXAMPLE_PAYLOAD = {
  response: { statusCode: 200, contentType: "application/json" },
  payload: {
    headers: {
      Accept: "*/*",
      "Accept-Encoding": "gzip, deflate, br",
      Host: "hooks.example.io",
      "User-Agent": "APIs-Google; (+https://developers.google.com/webmasters/APIs-Google.html)",
      "X-Amz-Cf-Id": "_K9KZtNN78sy1aygl3nJuQ4OoMh65STAsLFsPGENcnm_l68C112345==",
      "X-Amzn-Trace-Id": "Root=1-64931762-5665c8324c471b204f212345",
      "X-Goog-Channel-Expiration": "Wed, 21 Jun 2023 16:28:01 GMT",
      "X-Goog-Channel-ID": "7f0419cf-5477-4bd5-bc86-2aa36af12345",
      "X-Goog-Message-Number": "96035",
      "X-Goog-Resource-ID": "jkkJZYhd8PPV6-Xto6QIo112345",
      "X-Goog-Resource-State": "change",
      "X-Goog-Resource-URI":
        "https://www.googleapis.com/drive/v3/changes?alt=json&pageToken=430&supportsAllDrives=true",
    },
    queryParameters: null,
    rawBody: {
      data: null,
      contentType: "application/octet-stream",
    },
    body: {
      data: null,
      contentType: "application/octet-stream",
    },
    pathFragment: "",
    webhookUrls: {
      "Flow 1": "https://hooks.example.io/trigger/WEBHOOK_ID",
    },
    webhookApiKeys: {
      "Flow 1": ["sample-api-key"],
    },
    invokeUrl: "https://hooks.example.io/trigger/WEBHOOK_ID",
    executionId: "SW5zdGFuY2VFeGVjdXRpb25SZXN1bHQ6MGRlZjk2ZjYtYzhhOS00MDgzLWJlOTUtZmIwZDMzNDQ12345",
    customer: {
      id: "testCustomerId",
      name: "Test Customer",
      externalId: "testCustomerExternalId",
    },
    instance: {
      id: "testInstanceId",
      name: "Test Instance",
    },
    user: {
      id: "testUserId",
      email: "testUserEmail@example.com",
      name: "Test User",
      externalId: "testUserExternalId",
    },
    integration: {
      id: "testIntegrationId",
      name: "Test Integration",
      versionSequenceId: "testVersionSequenceId",
      externalVersion: "testExternalVersion",
    },
    flow: {
      id: "testFlowId",
      name: "Test Flow Name",
    },
    startedAt: "yyyy-mm-dd",
    globalDebug: false,
  },
};

export const driveActivityPollingTriggerExamplePayload = {
  ...BASE_EXAMPLE_PAYLOAD,
  payload: {
    ...BASE_EXAMPLE_PAYLOAD.payload,
    rawBody: {
      data: null,
    },
    body: {
      data: [...getActivityExamplePayload.data.activities],
    },
  },
  polledNoChanges: false,
};

export const pollChangesTriggerExamplePayload = {
  ...BASE_EXAMPLE_PAYLOAD,
  crossFlowState: {
    "google-drive-list-changes-page-token:exampleStableFlowId:exampleStepId": "testCursor",
  },
  payload: {
    ...BASE_EXAMPLE_PAYLOAD.payload,
    rawBody: {
      data: null,
    },
    body: {
      data: LIST_CHANGES_EXAMPLE_PAYLOAD,
    },
  },
  polledNoChanges: false,
};
