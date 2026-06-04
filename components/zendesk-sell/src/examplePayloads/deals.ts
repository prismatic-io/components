






const dealData = {
  id: 8150614,
  creator_id: 1290481,
  owner_id: 1290481,
  name: "Acme Corp - Enterprise License",
  value: 125000,
  currency: "USD",
  hot: true,
  stage_id: 4817283,
  last_stage_change_at: "2025-01-08T11:20:35Z",
  last_stage_change_by_id: 1290481,
  last_activity_at: "2025-01-10T16:42:18Z",
  source_id: 2940175,
  loss_reason_id: null,
  unqualified_reason_id: null,
  dropbox_email: "dropbox@67432.deals.futuresimple.com",
  contact_id: 47912050,
  organization_id: 47912048,
  estimated_close_date: "2025-03-31",
  customized_win_likelihood: 75,
  tags: ["enterprise", "q1-target"],
  custom_fields: {
    contract_length: "24 months",
  },
  created_at: "2024-10-22T08:15:30Z",
  updated_at: "2025-01-10T16:42:18Z",
  added_at: "2024-10-22T08:15:30Z",
};


export const createDealExamplePayload = {
  data: {
    data: dealData,
    meta: {
      type: "deal",
    },
  },
};


export const getDealExamplePayload = {
  data: {
    data: dealData,
    meta: {
      type: "deal",
    },
  },
};


export const updateDealExamplePayload = {
  data: {
    data: dealData,
    meta: {
      type: "deal",
    },
  },
};


export const listDealsExamplePayload = {
  data: {
    items: [
      {
        data: dealData,
        meta: {
          type: "deal",
        },
      },
    ],
    meta: {
      type: "collection",
      count: 1,
      links: {
        self: "https://api.getbase.com/v2/deals?page=1&per_page=25",
        first_page: "https://api.getbase.com/v2/deals?page=1&per_page=25",
        next_page: null,
      },
    },
  },
};


export const deleteDealExamplePayload = {
  data: null,
};







export const getDealsStreamExamplePayload = {
  data: {
    items: [
      {
        data: {
          id: 8150614,
        },
        meta: {
          type: "deal",
          sync: {
            event_type: "updated",
            ack_key: "Deal-8150614-1",
            revision: 5,
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
