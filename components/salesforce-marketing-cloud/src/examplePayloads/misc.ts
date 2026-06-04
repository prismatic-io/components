export const rawRequestExamplePayload = {
  data: {
    links: {
      self: "/v1/customobjectdata/token/70de54a3-1e37-4340-a2fc-d09f809b4d2d/rowset?$page=1",
    },
    requestToken: "70de54a3-1e37-4340-a2fc-d09f809b4d2d",
    tokenExpireDateUtc: "2026-02-18T04:59:10.917",
    customObjectId: "179dede7-637a-ef11-a5af-48df37deb009",
    customObjectKey: "09850BAC-D44C-452B-A182-CD9A695E4070",
    pageSize: 1,
    page: 1,
    count: 1,
    top: 0,
    items: [
      {
        keys: {},
        values: {
          email: "user@example.com",
          name: "Example User",
          insider_id: "example-id-123456789",
        },
      },
    ],
  },
};
