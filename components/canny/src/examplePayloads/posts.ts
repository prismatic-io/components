export const retrievePostExamplePayload = {
  data: {
    id: "553c3ef8b8cdcd1501ba1238",
    author: {
      id: "553c3ef8b8cdcd1501ba123a",
      created: "2026-04-16T01:07:22.189Z",
      email: "test@test.test",
      isAdmin: true,
      name: "Sally Doe",
      url: "https://your-company.canny.io/admin/users/sally-doe",
      userID: "1234",
    },
    board: {
      created: "2026-04-16T01:07:22.189Z",
      id: "553c3ef8b8cdcd1501ba1234",
      name: "Feature Requests",
      postCount: 123,
      url: "https://your-company.canny.io/admin/board/feature-requests",
    },
    by: {
      id: "524c3ef8b8cdcd1501ba246b",
      created: "2026-04-16T01:07:22.189Z",
      email: "test@john.test",
      isAdmin: true,
      name: "John Doe",
      url: "https://your-company.canny.io/admin/users/john-doe",
      userID: "5678",
    },
    category: {
      id: "553c3ef8b8cdcd1501ba2234",
      name: "Dashboard",
      parentID: null,
      postCount: 42,
      url: "https://your-company.canny.io/admin/board/feature-requests?category=dashboard",
    },
    changeComment: {
      value: "The status has changed!",
      imageURLs: [
        "https://canny.io/images/93fc5808937760b82c3dc00aa5cd86b2.png",
      ],
    },
    clickup: {
      linkedTasks: [
        {
          id: "123",
          linkID: "2334jdsai23234io22",
          name: "Clickup issue",
          postID: "553c3ef8b8cdcd1501ba1238",
          status: "to do",
          url: "https://app.clickup.com/t/123456",
        },
      ],
    },
    commentCount: 10,
    created: "2026-04-16T01:07:22.189Z",
    customFields: [
      {
        id: "553c3ef8b8cdcd1501ba2238",
        name: "priority",
        value: "high",
      },
    ],
    details: "Test post details",
    eta: "February 2020",
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
    },
    linear: {
      linkedIssueIDs: ["ID-123", "ID-345"],
    },
    mergeHistory: [
      {
        created: "2026-04-16T01:07:22.189Z",
        post: {
          created: "2026-04-16T01:07:22.189Z",
          details: "Awesome feature post details",
          id: "553c3ef8b8cdcd1501ba6789",
          imageURLs: [],
          title: "Another awesome feature request",
        },
      },
    ],
    owner: {
      id: "553c3ef8b8cdcd1501ba123a",
      created: "2026-04-16T01:07:22.189Z",
      email: "test@test.test",
      isAdmin: true,
      name: "Sally Doe",
      url: "https://your-company.canny.io/admin/users/sally-doe",
      userID: "1234",
    },
    score: 72,
    status: "in progress",
    statusChangedAt: "2026-04-16T01:07:22.189Z",
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
};

export const listPostsExamplePayload = {
  data: {
    hasMore: true,
    posts: [
      {
        id: "553c3ef8b8cdcd1501ba1238",
        author: {
          id: "553c3ef8b8cdcd1501ba123a",
          created: "2026-04-16T01:07:22.189Z",
          email: "test@test.test",
          isAdmin: false,
          name: "Sally Doe",
          url: "https://your-company.canny.io/admin/users/sally-doe",
          userID: "1234",
        },
        board: {
          created: "2026-04-16T01:07:22.189Z",
          id: "553c3ef8b8cdcd1501ba1234",
          name: "Feature Requests",
          postCount: 123,
          url: "https://your-company.canny.io/admin/board/feature-requests",
        },
        by: {
          id: "524c3ef8b8cdcd1501ba246b",
          created: "2026-04-16T01:07:22.189Z",
          email: "test@john.test",
          isAdmin: true,
          name: "John Doe",
          url: "https://your-company.canny.io/admin/users/john-doe",
          userID: "5678",
        },
        category: {
          id: "553c3ef8b8cdcd1501ba2234",
          name: "Dashboard",
          parentID: null,
          postCount: 42,
          url: "https://your-company.canny.io/admin/board/feature-requests?category=dashboard",
        },
        clickup: {
          linkedTasks: [
            {
              id: "123",
              linkID: "2334jdsai23234io22",
              name: "Clickup issue",
              postID: "553c3ef8b8cdcd1501ba1238",
              status: "to do",
              url: "https://app.clickup.com/t/123456",
            },
          ],
        },
        commentCount: 10,
        created: "2026-04-16T01:07:22.189Z",
        customFields: [
          {
            id: "553c3ef8b8cdcd1501ba2238",
            name: "priority",
            value: "high",
          },
        ],
        details: "Test post details",
        eta: "February 2020",
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
        },
        linear: {
          linkedIssueIDs: ["ID-123", "ID-345"],
        },
        mergeHistory: [
          {
            created: "2026-04-16T01:07:22.189Z",
            post: {
              created: "2026-04-16T01:07:22.189Z",
              details: "Awesome feature post details",
              id: "553c3ef8b8cdcd1501ba6789",
              imageURLs: [],
              title: "Another awesome feature request",
            },
          },
        ],
        owner: {
          id: "553c3ef8b8cdcd1501ba123a",
          created: "2026-04-16T01:07:22.189Z",
          email: "test@test.test",
          isAdmin: true,
          name: "Sally Doe",
          url: "https://your-company.canny.io/admin/users/sally-doe",
          userID: "1234",
        },
        score: 72,
        status: "in progress",
        statusChangedAt: "2026-04-16T01:07:22.189Z",
        tags: [
          {
            id: "553c3ef8b8cdcd1501ba3234",
            name: "iOS",
            postCount: 15,
            url: "https://your-company.canny.io/admin/board/feature-requests?tags=ios",
          },
        ],
        title: "An awesome feature request",
        url: "https://your-company.canny.io/admin/board/feature-requests/p/post-title",
      },
    ],
  },
};

export const createPostExamplePayload = {
  data: {
    id: "553c3ef8b8cdcd1501ba5678",
    url: "https://example.canny.io/admin/board/features/p/add-dark-mode-support",
  },
};

export const updatePostExamplePayload = { data: "success" };
export const deletePostExamplePayload = { data: "success" };
export const changePostStatusExamplePayload = {
  data: {
    id: "553c3ef8b8cdcd1501ba1238",
    author: {
      id: "553c3ef8b8cdcd1501ba123a",
      created: "2017-07-15T22:11:00.000Z",
      email: "test@test.test",
      isAdmin: false,
      name: "Sally Doe",
      url: "https://your-company.canny.io/admin/users/sally-doe",
      userID: "1234",
    },
    board: {
      created: "2017-07-10T11:22:00.000Z",
      id: "553c3ef8b8cdcd1501ba1234",
      name: "Feature Requests",
      postCount: 123,
      url: "https://your-company.canny.io/admin/board/feature-requests",
    },
    by: {
      id: "524c3ef8b8cdcd1501ba246b",
      created: "2017-07-15T22:11:00.000Z",
      email: "test@john.test",
      isAdmin: true,
      name: "John Doe",
      url: "https://your-company.canny.io/admin/users/john-doe",
      userID: "5678",
    },
    category: {
      id: "553c3ef8b8cdcd1501ba2234",
      name: "Dashboard",
      postCount: 42,
      parentID: null,
      url: "https://your-company.canny.io/admin/board/feature-requests?category=dashboard",
    },
    changeComment: {
      value: "The status has changed!",
      imageURLs: [
        "https://canny.io/images/93fc5808937760b82c3dc00aa5cd86b2.png",
      ],
    },
    commentCount: 10,
    created: "2017-08-22T13:32:00.000Z",
    details: "Test post details",
    eta: "February 2020",
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
    },
    linear: {
      linkedIssueIDs: ["ID-123", "ID-345"],
    },
    mergeHistory: [
      {
        created: "2018-06-17T22:42:37.167Z",
        post: {
          created: "2018-06-17T22:42:00.797Z",
          details: "Awesome feature post details",
          id: "553c3ef8b8cdcd1501ba6789",
          imageURLs: [],
          title: "Another awesome feature request",
        },
      },
    ],
    score: 72,
    status: "in progress",
    statusChangedAt: "2017-08-24T23:22:00.000Z",
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
};
