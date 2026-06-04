export const selectColumnResponse = [
  {
    key: "Column 1",
    label: "Column 1",
  },
  {
    key: "Column 2",
    label: "Column 2",
  },
];

export const selectWorksheetResponse = [
  {
    key: "1",
    label: "Sheet1",
  },
];

export const selectColumnsResponse = [
  { object: { key: "id", label: "id" } },
  { object: { key: "equipmentId", label: "equipmentId" } },
];

export const getColumnResponse = ["Column 1", "Column 2"];

export const getRowResponse = [
  { "Column 1": "a", "Column 2": "b" },
  { "Column 1": "c", "Column 2": "d" },
];

export const listSheetsResponse = [
  {
    spreadsheetId: "1K__zH9e2bd",
    title: "Sheet1",
    worksheetId: "od6",
  },
];

export const spreadsheetChangeEventsPayload = {
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
        "https://www.googleapis.com/drive/v3/files/ExampleSpreadsheetId1234567890?alt=json&null",
    },
    queryParameters: null,
    rawBody: {
      data: null,
      contentType: "application/octet-stream",
    },
    body: {
      data: {
        spreadsheet: {
          title: "Example Spreadsheet",
          spreadsheetId: "1ABC123DEF456GHI789JKL012MNO345PQR678STU901",
          worksheets: [
            {
              title: "Sheet1",
              sheetId: 0,
              rowCount: 1000,
              columnCount: 26,
            },
          ],
          worksheetCount: 1,
        },
        file: {
          name: "Example Spreadsheet",
          modifiedTime: "2026-01-06T22:25:56.293Z",
          lastModifyingUser: {
            kind: "drive#user",
            displayName: "John Doe",
            photoLink:
              "https://lh3.googleusercontent.com/a/ExamplePhotoLinkId1234567890abcdefg=s64",
            me: true,
            permissionId: "12345678901234567890",
            emailAddress: "john.doe@example.com",
          },
          webViewLink:
            "https://docs.google.com/spreadsheets/d/1ABC123DEF456GHI789JKL012MNO345PQR678STU901/edit?usp=drivesdk",
          size: "1024",
        },
        notification: {
          resourceState: "update",
          changedFields: "content,properties",
          resourceId: "ExampleResourceId1234567890",
          timestamp: "2026-01-06T22:26:35.618Z",
        },
      },
      contentType: "application/octet-stream",
    },
    pathFragment: "",
    webhookUrls: {
      "Spreadsheet Change Events":
        "https://hooks.example.com/trigger/RXhhbXBsZUluc3RhbmNlRmxvd0NvbmZpZ0lkMTIzNDU2Nzg5MDEyMzQ1Njc4OTA=",
    },
    webhookApiKeys: {
      "Spreadsheet Change Events": [],
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
      name: "Google Sheets - DEV - Spreadsheet Change Events",
    },
    user: {
      id: "testUserId",
      email: "testUserEmail@example.com",
      name: "Test User",
      externalId: "testUserExternalId",
    },
    integration: {
      id: "SW50ZWdyYXRpb246ZDk2YzcxNmItODFmMS00NmQ4LTk0NzItNDU3NDZmMzg2Mjgw",
      name: "Google Sheets - DEV",
      versionSequenceId: "testIntegrationVersionSequenceId",
      externalVersion: "",
    },
    flow: {
      id: "SW50ZWdyYXRpb25GbG93OmM4Y2IzY2UwLTFjYTUtNDVhZC04Yjc1LWNmNDc4YWE1Y2RlYQ==",
      name: "Spreadsheet Change Events",
    },
    startedAt: "2026-01-06 07:22:38.313677+00",
    globalDebug: false,
  },
  response: { statusCode: 200, contentType: "application/json" },
};
