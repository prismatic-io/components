export const listStatusChangesExamplePayload = {
  data: {
    cursor: "eyJhZnRlciI6eyJfaWQiOiI1NTNjM2VmOGI4Y2RjZD...",
    hasNextPage: false,
    items: [
      {
        changeComment: {
          imageURLs: [
            "https://canny.io/images/93fc5808937760b82c3dc00aa5cd86b8.png",
            "https://canny.io/images/316e5600645b81e4be287a52d506dbfd.jpg",
          ],
          value: "The status has changed!",
        },
        changer: {
          id: "553c3ef8b8cdcd1501ba123a",
          created: "2026-04-16T01:07:22.191Z",
          email: "test@test.test",
          isAdmin: false,
          name: "Sally Doe",
          url: "https://your-company.canny.io/admin/users/sally-doe",
          userID: "1234",
        },
        created: "2026-04-16T01:07:22.191Z",
        id: "553c3ef8b8cdcd1501ba12bb",
        post: {
          category: {
            created: "2026-04-16T01:07:22.191Z",
            id: "553c3ef8b8cdcd1501ba2234",
            name: "Dashboard",
            parentID: null,
            postCount: 42,
            url: "https://your-company.canny.io/admin/board/feature-requests?category=dashboard",
          },
          commentCount: 10,
          details: "Test post details",
          id: "553c3ef8b8cdcd1501ba1238",
          imageURLs: [
            "https://canny.io/images/93fc5808937760b82c3dc00aa5cd86b8.png",
            "https://canny.io/images/316e5600645b81e4be287a52d506dbfd.jpg",
          ],
          jira: {
            linkedIssues: [
              {
                id: "123",
                key: "ID-123",
                url: "https://your-company.atlassian.net/browse/ID-123",
              },
            ],
            linkedIssueIDs: ["123"],
          },
          linear: {
            linkedIssueIDs: ["ID-123", "ID-345"],
          },
          score: 72,
          status: "in progress",
          tags: [
            {
              id: "553c3ef8b8cdcd1501ba3234",
              name: "iOS",
              postCount: 15,
              url: "https://your-company.canny.io/admin/board/feature-requests?tags=ios",
            },
          ],
          title: "An awesome feature request",
          url: "https://your-company.canny.io/admin/board/feature-requests/p/an-awesome-feature-request",
        },
        status: "in progress",
      },
    ],
  },
};
