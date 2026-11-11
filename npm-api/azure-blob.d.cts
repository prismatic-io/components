//#region npm-dist/.entry.d.ts
declare const _default: import("@prismatic-io/spectral").CallableComponent<{
  key: "azure-blob";
  documentationUrl: "https://prismatic.io/docs/components/azure-blob/";
  public: true;
  display: {
    label: string;
    description: string;
    iconPath: string;
    category: "Data Platforms";
  };
  actions: {
    listContainers: import("@prismatic-io/spectral").ActionDefinition<{
      azureConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any[];
    }>;
    createContainer: import("@prismatic-io/spectral").ActionDefinition<{
      containerName: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        dataSource: string;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      azureConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        _response: {
          parsedHeaders: {};
          status: number;
          headers: {};
          request: {
            url: string;
            method: string;
            headers: any;
            withCredentials: boolean;
            timeout: number;
            requestId: string;
            validateRequestProperties: any;
            prepare: any;
            clone: any;
          };
        };
      };
    }>;
    deleteContainer: import("@prismatic-io/spectral").ActionDefinition<{
      containerName: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        dataSource: string;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      azureConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        _response: {
          parsedHeaders: {};
          status: number;
          headers: {};
          request: {
            url: string;
            method: string;
            headers: any;
            withCredentials: boolean;
            timeout: number;
            requestId: string;
            validateRequestProperties: any;
            prepare: any;
            clone: any;
          };
        };
      };
    }>;
    listBlobs: import("@prismatic-io/spectral").ActionDefinition<{
      containerName: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        dataSource: string;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      prefix: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      azureConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any[];
    }>;
    createAppendBlob: import("@prismatic-io/spectral").ActionDefinition<{
      containerName: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        dataSource: string;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      blobName: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        dataSource: string;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      azureConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        _response: {
          parsedHeaders: {};
          status: number;
          headers: {};
          request: {
            url: string;
            method: string;
            headers: any;
            withCredentials: boolean;
            timeout: number;
            requestId: string;
            validateRequestProperties: any;
            prepare: any;
            clone: any;
          };
        };
      };
    }>;
    appendToAppendBlob: import("@prismatic-io/spectral").ActionDefinition<{
      containerName: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        dataSource: string;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      blobName: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        dataSource: string;
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
      azureConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        _response: {
          parsedHeaders: {};
          status: number;
          headers: {};
          request: {
            url: string;
            method: string;
            headers: any;
            withCredentials: boolean;
            timeout: number;
            requestId: string;
            validateRequestProperties: any;
            prepare: any;
            clone: any;
          };
        };
      };
    }>;
    createPageBlob: import("@prismatic-io/spectral").ActionDefinition<{
      containerName: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        dataSource: string;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      blobName: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        dataSource: string;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      pageBlobSize: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      azureConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        _response: {
          parsedHeaders: {};
          status: number;
          headers: {};
          request: {
            url: string;
            method: string;
            headers: any;
            withCredentials: boolean;
            timeout: number;
            requestId: string;
            validateRequestProperties: any;
            prepare: any;
            clone: any;
          };
        };
      };
    }>;
    resizePageBlob: import("@prismatic-io/spectral").ActionDefinition<{
      containerName: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        dataSource: string;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      blobName: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        dataSource: string;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      pageBlobSize: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      azureConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        _response: {
          parsedHeaders: {};
          status: number;
          headers: {};
          request: {
            url: string;
            method: string;
            headers: any;
            withCredentials: boolean;
            timeout: number;
            requestId: string;
            validateRequestProperties: any;
            prepare: any;
            clone: any;
          };
        };
      };
    }>;
    uploadToPageBlob: import("@prismatic-io/spectral").ActionDefinition<{
      containerName: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        dataSource: string;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      blobName: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        dataSource: string;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      pageBlobOffset: {
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
      azureConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        _response: {
          parsedHeaders: {};
          status: number;
          headers: {};
          request: {
            url: string;
            method: string;
            headers: any;
            withCredentials: boolean;
            timeout: number;
            requestId: string;
            validateRequestProperties: any;
            prepare: any;
            clone: any;
          };
        };
      };
    }>;
    uploadBlockBlob: import("@prismatic-io/spectral").ActionDefinition<{
      containerName: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        dataSource: string;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      blobName: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        dataSource: string;
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
      azureConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        _response: {
          parsedHeaders: {};
          status: number;
          headers: {};
          request: {
            url: string;
            method: string;
            headers: any;
            withCredentials: boolean;
            timeout: number;
            requestId: string;
            validateRequestProperties: any;
            prepare: any;
            clone: any;
          };
        };
      };
    }>;
    downloadBlob: import("@prismatic-io/spectral").ActionDefinition<{
      containerName: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        dataSource: string;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      blobName: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        dataSource: string;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      azureConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: Buffer<ArrayBufferLike>;
      contentType: string;
    }>;
    deleteBlob: import("@prismatic-io/spectral").ActionDefinition<{
      containerName: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        dataSource: string;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      blobName: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        dataSource: string;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      azureConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        _response: {
          parsedHeaders: {};
          status: number;
          headers: {};
          request: {
            url: string;
            method: string;
            headers: any;
            withCredentials: boolean;
            timeout: number;
            requestId: string;
            validateRequestProperties: any;
            prepare: any;
            clone: any;
          };
        };
      };
    }>;
    generateSasUrl: import("@prismatic-io/spectral").ActionDefinition<{
      azureConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      containerName: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        dataSource: string;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      blobName: {
        comments: string;
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        dataSource: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      sasStartsOnDate: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      sasPermissions: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      sasExpiresOnDate: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: string;
    }>;
  };
  dataSources: {
    selectContainer: import("@prismatic-io/spectral").DataSourceDefinition<{
      azureConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectBlob: import("@prismatic-io/spectral").DataSourceDefinition<{
      azureConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      containerName: {
        dataSource: any;
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      prefix: {
        comments: string;
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
  };
  connections: (import("@prismatic-io/spectral").KeyedConnection<{
    key: "storageSharedKey";
    display: {
      label: string;
      description: string;
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
        type: "string";
        required: true;
        shown: true;
        comments: string;
        example: string;
      };
    };
  }, "storageSharedKey"> | import("@prismatic-io/spectral").KeyedConnection<{
    key: "connectionString";
    display: {
      label: string;
      description: string;
    };
    inputs: {
      connectionString: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        shown: true;
        comments: string;
        example: string;
      };
    };
  }, "connectionString">)[];
}>;
export = _default;