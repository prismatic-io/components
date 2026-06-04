






const pipelineData = {
  id: 1074820,
  name: "Sales Pipeline",
  created_at: "2023-06-15T10:00:00Z",
  updated_at: "2024-11-20T14:35:12Z",
  disabled: false,
};


export const listPipelinesExamplePayload = {
  data: {
    items: [
      {
        data: pipelineData,
        meta: {
          type: "pipeline",
        },
      },
    ],
    meta: {
      type: "collection",
      count: 1,
      links: {
        self: "https://api.getbase.com/v2/pipelines?page=1&per_page=25",
        first_page: "https://api.getbase.com/v2/pipelines?page=1&per_page=25",
        next_page: null,
      },
    },
  },
};
