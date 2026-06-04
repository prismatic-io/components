import type ListLibraryCollectionsResponse from "./actions/types/listLibraryCollectionts";
import type ListUsersResponse from "./actions/types/listUsers";

export const getAccountIdExamplePayload = {
  data: {
    account: {
      id: "eyJpZGVudGl...",
    },
  },
};

export const listUserGroupsExamplePayload = {
  data: {
    account: {
      id: "eyJpZGVudGlmaWVyIjoyNjczMDcsInR5cGUiOiJhY2NvdW50In0=",
      userGroups: {
        total: 0,
        page: 1,
        limit: 25,
        hasNextPage: false,
        items: [],
      },
    },
  },
};

export const listUsersExamplePayload: { data: ListUsersResponse } = {
  data: {
    account: {
      users: {
        total: 1,
        page: 1,
        limit: 25,
        hasNextPage: false,
        items: [
          {
            id: "eyJpZGVudGlmaWVyIjo2NjIyODcsInR5cGUiOiJ1c2VyIn0=",
            email: "example@company.com",
            name: "Jane Anderson",
            avatar: null,
          },
        ],
      },
    },
  },
};

export const createAssetExamplePayload = {
  data: {
    createAsset: {
      job: {
        assetId: "eyJpZGVudGl...",
      },
    },
  },
};

export const uploadFileExamplePayload = {
  data: {
    uploadFile: {
      id: "eyJpZGVudGl...",
      urls: [
        "https://s3.amazonaws.com/frontify-cloud-files-us/frontify/file...",
      ],
    },
  },
};

export const createAttachmentExamplePayload = {
  data: {
    createAttachment: {
      job: {
        attachmentId: "eyJpZGVudGl...",
      },
    },
  },
};

export const deleteAssetExamplePayload = {
  data: {
    deleteAsset: {
      id: "eyJpZGVud...",
    },
  },
};

export const getAssetExamplePayload = {
  data: {
    asset: {
      id: "eyJpZGVudGlma...",
      creator: {
        id: "eyJpZGVudGlma...",
        name: "John Doe",
        email: "example@example.com",
      },
      createdAt: "2024-09-17T23:54:57.000+00:00",
      modifier: {
        id: "eyJpZGVudGlma...",
        name: "John Doe",
        email: "example@example.com",
      },
      modifiedAt: "2024-09-17T23:54:57.000+00:00",
      title: "Example Asset",
      description: "This is a sample description",
      attachments: [],
      externalId: null,
      tags: [],
      copyright: {
        status: "UNKNOWN",
        notice: "",
      },
      expiresAt: null,
      licenses: [],
      status: "PROCESSING",
      relatedAssets: {
        total: 0,
      },
      comments: {
        total: 0,
      },
      customMetadata: [],
      location: {
        brand: {
          id: "eyJpZGVudGlma...",
          name: "Example Brand",
        },
        library: null,
        workspaceProject: {
          id: "eyJpZGVudGlma...",
          name: "Sample Project: Example Cats",
        },
        folder: null,
      },
    },
  },
};

export const deleteAttachmentExamplePayload = {
  data: {
    deleteAttachment: {
      id: "eyJpZGVudGlmaWVyIjo5NDA3ODksInR5cGUiOiJhdHRhY2htZW50In0=",
    },
  },
};

export const getAssetsByIdsExamplePayload = {
  data: {
    assets: [
      {
        id: "eyJpZGVudGlma...",
        creator: {
          id: "eyJpZGVudGlma...",
          name: "John Doe",
          email: "example@example.com",
        },
        createdAt: "2024-09-05T19:49:25.000+00:00",
        modifier: {
          id: "eyJpZGVudGlma...",
          name: "John Doe",
          email: "example@example.com",
        },
        modifiedAt: "2024-09-05T19:49:27.000+00:00",
        title: "Example Title 2",
        description: null,
        attachments: [
          {
            id: "eyJpZGVudGlma...",
            creator: {
              id: "eyJpZGVudGlma...",
              name: "John Doe",
              email: "example@example.com",
            },
            createdAt: "2024-09-17T23:42:43.000+00:00",
            modifier: null,
            modifiedAt: null,
            name: "Sample Attachment 1",
            filename: "example.png",
            type: "",
            externalId: null,
            extension: "png",
            size: 585728,
            downloadUrl: "https://example.com/example.png",
          },
          {
            id: "eyJpZGVudGlma...",
            creator: {
              id: "eyJpZGVudGlma...",
              name: "John Doe",
              email: "example@example.com",
            },
            createdAt: "2024-09-18T17:20:22.000+00:00",
            modifier: null,
            modifiedAt: null,
            name: "Sample Attachment 2",
            filename: "example.png",
            type: "",
            externalId: "512",
            extension: "png",
            size: 585728,
            downloadUrl: "https://example.com/example.png",
          },
        ],
        externalId: null,
        tags: [],
        copyright: {
          status: "UNKNOWN",
          notice: "",
        },
        expiresAt: null,
        licenses: [],
        status: "FINISHED",
        relatedAssets: {
          total: 0,
        },
        comments: {
          total: 0,
        },
        customMetadata: [],
        location: {
          brand: {
            id: "eyJpZGVudGlma...",
            name: "Example Brand",
          },
          library: {
            id: "eyJpZGVudGlma...",
            name: "Logos",
          },
          workspaceProject: null,
          folder: null,
        },
      },
    ],
  },
};

export const listAssetCommentsExamplePayload = {
  data: {
    asset: {
      id: "eyJpZGV...",
      externalId: null,
      comments: {
        total: 1,
        page: 1,
        limit: 25,
        hasNextPage: false,
        items: [
          {
            id: "eyJpZGV...",
            creator: {
              id: "eyJpZGV...",
              email: "example@email.com",
              name: "John Doe",
            },
            createdAt: "2024-09-06T15:49:47.000+00:00",
            modifier: null,
            modifiedAt: null,
            content: "Test comment \n\n",
            mentionedUsers: [],
            isResolved: false,
            replies: {
              total: 0,
              hasNextPage: false,
              page: 1,
              limit: 50,
              items: [],
            },
            marking: null,
          },
        ],
      },
    },
  },
};

export const listRelatedAssetsExamplePayload = {
  data: {
    asset: {
      id: "eyJpZGV...",
      externalId: null,
      relatedAssets: {
        total: 0,
        hasNextPage: false,
        page: 1,
        limit: 25,
        items: [],
      },
    },
  },
};

export const moveAssetsExamplePayload = {
  data: {
    moveAssets: {
      assets: [
        {
          id: "eyJpZGV...",
        },
      ],
    },
  },
};

export const updateAssetExamplePayload = {
  data: {
    updateAsset: {
      asset: {
        id: "eyJpZGVudGlmaWVyIjoxMDEzOTI0MSwidHlwZSI6ImFzc2V0In0=",
      },
    },
  },
};

export const getBrandExamplePayload = {
  data: {
    brand: {
      id: "eyJpZGVudGlmaWVyIjoyNjE1MDUsInR5cGUiOiJicmFuZCJ9",
      name: "Monobrand",
      rgbaColor: {
        red: 130,
        green: 95,
        blue: 255,
        alpha: 1,
      },
      avatar: null,
      slug: "monobrand",
      customMetadataProperties: [],
    },
  },
};

export const listBrandLibrariesExamplePayload = {
  data: {
    brand: {
      id: "eyJpZGV...",
      name: "Monobrand",
      libraries: {
        total: 4,
        hasNextPage: false,
        page: 1,
        limit: 25,
        items: [
          {
            id: "eyJpZGV...",
            name: "Logos",
          },
        ],
      },
    },
  },
};

export const listBrandsExamplePayload = {
  data: {
    brands: [getBrandExamplePayload.data.brand],
  },
};

export const listBrandWorkspaceProjectsExamplePayload = {
  data: {
    brand: {
      id: "eyJpZGV...",
      name: "Monobrand",
      workspaceProjects: {
        total: 2,
        limit: 25,
        page: 1,
        hasNextPage: false,
        items: [
          {
            id: "eyJpZGV...",
            name: "Test Project: Siamese Cats",
          },
        ],
      },
    },
  },
};

export const createCollectionExamplePayload = {
  data: {
    createCollection: {
      collection: {
        id: "eyJpZGV...",
      },
    },
  },
};

export const deleteCollectionExamplePayload = {
  data: {
    deleteCollection: {
      id: "eyJpZGV...",
    },
  },
};

export const getLibraryExamplePayload = {
  data: {
    library: {
      __typename: "LogoLibrary",
      id: "eyJpZGV...",
      name: "Logos",
      color: null,
      licenses: [],
      customMetadataProperties: [],
    },
  },
};

export const listLibraryAssetsExamplePayload = {
  data: {
    library: {
      id: "eyJpZGV...",
      name: "Example Library",
      assets: {
        limit: 25,
        page: 1,
        total: 1,
        hasNextPage: false,
        items: [
          {
            id: "eyJpZGV...",
            creator: {
              id: "eyJpZGV...",
              name: "John Doe",
              email: "john@example.com",
            },
            createdAt: "2024-09-05T19:49:25.000+00:00",
            modifier: {
              id: "eyJpZGV...",
              name: "John Doe",
              email: "john@example.com",
            },
            modifiedAt: "2024-09-05T19:49:27.000+00:00",
            title: "example_title_1",
            description: null,
            attachments: [
              {
                id: "eyJpZGV...",
                creator: {
                  id: "eyJpZGV...",
                  name: "John Doe",
                  email: "john@example.com",
                },
                createdAt: "2024-09-17T23:42:43.000+00:00",
                modifier: null,
                modifiedAt: null,
                name: "Example attachment",
                filename: "example.png",
                type: "",
                externalId: null,
                extension: "png",
                size: 585728,
                downloadUrl: "https://example.com/file1.png",
              },
            ],
            externalId: null,
            tags: [],
            copyright: {
              status: "UNKNOWN",
              notice: "",
            },
            expiresAt: null,
            licenses: [],
            status: "FINISHED",
            relatedAssets: {
              total: 0,
            },
            comments: {
              total: 0,
            },
            customMetadata: [],
            location: {
              brand: {
                id: "eyJpZGV...",
                name: "ExampleBrand",
              },
              library: {
                id: "eyJpZGV...",
                name: "Example Library",
              },
              workspaceProject: null,
              folder: null,
            },
          },
        ],
      },
    },
  },
};

export const listLibraryCollaboratorsExamplePayload = {
  data: {
    library: {
      id: "eyJpZGV...",
      name: "Example Library",
      collaborators: {
        users: {
          total: 1,
          page: 1,
          limit: 25,
          hasNextPage: false,
          items: [
            {
              id: "eyJpZGV...",
              email: "john@example.com",
              name: "John Doe",
            },
          ],
        },
      },
    },
  },
};

export const listLibraryCollectionsExamplePayload: {
  data: ListLibraryCollectionsResponse;
} = {
  data: {
    library: {
      id: "eyJpZGV...",
      name: "Logos",
      collections: {
        total: 1,
        page: 1,
        limit: 25,
        hasNextPage: false,
        items: [
          {
            id: "eyJpZGV...",
            name: "Main Logos",
            assets: {
              total: 4,
              page: 1,
              limit: 25,
              hasNextPage: false,
              items: [
                {
                  id: "eyJpZGV...",
                },
              ],
            },
          },
        ],
      },
    },
  },
};

export const listLibraryFoldersExamplePayload = {
  data: {
    library: {
      id: "eyJpZGV...",
      name: "Logos",
      browse: {
        folders: {
          limit: 25,
          page: 1,
          hasNextPage: false,
          total: 0,
          items: [],
        },
      },
    },
  },
};

export const updateCollectionExamplePayload = {
  data: {
    updateCollection: {
      collection: {
        id: "eyJpZGV...",
      },
    },
  },
};

export const installWebhookExamplePayload = {
  data: {
    installProjectWebhook: {
      webhook: {
        id: "eyJpZGVudGlmaWVyIjo4OSwidHlwZSI6IndlYmhvb2sifQ==",
        creator: {
          id: "eyJpZGVudGlmaWVyIjoxMjMsInR5cGUiOiJ1c2VyIn0=",
          email: "example@example.com",
          name: "John Doe",
        },
        createdAt: "2024-09-19T13:18:52.000+00:00",
        name: "Example Webhook",
        notificationUrl:
          "https://hooks.example.io/trigger/SW5zdGFuY2VGbG93Q29uZmlnOjEyMzQ1NmUyLWM1M2QtNGUzOC04ZGY3LTE2ODRjYTJmZmVkZA==",
        secret: "AbcD123SecretKeyExample",
      },
    },
  },
};

export const listWebhooksExamplePayload = {
  data: {
    webhooks: {
      total: 1,
      page: 1,
      limit: 25,
      hasNextPage: false,
      items: [
        {
          id: "abc123...",
          creator: {
            id: "user456...",
            name: "John Doe",
            email: "john.doe@example.com",
          },
          createdAt: "2024-09-19T13:18:52.000+00:00",
          name: "Sample Webhook",
          notificationUrl: "https://example.com/trigger/webhook...",
          secret: "sampleSecretKey...",
          __typename: "ProjectWebhook",
          project: {
            id: "proj789...",
          },
        },
      ],
    },
  },
};

export const uninstallWebhookExamplePayload = {
  data: {
    uninstallWebhook: {
      webhook: {
        id: "eyJpZGV...",
      },
    },
  },
};

export const getWorkspaceProjectExamplePayload = {
  data: {
    workspaceProject: {
      id: "eyJpZGVudGlmaWVyIjo0Mzk2MDUsInR5cGUiOiJwcm9qZWN0In0=",
      name: "Test Project: Siamese Cats",
      color: {
        red: 225,
        green: 255,
        blue: 191,
        alpha: 1,
      },
      licenses: [],
      collaborators: {
        users: {
          total: 1,
          hasNextPage: false,
          page: 1,
          limit: 25,
          items: [
            {
              id: "eyJpZGVudGlmaWVyIjo2NjIyODcsInR5cGUiOiJ1c2VyIn0=",
              name: "Jane Anderson",
              email: "example@company.com",
            },
          ],
        },
      },
      customMetadata: [],
    },
  },
};

export const listWorkspaceProjectAssetsExamplePayload = {
  data: {
    workspaceProject: {
      id: "eyJpZG...==",
      name: "Example Project: Dogs",
      assets: {
        limit: 25,
        page: 1,
        total: 1,
        hasNextPage: false,
        items: [
          {
            id: "eyJpZG...==",
            creator: {
              id: "eyJpZG...==",
              name: "John Doe",
              email: "john.doe@example.com",
            },
            createdAt: "2024-09-17T23:36:00.000+00:00",
            modifier: {
              id: "eyJpZG...==",
              name: "John Doe",
              email: "john.doe@example.com",
            },
            modifiedAt: "2024-09-19T10:49:21.000+00:00",
            title: "Sample Asset",
            description: "Sample description",
            attachments: [],
            externalId: null,
            tags: [],
            copyright: {
              status: "UNKNOWN",
              notice: "",
            },
            expiresAt: null,
            licenses: [],
            status: "FINISHED",
            relatedAssets: {
              total: 0,
            },
            comments: {
              total: 0,
            },
            customMetadata: [],
            location: {
              brand: {
                id: "eyJpZG...==",
                name: "ExampleBrand",
              },
              library: null,
              workspaceProject: {
                id: "eyJpZG...==",
                name: "Example Project: Dogs",
              },
              folder: {
                id: "eyJpZG...==",
                name: "Sample Folder",
              },
            },
          },
        ],
      },
    },
  },
};

export const listWorkspaceProjectFoldersExamplePayload = {
  data: {
    workspaceProject: {
      id: "eyJpZGV...",
      name: "Test Project",
      browse: {
        folders: {
          limit: 25,
          page: 1,
          hasNextPage: false,
          total: 1,
          items: [
            {
              id: "eyJpZGV...",
              name: "A Parent Folder",
              creator: {
                id: "eyJpZGV...",
                name: "John Doe",
                email: "example@email.com",
              },
              createdAt: "2024-09-06T13:18:00.000+00:00",
              modifier: null,
              modifiedAt: null,
              breadcrumbs: [],
              folders: {
                total: 0,
              },
            },
          ],
        },
      },
    },
  },
};

export const createFolderExamplePayload = {
  data: {
    createFolder: {
      folder: {
        id: "eyJpZGV...",
      },
    },
  },
};

export const deleteFoldersExamplePayload = {
  data: {
    deleteFolders: {
      ids: ["eyJpZGV..."],
    },
  },
};

export const moveFoldersExamplePayload = {
  data: {
    moveFolders: {
      ids: ["eyJpZGV..."],
    },
  },
};

export const updateFolderExamplePayload = {
  data: {
    updateFolder: {
      folder: {
        id: "eyJpZGV...",
      },
    },
  },
};

export const getCurrentUserExamplePayload = {
  data: {
    currentUser: {
      id: "eyJpZGV...",
      email: "example@email.com",
      name: "John Doe",
      avatar: null,
    },
  },
};
