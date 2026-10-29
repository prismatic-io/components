export const retrieveCategoryExamplePayload = {
  data: {
    id: "553c3ef8b8cdcd1501ba12bb",
    board: {
      created: "2026-04-15T22:51:00.517Z",
      id: "553c3ef8b8cdcd1501ba4400",
      name: "Feature Requests",
      postCount: 99,
      url: "https://your-company.canny.io/admin/board/feature-requests",
    },
    created: "2026-04-15T22:51:00.517Z",
    name: "Example Category Name",
    parentID: "552c3ef8b8cdcd1501ba12bb",
    postCount: 12,
    url: "https://your-company.canny.io/admin/board/feature-requests?category=example-category-name",
  },
};

export const listCategoriesExamplePayload = {
  data: {
    categories: [
      {
        id: "553c3ef8b8cdcd1501ba12bb",
        board: {
          created: "2026-04-15T22:51:00.517Z",
          id: "553c3ef8b8cdcd1501ba4400",
          name: "Feature Requests",
          postCount: 99,
          url: "https://your-company.canny.io/admin/board/feature-requests",
        },
        created: "2026-04-15T22:51:00.517Z",
        name: "Example Category Name",
        parentID: "552c3ef8b8cdcd1501ba12bb",
        postCount: 12,
        url: "https://your-company.canny.io/admin/board/feature-requests?category=example-category-name",
      },
    ],
    hasMore: false,
  },
};

export const createCategoryExamplePayload = {
  data: { id: "553c3ef8b8cdcd1501baabcd" },
};

export const deleteCategoryExamplePayload = { data: "success" };
