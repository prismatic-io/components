export const retrieveBoardExamplePayload = {
  data: {
    id: "553c3ef8b8cdcd1501ba1234",
    created: "2017-07-15T22:11:00.000Z",
    isPrivate: true,
    name: "Feature Requests",
    postCount: 123,
    privateComments: false,
    url: "https://your-company.canny.io/admin/board/feature-requests",
  },
};

export const listBoardsExamplePayload = {
  data: {
    boards: [
      {
        id: "553c3ef8b8cdcd1501ba1234",
        created: "2026-04-15T22:51:00.517Z",
        isPrivate: true,
        name: "Feature Requests",
        postCount: 123,
        privateComments: false,
        token: "11111111-2222-3333-4444-555555555555",
        url: "https://your-company.canny.io/admin/board/feature-requests",
      },
      {
        id: "553c3ef8b8cdcd1501ba1238",
        created: "2026-04-15T22:51:00.517Z",
        isPrivate: false,
        name: "Bug Reports",
        postCount: 42,
        privateComments: true,
        token: "11111111-2222-3333-4444-555555555555",
        url: "https://your-company.canny.io/admin/board/bug-reports",
      },
    ],
  },
};
