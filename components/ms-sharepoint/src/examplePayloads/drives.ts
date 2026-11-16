const documentsDrive = {
  createdDateTime: "2026-03-02T15:41:07Z",
  description: "",
  id: "b!j4hEbINY8E6lQtIagCz-pgZdLe2S4UdAr6al1_JbNBjiyKTRbzt6TZ4cXyuKDWxD",
  lastModifiedDateTime: "2026-11-02T16:48:05Z",
  name: "Documents",
  webUrl: "https://example.sharepoint.com/sites/ExampleSite/Shared%20Documents",
  driveType: "documentLibrary",
  createdBy: {
    user: {
      displayName: "System Account",
    },
  },
  owner: {
    group: {
      id: "9705118a-6ce1-4fa3-adba-09f94b69d568",
      displayName: "Example Team Site Owners",
    },
  },
  quota: {
    deleted: 0,
    remaining: 27487789251101,
    state: "normal",
    total: 27487790694400,
    used: 1443299,
  },
};

const siteAssetsDrive = {
  createdDateTime: "2026-03-02T15:41:09Z",
  description: "Use this library to store files which are included on pages within this site.",
  id: "b!j4hEbINY8E6lQtIagCz-pgZdLe2S4UdAr6al1_JbNBgaLz6LTWybSrflDRyfKj6E",
  lastModifiedDateTime: "2026-09-14T11:20:33Z",
  name: "Site Assets",
  webUrl: "https://example.sharepoint.com/sites/ExampleSite/SiteAssets",
  driveType: "documentLibrary",
  createdBy: {
    user: {
      displayName: "System Account",
    },
  },
  owner: {
    group: {
      id: "9705118a-6ce1-4fa3-adba-09f94b69d568",
      displayName: "Example Team Site Owners",
    },
  },
  quota: {
    deleted: 0,
    remaining: 27487789251101,
    state: "normal",
    total: 27487790694400,
    used: 1443299,
  },
};

export const listDrivesExamplePayload = {
  data: {
    "@odata.context": "https://graph.microsoft.com/v1.0/$metadata#drives",
    value: [documentsDrive, siteAssetsDrive],
  },
};

export const getDriveExamplePayload = {
  data: {
    "@odata.context": "https://graph.microsoft.com/v1.0/$metadata#drives/$entity",
    ...documentsDrive,
  },
};

export const listDrivesDataSourceExamplePayload = {
  result: [
    {
      key: "b!j4hEbINY8E6lQtIagCz-pgZdLe2S4UdAr6al1_JbNBjiyKTRbzt6TZ4cXyuKDWxD",
      label: "Documents",
    },
    {
      key: "b!j4hEbINY8E6lQtIagCz-pgZdLe2S4UdAr6al1_JbNBgaLz6LTWybSrflDRyfKj6E",
      label: "Site Assets",
    },
  ],
};

export const selectDrivesFromSitesExamplePayload = {
  result: [
    {
      object: {
        key: "b!j4hEbINY8E6lQtIagCz-pgZdLe2S4UdAr6al1_JbNBjiyKTRbzt6TZ4cXyuKDWxD",
        label: "Example Team Site / Documents",
      },
    },
    {
      object: {
        key: "b!j4hEbINY8E6lQtIagCz-pgZdLe2S4UdAr6al1_JbNBgaLz6LTWybSrflDRyfKj6E",
        label: "Example Team Site / Site Assets",
      },
    },
  ],
};

export const getFilesFromDriveWithPaginationExamplePayload = {
  data: {
    "@odata.context": "https://graph.microsoft.com/v1.0/$metadata#Collection(driveItem)",
    "@odata.nextLink":
      "https://graph.microsoft.com/v1.0/drives/b!j4hEbINY8E6lQtIagCz-pgZdLe2S4UdAr6al1_JbNBjiyKTRbzt6TZ4cXyuKDWxD/root/children?$top=3&$skipToken=UGFnZWQ9VFJVRSZwX1NvcnRCZWhhdmlvcj0wJnBfRmlsZUxlYWZSZWY9VGVhbSUyMFJvc3Rlci5jc3YmcF9JRD0xNQ",
    "@odata.nextToken":
      "UGFnZWQ9VFJVRSZwX1NvcnRCZWhhdmlvcj0wJnBfRmlsZUxlYWZSZWY9VGVhbSUyMFJvc3Rlci5jc3YmcF9JRD0xNQ",
    value: [
      {
        createdDateTime: "2026-04-08T13:02:51Z",
        eTag: '"{0E9502D3-10B0-413F-B8E9-F21ECCC4FD84},1"',
        id: "01WRHZXM7GD4WMT4FJBQ4MBL7NKVYF5QNJ",
        lastModifiedDateTime: "2026-04-08T13:02:51Z",
        name: "Archive",
        webUrl: "https://example.sharepoint.com/sites/ExampleSite/Shared%20Documents/Archive",
        cTag: '"c:{0E9502D3-10B0-413F-B8E9-F21ECCC4FD84},0"',
        size: 1048576,
        createdBy: {
          user: {
            email: "jane.smith@example.com",
            id: "e882d549-a306-4d1a-b440-a0e2818f1bcc",
            displayName: "Jane Smith",
          },
        },
        lastModifiedBy: {
          user: {
            email: "jane.smith@example.com",
            id: "e882d549-a306-4d1a-b440-a0e2818f1bcc",
            displayName: "Jane Smith",
          },
        },
        parentReference: {
          driveType: "documentLibrary",
          driveId: "b!j4hEbINY8E6lQtIagCz-pgZdLe2S4UdAr6al1_JbNBjiyKTRbzt6TZ4cXyuKDWxD",
          id: "01SL2AYQVWKBEWAFIIOF2ZWAXAXWVSD3MI",
          name: "Shared Documents",
          path: "/drives/b!j4hEbINY8E6lQtIagCz-pgZdLe2S4UdAr6al1_JbNBjiyKTRbzt6TZ4cXyuKDWxD/root:",
          siteId: "6c44888f-5883-4ef0-a542-d21a802cfea6",
        },
        fileSystemInfo: {
          createdDateTime: "2026-04-08T13:02:51Z",
          lastModifiedDateTime: "2026-04-08T13:02:51Z",
        },
        folder: {
          childCount: 12,
        },
        shared: {
          scope: "users",
        },
      },
      {
        createdDateTime: "2026-10-20T14:05:12Z",
        eTag: '"{C35950B1-8A23-4EAB-8A13-EF0CA0443669},2"',
        id: "01GSSFDXCQ3Z5WH3SSD24SI4FP2CHOPJFT",
        lastModifiedDateTime: "2026-10-20T14:07:45Z",
        name: "Project Files",
        webUrl:
          "https://example.sharepoint.com/sites/ExampleSite/Shared%20Documents/Project%20Files",
        cTag: '"c:{C35950B1-8A23-4EAB-8A13-EF0CA0443669},0"',
        size: 64282,
        createdBy: {
          user: {
            email: "john.doe@example.com",
            id: "efee1b77-fb3b-4f65-99d6-274c11914d12",
            displayName: "John Doe",
          },
        },
        lastModifiedBy: {
          user: {
            email: "john.doe@example.com",
            id: "efee1b77-fb3b-4f65-99d6-274c11914d12",
            displayName: "John Doe",
          },
        },
        parentReference: {
          driveType: "documentLibrary",
          driveId: "b!j4hEbINY8E6lQtIagCz-pgZdLe2S4UdAr6al1_JbNBjiyKTRbzt6TZ4cXyuKDWxD",
          id: "01SL2AYQVWKBEWAFIIOF2ZWAXAXWVSD3MI",
          name: "Shared Documents",
          path: "/drives/b!j4hEbINY8E6lQtIagCz-pgZdLe2S4UdAr6al1_JbNBjiyKTRbzt6TZ4cXyuKDWxD/root:",
          siteId: "6c44888f-5883-4ef0-a542-d21a802cfea6",
        },
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
      },
      {
        "@microsoft.graph.downloadUrl":
          "https://example.sharepoint.com/sites/ExampleSite/_layouts/15/download.aspx?UniqueId=10bc6ebc-9377-4846-9ef5-f1748a16b8ed&Translate=false&tempauth=v1.eyJzaXRlaWQiOiI2YzQ0ODg4Zi01ODgzLTRlZjAtYTU0Mi1kMjFhODAyY2ZlYTYifQ.Kp3vM8xQz2LrT7wN4sYd1fHjB6gUe0aC9iO5nRtWkEq&ApiVersion=2.0",
        createdDateTime: "2026-09-29T08:44:19Z",
        eTag: '"{10BC6EBC-9377-4846-9EF5-F1748A16B8ED},3"',
        id: "012CJKY46NSUN5MXWNHZ4PGFHIRFE7UV6A",
        lastModifiedDateTime: "2026-10-30T10:15:02Z",
        name: "Team Roster.csv",
        webUrl:
          "https://example.sharepoint.com/sites/ExampleSite/Shared%20Documents/Team%20Roster.csv",
        cTag: '"c:{10BC6EBC-9377-4846-9EF5-F1748A16B8ED},3"',
        size: 2381,
        createdBy: {
          user: {
            email: "jane.smith@example.com",
            id: "e882d549-a306-4d1a-b440-a0e2818f1bcc",
            displayName: "Jane Smith",
          },
        },
        lastModifiedBy: {
          user: {
            email: "john.doe@example.com",
            id: "efee1b77-fb3b-4f65-99d6-274c11914d12",
            displayName: "John Doe",
          },
        },
        parentReference: {
          driveType: "documentLibrary",
          driveId: "b!j4hEbINY8E6lQtIagCz-pgZdLe2S4UdAr6al1_JbNBjiyKTRbzt6TZ4cXyuKDWxD",
          id: "01SL2AYQVWKBEWAFIIOF2ZWAXAXWVSD3MI",
          name: "Shared Documents",
          path: "/drives/b!j4hEbINY8E6lQtIagCz-pgZdLe2S4UdAr6al1_JbNBjiyKTRbzt6TZ4cXyuKDWxD/root:",
          siteId: "6c44888f-5883-4ef0-a542-d21a802cfea6",
        },
        file: {
          mimeType: "text/csv",
          hashes: {
            quickXorHash: "3bq8SY/2JaLU4CyJtv+U24Bn9HY=",
          },
        },
        fileSystemInfo: {
          createdDateTime: "2026-09-29T08:44:19Z",
          lastModifiedDateTime: "2026-10-30T10:15:02Z",
        },
        shared: {
          scope: "users",
        },
      },
    ],
  },
};

export const getFilesFromDriveFolderWithPaginationExamplePayload = {
  data: {
    "@odata.context": "https://graph.microsoft.com/v1.0/$metadata#Collection(driveItem)",
    "@odata.nextLink":
      "https://graph.microsoft.com/v1.0/drives/b!j4hEbINY8E6lQtIagCz-pgZdLe2S4UdAr6al1_JbNBjiyKTRbzt6TZ4cXyuKDWxD/items/01GSSFDXCQ3Z5WH3SSD24SI4FP2CHOPJFT/children?$top=2&$skipToken=UGFnZWQ9VFJVRSZwX1NvcnRCZWhhdmlvcj0wJnBfRmlsZUxlYWZSZWY9UXVhcnRlcmx5JTIwUmVwb3J0LmRvY3gmcF9JRD0yMg",
    "@odata.nextToken":
      "UGFnZWQ9VFJVRSZwX1NvcnRCZWhhdmlvcj0wJnBfRmlsZUxlYWZSZWY9UXVhcnRlcmx5JTIwUmVwb3J0LmRvY3gmcF9JRD0yMg",
    value: [
      {
        "@microsoft.graph.downloadUrl":
          "https://example.sharepoint.com/sites/ExampleSite/_layouts/15/download.aspx?UniqueId=31b7d908-fb81-40d2-9baf-7055a5e95bce&Translate=false&tempauth=v1.eyJzaXRlaWQiOiI2YzQ0ODg4Zi01ODgzLTRlZjAtYTU0Mi1kMjFhODAyY2ZlYTYifQ.Rz8nQ2wLx5vT0pYk7mHc3aJd9gFs1eUb6iO4tNqWyXp&ApiVersion=2.0",
        createdDateTime: "2026-11-03T09:30:14Z",
        eTag: '"{31B7D908-FB81-40D2-9BAF-7055A5E95BCE},2"',
        id: "01TYIFWGD5VQB4TCX2YNU6QBNFNQ5J7AMB",
        lastModifiedDateTime: "2026-11-05T15:12:48Z",
        name: "Budget 2026.xlsx",
        webUrl:
          "https://example.sharepoint.com/sites/ExampleSite/_layouts/15/Doc.aspx?sourcedoc=%7B31B7D908-FB81-40D2-9BAF-7055A5E95BCE%7D&file=Budget%202026.xlsx&action=default&mobileredirect=true",
        cTag: '"c:{31B7D908-FB81-40D2-9BAF-7055A5E95BCE},2"',
        size: 44480,
        createdBy: {
          user: {
            email: "john.doe@example.com",
            id: "efee1b77-fb3b-4f65-99d6-274c11914d12",
            displayName: "John Doe",
          },
        },
        lastModifiedBy: {
          user: {
            email: "john.doe@example.com",
            id: "efee1b77-fb3b-4f65-99d6-274c11914d12",
            displayName: "John Doe",
          },
        },
        parentReference: {
          driveType: "documentLibrary",
          driveId: "b!j4hEbINY8E6lQtIagCz-pgZdLe2S4UdAr6al1_JbNBjiyKTRbzt6TZ4cXyuKDWxD",
          id: "01GSSFDXCQ3Z5WH3SSD24SI4FP2CHOPJFT",
          name: "Project Files",
          path: "/drives/b!j4hEbINY8E6lQtIagCz-pgZdLe2S4UdAr6al1_JbNBjiyKTRbzt6TZ4cXyuKDWxD/root:/Project%20Files",
          siteId: "6c44888f-5883-4ef0-a542-d21a802cfea6",
        },
        file: {
          mimeType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          hashes: {
            quickXorHash: "kvaowiXJyVc/sd61ERgAyj3gl9s=",
          },
        },
        fileSystemInfo: {
          createdDateTime: "2026-11-03T09:30:14Z",
          lastModifiedDateTime: "2026-11-05T15:12:48Z",
        },
        shared: {
          scope: "users",
        },
      },
      {
        "@microsoft.graph.downloadUrl":
          "https://example.sharepoint.com/sites/ExampleSite/_layouts/15/download.aspx?UniqueId=efd16534-2913-417c-b4d3-5afb73d01082&Translate=false&tempauth=v1.eyJzaXRlaWQiOiI2YzQ0ODg4Zi01ODgzLTRlZjAtYTU0Mi1kMjFhODAyY2ZlYTYifQ.Hb4tW9yNc2xQe7rLm1vKs5pDg8jFa0uZ3iO6dTqXwYz&ApiVersion=2.0",
        createdDateTime: "2026-10-21T09:12:40Z",
        eTag: '"{EFD16534-2913-417C-B4D3-5AFB73D01082},7"',
        id: "01XH3P5XEJFT6Z7LZFYVEPIUB2XBIZRHS4",
        lastModifiedDateTime: "2026-11-02T16:48:05Z",
        name: "Quarterly Report.docx",
        webUrl:
          "https://example.sharepoint.com/sites/ExampleSite/_layouts/15/Doc.aspx?sourcedoc=%7BEFD16534-2913-417C-B4D3-5AFB73D01082%7D&file=Quarterly%20Report.docx&action=default&mobileredirect=true",
        cTag: '"c:{EFD16534-2913-417C-B4D3-5AFB73D01082},8"',
        size: 19802,
        createdBy: {
          user: {
            email: "john.doe@example.com",
            id: "efee1b77-fb3b-4f65-99d6-274c11914d12",
            displayName: "John Doe",
          },
        },
        lastModifiedBy: {
          user: {
            email: "jane.smith@example.com",
            id: "e882d549-a306-4d1a-b440-a0e2818f1bcc",
            displayName: "Jane Smith",
          },
        },
        parentReference: {
          driveType: "documentLibrary",
          driveId: "b!j4hEbINY8E6lQtIagCz-pgZdLe2S4UdAr6al1_JbNBjiyKTRbzt6TZ4cXyuKDWxD",
          id: "01GSSFDXCQ3Z5WH3SSD24SI4FP2CHOPJFT",
          name: "Project Files",
          path: "/drives/b!j4hEbINY8E6lQtIagCz-pgZdLe2S4UdAr6al1_JbNBjiyKTRbzt6TZ4cXyuKDWxD/root:/Project%20Files",
          siteId: "6c44888f-5883-4ef0-a542-d21a802cfea6",
        },
        file: {
          mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          hashes: {
            quickXorHash: "qTIajjjlF4renYX/hcfv6e/UmS8=",
          },
        },
        fileSystemInfo: {
          createdDateTime: "2026-10-21T09:12:40Z",
          lastModifiedDateTime: "2026-11-02T16:48:05Z",
        },
        shared: {
          scope: "users",
        },
      },
    ],
  },
};

export const listFoldersExamplePayload = {
  result: [
    {
      key: "01WRHZXM7GD4WMT4FJBQ4MBL7NKVYF5QNJ",
      label: "Archive",
    },
    {
      key: "01GSSFDXCQ3Z5WH3SSD24SI4FP2CHOPJFT",
      label: "Project Files",
    },
  ],
};

export const selectFoldersFromDrivesExamplePayload = {
  result: [
    {
      object: {
        key: "b!j4hEbINY8E6lQtIagCz-pgZdLe2S4UdAr6al1_JbNBjiyKTRbzt6TZ4cXyuKDWxD:01WRHZXM7GD4WMT4FJBQ4MBL7NKVYF5QNJ",
        label: "Documents / Archive",
      },
    },
    {
      object: {
        key: "b!j4hEbINY8E6lQtIagCz-pgZdLe2S4UdAr6al1_JbNBjiyKTRbzt6TZ4cXyuKDWxD:01GSSFDXCQ3Z5WH3SSD24SI4FP2CHOPJFT",
        label: "Documents / Project Files",
      },
    },
  ],
};

export const listChangesExamplePayload = {
  data: {
    "@odata.context": "https://graph.microsoft.com/v1.0/$metadata#Collection(driveItem)",
    "@odata.deltaLink":
      "https://graph.microsoft.com/v1.0/drives/b!j4hEbINY8E6lQtIagCz-pgZdLe2S4UdAr6al1_JbNBjiyKTRbzt6TZ4cXyuKDWxD/root/delta?token=MzslMjM0OyUyMzE7MDslMjM",
    value: [
      {
        id: "01WBQ3JJJNCRPUUMBDCYSJBWQ4Q5I7LVXV",
        name: "Sales Forecast.xlsx",
        createdDateTime: "2026-11-08T14:30:00Z",
        lastModifiedDateTime: "2026-11-08T14:30:00Z",
        size: 45678,
        webUrl:
          "https://example.sharepoint.com/sites/ExampleSite/Shared%20Documents/Sales%20Forecast.xlsx",
        file: {
          mimeType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          hashes: {
            quickXorHash: "mSRiJYppZ/DJ+JNtG3nuXdrsFOQ=",
          },
        },
        parentReference: {
          driveId: "b!j4hEbINY8E6lQtIagCz-pgZdLe2S4UdAr6al1_JbNBjiyKTRbzt6TZ4cXyuKDWxD",
          id: "01SL2AYQVWKBEWAFIIOF2ZWAXAXWVSD3MI",
          path: "/drives/b!j4hEbINY8E6lQtIagCz-pgZdLe2S4UdAr6al1_JbNBjiyKTRbzt6TZ4cXyuKDWxD/root:",
        },
      },
      {
        id: "01DXVS5ZOEUSOAMZQQ33LFAXCSYB7UJ6UP",
        name: "Kickoff Deck.pptx",
        createdDateTime: "2026-10-27T10:00:00Z",
        lastModifiedDateTime: "2026-11-08T16:45:00Z",
        size: 234567,
        webUrl:
          "https://example.sharepoint.com/sites/ExampleSite/Shared%20Documents/Kickoff%20Deck.pptx",
        file: {
          mimeType: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
          hashes: {
            quickXorHash: "rvZSyHzWE4VfJ1FhSn6r6PIBqx0=",
          },
        },
        parentReference: {
          driveId: "b!j4hEbINY8E6lQtIagCz-pgZdLe2S4UdAr6al1_JbNBjiyKTRbzt6TZ4cXyuKDWxD",
          id: "01SL2AYQVWKBEWAFIIOF2ZWAXAXWVSD3MI",
          path: "/drives/b!j4hEbINY8E6lQtIagCz-pgZdLe2S4UdAr6al1_JbNBjiyKTRbzt6TZ4cXyuKDWxD/root:",
        },
      },
    ],
  },
};
