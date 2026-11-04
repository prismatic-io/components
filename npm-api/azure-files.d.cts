//#region npm-dist/.entry.d.ts
declare const _default: import("@prismatic-io/spectral").CallableComponent<{
  key: "azure-files";
  documentationUrl: "https://prismatic.io/docs/components/azure-files/";
  public: true;
  display: {
    label: string;
    description: string;
    iconPath: string;
    category: "Data Platforms";
  };
  actions: {
    uploadFile: import("@prismatic-io/spectral").ActionDefinition<{
      azureConnection: {
        label: string;
        type: "connection";
        required: true;
      };
      shareName: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      path: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
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
      data: Omit<import("@azure/storage-file-share").FileCreateResponse, "_response">;
    }>;
    saveFromUrl: import("@prismatic-io/spectral").ActionDefinition<{
      azureConnection: {
        label: string;
        type: "connection";
        required: true;
      };
      shareName: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      path: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      sourceUrl: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: Omit<import("@azure/storage-file-share").FileCreateResponse, "_response">;
    }>;
    downloadFile: import("@prismatic-io/spectral").ActionDefinition<{
      azureConnection: {
        label: string;
        type: "connection";
        required: true;
      };
      shareName: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      path: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: Buffer<ArrayBufferLike>;
      contentType: string | undefined;
    }>;
    deleteFile: import("@prismatic-io/spectral").ActionDefinition<{
      azureConnection: {
        label: string;
        type: "connection";
        required: true;
      };
      shareName: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      path: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: Omit<import("@azure/storage-file-share").FileDeleteResponse, "_response">;
    }>;
    copyFile: import("@prismatic-io/spectral").ActionDefinition<{
      azureConnection: {
        label: string;
        type: "connection";
        required: true;
      };
      shareName: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      fromPath: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      toPath: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: Omit<import("@azure/storage-file-share").FileStartCopyResponse, "_response">;
    }>;
    listFolder: import("@prismatic-io/spectral").ActionDefinition<{
      azureConnection: {
        label: string;
        type: "connection";
        required: true;
      };
      shareName: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      path: {
        required: boolean;
        label: string;
        placeholder: string;
        type: "string";
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: (({
        kind: "file";
      } & import("@azure/storage-file-share").FileItem) | ({
        kind: "directory";
      } & import("@azure/storage-file-share").DirectoryItem))[];
    }>;
    createFolder: import("@prismatic-io/spectral").ActionDefinition<{
      azureConnection: {
        label: string;
        type: "connection";
        required: true;
      };
      shareName: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      path: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: Omit<import("@azure/storage-file-share").DirectoryCreateResponse, "_response">;
    }>;
    deleteFolder: import("@prismatic-io/spectral").ActionDefinition<{
      azureConnection: {
        label: string;
        type: "connection";
        required: true;
      };
      shareName: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      path: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: Omit<import("@azure/storage-file-share").DirectoryDeleteResponse, "_response">;
    }>;
    listShares: import("@prismatic-io/spectral").ActionDefinition<{
      azureConnection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: import("@azure/storage-file-share").ShareItem[];
    }>;
    createShare: import("@prismatic-io/spectral").ActionDefinition<{
      azureConnection: {
        label: string;
        type: "connection";
        required: true;
      };
      shareName: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: Omit<import("@azure/storage-file-share").ShareCreateResponse, "_response">;
    }>;
    deleteShare: import("@prismatic-io/spectral").ActionDefinition<{
      azureConnection: {
        label: string;
        type: "connection";
        required: true;
      };
      shareName: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: Omit<import("@azure/storage-file-share").ShareDeleteResponse, "_response">;
    }>;
  };
  dataSources: {
    selectShare: import("@prismatic-io/spectral").DataSourceDefinition<{
      azureConnection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
  };
  connections: (import("@prismatic-io/spectral").KeyedConnection<{
    key: "storageSharedKey";
    display: {
      description: string;
      label: string;
    };
    inputs: {
      accountName: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        shown: true;
        comments: string;
        example: string;
      };
      accountKey: {
        label: string;
        placeholder: string;
        type: "password";
        required: true;
        shown: true;
        comments: string;
        example: string;
      };
    };
  }, "storageSharedKey"> | import("@prismatic-io/spectral").KeyedConnection<{
    key: "connectionString";
    display: {
      description: string;
      label: string;
    };
    inputs: {
      connectionString: {
        label: string;
        placeholder: string;
        type: "password";
        required: true;
        shown: true;
        comments: string;
        example: string;
      };
    };
  }, "connectionString">)[];
}>;
export = _default;