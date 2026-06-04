export const retrieveVoteExamplePayload = {
  data: {
    id: "553c3ef8b8cdcd1501ba123b",
    board: {
      created: "2017-08-30T13:32:01.000Z",
      id: "553c3ef8b8cdcd1501ba4400",
      name: "Feature Requests",
      postCount: 99,
      url: "https://your-company.canny.io/admin/board/feature-requests",
    },
    by: null,
    created: "2017-08-30T13:32:01.000Z",
    post: {
      category: {
        id: "553c3ef8b8cdcd1501ba2234",
        name: "Dashboard",
        postCount: 42,
        url: "https://your-company.canny.io/admin/board/feature-requests?category=dashboard",
      },
      commentCount: 2,
      eta: "February 2020",
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
    voter: {
      id: "553c3ef8b8cdcd1501ba123a",
      created: "2017-08-30T13:32:00.000Z",
      email: "test@test.test",
      isAdmin: false,
      name: "Sally Doe",
      url: "https://your-company.canny.io/admin/users/sally-doe",
      userID: "1234",
    },
    votePriority: "Important",
  },
};

export const listVotesExamplePayload = {
  data: {
    cursor: "eyJhZnRlciI6eyJfaWQiOiI1NTNjM2VmOGI4Y2RjZD...",
    hasNextPage: true,
    items: [
      {
        id: "553c3ef8b8cdcd1501ba123b",
        board: {
          created: "2026-04-16T01:07:22.193Z",
          id: "553c3ef8b8cdcd1501ba1234",
          name: "Feature Requests",
          postCount: 123,
          url: "https://your-company.canny.io/admin/board/feature-requests",
        },
        by: null,
        created: "2026-04-16T01:07:22.193Z",
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
        voter: {
          id: "553c3ef8b8cdcd1501ba123a",
          created: "2026-04-16T01:07:22.193Z",
          email: "test@test.test",
          isAdmin: false,
          name: "Sally Doe",
          url: "https://your-company.canny.io/admin/users/sally-doe",
          userID: "1234",
        },
        votePriority: "No priority",
        zendeskTicket: {
          id: "2",
          created: "2018-12-14T19:20:25Z",
          subject: "Ticket subject",
          description: "Ticket description",
          url: "https://your-company.zendesk.com/api/v2/tickets/2.json",
        },
      },
    ],
  },
};

export const createVoteExamplePayload = { data: "success" };

export const deleteVoteExamplePayload = { data: "success" };
