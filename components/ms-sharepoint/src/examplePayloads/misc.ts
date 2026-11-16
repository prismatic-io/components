export const rawRequestExamplePayload = {
  data: {
    "@odata.context": "https://graph.microsoft.com/v1.0/$metadata#sites",
    value: [
      {
        id: "example.sharepoint.com,a1b2c3d4-e5f6-7890-abcd-ef1234567890,f1e2d3c4-b5a6-7890-1234-567890abcdef",
        displayName: "Example Team Site",
        name: "ExampleTeamSite",
        createdDateTime: "2025-06-15T08:30:00Z",
        lastModifiedDateTime: "2025-12-09T14:22:00Z",
        webUrl: "https://example.sharepoint.com/sites/ExampleTeamSite",
        siteCollection: {
          hostname: "example.sharepoint.com",
        },
      },
    ],
  },
};
