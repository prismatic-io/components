import type { TriggerPayload } from "@prismatic-io/spectral";








export const getCurrentUserExamplePayload = {
  data: {
    userById: {
      lastName: "Smith",
      email: "john.smith@example.com",
      firstName: "John",
      id: "1234567890abcdef12345678",
      primaryCompany: {
        id: "abcdef1234567890abcdef12",
        name: "ExampleCorp",
      },
    },
  },
};

export const listCompanyUsersExamplePayload = {
  data: {
    id: "abcdef1234567890abcdef12",
    name: "ExampleCorp",
    users: [
      {
        email: "john.doe@example.com",
        id: "1234567890abcdef12345678",
        firstName: "John",
        lastName: "Doe",
        created: "2024-06-14T14:57:37.227Z",
        role: "ADMINISTRATOR",
        title: "CEO",
        lastLogin: "2024-06-24T16:11:02.889Z",
      },
    ],
  },
};

export const getComponentByIdExamplePayload = {
  data: {
    componentsByIds: [
      {
        id: "abcdef1234567890abcdef12",
        cpn: {
          displayValue: "123-45678",
        },
        created: "2024-06-14T14:58:29.791Z",
        category: "Integrated Circuit",
        archived: false,
        customSpecs: [],
        description:
          "A high-performance integrated circuit for advanced applications.",
        documentLinks: [],
        eid: "20-4567-B2",
        family: "IC",
        images: [
          {
            mime: "JPEG",
            creator: {
              email: "john.doe@example.com",
            },
            name: "ic_image.jpg",
            src: "https://example.com/ic_image.jpg",
          },
        ],
        legacyCpn: "123-45678",
        lastModified: "2024-06-14T14:58:30.229Z",
        manufacturers: [],
        name: "High-Performance IC",
        primarySource: {
          dpn: "DP1234",
          distributor: "Distributor Inc.",
          manufacturer: "IC Manufacturer Ltd.",
          minQuantity: 10,
          mpn: "MP1234",
          unitPrice: 5.99,
        },
        specs: [],
        status: "PRODUCTION",
        revisionValue: "1",
        workflowState: "Approved",
        vendorId: "V1234",
        creator: {
          id: "1234567890abcdef12345678",
          email: "john.doe@example.com",
          firstName: "John",
          lastName: "Doe",
        },
        revisionHistory: [
          {
            id: "abcdef1234567890abcdef34",
            cpn: {
              displayValue: "123-45678",
            },
            revisionValue: "1",
          },
        ],
        children: [
          {
            component: {
              id: "abcdef1234567890abcdef56",
            },
          },
          {
            component: {
              id: "abcdef1234567890abcdef78",
            },
          },
        ],
        modified: false,
        imageIds: ["abcdef1234567890abcdef90"],
      },
    ],
  },
};

export const createChangeOrderExamplePayload = {
  data: {
    createChangeOrder: {
      id: "abcdef1234567890abcdef12",
      con: {
        displayValue: "ECO-12345",
      },
      description: "Initial creation of the change order for testing purposes.",
      name: "Initial Change Order",
      status: "DRAFT",
      type: "ECO",
      created: "2024-06-24T22:31:27.808Z",
      creator: {
        email: "john.doe@example.com",
        id: "1234567890abcdef12345678",
        firstName: "John",
        lastName: "Doe",
      },
    },
  },
};

export const listChangeOrdersExamplePayload = {
  data: {
    changeOrders: {
      connection: {
        edges: [
          {
            node: {
              con: {
                id: "abcdef1234567890abcdef12",
                displayValue: "ECO-12345",
              },
              id: "abcdef1234567890abcdef34",
              name: "PCB Revision for Rev B Release",
              type: "ECO",
              description:
                "Engineering change order to update PCB layout for Rev B manufacturing release.",
              documentLinks: [],
              status: "DRAFT",
              resolution: "NONE",
              erpOptions: null,
              created: "2024-06-24T22:31:27.808Z",
              creator: {
                email: "john.doe@example.com",
                id: "1234567890abcdef12345678",
                firstName: "John",
                lastName: "Doe",
              },
              approvalType: "FIRST_IN",
              lastModified: "2024-06-24T22:31:27.808Z",
            },
          },
        ],
      },
    },
  },
};

export const listComponentsExamplePayload = {
  data: [
    {
      id: "666c5a8828e82100081595b0",
      name: 'CONN HEADER 10POS DUAL .05", Keying Shroud, SMD',
      mass: null,
      created: "2024-06-14T14:58:16.638Z",
      lastModified: "2024-06-14T14:58:18.069Z",
    },
  ],
};

export const rawRequestExamplePayload = {
  data: {
    componentsByIds: [
      {
        id: "abcdef1234567890abcdef12",
        name: "High-Performance IC",
      },
    ],
  },
};

export const pollChangesExamplePayload = {
  payload: {
    headers: {},
    queryParameters: {},
    rawBody: {
      data: "",
      contentType: "application/json",
    },
    body: {
      data: {
        created: [
          {
            id: "666c5a8828e82100081595b0",
            name: "High-Performance IC",
            created: "2024-06-14T14:58:16.638Z",
            lastModified: "2024-06-14T14:58:16.638Z",
          },
        ],
        updated: [
          {
            id: "666c5a9528e821000815990e",
            name: "Precision Resistor 10k",
            created: "2024-06-10T09:12:04.118Z",
            lastModified: "2024-06-14T14:58:18.069Z",
          },
        ],
      },
    },
    pathFragment: "",
    webhookUrls: {
      "Polling Flow": "https://hooks.example.com/trigger/EXAMPLE",
    },
    webhookApiKeys: {
      "Polling Flow": ["example-api-key"],
    },
    invokeUrl: "https://hooks.example.com/trigger/EXAMPLE",
    executionId: "SW5zdGFuY2VFeGVjdXRpb246MTIzNDU=",
    customer: {
      id: "Q3VzdG9tZXI6MTIzNDU=",
      externalId: "example-customer-external-id",
      name: "Example Customer",
    },
    instance: {
      id: "SW5zdGFuY2U6MTIzNDU=",
      name: "Example Instance",
    },
    user: {
      id: "VXNlcjoxMjM0NQ==",
      externalId: "example-user-external-id",
      name: "Example User",
      email: "user@example.com",
    },
  } as unknown as TriggerPayload,
  polledNoChanges: false,
};
