//#region src/actions/types/shared.d.ts
interface UsersResponse {
  total: number;
  page: number;
  limit: number;
  hasNextPage: boolean;
  items: User[];
}
interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string | null;
}
interface CustomMetadataProperty {
  id: string;
  creator: {
    id: string;
    name: string;
    email: string;
  };
  createdAt: string;
  modifier: {
    id: string;
    name: string;
    email: string;
  };
  modifiedAt: string;
  name: string;
  type: {
    name: string;
  };
  isRequired: boolean;
  defaultValue: unknown;
}
interface AssetResponse {
  id: string;
  creator: {
    id: string;
    name: string;
    email: string;
  };
  createdAt: string;
  modifier: {
    id: string;
    name: string;
    email: string;
  };
  modifiedAt: string;
  title: string;
  description: string | null;
  attachments: {
    id: string;
    creator: {
      id: string;
      name: string;
      email: string;
    };
    createdAt: string;
    modifier: {
      id: string;
      name: string;
      email: string;
    } | null;
    modifiedAt: string | null;
    name: string;
    filename: string;
    type: string;
    externalId: string | null;
    extension: string;
    size: number;
    downloadUrl: string;
  }[];
  externalId: string | null;
  tags: {
    value: string;
    source: string;
  }[];
  copyright: {
    status: string;
    notice: string;
  };
  expiresAt: string | null;
  licenses: {
    id: string;
    title: string;
    license: string;
    addByDefault: boolean;
    requireConsensus: boolean;
  }[];
  status: string;
  relatedAssets: {
    total: number;
  };
  comments: {
    total: number;
  };
  customMetadata: CustomMetadataProperty[];
  location: {
    brand: {
      id: string;
      name: string;
    };
    library: {
      id: string;
      name: string;
    } | null;
    workspaceProject: {
      id: string;
      name: string;
    } | null;
    folder: {
      id: string;
      name: string;
    } | null;
  };
}
interface CommentResponse {
  id: string;
  creator: {
    id: string;
    email: string;
    name: string;
  };
  createdAt: string;
  modifier: {
    id: string;
    email: string;
    name: string;
  } | null;
  modifiedAt: string | null;
  content: string;
  mentionedUsers: {
    id: string;
    email: string;
    name: string;
  }[];
  isResolved: boolean;
  replies: {
    total: number;
    hasNextPage: boolean;
    limit: number;
    page: number;
    items: {
      id: string;
      creator: {
        id: string;
        email: string;
        name: string;
      };
      createdAt: string;
      modifier: {
        id: string;
        email: string;
        name: string;
      };
      modifiedAt: string;
      content: string;
      mentionedUsers: {
        id: string;
        email: string;
        name: string;
      };
    }[];
  };
  marking: {
    position: {
      x: number;
      y: number;
    };
    dimensions: {
      width: number;
      height: number;
    };
    page?: number;
    timeframe?: {
      start: number;
      end: number;
    };
  } | null;
}
interface BrowseResponse {
  folders: {
    limit: number;
    page: number;
    hasNextPage: boolean;
    total: number;
    items: {
      id: string;
      name: string;
      creator: {
        id: string;
        name: string;
        email: string;
      };
      createdAt: string;
      modifier: {
        id: string;
        name: string;
        email: string;
      } | null;
      modifiedAt: string | null;
      breadcrumbs: {
        id: string;
        name: string;
      }[];
      folders: {
        total: number;
      };
    }[];
  };
}
//#endregion
//#region src/actions/types/listWorkspaceProjectAssets.d.ts
interface ListWorkspaceProjectAssetsResponse {
  workspaceProject: {
    id: string;
    name: string;
    assets: {
      limit: number;
      page: number;
      total: number;
      hasNextPage: boolean;
      items: AssetResponse[];
    };
  };
}
//#endregion
//#region src/actions/types/listWorkspaceProjectFolders.d.ts
interface ListWorkspaceProjectFoldersResponse {
  workspaceProject: {
    id: string;
    name: string;
    browse: BrowseResponse;
  };
}
//#endregion
//#region src/actions/types/listWebhooks.d.ts
interface ListWebhooksResponse {
  webhooks: {
    total: number;
    page: number;
    limit: number;
    hasNextPage: boolean;
    items: {
      id: string;
      creator: {
        id: string;
        name: string;
        email: string;
      };
      createdAt: string;
      name: string;
      notificationUrl: string;
      secret?: string;
      __typename: string;
      project?: {
        id?: string;
      };
    }[];
  };
}
//#endregion
//#region src/actions/types/listLibraryAssets.d.ts
interface ListLibraryAssetsResponse {
  library: {
    id: string;
    name: string;
    assets: {
      limit: number;
      page: number;
      total: number;
      hasNextPage: boolean;
      items: AssetResponse[];
    };
  };
}
//#endregion
//#region src/actions/types/listLibraryCollectionts.d.ts
interface ListLibraryCollectionsResponse {
  library: {
    id: string;
    name: string;
    collections: {
      total: number;
      page: number;
      limit: number;
      hasNextPage: boolean;
      items: {
        id: string;
        name: string;
        assets: {
          total: number;
          page: number;
          limit: number;
          hasNextPage: boolean;
          items: {
            id: string;
          }[];
        };
      }[];
    };
  };
}
//#endregion
//#region src/actions/types/listLibraryFolders.d.ts
interface ListLibraryFoldersResponse {
  library: {
    id: string;
    name: string;
    browse: BrowseResponse;
  };
}
//#endregion
//#region src/actions/types/listBrandLibraries.d.ts
interface ListBrandLibrariesResponse {
  brand: {
    id: string;
    name: string;
    libraries: {
      total: number;
      hasNextPage: boolean;
      page: number;
      limit: number;
      items: {
        id: string;
        name: string;
      }[];
    };
  };
}
//#endregion
//#region src/actions/types/listBrands.d.ts
interface ListBrandsResponse {
  brands: {
    id: string;
    name: string;
    rgbaColor: {
      red: number;
      green: number;
      blue: number;
      alpha: number;
    };
    avatar: string | null;
    slug: string;
    customMetadataProperties: CustomMetadataProperty[];
  }[];
}
//#endregion
//#region src/actions/types/listBrandWorkspaceProjects.d.ts
interface ListBrandWorkspaceProjectsResponse {
  brand: {
    id: string;
    name: string;
    workspaceProjects: {
      total: number;
      limit: number;
      page: number;
      hasNextPage: boolean;
      items: {
        id: string;
        name: string;
      }[];
    };
  };
}
//#endregion
//#region src/actions/types/listAssetComments.d.ts
interface ListAssetCommentsResponse {
  asset: {
    id: string;
    externalId: string | null;
    comments: {
      total: number;
      page: number;
      limit: number;
      hasNextPage: boolean;
      items: CommentResponse[];
    };
  };
}
//#endregion
//#region src/actions/types/listRelatedAssets.d.ts
interface ListRelatedAssetsResponse {
  asset: {
    id: string;
    externalId: string | null;
    relatedAssets: {
      total: number;
      hasNextPage: boolean;
      page: number;
      limit: number;
      items: AssetResponse[];
    };
  };
}
//#endregion
//#region src/actions/types/listUserGroups.d.ts
interface ListUserGroupsResponse {
  account: {
    id: string;
    userGroups: {
      total: number;
      page: number;
      limit: number;
      hasNextPage: boolean;
      items: UserGroup[];
    };
  };
}
interface UserGroup {
  id: string;
  name: string;
  users: UsersResponse;
}
//#endregion
//#region src/actions/types/listUsers.d.ts
interface ListUsersResponse {
  account: {
    users: UsersResponse;
  };
}
//#endregion
//#region npm-dist/.entry.d.ts
declare const _default: import("@prismatic-io/spectral").CallableComponent<{
  key: "frontify";
  public: true;
  documentationUrl: "https://prismatic.io/docs/components/frontify/";
  display: {
    label: string;
    description: string;
    iconPath: string;
    category: "Application Connectors";
  };
  actions: {
    getCurrentUser: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    rawRequest: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      query: {
        label: string;
        comments: string;
        type: "code";
        required: true;
        language: "graphql";
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      variableMap: {
        label: string;
        comments: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        example: string;
        clean: (value: unknown) => Record<string, string>;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    createFolder: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      parentId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      name: {
        label: string;
        comments: string;
        example: string;
        placeholder: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      description: {
        label: string;
        comments: string;
        type: "string";
        example: string;
        placeholder: string;
        required: false;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    deleteFolders: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      brandId: {
        required: boolean;
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      libraryId: {
        required: boolean;
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      folderIds: {
        label: string;
        comments: string;
        collection: "valuelist";
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string[] | undefined;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    moveFolders: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      brandId: {
        required: boolean;
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      libraryId: {
        required: boolean;
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      folderIds: {
        comments: string;
        label: string;
        collection: "valuelist";
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string[] | undefined;
        dataSource: string;
      };
      destinationId: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    updateFolder: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      brandId: {
        required: boolean;
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      libraryId: {
        required: boolean;
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      folderId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      name: {
        required: false;
        clean: (value: unknown) => string | undefined;
        label: string;
        comments: string;
        example: string;
        placeholder: string;
        type: "string";
      };
      description: {
        label: string;
        comments: string;
        type: "string";
        example: string;
        placeholder: string;
        required: false;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    getWorkspaceProject: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      projectId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    listWorkspaceProjectAssets: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      projectId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      assetSearch: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      assetExternalId: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          page: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            default: string;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: number) => number;
          };
          limit: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            default: string;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: number) => number;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: ListWorkspaceProjectAssetsResponse;
    }>;
    listWorkspaceProjectFolders: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      projectId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          page: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            default: string;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: number) => number;
          };
          limit: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            default: string;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: number) => number;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: ListWorkspaceProjectFoldersResponse;
    }>;
    listWebhooks: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          page: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            default: string;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: number) => number;
          };
          limit: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            default: string;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: number) => number;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: ListWebhooksResponse;
    }>;
    installWebhook: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      projectId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      name: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      notificationUrl: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    uninstallWebhook: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      webhookId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    createCollection: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      parentId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      name: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    deleteCollection: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      brandId: {
        required: boolean;
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      libraryId: {
        required: boolean;
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      collectionId: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    getLibrary: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      brandId: {
        required: boolean;
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      libraryId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    listLibraryAssets: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      libraryId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      brandId: {
        required: boolean;
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      assetSearch: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      assetExternalId: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          page: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            default: string;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: number) => number;
          };
          limit: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            default: string;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: number) => number;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: ListLibraryAssetsResponse;
    }>;
    listLibraryCollaborators: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      libraryId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      brandId: {
        required: boolean;
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          page: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            default: string;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: number) => number;
          };
          limit: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            default: string;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: number) => number;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        library: {
          id: string;
          name: string;
          collaborators: {
            users: {
              total: number;
              page: number;
              limit: number;
              hasNextPage: boolean;
              items: {
                id: string;
                email: string;
                name: string;
              }[];
            };
          };
        };
      };
    }>;
    listLibraryCollections: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      libraryId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      brandId: {
        required: boolean;
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          page: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            default: string;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: number) => number;
          };
          limit: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            default: string;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: number) => number;
          };
          assetPage: {
            label: string;
            comments: string;
            type: "string";
            default: string;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: number) => number;
          };
          assetLimit: {
            label: string;
            comments: string;
            type: "string";
            default: string;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: number) => number;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: ListLibraryCollectionsResponse;
    }>;
    listLibraryFolders: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      libraryId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      brandId: {
        required: boolean;
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          page: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            default: string;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: number) => number;
          };
          limit: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            default: string;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: number) => number;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: ListLibraryFoldersResponse;
    }>;
    updateCollection: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      brandId: {
        required: boolean;
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      libraryId: {
        required: boolean;
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      collectionId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      name: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    getBrand: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      brandId: {
        comments: string;
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    listBrandLibraries: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      brandId: {
        comments: string;
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          page: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            default: string;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: number) => number;
          };
          limit: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            default: string;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: number) => number;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: ListBrandLibrariesResponse;
    }>;
    listBrands: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: ListBrandsResponse;
    }>;
    listBrandWorkspaceProjects: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      brandId: {
        comments: string;
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          page: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            default: string;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: number) => number;
          };
          limit: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            default: string;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: number) => number;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: ListBrandWorkspaceProjectsResponse;
    }>;
    createAsset: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      fileId: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      title: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      parentId: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      externalId: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      tags: {
        label: string;
        comments: string;
        collection: "valuelist";
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        clean: (tags: unknown) => Record<string, string>[] | undefined;
      };
      directory: {
        label: string;
        comments: string;
        example: string;
        collection: "valuelist";
        required: false;
        type: "string";
        clean: (value: unknown) => string[] | undefined;
      };
      additionalFields: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          description: {
            label: string;
            comments: string;
            type: "string";
            placeholder: string;
            example: string;
            required: false;
            clean: (value: unknown) => string | undefined;
          };
          copyrightStatus: {
            label: string;
            comments: string;
            example: string;
            placeholder: string;
            required: false;
            model: {
              label: string;
              value: string;
            }[];
            type: "string";
            clean: (value: unknown) => string | undefined;
          };
          copyrightNotice: {
            label: string;
            comments: string;
            type: "text";
            required: false;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          skipFileMetadata: {
            label: string;
            comments: string;
            type: "boolean";
            default: string;
            clean: (value: unknown, defaultValue?: boolean) => boolean;
          };
          expiresAt: {
            label: string;
            comments: string;
            type: "string";
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
          author: {
            label: string;
            comments: string;
            example: string;
            placeholder: string;
            type: "string";
            required: false;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    createAttachment: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      parentId: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      fileId: {
        label: string;
        comments: string;
        example: string;
        placeholder: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      name: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      externalId: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    deleteAsset: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      assetId: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    deleteAttachment: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      attachmentId: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    getAsset: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      assetId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    getAssetsByIds: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      assetIds: {
        label: string;
        collection: "valuelist";
        comments: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string[] | undefined;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    listAssetComments: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      assetId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          page: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            default: string;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: number) => number;
          };
          limit: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            default: string;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: number) => number;
          };
          replyLimit: {
            label: string;
            comments: string;
            type: "string";
            default: string;
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: number) => number;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: ListAssetCommentsResponse;
    }>;
    listRelatedAssets: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      assetId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          page: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            default: string;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: number) => number;
          };
          limit: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            default: string;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: number) => number;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: ListRelatedAssetsResponse;
    }>;
    moveAssets: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      assetIds: {
        label: string;
        comments: string;
        collection: "valuelist";
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string[] | undefined;
        dataSource: string;
      };
      destinationId: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    updateAsset: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      assetId: {
        label: string;
        comments: string;
        required: true;
        type: "string";
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      filename: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      title: {
        required: false;
        clean: (value: unknown) => string | undefined;
        label: string;
        comments: string;
        type: "string";
        placeholder: string;
        example: string;
      };
      additionalFields: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          description: {
            label: string;
            comments: string;
            type: "string";
            placeholder: string;
            example: string;
            required: false;
            clean: (value: unknown) => string | undefined;
          };
          copyrightStatus: {
            label: string;
            comments: string;
            example: string;
            placeholder: string;
            required: false;
            model: {
              label: string;
              value: string;
            }[];
            type: "string";
            clean: (value: unknown) => string | undefined;
          };
          copyrightNotice: {
            label: string;
            comments: string;
            type: "text";
            required: false;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          expiresAt: {
            label: string;
            comments: string;
            type: "string";
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
          author: {
            label: string;
            comments: string;
            example: string;
            placeholder: string;
            type: "string";
            required: false;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    uploadFile: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      filename: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      size: {
        label: string;
        comments: string;
        type: "string";
        example: string;
        placeholder: string;
        required: true;
        clean: (value: unknown, defaultValue?: number) => number;
      };
      chunkSize: {
        label: string;
        comments: string;
        type: "string";
        example: string;
        placeholder: string;
        required: false;
        clean: (value: unknown) => number | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    getAccountId: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    listUserGroups: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          page: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            default: string;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: number) => number;
          };
          limit: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            default: string;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: number) => number;
          };
          userPage: {
            label: string;
            comments: string;
            type: "string";
            default: string;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: number) => number;
          };
          userPageLimit: {
            label: string;
            comments: string;
            type: "string";
            default: string;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: number) => number;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: ListUserGroupsResponse;
    }>;
    listUsers: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          page: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            default: string;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: number) => number;
          };
          limit: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            default: string;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: number) => number;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: ListUsersResponse;
    }>;
  };
  triggers: {
    pollChangesTrigger: import("@prismatic-io/spectral").PollingTriggerDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      libraryId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      lookBackDate: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => string;
      };
      showNewRecords: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      showUpdatedRecords: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, import("@prismatic-io/spectral").TriggerPayload<Record<string, unknown>>, boolean, {
      payload: {
        body: {
          data: {
            created: AssetResponse[];
            updated: AssetResponse[];
          };
        };
        headers: {
          [key: string]: string;
        };
        queryParameters: {
          [key: string]: string;
        };
        rawBody: {
          data: unknown;
          contentType?: string;
        };
        pathFragment: string;
        webhookUrls: {
          [key: string]: string;
        };
        webhookApiKeys: {
          [key: string]: string[];
        };
        invokeUrl: string;
        executionId: string;
        customer: import("@prismatic-io/spectral").CustomerAttributes;
        instance: import("@prismatic-io/spectral").InstanceAttributes;
        user: import("@prismatic-io/spectral").UserAttributes;
        integration: import("@prismatic-io/spectral").IntegrationAttributes;
        flow: import("@prismatic-io/spectral").FlowAttributes;
        startedAt: string;
        globalDebug: boolean;
        paginationState?: Record<string, unknown> | undefined;
      };
      polledNoChanges: boolean;
    }, import("@prismatic-io/spectral").Inputs>;
  };
  dataSources: {
    brandDataSource: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    libraryDataSource: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      brandId: {
        dataSource: undefined;
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    libraryAssetDataSource: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      libraryId: {
        dataSource: undefined;
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    workspaceProjectDatasource: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      brandId: {
        dataSource: undefined;
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    workspaceProjectAssetDataSource: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      projectId: {
        dataSource: undefined;
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectWorkspaceProjectFolder: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      projectId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectWebhook: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectRelatedAsset: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      assetId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectLibraryFolder: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      libraryId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectLibraryCollection: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      libraryId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
  };
  connections: (import("@prismatic-io/spectral").KeyedConnection<{
    key: "frontifyOAuth2";
    display: {
      label: string;
      description: string;
    };
    oauth2Type: import("@prismatic-io/spectral").OAuth2Type.AuthorizationCode;
    oauth2PkceMethod: import("@prismatic-io/spectral").OAuth2PkceMethod.S256;
    inputs: {
      baseUrl: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        required: true;
      };
      authorizeUrl: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
      };
      tokenUrl: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
      };
      scopes: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        placeholder: string;
      };
      clientId: {
        label: string;
        placeholder: string;
        type: "password";
        required: true;
      };
      clientSecret: {
        label: string;
        placeholder: string;
        type: "password";
        required: true;
      };
      state: {
        label: string;
        type: "string";
        comments: string;
        example: string;
      };
    };
  }, "frontifyOAuth2"> | import("@prismatic-io/spectral").KeyedConnection<{
    key: "personalDeveloperToken";
    display: {
      label: string;
      description: string;
    };
    inputs: {
      baseUrl: {
        label: string;
        type: "string";
        comments: string;
        placeholder: string;
        example: string;
        required: true;
      };
      personalDeveloperToken: {
        label: string;
        type: "password";
        required: true;
        comments: string;
      };
    };
  }, "personalDeveloperToken">)[];
}>;
export = _default;