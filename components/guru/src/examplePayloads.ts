export const createCardPayload = {
  data: {
    verificationReasons: [],
    verificationInitiationDate: "2025-11-20T19:33:23.074+0000",
    commentsEnabled: true,
    version: 1,
    permissions: [
      "COLLECTION_VIEW",
      "COLLECTION_CARD_VERIFY",
      "COLLECTION_CREATE_FOLDERS",
      "COLLECTION_ANNOUNCEMENT",
      "COLLECTION_CARD_ARCHIVE",
      "COLLECTION_MANAGE_FOLDERS",
      "COLLECTION_CARD_UNVERIFY",
      "COLLECTION_PUBLISH",
      "COLLECTION_CARD_COMMENT",
      "COLLECTION_CREATE_DRAFT_EXISTING",
      "COLLECTION_MANAGE_CARD_SETTINGS",
      "COLLECTION_CARD_DELETE",
      "COLLECTION_CREATE_DRAFTS",
      "COLLECTION_MANAGE_CARD_PERMISSIONS",
      "COLLECTION_FOLDER_DELETE",
      "COLLECTION_MANAGE_FOLDER_PERMISSIONS",
    ],
    id: "12345678-1234-1234-1234-123456789abc",
    content: "My card",
    owner: {
      id: "11111111-1111-1111-1111-111111111111",
      status: "ACTIVE",
      email: "user@example.com",
      lastName: "Doe",
      firstName: "Jane",
    },
    lastModified: "2025-08-22T19:33:23.023+0000",
    collection: {
      homeBoardSlug: "ExmplSlg/Example-Collection",
      description: "",
      name: "Example Collection",
      id: "22222222-2222-2222-2222-222222222222",
      color: "#001496",
      collectionType: "INTERNAL",
      team: {
        name: "Example Team",
        id: "33333333-3333-3333-3333-333333333333",
      },
      dateCreated: "2025-08-05T18:05:41.675+0000",
      slug: "exmpl/Example-Collection",
      assistEnabled: false,
      publicCardsEnabled: true,
      collectionTypeDetail: "USER",
    },
    lastVerified: "2025-08-22T19:33:23.074+0000",
    lastVerifiedBy: {
      id: "11111111-1111-1111-1111-111111111111",
      status: "ACTIVE",
      email: "user@example.com",
      lastName: "Doe",
      firstName: "Jane",
    },
    lastModifiedBy: {
      id: "11111111-1111-1111-1111-111111111111",
      status: "ACTIVE",
      email: "user@example.com",
      lastName: "Doe",
      firstName: "Jane",
    },
    preferredPhrase: "Some Card Title",
    shareStatus: "PRIVATE",
    verificationInterval: 90,
    verificationType: "RELATIVE",
    dateCreated: "2025-08-22T19:33:23.023+0000",
    slug: "iRgdnKRT/Some-Card-Title",
    verificationState: "TRUSTED",
    cardType: "CARD",
    originalOwner: {
      id: "11111111-1111-1111-1111-111111111111",
      status: "ACTIVE",
      email: "user@example.com",
      lastName: "Doe",
      firstName: "Jane",
    },
    commentCount: 0,
    followed: false,
    nextVerificationDate: "2025-11-20T19:33:23.074+0000",
  },
};

export const deleteCardPayload = {
  data: {
    message: "Card deleted successfully",
    cardId: "12345678-1234-1234-1234-123456789abc",
  },
};

export const getCardPayload = {
  data: {
    verificationReasons: [],
    verificationInitiationDate: "2025-11-20T19:33:23.074+0000",
    knowledgeAlerts: [],
    hasDrafts: false,
    commentsEnabled: true,
    version: 1,
    permissions: [
      "COLLECTION_MANAGE_FOLDER_PERMISSIONS",
      "COLLECTION_CARD_ARCHIVE",
      "COLLECTION_CARD_UNVERIFY",
      "COLLECTION_MANAGE_CARD_SETTINGS",
      "COLLECTION_MANAGE_FOLDERS",
      "COLLECTION_CARD_DELETE",
      "COLLECTION_CREATE_DRAFTS",
      "COLLECTION_VIEW",
      "COLLECTION_CARD_VERIFY",
      "COLLECTION_ANNOUNCEMENT",
      "COLLECTION_PUBLISH",
      "COLLECTION_MANAGE_CARD_PERMISSIONS",
      "COLLECTION_CARD_COMMENT",
      "COLLECTION_CREATE_FOLDERS",
      "COLLECTION_CREATE_DRAFT_EXISTING",
      "COLLECTION_FOLDER_DELETE",
    ],
    id: "12345678-1234-1234-1234-123456789abc",
    content: "My card",
    owner: {
      id: "11111111-1111-1111-1111-111111111111",
      status: "ACTIVE",
      email: "user@example.com",
      lastName: "Doe",
      firstName: "Jane",
    },
    lastModified: "2025-08-22T19:33:23.023+0000",
    contentSchemaVersion: "1.0.0",
    collection: {
      homeBoardSlug: "ExmplSlg/Example-Collection",
      description: "",
      name: "Example Collection",
      id: "22222222-2222-2222-2222-222222222222",
      color: "#001496",
      collectionType: "INTERNAL",
      team: {
        name: "Example Team",
        id: "33333333-3333-3333-3333-333333333333",
      },
      dateCreated: "2025-08-05T18:05:41.675+0000",
      collectionTypeDetail: "USER",
      slug: "exmpl/Example-Collection",
      assistEnabled: false,
      publicCardsEnabled: true,
    },
    verifiers: [
      {
        type: "user",
        user: {
          id: "11111111-1111-1111-1111-111111111111",
          status: "ACTIVE",
          email: "example@email.io",
          lastName: "Example",
          firstName: "Developer",
        },
        id: "user@example.com",
        dateCreated: "2025-08-22T19:33:23.023+0000",
      },
    ],
    lastVerified: "2025-08-22T19:33:23.074+0000",
    lastVerifiedBy: {
      id: "11111111-1111-1111-1111-111111111111",
      status: "ACTIVE",
      email: "user@example.com",
      lastName: "Doe",
      firstName: "Jane",
    },
    lastModifiedBy: {
      id: "11111111-1111-1111-1111-111111111111",
      status: "ACTIVE",
      email: "user@example.com",
      lastName: "Doe",
      firstName: "Jane",
    },
    preferredPhrase: "Some Card Title",
    shareStatus: "PRIVATE",
    verificationInterval: 90,
    verificationType: "RELATIVE",
    dateCreated: "2025-08-22T19:33:23.023+0000",
    slug: "iRgdnKRT/Some-Card-Title",
    verificationState: "TRUSTED",
    guruSlateToolsVersion: "1.0.0",
    cardType: "CARD",
    originalOwner: {
      id: "11111111-1111-1111-1111-111111111111",
      status: "ACTIVE",
      email: "user@example.com",
      lastName: "Doe",
      firstName: "Jane",
    },
    commentCount: 0,
    followed: false,
    nextVerificationDate: "2025-11-20T19:33:23.074+0000",
  },
};

export const getCardFoldersPayload = {
  data: [],
};

export const listCardVerifiersPayload = {
  data: [
    {
      type: "user",
      user: {
        id: "11111111-1111-1111-1111-111111111111",
        status: "ACTIVE",
        email: "example@email.io",
        lastName: "Example",
        firstName: "Developer",
      },
      id: "user@example.com",
      dateCreated: "2025-08-22T19:33:23.023+0000",
    },
  ],
};

export const unverifyCardPayload = {
  data: {
    verificationInitiationDate: "2025-08-22T19:33:23.846+0000",
    commentsEnabled: false,
    verificationInitiator: {
      id: "11111111-1111-1111-1111-111111111111",
      status: "ACTIVE",
      email: "user@example.com",
      lastName: "Doe",
      firstName: "Jane",
    },
  },
};

export const updateCardPayload = {
  data: {
    version: 2,
    verificationReasons: [],
    verificationInitiationDate: "2025-11-20T19:33:24.277+0000",
    hasDrafts: false,
    commentsEnabled: true,
    permissions: [
      "COLLECTION_MANAGE_CARD_PERMISSIONS",
      "COLLECTION_CARD_VERIFY",
      "COLLECTION_MANAGE_FOLDER_PERMISSIONS",
      "COLLECTION_FOLDER_DELETE",
      "COLLECTION_CARD_COMMENT",
      "COLLECTION_CREATE_DRAFT_EXISTING",
      "COLLECTION_MANAGE_FOLDERS",
      "COLLECTION_CREATE_FOLDERS",
      "COLLECTION_PUBLISH",
      "COLLECTION_ANNOUNCEMENT",
      "COLLECTION_CREATE_DRAFTS",
      "COLLECTION_CARD_UNVERIFY",
      "COLLECTION_VIEW",
      "COLLECTION_CARD_DELETE",
      "COLLECTION_MANAGE_CARD_SETTINGS",
      "COLLECTION_CARD_ARCHIVE",
    ],
    id: "12345678-1234-1234-1234-123456789abc",
    content: "Updated content",
    owner: {
      id: "11111111-1111-1111-1111-111111111111",
      status: "ACTIVE",
      email: "user@example.com",
      lastName: "Doe",
      firstName: "Jane",
    },
    lastModified: "2025-08-22T19:33:24.232+0000",
    collection: {
      description: "",
      homeBoardSlug: "ExmplSlg/Example-Collection",
      name: "Example Collection",
      id: "22222222-2222-2222-2222-222222222222",
      color: "#001496",
      collectionType: "INTERNAL",
      team: {
        name: "Example Team",
        id: "33333333-3333-3333-3333-333333333333",
      },
      dateCreated: "2025-08-05T18:05:41.675+0000",
      slug: "exmpl/Example-Collection",
      assistEnabled: false,
      publicCardsEnabled: true,
      collectionTypeDetail: "USER",
    },
    lastVerified: "2025-08-22T19:33:24.277+0000",
    lastVerifiedBy: {
      id: "11111111-1111-1111-1111-111111111111",
      status: "ACTIVE",
      email: "user@example.com",
      lastName: "Doe",
      firstName: "Jane",
    },
    lastModifiedBy: {
      id: "11111111-1111-1111-1111-111111111111",
      status: "ACTIVE",
      email: "user@example.com",
      lastName: "Doe",
      firstName: "Jane",
    },
    preferredPhrase: "Updated Title",
    shareStatus: "PRIVATE",
    verificationInterval: 90,
    verificationType: "RELATIVE",
    dateCreated: "2025-08-22T19:33:23.023+0000",
    slug: "iRgdnKRT/Updated-Title",
    verificationState: "TRUSTED",
    cardType: "CARD",
    originalOwner: {
      id: "11111111-1111-1111-1111-111111111111",
      status: "ACTIVE",
      email: "user@example.com",
      lastName: "Doe",
      firstName: "Jane",
    },
    commentCount: 0,
    followed: false,
    nextVerificationDate: "2025-11-20T19:33:24.277+0000",
  },
};

export const verifyCardPayload = {
  data: {
    message: "Card verified successfully",
    cardId: "12345678-1234-1234-1234-123456789abc",
  },
};

export const getCollectionPayload = {
  data: {
    collectionStats: {
      stats: {
        "collection-trust-score": {
          type: "collection-trust-score",
          trustedCount: 4,
          needsVerificationCount: 0,
        },
        "card-count": {
          type: "card-count",
          count: 4,
        },
      },
    },
    publicCards: 1,
    homeBoardSlug: "ExmplSlg/Example-Collection",
    description: "",
    name: "Example Collection",
    permissions: [
      "COLLECTION_MANAGE_TEMPLATES",
      "COLLECTION_MANAGE_TAGS",
      "COLLECTION_MANAGE_SETTINGS",
      "COLLECTION_CREATE_DRAFTS",
      "COLLECTION_DELETE",
      "COLLECTION_VIEW",
      "COLLECTION_VIEW_USER_ANALYTICS",
      "COLLECTION_CARD_UNVERIFY",
      "COLLECTION_CARD_VERIFY",
      "COLLECTION_CREATE_DRAFT_EXISTING",
      "COLLECTION_VIEW_AUTHOR_ANALYTICS",
      "COLLECTION_ANNOUNCEMENT",
      "COLLECTION_MANAGE_CARDS",
      "COLLECTION_MANAGE_CARD_PERMISSIONS",
      "COLLECTION_CARD_COMMENT",
      "COLLECTION_FOLDER_DELETE",
      "COLLECTION_CARD_DELETE",
      "COLLECTION_VIEW_CARD_ANALYTICS",
      "COLLECTION_CARD_ARCHIVE",
      "COLLECTION_MANAGE_FOLDERS",
      "COLLECTION_MANAGE_CARD_SETTINGS",
      "COLLECTION_PUBLISH",
      "COLLECTION_MANAGE_FOLDER_PERMISSIONS",
      "COLLECTION_MANAGE_PERMISSIONS",
      "COLLECTION_CREATE_FOLDERS",
    ],
    id: "22222222-2222-2222-2222-222222222222",
    color: "#001496",
    collectionType: "INTERNAL",
    contexts: 0,
    team: {
      name: "Developer's Developer Team",
      id: "33333333-3333-3333-3333-333333333333",
    },
    boards: 121,
    dateCreated: "2025-08-05T18:05:41.675+0000",
    cards: 4,
    slug: "exmpl/Example-Collection",
    assistEnabled: false,
    publicCardsEnabled: true,
    collectionTypeDetail: "USER",
  },
};

export const listCollectionGroupAccessPayload = {
  data: [
    {
      group: {
        modifiable: false,
        name: "All Members",
        id: "88888888-8888-8888-8888-888888888888",
        team: {
          organization: {
            name: "Example Team",
            id: "99999999-9999-9999-9999-999999999999",
          },
          totalUsers: 0,
          topLevelOrganizationId: "99999999-9999-9999-9999-999999999999",
          description:
            "A place for Developer's Developer Team to document processes and share important information.",
          name: "Example Team",
          id: "33333333-3333-3333-3333-333333333333",
          status: "ACTIVE",
          dateCreated: "2025-04-29T20:49:22.391+0000",
          profilePicUrl: "https://assets.getguru.com/default-team-logo.png",
        },
        dateCreated: "2025-04-29T20:49:22.599+0000",
        groupIdentifier: "team",
      },
      groupId: "88888888-8888-8888-8888-888888888888",
      role: "MEMBER",
      objectRole: {
        id: "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa",
        name: "Viewer",
        permissions: [
          "COLLECTION_VIEW",
          "PAGE_VIEW",
          "KT_VIEW",
          "SOURCE_VIEW",
          "AGENT_VIEW",
          "COLLECTION_CARD_COMMENT",
        ],
        roleType: "SYSTEM",
        systemRole: "VIEWER",
      },
      groupName: "All Members",
    },
  ],
};

export const listCollectionsPayload = {
  data: [
    {
      collectionStats: {
        stats: {
          "collection-trust-score": {
            type: "collection-trust-score",
            needsVerificationCount: 0,
            trustedCount: 4,
          },
          "card-count": {
            type: "card-count",
            count: 4,
          },
        },
      },
      publicCards: 1,
      homeBoardSlug: "ExmplSlg/Example-Collection",
      description: "",
      name: "Example Collection",
      permissions: [
        "COLLECTION_VIEW",
        "COLLECTION_CREATE_FOLDERS",
        "COLLECTION_FOLDER_DELETE",
        "COLLECTION_CARD_ARCHIVE",
        "COLLECTION_ANNOUNCEMENT",
        "COLLECTION_CREATE_DRAFTS",
        "COLLECTION_MANAGE_TEMPLATES",
        "COLLECTION_MANAGE_PERMISSIONS",
        "COLLECTION_CARD_UNVERIFY",
        "COLLECTION_MANAGE_CARDS",
        "COLLECTION_VIEW_USER_ANALYTICS",
        "COLLECTION_MANAGE_FOLDERS",
        "COLLECTION_VIEW_CARD_ANALYTICS",
        "COLLECTION_CREATE_DRAFT_EXISTING",
        "COLLECTION_PUBLISH",
        "COLLECTION_MANAGE_SETTINGS",
        "COLLECTION_DELETE",
        "COLLECTION_CARD_COMMENT",
        "COLLECTION_MANAGE_CARD_SETTINGS",
        "COLLECTION_CARD_DELETE",
        "COLLECTION_MANAGE_FOLDER_PERMISSIONS",
        "COLLECTION_VIEW_AUTHOR_ANALYTICS",
        "COLLECTION_MANAGE_TAGS",
        "COLLECTION_CARD_VERIFY",
        "COLLECTION_MANAGE_CARD_PERMISSIONS",
      ],
      id: "22222222-2222-2222-2222-222222222222",
      color: "#001496",
      collectionType: "INTERNAL",
      contexts: 0,
      team: {
        name: "Example Team",
        id: "33333333-3333-3333-3333-333333333333",
      },
      boards: 121,
      dateCreated: "2025-08-05T18:05:41.675+0000",
      cards: 4,
      slug: "exmpl/Example-Collection",
      assistEnabled: false,
      publicCardsEnabled: true,
      collectionTypeDetail: "USER",
    },
  ],
};

export const createFolderPayload = {
  data: {
    type: "folder",
    id: "55555555-5555-5555-5555-555555555555",
    itemId: "66666666-6666-6666-6666-666666666666",
    title: "A folder 2",
    lastModified: "2025-08-22T20:54:22.564+0000",
    collection: {
      homeBoardSlug: "ExmplSlg/Example-Collection",
      description: "",
      name: "Example Collection",
      id: "22222222-2222-2222-2222-222222222222",
      color: "#001496",
      collectionType: "INTERNAL",
      team: {
        name: "Example Team",
        id: "33333333-3333-3333-3333-333333333333",
      },
      dateCreated: "2025-08-05T18:05:41.675+0000",
      slug: "exmpl/Example-Collection",
      assistEnabled: false,
      publicCardsEnabled: true,
      collectionTypeDetail: "USER",
    },
    lastModifiedBy: {
      id: "11111111-1111-1111-1111-111111111111",
      status: "ACTIVE",
      email: "user@example.com",
      lastName: "Doe",
      firstName: "Jane",
    },
    items: [],
    slug: "ixaderdT/A-folder-2",
    numberOfFacts: 0,
  },
};

export const deleteFolderPayload = {
  data: {
    message: "Folder deleted successfully",
    folderId: "55555555-5555-5555-5555-555555555555",
  },
};

export const getFolderPayload = {
  data: {
    description: "updated description",
    title: "Updated folder Title",
    id: "55555555-5555-5555-5555-555555555555",
    lastModified: "2025-08-22T20:54:22.803+0000",
    collection: {
      description: "",
      homeBoardSlug: "ExmplSlg/Example-Collection",
      name: "Example Collection",
      id: "22222222-2222-2222-2222-222222222222",
      color: "#001496",
      collectionType: "INTERNAL",
      team: {
        name: "Example Team",
        id: "33333333-3333-3333-3333-333333333333",
      },
      dateCreated: "2025-08-05T18:05:41.675+0000",
      slug: "exmpl/Example-Collection",
      assistEnabled: false,
      publicCardsEnabled: true,
      collectionTypeDetail: "USER",
    },
    lastModifiedBy: {
      id: "11111111-1111-1111-1111-111111111111",
      status: "ACTIVE",
      email: "user@example.com",
      lastName: "Doe",
      firstName: "Jane",
    },
    items: [],
    slug: "ixaderdT/Updated-folder-Title",
    itemId: "66666666-6666-6666-6666-666666666666",
    numberOfFacts: 0,
  },
};

export const getFolderItemsPayload = {
  data: [],
};

export const listFoldersPayload = {
  data: [
    {
      home: true,
      title: "Example",
      id: "ffffffff-ffff-ffff-ffff-ffffffffffff",
      lastModified: "2025-08-22T20:54:23.339+0000",
      collection: {
        homeBoardSlug: "ExmplSlg/Example-Collection",
        description: "",
        name: "Example Collection",
        id: "22222222-2222-2222-2222-222222222222",
        color: "#001496",
        collectionType: "INTERNAL",
        team: {
          name: "Example Team",
          id: "33333333-3333-3333-3333-333333333333",
        },
        dateCreated: "2025-08-05T18:05:41.675+0000",
        slug: "exmpl/Example-Collection",
        assistEnabled: false,
        publicCardsEnabled: true,
        collectionTypeDetail: "USER",
      },
      lastModifiedBy: {
        id: "11111111-1111-1111-1111-111111111111",
        status: "ACTIVE",
        email: "example@email.io",
        lastName: "Example",
        firstName: "Developer",
      },
      items: [],
      slug: "ExmplSlg/Example-Collection",
      numberOfFacts: 4,
    },
  ],
};

export const searchFoldersPayload = {
  data: [
    {
      home: true,
      title: "Example",
      id: "ffffffff-ffff-ffff-ffff-ffffffffffff",
      lastModified: "2025-08-22T20:54:23.339+0000",
      collection: {
        homeBoardSlug: "ExmplSlg/Example-Collection",
        description: "",
        name: "Example Collection",
        id: "22222222-2222-2222-2222-222222222222",
        color: "#001496",
        collectionType: "INTERNAL",
        team: {
          name: "Example Team",
          id: "33333333-3333-3333-3333-333333333333",
        },
        dateCreated: "2025-08-05T18:05:41.675+0000",
        slug: "exmpl/Example-Collection",
        assistEnabled: false,
        publicCardsEnabled: true,
        collectionTypeDetail: "USER",
      },
      lastModifiedBy: {
        id: "11111111-1111-1111-1111-111111111111",
        status: "ACTIVE",
        email: "example@email.io",
        lastName: "Example",
        firstName: "Developer",
      },
      items: [],
      slug: "ExmplSlg/Example-Collection",
      numberOfFacts: 4,
    },
  ],
};

export const updateFolderPayload = {
  data: {
    description: "updated description",
    title: "Updated folder Title",
    id: "55555555-5555-5555-5555-555555555555",
    lastModified: "2025-08-22T20:54:22.803+0000",
    collection: {
      homeBoardSlug: "ExmplSlg/Example-Collection",
      description: "",
      name: "Example Collection",
      id: "22222222-2222-2222-2222-222222222222",
      color: "#001496",
      collectionType: "INTERNAL",
      team: {
        name: "Example Team",
        id: "33333333-3333-3333-3333-333333333333",
      },
      dateCreated: "2025-08-05T18:05:41.675+0000",
      slug: "exmpl/Example-Collection",
      assistEnabled: false,
      publicCardsEnabled: true,
      collectionTypeDetail: "USER",
    },
    lastModifiedBy: {
      id: "11111111-1111-1111-1111-111111111111",
      status: "ACTIVE",
      email: "user@example.com",
      lastName: "Doe",
      firstName: "Jane",
    },
    items: [],
    slug: "ixaderdT/Updated-folder-Title",
    itemId: "66666666-6666-6666-6666-666666666666",
    numberOfFacts: 0,
  },
};

export const addUserGroupMemberPayload = {
  data: [
    {
      user: {
        id: "77777777-7777-7777-7777-777777777777",
        status: "PENDING",
        email: "newuser@example.com",
      },
      id: "newuser@example.com",
      dateCreated: "2025-08-22T22:00:06.748+0000",
    },
  ],
};

export const deleteUserGroupMemberPayload = {
  data: {
    message: "User removed from group successfully",
    groupId: "77777777-7777-7777-7777-777777777777",
    memberId: "newuser@example.com",
  },
};

export const listUserGroupsPayload = {
  data: [
    {
      modifiable: false,
      name: "All Members",
      id: "5f419b24-a3dc-4cc9-9f5a-d78fc1ffa43f",
      team: {
        organization: {
          name: "Example Team",
          id: "99999999-9999-9999-9999-999999999999",
        },
        totalUsers: 0,
        topLevelOrganizationId: "99999999-9999-9999-9999-999999999999",
        description:
          "A place for Developer's Developer Team to document processes and share important information.",
        name: "Example Team",
        id: "33333333-3333-3333-3333-333333333333",
        status: "ACTIVE",
        dateCreated: "2025-04-29T20:49:22.391+0000",
        profilePicUrl: "https://assets.getguru.com/default-team-logo.png",
      },
      dateCreated: "2025-04-29T20:49:22.599+0000",
      groupIdentifier: "team",
    },
  ],
};

export const whoAmIPayload = {
  data: {
    tokenType: "API",
    user: {
      email: "user@example.com",
      lastName: "Doe",
      firstName: "Jane",
    },
    team: {
      name: "Developer's Developer Team",
      id: "33333333-3333-3333-3333-333333333333",
      edition: {
        adminOverrides: {
          CALLOUT_ELEMENTS_ALLOWED: "true",
          GURU_GPT_ALLOWED: "true",
          ANSWER_GEN_CHUNKS_ALLOWED: "true",
          INSIGHTS_DIGEST_ALLOWED: "true",
          CARD_COMMENTS_ALLOWED: "true",
          ORG_CHART_ALLOWED: "true",
          GEN_AI_READ_ONLY_ALLOWED: "true",
          SEARCH_ASSISTANTS_ALLOWED: "true",
          ANALYTICS_NON_ADMIN_ALLOWED: "true",
          ENABLE_NEW_DIGEST_EMAILS: "true",
          GEN_AI_FULLCARD_SUMMARY_ALLOWED: "true",
          COLLAPSIBLE_ELEMENTS_ALLOWED: "true",
          ANSWER_GEN_ALLOWED: "true",
          COLLECTION_AUTO_ARCHIVE_ALLOWED: "true",
          ADMIN_MFA_NOT_REQUIRED: "true",
        },
        name: "Developer",
        key: "developer",
        id: "12121212-1212-1212-1212-121212121212",
        code: "developer",
      },
    },
  },
};

export const searchCardsPayload = {
  data: [
    {
      commentsEnabled: true,
      id: "13131313-1313-1313-1313-131313131313",
      content: "Updated content",
      owner: {
        id: "11111111-1111-1111-1111-111111111111",
        status: "ACTIVE",
        email: "example@email.io",
        lastName: "Example",
        firstName: "Developer",
      },
      lastModified: "2025-08-22T19:33:25.487+0000",
      collection: {
        name: "Example Collection",
        id: "22222222-2222-2222-2222-222222222222",
        color: "#001496",
        collectionType: "INTERNAL",
        publicCardsEnabled: false,
        collectionTypeDetail: "USER",
      },
      lastVerified: "2025-08-22T19:33:25.160+0000",
      lastVerifiedBy: {
        id: "11111111-1111-1111-1111-111111111111",
        status: "ACTIVE",
        email: "example@email.io",
        lastName: "Example",
        firstName: "Developer",
      },
      lastModifiedBy: {
        id: "11111111-1111-1111-1111-111111111111",
        status: "ACTIVE",
        email: "example@email.io",
        lastName: "Example",
        firstName: "Developer",
      },
      shareStatus: "PRIVATE",
      preferredPhrase: "Updated Title",
      verifiers: [
        {
          type: "user",
          user: {
            id: "11111111-1111-1111-1111-111111111111",
            status: "ACTIVE",
            email: "example@email.io",
            lastName: "Example",
            firstName: "Developer",
          },
          id: "user@example.com",
        },
      ],
      verificationInterval: 90,
      dateCreated: "2025-08-22T19:33:23.876+0000",
      slug: "ibgdGKeT/Updated-Title",
      verificationState: "TRUSTED",
      cardType: "CARD",
      originalOwner: {
        id: "11111111-1111-1111-1111-111111111111",
        status: "ACTIVE",
        email: "example@email.io",
        lastName: "Example",
        firstName: "Developer",
      },
      highlightedAttachments: [],
      followed: false,
      highlightedTitleContent: [],
      nextVerificationDate: "2025-11-20T19:33:25.160+0000",
    },
  ],
};

export const getTeamAnalyticsPayload = {
  data: [
    {
      user: "user@example.com",
      properties: {
        factId: "fact1111-1111-1111-1111-111111111111",
        cardId: "fact1111-1111-1111-1111-111111111111",
        source: "API",
      },
      type: "fact-shared-to-team",
      eventType: "card-shared-to-team",
      eventDate: "2025-08-20T23:03:15.709+0000",
    },
  ],
};

export const listTeamMembersPayload = {
  data: [
    {
      userAttributes: {
        BILLING_TYPE: "CORE",
      },
      user: {
        id: "77777777-7777-7777-7777-777777777777",
        status: "PENDING",
        email: "newuser@example.com",
      },
      id: "newuser@example.com",
      dateCreated: "2025-08-21T20:14:03.839+0000",
      groups: [
        {
          modifiable: true,
          userModifiable: true,
          name: "Experts",
          id: "10101010-1010-1010-1010-101010101010",
          team: {
            organization: {
              name: "Example Team",
              id: "99999999-9999-9999-9999-999999999999",
            },
            description:
              "A place for Developer's Developer Team to document processes and share important information.",
            totalUsers: 0,
            topLevelOrganizationId: "99999999-9999-9999-9999-999999999999",
            name: "Example Team",
            id: "33333333-3333-3333-3333-333333333333",
            status: "ACTIVE",
            dateCreated: "2025-04-29T20:49:22.391+0000",
            profilePicUrl: "https://assets.getguru.com/default-team-logo.png",
          },
          dateCreated: "2025-04-29T20:49:22.521+0000",
          groupIdentifier: "experts",
        },
        {
          modifiable: true,
          userModifiable: true,
          name: "Test",
          id: "77777777-7777-7777-7777-777777777777",
          team: {
            organization: {
              name: "Example Team",
              id: "99999999-9999-9999-9999-999999999999",
            },
            description:
              "A place for Developer's Developer Team to document processes and share important information.",
            totalUsers: 0,
            topLevelOrganizationId: "99999999-9999-9999-9999-999999999999",
            name: "Example Team",
            id: "33333333-3333-3333-3333-333333333333",
            status: "ACTIVE",
            dateCreated: "2025-04-29T20:49:22.391+0000",
            profilePicUrl: "https://assets.getguru.com/default-team-logo.png",
          },
          dateCreated: "2025-08-21T20:06:09.370+0000",
          groupIdentifier: "test",
        },
      ],
    },
  ],
};

export const createWebhookSubscriptionPayload = {
  data: {
    id: "15151515-1515-1515-1515-151515151515",
    owner: {
      id: "11111111-1111-1111-1111-111111111111",
      status: "ACTIVE",
      email: "user@example.com",
      lastName: "Doe",
      firstName: "Jane",
    },
    filter: "card-created,card-updated",
    status: "ENABLED",
    team: {
      organization: {
        name: "Example Team",
        id: "c325c95b-e4e6-4232-bc68-6f87d2b8c245",
      },
      topLevelOrganizationId: "c325c95b-e4e6-4232-bc68-6f87d2b8c245",
      description:
        "A place for Developer's Developer Team to document processes and share important information.",
      name: "Developer's Developer Team",
      id: "33333333-3333-3333-3333-333333333333",
      status: "ACTIVE",
      dateCreated: "2025-04-29T20:49:22.391+0000",
      profilePicUrl: "https://assets.getguru.com/default-team-logo.png",
    },
    dateCreated: "2025-08-22T19:59:50.845+0000",
    targetUrl: "https://hooks.example.com/webhook",
    deliveryMode: "BATCH",
    dateLastModified: "2025-08-22T19:59:50.845+0000",
  },
};

export const deleteAllWebhookSubscriptionsPayload = {
  data: {
    message: "Successfully deleted 2 webhook subscriptions",
    deletedCount: 2,
    failedCount: 0,
    totalCount: 2,
    deletedSubscriptions: [
      "16161616-1616-1616-1616-161616161616",
      "17171717-1717-1717-1717-171717171717",
    ],
    failedSubscriptions: [],
  },
};

export const deleteWebhookSubscriptionPayload = {
  data: {
    message: "Webhook subscription deleted successfully",
    webhookId: "44444444-4444-4444-4444-444444444444",
  },
};

export const getWebhookSubscriptionPayload = {
  data: {
    id: "44444444-4444-4444-4444-444444444444",
    owner: {
      id: "11111111-1111-1111-1111-111111111111",
      status: "ACTIVE",
      email: "user@example.com",
      lastName: "Doe",
      firstName: "Jane",
    },
    filter: "card-created,card-updated",
    status: "ENABLED",
    team: {
      organization: {
        name: "Example Team",
        id: "c325c95b-e4e6-4232-bc68-6f87d2b8c245",
      },
      topLevelOrganizationId: "c325c95b-e4e6-4232-bc68-6f87d2b8c245",
      description:
        "A place for Developer's Developer Team to document processes and share important information.",
      name: "Developer's Developer Team",
      id: "33333333-3333-3333-3333-333333333333",
      status: "ACTIVE",
      dateCreated: "2025-04-29T20:49:22.391+0000",
      profilePicUrl: "https://assets.getguru.com/default-team-logo.png",
    },
    dateCreated: "2025-08-22T19:29:56.106+0000",
    targetUrl: "https://hooks.example.com/webhook",
    deliveryMode: "BATCH",
    dateLastModified: "2025-08-22T19:29:56.106+0000",
  },
};

export const listWebhookSubscriptionsPayload = {
  data: [
    {
      id: "18181818-1818-1818-1818-181818181818",
      owner: {
        id: "11111111-1111-1111-1111-111111111111",
        status: "ACTIVE",
        email: "example@email.io",
        lastName: "Example",
        firstName: "Developer",
      },
      filter: "card-created,card-updated",
      status: "ENABLED",
      team: {
        organization: {
          name: "Example Team",
          id: "99999999-9999-9999-9999-999999999999",
        },
        description:
          "A place for Developer's Developer Team to document processes and share important information.",
        topLevelOrganizationId: "99999999-9999-9999-9999-999999999999",
        name: "Example Team",
        id: "33333333-3333-3333-3333-333333333333",
        status: "ACTIVE",
        dateCreated: "2025-04-29T20:49:22.391+0000",
        profilePicUrl: "https://assets.getguru.com/default-team-logo.png",
      },
      dateCreated: "2025-08-22T19:19:50.869+0000",
      targetUrl: "https://hooks.example.com/webhook",
      deliveryMode: "BATCH",
      dateLastModified: "2025-08-22T19:19:50.869+0000",
    },
  ],
};

export const testWebhookPayload = {
  data: {
    message: "Test webhook sent successfully",
    webhookId: "44444444-4444-4444-4444-444444444444",
  },
};

export const updateWebhookSubscriptionPayload = {
  data: {
    id: "44444444-4444-4444-4444-444444444444",
    owner: {
      id: "11111111-1111-1111-1111-111111111111",
      status: "ACTIVE",
      email: "user@example.com",
      lastName: "Doe",
      firstName: "Jane",
    },
    filter: "card-created,card-updated,board-updated",
    status: "ENABLED",
    team: {
      organization: {
        name: "Example Team",
        id: "c325c95b-e4e6-4232-bc68-6f87d2b8c245",
      },
      topLevelOrganizationId: "c325c95b-e4e6-4232-bc68-6f87d2b8c245",
      description:
        "A place for Developer's Developer Team to document processes and share important information.",
      name: "Developer's Developer Team",
      id: "33333333-3333-3333-3333-333333333333",
      status: "ACTIVE",
      dateCreated: "2025-04-29T20:49:22.391+0000",
      profilePicUrl: "https://assets.getguru.com/default-team-logo.png",
    },
    dateCreated: "2025-08-22T19:29:56.106+0000",
    targetUrl: "https://hooks.example.com/webhook",
    deliveryMode: "BATCH",
    dateLastModified: "2025-08-22T19:29:57.440+0000",
  },
};
