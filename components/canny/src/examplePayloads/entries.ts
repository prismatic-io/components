export const listEntriesExamplePayload = {
  data: {
    hasMore: false,
    entries: [
      {
        id: "553c3ef8b8cdcd1501ba123b",
        created: "2026-04-15T22:51:00.518Z",
        labels: [
          {
            id: "553c3ef8b8cdcd1501ba8761",
            created: "2026-04-15T22:51:00.518Z",
            entryCount: 4,
            name: "Feature",
            url: "https://your-company.canny.io/admin/changelog?labels=feature",
          },
        ],
        lastSaved: "2026-04-15T22:51:00.518Z",
        markdownDetails: "# heading\n**bold**\n[link](https://canny.io)",
        plaintextDetails: "heading\nbold\nlink",
        posts: [
          {
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
        ],
        publishedAt: "2026-04-15T22:51:00.518Z",
        reactions: {
          like: 2,
        },
        scheduledFor: null,
        status: "published",
        title: "Entry title",
        types: ["new", "improved"],
        url: "https://your-company.canny.io/changelog/entry-title",
      },
    ],
  },
};

export const createEntryExamplePayload = {
  data: { id: "553c3ef8b8cdcd1501ba8888" },
};
