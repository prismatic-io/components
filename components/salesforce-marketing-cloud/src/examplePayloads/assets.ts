import type { PaginatedResponse } from "../types";

export const getAssetExamplePayload = {
  data: {
    id: 151239,
    customerKey: "7f18a738-74a7-4243-a763-4d80f42fb739",
    objectID: "087946b9-6c2a-4862-85e8-98c4f53b923e",
    contentType: "application/vnd.etmc.email.Message; kind=textOnly",
    assetType: {
      id: 209,
      name: "textonlyemail",
      displayName: "Text Only Email",
    },
    name: "Test",
    description: "",
    owner: {
      id: 12345,
      email: "user@example.com",
      name: "Example User",
      userId: "12345",
    },
    createdDate: "2026-02-16T16:46:01.383-06:00",
    createdBy: {
      id: 12345,
      email: "user@example.com",
      name: "Example User",
      userId: "12345",
    },
    modifiedDate: "2026-02-16T16:46:16.753-06:00",
    modifiedBy: {
      id: 12345,
      email: "user@example.com",
      name: "Example User",
      userId: "12345",
    },
    enterpriseId: 100012041,
    memberId: 100012041,
    status: {
      id: 1,
      name: "Draft",
    },
    thumbnail: {
      thumbnailUrl: "/v1/assets/151239/thumbnail",
    },
    category: {
      id: 54975,
      name: "Content Builder",
      parentId: 0,
    },
    views: {
      subjectline: {
        contentType: "application/vnd.etmc.email.View; kind=subjectline",
        thumbnail: {},
        content: "Subject",
        meta: {},
        availableViews: [],
        data: {
          email: {
            options: {
              generateFrom: "",
            },
          },
        },
        modelVersion: 2,
      },
      text: {
        thumbnail: {},
        content: "Test",
        availableViews: [],
        data: {
          email: {
            options: {
              generateFrom: "",
            },
          },
        },
        modelVersion: 2,
      },
      subscriptioncenter: {
        thumbnail: {},
        availableViews: [],
        data: {
          email: {
            options: {
              generateFrom: "",
            },
          },
        },
        modelVersion: 2,
      },
      forwardText: {
        thumbnail: {},
        availableViews: [],
        data: {
          email: {
            options: {
              generateFrom: "",
            },
          },
        },
        modelVersion: 2,
      },
    },
    availableViews: [
      "subjectline",
      "text",
      "subscriptioncenter",
      "forwardText",
    ],
    data: {
      email: {
        options: {
          characterEncoding: "utf-8",
        },
        legacy: {
          legacyId: 55741,
          legacyKey: "7f18a738-74a7-4243-a763-4d80f42fb739",
          legacyType: "email",
          legacyCategoryId: 1580,
        },
      },
    },
    legacyData: {
      legacyId: 55741,
      legacyKey: "7f18a738-74a7-4243-a763-4d80f42fb739",
      legacyType: "email",
      legacyCategoryId: 1580,
    },
    modelVersion: 2,
  },
};

export const listAssetsExamplePayload: { data: PaginatedResponse } = {
  data: {
    count: 22,
    page: 1,
    pageSize: 1,
    links: {},
    items: [
      {
        id: 151239,
        customerKey: "7f18a738-74a7-4243-a763-4d80f42fb739",
        objectID: "087946b9-6c2a-4862-85e8-98c4f53b923e",
        contentType: "application/vnd.etmc.email.Message; kind=textOnly",
        assetType: {
          id: 209,
          name: "textonlyemail",
          displayName: "Text Only Email",
        },
        name: "Test",
        description: "",
        owner: {
          id: 715698780,
          email: "example@email.com",
          name: "example@email.com",
          userId: "715698780",
        },
        createdDate: "2026-02-16T16:46:01.383-06:00",
        createdBy: {
          id: 715698780,
          email: "example@email.com",
          name: "example@email.com",
          userId: "715698780",
        },
        modifiedDate: "2026-02-16T16:46:16.753-06:00",
        modifiedBy: {
          id: 715698780,
          email: "example@email.com",
          name: "example@email.com",
          userId: "715698780",
        },
        enterpriseId: 100012041,
        memberId: 100012041,
        status: {
          id: 1,
          name: "Draft",
        },
        thumbnail: {
          thumbnailUrl: "/v1/assets/151239/thumbnail",
        },
        category: {
          id: 54975,
          name: "Content Builder",
          parentId: 0,
        },
        views: {
          subjectline: {
            contentType: "application/vnd.etmc.email.View; kind=subjectline",
            content: "Subject",
            meta: {},
            availableViews: [],
            data: {
              email: {
                options: {
                  generateFrom: "",
                },
              },
            },
            modelVersion: 2,
          },
          text: {
            content: "Test",
            availableViews: [],
            data: {
              email: {
                options: {
                  generateFrom: "",
                },
              },
            },
            modelVersion: 2,
          },
          subscriptioncenter: {
            availableViews: [],
            data: {
              email: {
                options: {
                  generateFrom: "",
                },
              },
            },
            modelVersion: 2,
          },
          forwardText: {
            availableViews: [],
            data: {
              email: {
                options: {
                  generateFrom: "",
                },
              },
            },
            modelVersion: 2,
          },
        },
        availableViews: [
          "subjectline",
          "text",
          "subscriptioncenter",
          "forwardText",
        ],
        data: {
          email: {
            options: {
              characterEncoding: "utf-8",
            },
            legacy: {
              legacyId: 55741,
              legacyKey: "7f18a738-74a7-4243-a763-4d80f42fb739",
              legacyType: "email",
              legacyCategoryId: 1580,
            },
          },
        },
        legacyData: {
          legacyId: 55741,
          legacyKey: "7f18a738-74a7-4243-a763-4d80f42fb739",
          legacyType: "email",
          legacyCategoryId: 1580,
        },
        modelVersion: 2,
      },
    ],
  },
};

export const queryAssetsExamplePayload = listAssetsExamplePayload;

export const createAssetExamplePayload = getAssetExamplePayload;

export const updateAssetExamplePayload = getAssetExamplePayload;

export const deleteAssetExamplePayload = {
  data: {
    success: true,
    id: "12345",
    message: "Asset deleted successfully",
  },
};
