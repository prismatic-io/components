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
        id: "b!TRoKwUFeCUSVTVEU5ZI-ypGNMDQfkeEQRL-K9ETTz1Dl314XbQy5dGPkmhF5Xz8B",
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

export const listDrivesByGroupExamplePayload = listDrivesExamplePayload;

export const listDrivesBySiteExamplePayload = listDrivesExamplePayload;

export const listDrivesByUserExamplePayload = listDrivesExamplePayload;

export const listDrivesDataSourceExamplePayload = {
  result: [
    {
      label: "OneDrive",
      key: "b!-RIj2DuyvEyV1T4NlOaMHk8XkS_I8MdFlUCq1BlcjgmhRfAj3-Z8RY2VpuvV_tpd",
    },
  ],
};

export const selectDrivesFromSitesExamplePayload = {
  result: [
    {
      object: {
        label: "Project Team / Project Documents",
        key: "b!TRoKwUFeCUSVTVEU5ZI-ypGNMDQfkeEQRL-K9ETTz1Dl314XbQy5dGPkmhF5Xz8B",
      },
    },
  ],
};
