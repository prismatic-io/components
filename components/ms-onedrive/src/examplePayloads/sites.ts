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

export const selectSiteExamplePayload = {
  result: [
    {
      label: "Project Team",
      key: "contoso.sharepoint.com,da60e844-ba1d-49bc-b4d4-d5e36bab29de,712a596e-90a1-49e3-9b48-bfa80bee8740",
    },
  ],
};

export const selectSitesExamplePayload = {
  result: [
    {
      object: {
        label: "Project Team",
        key: "contoso.sharepoint.com,da60e844-ba1d-49bc-b4d4-d5e36bab29de,712a596e-90a1-49e3-9b48-bfa80bee8740",
      },
    },
  ],
};
