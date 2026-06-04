export const retrieveCommentExamplePayload = {
  data: {
    id: "553c3ef8b8cdcd1501ba1238",
    author: {
      id: "553c3ef8b8cdcd1501ba123a",
      created: "2026-04-15T22:51:00.519Z",
      email: "test@test.test",
      isAdmin: false,
      name: "Sally Doe",
      url: "https://your-company.canny.io/admin/users/sally-doe",
      userID: "1234",
    },
    board: {
      created: "2026-04-15T22:51:00.519Z",
      id: "553c3ef8b8cdcd1501ba1234",
      name: "Feature Requests",
      postCount: 123,
      url: "https://your-company.canny.io/admin/board/feature-requests",
    },
    created: "2026-04-15T22:51:00.519Z",
    imageURLs: [
      "https://canny.io/images/93fc5808937760b82c3dc00aa5cd86b8.png",
      "https://canny.io/images/316e5600645b81e4be287a52d506dbfd.jpg",
    ],
    internal: false,
    likeCount: 2,
    mentions: [],
    parentID: "553c3ef8b8cdcd1501ba3333",
    post: {
      category: {
        id: "553c3ef8b8cdcd1501ba2234",
        name: "Dashboard",
        postCount: 42,
        url: "https://your-company.canny.io/admin/board/feature-requests?category=dashboard",
      },
      commentCount: 2,
      eta: "February 2026",
      id: "553c3ef8b8cdcd1501ba4444",
      imageURLs: [],
      jira: {
        linkedIssues: [
          {
            id: "123",
            key: "ID-123",
            url: "https://your-company.atlassian.net/browse/ID-123",
          },
        ],
      },
      linear: {
        linkedIssueIDs: ["ID-123", "ID-345"],
      },
      score: 13,
      status: "planned",
      tags: [
        {
          id: "553c3ef8b8cdcd1501ba3234",
          name: "iOS",
          postCount: 15,
          url: "https://your-company.canny.io/admin/board/feature-requests?tags=ios",
        },
      ],
      title: "post-title",
      url: "https://your-company.canny.io/admin/board/feature-requests/p/post-title",
    },
    private: false,
    reactions: {
      like: 2,
    },
    value: "Some cool comment",
  },
};

export const listCommentsExamplePayload = {
  data: {
    cursor: "eyJhZnRlciI6eyJfaWQiOiI1NTNjM2VmOGI4Y2RjZD...",
    hasNextPage: true,
    items: [
      {
        id: "553c3ef8b8cdcd1501ba1238",
        author: {
          id: "553c3ef8b8cdcd1501ba123a",
          created: "2026-04-15T22:51:00.520Z",
          email: "test@test.test",
          isAdmin: false,
          name: "Sally Doe",
          url: "https://your-company.canny.io/admin/users/sally-doe",
          userID: "1234",
        },
        board: {
          created: "2026-04-15T22:51:00.520Z",
          id: "553c3ef8b8cdcd1501ba1234",
          name: "Feature Requests",
          postCount: 123,
          url: "https://your-company.canny.io/admin/board/feature-requests",
        },
        created: "2026-04-15T22:51:00.520Z",
        imageURLs: [
          "https://canny.io/images/93fc5808937760b82c3dc00aa5cd86b8.png",
          "https://canny.io/images/316e5600645b81e4be287a52d506dbfd.jpg",
        ],
        internal: false,
        likeCount: 2,
        mentions: [],
        parentID: "553c3ef8b8cdcd1501ba3333",
        post: {
          category: {
            id: "553c3ef8b8cdcd1501ba2234",
            name: "Dashboard",
            postCount: 42,
            url: "https://your-company.canny.io/admin/board/feature-requests?category=dashboard",
          },
          commentCount: 2,
          id: "553c3ef8b8cdcd1501ba4444",
          imageURLs: [],
          jira: {
            linkedIssues: [
              {
                id: "123",
                key: "ID-123",
                url: "https://your-company.atlassian.net/browse/ID-123",
              },
            ],
          },
          linear: {
            linkedIssueIDs: ["ID-123", "ID-345"],
          },
          score: 13,
          status: "planned",
          tags: [
            {
              id: "553c3ef8b8cdcd1501ba3234",
              name: "iOS",
              postCount: 15,
              url: "https://your-company.canny.io/admin/board/feature-requests?tags=ios",
            },
          ],
          title: "post-title",
          url: "https://your-company.canny.io/admin/board/feature-requests/p/post-title",
        },
        private: false,
        reactions: {
          like: 2,
        },
        status: null,
        value: "Some cool comment",
      },
    ],
  },
};

export const createCommentExamplePayload = {
  data: { id: "553c3ef8b8cdcd1501ba2222" },
};

export const deleteCommentExamplePayload = { data: "success" };
