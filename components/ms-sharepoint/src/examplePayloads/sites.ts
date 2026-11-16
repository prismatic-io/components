const exampleTeamSite = {
  createdDateTime: "2026-03-02T15:40:55Z",
  description: "Collaboration space for the Example project team",
  displayName: "Example Team Site",
  id: "example.sharepoint.com,6c44888f-5883-4ef0-a542-d21a802cfea6,ed2d5d06-e192-4047-afa6-a5d7f25b3418",
  lastModifiedDateTime: "2026-11-06T10:15:00Z",
  name: "ExampleSite",
  webUrl: "https://example.sharepoint.com/sites/ExampleSite",
  siteCollection: {
    hostname: "example.sharepoint.com",
  },
};

const financeSite = {
  createdDateTime: "2026-01-19T09:12:31Z",
  description: "Budgets, forecasts and reporting for the Finance team",
  displayName: "Finance",
  id: "example.sharepoint.com,f210e7b8-56ea-4325-9280-8efde5827091,d6c83e27-8aa3-4878-ba35-b33e20735b99",
  lastModifiedDateTime: "2026-11-05T17:42:10Z",
  name: "Finance",
  webUrl: "https://example.sharepoint.com/sites/Finance",
  siteCollection: {
    hostname: "example.sharepoint.com",
  },
};

export const listFollowedSitesExamplePayload = {
  data: {
    "@odata.context": "https://graph.microsoft.com/v1.0/$metadata#sites",
    value: [
      {
        ...exampleTeamSite,
        sharepointIds: {
          siteId: "6c44888f-5883-4ef0-a542-d21a802cfea6",
          webId: "ed2d5d06-e192-4047-afa6-a5d7f25b3418",
        },
      },
    ],
  },
};

export const listSitesExamplePayload = {
  data: {
    "@odata.context": "https://graph.microsoft.com/v1.0/$metadata#sites",
    value: [exampleTeamSite, financeSite],
  },
};

export const listSitesDataSourceExamplePayload = {
  result: [
    {
      key: "example.sharepoint.com,6c44888f-5883-4ef0-a542-d21a802cfea6,ed2d5d06-e192-4047-afa6-a5d7f25b3418",
      label: "Example Team Site",
    },
    {
      key: "example.sharepoint.com,f210e7b8-56ea-4325-9280-8efde5827091,d6c83e27-8aa3-4878-ba35-b33e20735b99",
      label: "Finance",
    },
  ],
};

export const selectSitesExamplePayload = {
  result: listSitesDataSourceExamplePayload.result.map((site) => ({ object: site })),
};

export const getRootSiteExamplePayload = {
  data: {
    "@odata.context": "https://graph.microsoft.com/v1.0/$metadata#sites/$entity",
    createdDateTime: "2025-08-11T18:20:04Z",
    description: "Company news, policies and resources",
    displayName: "Example Intranet",
    id: "example.sharepoint.com,f2e05cb0-4d0e-4222-9cce-fc5d16d86056,fa04bf87-b36d-4f48-bfc3-24f344dff053",
    lastModifiedDateTime: "2026-11-07T08:03:27Z",
    name: "Example Intranet",
    root: {},
    webUrl: "https://example.sharepoint.com",
    siteCollection: {
      hostname: "example.sharepoint.com",
    },
  },
};

export const getSiteExamplePayload = {
  data: {
    "@odata.context": "https://graph.microsoft.com/v1.0/$metadata#sites/$entity",
    ...exampleTeamSite,
  },
};
