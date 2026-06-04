





















export const getAppExamplePayload = {
  data: {
    create: [
      {
        resource: "sheet",
        canCreate: true,
      },
    ],
    attributes: {
      id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
      name: "Sales Analytics",
      owner: "john.doe@company.com",
      custom: {},
      ownerId: "TiQ8GPVr8qI714Lp5ChAAFFaU24MJy69",
      encrypted: false,
      published: true,
      thumbnail: "",
      createdDate: "2023-06-15T10:30:00Z",
      description: "Monthly sales dashboard",
      originAppId: "",
      publishTime: "2023-06-20T14:45:00Z",
      dynamicColor: "",
      modifiedDate: "2024-01-10T08:20:00Z",
      lastReloadTime: "2024-01-10T07:15:00Z",
      hasSectionAccess: false,
      isDirectQueryMode: false,
    },
    privileges: ["read", "update", "delete", "reload", "export"],
  },
};





export const deleteAppExamplePayload = {
  data: null,
};







export const listSpacesExamplePayload = {
  data: {
    data: [
      {
        id: "TiQ8GPVr8qI714Lp5ChAAFFaU24MJy69",
        meta: {
          roles: ["consumer"],
          actions: ["change_owner"],
          assignableRoles: ["consumer"],
        },
        name: "Finance (dev)",
        type: "shared",
        links: {
          self: {
            href: "/api/v1/spaces/TiQ8GPVr8qI714Lp5ChAAFFaU24MJy69",
          },
          assignments: {
            href: "/api/v1/spaces/TiQ8GPVr8qI714Lp5ChAAFFaU24MJy69/assignments",
          },
        },
        ownerId: "TiQ8GPVr8qI714Lp5ChAAFFaU24MJy69",
        tenantId: "xqGQ0k66vSR8f9G7J-vYtHZQkiYrCpct",
        createdAt: "2024-01-15T10:30:00Z",
        createdBy: "TiQ8GPVr8qI714Lp5ChAAFFaU24MJy69",
        updatedAt: "2024-01-15T10:30:00Z",
        description: "Development space for Finance team applications",
      },
    ],
    meta: {
      count: 42,
    },
    links: {
      next: { href: "/api/v1/spaces?limit=10&next=cursor123" },
      prev: { href: "/api/v1/spaces?limit=10&prev=cursor456" },
      self: { href: "/api/v1/spaces" },
    },
  },
};





export const getSpaceExamplePayload = {
  data: {
    id: "TiQ8GPVr8qI714Lp5ChAAFFaU24MJy69",
    meta: {
      roles: ["contributor", "publisher"],
      actions: ["create", "read", "update", "delete", "publish"],
      assignableRoles: ["consumer", "contributor", "producer"],
    },
    name: "Finance (dev)",
    type: "managed",
    links: {
      self: {
        href: "/api/v1/spaces/TiQ8GPVr8qI714Lp5ChAAFFaU24MJy69",
      },
      assignments: {
        href: "/api/v1/spaces/TiQ8GPVr8qI714Lp5ChAAFFaU24MJy69/assignments",
      },
    },
    ownerId: "TiQ8GPVr8qI714Lp5ChAAFFaU24MJy69",
    tenantId: "xqGQ0k66vSR8f9G7J-vYtHZQkiYrCpct",
    createdAt: "2024-01-10T08:15:22Z",
    createdBy: "TiQ8GPVr8qI714Lp5ChAAFFaU24MJy69",
    updatedAt: "2024-01-20T14:45:30Z",
    description: "Centralized space for Finance team analytics and reporting",
  },
};





export const createSpaceExamplePayload = {
  data: {
    id: "TiQ8GPVr8qI714Lp5ChAAFFaU24MJy69",
    meta: {
      roles: ["publisher"],
      actions: [
        "change_owner",
        "create",
        "read",
        "update",
        "delete",
        "publish",
      ],
      assignableRoles: ["consumer", "contributor", "producer", "publisher"],
    },
    name: "Sales Analytics",
    type: "shared",
    links: {
      self: {
        href: "/api/v1/spaces/TiQ8GPVr8qI714Lp5ChAAFFaU24MJy69",
      },
      assignments: {
        href: "/api/v1/spaces/TiQ8GPVr8qI714Lp5ChAAFFaU24MJy69/assignments",
      },
    },
    ownerId: "TiQ8GPVr8qI714Lp5ChAAFFaU24MJy69",
    tenantId: "xqGQ0k66vSR8f9G7J-vYtHZQkiYrCpct",
    createdAt: "2024-01-22T09:20:15Z",
    createdBy: "TiQ8GPVr8qI714Lp5ChAAFFaU24MJy69",
    updatedAt: "2024-01-22T09:20:15Z",
    description: "Collaborative space for sales performance tracking",
  },
};





export const updateSpaceExamplePayload = {
  data: {
    id: "TiQ8GPVr8qI714Lp5ChAAFFaU24MJy69",
    meta: {
      roles: ["publisher"],
      actions: [
        "change_owner",
        "create",
        "read",
        "update",
        "delete",
        "publish",
      ],
      assignableRoles: ["consumer", "contributor", "producer"],
    },
    name: "Finance (Production)",
    type: "managed",
    links: {
      self: {
        href: "/api/v1/spaces/TiQ8GPVr8qI714Lp5ChAAFFaU24MJy69",
      },
      assignments: {
        href: "/api/v1/spaces/TiQ8GPVr8qI714Lp5ChAAFFaU24MJy69/assignments",
      },
    },
    ownerId: "TiQ8GPVr8qI714Lp5ChAAFFaU24MJy69",
    tenantId: "xqGQ0k66vSR8f9G7J-vYtHZQkiYrCpct",
    createdAt: "2024-01-10T08:15:22Z",
    createdBy: "TiQ8GPVr8qI714Lp5ChAAFFaU24MJy69",
    updatedAt: "2024-01-22T11:30:45Z",
    description: "Updated production environment for Finance applications",
  },
};





export const deleteSpaceExamplePayload = {
  data: null,
};







export const listUsersExamplePayload = {
  data: {
    data: [
      {
        id: "TiQ8GPVr8qI714Lp5ChAAFFaU24MJy69",
        name: "John Smith",
        email: "john.smith@corp.example",
        links: {
          self: {
            href: "/api/v1/users/TiQ8GPVr8qI714Lp5ChAAFFaU24MJy69",
          },
        },
        locale: "en-US",
        status: "active",
        picture: "https://corp.example/avatars/jsmith.png",
        subject: "auth0|1234asdasa6789",
        tenantId: "q3VRZ4YMixRaLKEPhkZWM-XMIDN7cO8f",
        zoneinfo: "America/New_York",
        createdAt: "2023-10-30T07:06:22Z",
        lastUpdatedAt: "2024-01-15T10:22:15Z",
        assignedRoles: [
          {
            id: "507f191e810c19729de860ea",
            name: "Analytics Developer",
            type: "custom",
            level: "user",
          },
        ],
        assignedGroups: [
          {
            id: "507f191e810c19729de860eb",
            name: "Finance Team",
          },
        ],
      },
    ],
    links: {
      next: {
        href: "/api/v1/users?next=eyJpZCI6IjUwN2YxOTFlODEwYzE5NzI5ZGU4NjBlYiJ9",
      },
      prev: {
        href: "/api/v1/users?prev=eyJpZCI6IjUwN2YxOTFlODEwYzE5NzI5ZGU4NjBlYSJ9",
      },
      self: {
        href: "/api/v1/users",
      },
    },
    totalResults: 150,
  },
};





export const getMyUserExamplePayload = {
  data: {
    id: "TiQ8GPVr8qI714Lp5ChAAFFaU24MJy69",
    name: "Jane Doe",
    email: "jane.doe@corp.example",
    links: {
      self: {
        href: "/api/v1/users/TiQ8GPVr8qI714Lp5ChAAFFaU24MJy69",
      },
    },
    locale: "en-US",
    status: "active",
    picture: "https://corp.example/avatars/jdoe.png",
    subject: "auth0|9876fedcba5432",
    tenantId: "q3VRZ4YMixRaLKEPhkZWM-XMIDN7cO8f",
    zoneinfo: "America/New_York",
    createdAt: "2022-05-12T14:30:00Z",
    lastUpdatedAt: "2024-02-20T09:15:45Z",
    assignedRoles: [
      {
        id: "507f191e810c19729de860ea",
        name: "Tenant Admin",
        type: "default",
        level: "admin",
      },
    ],
    assignedGroups: [],
  },
};







export const getDatasetExamplePayload = {
  data: {
    id: "ds-a1b2c3d4e5f6",
    qri: "qdf:qix:tenant-guid:space-guid:dataset.qvd",
    secureQri: "secure-qri-value",
    name: "Sales Data",
    description: "Annual sales records",
    technicalDescription: "Production sales dataset",
    type: "qvd",
    tags: ["sales", "financial"],
    spaceId: "617979737a9f56e49dea2e6e",
    ownerId: "TiQ8GPVr8qI714Lp5ChAAFFaU24MJy69",
    version: 5,
    tenantId: "q3VRZ4YMixRaLKEPhkZWM-XMIDN7cO8f",
    createdBy: "TiQ8GPVr8qI714Lp5ChAAFFaU24MJy69",
    createdTime: "2024-01-15T10:30:00Z",
    lastModifiedBy: "TiQ8GPVr8qI714Lp5ChAAFFaU24MJy69",
    lastModifiedTime: "2024-01-20T14:45:00Z",
    schema: {
      schemaName: "main",
      dataFields: [
        {
          name: "SalesAmount",
          dataType: {
            type: "DECIMAL",
            properties: { precision: 10, scale: 2 },
          },
          nullable: false,
          primaryKey: false,
          tags: ["metric"],
        },
      ],
    },
    dataAssetInfo: {
      id: "asset-a1b2c3",
      name: "Sales Asset",
      dataStoreInfo: {
        id: "store-d4e5f6",
        name: "Data Lake",
        type: "cloud",
      },
    },
    operational: {
      status: "active",
      rowCount: 50000,
      size: 2500000,
      lastLoadTime: "2024-01-20T12:00:00Z",
    },
  },
};





export const createDatasetExamplePayload = {
  data: {
    id: "ds-f6e5d4c3b2a1",
    qri: "qdf:qix:tenant-guid:space-guid:new-dataset.qvd",
    secureQri: "secure-qri-value",
    name: "Marketing Campaigns",
    description: "Campaign performance data",
    technicalDescription: "Marketing campaign dataset",
    type: "qvd",
    tags: ["marketing"],
    spaceId: "617979737a9f56e49dea2e6e",
    ownerId: "TiQ8GPVr8qI714Lp5ChAAFFaU24MJy69",
    version: 1,
    tenantId: "q3VRZ4YMixRaLKEPhkZWM-XMIDN7cO8f",
    createdBy: "TiQ8GPVr8qI714Lp5ChAAFFaU24MJy69",
    createdTime: "2024-01-22T09:00:00Z",
    lastModifiedBy: "TiQ8GPVr8qI714Lp5ChAAFFaU24MJy69",
    lastModifiedTime: "2024-01-22T09:00:00Z",
    schema: {
      schemaName: "main",
      dataFields: [],
    },
    operational: {
      status: "active",
      rowCount: 0,
      size: 0,
    },
  },
};





export const updateDatasetExamplePayload = {
  data: {
    id: "ds-a1b2c3d4e5f6",
    qri: "qdf:qix:tenant-guid:space-guid:dataset.qvd",
    secureQri: "secure-qri-value",
    name: "Sales Data (Updated)",
    description: "Updated annual sales records",
    technicalDescription: "Production sales dataset - updated",
    type: "qvd",
    tags: ["sales", "financial", "updated"],
    spaceId: "617979737a9f56e49dea2e6e",
    ownerId: "TiQ8GPVr8qI714Lp5ChAAFFaU24MJy69",
    version: 6,
    tenantId: "q3VRZ4YMixRaLKEPhkZWM-XMIDN7cO8f",
    createdBy: "TiQ8GPVr8qI714Lp5ChAAFFaU24MJy69",
    createdTime: "2024-01-15T10:30:00Z",
    lastModifiedBy: "TiQ8GPVr8qI714Lp5ChAAFFaU24MJy69",
    lastModifiedTime: "2024-01-22T11:00:00Z",
    schema: {
      schemaName: "main",
      dataFields: [
        {
          name: "SalesAmount",
          dataType: {
            type: "DECIMAL",
            properties: { precision: 10, scale: 2 },
          },
          nullable: false,
          primaryKey: false,
          tags: ["metric"],
        },
      ],
    },
    operational: {
      status: "active",
      rowCount: 52000,
      size: 2600000,
      lastLoadTime: "2024-01-22T10:00:00Z",
    },
  },
};





export const deleteDatasetExamplePayload = {
  data: null,
};







export const getDataAssetsExamplePayload = {
  data: {
    id: "asset-a1b2c3d4e5f6",
    name: "Sales Data Asset",
    tags: ["sales", "analytics"],
    appId: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    appType: "qlik-sense",
    ownerId: "TiQ8GPVr8qI714Lp5ChAAFFaU24MJy69",
    spaceId: "617979737a9f56e49dea2e6e",
    version: 1,
    tenantId: "q3VRZ4YMixRaLKEPhkZWM-XMIDN7cO8f",
    createdBy: "TiQ8GPVr8qI714Lp5ChAAFFaU24MJy69",
    properties: {},
    createdTime: "2024-01-15T10:30:00Z",
    description: "Contains sales transaction data",
    dataStoreInfo: {
      id: "store-d4e5f6",
      name: "Primary Store",
      type: "database",
    },
    lastModifiedBy: "TiQ8GPVr8qI714Lp5ChAAFFaU24MJy69",
    lastModifiedTime: "2024-01-20T14:45:00Z",
    technicalDescription: "Raw sales data",
  },
};





export const createDataAssetsExamplePayload = {
  data: {
    id: "asset-f6e5d4c3b2a1",
    name: "Marketing Data Asset",
    tags: ["marketing"],
    appId: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    appType: "qlik-sense",
    ownerId: "TiQ8GPVr8qI714Lp5ChAAFFaU24MJy69",
    spaceId: "617979737a9f56e49dea2e6e",
    version: 1,
    tenantId: "q3VRZ4YMixRaLKEPhkZWM-XMIDN7cO8f",
    createdBy: "TiQ8GPVr8qI714Lp5ChAAFFaU24MJy69",
    properties: {},
    createdTime: "2024-01-22T09:00:00Z",
    description: "Marketing campaign metrics",
    dataStoreInfo: {
      id: "store-d4e5f6",
    },
    lastModifiedBy: "TiQ8GPVr8qI714Lp5ChAAFFaU24MJy69",
    lastModifiedTime: "2024-01-22T09:00:00Z",
    technicalDescription: "Campaign data",
  },
};





export const updateDataAssetsExamplePayload = {
  data: {
    id: "asset-a1b2c3d4e5f6",
    name: "Updated Sales Data",
    tags: ["sales", "updated"],
    appId: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    appType: "qlik-sense",
    ownerId: "TiQ8GPVr8qI714Lp5ChAAFFaU24MJy69",
    spaceId: "617979737a9f56e49dea2e6e",
    version: 2,
    tenantId: "q3VRZ4YMixRaLKEPhkZWM-XMIDN7cO8f",
    createdBy: "TiQ8GPVr8qI714Lp5ChAAFFaU24MJy69",
    properties: {},
    createdTime: "2024-01-15T10:30:00Z",
    description: "Enhanced sales metrics",
    dataStoreInfo: {
      id: "store-d4e5f6",
      name: "Primary Store",
      type: "database",
    },
    lastModifiedBy: "TiQ8GPVr8qI714Lp5ChAAFFaU24MJy69",
    lastModifiedTime: "2024-01-22T11:00:00Z",
    technicalDescription: "Improved schema",
  },
};





export const deleteDataAssetsExamplePayload = {
  data: null,
};







export const listDatafilesExamplePayload = {
  data: {
    data: [
      {
        id: "ee6a390c-5d33-11e8-9c2d-fa7ae01bbebc",
        qri: "qri:qdf:space://ooSOGoLLaq7EMaSdSsCiGvLwcd_VAf1oU0mzwSfp_Qs#wME89c8gKu_Tpz8W_a0JKSbKC4hzbNu0NLVgqi2UFS0",
        name: "reports/Monthly_Sales.csv",
        size: 1024,
        appId: "f34b91a1-0dc3-44ac-a847-51cb84122c84",
        folder: false,
        actions: ["Read"],
        ownerId: "lDL4DIINndhL_iJkcbqWyJenuwizP-2D",
        spaceId: "617979737a9f56e49dea2e6e",
        baseName: "Monthly_Sales.csv",
        folderId: "ee6a390c-5d33-11e8-9c2d-fa7ae01bbebc",
        folderPath: "reports",
        createdDate: "2020-07-07T20:52:40.853Z",
        modifiedDate: "2020-07-07T20:52:40.853Z",
        contentUpdatedDate: "2020-07-07T20:52:40.853Z",
      },
    ],
    links: {
      next: { href: "/api/v1/data-files?next=cursor123" },
      prev: { href: "/api/v1/data-files?prev=cursor456" },
      self: { href: "/api/v1/data-files" },
    },
  },
};





export const getDataFileExamplePayload = {
  data: {
    id: "ee6a390c-5d33-11e8-9c2d-fa7ae01bbebc",
    qri: "qri:qdf:space://ooSOGoLLaq7EMaSdSsCiGvLwcd_VAf1oU0mzwSfp_Qs#wME89c8gKu_Tpz8W_a0JKSbKC4hzbNu0NLVgqi2UFS0",
    name: "reports/Monthly_Sales.csv",
    size: 1024,
    appId: "f34b91a1-0dc3-44ac-a847-51cb84122c84",
    folder: false,
    actions: ["Read", "Update", "Delete"],
    ownerId: "lDL4DIINndhL_iJkcbqWyJenuwizP-2D",
    spaceId: "617979737a9f56e49dea2e6e",
    baseName: "Monthly_Sales.csv",
    folderId: "ee6a390c-5d33-11e8-9c2d-fa7ae01bbebc",
    folderPath: "reports",
    createdDate: "2020-07-07T20:52:40.853Z",
    modifiedDate: "2020-07-07T20:52:40.853Z",
    contentUpdatedDate: "2020-07-07T20:52:40.853Z",
  },
};





export const deleteDataFileExamplePayload = {
  data: null,
};







export const listDataStoresExamplePayload = {
  data: {
    data: [
      {
        id: "ds-store-a1b2c3d4e5f6",
        uri: "qlik:data-store/ds-store-a1b2c3d4e5f6",
        name: "Sales Data Store",
        tags: ["production", "sales"],
        type: "snowflake",
        ownerId: "TiQ8GPVr8qI714Lp5ChAAFFaU24MJy69",
        spaceId: "617979737a9f56e49dea2e6e",
        version: 1,
        tenantId: "q3VRZ4YMixRaLKEPhkZWM-XMIDN7cO8f",
        createdBy: "TiQ8GPVr8qI714Lp5ChAAFFaU24MJy69",
        properties: { region: "us-east-1" },
        createdTime: "2024-01-15T10:30:00Z",
        description: "Central data warehouse for sales analytics",
        technicalName: "sales_warehouse_prod",
        lastModifiedBy: "TiQ8GPVr8qI714Lp5ChAAFFaU24MJy69",
        lastModifiedTime: "2024-01-20T14:22:00Z",
        technicalDescription: "Snowflake-based repository",
      },
    ],
    page: 0,
    limit: 20,
    pages: 1,
    total: 1,
    links: {
      self: { href: "/api/v1/data-stores" },
      first: { href: "/api/v1/data-stores?page=0" },
      last: { href: "/api/v1/data-stores?page=0" },
    },
  },
};





export const getDataStoreExamplePayload = {
  data: {
    id: "ds-store-a1b2c3d4e5f6",
    uri: "qlik:data-store/ds-store-a1b2c3d4e5f6",
    name: "Sales Data Store",
    tags: ["production", "sales"],
    type: "snowflake",
    ownerId: "TiQ8GPVr8qI714Lp5ChAAFFaU24MJy69",
    spaceId: "617979737a9f56e49dea2e6e",
    version: 1,
    tenantId: "q3VRZ4YMixRaLKEPhkZWM-XMIDN7cO8f",
    createdBy: "TiQ8GPVr8qI714Lp5ChAAFFaU24MJy69",
    properties: { region: "us-east-1" },
    createdTime: "2024-01-15T10:30:00Z",
    description: "Central data warehouse for sales analytics",
    technicalName: "sales_warehouse_prod",
    lastModifiedBy: "TiQ8GPVr8qI714Lp5ChAAFFaU24MJy69",
    lastModifiedTime: "2024-01-20T14:22:00Z",
    technicalDescription: "Snowflake-based repository",
  },
};





export const createDataStoreExamplePayload = {
  data: {
    id: "ds-store-f6e5d4c3b2a1",
    uri: "qlik:data-store/ds-store-f6e5d4c3b2a1",
    name: "Marketing Data Store",
    tags: ["marketing"],
    type: "postgres",
    ownerId: "TiQ8GPVr8qI714Lp5ChAAFFaU24MJy69",
    spaceId: "617979737a9f56e49dea2e6e",
    version: 1,
    tenantId: "q3VRZ4YMixRaLKEPhkZWM-XMIDN7cO8f",
    createdBy: "TiQ8GPVr8qI714Lp5ChAAFFaU24MJy69",
    properties: {},
    createdTime: "2024-01-22T09:15:00Z",
    description: "Marketing campaign database",
    technicalName: "marketing_db",
    lastModifiedBy: "TiQ8GPVr8qI714Lp5ChAAFFaU24MJy69",
    lastModifiedTime: "2024-01-22T09:15:00Z",
    technicalDescription: "PostgreSQL instance",
  },
};





export const updateDataStoreExamplePayload = {
  data: {
    id: "ds-store-a1b2c3d4e5f6",
    uri: "qlik:data-store/ds-store-a1b2c3d4e5f6",
    name: "Sales Data Store (Updated)",
    tags: ["production", "sales", "updated"],
    type: "snowflake",
    ownerId: "TiQ8GPVr8qI714Lp5ChAAFFaU24MJy69",
    spaceId: "617979737a9f56e49dea2e6e",
    version: 2,
    tenantId: "q3VRZ4YMixRaLKEPhkZWM-XMIDN7cO8f",
    createdBy: "TiQ8GPVr8qI714Lp5ChAAFFaU24MJy69",
    properties: { region: "us-west-2" },
    createdTime: "2024-01-15T10:30:00Z",
    description: "Central warehouse for sales analytics - updated",
    technicalName: "sales_warehouse_prod",
    lastModifiedBy: "TiQ8GPVr8qI714Lp5ChAAFFaU24MJy69",
    lastModifiedTime: "2024-01-22T11:45:00Z",
    technicalDescription: "Snowflake repository - updated",
  },
};





export const deleteDataStoresExamplePayload = {
  data: null,
};





export const deleteDataStoresAssetsExamplePayload = {
  data: null,
};







export const createReportExamplePayload = {
  data: {
    message: "Report request has been accepted and is being processed.",
    requestId: "c61841ac-7b35-4434-aa74-4421f10fc68e",
    outputsUrl:
      "https://tenant.us.qlikcloud.com/api/v1/reports/c61841ac-7b35-4434-aa74-4421f10fc68e/outputs",
  },
};





export const getReportRequestStatusExamplePayload = {
  data: {
    status: "done",
    statusLocation: "/reports/c61841ac-7b35-4434-aa74-4421f10fc68e/status",
    resolutionAttempts: 1,
  },
};






export const rawRequestExamplePayload = {
  data: {
    data: {},
    headers: {},
    status: 200,
  },
};
