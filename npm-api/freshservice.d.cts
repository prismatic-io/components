//#region node_modules/axios/index.d.ts
type UppercaseMethod = 'GET' | 'DELETE' | 'HEAD' | 'OPTIONS' | 'POST' | 'PUT' | 'PATCH' | 'PURGE' | 'LINK' | 'UNLINK' | 'QUERY';
type Method = (UppercaseMethod | Lowercase<UppercaseMethod>) & {};
type ResponseType = 'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream' | 'formdata';
//#endregion
//#region src/types/itam.d.ts
interface ItamMeta {
  page: number;
  per_page: number;
  total_count: number;
}
interface ItamWriteResult {
  action: string;
  id: number | null;
  name: string;
  didSomethingChange: boolean;
  isNew: boolean;
  code: number | null;
  raw: unknown[];
}
//#endregion
//#region npm-dist/.entry.d.ts
declare const _default: import("@prismatic-io/spectral").CallableComponent<{
  key: "freshservice";
  public: true;
  documentationUrl: "https://prismatic.io/docs/components/freshservice/";
  display: {
    label: string;
    description: string;
    iconPath: string;
    category: "Application Connectors";
  };
  hooks: {
    error: (error: unknown) => unknown;
  };
  actions: {
    getWorkspace: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      workspaceId: {
        comments: string;
        required: true;
        clean: (value: unknown, defaultValue?: number) => number;
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        dataSource: string;
      };
      additionalQueryParams: {
        label: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        comments: string;
        clean: (value: unknown) => Record<string, unknown>;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listWorkspaces: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        comments: string;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          perPage: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            placeholder: string;
            clean: (value: unknown) => number | undefined;
          };
          page: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            placeholder: string;
            clean: (value: unknown) => number | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      additionalQueryParams: {
        label: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        comments: string;
        clean: (value: unknown) => Record<string, unknown>;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        [x: string]: unknown[];
      };
    }>;
    rawRequest: import("@prismatic-io/spectral").ActionDefinition<{
      url: {
        comments: string;
        example: string;
        placeholder: string;
        label: string;
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
    createServiceRequest: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      displayId: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      quantity: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: number) => number;
      };
      email: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      requestedFor: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      serviceRequestAdditionalFields: {
        comments: string;
        label: string;
        type: "code";
        language: "json";
        required: false;
        clean: (value: unknown) => object | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createSoftware: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
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
      description: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      applicationType: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown, defaultValue?: string) => string;
      };
      managedById: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => number | undefined;
      };
      additionalFields: {
        label: string;
        comments: string;
        inputs: {
          status: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            placeholder: string;
            model: {
              label: string;
              value: string;
            }[];
            clean: (value: unknown) => string | undefined;
          };
          notes: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
          category: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
          source: {
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
      workspaceId: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown) => number | undefined;
      };
      softwareAdditionalFields: {
        comments: string;
        label: string;
        type: "code";
        language: "json";
        required: false;
        clean: (value: unknown) => object | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deleteSoftware: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      applicationId: {
        comments: string;
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: number) => number;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        success: boolean;
      };
    }>;
    getSoftware: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      applicationId: {
        comments: string;
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: number) => number;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listSoftware: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    moveSoftware: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      applicationId: {
        comments: string;
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: number) => number;
      };
      workspaceId: {
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: number) => number;
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    updateSoftware: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      applicationId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: number) => number;
      };
      managedById: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => number | undefined;
      };
      additionalFields: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          name: {
            required: false;
            clean: (value: unknown) => string | undefined;
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
          };
          description: {
            required: false;
            clean: (value: unknown) => string | undefined;
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
          };
          applicationType: {
            required: false;
            clean: (value: unknown) => string | undefined;
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            model: {
              label: string;
              value: string;
            }[];
          };
          status: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            placeholder: string;
            model: {
              label: string;
              value: string;
            }[];
            clean: (value: unknown) => string | undefined;
          };
          notes: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
          category: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
          source: {
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
      softwareAdditionalFields: {
        comments: string;
        label: string;
        type: "code";
        language: "json";
        required: false;
        clean: (value: unknown) => object | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createOrUpdateItamDevice: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      name: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      deviceId: {
        required: false;
        comments: string;
        clean: (value: unknown) => number | undefined;
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        dataSource: string;
      };
      serialNo: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      uuid: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      assetNo: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      type: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        model: {
          label: string;
          value: string;
        }[];
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      physicalSubtypeId: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown) => number | undefined;
      };
      inService: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        model: {
          label: string;
          value: string;
        }[];
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      networkDevice: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        model: {
          label: string;
          value: string;
        }[];
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      virtualHost: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        model: {
          label: string;
          value: string;
        }[];
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      datacenter: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      customers: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      itamDevicesAdditionalFields: {
        comments: string;
        label: string;
        type: "code";
        language: "json";
        required: false;
        clean: (value: unknown) => object | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: ItamWriteResult;
    }>;
    deleteItamDevice: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      deviceId: {
        comments: string;
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: number) => number;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        success: boolean;
      };
    }>;
    getItamDevice: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      deviceId: {
        comments: string;
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: number) => number;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listItamDevices: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        comments: string;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          perPage: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            placeholder: string;
            clean: (value: unknown) => number | undefined;
          };
          page: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            placeholder: string;
            clean: (value: unknown) => number | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      includeCols: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        meta: ItamMeta;
      };
    }>;
    updateItamDevice: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      deviceId: {
        comments: string;
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: number) => number;
      };
      name: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      assetNo: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      type: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        model: {
          label: string;
          value: string;
        }[];
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      physicalSubtypeId: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown) => number | undefined;
      };
      inService: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        model: {
          label: string;
          value: string;
        }[];
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      networkDevice: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        model: {
          label: string;
          value: string;
        }[];
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      virtualHost: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        model: {
          label: string;
          value: string;
        }[];
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      datacenter: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      customers: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      itamDevicesAdditionalFields: {
        comments: string;
        label: string;
        type: "code";
        language: "json";
        required: false;
        clean: (value: unknown) => object | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: ItamWriteResult;
    }>;
    createOrUpdateItamAsset: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      type: {
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        label: string;
        comments: string;
        type: "string";
        model: {
          label: string;
          value: string;
        }[];
        example: string;
        placeholder: string;
      };
      name: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      serialNo: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      assetNo: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      serviceLevel: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      inService: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        model: {
          label: string;
          value: string;
        }[];
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      deviceName: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      backConnectionType: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        model: {
          label: string;
          value: string;
        }[];
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      vendor: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      objectCategory: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      tags: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      notes: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      rackPlacement: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          rack: {
            label: string;
            comments: string;
            type: "string";
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
          rackId: {
            label: string;
            comments: string;
            type: "string";
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown) => number | undefined;
          };
          startAt: {
            label: string;
            comments: string;
            type: "string";
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
          size: {
            label: string;
            comments: string;
            type: "string";
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown) => number | undefined;
          };
          orientation: {
            label: string;
            comments: string;
            type: "string";
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
          where: {
            label: string;
            comments: string;
            type: "string";
            required: false;
            model: {
              label: string;
              value: string;
            }[];
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
          xPos: {
            label: string;
            comments: string;
            type: "string";
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown) => number | undefined;
          };
          depth: {
            label: string;
            comments: string;
            type: "string";
            required: false;
            model: {
              label: string;
              value: string;
            }[];
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      itamAssetsAdditionalFields: {
        comments: string;
        label: string;
        type: "code";
        language: "json";
        required: false;
        clean: (value: unknown) => object | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: ItamWriteResult;
    }>;
    deleteItamAsset: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      assetId: {
        comments: string;
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: number) => number;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        success: boolean;
      };
    }>;
    getItamAsset: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      assetId: {
        comments: string;
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: number) => number;
      };
      includeCols: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listItamAssets: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        comments: string;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          perPage: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            placeholder: string;
            clean: (value: unknown) => number | undefined;
          };
          page: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            placeholder: string;
            clean: (value: unknown) => number | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      includeCols: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        meta: ItamMeta;
      };
    }>;
    updateItamAsset: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      assetId: {
        comments: string;
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: number) => number;
      };
      type: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        model: {
          label: string;
          value: string;
        }[];
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      name: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      serialNo: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      assetNo: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      serviceLevel: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      inService: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        model: {
          label: string;
          value: string;
        }[];
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      deviceName: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      backConnectionType: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        model: {
          label: string;
          value: string;
        }[];
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      vendor: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      objectCategory: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      tags: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      notes: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      rackPlacement: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          rack: {
            label: string;
            comments: string;
            type: "string";
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
          rackId: {
            label: string;
            comments: string;
            type: "string";
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown) => number | undefined;
          };
          startAt: {
            label: string;
            comments: string;
            type: "string";
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
          size: {
            label: string;
            comments: string;
            type: "string";
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown) => number | undefined;
          };
          orientation: {
            label: string;
            comments: string;
            type: "string";
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
          where: {
            label: string;
            comments: string;
            type: "string";
            required: false;
            model: {
              label: string;
              value: string;
            }[];
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
          xPos: {
            label: string;
            comments: string;
            type: "string";
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown) => number | undefined;
          };
          depth: {
            label: string;
            comments: string;
            type: "string";
            required: false;
            model: {
              label: string;
              value: string;
            }[];
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      itamAssetsAdditionalFields: {
        comments: string;
        label: string;
        type: "code";
        language: "json";
        required: false;
        clean: (value: unknown) => object | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: ItamWriteResult;
    }>;
    createAsset: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
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
      assetTypeId: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: number) => number;
      };
      additionalFields: {
        label: string;
        comments: string;
        inputs: {
          assetTag: {
            label: string;
            comments: string;
            type: "string";
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
          impact: {
            label: string;
            comments: string;
            type: "string";
            required: false;
            example: string;
            placeholder: string;
            model: {
              label: string;
              value: string;
            }[];
            clean: (value: unknown) => string | undefined;
          };
          usageType: {
            label: string;
            comments: string;
            type: "string";
            required: false;
            model: {
              label: string;
              value: string;
            }[];
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
          description: {
            label: string;
            comments: string;
            type: "string";
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      locationId: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown) => number | undefined;
      };
      agentId: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown) => number | undefined;
      };
      departmentId: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown) => number | undefined;
      };
      groupId: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown) => number | undefined;
      };
      workspaceId: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown) => number | undefined;
      };
      assetsAdditionalFields: {
        comments: string;
        label: string;
        type: "code";
        language: "json";
        required: false;
        clean: (value: unknown) => object | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deleteAsset: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      assetDisplayId: {
        comments: string;
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: number) => number;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        success: boolean;
      };
    }>;
    getAsset: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      assetDisplayId: {
        comments: string;
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: number) => number;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listAssets: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        comments: string;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          perPage: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            placeholder: string;
            clean: (value: unknown) => number | undefined;
          };
          page: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            placeholder: string;
            clean: (value: unknown) => number | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      additionalQueryParams: {
        label: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        comments: string;
        clean: (value: unknown) => Record<string, unknown>;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        [x: string]: unknown[];
      };
    }>;
    moveAsset: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      assetDisplayId: {
        comments: string;
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: number) => number;
      };
      workspaceId: {
        comments: string;
        required: true;
        clean: (value: unknown, defaultValue?: number) => number;
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        dataSource: string;
      };
      groupId: {
        comments: string;
        label: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown) => number | undefined;
      };
      agentId: {
        comments: string;
        label: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown) => number | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    searchAsset: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      searchQuery: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      additionalQueryParams: {
        label: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        comments: string;
        clean: (value: unknown) => Record<string, unknown>;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    updateAsset: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      assetDisplayId: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: number) => number;
      };
      assetTypeId: {
        required: false;
        clean: (value: unknown) => number | undefined;
        label: string;
        comments: string;
        type: "string";
        example: string;
        placeholder: string;
      };
      locationId: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown) => number | undefined;
      };
      agentId: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown) => number | undefined;
      };
      departmentId: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown) => number | undefined;
      };
      groupId: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown) => number | undefined;
      };
      additionalFields: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          name: {
            required: false;
            clean: (value: unknown) => string | undefined;
            label: string;
            comments: string;
            type: "string";
            example: string;
            placeholder: string;
          };
          assetTag: {
            label: string;
            comments: string;
            type: "string";
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
          impact: {
            label: string;
            comments: string;
            type: "string";
            required: false;
            example: string;
            placeholder: string;
            model: {
              label: string;
              value: string;
            }[];
            clean: (value: unknown) => string | undefined;
          };
          usageType: {
            label: string;
            comments: string;
            type: "string";
            required: false;
            model: {
              label: string;
              value: string;
            }[];
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
          description: {
            label: string;
            comments: string;
            type: "string";
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      assetsAdditionalFields: {
        comments: string;
        label: string;
        type: "code";
        language: "json";
        required: false;
        clean: (value: unknown) => object | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createAgent: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      firstName: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      lastName: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      email: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      roles: {
        label: string;
        comments: string;
        type: "code";
        language: "json";
        required: true;
        example: string;
        clean: (value: unknown) => any[] | undefined;
      };
      contactInfo: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          workPhoneNumber: {
            label: string;
            comments: string;
            type: "string";
            required: false;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          mobilePhoneNumber: {
            label: string;
            comments: string;
            type: "string";
            required: false;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          address: {
            label: string;
            comments: string;
            type: "string";
            required: false;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      occasional: {
        label: string;
        comments: string;
        type: "boolean";
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      jobTitle: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      departmentIds: {
        label: string;
        comments: string;
        type: "code";
        language: "json";
        required: false;
        example: string;
        clean: (value: unknown) => any[] | undefined;
      };
      canSeeAllTicketsFromAssociatedDepartments: {
        label: string;
        comments: string;
        type: "boolean";
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      agentsAdditionalFields: {
        comments: string;
        label: string;
        type: "code";
        language: "json";
        required: false;
        clean: (value: unknown) => object | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deactivateAgent: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      agentId: {
        comments: string;
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    forgetAgent: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      agentId: {
        comments: string;
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        success: boolean;
      };
    }>;
    getAgent: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      agentId: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listAgents: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        comments: string;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          perPage: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            placeholder: string;
            clean: (value: unknown) => number | undefined;
          };
          page: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            placeholder: string;
            clean: (value: unknown) => number | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      additionalQueryParams: {
        label: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        comments: string;
        clean: (value: unknown) => Record<string, unknown>;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        [x: string]: unknown[];
      };
    }>;
    updateAgent: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      agentId: {
        comments: string;
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      roles: {
        required: false;
        label: string;
        comments: string;
        type: "code";
        language: "json";
        example: string;
        clean: (value: unknown) => any[] | undefined;
      };
      scoreboardLevelId: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown) => number | undefined;
      };
      departmentIds: {
        label: string;
        comments: string;
        type: "code";
        language: "json";
        required: false;
        example: string;
        clean: (value: unknown) => any[] | undefined;
      };
      additionalFields: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          email: {
            required: false;
            clean: (value: unknown) => string | undefined;
            label: string;
            comments: string;
            type: "string";
            placeholder: string;
            example: string;
          };
          address: {
            label: string;
            comments: string;
            type: "string";
            required: false;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          occasional: {
            required: false;
            type: "string";
            default: undefined;
            model: {
              label: string;
              value: string;
            }[];
            clean: (value: unknown) => boolean | undefined;
            label: string;
            comments: string;
          };
          signature: {
            label: string;
            comments: string;
            type: "code";
            language: "html";
            required: false;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          canSeeAllTicketsFromAssociatedDepartments: {
            required: false;
            type: "string";
            default: undefined;
            model: {
              label: string;
              value: string;
            }[];
            clean: (value: unknown) => boolean | undefined;
            label: string;
            comments: string;
          };
        };
      } & {
        type: "structuredObject";
      };
      agentsAdditionalFields: {
        comments: string;
        label: string;
        type: "code";
        language: "json";
        required: false;
        clean: (value: unknown) => object | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createRequester: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      firstName: {
        label: string;
        type: "string";
        comments: string;
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      lastName: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (value: unknown) => string | undefined;
      };
      primaryEmail: {
        label: string;
        type: "string";
        comments: string;
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      jobTitle: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (value: unknown) => string | undefined;
      };
      contactInfo: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          secondaryEmails: {
            label: string;
            type: "code";
            language: "json";
            comments: string;
            example: string;
            clean: (value: unknown) => any[] | undefined;
          };
          workPhoneNumber: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            required: false;
            clean: (value: unknown) => string | undefined;
          };
          mobilePhoneNumber: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            required: false;
            clean: (value: unknown) => string | undefined;
          };
          address: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            required: false;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      reportingManagerId: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (value: unknown) => number | undefined;
      };
      departmentIds: {
        label: string;
        type: "code";
        language: "json";
        comments: string;
        example: string;
        clean: (value: unknown) => any[] | undefined;
      };
      requestersAdditionalFields: {
        comments: string;
        label: string;
        type: "code";
        language: "json";
        required: false;
        clean: (value: unknown) => object | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deactivateRequester: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      requesterId: {
        comments: string;
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        required: true;
        dataSource: string;
        clean: (value: unknown, defaultValue?: number) => number;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        success: boolean;
      };
    }>;
    getRequester: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      requesterId: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        dataSource: string;
        clean: (value: unknown, defaultValue?: number) => number;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listRequesters: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        comments: string;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          perPage: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            placeholder: string;
            clean: (value: unknown) => number | undefined;
          };
          page: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            placeholder: string;
            clean: (value: unknown) => number | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      additionalQueryParams: {
        label: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        comments: string;
        clean: (value: unknown) => Record<string, unknown>;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        [x: string]: unknown[];
      };
    }>;
    updateRequester: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      requesterId: {
        comments: string;
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        required: true;
        dataSource: string;
        clean: (value: unknown, defaultValue?: number) => number;
      };
      jobTitle: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (value: unknown) => string | undefined;
      };
      firstName: {
        required: false;
        clean: (value: unknown) => string | undefined;
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
      };
      lastName: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (value: unknown) => string | undefined;
      };
      contactInfo: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          primaryEmail: {
            required: false;
            clean: (value: unknown) => string | undefined;
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
          };
          secondaryEmails: {
            label: string;
            type: "code";
            language: "json";
            comments: string;
            example: string;
            clean: (value: unknown) => any[] | undefined;
          };
          workPhoneNumber: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            required: false;
            clean: (value: unknown) => string | undefined;
          };
          mobilePhoneNumber: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            required: false;
            clean: (value: unknown) => string | undefined;
          };
          address: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            required: false;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      reportingManagerId: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: false;
        clean: (value: unknown) => number | undefined;
      };
      departmentIds: {
        label: string;
        type: "code";
        language: "json";
        comments: string;
        example: string;
        clean: (value: unknown) => any[] | undefined;
      };
      requestersAdditionalFields: {
        comments: string;
        label: string;
        type: "code";
        language: "json";
        required: false;
        clean: (value: unknown) => object | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createTicket: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      description: {
        label: string;
        type: "code";
        language: "html";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      subject: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      email: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      priority: {
        label: string;
        type: "string";
        required: true;
        model: {
          label: string;
          value: string;
        }[];
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: number) => number;
      };
      status: {
        label: string;
        type: "string";
        required: true;
        model: {
          label: string;
          value: string;
        }[];
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: number) => number;
      };
      ccEmails: {
        label: string;
        type: "code";
        language: "json";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => any[] | undefined;
      };
      workspaceId: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown) => number | undefined;
      };
      ticketsAdditionalFields: {
        comments: string;
        label: string;
        type: "code";
        language: "json";
        required: false;
        clean: (value: unknown) => object | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deleteTicket: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      ticketId: {
        comments: string;
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: number) => number;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        success: boolean;
      };
    }>;
    getTicket: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      ticketId: {
        comments: string;
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: number) => number;
      };
      additionalQueryParams: {
        label: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        comments: string;
        clean: (value: unknown) => Record<string, unknown>;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listTickets: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        comments: string;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          perPage: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            placeholder: string;
            clean: (value: unknown) => number | undefined;
          };
          page: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            placeholder: string;
            clean: (value: unknown) => number | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      filter: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown) => string | undefined;
      };
      additionalQueryParams: {
        label: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        comments: string;
        clean: (value: unknown) => Record<string, unknown>;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        [x: string]: unknown[];
      };
    }>;
    moveTicket: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      ticketId: {
        comments: string;
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: number) => number;
      };
      workspaceId: {
        comments: string;
        required: true;
        clean: (value: unknown, defaultValue?: number) => number;
        label: string;
        type: "string";
        example: string;
        placeholder: string;
        dataSource: string;
      };
      groupId: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => number | undefined;
      };
      responderId: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => number | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    updateTicket: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      ticketId: {
        comments: string;
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: number) => number;
      };
      additionalFields: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          priority: {
            required: false;
            clean: (value: unknown) => number | undefined;
            label: string;
            type: "string";
            model: {
              label: string;
              value: string;
            }[];
            comments: string;
            example: string;
            placeholder: string;
          };
          status: {
            required: false;
            clean: (value: unknown) => number | undefined;
            label: string;
            type: "string";
            model: {
              label: string;
              value: string;
            }[];
            comments: string;
            example: string;
            placeholder: string;
          };
          source: {
            required: false;
            clean: (value: unknown) => number | undefined;
            label: string;
            type: "string";
            model: {
              label: string;
              value: string;
            }[];
            comments: string;
            example: string;
            placeholder: string;
          };
          bypassMandatory: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            model: {
              label: string;
              value: string;
            }[];
            clean: (value: unknown) => boolean | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      ticketsAdditionalFields: {
        comments: string;
        label: string;
        type: "code";
        language: "json";
        required: false;
        clean: (value: unknown) => object | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createProblem: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      subject: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      email: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      description: {
        label: string;
        comments: string;
        type: "code";
        language: "html";
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      dueBy: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      priority: {
        label: string;
        comments: string;
        type: "string";
        model: {
          label: string;
          value: string;
        }[];
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: number) => number;
      };
      status: {
        label: string;
        comments: string;
        model: {
          label: string;
          value: string;
        }[];
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: number) => number;
      };
      impact: {
        label: string;
        comments: string;
        type: "string";
        model: {
          label: string;
          value: string;
        }[];
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: number) => number;
      };
      categorization: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          category: {
            label: string;
            comments: string;
            type: "string";
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
          subCategory: {
            label: string;
            comments: string;
            type: "string";
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
          itemCategory: {
            label: string;
            comments: string;
            type: "string";
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      problemsAdditionalFields: {
        comments: string;
        label: string;
        type: "code";
        language: "json";
        required: false;
        clean: (value: unknown) => object | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deleteProblem: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      problemId: {
        comments: string;
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: number) => number;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        success: boolean;
      };
    }>;
    getProblem: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      problemId: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: number) => number;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listProblems: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        comments: string;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          perPage: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            placeholder: string;
            clean: (value: unknown) => number | undefined;
          };
          page: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            placeholder: string;
            clean: (value: unknown) => number | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      additionalQueryParams: {
        label: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        comments: string;
        clean: (value: unknown) => Record<string, unknown>;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        [x: string]: unknown[];
      };
    }>;
    moveProblem: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      problemId: {
        comments: string;
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: number) => number;
      };
      workspaceId: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: number) => number;
      };
      groupId: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown) => number | undefined;
      };
      ownerId: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown) => number | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    updateProblem: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      problemId: {
        comments: string;
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: number) => number;
      };
      categorization: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          category: {
            label: string;
            comments: string;
            type: "string";
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
          subCategory: {
            label: string;
            comments: string;
            type: "string";
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
          itemCategory: {
            label: string;
            comments: string;
            type: "string";
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      additionalFields: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          subject: {
            required: false;
            clean: (value: unknown) => string | undefined;
            label: string;
            comments: string;
            type: "string";
            example: string;
            placeholder: string;
          };
          email: {
            required: false;
            clean: (value: unknown) => string | undefined;
            label: string;
            comments: string;
            type: "string";
            example: string;
            placeholder: string;
          };
          description: {
            required: false;
            clean: (value: unknown) => string | undefined;
            label: string;
            comments: string;
            type: "code";
            language: "html";
            example: string;
            placeholder: string;
          };
          dueBy: {
            required: false;
            clean: (value: unknown) => string | undefined;
            label: string;
            comments: string;
            type: "string";
            example: string;
            placeholder: string;
          };
          priority: {
            required: false;
            clean: (value: unknown) => number | undefined;
            label: string;
            comments: string;
            type: "string";
            model: {
              label: string;
              value: string;
            }[];
            example: string;
            placeholder: string;
          };
          status: {
            required: false;
            clean: (value: unknown) => number | undefined;
            label: string;
            comments: string;
            model: {
              label: string;
              value: string;
            }[];
            type: "string";
            example: string;
            placeholder: string;
          };
          impact: {
            required: false;
            clean: (value: unknown) => number | undefined;
            label: string;
            comments: string;
            type: "string";
            model: {
              label: string;
              value: string;
            }[];
            example: string;
            placeholder: string;
          };
        };
      } & {
        type: "structuredObject";
      };
      problemsAdditionalFields: {
        comments: string;
        label: string;
        type: "code";
        language: "json";
        required: false;
        clean: (value: unknown) => object | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
  };
  dataSources: {
    selectWorkspace: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectAgent: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectTicket: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      filter: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectAsset: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectItamAsset: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectItamDevice: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectProblem: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectSoftware: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectRequester: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
  };
  triggers: {
    pollNewAndUpdatedTicketsTrigger: import("@prismatic-io/spectral").PollingTriggerDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
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
      lookBackDate: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, import("@prismatic-io/spectral").TriggerPayload<Record<string, unknown>>, boolean, {
      payload: import("@prismatic-io/spectral").TriggerPayload;
    }, import("@prismatic-io/spectral").Inputs>;
  };
  connections: import("@prismatic-io/spectral").KeyedConnection<{
    key: "freshservice-api-key-connection";
    display: {
      label: string;
      description: string;
    };
    inputs: {
      freshserviceDomain: {
        label: string;
        comments: string;
        type: "string";
        required: true;
      };
      apiKey: {
        label: string;
        comments: string;
        type: "password";
        required: true;
      };
    };
  }, "freshservice-api-key-connection">[];
}>;
export = _default;