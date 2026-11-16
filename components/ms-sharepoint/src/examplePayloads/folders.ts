const projectFilesFolder = {
  createdDateTime: "2026-10-20T14:05:12Z",
  eTag: '"{C35950B1-8A23-4EAB-8A13-EF0CA0443669},1"',
  id: "01GSSFDXCQ3Z5WH3SSD24SI4FP2CHOPJFT",
  lastModifiedDateTime: "2026-10-20T14:05:12Z",
  name: "Project Files",
  size: 0,
  webUrl: "https://example.sharepoint.com/sites/ExampleSite/Shared%20Documents/Project%20Files",
  cTag: '"c:{C35950B1-8A23-4EAB-8A13-EF0CA0443669},0"',
  createdBy: {
    application: {
      displayName: "ExampleApp",
      id: "b3572aec-d3f0-4d39-abb8-e278bc600aa0",
    },
    user: {
      displayName: "John Doe",
      email: "john.doe@example.com",
      id: "efee1b77-fb3b-4f65-99d6-274c11914d12",
    },
  },
  lastModifiedBy: {
    application: {
      displayName: "ExampleApp",
      id: "b3572aec-d3f0-4d39-abb8-e278bc600aa0",
    },
    user: {
      displayName: "John Doe",
      email: "john.doe@example.com",
      id: "efee1b77-fb3b-4f65-99d6-274c11914d12",
    },
  },
  parentReference: {
    driveId: "b!j4hEbINY8E6lQtIagCz-pgZdLe2S4UdAr6al1_JbNBjiyKTRbzt6TZ4cXyuKDWxD",
    driveType: "documentLibrary",
    id: "01SL2AYQVWKBEWAFIIOF2ZWAXAXWVSD3MI",
    path: "/drives/b!j4hEbINY8E6lQtIagCz-pgZdLe2S4UdAr6al1_JbNBjiyKTRbzt6TZ4cXyuKDWxD/root:",
    sharepointIds: {
      listId: "d1a4c8e2-3b6f-4d7a-9e1c-5f2b8a0d6c43",
      listItemUniqueId: "c35950b1-8a23-4eab-8a13-ef0ca0443669",
      siteId: "6c44888f-5883-4ef0-a542-d21a802cfea6",
      siteUrl: "https://example.sharepoint.com/sites/ExampleSite",
      tenantId: "d8a1e3ca-78c4-44f7-975e-d8d8177fbc08",
      webId: "ed2d5d06-e192-4047-afa6-a5d7f25b3418",
    },
  },
  fileSystemInfo: {
    createdDateTime: "2026-10-20T14:05:12Z",
    lastModifiedDateTime: "2026-10-20T14:05:12Z",
  },
  folder: {
    childCount: 0,
  },
  shared: {
    scope: "users",
  },
};

export const createFolderExamplePayload = {
  data: {
    "@odata.context":
      "https://graph.microsoft.com/v1.0/$metadata#sites('example.sharepoint.com%2C6c44888f-5883-4ef0-a542-d21a802cfea6%2Ced2d5d06-e192-4047-afa6-a5d7f25b3418')/drives('b%21j4hEbINY8E6lQtIagCz-pgZdLe2S4UdAr6al1_JbNBjiyKTRbzt6TZ4cXyuKDWxD')/items('01SL2AYQVWKBEWAFIIOF2ZWAXAXWVSD3MI')/children/$entity",
    "@odata.etag": '"{C35950B1-8A23-4EAB-8A13-EF0CA0443669},1"',
    ...projectFilesFolder,
  },
};

export const renameFolderExamplePayload = {
  data: {
    "@odata.context":
      "https://graph.microsoft.com/v1.0/$metadata#sites('example.sharepoint.com%2C6c44888f-5883-4ef0-a542-d21a802cfea6%2Ced2d5d06-e192-4047-afa6-a5d7f25b3418')/drives('b%21j4hEbINY8E6lQtIagCz-pgZdLe2S4UdAr6al1_JbNBjiyKTRbzt6TZ4cXyuKDWxD')/items/$entity",
    "@odata.etag": '"{C35950B1-8A23-4EAB-8A13-EF0CA0443669},2"',
    ...projectFilesFolder,
    eTag: '"{C35950B1-8A23-4EAB-8A13-EF0CA0443669},2"',
    lastModifiedDateTime: "2026-10-20T14:07:45Z",
    name: "Project Files 2026",
    webUrl:
      "https://example.sharepoint.com/sites/ExampleSite/Shared%20Documents/Project%20Files%202026",
    fileSystemInfo: {
      createdDateTime: "2026-10-20T14:05:12Z",
      lastModifiedDateTime: "2026-10-20T14:07:45Z",
    },
  },
};
