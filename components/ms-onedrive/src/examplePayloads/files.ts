export const getItemExamplePayload = {
  data: {
    "@odata.context":
      "https://graph.microsoft.com/v1.0/$metadata#drives('b%21-RIj2DuyvEyV1T4NlOaMHk8XkS_I8MdFlUCq1BlcjgmhRfAj3-Z8RY2VpuvV_tpd')/items/$entity",
    "@microsoft.graph.downloadUrl":
      "https://contoso-my.sharepoint.com/personal/john_contoso_com/_layouts/15/download.aspx?UniqueId=54ef1346-1818-455a-82cc-dc62d9f7fbed",
    id: "01BYE5RZ6QN3ZWBTUFOFD3GSPGOHDJD36K",
    createdDateTime: "2024-12-01T10:30:00Z",
    lastModifiedDateTime: "2024-12-15T14:22:00Z",
    name: "Quarterly Report Q4 2024.xlsx",
    size: 2456789,
    webUrl:
      "https://contoso-my.sharepoint.com/personal/john_contoso_com/Documents/Quarterly%20Report%20Q4%202024.xlsx",
    cTag: "aYzpCOUIyRVI2UU5YLUJUVUZPNDI1WkU1WDVGQ0dPSERKRDM2Sy4yNTc",
    eTag: "aQjNCOUIyRUI2UU5DLUJUVUZPNDI1WkU1WDVGQ0dPSERKRDM2Sy4x",
    createdBy: {
      user: {
        email: "john.doe@contoso.com",
        id: "efee1b77-fb3b-4f65-99d6-274c11914d12",
        displayName: "John Doe",
      },
    },
    lastModifiedBy: {
      user: {
        email: "john.doe@contoso.com",
        id: "efee1b77-fb3b-4f65-99d6-274c11914d12",
        displayName: "John Doe",
      },
    },
    parentReference: {
      driveId:
        "b!-RIj2DuyvEyV1T4NlOaMHk8XkS_I8MdFlUCq1BlcjgmhRfAj3-Z8RY2VpuvV_tpd",
      driveType: "business",
      id: "01BYE5RZY2RES3XS7SME35L4BAO3ZROFB4",
      path: "/drive/root:",
    },
    file: {
      mimeType:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      hashes: {
        quickXorHash: "6rmA+ys6C/oRMcZKZyXuqwdPvUs=",
      },
    },
    fileSystemInfo: {
      createdDateTime: "2024-12-01T10:30:00Z",
      lastModifiedDateTime: "2024-12-15T14:22:00Z",
    },
  },
};

export const listChildrenExamplePayload = {
  data: {
    "@odata.context":
      "https://graph.microsoft.com/v1.0/$metadata#drives('b%21-RIj2DuyvEyV1T4NlOaMHk8XkS_I8MdFlUCq1BlcjgmhRfAj3-Z8RY2VpuvV_tpd')/items('01BYE5RZY2RES3XS7SME35L4BAO3ZROFB4')/children",
    value: [
      {
        id: "01BYE5RZ6QN3ZWBTUFOFD3GSPGOHDJD36K",
        createdDateTime: "2024-12-01T10:30:00Z",
        lastModifiedDateTime: "2024-12-15T14:22:00Z",
        name: "Quarterly Report Q4 2024.xlsx",
        size: 2456789,
        webUrl:
          "https://contoso-my.sharepoint.com/personal/john_contoso_com/Documents/Quarterly%20Report%20Q4%202024.xlsx",
        file: {
          mimeType:
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        },
        parentReference: {
          driveId:
            "b!-RIj2DuyvEyV1T4NlOaMHk8XkS_I8MdFlUCq1BlcjgmhRfAj3-Z8RY2VpuvV_tpd",
          id: "01BYE5RZY2RES3XS7SME35L4BAO3ZROFB4",
          path: "/drive/root:",
        },
      },
      {
        id: "01BYE5RZO3JLEX4CPVXX7HNUY2NLXTHTR3",
        createdDateTime: "2024-01-15T10:30:00Z",
        lastModifiedDateTime: "2025-01-10T09:15:00Z",
        name: "Project Files",
        size: 0,
        webUrl:
          "https://contoso-my.sharepoint.com/personal/john_contoso_com/Documents/Project%20Files",
        folder: {
          childCount: 12,
        },
        parentReference: {
          driveId:
            "b!-RIj2DuyvEyV1T4NlOaMHk8XkS_I8MdFlUCq1BlcjgmhRfAj3-Z8RY2VpuvV_tpd",
          id: "01BYE5RZY2RES3XS7SME35L4BAO3ZROFB4",
          path: "/drive/root:",
        },
      },
    ],
  },
};

export const uploadFileExamplePayload = getItemExamplePayload;

export const updateFileExamplePayload = {
  data: {
    ...getItemExamplePayload.data,
    lastModifiedDateTime: "2025-01-09T16:30:00Z",
    name: "Quarterly Report Q4 2024 - Updated.xlsx",
  },
};

export const moveFileExamplePayload = {
  data: {
    ...getItemExamplePayload.data,
    lastModifiedDateTime: "2025-01-09T17:45:00Z",
    parentReference: {
      driveId:
        "b!-RIj2DuyvEyV1T4NlOaMHk8XkS_I8MdFlUCq1BlcjgmhRfAj3-Z8RY2VpuvV_tpd",
      driveType: "business",
      id: "01BYE5RZO3JLEX4CPVXX7HNUY2NLXTHTR3",
      path: "/drive/root:/Project Files",
    },
  },
};

export const deleteFileExamplePayload = {
  data: {},
};

export const downloadFileExamplePayload = {
  data: Buffer.from("Sample file content..."),
  contentType: "text/plain",
};

export const searchDriveExamplePayload = {
  data: {
    "@odata.context":
      "https://graph.microsoft.com/v1.0/$metadata#drives('b%21-RIj2DuyvEyV1T4NlOaMHk8XkS_I8MdFlUCq1BlcjgmhRfAj3-Z8RY2VpuvV_tpd')/root/search(q='quarterly')",
    value: [
      {
        id: "01BYE5RZ6QN3ZWBTUFOFD3GSPGOHDJD36K",
        name: "Quarterly Report Q4 2024.xlsx",
        size: 2456789,
        webUrl:
          "https://contoso-my.sharepoint.com/personal/john_contoso_com/Documents/Quarterly%20Report%20Q4%202024.xlsx",
        file: {
          mimeType:
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        },
      },
      {
        id: "01BYE5RZVEH66KGZSR7PD5TW5UP5RTBE65",
        name: "Quarterly Meeting Notes.docx",
        size: 45678,
        webUrl:
          "https://contoso-my.sharepoint.com/personal/john_contoso_com/Documents/Quarterly%20Meeting%20Notes.docx",
        file: {
          mimeType:
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        },
      },
    ],
  },
};

export const listSharedExamplePayload = {
  data: {
    value: [
      {
        id: "AQYU6xMz29tFqjBjRgGBZqzyDRKa3GEMQrapYGNuoS-pp5NojfmmNZHz_mBc3kiMSO7JYNyqi6xxDlNTvmY1QOdmYDE9nOFbzQh-u3a1BQ-Y5wICwoCdQXHqgd71FJUAz",
        lastShared: {
          sharedDateTime: "2026-10-28T16:42:11Z",
          sharingSubject: "Quarterly Budget Review",
          sharingType: "Direct",
          sharedBy: {
            displayName: "Jane Smith",
            address: "jane.smith@contoso.com",
            id: "a1b2c3d4-e5f6-7890-ab12-cd34ef567890",
          },
          sharingReference: {
            webUrl:
              "https://contoso-my.sharepoint.com/personal/jane_contoso_com/Documents/Quarterly%20Budget%20Review.xlsx",
            id: "01BYE5RZ6QN3ZWBTUFOFD3GSPGOHDJD36K",
            type: "microsoft.graph.driveItem",
          },
        },
        resourceVisualization: {
          title: "Quarterly Budget Review",
          type: "Excel",
          mediaType:
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          previewImageUrl:
            "https://contoso-my.sharepoint.com/_api/v2.0/drives/b!TRoKwUFeCUSVTVEU5ZI-ypGNMDQfkeEQRL-K9ETTz1Dl314XbQy5dGPkmhF5Xz8B/items/01BYE5RZ6QN3ZWBTUFOFD3GSPGOHDJD36K/thumbnails/0/small/thumbnailContent",
          previewText: "Q3 actuals vs. forecast by department",
          containerWebUrl:
            "https://contoso-my.sharepoint.com/personal/jane_contoso_com/Documents",
          containerDisplayName: "Jane Smith's OneDrive",
          containerType: "OneDriveBusiness",
        },
        resourceReference: {
          webUrl:
            "https://contoso-my.sharepoint.com/personal/jane_contoso_com/Documents/Quarterly%20Budget%20Review.xlsx",
          id: "drives/b!TRoKwUFeCUSVTVEU5ZI-ypGNMDQfkeEQRL-K9ETTz1Dl314XbQy5dGPkmhF5Xz8B/items/01BYE5RZ6QN3ZWBTUFOFD3GSPGOHDJD36K",
          type: "microsoft.graph.driveItem",
        },
      },
    ],
  },
};

export const listSharedFilesExamplePayload = {
  data: {
    "@odata.context":
      "https://graph.microsoft.com/v1.0/$metadata#Collection(driveItem)",
    value: [
      {
        id: "01BYE5RZ6QN3ZWBTUFOFD3GSPGOHDJD36K",
        name: "Shared Presentation.pptx",
        size: 5678900,
        webUrl:
          "https://contoso-my.sharepoint.com/personal/jane_contoso_com/Documents/Shared%20Presentation.pptx",
        remoteItem: {
          id: "01AQNBNHDWMIMMQKLDPG7MYLQ5YGAIFAR2",
          name: "Shared Presentation.pptx",
          file: {
            mimeType:
              "application/vnd.openxmlformats-officedocument.presentationml.presentation",
          },
          parentReference: {
            driveId:
              "b!TRoKwUFeCUSVTVEU5ZI-ypGNMDQfkeEQRL-K9ETTz1Dl314XbQy5dGPkmhF5Xz8B",
            driveType: "business",
          },
          createdBy: {
            user: {
              email: "jane.smith@contoso.com",
              id: "a1b2c3d4-e5f6-7890-ab12-cd34ef567890",
              displayName: "Jane Smith",
            },
          },
          lastModifiedBy: {
            user: {
              email: "jane.smith@contoso.com",
              id: "a1b2c3d4-e5f6-7890-ab12-cd34ef567890",
              displayName: "Jane Smith",
            },
          },
        },
      },
    ],
  },
};

export const listChangesExamplePayload = {
  data: {
    "@odata.context":
      "https://graph.microsoft.com/v1.0/$metadata#drives('b%21-RIj2DuyvEyV1T4NlOaMHk8XkS_I8MdFlUCq1BlcjgmhRfAj3-Z8RY2VpuvV_tpd')/root/delta",
    "@odata.deltaLink":
      "https://graph.microsoft.com/v1.0/drives/b!-RIj2DuyvEyV1T4NlOaMHk8XkS_I8MdFlUCq1BlcjgmhRfAj3-Z8RY2VpuvV_tpd/root/delta?token=MzslMzM7MzslMzsyOzM7MDszNzM4NzI5OzA7MDswOzA7MDszMDUyNjc4OzA7MDswOzA7MTt0",
    value: [
      {
        id: "01BYE5RZ6QN3ZWBTUFOFD3GSPGOHDJD36K",
        name: "Quarterly Report Q4 2024.xlsx",
        size: 2456789,
        lastModifiedDateTime: "2024-12-15T14:22:00Z",
        file: {
          mimeType:
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        },
      },
      {
        id: "01BYE5RZVEH66KGZSR7PD5TW5UP5RTBE65",
        name: "New Document.docx",
        size: 12345,
        lastModifiedDateTime: "2025-01-09T10:00:00Z",
        file: {
          mimeType:
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        },
      },
      {
        id: "01BYE5RZOPFA43SGGL2FML2K25GTTW36RF",
        deleted: {
          state: "deleted",
        },
      },
    ],
  },
};

export const listDriveItemsExamplePayload = listChildrenExamplePayload;

export const getItemByIdExamplePayload = getItemExamplePayload;

export const listFoldersExamplePayload = {
  result: [
    { label: "Project Files", key: "01BYE5RZO3JLEX4CPVXX7HNUY2NLXTHTR3" },
  ],
};

export const listFilesInDirectoryExamplePayload = {
  result: [
    {
      label: "Quarterly Report Q4 2024.xlsx",
      key: "01BYE5RZ6QN3ZWBTUFOFD3GSPGOHDJD36K",
    },
  ],
};

export const selectDriveItemExamplePayload = {
  result: [
    { label: "Project Files", key: "01BYE5RZO3JLEX4CPVXX7HNUY2NLXTHTR3" },
    {
      label: "Quarterly Report Q4 2024.xlsx",
      key: "01BYE5RZ6QN3ZWBTUFOFD3GSPGOHDJD36K",
    },
  ],
};

export const selectFoldersFromDrivesExamplePayload = {
  result: [
    {
      object: {
        label: "OneDrive / Project Files",
        key: "b!-RIj2DuyvEyV1T4NlOaMHk8XkS_I8MdFlUCq1BlcjgmhRfAj3-Z8RY2VpuvV_tpd:01BYE5RZO3JLEX4CPVXX7HNUY2NLXTHTR3",
      },
    },
  ],
};
