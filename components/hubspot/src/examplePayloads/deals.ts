import { BASE_URL } from "../constants";
export const listDealsExamplePayload = {
  data: {
    results: [
      {
        id: "87654321098",
        properties: {
          amount: "50000.00",
          closedate: "2024-03-31T00:00:00.000Z",
          createdate: "2024-01-10T09:15:30.234Z",
          dealname: "Q1 2024 Enterprise Contract",
          dealstage: "presentationscheduled",
          hs_lastmodifieddate: "2024-01-15T14:22:10.456Z",
          hs_object_id: "87654321098",
          pipeline: "default",
        },
        createdAt: "2024-01-10T09:15:30.234Z",
        updatedAt: "2024-01-15T14:22:10.456Z",
        archived: false,
      },
    ],
    paging: {
      next: {
        after: "87654321099",
        link: `${BASE_URL}/crm/objects/2026-09/deals?limit=10&after=87654321099`,
      },
    },
  },
};
export const getDealByIdExamplePayload = {
  data: {
    id: "87654321098",
    properties: {
      amount: "50000.00",
      closedate: "2024-03-31T00:00:00.000Z",
      createdate: "2024-01-10T09:15:30.234Z",
      dealname: "Q1 2024 Enterprise Contract",
      dealstage: "presentationscheduled",
      hs_lastmodifieddate: "2024-01-15T14:22:10.456Z",
      hs_object_id: "87654321098",
      pipeline: "default",
    },
    createdAt: "2024-01-10T09:15:30.234Z",
    updatedAt: "2024-01-15T14:22:10.456Z",
    archived: false,
  },
};
export const deleteDealExamplePayload = { data: "" };
export const searchDealsExamplePayload = {
  data: {
    total: 1,
    paging: {
      next: {
        link: "?after=NTI1Cg%3D%3D",
        after: "NTI1Cg%3D%3D",
      },
    },
    results: [
      {
        createdAt: "2024-01-15T00:24:54.571Z",
        archived: false,
        archivedAt: null,
        propertiesWithHistory: {
          dealname: [
            {
              sourceId: "CRM_UI",
              sourceType: "CRM_UI",
              sourceLabel: "CRM UI",
              updatedByUserId: 45678,
              value: "New Business Opportunity",
              timestamp: "2024-01-15T00:24:54.571Z",
            },
          ],
        },
        id: "87654321100",
        properties: {
          dealname: "New Business Opportunity",
          amount: "25000.00",
          closedate: "2024-02-28T00:00:00.000Z",
          dealstage: "qualifiedtobuy",
          pipeline: "default",
        },
        updatedAt: "2024-01-15T00:24:54.571Z",
      },
    ],
  },
};
export const createDealExamplePayload = {
  data: {
    createdAt: "2024-01-15T00:24:54.526Z",
    archived: false,
    archivedAt: null,
    propertiesWithHistory: {
      dealname: [
        {
          sourceId: "API",
          sourceType: "API",
          sourceLabel: "API",
          updatedByUserId: 0,
          value: "Software License Renewal",
          timestamp: "2024-01-15T00:24:54.526Z",
        },
      ],
      amount: [
        {
          sourceId: "API",
          sourceType: "API",
          sourceLabel: "API",
          updatedByUserId: 0,
          value: "15000.00",
          timestamp: "2024-01-15T00:24:54.526Z",
        },
      ],
    },
    id: "87654321101",
    properties: {
      dealname: "Software License Renewal",
      amount: "15000.00",
      closedate: "2024-04-15T00:00:00.000Z",
      dealstage: "appointmentscheduled",
      pipeline: "default",
    },
    updatedAt: "2024-01-15T00:24:54.526Z",
  },
};
export const updateDealExamplePayload = {
  data: {
    createdAt: "2024-01-15T00:24:54.543Z",
    archived: false,
    archivedAt: null,
    propertiesWithHistory: {
      dealstage: [
        {
          sourceId: "API",
          sourceType: "API",
          sourceLabel: "API",
          updatedByUserId: 0,
          value: "contractsent",
          timestamp: "2024-01-16T11:20:15.340Z",
        },
      ],
      amount: [
        {
          sourceId: "API",
          sourceType: "API",
          sourceLabel: "API",
          updatedByUserId: 0,
          value: "17500.00",
          timestamp: "2024-01-16T11:20:15.340Z",
        },
      ],
    },
    id: "87654321101",
    properties: {
      dealname: "Software License Renewal",
      amount: "17500.00",
      closedate: "2024-04-15T00:00:00.000Z",
      dealstage: "contractsent",
      pipeline: "default",
    },
    updatedAt: "2024-01-16T11:20:15.340Z",
  },
};
