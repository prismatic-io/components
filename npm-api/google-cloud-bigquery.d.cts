//#region node_modules/axios/index.d.ts
type UppercaseMethod = 'GET' | 'DELETE' | 'HEAD' | 'OPTIONS' | 'POST' | 'PUT' | 'PATCH' | 'PURGE' | 'LINK' | 'UNLINK' | 'QUERY';
type Method = (UppercaseMethod | Lowercase<UppercaseMethod>) & {};
type ResponseType = 'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream' | 'formdata';
//#endregion
//#region npm-dist/.entry.d.ts
declare const _default: import("@prismatic-io/spectral").CallableComponent<{
  key: "google-cloud-bigquery";
  public: true;
  documentationUrl: "https://prismatic.io/docs/components/google-cloud-bigquery/";
  display: {
    label: string;
    description: string;
    iconPath: string;
    category: "Application Connectors";
  };
  actions: {
    createTable: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      tableReference: {
        label: string;
        type: "code";
        language: "json";
        comments: string;
        example: string;
        clean: (value: unknown) => any;
        required: true;
      };
      datasetId: {
        required: true;
        comments: string;
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        example: string;
        placeholder: string;
        dataSource: string;
      };
      projectId: {
        required: true;
        comments: string;
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        example: string;
        placeholder: string;
        dataSource: string;
      };
      additionalFields: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          kind: {
            label: string;
            type: "string";
            clean: (value: unknown, defaultValue?: string) => string;
            comments: string;
            example: string;
            placeholder: string;
            required: false;
          };
          friendlyName: {
            label: string;
            type: "string";
            clean: (value: unknown, defaultValue?: string) => string;
            comments: string;
            example: string;
            placeholder: string;
            required: false;
          };
          description: {
            label: string;
            type: "string";
            clean: (value: unknown, defaultValue?: string) => string;
            comments: string;
            example: string;
            placeholder: string;
            required: false;
          };
          labels: {
            label: string;
            type: "code";
            language: "json";
            comments: string;
            example: string;
            clean: (value: unknown) => any;
            required: false;
          };
          schema: {
            label: string;
            type: "code";
            language: "json";
            comments: string;
            example: string;
            clean: (value: unknown) => any;
            required: false;
          };
          timePartitioning: {
            label: string;
            type: "code";
            language: "json";
            comments: string;
            example: string;
            clean: (value: unknown) => any;
            required: false;
          };
          rangePartitioning: {
            label: string;
            type: "code";
            language: "json";
            comments: string;
            example: string;
            clean: (value: unknown) => any;
            required: false;
          };
          clustering: {
            label: string;
            type: "code";
            language: "json";
            comments: string;
            example: string;
            clean: (value: unknown) => any;
            required: false;
          };
          requirePartitionFilter: {
            label: string;
            type: "boolean";
            clean: (value: unknown, defaultValue?: boolean) => boolean;
            comments: string;
            required: false;
          };
          expirationTime: {
            label: string;
            type: "string";
            clean: (value: unknown, defaultValue?: string) => string;
            comments: string;
            required: false;
          };
          view: {
            label: string;
            type: "code";
            language: "json";
            comments: string;
            example: string;
            clean: (value: unknown) => any;
            required: false;
          };
          materializedView: {
            label: string;
            type: "code";
            language: "json";
            comments: string;
            example: string;
            clean: (value: unknown) => any;
            required: false;
          };
          externalDataConfiguration: {
            label: string;
            type: "code";
            language: "json";
            comments: string;
            example: string;
            clean: (value: unknown) => any;
            required: false;
          };
          encryptionConfiguration: {
            label: string;
            type: "code";
            language: "json";
            comments: string;
            example: string;
            clean: (value: unknown) => any;
            required: false;
          };
          defaultCollation: {
            label: string;
            type: "string";
            clean: (value: unknown, defaultValue?: string) => string;
            comments: string;
            example: string;
            placeholder: string;
            required: false;
          };
          defaultRoundingMode: {
            label: string;
            type: "string";
            clean: (value: unknown, defaultValue?: string) => string;
            required: false;
            comments: string;
            placeholder: string;
            model: {
              label: string;
              value: string;
            }[];
          };
          maxStaleness: {
            label: string;
            type: "string";
            clean: (value: unknown, defaultValue?: string) => string;
            comments: string;
            example: string;
            placeholder: string;
            required: false;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: import("googleapis").bigquery_v2.Schema$Table;
    }>;
    listTables: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      projectId: {
        required: true;
        comments: string;
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        example: string;
        placeholder: string;
        dataSource: string;
      };
      datasetId: {
        required: true;
        comments: string;
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        example: string;
        placeholder: string;
        dataSource: string;
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
          pageToken: {
            label: string;
            type: "string";
            clean: (value: unknown) => string | undefined;
            comments: string;
            example: string;
            placeholder: string;
            required: false;
          };
          maxResults: {
            required: false;
            clean: (value: unknown, defaultValue?: string) => string;
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    getTable: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      datasetId: {
        required: true;
        comments: string;
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        example: string;
        placeholder: string;
        dataSource: string;
      };
      projectId: {
        required: true;
        comments: string;
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        example: string;
        placeholder: string;
        dataSource: string;
      };
      tableId: {
        required: true;
        comments: string;
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        example: string;
        placeholder: string;
        dataSource: string;
      };
      selectedFields: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        placeholder: string;
        required: false;
      };
      view: {
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
        required: false;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: import("googleapis").bigquery_v2.Schema$Table;
    }>;
    updateTable: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      datasetId: {
        required: true;
        comments: string;
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        example: string;
        placeholder: string;
        dataSource: string;
      };
      projectId: {
        required: true;
        comments: string;
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        example: string;
        placeholder: string;
        dataSource: string;
      };
      tableId: {
        required: true;
        comments: string;
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        example: string;
        placeholder: string;
        dataSource: string;
      };
      tableReference: {
        label: string;
        type: "code";
        language: "json";
        comments: string;
        example: string;
        clean: (value: unknown) => any;
        required: true;
      };
      additionalFields: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          kind: {
            label: string;
            type: "string";
            clean: (value: unknown, defaultValue?: string) => string;
            comments: string;
            example: string;
            placeholder: string;
            required: false;
          };
          friendlyName: {
            label: string;
            type: "string";
            clean: (value: unknown, defaultValue?: string) => string;
            comments: string;
            example: string;
            placeholder: string;
            required: false;
          };
          description: {
            label: string;
            type: "string";
            clean: (value: unknown, defaultValue?: string) => string;
            comments: string;
            example: string;
            placeholder: string;
            required: false;
          };
          labels: {
            label: string;
            type: "code";
            language: "json";
            comments: string;
            example: string;
            clean: (value: unknown) => any;
            required: false;
          };
          schema: {
            label: string;
            type: "code";
            language: "json";
            comments: string;
            example: string;
            clean: (value: unknown) => any;
            required: false;
          };
          timePartitioning: {
            label: string;
            type: "code";
            language: "json";
            comments: string;
            example: string;
            clean: (value: unknown) => any;
            required: false;
          };
          rangePartitioning: {
            label: string;
            type: "code";
            language: "json";
            comments: string;
            example: string;
            clean: (value: unknown) => any;
            required: false;
          };
          clustering: {
            label: string;
            type: "code";
            language: "json";
            comments: string;
            example: string;
            clean: (value: unknown) => any;
            required: false;
          };
          requirePartitionFilter: {
            label: string;
            type: "boolean";
            clean: (value: unknown, defaultValue?: boolean) => boolean;
            comments: string;
            required: false;
          };
          expirationTime: {
            label: string;
            type: "string";
            clean: (value: unknown, defaultValue?: string) => string;
            comments: string;
            required: false;
          };
          view: {
            label: string;
            type: "code";
            language: "json";
            comments: string;
            example: string;
            clean: (value: unknown) => any;
            required: false;
          };
          materializedView: {
            label: string;
            type: "code";
            language: "json";
            comments: string;
            example: string;
            clean: (value: unknown) => any;
            required: false;
          };
          externalDataConfiguration: {
            label: string;
            type: "code";
            language: "json";
            comments: string;
            example: string;
            clean: (value: unknown) => any;
            required: false;
          };
          encryptionConfiguration: {
            label: string;
            type: "code";
            language: "json";
            comments: string;
            example: string;
            clean: (value: unknown) => any;
            required: false;
          };
          defaultCollation: {
            label: string;
            type: "string";
            clean: (value: unknown, defaultValue?: string) => string;
            comments: string;
            example: string;
            placeholder: string;
            required: false;
          };
          defaultRoundingMode: {
            label: string;
            type: "string";
            clean: (value: unknown, defaultValue?: string) => string;
            required: false;
            comments: string;
            placeholder: string;
            model: {
              label: string;
              value: string;
            }[];
          };
          maxStaleness: {
            label: string;
            type: "string";
            clean: (value: unknown, defaultValue?: string) => string;
            comments: string;
            example: string;
            placeholder: string;
            required: false;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: import("googleapis").bigquery_v2.Schema$Table;
    }>;
    deleteTable: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      datasetId: {
        required: true;
        comments: string;
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        example: string;
        placeholder: string;
        dataSource: string;
      };
      projectId: {
        required: true;
        comments: string;
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        example: string;
        placeholder: string;
        dataSource: string;
      };
      tableId: {
        required: true;
        comments: string;
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        example: string;
        placeholder: string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: void;
    }>;
    patchTable: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      datasetId: {
        required: true;
        comments: string;
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        example: string;
        placeholder: string;
        dataSource: string;
      };
      projectId: {
        required: true;
        comments: string;
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        example: string;
        placeholder: string;
        dataSource: string;
      };
      tableId: {
        required: true;
        comments: string;
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        example: string;
        placeholder: string;
        dataSource: string;
      };
      tableReference: {
        label: string;
        type: "code";
        language: "json";
        comments: string;
        example: string;
        clean: (value: unknown) => any;
        required: true;
      };
      additionalFields: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          kind: {
            label: string;
            type: "string";
            clean: (value: unknown, defaultValue?: string) => string;
            comments: string;
            example: string;
            placeholder: string;
            required: false;
          };
          friendlyName: {
            label: string;
            type: "string";
            clean: (value: unknown, defaultValue?: string) => string;
            comments: string;
            example: string;
            placeholder: string;
            required: false;
          };
          description: {
            label: string;
            type: "string";
            clean: (value: unknown, defaultValue?: string) => string;
            comments: string;
            example: string;
            placeholder: string;
            required: false;
          };
          labels: {
            label: string;
            type: "code";
            language: "json";
            comments: string;
            example: string;
            clean: (value: unknown) => any;
            required: false;
          };
          schema: {
            label: string;
            type: "code";
            language: "json";
            comments: string;
            example: string;
            clean: (value: unknown) => any;
            required: false;
          };
          timePartitioning: {
            label: string;
            type: "code";
            language: "json";
            comments: string;
            example: string;
            clean: (value: unknown) => any;
            required: false;
          };
          rangePartitioning: {
            label: string;
            type: "code";
            language: "json";
            comments: string;
            example: string;
            clean: (value: unknown) => any;
            required: false;
          };
          clustering: {
            label: string;
            type: "code";
            language: "json";
            comments: string;
            example: string;
            clean: (value: unknown) => any;
            required: false;
          };
          requirePartitionFilter: {
            label: string;
            type: "boolean";
            clean: (value: unknown, defaultValue?: boolean) => boolean;
            comments: string;
            required: false;
          };
          expirationTime: {
            label: string;
            type: "string";
            clean: (value: unknown, defaultValue?: string) => string;
            comments: string;
            required: false;
          };
          view: {
            label: string;
            type: "code";
            language: "json";
            comments: string;
            example: string;
            clean: (value: unknown) => any;
            required: false;
          };
          materializedView: {
            label: string;
            type: "code";
            language: "json";
            comments: string;
            example: string;
            clean: (value: unknown) => any;
            required: false;
          };
          externalDataConfiguration: {
            label: string;
            type: "code";
            language: "json";
            comments: string;
            example: string;
            clean: (value: unknown) => any;
            required: false;
          };
          encryptionConfiguration: {
            label: string;
            type: "code";
            language: "json";
            comments: string;
            example: string;
            clean: (value: unknown) => any;
            required: false;
          };
          defaultCollation: {
            label: string;
            type: "string";
            clean: (value: unknown, defaultValue?: string) => string;
            comments: string;
            example: string;
            placeholder: string;
            required: false;
          };
          defaultRoundingMode: {
            label: string;
            type: "string";
            clean: (value: unknown, defaultValue?: string) => string;
            required: false;
            comments: string;
            placeholder: string;
            model: {
              label: string;
              value: string;
            }[];
          };
          maxStaleness: {
            label: string;
            type: "string";
            clean: (value: unknown, defaultValue?: string) => string;
            comments: string;
            example: string;
            placeholder: string;
            required: false;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: import("googleapis").bigquery_v2.Schema$Table;
    }>;
    tableDataInsertAll: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      datasetId: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        dataSource: string;
      };
      projectId: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        dataSource: string;
      };
      tableId: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        dataSource: string;
      };
      rows: {
        label: string;
        type: "code";
        language: "json";
        comments: string;
        example: string;
        clean: (value: unknown) => any;
        required: false;
      };
      additionalFields: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          kind: {
            label: string;
            type: "string";
            clean: (value: unknown, defaultValue?: string) => string;
            comments: string;
            example: string;
            placeholder: string;
            required: false;
          };
          skipInvalidRows: {
            label: string;
            type: "boolean";
            clean: (value: unknown, defaultValue?: boolean) => boolean;
            comments: string;
            required: false;
          };
          ignoreUnknownValues: {
            label: string;
            type: "boolean";
            clean: (value: unknown, defaultValue?: boolean) => boolean;
            comments: string;
            required: false;
          };
          templateSuffix: {
            label: string;
            type: "string";
            clean: (value: unknown) => string | undefined;
            comments: string;
            example: string;
            placeholder: string;
            required: false;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: import("googleapis").bigquery_v2.Schema$TableDataInsertAllResponse;
    }>;
    createRoutine: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      datasetId: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        dataSource: string;
      };
      projectId: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        dataSource: string;
      };
      routineReference: {
        label: string;
        type: "code";
        language: "json";
        comments: string;
        example: string;
        clean: (value: unknown) => any;
        required: true;
      };
      routineType: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
        required: true;
      };
      definitionBody: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
        required: true;
      };
      additionalFields: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          etag: {
            label: string;
            type: "string";
            clean: (value: unknown, defaultValue?: string) => string;
            comments: string;
            example: string;
            placeholder: string;
            required: false;
          };
          argument: {
            label: string;
            type: "code";
            language: "json";
            comments: string;
            example: string;
            clean: (value: unknown) => any;
            required: false;
          };
          returnTableType: {
            label: string;
            type: "code";
            language: "json";
            comments: string;
            example: string;
            clean: (value: unknown) => any;
            required: false;
          };
          returnType: {
            label: string;
            type: "code";
            language: "json";
            comments: string;
            example: string;
            clean: (value: unknown) => any;
            required: false;
          };
          creationTime: {
            label: string;
            type: "string";
            clean: (value: unknown, defaultValue?: string) => string;
            comments: string;
            example: string;
            placeholder: string;
            required: false;
          };
          lastModifiedTime: {
            label: string;
            type: "string";
            clean: (value: unknown, defaultValue?: string) => string;
            comments: string;
            example: string;
            placeholder: string;
            required: false;
          };
          language: {
            label: string;
            type: "string";
            clean: (value: unknown, defaultValue?: string) => string;
            comments: string;
            example: string;
            placeholder: string;
            required: false;
          };
          importedLibraries: {
            label: string;
            type: "string";
            collection: "valuelist";
            required: false;
            comments: string;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string[] | undefined;
          };
          description: {
            comments: string;
            label: string;
            type: "string";
            clean: (value: unknown, defaultValue?: string) => string;
            example: string;
            placeholder: string;
            required: false;
          };
          determinismLevel: {
            label: string;
            type: "string";
            clean: (value: unknown, defaultValue?: string) => string;
            comments: string;
            example: string;
            placeholder: string;
            required: false;
          };
          remoteFunctionOptions: {
            label: string;
            type: "code";
            language: "json";
            comments: string;
            example: string;
            clean: (value: unknown) => any;
            required: false;
          };
          sparkOptions: {
            label: string;
            type: "code";
            language: "json";
            comments: string;
            example: string;
            clean: (value: unknown) => any;
            required: false;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: import("googleapis").bigquery_v2.Schema$Routine;
    }>;
    listRoutines: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      projectId: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        dataSource: string;
      };
      datasetId: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        dataSource: string;
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
          pageToken: {
            label: string;
            type: "string";
            clean: (value: unknown) => string | undefined;
            comments: string;
            example: string;
            placeholder: string;
            required: false;
          };
          maxResults: {
            label: string;
            type: "string";
            clean: (value: unknown, defaultValue?: number) => number;
            comments: string;
            example: string;
            placeholder: string;
            required: false;
          };
        };
      } & {
        type: "structuredObject";
      };
      filter: {
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
        required: false;
      };
      readMask: {
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
        required: false;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    getRoutine: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      datasetId: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        dataSource: string;
      };
      projectId: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        dataSource: string;
      };
      readMask: {
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
        required: false;
      };
      routineId: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: import("googleapis").bigquery_v2.Schema$Routine;
    }>;
    updateRoutine: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      datasetId: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        dataSource: string;
      };
      projectId: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        dataSource: string;
      };
      routineReference: {
        label: string;
        type: "code";
        language: "json";
        comments: string;
        example: string;
        clean: (value: unknown) => any;
        required: true;
      };
      routineType: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
        required: true;
      };
      definitionBody: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
        required: true;
      };
      additionalFields: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          etag: {
            label: string;
            type: "string";
            clean: (value: unknown, defaultValue?: string) => string;
            comments: string;
            example: string;
            placeholder: string;
            required: false;
          };
          argument: {
            label: string;
            type: "code";
            language: "json";
            comments: string;
            example: string;
            clean: (value: unknown) => any;
            required: false;
          };
          returnTableType: {
            label: string;
            type: "code";
            language: "json";
            comments: string;
            example: string;
            clean: (value: unknown) => any;
            required: false;
          };
          returnType: {
            label: string;
            type: "code";
            language: "json";
            comments: string;
            example: string;
            clean: (value: unknown) => any;
            required: false;
          };
          creationTime: {
            label: string;
            type: "string";
            clean: (value: unknown, defaultValue?: string) => string;
            comments: string;
            example: string;
            placeholder: string;
            required: false;
          };
          lastModifiedTime: {
            label: string;
            type: "string";
            clean: (value: unknown, defaultValue?: string) => string;
            comments: string;
            example: string;
            placeholder: string;
            required: false;
          };
          language: {
            label: string;
            type: "string";
            clean: (value: unknown, defaultValue?: string) => string;
            comments: string;
            example: string;
            placeholder: string;
            required: false;
          };
          importedLibraries: {
            label: string;
            type: "string";
            collection: "valuelist";
            required: false;
            comments: string;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string[] | undefined;
          };
          description: {
            comments: string;
            label: string;
            type: "string";
            clean: (value: unknown, defaultValue?: string) => string;
            example: string;
            placeholder: string;
            required: false;
          };
          determinismLevel: {
            label: string;
            type: "string";
            clean: (value: unknown, defaultValue?: string) => string;
            comments: string;
            example: string;
            placeholder: string;
            required: false;
          };
          remoteFunctionOptions: {
            label: string;
            type: "code";
            language: "json";
            comments: string;
            example: string;
            clean: (value: unknown) => any;
            required: false;
          };
          sparkOptions: {
            label: string;
            type: "code";
            language: "json";
            comments: string;
            example: string;
            clean: (value: unknown) => any;
            required: false;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: import("googleapis").bigquery_v2.Schema$Routine;
    }>;
    deleteRoutine: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      datasetId: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        dataSource: string;
      };
      projectId: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        dataSource: string;
      };
      routineId: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: void;
    }>;
    getServiceAccount: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      projectId: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: import("googleapis").bigquery_v2.Schema$GetServiceAccountResponse;
    }>;
    listProjects: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
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
          pageToken: {
            label: string;
            type: "string";
            clean: (value: unknown) => string | undefined;
            comments: string;
            example: string;
            placeholder: string;
            required: false;
          };
          maxResults: {
            label: string;
            type: "string";
            clean: (value: unknown, defaultValue?: number) => number;
            comments: string;
            example: string;
            placeholder: string;
            required: false;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    setPolicy: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      resource: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
        required: true;
      };
      policy: {
        label: string;
        type: "code";
        language: "json";
        comments: string;
        example: string;
        clean: (value: unknown) => any;
        required: false;
      };
      updateMask: {
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
        required: false;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: import("googleapis").bigquery_v2.Schema$Policy;
    }>;
    getPolicy: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      resource: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
        required: true;
      };
      options: {
        label: string;
        type: "code";
        language: "json";
        comments: string;
        example: string;
        clean: (value: unknown) => any;
        required: false;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: import("googleapis").bigquery_v2.Schema$Policy;
    }>;
    getModel: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      projectId: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        dataSource: string;
      };
      datasetId: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        dataSource: string;
      };
      modelId: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: import("googleapis").bigquery_v2.Schema$Model;
    }>;
    listModels: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      projectId: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        dataSource: string;
      };
      datasetId: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        dataSource: string;
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
          pageToken: {
            label: string;
            type: "string";
            clean: (value: unknown) => string | undefined;
            comments: string;
            example: string;
            placeholder: string;
            required: false;
          };
          maxResults: {
            label: string;
            type: "string";
            clean: (value: unknown, defaultValue?: number) => number;
            comments: string;
            example: string;
            placeholder: string;
            required: false;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    deleteModel: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      projectId: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        dataSource: string;
      };
      datasetId: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        dataSource: string;
      };
      modelId: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: void;
    }>;
    updateModel: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      projectId: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        dataSource: string;
      };
      datasetId: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        dataSource: string;
      };
      modelId: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        dataSource: string;
      };
      modelReference: {
        label: string;
        type: "code";
        language: "json";
        comments: string;
        example: string;
        clean: (value: unknown) => any;
        required: true;
      };
      additionalFields: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          etag: {
            label: string;
            type: "string";
            clean: (value: unknown, defaultValue?: string) => string;
            comments: string;
            example: string;
            placeholder: string;
            required: false;
          };
          creationTime: {
            label: string;
            type: "string";
            clean: (value: unknown, defaultValue?: string) => string;
            comments: string;
            example: string;
            placeholder: string;
            required: false;
          };
          lastModifiedTime: {
            label: string;
            type: "string";
            clean: (value: unknown, defaultValue?: string) => string;
            comments: string;
            example: string;
            placeholder: string;
            required: false;
          };
          description: {
            label: string;
            type: "string";
            clean: (value: unknown, defaultValue?: string) => string;
            comments: string;
            example: string;
            placeholder: string;
            required: false;
          };
          friendlyName: {
            label: string;
            type: "string";
            clean: (value: unknown, defaultValue?: string) => string;
            comments: string;
            example: string;
            placeholder: string;
            required: false;
          };
          labels: {
            label: string;
            type: "code";
            language: "json";
            comments: string;
            example: string;
            clean: (value: unknown) => any;
            required: false;
          };
          expirationTime: {
            label: string;
            type: "string";
            clean: (value: unknown, defaultValue?: string) => string;
            comments: string;
            required: false;
          };
          location: {
            label: string;
            type: "string";
            clean: (value: unknown, defaultValue?: string) => string;
            comments: string;
            example: string;
            placeholder: string;
            required: false;
          };
          encryptionConfiguration: {
            label: string;
            type: "code";
            language: "json";
            comments: string;
            example: string;
            clean: (value: unknown) => any;
            required: false;
          };
          modelType: {
            label: string;
            type: "string";
            clean: (value: unknown, defaultValue?: string) => string;
            comments: string;
            model: {
              label: string;
              value: string;
            }[];
          };
          trainingRuns: {
            label: string;
            type: "code";
            language: "json";
            comments: string;
            example: string;
            clean: (value: unknown) => any;
            required: false;
          };
          featureColumns: {
            label: string;
            type: "code";
            language: "json";
            comments: string;
            example: string;
            clean: (value: unknown) => any;
            required: false;
          };
          labelColumns: {
            label: string;
            type: "code";
            language: "json";
            comments: string;
            example: string;
            clean: (value: unknown) => any;
            required: false;
          };
          hparamSearchSpaces: {
            label: string;
            type: "code";
            language: "json";
            comments: string;
            example: string;
            clean: (value: unknown) => any;
            required: false;
          };
          defaultTrialId: {
            label: string;
            type: "string";
            clean: (value: unknown, defaultValue?: string) => string;
            comments: string;
            required: false;
          };
          hparamTrials: {
            label: string;
            type: "code";
            language: "json";
            comments: string;
            example: string;
            clean: (value: unknown) => any;
            required: false;
          };
          optimalTrialIds: {
            label: string;
            type: "string";
            collection: "valuelist";
            required: false;
            comments: string;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string[] | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: import("googleapis").bigquery_v2.Schema$Model;
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
      version: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        default: string;
        comments: string;
        example: string;
        placeholder: string;
        required: false;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    cancelJob: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      projectId: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        dataSource: string;
      };
      jobId: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        dataSource: string;
      };
      location: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
        required: false;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: import("googleapis").bigquery_v2.Schema$JobCancelResponse;
    }>;
    createJob: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      projectId: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        dataSource: string;
      };
      configuration: {
        label: string;
        type: "code";
        language: "json";
        comments: string;
        example: string;
        clean: (value: unknown) => any;
        required: true;
      };
      jobReference: {
        label: string;
        type: "code";
        language: "json";
        comments: string;
        example: string;
        clean: (value: unknown) => any;
        required: false;
      };
      additionalFields: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          kind: {
            label: string;
            type: "string";
            clean: (value: unknown, defaultValue?: string) => string;
            comments: string;
            example: string;
            placeholder: string;
            required: false;
          };
          etag: {
            label: string;
            type: "string";
            clean: (value: unknown, defaultValue?: string) => string;
            comments: string;
            example: string;
            placeholder: string;
            required: false;
          };
          id: {
            label: string;
            type: "string";
            clean: (value: unknown, defaultValue?: string) => string;
            comments: string;
            example: string;
            placeholder: string;
            required: false;
          };
          selfLink: {
            label: string;
            type: "string";
            clean: (value: unknown, defaultValue?: string) => string;
            comments: string;
            example: string;
            placeholder: string;
            required: false;
          };
          userEmail: {
            label: string;
            type: "string";
            clean: (value: unknown, defaultValue?: string) => string;
            comments: string;
            example: string;
            placeholder: string;
            required: false;
          };
          statistics: {
            label: string;
            type: "code";
            language: "json";
            comments: string;
            example: string;
            clean: (value: unknown) => any;
            required: false;
          };
          status: {
            label: string;
            type: "code";
            language: "json";
            comments: string;
            example: string;
            clean: (value: unknown) => any;
            required: false;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: import("googleapis").bigquery_v2.Schema$Job;
    }>;
    deleteJob: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      projectId: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        dataSource: string;
      };
      jobId: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        dataSource: string;
      };
      location: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
        required: false;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: void;
    }>;
    getJob: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      projectId: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        dataSource: string;
      };
      jobId: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        dataSource: string;
      };
      location: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
        required: false;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: import("googleapis").bigquery_v2.Schema$Job;
    }>;
    getQueryJobResult: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      projectId: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        dataSource: string;
      };
      jobId: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        dataSource: string;
      };
      timeoutMs: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: number) => number;
        comments: string;
        example: string;
        placeholder: string;
        required: false;
      };
      location: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
        required: false;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          pageToken: {
            label: string;
            type: "string";
            clean: (value: unknown) => string | undefined;
            comments: string;
            example: string;
            placeholder: string;
            required: false;
          };
          maxResults: {
            label: string;
            type: "string";
            clean: (value: unknown, defaultValue?: number) => number;
            comments: string;
            example: string;
            placeholder: string;
            required: false;
          };
          startIndex: {
            label: string;
            type: "string";
            clean: (value: unknown, defaultValue?: string) => string;
            comments: string;
            example: string;
            placeholder: string;
            required: false;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: import("googleapis").bigquery_v2.Schema$GetQueryResultsResponse;
    }>;
    listJobs: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      projectId: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        dataSource: string;
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
          pageToken: {
            label: string;
            type: "string";
            clean: (value: unknown) => string | undefined;
            comments: string;
            example: string;
            placeholder: string;
            required: false;
          };
          maxResults: {
            label: string;
            type: "string";
            clean: (value: unknown, defaultValue?: number) => number;
            comments: string;
            example: string;
            placeholder: string;
            required: false;
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
          allUsers: {
            label: string;
            type: "boolean";
            clean: (value: unknown, defaultValue?: boolean) => boolean;
            comments: string;
            required: false;
          };
          minCreationTime: {
            label: string;
            type: "string";
            clean: (value: unknown) => string | undefined;
            comments: string;
            example: string;
            placeholder: string;
            required: false;
          };
          maxCreationTime: {
            label: string;
            type: "string";
            clean: (value: unknown) => string | undefined;
            comments: string;
            example: string;
            placeholder: string;
            required: false;
          };
          projection: {
            label: string;
            type: "string";
            clean: (value: unknown, defaultValue?: string) => string;
            comments: string;
            placeholder: string;
            model: {
              label: string;
              value: string;
            }[];
          };
          parentJobId: {
            label: string;
            type: "string";
            clean: (value: unknown) => string | undefined;
            comments: string;
            example: string;
            placeholder: string;
            required: false;
          };
        };
      } & {
        type: "structuredObject";
      };
      stateFilter: {
        label: string;
        type: "string";
        collection: "valuelist";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string[] | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    queryJob: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      projectId: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        dataSource: string;
      };
      query: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
        required: true;
      };
      maxResults: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: number) => number;
        comments: string;
        example: string;
        placeholder: string;
        required: false;
      };
      additionalFields: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          kind: {
            label: string;
            type: "string";
            clean: (value: unknown, defaultValue?: string) => string;
            comments: string;
            example: string;
            placeholder: string;
            required: false;
          };
          defaultDataset: {
            label: string;
            type: "code";
            language: "json";
            comments: string;
            example: string;
            clean: (value: unknown) => any;
            required: false;
          };
          timeoutMs: {
            label: string;
            type: "string";
            clean: (value: unknown, defaultValue?: number) => number;
            comments: string;
            example: string;
            placeholder: string;
            required: false;
          };
          dryRun: {
            label: string;
            type: "boolean";
            clean: (value: unknown, defaultValue?: boolean) => boolean;
            comments: string;
            required: false;
          };
          useQueryCache: {
            label: string;
            type: "boolean";
            clean: (value: unknown, defaultValue?: boolean) => boolean;
            default: string;
            comments: string;
            required: false;
          };
          useLegacySql: {
            label: string;
            type: "boolean";
            clean: (value: unknown, defaultValue?: boolean) => boolean;
            default: string;
            comments: string;
            required: false;
          };
          parameterMode: {
            label: string;
            type: "string";
            clean: (value: unknown, defaultValue?: string) => string;
            comments: string;
            example: string;
            placeholder: string;
            required: false;
          };
          queryParameters: {
            label: string;
            type: "code";
            language: "json";
            comments: string;
            example: string;
            clean: (value: unknown) => any;
            required: false;
          };
          location: {
            label: string;
            type: "string";
            clean: (value: unknown, defaultValue?: string) => string;
            comments: string;
            example: string;
            placeholder: string;
            required: false;
          };
          connectionProperties: {
            label: string;
            type: "code";
            language: "json";
            comments: string;
            example: string;
            clean: (value: unknown) => any;
            required: false;
          };
          labels: {
            label: string;
            type: "code";
            language: "json";
            comments: string;
            example: string;
            clean: (value: unknown) => any;
            required: false;
          };
          maximumBytesBilled: {
            label: string;
            type: "string";
            clean: (value: unknown, defaultValue?: string) => string;
            comments: string;
            example: string;
            placeholder: string;
            required: false;
          };
          requestId: {
            label: string;
            type: "string";
            clean: (value: unknown, defaultValue?: string) => string;
            comments: string;
            example: string;
            placeholder: string;
            required: false;
          };
          createSession: {
            label: string;
            type: "boolean";
            clean: (value: unknown, defaultValue?: boolean) => boolean;
            comments: string;
            required: false;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: import("googleapis").bigquery_v2.Schema$QueryResponse;
    }>;
    createDataset: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      projectId: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        dataSource: string;
      };
      datasetReference: {
        label: string;
        type: "code";
        language: "json";
        comments: string;
        example: string;
        clean: (value: unknown) => any;
        required: true;
      };
      additionalFields: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          kind: {
            label: string;
            type: "string";
            clean: (value: unknown, defaultValue?: string) => string;
            comments: string;
            example: string;
            placeholder: string;
            required: false;
          };
          etag: {
            label: string;
            type: "string";
            clean: (value: unknown, defaultValue?: string) => string;
            comments: string;
            example: string;
            placeholder: string;
            required: false;
          };
          id: {
            label: string;
            type: "string";
            clean: (value: unknown, defaultValue?: string) => string;
            comments: string;
            example: string;
            placeholder: string;
            required: false;
          };
          selfLink: {
            label: string;
            type: "string";
            clean: (value: unknown, defaultValue?: string) => string;
            comments: string;
            example: string;
            placeholder: string;
            required: false;
          };
          friendlyName: {
            label: string;
            type: "string";
            clean: (value: unknown, defaultValue?: string) => string;
            comments: string;
            example: string;
            placeholder: string;
            required: false;
          };
          description: {
            label: string;
            type: "string";
            clean: (value: unknown, defaultValue?: string) => string;
            comments: string;
            example: string;
            placeholder: string;
            required: false;
          };
          defaultTableExpirationMs: {
            label: string;
            type: "string";
            clean: (value: unknown, defaultValue?: string) => string;
            comments: string;
            example: string;
            placeholder: string;
            required: false;
          };
          defaultPartitionExpirationMs: {
            label: string;
            type: "string";
            clean: (value: unknown, defaultValue?: string) => string;
            comments: string;
            example: string;
            placeholder: string;
            required: false;
          };
          labels: {
            label: string;
            type: "code";
            language: "json";
            comments: string;
            example: string;
            clean: (value: unknown) => any;
            required: false;
          };
          access: {
            label: string;
            type: "code";
            language: "json";
            comments: string;
            example: string;
            clean: (value: unknown) => any;
            required: false;
          };
          creationTime: {
            label: string;
            type: "string";
            clean: (value: unknown, defaultValue?: string) => string;
            comments: string;
            example: string;
            placeholder: string;
            required: false;
          };
          lastModifiedTime: {
            label: string;
            type: "string";
            clean: (value: unknown, defaultValue?: string) => string;
            comments: string;
            example: string;
            placeholder: string;
            required: false;
          };
          location: {
            label: string;
            type: "string";
            clean: (value: unknown, defaultValue?: string) => string;
            comments: string;
            example: string;
            placeholder: string;
            required: false;
          };
          defaultEncryptionConfiguration: {
            label: string;
            type: "code";
            language: "json";
            comments: string;
            example: string;
            clean: (value: unknown) => any;
            required: false;
          };
          satisfiesPzs: {
            label: string;
            type: "boolean";
            clean: (value: unknown, defaultValue?: boolean) => boolean;
            comments: string;
            required: false;
          };
          isCaseInsensitive: {
            label: string;
            type: "boolean";
            clean: (value: unknown, defaultValue?: boolean) => boolean;
            comments: string;
            required: false;
          };
          defaultCollation: {
            label: string;
            type: "string";
            clean: (value: unknown, defaultValue?: string) => string;
            comments: string;
            example: string;
            placeholder: string;
            required: false;
          };
          defaultRoundingMode: {
            label: string;
            type: "string";
            clean: (value: unknown, defaultValue?: string) => string;
            required: false;
            comments: string;
            placeholder: string;
            model: {
              label: string;
              value: string;
            }[];
          };
          maxTimeTravelHours: {
            label: string;
            type: "string";
            clean: (value: unknown, defaultValue?: string) => string;
            comments: string;
            example: string;
            placeholder: string;
            required: false;
          };
          tags: {
            label: string;
            type: "code";
            language: "json";
            comments: string;
            example: string;
            clean: (value: unknown) => any;
            required: false;
          };
          storageBillingModel: {
            label: string;
            type: "string";
            clean: (value: unknown, defaultValue?: string) => string;
            comments: string;
            placeholder: string;
            model: {
              label: string;
              value: string;
            }[];
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: import("googleapis").bigquery_v2.Schema$Dataset;
    }>;
    updateDataset: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      projectId: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        dataSource: string;
      };
      datasetId: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        dataSource: string;
      };
      datasetReference: {
        label: string;
        type: "code";
        language: "json";
        comments: string;
        example: string;
        clean: (value: unknown) => any;
        required: true;
      };
      additionalFields: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          kind: {
            label: string;
            type: "string";
            clean: (value: unknown, defaultValue?: string) => string;
            comments: string;
            example: string;
            placeholder: string;
            required: false;
          };
          etag: {
            label: string;
            type: "string";
            clean: (value: unknown, defaultValue?: string) => string;
            comments: string;
            example: string;
            placeholder: string;
            required: false;
          };
          id: {
            label: string;
            type: "string";
            clean: (value: unknown, defaultValue?: string) => string;
            comments: string;
            example: string;
            placeholder: string;
            required: false;
          };
          selfLink: {
            label: string;
            type: "string";
            clean: (value: unknown, defaultValue?: string) => string;
            comments: string;
            example: string;
            placeholder: string;
            required: false;
          };
          friendlyName: {
            label: string;
            type: "string";
            clean: (value: unknown, defaultValue?: string) => string;
            comments: string;
            example: string;
            placeholder: string;
            required: false;
          };
          description: {
            label: string;
            type: "string";
            clean: (value: unknown, defaultValue?: string) => string;
            comments: string;
            example: string;
            placeholder: string;
            required: false;
          };
          defaultTableExpirationMs: {
            label: string;
            type: "string";
            clean: (value: unknown, defaultValue?: string) => string;
            comments: string;
            example: string;
            placeholder: string;
            required: false;
          };
          defaultPartitionExpirationMs: {
            label: string;
            type: "string";
            clean: (value: unknown, defaultValue?: string) => string;
            comments: string;
            example: string;
            placeholder: string;
            required: false;
          };
          labels: {
            label: string;
            type: "code";
            language: "json";
            comments: string;
            example: string;
            clean: (value: unknown) => any;
            required: false;
          };
          access: {
            label: string;
            type: "code";
            language: "json";
            comments: string;
            example: string;
            clean: (value: unknown) => any;
            required: false;
          };
          creationTime: {
            label: string;
            type: "string";
            clean: (value: unknown, defaultValue?: string) => string;
            comments: string;
            example: string;
            placeholder: string;
            required: false;
          };
          lastModifiedTime: {
            label: string;
            type: "string";
            clean: (value: unknown, defaultValue?: string) => string;
            comments: string;
            example: string;
            placeholder: string;
            required: false;
          };
          location: {
            label: string;
            type: "string";
            clean: (value: unknown, defaultValue?: string) => string;
            comments: string;
            example: string;
            placeholder: string;
            required: false;
          };
          defaultEncryptionConfiguration: {
            label: string;
            type: "code";
            language: "json";
            comments: string;
            example: string;
            clean: (value: unknown) => any;
            required: false;
          };
          satisfiesPzs: {
            label: string;
            type: "boolean";
            clean: (value: unknown, defaultValue?: boolean) => boolean;
            comments: string;
            required: false;
          };
          isCaseInsensitive: {
            label: string;
            type: "boolean";
            clean: (value: unknown, defaultValue?: boolean) => boolean;
            comments: string;
            required: false;
          };
          defaultCollation: {
            label: string;
            type: "string";
            clean: (value: unknown, defaultValue?: string) => string;
            comments: string;
            example: string;
            placeholder: string;
            required: false;
          };
          defaultRoundingMode: {
            label: string;
            type: "string";
            clean: (value: unknown, defaultValue?: string) => string;
            required: false;
            comments: string;
            placeholder: string;
            model: {
              label: string;
              value: string;
            }[];
          };
          maxTimeTravelHours: {
            label: string;
            type: "string";
            clean: (value: unknown, defaultValue?: string) => string;
            comments: string;
            example: string;
            placeholder: string;
            required: false;
          };
          tags: {
            label: string;
            type: "code";
            language: "json";
            comments: string;
            example: string;
            clean: (value: unknown) => any;
            required: false;
          };
          storageBillingModel: {
            label: string;
            type: "string";
            clean: (value: unknown, defaultValue?: string) => string;
            comments: string;
            placeholder: string;
            model: {
              label: string;
              value: string;
            }[];
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: import("googleapis").bigquery_v2.Schema$Dataset;
    }>;
    getDataset: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      projectId: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        dataSource: string;
      };
      datasetId: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: import("googleapis").bigquery_v2.Schema$Dataset;
    }>;
    listDatasets: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      projectId: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        dataSource: string;
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
          pageToken: {
            label: string;
            type: "string";
            clean: (value: unknown) => string | undefined;
            comments: string;
            example: string;
            placeholder: string;
            required: false;
          };
          maxResults: {
            label: string;
            type: "string";
            clean: (value: unknown, defaultValue?: number) => number;
            comments: string;
            example: string;
            placeholder: string;
            required: false;
          };
        };
      } & {
        type: "structuredObject";
      };
      all: {
        label: string;
        type: "boolean";
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        comments: string;
        required: false;
      };
      filter: {
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
        required: false;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    deleteDataset: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      projectId: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        dataSource: string;
      };
      datasetId: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: void;
    }>;
  };
  triggers: {
    myTrigger: import("@prismatic-io/spectral").TriggerDefinition<{}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      payload: import("@prismatic-io/spectral").TriggerPayload<Record<string, unknown>>;
      response: {
        statusCode: number;
        contentType: string;
      };
    }, import("@prismatic-io/spectral").Inputs>;
    pollChangesTrigger: import("@prismatic-io/spectral").PollingTriggerDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      projectId: {
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
        required: true;
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
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, import("@prismatic-io/spectral").TriggerPayload<Record<string, unknown>>, boolean, {
      payload: import("@prismatic-io/spectral").TriggerPayload;
      polledNoChanges: boolean;
    }, import("@prismatic-io/spectral").Inputs>;
  };
  connections: (import("@prismatic-io/spectral").KeyedConnection<{
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
      };
      clientSecret: {
        label: string;
        placeholder: string;
        type: "password";
        required: true;
        comments: string;
      };
    };
  }, "oauth2"> | import("@prismatic-io/spectral").KeyedConnection<{
    key: "googleServiceAccount";
    display: {
      label: string;
      description: string;
    };
    inputs: {
      clientEmail: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        example: string;
        shown: true;
        comments: string;
      };
      privateKey: {
        label: string;
        placeholder: string;
        type: "text";
        required: true;
        shown: true;
        comments: string;
      };
      scopes: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        example: string;
        default: string;
        shown: false;
        comments: string;
      };
    };
  }, "googleServiceAccount">)[];
  dataSources: {
    projectsNames: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectDataset: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      projectId: {
        dataSource: undefined;
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectJob: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      projectId: {
        dataSource: undefined;
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectModel: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      projectId: {
        dataSource: undefined;
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
        required: true;
      };
      datasetId: {
        dataSource: undefined;
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectRoutine: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      projectId: {
        dataSource: undefined;
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
        required: true;
      };
      datasetId: {
        dataSource: undefined;
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    tablesNames: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      projectId: {
        dataSource: undefined;
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
        required: true;
      };
      datasetId: {
        dataSource: undefined;
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
  };
}>;
export = _default;