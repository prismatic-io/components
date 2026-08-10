export const rawRequestExamplePayload = {
  data: {
    statusCode: 200,
    contentType: "application/json",
    headers: {
      "content-type": "application/json",
      "rest-framework-version": "3",
    },
    body: {
      items: [
        {
          PersonId: 100000012345678,
          PersonNumber: "955160008186257",
          DisplayName: "Jane Smith",
        },
      ],
      count: 1,
      hasMore: false,
      limit: 25,
      offset: 0,
    },
  },
};
