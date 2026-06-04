export const moveFileExamplePayload = {
  data: {
    "@odata.context": "https://graph.microsoft.com/v1.0/$metadata#drives('drive-id')/items/$entity",
    "@microsoft.graph.downloadUrl":
      "https://example.sharepoint.com/sites/ExampleSite/_layouts/15/download.aspx?UniqueId=example-unique-id&Translate=false&tempauth=example-tempauth-token&ApiVersion=2.0",
    createdDateTime: "2025-06-12T23:24:20Z",
    eTag: '"{EXAMPLE-ETAG},7"',
    id: "example-file-id",
    lastModifiedDateTime: "2025-06-12T23:24:49Z",
    name: "example.docx",
    webUrl:
      "https://example.sharepoint.com/sites/ExampleSite/_layouts/15/Doc.aspx?sourcedoc=%7BEXAMPLE-ID%7D&file=example.docx&action=default&mobileredirect=true",
    cTag: '"c:{EXAMPLE-CTAG},8"',
    size: 19802,
    createdBy: {
      user: {
        email: "user@example.com",
        id: "00000000-0000-0000-0000-000000000000",
        displayName: "Example User",
      },
    },
    lastModifiedBy: {
      user: {
        email: "user@example.com",
        id: "00000000-0000-0000-0000-000000000000",
        displayName: "Example User",
      },
    },
    parentReference: {
      driveType: "documentLibrary",
      driveId: "example-drive-id",
      id: "example-parent-id",
      name: "Shared Documents",
      path: "/drives/example-drive-id/root:",
      siteId: "00000000-0000-0000-0000-000000000000",
    },
    file: {
      mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      hashes: {
        quickXorHash: "exampleBase64Hash==",
      },
    },
    fileSystemInfo: {
      createdDateTime: "2025-06-12T23:24:20Z",
      lastModifiedDateTime: "2025-06-12T23:24:49Z",
    },
    shared: {
      scope: "users",
    },
  },
};
