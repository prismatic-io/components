export const cancelImportExamplePayload = {
  data: {
    completedAt: "2024-01-15T05:02:32.700Z",
    requestedAt: "2024-01-15T05:02:30.120Z",
    startedAt: "2024-01-15T05:02:30.450Z",
    links: {},
    status: "CANCELED",
  },
};

export const listActiveImportsExamplePayload = {
  data: [
    {
      importTemplate: {
        templateType: "admin_defined",
        templateId: 12345,
      },
      createdAt: "2024-01-15T05:02:32.668Z",
      metadata: {
        counters: {
          TOTAL_ROWS: 250,
          CREATED_OBJECTS: 150,
          UPDATED_OBJECTS: 100,
          UNIQUE_OBJECTS_WRITTEN: 250,
          PROPERTY_VALUES_EMITTED: 1250,
        },
        fileIds: ["8765432"],
        objectLists: [
          {
            listId: "1234",
            objectType: "contacts",
          },
        ],
      },
      importRequestJson: {},
      importSource: "API",
      mappedObjectTypeIds: ["0-1"],
      importName: "Q1 2024 Contact Import",
      state: "DONE",
      id: "9876543",
      optOutImport: false,
      updatedAt: "2024-01-15T05:15:45.890Z",
    },
  ],
};

export const importCRMDataExamplePayload = {
  data: {
    importTemplate: {
      templateType: "admin_defined",
      templateId: 12345,
    },
    createdAt: "2024-01-15T05:02:32.679Z",
    metadata: {
      counters: {
        TOTAL_ROWS: 250,
        CREATED_OBJECTS: 150,
        UPDATED_OBJECTS: 100,
        UNIQUE_OBJECTS_WRITTEN: 250,
        PROPERTY_VALUES_EMITTED: 1250,
      },
      fileIds: ["8765432"],
      objectLists: [
        {
          listId: "1234",
          objectType: "contacts",
        },
      ],
    },
    importRequestJson: {},
    importSource: "API",
    mappedObjectTypeIds: ["0-1"],
    importName: "Q1 2024 Contact Import",
    state: "PROCESSING",
    id: "9876543",
    optOutImport: false,
    updatedAt: "2024-01-15T05:02:32.679Z",
  },
};

export const getAnImportExamplePayload = {
  data: {
    importTemplate: {
      templateType: "admin_defined",
      templateId: 12345,
    },
    createdAt: "2024-01-15T05:02:32.691Z",
    metadata: {
      counters: {
        TOTAL_ROWS: 250,
        CREATED_OBJECTS: 150,
        UPDATED_OBJECTS: 100,
        UNIQUE_OBJECTS_WRITTEN: 250,
        PROPERTY_VALUES_EMITTED: 1250,
      },
      fileIds: ["8765432"],
      objectLists: [
        {
          listId: "1234",
          objectType: "contacts",
        },
      ],
    },
    importRequestJson: {},
    importSource: "API",
    mappedObjectTypeIds: ["0-1"],
    importName: "Q1 2024 Contact Import",
    state: "DONE",
    id: "9876543",
    optOutImport: false,
    updatedAt: "2024-01-15T05:15:45.890Z",
  },
};

export const exportCRMDataExamplePayload = {
  data: {
    id: "12345678",
    links: {
      status:
        "https://api.hubapi.com/crm/exports/2026-09/export/async/tasks/12345678/status",
    },
  },
};
