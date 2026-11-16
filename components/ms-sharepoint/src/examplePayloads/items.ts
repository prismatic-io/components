export const listItemsExamplePayload = {
  data: {
    "@odata.context": "https://graph.microsoft.com/v1.0/$metadata#Collection(driveItem)",
    value: [
      {
        "@microsoft.graph.downloadUrl":
          "https://example.sharepoint.com/sites/ExampleSite/_layouts/15/download.aspx?UniqueId=efd16534-2913-417c-b4d3-5afb73d01082&Translate=false&tempauth=v1.eyJzaXRlaWQiOiI2YzQ0ODg4Zi01ODgzLTRlZjAtYTU0Mi1kMjFhODAyY2ZlYTYifQ.Hb4tW9yNc2xQe7rLm1vKs5pDg8jFa0uZ3iO6dTqXwYz&ApiVersion=2.0",
        createdBy: {
          user: {
            email: "john.doe@example.com",
            id: "efee1b77-fb3b-4f65-99d6-274c11914d12",
            displayName: "John Doe",
          },
        },
        createdDateTime: "2026-10-21T09:12:40Z",
        eTag: '"{EFD16534-2913-417C-B4D3-5AFB73D01082},7"',
        id: "01XH3P5XEJFT6Z7LZFYVEPIUB2XBIZRHS4",
        lastModifiedBy: {
          user: {
            email: "jane.smith@example.com",
            id: "e882d549-a306-4d1a-b440-a0e2818f1bcc",
            displayName: "Jane Smith",
          },
        },
        lastModifiedDateTime: "2026-11-02T16:48:05Z",
        name: "Quarterly Report.docx",
        parentReference: {
          driveType: "documentLibrary",
          driveId: "b!j4hEbINY8E6lQtIagCz-pgZdLe2S4UdAr6al1_JbNBjiyKTRbzt6TZ4cXyuKDWxD",
          id: "01GSSFDXCQ3Z5WH3SSD24SI4FP2CHOPJFT",
          name: "Project Files",
          path: "/drives/b!j4hEbINY8E6lQtIagCz-pgZdLe2S4UdAr6al1_JbNBjiyKTRbzt6TZ4cXyuKDWxD/root:/Project%20Files",
          siteId: "6c44888f-5883-4ef0-a542-d21a802cfea6",
        },
        webUrl:
          "https://example.sharepoint.com/sites/ExampleSite/_layouts/15/Doc.aspx?sourcedoc=%7BEFD16534-2913-417C-B4D3-5AFB73D01082%7D&file=Quarterly%20Report.docx&action=default&mobileredirect=true",
        cTag: '"c:{EFD16534-2913-417C-B4D3-5AFB73D01082},8"',
        file: {
          hashes: {
            quickXorHash: "qTIajjjlF4renYX/hcfv6e/UmS8=",
          },
          mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        },
        fileSystemInfo: {
          createdDateTime: "2026-10-21T09:12:40Z",
          lastModifiedDateTime: "2026-11-02T16:48:05Z",
        },
        shared: {
          scope: "users",
        },
        size: 19802,
      },
    ],
  },
};

export const searchItemsExamplePayload = {
  data: {
    Documents: [
      {
        createdDateTime: "2026-10-20T14:05:12Z",
        id: "01GSSFDXCQ3Z5WH3SSD24SI4FP2CHOPJFT",
        lastModifiedDateTime: "2026-10-20T14:07:45Z",
        name: "Project Files",
        webUrl:
          "https://example.sharepoint.com/sites/ExampleSite/Shared%20Documents/Project%20Files",
        size: 64282,
        createdBy: {
          user: {
            email: "john.doe@example.com",
            displayName: "John Doe",
          },
        },
        lastModifiedBy: {
          user: {
            email: "john.doe@example.com",
            displayName: "John Doe",
          },
        },
        parentReference: {
          driveType: "documentLibrary",
          driveId: "b!j4hEbINY8E6lQtIagCz-pgZdLe2S4UdAr6al1_JbNBjiyKTRbzt6TZ4cXyuKDWxD",
          id: "01SL2AYQVWKBEWAFIIOF2ZWAXAXWVSD3MI",
          siteId: "6c44888f-5883-4ef0-a542-d21a802cfea6",
        },
        fileSystemInfo: {
          createdDateTime: "2026-10-20T14:05:12Z",
          lastModifiedDateTime: "2026-10-20T14:07:45Z",
        },
        folder: {
          childCount: 2,
        },
        searchResult: {},
      },
    ],
  },
};

export const checkItemExistsExamplePayload = {
  data: {
    exists: true,
    message: 'Item "Project Files" exists in the specified drive',
    item: {
      "@odata.context": "https://graph.microsoft.com/v1.0/$metadata#Collection(driveItem)/$entity",
      createdBy: {
        user: {
          email: "john.doe@example.com",
          id: "efee1b77-fb3b-4f65-99d6-274c11914d12",
          displayName: "John Doe",
        },
      },
      createdDateTime: "2026-10-20T14:05:12Z",
      eTag: '"{C35950B1-8A23-4EAB-8A13-EF0CA0443669},2"',
      id: "01GSSFDXCQ3Z5WH3SSD24SI4FP2CHOPJFT",
      lastModifiedBy: {
        user: {
          email: "john.doe@example.com",
          id: "efee1b77-fb3b-4f65-99d6-274c11914d12",
          displayName: "John Doe",
        },
      },
      lastModifiedDateTime: "2026-10-20T14:07:45Z",
      name: "Project Files",
      parentReference: {
        driveType: "documentLibrary",
        driveId: "b!j4hEbINY8E6lQtIagCz-pgZdLe2S4UdAr6al1_JbNBjiyKTRbzt6TZ4cXyuKDWxD",
        id: "01SL2AYQVWKBEWAFIIOF2ZWAXAXWVSD3MI",
        name: "Shared Documents",
        path: "/drives/b!j4hEbINY8E6lQtIagCz-pgZdLe2S4UdAr6al1_JbNBjiyKTRbzt6TZ4cXyuKDWxD/root:",
        siteId: "6c44888f-5883-4ef0-a542-d21a802cfea6",
      },
      webUrl: "https://example.sharepoint.com/sites/ExampleSite/Shared%20Documents/Project%20Files",
      cTag: '"c:{C35950B1-8A23-4EAB-8A13-EF0CA0443669},0"',
      fileSystemInfo: {
        createdDateTime: "2026-10-20T14:05:12Z",
        lastModifiedDateTime: "2026-10-20T14:07:45Z",
      },
      folder: {
        childCount: 2,
      },
      shared: {
        scope: "users",
      },
      size: 64282,
    },
  },
};
