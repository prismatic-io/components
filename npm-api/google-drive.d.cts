import { TriggerPayload } from "@prismatic-io/spectral";
import { drive_v3, driveactivity_v2 } from "googleapis";

//#region node_modules/axios/index.d.ts
type UppercaseMethod = 'GET' | 'DELETE' | 'HEAD' | 'OPTIONS' | 'POST' | 'PUT' | 'PATCH' | 'PURGE' | 'LINK' | 'UNLINK' | 'QUERY';
type Method = (UppercaseMethod | Lowercase<UppercaseMethod>) & {};
type ResponseType = 'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream' | 'formdata';
//#endregion
//#region src/types/changes.d.ts
interface ListChangesResponse {
  kind?: string | null;
  newStartPageToken?: string | null;
  nextPageToken?: string | null;
  changes?: {
    kind?: string | null;
    removed?: boolean | null;
    file?: {
      kind?: string | null;
      mimeType?: string | null;
      id?: string | null;
      name?: string | null;
    };
    fileId?: string | null;
    time?: string | null;
    changeType?: "file" | "drive" | null;
  }[];
}
interface BackfillCursor extends Record<string, unknown> {
  modifiedAfter: string;
  startPageToken: string;
}
interface ChangesPaginationState extends Record<string, unknown> {
  pageToken: string;
  backfill?: BackfillCursor;
}
//#endregion
//#region src/types/driveActivity.d.ts
interface ActivityPaginationState extends Record<string, unknown> {
  ancestorIndex: number;
  windowStart: string;
  cycleEnd: string;
  pageToken?: string;
}
//#endregion
//#region src/triggers/pollChangesTrigger.d.ts
interface PollRound {
  data: ListChangesResponse | drive_v3.Schema$ChangeList;
  cursor?: string;
  nextState?: ChangesPaginationState;
  noChanges: boolean;
}
interface PollResult {
  payload: Omit<TriggerPayload, "body" | "paginationState"> & {
    body: {
      data: PollRound["data"];
      contentType?: string;
    };
    paginationState?: ChangesPaginationState;
  };
  crossFlowState?: Record<string, string>;
  instanceState?: Record<string, unknown>;
  polledNoChanges: boolean;
}
//#endregion
//#region src/triggers/driveActivityPollingTrigger.d.ts
interface ActivityResult {
  payload: Omit<TriggerPayload, "body" | "paginationState"> & {
    body: {
      data: driveactivity_v2.Schema$DriveActivity[];
      contentType?: string;
    };
    paginationState?: ActivityPaginationState;
  };
  instanceState?: Record<string, unknown>;
  polledNoChanges: boolean;
}
//#endregion
//#region npm-dist/.entry.d.ts
declare const _default: import("@prismatic-io/spectral").CallableComponent<{
  key: "google-drive";
  documentationUrl: "https://prismatic.io/docs/components/google-drive/";
  public: true;
  display: {
    label: string;
    category: "Data Platforms";
    description: string;
    iconPath: string;
  };
  actions: {
    getAbout: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      fields: {
        label: string;
        type: "string";
        required: false;
        default: string;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: import("@googleapis/drive").drive_v3.Schema$About;
    }>;
    getCurrentUser: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: import("@googleapis/drive").drive_v3.Schema$User;
    }>;
    emptyTrash: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
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
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    queryDriveActivity: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      itemName: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown) => string | undefined;
      };
      ancestorName: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown) => string | undefined;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        required: false;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        default: string;
        comments: string;
      };
      pageToken: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      filter: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      consolidationStrategy: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        comments: string;
        model: {
          value: string;
          label: string;
        }[];
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    createDriveWebhook: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      driveId: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
        example: string;
        dataSource: string;
      };
      endpoint: {
        type: "string";
        label: string;
        comments: string;
        required: true;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      expiration: {
        type: "string";
        label: string;
        required: false;
        placeholder: string;
        comments: string;
        clean: (value: unknown) => string;
        example: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    createFileWebhook: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      resourceId: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        placeholder: string;
        example: string;
        comments: string;
      };
      endpoint: {
        type: "string";
        label: string;
        comments: string;
        required: true;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      expiration: {
        type: "string";
        label: string;
        required: false;
        placeholder: string;
        comments: string;
        clean: (value: unknown) => string;
        example: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    deleteWebhook: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      webhookId: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        placeholder: string;
        example: string;
        comments: string;
      };
      resourceId: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        placeholder: string;
        example: string;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    listChanges: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      driveId: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
        example: string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
      crossFlowState?: Record<string, unknown>;
      instanceState?: Record<string, unknown>;
    }>;
    listDrives: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    createFolder: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      folderName: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        example: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      parentFolderId: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        example: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    listFolders: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      driveId: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
        example: string;
        dataSource: string;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        required: false;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        default: string;
        comments: string;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          pageSize: {
            label: string;
            type: "string";
            required: false;
            placeholder: string;
            comments: string;
            example: string;
            default: string;
            clean: (value: unknown) => number | undefined;
          };
          pageToken: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      fields: {
        label: string;
        type: "string";
        required: false;
        default: string;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      folderId: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        example: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    searchFolders: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      driveId: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
        example: string;
        dataSource: string;
      };
      searchQuery: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      folderId: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        example: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
        dataSource: string;
      };
      fields: {
        label: string;
        type: "string";
        required: false;
        default: string;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        required: false;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        default: string;
        comments: string;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          pageSize: {
            label: string;
            type: "string";
            required: false;
            placeholder: string;
            comments: string;
            example: string;
            default: string;
            clean: (value: unknown) => number | undefined;
          };
          pageToken: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    getFile: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      fileId: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        dataSource: string;
      };
      exportType: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
      contentType: string;
    }>;
    getFileMetadata: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      fileId: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        dataSource: string;
      };
      metadataFields: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: import("@googleapis/drive").drive_v3.Schema$File;
    }>;
    createFile: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      folderId: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        example: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
        dataSource: string;
      };
      fileContent: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        example: string;
        comments: string;
      };
      fileName: {
        required: boolean;
        clean: (value: unknown, defaultValue?: string) => string;
        label: string;
        placeholder: string;
        type: "string";
        example: string;
        comments: string;
      };
      fields: {
        label: string;
        type: "string";
        required: false;
        default: string;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    listFiles: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      driveId: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
        example: string;
        dataSource: string;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        required: false;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        default: string;
        comments: string;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          pageSize: {
            label: string;
            type: "string";
            required: false;
            placeholder: string;
            comments: string;
            example: string;
            default: string;
            clean: (value: unknown) => number | undefined;
          };
          pageToken: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      fields: {
        label: string;
        type: "string";
        required: false;
        default: string;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      query: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    copyFile: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      fileId: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        dataSource: string;
      };
      fileName: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        example: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      folderId: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        example: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    updateFile: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      fileId: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        dataSource: string;
      };
      fileContent: {
        required: boolean;
        label: string;
        placeholder: string;
        type: "string";
        example: string;
        comments: string;
      };
      fileName: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        example: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      fields: {
        label: string;
        type: "string";
        required: false;
        default: string;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    deleteFile: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      fileId: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        dataSource: string;
      };
      fields: {
        label: string;
        type: "string";
        required: false;
        default: string;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    moveFile: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      fileId: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        dataSource: string;
      };
      folderId: {
        required: boolean;
        clean: (value: unknown, defaultValue?: string) => string;
        label: string;
        placeholder: string;
        type: "string";
        example: string;
        comments: string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    searchFiles: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      driveId: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
        example: string;
        dataSource: string;
      };
      filters: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          searchQuery: {
            label: string;
            type: "string";
            required: false;
            placeholder: string;
            comments: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          filesContainingSearchQuery: {
            label: string;
            type: "boolean";
            required: false;
            comments: string;
            clean: (value: unknown, defaultValue?: boolean) => boolean;
            default: string;
          };
          query: {
            label: string;
            type: "string";
            required: false;
            placeholder: string;
            comments: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      folderId: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        example: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
        dataSource: string;
      };
      fields: {
        label: string;
        type: "string";
        required: false;
        default: string;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        required: false;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        default: string;
        comments: string;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          pageSize: {
            label: string;
            type: "string";
            required: false;
            placeholder: string;
            comments: string;
            example: string;
            default: string;
            clean: (value: unknown) => number | undefined;
          };
          pageToken: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    listExportTypes: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      fileId: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: string[];
    }>;
  };
  triggers: {
    pushNotificationWebhook: import("@prismatic-io/spectral").TriggerDefinition<{}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      payload: import("@prismatic-io/spectral").TriggerPayload<Record<string, unknown>>;
    }, import("@prismatic-io/spectral").Inputs>;
    pollChangesTrigger: import("@prismatic-io/spectral").PollingTriggerDefinition<{
      lookBackDate: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, import("@prismatic-io/spectral").TriggerPayload<Record<string, unknown>>, boolean, PollResult, {
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      driveId: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
        example: string;
        dataSource: string;
      };
    }>;
    driveActivityPollingTrigger: import("@prismatic-io/spectral").PollingTriggerDefinition<{
      triggerEvents: {
        label: string;
        type: "string";
        placeholder: string;
        comments: string;
        collection: "valuelist";
        model: {
          value: string;
          label: string;
        }[];
        required: false;
        clean: (value: unknown) => string[];
      };
      itemName: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown) => string | undefined;
      };
      ancestorName: {
        comments: string;
        clean: (value: any) => string[];
        label: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        dataSource: string;
      };
      consolidationStrategy: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        comments: string;
        model: {
          value: string;
          label: string;
        }[];
        clean: (value: unknown) => string | undefined;
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
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, import("@prismatic-io/spectral").TriggerPayload<Record<string, unknown>>, boolean, ActivityResult, import("@prismatic-io/spectral").Inputs>;
  };
  connections: import("@prismatic-io/spectral").KeyedConnection<{
    key: "oauth2";
    display: {
      label: string;
      description: string;
      icons: {
        oauth2ConnectionIconPath: string;
      };
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
        required: true;
        comments: string;
        default: string;
      };
      clientId: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
      };
      clientSecret: {
        label: string;
        placeholder: string;
        type: "password";
        required: true;
        comments: string;
      };
    };
  }, "oauth2">[];
  dataSources: {
    selectDrive: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectFolder: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      driveId: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
        example: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectFiles: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      driveId: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
        example: string;
      };
      query: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      pageSize: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        comments: string;
        example: string;
        default: string;
        clean: (value: unknown) => number | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
  };
  hooks: {
    error: (error: unknown) => unknown;
  };
}>;
export = _default;