import { BASE_URL } from "../constants";
export const listAssociationTypesExamplePayload = {
  data: {
    results: [
      {
        name: "Primary",
        id: "1",
        category: "HUBSPOT_DEFINED",
        typeId: 1,
        label: "Primary",
      },
      {
        name: "341",
        id: "341",
        category: "HUBSPOT_DEFINED",
        typeId: 341,
        label: null,
      },
      {
        name: "Decision Maker",
        id: "19",
        category: "USER_DEFINED",
        typeId: 19,
        label: "Decision Maker",
      },
    ],
  },
};
export const createAssociationsExamplePayload = {
  data: {
    completedAt: "2024-01-15T23:59:28.273Z",
    requestedAt: "2024-01-15T23:59:28.120Z",
    startedAt: "2024-01-15T23:59:28.150Z",
    links: {},
    results: [
      {
        from: {
          id: "65059681027",
        },
        to: {
          id: "98765432101",
        },
        type: "Decision Maker",
        fromObjectId: "65059681027",
        fromObjectTypeId: "0-1",
        toObjectId: "98765432101",
        toObjectTypeId: "0-2",
        labels: ["Decision Maker"],
      },
    ],
    status: "COMPLETE",
  },
};
export const readAssociationsExamplePayload = {
  data: {
    completedAt: "2024-01-15T23:59:28.283Z",
    requestedAt: "2024-01-15T23:59:28.120Z",
    startedAt: "2024-01-15T23:59:28.150Z",
    links: {},
    results: [
      {
        from: {
          id: "65059681027",
        },
        paging: {
          next: {
            link: `${BASE_URL}/crm/associations/2026-09/contacts/companies/batch/read?after=98765432102`,
            after: "98765432102",
          },
        },
        to: [
          {
            id: "98765432101",
            type: "Decision Maker",
            toObjectId: "98765432101",
            associationTypes: [
              { category: "USER_DEFINED", typeId: 19, label: "Decision Maker" },
            ],
          },
          {
            id: "98765432102",
            type: "1",
            toObjectId: "98765432102",
            associationTypes: [{ category: "HUBSPOT_DEFINED", typeId: 1 }],
          },
        ],
      },
    ],
    status: "COMPLETE",
  },
};
export const archiveAssociationsExamplePayload = {
  data: {
    completedAt: "2024-01-15T23:59:28.273Z",
    requestedAt: "2024-01-15T23:59:28.120Z",
    startedAt: "2024-01-15T23:59:28.150Z",
    links: {},
    results: [],
    status: "COMPLETE",
  },
};
