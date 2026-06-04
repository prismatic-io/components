


















export const webhookNotificationExamplePayload = {
  body: {
    data: {
      value: [
        {
          subscriptionId: "38031b7d-16b1-448a-8e68-68b8aec62315",
          clientState: "my-client-state-token",
          changeType: "updated",
          resource: "/me/drive/root",
          subscriptionExpirationDateTime: "2025-01-15T14:30:00.0000000Z",
          resourceData: {
            "@odata.type": "#Microsoft.Graph.DriveItem",
            "@odata.id":
              "/drives/b!-RIj2DuyvEyV1T4NlOaMHk8XkS_I8MdFlUCq1BlcjgmhRfAj3-Z8RY2VpuvV_tpd/items/01BYE5RZ6QN3ZWBTUFOFD3GSPGOHDJD36K",
            id: "01BYE5RZ6QN3ZWBTUFOFD3GSPGOHDJD36K",
          },
          tenantId: "84df9e7f-e9f6-40af-b435-aaaaaaaaaaaa",
        },
        {
          subscriptionId: "38031b7d-16b1-448a-8e68-68b8aec62315",
          clientState: "my-client-state-token",
          changeType: "updated",
          resource: "/me/drive/root",
          subscriptionExpirationDateTime: "2025-01-15T14:30:00.0000000Z",
          resourceData: {
            "@odata.type": "#Microsoft.Graph.DriveItem",
            "@odata.id":
              "/drives/b!-RIj2DuyvEyV1T4NlOaMHk8XkS_I8MdFlUCq1BlcjgmhRfAj3-Z8RY2VpuvV_tpd/items/01BYE5RZ5MYLM2SMX75ZBIPQZIHT6OAYPB",
            id: "01BYE5RZ5MYLM2SMX75ZBIPQZIHT6OAYPB",
          },
          tenantId: "84df9e7f-e9f6-40af-b435-aaaaaaaaaaaa",
        },
      ],
    },
  },
};







export const createSubscriptionExamplePayload = {
  data: {
    "@odata.context":
      "https://graph.microsoft.com/v1.0/$metadata#subscriptions/$entity",
    id: "38031b7d-16b1-448a-8e68-68b8aec62315",
    resource: "/me/drive/root",
    changeType: "updated",
    clientState: "client-specific-string",
    notificationUrl: "https://hooks.example.com/trigger/SW5z",
    expirationDateTime: "2025-01-15T11:23:00.0000000Z",
    creatorId: "6219df3c-04d4-4b39-b2a4-ad162a5dcb8f",
    latestSupportedTlsVersion: "v1_2",
  },
};







export const listSubscriptionsExamplePayload = {
  data: {
    "@odata.context":
      "https://graph.microsoft.com/v1.0/$metadata#subscriptions",
    value: [
      {
        id: "38031b7d-16b1-448a-8e68-68b8aec62315",
        resource: "/me/drive/root",
        changeType: "updated",
        clientState: "client-specific-string",
        notificationUrl: "https://hooks.example.com/trigger/SW5z",
        expirationDateTime: "2025-01-15T11:23:00.0000000Z",
        creatorId: "6219df3c-04d4-4b39-b2a4-ad162a5dcb8f",
        latestSupportedTlsVersion: "v1_2",
      },
      {
        id: "482b9c1e-9a7f-4f3d-8b2a-1c5e6f7d8e9f",
        resource: "/me/drive/items/01BYE5RZ6QN3ZWBTUFOFD3GSPGOHDJD36K",
        changeType: "created,updated,deleted",
        clientState: "another-client-state",
        notificationUrl: "https://hooks.example.com/trigger/ABC123",
        expirationDateTime: "2025-01-20T09:15:00.0000000Z",
        creatorId: "6219df3c-04d4-4b39-b2a4-ad162a5dcb8f",
        latestSupportedTlsVersion: "v1_2",
      },
    ],
  },
};







export const renewSubscriptionExamplePayload = {
  data: {
    "@odata.context":
      "https://graph.microsoft.com/v1.0/$metadata#subscriptions/$entity",
    id: "38031b7d-16b1-448a-8e68-68b8aec62315",
    resource: "/me/drive/root",
    changeType: "updated",
    clientState: "client-specific-string",
    notificationUrl: "https://hooks.example.com/trigger/SW5z",
    expirationDateTime: "2025-02-15T11:23:00.0000000Z",
    creatorId: "6219df3c-04d4-4b39-b2a4-ad162a5dcb8f",
    latestSupportedTlsVersion: "v1_2",
  },
};







export const deleteSubscriptionExamplePayload = {
  data: {},
};







export const deleteAllSubscriptionsExamplePayload = {
  data: {},
};








export const getDriveExamplePayload = {
  data: {
    "@odata.context":
      "https://graph.microsoft.com/v1.0/$metadata#drives/$entity",
    id: "b!-RIj2DuyvEyV1T4NlOaMHk8XkS_I8MdFlUCq1BlcjgmhRfAj3-Z8RY2VpuvV_tpd",
    createdDateTime: "2024-01-15T10:30:00Z",
    lastModifiedDateTime: "2025-01-10T14:22:00Z",
    name: "OneDrive",
    driveType: "business",
    webUrl:
      "https://contoso-my.sharepoint.com/personal/john_contoso_com/Documents",
    description: "John Doe's OneDrive",
    createdBy: {
      user: {
        displayName: "System Account",
      },
    },
    lastModifiedBy: {
      user: {
        email: "john.doe@contoso.com",
        id: "efee1b77-fb3b-4f65-99d6-274c11914d12",
        displayName: "John Doe",
      },
    },
    owner: {
      user: {
        email: "john.doe@contoso.com",
        id: "efee1b77-fb3b-4f65-99d6-274c11914d12",
        displayName: "John Doe",
      },
    },
    quota: {
      deleted: 482560,
      remaining: 1099217352704,
      state: "normal",
      total: 1099511627776,
      used: 293892160,
    },
  },
};









export const listDrivesExamplePayload = {
  data: {
    "@odata.context": "https://graph.microsoft.com/v1.0/$metadata#drives",
    value: [
      {
        id: "b!-RIj2DuyvEyV1T4NlOaMHk8XkS_I8MdFlUCq1BlcjgmhRfAj3-Z8RY2VpuvV_tpd",
        createdDateTime: "2024-01-15T10:30:00Z",
        lastModifiedDateTime: "2025-01-10T14:22:00Z",
        name: "OneDrive",
        driveType: "business",
        webUrl:
          "https://contoso-my.sharepoint.com/personal/john_contoso_com/Documents",
        owner: {
          user: {
            email: "john.doe@contoso.com",
            id: "efee1b77-fb3b-4f65-99d6-274c11914d12",
            displayName: "John Doe",
          },
        },
        quota: {
          deleted: 482560,
          remaining: 1099217352704,
          state: "normal",
          total: 1099511627776,
          used: 293892160,
        },
      },
      {
        id: "b!-XYz3EfghijKlmnO4PqrStuvWxYzAbCdEfGhIjKlMnOpQrStUvWxYz0123456789",
        createdDateTime: "2024-02-01T08:15:00Z",
        lastModifiedDateTime: "2025-01-09T16:45:00Z",
        name: "Project Documents",
        driveType: "documentLibrary",
        webUrl:
          "https://contoso.sharepoint.com/sites/ProjectTeam/Shared%20Documents",
        owner: {
          group: {
            email: "project-team@contoso.com",
            id: "b8dfe8c7-b6a5-4e3d-8c7b-1a2b3c4d5e6f",
            displayName: "Project Team",
          },
        },
        quota: {
          deleted: 1024000,
          remaining: 26843545600,
          state: "normal",
          total: 27487790694,
          used: 643221094,
        },
      },
    ],
  },
};








export const getDriveItemExamplePayload = {
  data: {
    "@odata.context":
      "https://graph.microsoft.com/v1.0/$metadata#drives('b%21-RIj2DuyvEyV1T4NlOaMHk8XkS_I8MdFlUCq1BlcjgmhRfAj3-Z8RY2VpuvV_tpd')/items/$entity",
    "@microsoft.graph.downloadUrl":
      "https://contoso-my.sharepoint.com/personal/john_contoso_com/_layouts/15/download.aspx?UniqueId=abc123",
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
      id: "01BYE5RZROOT",
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







export const getFolderItemExamplePayload = {
  data: {
    "@odata.context":
      "https://graph.microsoft.com/v1.0/$metadata#drives('b%21-RIj2DuyvEyV1T4NlOaMHk8XkS_I8MdFlUCq1BlcjgmhRfAj3-Z8RY2VpuvV_tpd')/items/$entity",
    id: "01BYE5RZFOLDER123456789ABCDEF",
    createdDateTime: "2024-01-15T10:30:00Z",
    lastModifiedDateTime: "2025-01-10T09:15:00Z",
    name: "Project Files",
    size: 0,
    webUrl:
      "https://contoso-my.sharepoint.com/personal/john_contoso_com/Documents/Project%20Files",
    cTag: "aYzpCOUIyRUI2UU5YLUJUVUZPNDI1WkU1WDVGQ0dPSERKRDM2Sy4yNTc",
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
        email: "jane.smith@contoso.com",
        id: "a1b2c3d4-e5f6-7890-ab12-cd34ef567890",
        displayName: "Jane Smith",
      },
    },
    parentReference: {
      driveId:
        "b!-RIj2DuyvEyV1T4NlOaMHk8XkS_I8MdFlUCq1BlcjgmhRfAj3-Z8RY2VpuvV_tpd",
      driveType: "business",
      id: "01BYE5RZROOT",
      path: "/drive/root:",
    },
    folder: {
      childCount: 12,
    },
    fileSystemInfo: {
      createdDateTime: "2024-01-15T10:30:00Z",
      lastModifiedDateTime: "2025-01-10T09:15:00Z",
    },
  },
};







export const listChildrenExamplePayload = {
  data: {
    "@odata.context":
      "https://graph.microsoft.com/v1.0/$metadata#drives('b%21-RIj2DuyvEyV1T4NlOaMHk8XkS_I8MdFlUCq1BlcjgmhRfAj3-Z8RY2VpuvV_tpd')/items('01BYE5RZROOT')/children",
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
          id: "01BYE5RZROOT",
          path: "/drive/root:",
        },
      },
      {
        id: "01BYE5RZFOLDER123456789ABCDEF",
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
          id: "01BYE5RZROOT",
          path: "/drive/root:",
        },
      },
    ],
  },
};







export const uploadFileExamplePayload = getDriveItemExamplePayload;







export const updateFileExamplePayload = {
  data: {
    ...getDriveItemExamplePayload.data,
    lastModifiedDateTime: "2025-01-09T16:30:00Z",
    name: "Quarterly Report Q4 2024 - Updated.xlsx",
  },
};







export const moveFileExamplePayload = {
  data: {
    ...getDriveItemExamplePayload.data,
    lastModifiedDateTime: "2025-01-09T17:45:00Z",
    parentReference: {
      driveId:
        "b!-RIj2DuyvEyV1T4NlOaMHk8XkS_I8MdFlUCq1BlcjgmhRfAj3-Z8RY2VpuvV_tpd",
      driveType: "business",
      id: "01BYE5RZFOLDER123456789ABCDEF",
      path: "/drive/root:/Project Files",
    },
  },
};







export const deleteFileExamplePayload = {
  data: {},
};







export const downloadFileExamplePayload = {
  data: Buffer.from("Sample file content..."),
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
        id: "01BYE5RZ789ABCDEFGHIJKLMNOPQR",
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
          id: "01ABCDEF123456789",
          name: "Shared Presentation.pptx",
          file: {
            mimeType:
              "application/vnd.openxmlformats-officedocument.presentationml.presentation",
          },
          parentReference: {
            driveId:
              "b!-XYz3EfghijKlmnO4PqrStuvWxYzAbCdEfGhIjKlMnOpQrStUvWxYz0123456789",
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






export const listSharedFilesExamplePayload = listSharedExamplePayload;







export const listChangesExamplePayload = {
  data: {
    "@odata.context":
      "https://graph.microsoft.com/v1.0/$metadata#drives('b%21-RIj2DuyvEyV1T4NlOaMHk8XkS_I8MdFlUCq1BlcjgmhRfAj3-Z8RY2VpuvV_tpd')/root/delta",
    "@odata.deltaLink":
      "https://graph.microsoft.com/v1.0/drives/b!-RIj2DuyvEyV1T4NlOaMHk8XkS_I8MdFlUCq1BlcjgmhRfAj3-Z8RY2VpuvV_tpd/root/delta?token=1230919asd190410jlka",
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
        id: "01BYE5RZ789ABCDEFGHIJKLMNOPQR",
        name: "New Document.docx",
        size: 12345,
        lastModifiedDateTime: "2025-01-09T10:00:00Z",
        file: {
          mimeType:
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        },
      },
      {
        id: "01BYE5RZDELETED123456789",
        deleted: {
          state: "deleted",
        },
      },
    ],
  },
};







export const listSitesExamplePayload = {
  data: {
    "@odata.context": "https://graph.microsoft.com/v1.0/$metadata#sites",
    value: [
      {
        id: "contoso.sharepoint.com,da60e844-ba1d-49bc-b4d4-d5e36bab29de,712a596e-90a1-49e3-9b48-bfa80bee8740",
        createdDateTime: "2024-01-15T10:30:00Z",
        lastModifiedDateTime: "2025-01-10T14:22:00Z",
        name: "Project Team Site",
        displayName: "Project Team",
        webUrl: "https://contoso.sharepoint.com/sites/ProjectTeam",
        siteCollection: {
          hostname: "contoso.sharepoint.com",
        },
      },
      {
        id: "contoso.sharepoint.com,b5e30c91-2c43-4a5e-8c7b-1a2b3c4d5e6f,c8d7e6f5-4a3b-2c1d-0e9f-8a7b6c5d4e3f",
        createdDateTime: "2024-03-20T08:15:00Z",
        lastModifiedDateTime: "2025-01-08T11:30:00Z",
        name: "Marketing Hub",
        displayName: "Marketing Hub",
        webUrl: "https://contoso.sharepoint.com/sites/MarketingHub",
        siteCollection: {
          hostname: "contoso.sharepoint.com",
        },
      },
    ],
  },
};







export const getSiteExamplePayload = {
  data: {
    "@odata.context":
      "https://graph.microsoft.com/v1.0/$metadata#sites/$entity",
    id: "contoso.sharepoint.com,da60e844-ba1d-49bc-b4d4-d5e36bab29de,712a596e-90a1-49e3-9b48-bfa80bee8740",
    createdDateTime: "2024-01-15T10:30:00Z",
    lastModifiedDateTime: "2025-01-10T14:22:00Z",
    name: "Project Team Site",
    displayName: "Project Team",
    description: "Collaboration site for the project team",
    webUrl: "https://contoso.sharepoint.com/sites/ProjectTeam",
    siteCollection: {
      hostname: "contoso.sharepoint.com",
    },
  },
};







export const listGroupsExamplePayload = {
  data: {
    "@odata.context": "https://graph.microsoft.com/v1.0/$metadata#groups",
    value: [
      {
        id: "b8dfe8c7-b6a5-4e3d-8c7b-1a2b3c4d5e6f",
        createdDateTime: "2024-01-15T10:30:00Z",
        displayName: "Project Team",
        description: "Team working on the main project",
        mail: "project-team@contoso.com",
        mailEnabled: true,
        mailNickname: "projectteam",
        securityEnabled: false,
        groupTypes: ["Unified"],
      },
      {
        id: "c9eff9d8-c7b6-5f4e-9d8c-2b3c4d5e6f7g",
        createdDateTime: "2024-02-20T08:15:00Z",
        displayName: "Engineering",
        description: "Engineering department",
        mail: "engineering@contoso.com",
        mailEnabled: true,
        mailNickname: "engineering",
        securityEnabled: true,
        groupTypes: ["Unified"],
      },
    ],
  },
};







export const findUserExamplePayload = {
  data: {
    "@odata.context": "https://graph.microsoft.com/v1.0/$metadata#users",
    value: [
      {
        id: "efee1b77-fb3b-4f65-99d6-274c11914d12",
        displayName: "John Doe",
        givenName: "John",
        surname: "Doe",
        mail: "john.doe@contoso.com",
        userPrincipalName: "john.doe@contoso.com",
        jobTitle: "Senior Engineer",
        officeLocation: "Building 2, Office 234",
        mobilePhone: "+1 (555) 123-4567",
        businessPhones: ["+1 (555) 765-4321"],
      },
      {
        id: "a1b2c3d4-e5f6-7890-ab12-cd34ef567890",
        displayName: "Jane Smith",
        givenName: "Jane",
        surname: "Smith",
        mail: "jane.smith@contoso.com",
        userPrincipalName: "jane.smith@contoso.com",
        jobTitle: "Product Manager",
        officeLocation: "Building 1, Office 101",
        mobilePhone: "+1 (555) 234-5678",
        businessPhones: ["+1 (555) 876-5432"],
      },
    ],
  },
};







export const listDriveItemsExamplePayload = listChildrenExamplePayload;







export const getItemByIdExamplePayload = getDriveItemExamplePayload;







export const rawRequestExamplePayload = getDriveExamplePayload;
