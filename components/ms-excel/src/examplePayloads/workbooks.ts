export const listWorkbooksExamplePayload = {
  value: [
    {
      "@microsoft.graph.downloadUrl":
        "https://example.sharepoint.com/personal/user_example_onmicrosoft_com/_layouts/15/download.aspx?UniqueId=11111111-1111-1111-1111-111111111111&Translate=false&tempauth=EXAMPLETOKEN&ApiVersion=2.0",
      createdBy: {
        user: {
          email: "user@example.onmicrosoft.com",
          id: "00000000-0000-0000-0000-000000000000",
          displayName: "Example User",
        },
      },
      createdDateTime: "2025-07-03T19:12:11Z",
      eTag: '"{11111111-1111-1111-1111-111111111111},1"',
      id: "01ABCDEF123456XYZ",
      lastModifiedBy: {
        user: {
          email: "user@example.onmicrosoft.com",
          id: "00000000-0000-0000-0000-000000000000",
          displayName: "Example User",
        },
      },
      lastModifiedDateTime: "2025-07-03T19:24:55Z",
      name: "Workbook.xlsx",
      parentReference: {
        driveType: "business",
        driveId: "b!exampleDriveId123456789",
        id: "01PARENTITEM123456XYZ",
        name: "ExampleFolder",
        path: "/drives/b!exampleDriveId123456789/root:/ExampleFolder",
        siteId: "00000000-0000-0000-0000-000000000000",
      },
      webUrl:
        "https://example.sharepoint.com/personal/user_example_onmicrosoft_com/_layouts/15/Doc.aspx?sourcedoc=%7B11111111-1111-1111-1111-111111111111%7D&file=Workbook.xlsx&action=default&mobileredirect=true",
      cTag: '"c:{11111111-1111-1111-1111-111111111111},1"',
      file: {
        hashes: {
          quickXorHash: "EXAMPLEHASH1234567890==",
        },
        mimeType:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      },
      fileSystemInfo: {
        createdDateTime: "2025-07-03T19:12:11Z",
        lastModifiedDateTime: "2025-07-03T19:24:55Z",
      },
      shared: {
        scope: "users",
      },
      size: 6727,
    },
  ],
};
