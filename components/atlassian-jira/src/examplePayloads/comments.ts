export const getCommentsExamplePayload = {
  data: {
    startAt: 0,
    maxResults: 1,
    total: 1,
    comments: [
      {
        self: "https://your-domain.atlassian.net/rest/api/3/issue/10010/comment/10000",
        id: "10000",
        author: {
          self: "https://your-domain.atlassian.net/rest/api/3/user?accountId=5b10a2844c20165700ede21g",
          accountId: "5b10a2844c20165700ede21g",
          displayName: "Mia Krystof",
          active: false,
        },
        body: {
          type: "doc",
          version: 1,
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eget venenatis elit. Duis eu justo eget augue iaculis fermentum. Sed semper quam laoreet nisi egestas at posuere augue semper.",
                },
              ],
            },
          ],
        },
        updateAuthor: {
          self: "https://your-domain.atlassian.net/rest/api/3/user?accountId=5b10a2844c20165700ede21g",
          accountId: "5b10a2844c20165700ede21g",
          displayName: "Mia Krystof",
          active: false,
        },
        created: "2021-01-17T12:34:00.000+0000",
        updated: "2021-01-18T23:45:00.000+0000",
        visibility: {
          type: "role",
          value: "Administrators",
          identifier: "Administrators",
        },
      },
    ],
  },
};

export const addCommentExamplePayload = {
  data: {
    self: "https://your-domain.atlassian.net/rest/api/3/issue/10010/comment/10001",
    id: "10001",
    author: {
      self: "https://your-domain.atlassian.net/rest/api/3/user?accountId=5b10a2844c20165700ede21g",
      accountId: "5b10a2844c20165700ede21g",
      displayName: "Jane Doe",
      active: true,
    },
    body: {
      type: "doc",
      version: 1,
      content: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "This is a new comment added to the issue.",
            },
          ],
        },
      ],
    },
    updateAuthor: {
      self: "https://your-domain.atlassian.net/rest/api/3/user?accountId=5b10a2844c20165700ede21g",
      accountId: "5b10a2844c20165700ede21g",
      displayName: "Jane Doe",
      active: true,
    },
    created: "2021-01-17T12:34:00.000+0000",
    updated: "2021-01-17T12:34:00.000+0000",
  },
};

export const updateCommentExamplePayload = {
  data: {
    self: "https://your-domain.atlassian.net/rest/api/3/issue/10010/comment/10001",
    id: "10001",
    author: {
      self: "https://your-domain.atlassian.net/rest/api/3/user?accountId=5b10a2844c20165700ede21g",
      accountId: "5b10a2844c20165700ede21g",
      displayName: "Jane Doe",
      active: true,
    },
    body: {
      type: "doc",
      version: 1,
      content: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "This is an updated comment.",
            },
          ],
        },
      ],
    },
    updateAuthor: {
      self: "https://your-domain.atlassian.net/rest/api/3/user?accountId=5b10a2844c20165700ede21g",
      accountId: "5b10a2844c20165700ede21g",
      displayName: "Jane Doe",
      active: true,
    },
    created: "2021-01-17T12:34:00.000+0000",
    updated: "2021-01-18T10:15:00.000+0000",
  },
};


export const deleteCommentExamplePayload = {
  data: {},
};
