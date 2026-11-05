export const listItemsExamplePayload = {
  data: {
    "@odata.context": "https://graph.microsoft.com/v1.0/$metadata#Collection(driveItem)",
    value: [
      {
        "@microsoft.graph.downloadUrl":
          "https://example.sharepoint.com/sites/ExampleSite/_layouts/15/download.aspx?UniqueId=example-unique-id&Translate=false&tempauth=example-auth-token&ApiVersion=2.0",
        createdBy: {
          user: {
            email: "example.user@example.onmicrosoft.com",
            id: "00000000-0000-0000-0000-000000000000",
            displayName: "Example User",
          },
        },
        createdDateTime: "2025-06-12T23:24:20Z",
        eTag: '"{EXAMPLE-ID},5"',
        id: "EXAMPLE-FILE-ID-12345",
        lastModifiedBy: {
          user: {
            email: "example.user@example.onmicrosoft.com",
            id: "00000000-0000-0000-0000-000000000000",
            displayName: "Example User",
          },
        },
        lastModifiedDateTime: "2025-06-12T23:24:49Z",
        name: "example-file.docx",
        parentReference: {
          driveType: "documentLibrary",
          driveId: "b!ExampleDriveId123456789",
          id: "EXAMPLE-FOLDER-ID-12345",
          name: "ExampleFolder",
          path: "/drives/b!ExampleDriveId123456789/root:/ExampleFolder",
          siteId: "00000000-0000-0000-0000-000000000000",
        },
        webUrl:
          "https://example.sharepoint.com/sites/ExampleSite/_layouts/15/Doc.aspx?sourcedoc=%7BEXAMPLE-ID%7D&file=example-file.docx&action=default&mobileredirect=true",
        cTag: '"c:{EXAMPLE-ID},7"',
        file: {
          hashes: {
            quickXorHash: "ExampleHashBase64==",
          },
          mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        },
        fileSystemInfo: {
          createdDateTime: "2025-06-12T23:24:20Z",
          lastModifiedDateTime: "2025-06-12T23:24:49Z",
        },
        shared: {
          scope: "users",
        },
        size: 19802,
      },
    ],
  },
};
