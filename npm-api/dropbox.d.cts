import { files } from "dropbox";
//#region src/types/common.d.ts
interface StringTag {
  ".tag": string;
}
//#endregion
//#region src/types/entries.d.ts
type DropboxEntry = files.FileMetadataReference | files.FolderMetadataReference | files.DeletedMetadataReference;
//#endregion
//#region src/types/listChanges.d.ts
interface ListChangesResult {
  entries: DropboxEntry[];
  cursor: string;
  has_more: boolean;
}
//#endregion
//#region node_modules/axios/index.d.ts
type UppercaseMethod = 'GET' | 'DELETE' | 'HEAD' | 'OPTIONS' | 'POST' | 'PUT' | 'PATCH' | 'PURGE' | 'LINK' | 'UNLINK' | 'QUERY';
type Method = (UppercaseMethod | Lowercase<UppercaseMethod>) & {};
type ResponseType = 'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream' | 'formdata';
//#endregion
//#region npm-dist/.entry.d.ts
declare const _default: import("@prismatic-io/spectral").CallableComponent<{
  key: "dropbox";
  documentationUrl: "https://prismatic.io/docs/components/dropbox/";
  public: true;
  display: {
    label: string;
    description: string;
    iconPath: string;
    category: "Data Platforms";
  };
  actions: {
    getTeamMembers: import("@prismatic-io/spectral").ActionDefinition<{
      dropboxConnection: {
        label: string;
        comments: string;
        type: "connection";
        required: true;
      };
      lookupKey: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown, defaultValue?: string) => string;
      };
      lookupValue: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: import("dropbox").DropboxResponse<import("dropbox").team.MembersGetInfoV2Result>;
    }>;
    listTeamFolder: import("@prismatic-io/spectral").ActionDefinition<{
      dropboxConnection: {
        label: string;
        comments: string;
        type: "connection";
        required: true;
      };
      path: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => string;
        dataSource: string;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        comments: string;
        required: false;
        default: string;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          cursor: {
            label: string;
            placeholder: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          limit: {
            label: string;
            placeholder: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            clean: (value: unknown) => number;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    getSharedMetadataForFile: import("@prismatic-io/spectral").ActionDefinition<{
      dropboxConnection: {
        label: string;
        comments: string;
        type: "connection";
        required: true;
      };
      fileId: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      userType: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown) => "admin" | "user";
      };
      teamMemberId: {
        label: string;
        comments: string;
        placeholder: string;
        type: "string";
        required: false;
        clean: (value: unknown) => string;
        example: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: import("dropbox").DropboxResponse<import("dropbox").sharing.SharedFileMetadata>;
    }>;
    getSharedMetadataForFolder: import("@prismatic-io/spectral").ActionDefinition<{
      dropboxConnection: {
        label: string;
        comments: string;
        type: "connection";
        required: true;
      };
      fileId: {
        label: string;
        comments: string;
        required: boolean;
        example: string;
        placeholder: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
      };
      userType: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown) => "admin" | "user";
      };
      teamMemberId: {
        label: string;
        comments: string;
        placeholder: string;
        type: "string";
        required: false;
        clean: (value: unknown) => string;
        example: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: import("dropbox").DropboxResponse<import("dropbox").sharing.SharedFolderMetadata>;
    }>;
    listSharingFolder: import("@prismatic-io/spectral").ActionDefinition<{
      dropboxConnection: {
        label: string;
        comments: string;
        type: "connection";
        required: true;
      };
      path: {
        required: boolean;
        label: string;
        placeholder: string;
        type: "string";
        comments: string;
        example: string;
        clean: (value: unknown) => string;
        dataSource: string;
      };
      folderActions: {
        label: string;
        placeholder: string;
        collection: "keyvaluelist";
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => {
          ".tag": never;
        }[];
      };
      fetchAll: {
        label: string;
        type: "boolean";
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        comments: string;
        required: false;
        default: string;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          cursor: {
            label: string;
            placeholder: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          limit: {
            label: string;
            placeholder: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            clean: (value: unknown) => number;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    shareFolder: import("@prismatic-io/spectral").ActionDefinition<{
      dropboxConnection: {
        label: string;
        comments: string;
        type: "connection";
        required: true;
      };
      path: {
        comments: string;
        example: string;
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        clean: (value: unknown) => string;
        dataSource: string;
      };
      sharingPolicies: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          acl_update_policy: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            clean: (value: unknown) => StringTag | undefined;
            model: {
              label: string;
              value: string;
            }[];
            default: string;
          };
          member_policy: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            clean: (value: unknown) => StringTag | undefined;
            model: {
              label: string;
              value: string;
            }[];
            default: string;
          };
          shared_link_policy: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            clean: (value: unknown) => StringTag | undefined;
            model: {
              label: string;
              value: string;
            }[];
            default: string;
          };
          viewer_info_policy: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            clean: (value: unknown) => StringTag | undefined;
            model: {
              label: string;
              value: string;
            }[];
            default: string;
          };
          access_inheritance: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            clean: (value: unknown) => StringTag | undefined;
            model: {
              label: string;
              value: string;
            }[];
            default: string;
          };
        };
      } & {
        type: "structuredObject";
      };
      force_async: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        default: string;
      };
      actions: {
        label: string;
        type: "string";
        collection: "valuelist";
        required: false;
        comments: string;
        clean: (value: unknown) => StringTag[] | undefined;
        model: {
          label: string;
          value: string;
        }[];
        default: any[];
      };
      userType: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown) => "admin" | "user";
      };
      teamMemberId: {
        label: string;
        comments: string;
        placeholder: string;
        type: "string";
        required: false;
        clean: (value: unknown) => string;
        example: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    unshareFile: import("@prismatic-io/spectral").ActionDefinition<{
      dropboxConnection: {
        label: string;
        comments: string;
        type: "connection";
        required: true;
      };
      fileId: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      userType: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown) => "admin" | "user";
      };
      teamMemberId: {
        label: string;
        comments: string;
        placeholder: string;
        type: "string";
        required: false;
        clean: (value: unknown) => string;
        example: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    unshareFolder: import("@prismatic-io/spectral").ActionDefinition<{
      dropboxConnection: {
        label: string;
        comments: string;
        type: "connection";
        required: true;
      };
      shared_folder_id: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      leave_a_copy: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        default: string;
      };
      userType: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown) => "admin" | "user";
      };
      teamMemberId: {
        label: string;
        comments: string;
        placeholder: string;
        type: "string";
        required: false;
        clean: (value: unknown) => string;
        example: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    getCurrentAccount: import("@prismatic-io/spectral").ActionDefinition<{
      dropboxConnection: {
        label: string;
        comments: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: import("dropbox").users.FullAccount;
    }>;
    rawRequest: import("@prismatic-io/spectral").ActionDefinition<{
      url: {
        comments: string;
        example: string;
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        clean: (value: unknown) => string;
      };
      method: {
        label: string;
        type: "string";
        required: true;
        model: {
          label: Method;
          value: Method;
        }[];
        comments: string;
        clean: (value: unknown) => string;
      };
      data: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
      };
      formData: {
        label: string;
        placeholder: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        comments: string;
        example: string;
      };
      fileData: {
        label: string;
        placeholder: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        comments: string;
        example: string;
      };
      fileDataFileNames: {
        label: string;
        placeholder: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        comments: string;
        clean: (values: any) => Record<string, string> | undefined;
      };
      queryParams: {
        label: string;
        placeholder: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        comments: string;
      };
      headers: {
        label: string;
        placeholder: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        comments: string;
        example: string;
      };
      responseType: {
        label: string;
        placeholder: string;
        type: "string";
        default: string;
        required: true;
        comments: string;
        model: {
          label: ResponseType;
          value: ResponseType;
        }[];
        clean: (value: unknown) => ResponseType;
      };
      timeout: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => number;
      };
      retryDelayMS: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        default: string;
        clean: (value: unknown) => number;
      };
      retryAllErrors: {
        label: string;
        type: "boolean";
        default: string;
        required: false;
        comments: string;
        clean: (value: unknown) => boolean;
      };
      maxRetries: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        default: string;
        clean: (value: unknown) => number;
      };
      useExponentialBackoff: {
        label: string;
        type: "boolean";
        default: string;
        required: false;
        comments: string;
        clean: (value: unknown) => boolean;
      };
      connection: {
        label: string;
        comments: string;
        type: "connection";
        required: true;
      };
      userType: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown) => "admin" | "user";
      };
      teamMemberId: {
        label: string;
        comments: string;
        placeholder: string;
        type: "string";
        required: false;
        clean: (value: unknown) => string;
        example: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createSharedLink: import("@prismatic-io/spectral").ActionDefinition<{
      dropboxConnection: {
        label: string;
        comments: string;
        type: "connection";
        required: true;
      };
      path: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      linkSettings: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          require_password: {
            label: string;
            type: "boolean";
            required: false;
            comments: string;
            clean: (value: unknown, defaultValue?: boolean) => boolean;
            default: string;
          };
          link_password: {
            label: string;
            placeholder: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          expires: {
            label: string;
            placeholder: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          access: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            clean: (value: unknown) => StringTag | undefined;
            model: {
              label: string;
              value: string;
            }[];
            default: string;
          };
          allow_download: {
            label: string;
            type: "boolean";
            required: false;
            comments: string;
            clean: (value: unknown, defaultValue?: boolean) => boolean;
            default: string;
          };
        };
      } & {
        type: "structuredObject";
      };
      audience: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown) => StringTag | undefined;
        default: string;
      };
      userType: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown) => "admin" | "user";
      };
      teamMemberId: {
        label: string;
        comments: string;
        placeholder: string;
        type: "string";
        required: false;
        clean: (value: unknown) => string;
        example: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    getSharedLinkFile: import("@prismatic-io/spectral").ActionDefinition<{
      dropboxConnection: {
        label: string;
        comments: string;
        type: "connection";
        required: true;
      };
      urlToSave: {
        label: string;
        comments: string;
        required: boolean;
        example: string;
        placeholder: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
      };
      path: {
        required: boolean;
        comments: string;
        example: string;
        label: string;
        placeholder: string;
        type: "string";
        clean: (value: unknown) => string;
        dataSource: string;
      };
      link_password: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      userType: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown) => "admin" | "user";
      };
      teamMemberId: {
        label: string;
        comments: string;
        placeholder: string;
        type: "string";
        required: false;
        clean: (value: unknown) => string;
        example: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    getTemporaryLink: import("@prismatic-io/spectral").ActionDefinition<{
      dropboxConnection: {
        label: string;
        comments: string;
        type: "connection";
        required: true;
      };
      path: {
        comments: string;
        example: string;
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      teamMemberId: {
        comments: string;
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        clean: (value: unknown) => string;
        example: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: import("dropbox").DropboxResponse<import("dropbox").files.GetTemporaryLinkResult>;
    }>;
    getTemporaryUploadLink: import("@prismatic-io/spectral").ActionDefinition<{
      dropboxConnection: {
        label: string;
        comments: string;
        type: "connection";
        required: true;
      };
      path: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      duration: {
        label: string;
        placeholder: string;
        type: "string";
        comments: string;
        example: string;
        default: string;
        clean: (value: unknown) => number;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    listSharedLinks: import("@prismatic-io/spectral").ActionDefinition<{
      dropboxConnection: {
        label: string;
        comments: string;
        type: "connection";
        required: true;
      };
      path: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => string;
        dataSource: string;
      };
      direct_only: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        default: string;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        comments: string;
        required: false;
        default: string;
      };
      cursor: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      userType: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown) => "admin" | "user";
      };
      teamMemberId: {
        label: string;
        comments: string;
        placeholder: string;
        type: "string";
        required: false;
        clean: (value: unknown) => string;
        example: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    createFolder: import("@prismatic-io/spectral").ActionDefinition<{
      dropboxConnection: {
        label: string;
        comments: string;
        type: "connection";
        required: true;
      };
      path: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    listChanges: import("@prismatic-io/spectral").ActionDefinition<{
      dropboxConnection: {
        label: string;
        comments: string;
        type: "connection";
        required: true;
      };
      directoryPath: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => string;
        dataSource: string;
      };
      recursive: {
        label: string;
        comments: string;
        type: "boolean";
        default: string;
        required: true;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      includeDeleted: {
        label: string;
        comments: string;
        type: "boolean";
        default: string;
        required: true;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      userType: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown) => "admin" | "user";
      };
      teamMemberId: {
        label: string;
        comments: string;
        placeholder: string;
        type: "string";
        required: false;
        clean: (value: unknown) => string;
        example: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
      crossFlowState: Record<string, unknown>;
    }>;
    listFolder: import("@prismatic-io/spectral").ActionDefinition<{
      dropboxConnection: {
        label: string;
        comments: string;
        type: "connection";
        required: true;
      };
      path: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => string;
        dataSource: string;
      };
      recursive: {
        label: string;
        comments: string;
        type: "boolean";
        default: string;
        required: true;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        comments: string;
        required: false;
        default: string;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          cursor: {
            label: string;
            placeholder: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          limit: {
            label: string;
            placeholder: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            clean: (value: unknown) => number;
          };
        };
      } & {
        type: "structuredObject";
      };
      userType: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown) => "admin" | "user";
      };
      teamMemberId: {
        label: string;
        comments: string;
        placeholder: string;
        type: "string";
        required: false;
        clean: (value: unknown) => string;
        example: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    searchFolders: import("@prismatic-io/spectral").ActionDefinition<{
      dropboxConnection: {
        label: string;
        comments: string;
        type: "connection";
        required: true;
      };
      query: {
        label: string;
        comments: string;
        example: string;
        required: boolean;
        placeholder: string;
        type: "string";
        clean: (value: unknown) => string;
      };
      path: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => string;
        dataSource: string;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        comments: string;
        required: false;
        default: string;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          cursor: {
            label: string;
            placeholder: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          limit: {
            label: string;
            placeholder: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            clean: (value: unknown) => number;
          };
        };
      } & {
        type: "structuredObject";
      };
      userType: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown) => "admin" | "user";
      };
      teamMemberId: {
        label: string;
        comments: string;
        placeholder: string;
        type: "string";
        required: false;
        clean: (value: unknown) => string;
        example: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    copyObject: import("@prismatic-io/spectral").ActionDefinition<{
      dropboxConnection: {
        label: string;
        comments: string;
        type: "connection";
        required: true;
      };
      fromPath: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      toPath: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    deleteObject: import("@prismatic-io/spectral").ActionDefinition<{
      dropboxConnection: {
        label: string;
        comments: string;
        type: "connection";
        required: true;
      };
      path: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    downloadFile: import("@prismatic-io/spectral").ActionDefinition<{
      dropboxConnection: {
        label: string;
        comments: string;
        type: "connection";
        required: true;
      };
      path: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      download_as_zip: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        default: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
      contentType: string;
    }>;
    exportFile: import("@prismatic-io/spectral").ActionDefinition<{
      dropboxConnection: {
        label: string;
        comments: string;
        type: "connection";
        required: true;
      };
      path: {
        required: boolean;
        comments: string;
        example: string;
        label: string;
        placeholder: string;
        type: "string";
        clean: (value: unknown) => string;
        dataSource: string;
      };
      userType: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown) => "admin" | "user";
      };
      teamMemberId: {
        label: string;
        comments: string;
        placeholder: string;
        type: "string";
        required: false;
        clean: (value: unknown) => string;
        example: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    getDownloadStatus: import("@prismatic-io/spectral").ActionDefinition<{
      dropboxConnection: {
        label: string;
        comments: string;
        type: "connection";
        required: true;
      };
      asyncJobId: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: import("dropbox").DropboxResponse<import("dropbox").files.SaveUrlJobStatus>;
    }>;
    getFileLock: import("@prismatic-io/spectral").ActionDefinition<{
      dropboxConnection: {
        label: string;
        comments: string;
        type: "connection";
        required: true;
      };
      teamMemberId: {
        comments: string;
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        clean: (value: unknown) => string;
        example: string;
      };
      filePaths: {
        label: string;
        placeholder: string;
        type: "string";
        collection: "valuelist";
        comments: string;
        example: string;
        required: false;
        clean: (value: unknown) => string[] | undefined;
      };
      dynamicPaths: {
        label: string;
        type: "data";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => string[] | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: import("dropbox").DropboxResponse<import("dropbox").files.LockFileBatchResult>;
    }>;
    getMetadata: import("@prismatic-io/spectral").ActionDefinition<{
      dropboxConnection: {
        label: string;
        comments: string;
        type: "connection";
        required: true;
      };
      path: {
        comments: string;
        example: string;
        required: boolean;
        label: string;
        placeholder: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      resultOptions: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          include_media_info: {
            label: string;
            type: "boolean";
            required: false;
            comments: string;
            clean: (value: unknown, defaultValue?: boolean) => boolean;
            default: string;
          };
          include_deleted: {
            label: string;
            type: "boolean";
            required: false;
            comments: string;
            clean: (value: unknown, defaultValue?: boolean) => boolean;
            default: string;
          };
          include_has_explicit_shared_members: {
            label: string;
            type: "boolean";
            required: false;
            comments: string;
            clean: (value: unknown, defaultValue?: boolean) => boolean;
            default: string;
          };
        };
      } & {
        type: "structuredObject";
      };
      userType: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown) => "admin" | "user";
      };
      teamMemberId: {
        label: string;
        comments: string;
        placeholder: string;
        type: "string";
        required: false;
        clean: (value: unknown) => string;
        example: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: import("dropbox").DropboxResponse<import("dropbox").files.FileMetadataReference | import("dropbox").files.FolderMetadataReference | import("dropbox").files.DeletedMetadataReference>;
    }>;
    lockFile: import("@prismatic-io/spectral").ActionDefinition<{
      dropboxConnection: {
        label: string;
        comments: string;
        type: "connection";
        required: true;
      };
      teamMemberId: {
        comments: string;
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        clean: (value: unknown) => string;
        example: string;
      };
      filePaths: {
        label: string;
        placeholder: string;
        type: "string";
        collection: "valuelist";
        comments: string;
        example: string;
        required: false;
        clean: (value: unknown) => string[] | undefined;
      };
      dynamicPaths: {
        label: string;
        type: "data";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => string[] | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    moveObject: import("@prismatic-io/spectral").ActionDefinition<{
      dropboxConnection: {
        label: string;
        comments: string;
        type: "connection";
        required: true;
      };
      fromPath: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      toPath: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    saveFromUrl: import("@prismatic-io/spectral").ActionDefinition<{
      dropboxConnection: {
        label: string;
        comments: string;
        type: "connection";
        required: true;
      };
      toPath: {
        comments: string;
        example: string;
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      urlToSave: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      waitUntilComplete: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    searchFiles: import("@prismatic-io/spectral").ActionDefinition<{
      dropboxConnection: {
        label: string;
        comments: string;
        type: "connection";
        required: true;
      };
      query: {
        required: boolean;
        placeholder: string;
        comments: string;
        example: string;
        label: string;
        type: "string";
        clean: (value: unknown) => string;
      };
      path: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => string;
        dataSource: string;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        comments: string;
        required: false;
        default: string;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          cursor: {
            label: string;
            placeholder: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          limit: {
            label: string;
            placeholder: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            clean: (value: unknown) => number;
          };
        };
      } & {
        type: "structuredObject";
      };
      userType: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown) => "admin" | "user";
      };
      teamMemberId: {
        label: string;
        comments: string;
        placeholder: string;
        type: "string";
        required: false;
        clean: (value: unknown) => string;
        example: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    unlockFile: import("@prismatic-io/spectral").ActionDefinition<{
      dropboxConnection: {
        label: string;
        comments: string;
        type: "connection";
        required: true;
      };
      userType: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown) => "admin" | "user";
      };
      teamMemberId: {
        label: string;
        comments: string;
        placeholder: string;
        type: "string";
        required: false;
        clean: (value: unknown) => string;
        example: string;
      };
      filePaths: {
        label: string;
        placeholder: string;
        type: "string";
        collection: "valuelist";
        comments: string;
        example: string;
        required: false;
        clean: (value: unknown) => string[] | undefined;
      };
      dynamicPaths: {
        label: string;
        type: "data";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => string[] | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    uploadFile: import("@prismatic-io/spectral").ActionDefinition<{
      dropboxConnection: {
        label: string;
        comments: string;
        type: "connection";
        required: true;
      };
      path: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      fileContents: {
        label: string;
        placeholder: string;
        type: "data";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown) => import("@prismatic-io/spectral").DataPayload;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
  };
  triggers: {
    dropboxWebhook: import("@prismatic-io/spectral").TriggerDefinition<{
      signingSecret: {
        label: string;
        type: "password";
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, true, {
      payload: import("@prismatic-io/spectral").TriggerPayload<Record<string, unknown>>;
      branch: string;
    }, import("@prismatic-io/spectral").Inputs>;
    pollChangesTrigger: import("@prismatic-io/spectral").PollingTriggerDefinition<{
      dropboxConnection: {
        label: string;
        comments: string;
        type: "connection";
        required: true;
      };
      directoryPath: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => string;
        dataSource: string;
      };
      recursive: {
        label: string;
        comments: string;
        type: "boolean";
        default: string;
        required: true;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      includeDeleted: {
        label: string;
        comments: string;
        type: "boolean";
        default: string;
        required: true;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
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
      userType: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown) => "admin" | "user";
      };
      teamMemberId: {
        label: string;
        comments: string;
        placeholder: string;
        type: "string";
        required: false;
        clean: (value: unknown) => string;
        example: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, import("@prismatic-io/spectral").TriggerPayload<Record<string, unknown>>, boolean, {
      instanceState: {
        [x: string]: any;
      };
      payload: import("@prismatic-io/spectral").TriggerPayload<Record<string, unknown>> & {
        body: {
          data: ListChangesResult;
        };
      };
      response?: import("@prismatic-io/spectral").HttpResponse;
      crossFlowState?: Record<string, unknown>;
      executionState?: Record<string, unknown>;
      integrationState?: Record<string, unknown>;
      failed?: boolean;
      error?: Record<string, unknown>;
      polledNoChanges?: boolean;
    } | {
      instanceState?: Record<string, unknown>;
      payload: import("@prismatic-io/spectral").TriggerPayload<Record<string, unknown>> & {
        body: {
          data: ListChangesResult;
        };
      };
      response?: import("@prismatic-io/spectral").HttpResponse;
      crossFlowState?: Record<string, unknown>;
      executionState?: Record<string, unknown>;
      integrationState?: Record<string, unknown>;
      failed?: boolean;
      error?: Record<string, unknown>;
      polledNoChanges?: boolean;
    }, import("@prismatic-io/spectral").Inputs>;
  };
  connections: ({
    key: "oauth";
    display: {
      label: string;
      description: string;
    };
    oauth2Type: import("@prismatic-io/spectral").OAuth2Type.AuthorizationCode;
    inputs: {
      authorizeUrl: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        shown: false;
        comments: string;
        default: string;
      };
      tokenUrl: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        shown: false;
        comments: string;
        default: string;
      };
      scopes: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        shown: false;
        comments: string;
        default: string;
      };
      clientId: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        shown: true;
        comments: string;
      };
      clientSecret: {
        label: string;
        placeholder: string;
        type: "password";
        required: true;
        shown: true;
        comments: string;
      };
    };
  } & {
    key: "oauth";
  })[];
  dataSources: {
    listFolders: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        comments: string;
        type: "connection";
        required: true;
      };
      path: {
        dataSource: any;
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => string;
      };
      cursor: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      limit: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => number;
      };
      recursive: {
        label: string;
        comments: string;
        type: "boolean";
        default: string;
        required: true;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      userType: {
        example: string;
        label: string;
        comments: string;
        type: "string";
        required: false;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown) => "admin" | "user";
      };
      teamMemberId: {
        label: string;
        comments: string;
        placeholder: string;
        type: "string";
        required: false;
        clean: (value: unknown) => string;
        example: string;
      };
      entryFilter: {
        label: string;
        type: "string";
        required: true;
        default: string;
        comments: string;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    listSharedFolders: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        comments: string;
        type: "connection";
        required: true;
      };
      path: {
        dataSource: any;
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => string;
      };
      cursor: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      limit: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => number;
      };
      folderActions: {
        label: string;
        placeholder: string;
        collection: "keyvaluelist";
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => {
          ".tag": never;
        }[];
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    listTeamFolders: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        comments: string;
        type: "connection";
        required: true;
      };
      path: {
        dataSource: any;
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => string;
      };
      cursor: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      limit: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => number;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
  };
  hooks: {
    error: (error: unknown) => unknown;
  };
}>;
export = _default;