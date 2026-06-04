export const checkItemExistsExamplePayload = {
  data: {
    exists: true,
    message: 'Item "MyFolder" exists in the specified drive',
    item: {
      "@odata.context": "https://graph.microsoft.com/v1.0/$metadata#Collection(driveItem)/$entity",
      createdBy: {
        user: {
          email: "User@example.com",
          id: "00000000-0000-0000-0000-000000000001",
          displayName: "Example User",
        },
      },
      createdDateTime: "2025-06-11T22:08:54Z",
      eTag: '"{DRIVE-ITEM-ETAG},2"',
      id: "ITEM-ID-001",
      lastModifiedBy: {
        user: {
          email: "User@example.com",
          id: "00000000-0000-0000-0000-000000000001",
          displayName: "Example User",
        },
      },
      lastModifiedDateTime: "2025-06-12T23:48:54Z",
      name: "MyFolder",
      parentReference: {
        driveType: "documentLibrary",
        driveId: "DRIVE-ID-001",
        id: "ITEM-ID-002",
        name: "Shared Documents",
        path: "/drives/DRIVE-ID-001/root:",
        siteId: "SITE-ID-001",
      },
      webUrl: "https://example.sharepoint.com/sites/ExampleSite/Shared%20Documents/MyFolder",
      cTag: '"c:{DRIVE-ITEM-CTAG},0"',
      fileSystemInfo: {
        createdDateTime: "2025-06-11T22:08:54Z",
        lastModifiedDateTime: "2025-06-12T23:48:54Z",
      },
      folder: {
        childCount: 2,
      },
      shared: {
        scope: "users",
      },
      size: 46758,
    },
  },
};
