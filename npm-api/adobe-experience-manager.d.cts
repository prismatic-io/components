//#region node_modules/axios/index.d.ts
type UppercaseMethod = 'GET' | 'DELETE' | 'HEAD' | 'OPTIONS' | 'POST' | 'PUT' | 'PATCH' | 'PURGE' | 'LINK' | 'UNLINK' | 'QUERY';
type Method = (UppercaseMethod | Lowercase<UppercaseMethod>) & {};
type ResponseType = 'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream' | 'formdata';
//#endregion
//#region src/types/assets.d.ts
interface AssetRepositoryMetadata {
  "repo:name"?: string;
  "repo:path"?: string;
  "repo:assetId"?: string;
  "repo:createDate"?: string;
  "repo:modifyDate"?: string;
  "repo:ancestors"?: string[];
  "dc:format"?: string;
  "repo:size"?: number;
  "aem:published"?: string;
  [key: string]: unknown;
}
interface AssetSearchHit {
  assetId: string;
  repositoryMetadata?: AssetRepositoryMetadata;
  assetMetadata?: Record<string, unknown>;
}
interface DownloadedFile {
  data: Buffer;
  contentType: string;
}
interface DeletedAsset {
  assetId: string;
  deleted: true;
}
interface ImportJob {
  id: string;
  state: "PROCESSING" | "COMPLETED" | "FAILED";
  operation?: string;
  progress?: Record<string, unknown>;
  errors?: {
    type: string;
    title: string;
    detail?: string;
  }[];
  [key: string]: unknown;
}
interface AssetSearchResponse {
  hits?: {
    results?: AssetSearchHit[];
  };
  cursor?: string;
  search_metadata?: Record<string, unknown>;
}
//#endregion
//#region src/types/contentFragments.d.ts
type ContentFragmentStatus = "NEW" | "DRAFT" | "PUBLISHED" | "MODIFIED" | "UNPUBLISHED";
interface AemAuditStamp {
  at?: string;
  by?: string;
  fullName?: string;
  firstName?: string;
  lastName?: string;
}
interface AemTag {
  id: string;
  title?: string;
  titlePath?: string;
  name?: string;
  path?: string;
  description?: string;
}
interface ContentFragmentModelRef {
  id: string;
  path: string;
  name: string;
  title?: string;
}
interface ContentFragment {
  id: string;
  path: string;
  title: string;
  status: ContentFragmentStatus;
  created: AemAuditStamp;
  model: ContentFragmentModelRef;
  description?: string;
  modified?: AemAuditStamp;
  published?: AemAuditStamp;
  tags?: AemTag[];
  [key: string]: unknown;
}
interface ContentFragmentModel {
  id: string;
  path: string;
  name: string;
  title?: string;
  description?: string;
  [key: string]: unknown;
}
interface ContentFragmentVariation {
  title: string;
  name?: string;
  description?: string;
  fields?: unknown[];
  tags?: unknown[];
  modified?: AemAuditStamp;
  [key: string]: unknown;
}
//#endregion
//#region src/types/events.d.ts
type AemSitesEventCode = "aem.sites.contentFragment.created" | "aem.sites.contentFragment.modified" | "aem.sites.contentFragment.published" | "aem.sites.contentFragment.unpublished" | "aem.sites.contentFragment.deleted" | "aem.sites.page.created" | "aem.sites.page.modified" | "aem.sites.page.published" | "aem.sites.page.unpublished" | "aem.sites.page.deleted";
type AemAssetsEventCode = "aem.assets.asset.processing_completed" | "aem.assets.asset.metadata_updated" | "aem.assets.asset.published" | "aem.assets.asset.unpublished" | "aem.assets.asset.deleted";
//#endregion
//#region src/types/folders.d.ts
interface FolderItem {
  type: "FOLDER";
  folderId: string;
  name: string;
  path: string;
  title?: string;
  [key: string]: unknown;
}
interface AssetItem {
  type: "ASSET";
  assetId: string;
  name: string;
  size?: number;
  lastModifiedAt?: string;
  [key: string]: unknown;
}
type FolderListingItem = FolderItem | AssetItem;
interface FolderTreeAsset extends AssetItem {
  folderPath: string;
}
interface FolderListingResponse {
  children: FolderListingItem[];
  self?: FolderItem;
  cursor?: string;
}
interface AemJob {
  jobId: string;
  state: "QUEUED" | "PROCESSING" | "COMPLETED" | "COMPLETED_WITH_ERRORS" | "FAILED";
  status?: string;
}
interface FolderCommandProblem {
  type?: string;
  title?: string;
  detail?: string;
  path?: string;
}
interface FolderCommandResult {
  operation: string;
  status: number;
  data: {
    values?: {
      successes?: FolderItem[];
      failedFolders?: FolderCommandProblem[];
    };
    deletedFolders?: unknown[];
    failedFolders?: FolderCommandProblem[];
  };
  description?: string;
  errors?: FolderCommandProblem[];
  warnings?: unknown[];
}
//#endregion
//#region src/types/pages.d.ts
interface PageRef {
  loc: string;
  lastmod: string | null;
}
interface PageContent {
  url: string;
  finalUrl: string;
  statusCode: number;
  contentType: string | null;
  lastModified: string | null;
  etag: string | null;
  html: string;
}
//#endregion
//#region src/types/pagination.d.ts
interface CursorPageResponse<T> {
  items: T[];
  cursor?: string;
}
//#endregion
//#region src/types/records.d.ts
type AemResourceType = "contentFragment" | "asset" | "page" | "unknown";
type AemChangeType = "created" | "modified" | "published" | "unpublished" | "deleted" | "initialSync";
interface AemContentRecord {
  resourceType: AemResourceType;
  id: string;
  path: string | null;
  url: string | null;
  title: string | null;
  tags: {
    id: string;
    title: string | null;
    titlePath: string | null;
  }[];
  created: string | null;
  modified: string | null;
  published: string | null;
  scope: string;
  data: unknown;
}
interface AemChangeItem {
  changeType: AemChangeType;
  record: AemContentRecord;
}
//#endregion
//#region npm-dist/.entry.d.ts
declare const _default: import("@prismatic-io/spectral").CallableComponent<{
  key: "adobe-experience-manager";
  public: true;
  documentationUrl: "https://prismatic.io/docs/components/adobe-experience-manager/";
  display: {
    label: string;
    description: string;
    iconPath: string;
    category: "Application Connectors";
  };
  connections: (import("@prismatic-io/spectral").KeyedConnection<{
    key: "aemOAuthServerToServer";
    display: {
      label: string;
      description: string;
    };
    oauth2Type: import("@prismatic-io/spectral").OAuth2Type.ClientCredentials;
    inputs: {
      aemHost: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        shown: true;
        comments: string;
        example: string;
      };
      clientId: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        shown: true;
        comments: string;
        example: string;
      };
      clientSecret: {
        label: string;
        placeholder: string;
        type: "password";
        required: true;
        shown: true;
        comments: string;
      };
      scopes: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        shown: true;
        comments: string;
        example: string;
      };
      tokenUrl: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        shown: true;
        comments: string;
        example: string;
        default: string;
      };
    };
  }, "aemOAuthServerToServer"> | import("@prismatic-io/spectral").KeyedConnection<{
    key: "aemOAuthWebApp";
    display: {
      label: string;
      description: string;
    };
    oauth2Type: import("@prismatic-io/spectral").OAuth2Type.AuthorizationCode;
    inputs: {
      aemHost: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        shown: true;
        comments: string;
        example: string;
      };
      clientId: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        shown: true;
        comments: string;
        example: string;
      };
      clientSecret: {
        label: string;
        placeholder: string;
        type: "password";
        required: true;
        shown: true;
        comments: string;
      };
      scopes: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        shown: true;
        comments: string;
        example: string;
        default: string;
      };
      authorizeUrl: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        shown: true;
        comments: string;
        example: string;
        default: string;
      };
      tokenUrl: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        shown: true;
        comments: string;
        example: string;
        default: string;
      };
    };
  }, "aemOAuthWebApp">)[];
  actions: {
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
    getPublishedPageHtml: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      sitemapUrl: {
        required: false;
        clean: (value: unknown) => string | undefined;
        comments: string;
        label: string;
        placeholder: string;
        type: "string";
        example: string;
      };
      pageUrl: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        dataSource: string;
        comments: string;
        example: string;
        clean: (value: unknown) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: PageContent;
    }>;
    listSitemapUrls: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      sitemapUrl: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown) => string;
      };
      modifiedAfter: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      includePathPrefixes: {
        label: string;
        placeholder: string;
        type: "string";
        collection: "valuelist";
        required: false;
        default: never[];
        comments: string;
        example: string;
        clean: (value: unknown) => string[];
      };
      excludePathPrefixes: {
        label: string;
        placeholder: string;
        type: "string";
        collection: "valuelist";
        required: false;
        default: never[];
        comments: string;
        example: string;
        clean: (value: unknown) => string[];
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: PageRef[];
    }>;
    deleteAsset: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      assetId: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        dataSource: string;
        comments: string;
        example: string;
        clean: (value: unknown) => string;
      };
      force: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: AemJob | DeletedAsset;
    }>;
    downloadAsset: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      assetId: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        dataSource: string;
        comments: string;
        example: string;
        clean: (value: unknown) => string;
      };
      seoName: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, DownloadedFile>;
    downloadAssetRendition: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      assetId: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        dataSource: string;
        comments: string;
        example: string;
        clean: (value: unknown) => string;
      };
      renditionName: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        dataSource: string;
        comments: string;
        example: string;
        clean: (value: unknown) => string;
      };
      seoName: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, DownloadedFile>;
    getAssetJobStatus: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      jobId: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: AemJob;
    }>;
    getAssetMetadata: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      assetId: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        dataSource: string;
        comments: string;
        example: string;
        clean: (value: unknown) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getImportJobStatus: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      jobId: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: ImportJob;
    }>;
    importAssetFromUrl: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      folder: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        dataSource: string;
        comments: string;
        example: string;
        clean: (value: unknown) => string;
      };
      fileUrl: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown) => string;
      };
      fileName: {
        comments: string;
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        example: string;
        clean: (value: unknown) => string;
      };
      mimeType: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: ImportJob;
    }>;
    listAssetRenditions: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      assetId: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        dataSource: string;
        comments: string;
        example: string;
        clean: (value: unknown) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    searchAssets: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
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
            clean: (value: unknown) => number | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      folderIds: {
        label: string;
        placeholder: string;
        type: "string";
        collection: "valuelist";
        required: false;
        default: never[];
        dataSource: string;
        comments: string;
        example: string;
        clean: (value: unknown) => string[];
      };
      mimeTypes: {
        label: string;
        placeholder: string;
        type: "string";
        collection: "valuelist";
        required: false;
        default: never[];
        comments: string;
        example: string;
        clean: (value: unknown) => string[];
      };
      modifiedAfter: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      modifiedBefore: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      filters: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          searchText: {
            label: string;
            placeholder: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          sortField: {
            label: string;
            type: "string";
            required: false;
            model: {
              label: string;
              value: string;
            }[];
            comments: string;
            clean: (value: unknown) => string | undefined;
          };
          sortOrder: {
            label: string;
            type: "string";
            required: false;
            default: string;
            model: {
              label: string;
              value: string;
            }[];
            comments: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: AssetSearchResponse;
    }>;
    updateAssetMetadata: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      assetId: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        dataSource: string;
        comments: string;
        example: string;
        clean: (value: unknown) => string;
      };
      metadataValues: {
        label: string;
        placeholder: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        default: never[];
        comments: string;
        example: string;
        clean: (value: unknown) => Record<string, string>;
      };
      removeFields: {
        label: string;
        placeholder: string;
        type: "string";
        collection: "valuelist";
        required: false;
        default: never[];
        comments: string;
        example: string;
        clean: (value: unknown) => string[];
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createFolders: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      folderPaths: {
        label: string;
        placeholder: string;
        type: "string";
        collection: "valuelist";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown) => string[];
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: AemJob;
    } | {
      data: FolderCommandResult;
    }>;
    deleteFolders: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      folderPaths: {
        dataSource: string;
        label: string;
        placeholder: string;
        type: "string";
        collection: "valuelist";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown) => string[];
      };
      recursive: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      force: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: AemJob;
    } | {
      data: FolderCommandResult;
    }>;
    getFolderJobStatus: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      jobId: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: AemJob;
    }>;
    listAssetsInFolderTree: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      path: {
        label: string;
        dataSource: string;
        comments: string;
        placeholder: string;
        type: "string";
        required: true;
        default: string;
        example: string;
        clean: (value: unknown) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: FolderTreeAsset[];
    }>;
    listFolderContents: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      path: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        default: string;
        dataSource: string;
        comments: string;
        example: string;
        clean: (value: unknown) => string;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
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
            clean: (value: unknown) => number | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      types: {
        label: string;
        type: "string";
        required: false;
        default: string;
        model: {
          label: string;
          value: string;
        }[];
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      orderBy: {
        label: string;
        type: "string";
        required: false;
        model: {
          label: string;
          value: string;
        }[];
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: FolderListingResponse;
    } | {
      data: {
        self: FolderListingItem | undefined;
        children: FolderListingItem[];
      };
    }>;
    getContentFragment: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      fragmentId: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        dataSource: string;
        comments: string;
        example: string;
        clean: (value: unknown) => string;
      };
      includeMetadata: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      references: {
        label: string;
        type: "string";
        required: false;
        model: {
          label: string;
          value: string;
        }[];
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: ContentFragment;
    }>;
    listContentFragmentModels: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
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
            clean: (value: unknown) => number | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      projection: {
        label: string;
        type: "string";
        required: false;
        model: {
          label: string;
          value: string;
        }[];
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        items: ContentFragmentModel[];
      };
    }>;
    listContentFragmentVariations: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      fragmentId: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        dataSource: string;
        comments: string;
        example: string;
        clean: (value: unknown) => string;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
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
            clean: (value: unknown) => number | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: CursorPageResponse<ContentFragmentVariation>;
    }>;
    listContentFragments: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
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
            clean: (value: unknown) => number | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      path: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        dataSource: string;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      projection: {
        label: string;
        type: "string";
        required: false;
        model: {
          label: string;
          value: string;
        }[];
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      includeMetadata: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      references: {
        label: string;
        type: "string";
        required: false;
        model: {
          label: string;
          value: string;
        }[];
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: CursorPageResponse<ContentFragment>;
    }>;
    searchContentFragments: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
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
            clean: (value: unknown) => number | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      path: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        dataSource: string;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      onlyDirectChildren: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      statuses: {
        label: string;
        type: "string";
        collection: "valuelist";
        required: false;
        default: never[];
        model: {
          label: string;
          value: string;
        }[];
        comments: string;
        clean: (value: unknown) => string[];
      };
      modelIds: {
        label: string;
        placeholder: string;
        type: "string";
        collection: "valuelist";
        required: false;
        default: never[];
        dataSource: string;
        comments: string;
        example: string;
        clean: (value: unknown) => string[];
      };
      tags: {
        label: string;
        placeholder: string;
        type: "string";
        collection: "valuelist";
        required: false;
        default: never[];
        comments: string;
        example: string;
        clean: (value: unknown) => string[];
      };
      locales: {
        label: string;
        placeholder: string;
        type: "string";
        collection: "valuelist";
        required: false;
        default: never[];
        comments: string;
        example: string;
        clean: (value: unknown) => string[];
      };
      dateRangeFilters: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          modifiedAfter: {
            label: string;
            placeholder: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          modifiedBefore: {
            label: string;
            placeholder: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          publishedAfter: {
            label: string;
            placeholder: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          publishedBefore: {
            label: string;
            placeholder: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      filters: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          fullText: {
            label: string;
            placeholder: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          sortOn: {
            label: string;
            type: "string";
            required: false;
            model: {
              label: string;
              value: string;
            }[];
            comments: string;
            clean: (value: unknown) => string | undefined;
          };
          sortOrder: {
            label: string;
            type: "string";
            required: false;
            default: string;
            model: {
              label: string;
              value: string;
            }[];
            comments: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      projection: {
        label: string;
        type: "string";
        required: false;
        model: {
          label: string;
          value: string;
        }[];
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      includeMetadata: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: CursorPageResponse<ContentFragment>;
    }>;
  };
  dataSources: {
    selectAsset: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectAssetRendition: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      assetId: {
        dataSource: undefined;
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectContentFragment: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      path: {
        dataSource: undefined;
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectContentFragmentModel: import("@prismatic-io/spectral").DataSourceDefinition<{
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
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectFolderPath: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectSitemapPage: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      sitemapUrl: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
  };
  triggers: {
    contentFragmentChanges: import("@prismatic-io/spectral").PollingTriggerDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      lookBackDate: {
        comments: string;
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        example: string;
        clean: (value: unknown) => string;
      };
      path: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        dataSource: string;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      statuses: {
        label: string;
        type: "string";
        collection: "valuelist";
        required: false;
        default: string[];
        model: {
          label: string;
          value: string;
        }[];
        comments: string;
        clean: (value: unknown) => string[];
      };
      modelIds: {
        label: string;
        placeholder: string;
        type: "string";
        collection: "valuelist";
        required: false;
        default: never[];
        dataSource: string;
        comments: string;
        example: string;
        clean: (value: unknown) => string[];
      };
      tags: {
        label: string;
        placeholder: string;
        type: "string";
        collection: "valuelist";
        required: false;
        default: never[];
        comments: string;
        example: string;
        clean: (value: unknown) => string[];
      };
      locales: {
        label: string;
        placeholder: string;
        type: "string";
        collection: "valuelist";
        required: false;
        default: never[];
        comments: string;
        example: string;
        clean: (value: unknown) => string[];
      };
      publishBaseUrl: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, import("@prismatic-io/spectral").TriggerPayload<Record<string, unknown>>, boolean, {
      payload: {
        headers: {};
        body: {
          data: {
            items: AemChangeItem[];
          };
        };
        flow: import("@prismatic-io/spectral").FlowAttributes;
        executionId: string;
        webhookUrls: {
          [key: string]: string;
        };
        webhookApiKeys: {
          [key: string]: string[];
        };
        invokeUrl: string;
        customer: import("@prismatic-io/spectral").CustomerAttributes;
        instance: import("@prismatic-io/spectral").InstanceAttributes;
        user: import("@prismatic-io/spectral").UserAttributes;
        integration: import("@prismatic-io/spectral").IntegrationAttributes;
        startedAt: string;
        queryParameters: {
          [key: string]: string;
        };
        rawBody: {
          data: unknown;
          contentType?: string;
        };
        pathFragment: string;
        globalDebug: boolean;
        paginationState?: Record<string, unknown> | undefined;
      };
      polledNoChanges: boolean;
    }, import("@prismatic-io/spectral").Inputs>;
    assetChanges: import("@prismatic-io/spectral").PollingTriggerDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      lookBackDate: {
        comments: string;
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        example: string;
        clean: (value: unknown) => string;
      };
      folderIds: {
        label: string;
        placeholder: string;
        type: "string";
        collection: "valuelist";
        required: false;
        default: never[];
        dataSource: string;
        comments: string;
        example: string;
        clean: (value: unknown) => string[];
      };
      mimeTypes: {
        label: string;
        placeholder: string;
        type: "string";
        collection: "valuelist";
        required: false;
        default: never[];
        comments: string;
        example: string;
        clean: (value: unknown) => string[];
      };
      publishBaseUrl: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, import("@prismatic-io/spectral").TriggerPayload<Record<string, unknown>>, boolean, {
      payload: {
        headers: {};
        body: {
          data: {
            items: AemChangeItem[];
          };
        };
        flow: import("@prismatic-io/spectral").FlowAttributes;
        executionId: string;
        webhookUrls: {
          [key: string]: string;
        };
        webhookApiKeys: {
          [key: string]: string[];
        };
        invokeUrl: string;
        customer: import("@prismatic-io/spectral").CustomerAttributes;
        instance: import("@prismatic-io/spectral").InstanceAttributes;
        user: import("@prismatic-io/spectral").UserAttributes;
        integration: import("@prismatic-io/spectral").IntegrationAttributes;
        startedAt: string;
        queryParameters: {
          [key: string]: string;
        };
        rawBody: {
          data: unknown;
          contentType?: string;
        };
        pathFragment: string;
        globalDebug: boolean;
        paginationState?: Record<string, unknown> | undefined;
      };
      polledNoChanges: boolean;
    }, import("@prismatic-io/spectral").Inputs>;
    aemSitesEventWebhook: import("@prismatic-io/spectral").TriggerDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      consumerOrgId: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown) => string;
      };
      projectId: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown) => string;
      };
      workspaceId: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown) => string;
      };
      providerId: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown) => string;
      };
      eventTypes: {
        label: string;
        type: "string";
        collection: "valuelist";
        required: true;
        default: AemSitesEventCode[];
        model: {
          label: string;
          value: AemSitesEventCode;
        }[];
        comments: string;
        clean: (value: unknown) => string[];
      };
      publishBaseUrl: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, true, {
      payload: import("@prismatic-io/spectral").TriggerPayload;
      branch: string;
    } | undefined, import("@prismatic-io/spectral").Inputs>;
    aemAssetsEventWebhook: import("@prismatic-io/spectral").TriggerDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      consumerOrgId: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown) => string;
      };
      projectId: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown) => string;
      };
      workspaceId: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown) => string;
      };
      providerId: {
        placeholder: string;
        comments: string;
        example: string;
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown) => string;
      };
      eventTypes: {
        label: string;
        type: "string";
        collection: "valuelist";
        required: true;
        default: AemAssetsEventCode[];
        model: {
          label: string;
          value: AemAssetsEventCode;
        }[];
        comments: string;
        clean: (value: unknown) => string[];
      };
      publishBaseUrl: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, true, {
      payload: import("@prismatic-io/spectral").TriggerPayload;
      branch: string;
    } | undefined, import("@prismatic-io/spectral").Inputs>;
  };
  hooks: {
    error: (error: unknown) => unknown;
  };
}>;
export = _default;