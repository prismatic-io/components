
export const createCollectionExamplePayload = {
  data: {
    id: "customers",
    indexingPolicy: {
      indexingMode: "consistent",
      automatic: true,
      includedPaths: [
        {
          path: "/*",
        },
      ],
      excludedPaths: [
        {
          path: '/"_etag"/?',
        },
      ],
    },
    partitionKey: {
      paths: ["/partition1"],
      kind: "Hash",
    },
    conflictResolutionPolicy: {
      mode: "LastWriterWins",
      conflictResolutionPath: "/_ts",
      conflictResolutionProcedure: "",
    },
    geospatialConfig: {
      type: "Geography",
    },
    _rid: "kVEpANSIJac=",
    _ts: 1753820539,
    _self: "dbs/kVEpAA==/colls/kVEpANSIJac=/",
    _etag: '"00000e0c-0000-4d00-0000-68892d7b0000"',
    _docs: "docs/",
    _sprocs: "sprocs/",
    _triggers: "triggers/",
    _udfs: "udfs/",
    _conflicts: "conflicts/",
  },
};

export const deleteCollectionExamplePayload = {
  data: {
    success: true,
    message: "Collection myCollection deleted successfully",
  },
};

export const getCollectionExamplePayload = {
  data: {
    id: "products",
    indexingPolicy: {
      indexingMode: "consistent",
      automatic: true,
      includedPaths: [
        {
          path: "/*",
        },
      ],
      excludedPaths: [
        {
          path: '/"_etag"/?',
        },
      ],
      fullTextIndexes: [],
    },
    partitionKey: {
      paths: ["/category"],
      kind: "Hash",
    },
    uniqueKeyPolicy: {
      uniqueKeys: [],
    },
    conflictResolutionPolicy: {
      mode: "LastWriterWins",
      conflictResolutionPath: "/_ts",
      conflictResolutionProcedure: "",
    },
    geospatialConfig: {
      type: "Geography",
    },
    _rid: "kVEpAK0lM0g=",
    _ts: 1753733880,
    _self: "dbs/kVEpAA==/colls/kVEpAK0lM0g=/",
    _etag: '"0000a80a-0000-4d00-0000-6887daf80000"',
    _docs: "docs/",
    _sprocs: "sprocs/",
    _triggers: "triggers/",
    _udfs: "udfs/",
    _conflicts: "conflicts/",
    computedProperties: [],
  },
};

export const listCollectionsExamplePayload = {
  data: {
    _rid: "kVEpAA==",
    DocumentCollections: [getCollectionExamplePayload.data],
    _count: 1,
  },
};


export const deleteDatabaseExamplePayload = {
  data: {
    success: true,
    message: "Database myDatabase deleted successfully",
  },
};

export const getDatabaseExamplePayload = {
  data: {
    id: "cosmicworks",
    _rid: "kVEpAA==",
    _self: "dbs/kVEpAA==/",
    _etag: '"0000a60a-0000-4d00-0000-6887daea0000"',
    _colls: "colls/",
    _users: "users/",
    _ts: 1753733866,
  },
};

export const listDatabasesExamplePayload = {
  data: {
    _rid: "",
    Databases: [getDatabaseExamplePayload.data],
    _count: 1,
  },
};

export const createDatabaseExamplePayload = {
  data: getDatabaseExamplePayload.data,
};


export const createDocumentExamplePayload = {
  data: {
    id: "1",
    partition1: "value1",
    _rid: "kVEpAMF-HdkCAAAAAAAAAA==",
    _self: "dbs/kVEpAA==/colls/kVEpAMF-Hdk=/docs/kVEpAMF-HdkCAAAAAAAAAA==/",
    _etag: '"d5003222-0000-4d00-0000-6889cb6c0000"',
    _attachments: "attachments/",
    _ts: 1753860972,
  },
};

export const deleteDocumentExamplePayload = {
  data: {
    success: true,
    message: "Document doc1 deleted successfully",
  },
};

export const getDocumentExamplePayload = {
  data: createDocumentExamplePayload.data,
};

export const listDocumentsExamplePayload = {
  data: {
    _rid: "kVEpAK0lM0g=",
    Documents: [getDocumentExamplePayload.data],
    _count: 1,
    continuationToken: `{"token":"kVEpAK0lM0gBAAAAAAAAAA==","range":{"min":"","max":"FF"}}`,
  },
};

export const updateDocumentExamplePayload = {
  data: {
    id: "1",
    name: "Sample Document",
    partition1: "value1",
    _rid: "kVEpAMF-HdkBAAAAAAAAAA==",
    _self: "dbs/kVEpAA==/colls/kVEpAMF-Hdk=/docs/kVEpAMF-HdkBAAAAAAAAAA==/",
    _etag: '"d500f323-0000-4d00-0000-6889ce9d0000"',
    _attachments: "attachments/",
    _ts: 1753861789,
  },
};
