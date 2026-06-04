export const renameFolderExamplePayload = {
  data: {
    "@odata.context":
      "https://graph.microsoft.com/v1.0/$metadata#sites('example.sharepoint.com%2Cexample-site-id%2Cexample-web-id')/drives('b%21exampleDriveId')/items('root')/children/$entity",
    "@odata.etag": '"{EXAMPLE-ETAG-ID},1"',
    createdDateTime: "2025-06-12T22:28:24Z",
    eTag: '"{EXAMPLE-ETAG-ID},1"',
    id: "exampleItemId123456",
    lastModifiedDateTime: "2025-06-12T22:28:24Z",
    name: "NewFolder",
    size: 0,
    webUrl: "https://example.sharepoint.com/sites/ExampleSite/Shared%20Documents/NewFolder",
    cTag: '"c:{EXAMPLE-ETAG-ID},0"',
    commentSettings: {
      commentingDisabled: {
        isDisabled: false,
      },
    },
    createdBy: {
      application: {
        displayName: "ExampleApp",
        id: "example-app-id-1234",
      },
      user: {
        displayName: "Example User",
        email: "example.user@example.com",
        id: "example-user-id-1234",
      },
    },
    lastModifiedBy: {
      application: {
        displayName: "ExampleApp",
        id: "example-app-id-1234",
      },
      user: {
        displayName: "Example User",
        email: "example.user@example.com",
        id: "example-user-id-1234",
      },
    },
    parentReference: {
      driveId: "b!exampleDriveId",
      driveType: "documentLibrary",
      id: "exampleParentItemId123456",
      path: "/drives/b!exampleDriveId/root:",
      sharepointIds: {
        listId: "example-list-id-1234",
        listItemUniqueId: "example-list-item-id-1234",
        siteId: "example-site-id-1234",
        siteUrl: "https://example.sharepoint.com/sites/ExampleSite",
        tenantId: "example-tenant-id-1234",
        webId: "example-web-id-1234",
      },
    },
    fileSystemInfo: {
      createdDateTime: "2025-06-12T22:28:24Z",
      lastModifiedDateTime: "2025-06-12T22:28:24Z",
    },
    folder: {
      childCount: 0,
    },
    shared: {
      scope: "unknown",
    },
  },
};
