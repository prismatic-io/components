import type { PaginatedResponse } from "../types";

export const getCampaignExamplePayload = {
  data: {
    createdDate: "2026-02-13T18:52:46",
    modifiedDate: "2026-02-16T22:11:05",
    id: "145",
    name: "Example Marketing Campaign",
    description: "Example campaign for product launch",
    campaignCode: "EXAMPLE2024",
    color: "ffc7c7",
    favorite: false,
  },
};

export const listCampaignsExamplePayload: { data: PaginatedResponse } = {
  data: {
    count: 12,
    page: 1,
    pageSize: 1,
    links: {
      self: {
        href: "/v1/campaigns?$page=1&$pagesize=1",
      },
      next: {
        href: "/v1/campaigns?$page=2&$pagesize=1",
      },
    },
    items: [
      {
        createdDate: "2026-02-13T18:52:46",
        modifiedDate: "2026-02-13T18:52:46",
        id: "145",
        name: "New campaign",
        description: "New",
        campaignCode: "SUMMER",
        color: "ffc7c7",
        favorite: false,
      },
    ],
  },
};

export const createCampaignExamplePayload = getCampaignExamplePayload;

export const deleteCampaignExamplePayload = {
  data: null,
};
