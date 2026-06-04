






const stageData = {
  id: 4817283,
  name: "Qualified",
  category: "Qualified",
  active: true,
  position: 2,
  likelihood: 30,
  pipeline_id: 1074820,
  created_at: "2023-06-15T10:00:00Z",
  updated_at: "2024-11-20T14:35:12Z",
};


export const listStagesExamplePayload = {
  data: {
    items: [
      {
        data: stageData,
        meta: {
          type: "stage",
        },
      },
    ],
    meta: {
      type: "collection",
      count: 1,
      links: {
        self: "https://api.getbase.com/v2/stages?page=1&per_page=25",
        first_page: "https://api.getbase.com/v2/stages?page=1&per_page=25",
        next_page: null,
      },
    },
  },
};







export const getStagesStreamExamplePayload = {
  data: {
    items: [
      {
        data: {
          id: 4817283,
        },
        meta: {
          type: "stage",
          sync: {
            event_type: "updated",
            ack_key: "Stage-4817283-1",
            revision: 2,
          },
        },
      },
    ],
    meta: {
      type: "collection",
      count: 1,
      links: {},
    },
  },
};
