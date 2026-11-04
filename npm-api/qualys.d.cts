//#region node_modules/axios/index.d.ts
type UppercaseMethod = 'GET' | 'DELETE' | 'HEAD' | 'OPTIONS' | 'POST' | 'PUT' | 'PATCH' | 'PURGE' | 'LINK' | 'UNLINK' | 'QUERY';
type Method = (UppercaseMethod | Lowercase<UppercaseMethod>) & {};
type ResponseType = 'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream' | 'formdata';
//#endregion
//#region src/constants.d.ts
declare enum ApiPlane {
  Gateway = "gateway",
  Classic = "classic"
}
//#endregion
//#region src/types/common.d.ts
interface ExamplePayload {
  data: unknown;
}
//#endregion
//#region npm-dist/.entry.d.ts
declare const _default: import("@prismatic-io/spectral").CallableComponent<{
  key: "qualys";
  public: true;
  documentationUrl: "https://prismatic.io/docs/components/qualys/";
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
      plane: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        model: {
          label: string;
          value: ApiPlane;
        }[];
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listRemediationTickets: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      assignee: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        clean: (value: unknown) => string | undefined;
        placeholder: string;
        example: string;
      };
      ticketState: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        clean: (value: unknown) => string | undefined;
        placeholder: string;
        example: string;
        model: {
          label: string;
          value: string;
        }[];
      };
      severity: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        clean: (value: unknown) => string | undefined;
        placeholder: string;
        example: string;
      };
      modifiedSinceDatetime: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        clean: (value: unknown) => string | undefined;
        placeholder: string;
        example: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, ExamplePayload>;
    getRemediationTicketInfo: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      ticketNumbers: {
        label: string;
        type: "string";
        required: false;
        collection: "valuelist";
        comments: string;
        clean: (value: unknown) => string[];
        placeholder: string;
        example: string;
      };
      since: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        clean: (value: unknown) => string | undefined;
        placeholder: string;
        example: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, ExamplePayload>;
    editRemediationTickets: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      ticketNumbers: {
        required: boolean;
        label: string;
        type: "string";
        collection: "valuelist";
        comments: string;
        clean: (value: unknown) => string[];
        placeholder: string;
        example: string;
      };
      newAssignee: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        clean: (value: unknown) => string | undefined;
        placeholder: string;
        example: string;
      };
      newState: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        clean: (value: unknown) => string | undefined;
        placeholder: string;
        example: string;
        model: {
          label: string;
          value: string;
        }[];
      };
      comment: {
        label: string;
        type: "text";
        required: false;
        comments: string;
        clean: (value: unknown) => string | undefined;
        placeholder: string;
        example: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, ExamplePayload>;
    deleteRemediationTickets: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      ticketNumbers: {
        label: string;
        type: "string";
        required: false;
        collection: "valuelist";
        comments: string;
        clean: (value: unknown) => string[];
        placeholder: string;
        example: string;
      };
      assignee: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        clean: (value: unknown) => string | undefined;
        placeholder: string;
        example: string;
      };
      ticketState: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        clean: (value: unknown) => string | undefined;
        placeholder: string;
        example: string;
        model: {
          label: string;
          value: string;
        }[];
      };
      severity: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        clean: (value: unknown) => string | undefined;
        placeholder: string;
        example: string;
      };
      dryRun: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, ExamplePayload>;
    launchScan: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      scanTitle: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        placeholder: string;
        example: string;
      };
      optionProfileId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        placeholder: string;
        example: string;
      };
      scannerApplianceId: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        clean: (value: unknown) => string | undefined;
        dataSource: string;
        placeholder: string;
      };
      targetTagIds: {
        label: string;
        type: "string";
        required: false;
        collection: "valuelist";
        comments: string;
        clean: (value: unknown) => string[];
        placeholder: string;
        example: string;
      };
      assetGroupIds: {
        label: string;
        type: "string";
        required: false;
        collection: "valuelist";
        comments: string;
        clean: (value: unknown) => string[];
        placeholder: string;
        example: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, ExamplePayload>;
    listScans: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      scanRef: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        clean: (value: unknown) => string | undefined;
        placeholder: string;
        example: string;
      };
      scanState: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        clean: (value: unknown) => string | undefined;
        placeholder: string;
        example: string;
        model: {
          label: string;
          value: string;
        }[];
      };
      launchedAfter: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        clean: (value: unknown) => string | undefined;
        placeholder: string;
        example: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, ExamplePayload>;
    updateAssetTags: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      assetId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        placeholder: string;
        example: string;
      };
      tagsToAdd: {
        label: string;
        type: "string";
        required: false;
        collection: "valuelist";
        comments: string;
        clean: (value: unknown) => string[];
        dataSource: string;
      };
      tagsToRemove: {
        label: string;
        type: "string";
        required: false;
        collection: "valuelist";
        example: string;
        comments: string;
        clean: (value: unknown) => string[];
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, ExamplePayload>;
    listTags: import("@prismatic-io/spectral").ActionDefinition<{
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
      pageSize: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        clean: (value: unknown) => number | undefined;
        placeholder: string;
        example: string;
      };
      tagNameFilter: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        clean: (value: unknown) => string | undefined;
        placeholder: string;
        example: string;
      };
      parentTagId: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        clean: (value: unknown) => string | undefined;
        dataSource: string;
        placeholder: string;
        example: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, ExamplePayload>;
    createTag: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      tagName: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        placeholder: string;
        example: string;
      };
      parentTagId: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        clean: (value: unknown) => string | undefined;
        dataSource: string;
        placeholder: string;
        example: string;
      };
      color: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        clean: (value: unknown) => string | undefined;
        placeholder: string;
        example: string;
      };
      criticalityScore: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        clean: (value: unknown) => number | undefined;
        placeholder: string;
        example: string;
      };
      ruleType: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        clean: (value: unknown) => string | undefined;
        placeholder: string;
        example: string;
        model: {
          label: string;
          value: string;
        }[];
      };
      ruleText: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        clean: (value: unknown) => string | undefined;
        placeholder: string;
        example: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    updateTag: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      tagId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        placeholder: string;
        dataSource: string;
        example: string;
      };
      updateTagName: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        clean: (value: unknown) => string | undefined;
        placeholder: string;
        example: string;
      };
      color: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        clean: (value: unknown) => string | undefined;
        placeholder: string;
        example: string;
      };
      criticalityScore: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        clean: (value: unknown) => number | undefined;
        placeholder: string;
        example: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, ExamplePayload>;
    listAssetRiskData: import("@prismatic-io/spectral").ActionDefinition<{
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
      pageSize: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        clean: (value: unknown) => number | undefined;
        placeholder: string;
        example: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, ExamplePayload>;
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
          pageSize: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            clean: (value: unknown) => number | undefined;
            placeholder: string;
            example: string;
          };
          cursor: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            clean: (value: unknown) => string | undefined;
            placeholder: string;
            example: string;
          };
        };
      } & {
        type: "structuredObject";
      };
      lastModified: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        clean: (value: unknown) => string | undefined;
        placeholder: string;
        example: string;
      };
      includeFields: {
        label: string;
        type: "string";
        required: false;
        collection: "valuelist";
        comments: string;
        clean: (value: unknown) => string[];
      };
      excludeFields: {
        label: string;
        type: "string";
        required: false;
        collection: "valuelist";
        comments: string;
        clean: (value: unknown) => string[];
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, ExamplePayload>;
    getAsset: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      assetId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        placeholder: string;
        example: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, ExamplePayload>;
    syncAsset: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      connectorMetaData: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          connectorUuid: {
            label: string;
            type: "string";
            required: true;
            comments: string;
            clean: (value: unknown, defaultValue?: string) => string;
            placeholder: string;
            example: string;
          };
          source: {
            label: string;
            type: "string";
            required: true;
            comments: string;
            clean: (value: unknown, defaultValue?: string) => string;
            placeholder: string;
            example: string;
          };
          requestId: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            clean: (value: unknown) => string | undefined;
            placeholder: string;
            example: string;
          };
          assetCount: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            clean: (value: unknown) => string | undefined;
            placeholder: string;
            example: string;
          };
        };
      } & {
        type: "structuredObject";
      };
      assetData: {
        label: string;
        type: "code";
        language: "json";
        required: true;
        comments: string;
        clean: (value: unknown) => object;
        example: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, ExamplePayload>;
  };
  connections: import("@prismatic-io/spectral").KeyedConnection<{
    key: "qualys";
    display: {
      label: string;
      description: string;
    };
    inputs: {
      username: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        shown: true;
        comments: string;
        example: string;
      };
      password: {
        label: string;
        placeholder: string;
        type: "password";
        required: true;
        shown: true;
        comments: string;
        example: string;
      };
      gatewayUrl: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        shown: true;
        comments: string;
        example: string;
      };
      classicUrl: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        shown: true;
        comments: string;
        example: string;
      };
    };
  }, "qualys">[];
  triggers: {
    changedAssets: import("@prismatic-io/spectral").PollingTriggerDefinition<{
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
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, import("@prismatic-io/spectral").TriggerPayload<Record<string, unknown>>, boolean, {
      payload: import("@prismatic-io/spectral").TriggerPayload;
    }, import("@prismatic-io/spectral").Inputs>;
  };
  dataSources: {
    selectTag: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      staticOnly: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectAssetGroup: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectScannerAppliance: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
  };
}>;
export = _default;