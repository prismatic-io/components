export const createCustomObjectExamplePayload = {
  data: {
    id: "2116144016",
    createdAt: "2024-01-15T18:07:11.390Z",
    updatedAt: "2024-01-15T18:09:07.555Z",
    properties: [
      {
        updatedAt: "2024-01-15T18:07:11.802Z",
        createdAt: "2024-01-15T18:07:11.802Z",
        name: "inventory_number",
        label: "Inventory Number",
        type: "string",
        fieldType: "text",
        groupName: "equipment_information",
        displayOrder: 1,
        calculated: false,
        externalOptions: false,
        archived: false,
        hasUniqueValue: true,
        description: "",
        options: [],
      },
      {
        updatedAt: "2024-01-15T18:07:11.802Z",
        createdAt: "2024-01-15T18:07:11.802Z",
        name: "purchase_date",
        label: "Purchase Date",
        type: "date",
        fieldType: "date",
        groupName: "equipment_information",
        displayOrder: 2,
        calculated: false,
        externalOptions: false,
        archived: false,
        hasUniqueValue: false,
        description: "",
        options: [],
      },
    ],
    associations: [
      {
        id: "789",
        fromObjectTypeId: "2-116144016",
        toObjectTypeId: "0-1",
        name: "equipment_to_contact",
      },
    ],
    labels: {
      singular: "Equipment",
      plural: "Equipment Items",
    },
    requiredProperties: ["inventory_number"],
    searchableProperties: ["inventory_number", "purchase_date"],
    primaryDisplayProperty: "inventory_number",
    fullyQualifiedName: "p12345678_equipment",
    name: "equipment",
    objectTypeId: "2-116144016",
    allowsSensitiveProperties: false,
    archived: false,
    secondaryDisplayProperties: [],
  },
};

export const deleteCustomObjectExamplePayload = { data: "" };

export const getCustomObjectExamplePayload = createCustomObjectExamplePayload;

export const listCustomObjectsExamplePayload = {
  data: {
    results: [
      createCustomObjectExamplePayload.data,
      {
        id: "2117255127",
        createdAt: "2024-01-16T09:12:33.120Z",
        updatedAt: "2024-01-16T09:15:22.340Z",
        properties: [
          {
            updatedAt: "2024-01-16T09:12:33.450Z",
            createdAt: "2024-01-16T09:12:33.450Z",
            name: "service_contract_number",
            label: "Service Contract Number",
            type: "string",
            fieldType: "text",
            groupName: "contract_information",
            displayOrder: 1,
            calculated: false,
            externalOptions: false,
            archived: false,
            hasUniqueValue: true,
            description: "",
            options: [],
          },
        ],
        associations: [
          {
            id: "790",
            fromObjectTypeId: "2-117255127",
            toObjectTypeId: "0-2",
            name: "contract_to_company",
          },
        ],
        labels: {
          singular: "Service Contract",
          plural: "Service Contracts",
        },
        requiredProperties: ["service_contract_number"],
        searchableProperties: ["service_contract_number"],
        primaryDisplayProperty: "service_contract_number",
        fullyQualifiedName: "p12345678_service_contract",
        name: "service_contract",
        objectTypeId: "2-117255127",
        allowsSensitiveProperties: false,
        archived: false,
        secondaryDisplayProperties: [],
      },
    ],
  },
};

export const updateCustomObjectExamplePayload = {
  data: {
    id: "2116144016",
    createdAt: "2024-01-15T18:07:11.390Z",
    updatedAt: "2024-01-15T18:09:07.555Z",
    labels: {
      singular: "Equipment",
      plural: "Equipment Items",
    },
    requiredProperties: ["inventory_number"],
    searchableProperties: ["inventory_number", "purchase_date"],
    secondaryDisplayProperties: [],
    primaryDisplayProperty: "inventory_number",
    fullyQualifiedName: "p12345678_equipment",
    name: "equipment",
    objectTypeId: "2-116144016",
    allowsSensitiveProperties: false,
    archived: false,
    portalId: 12345678,
  },
};
