//#region src/types/index.d.ts
type CursorValue = string | number | Date;
type PollTableRow = Record<string, unknown>;
//#endregion
//#region npm-dist/.entry.d.ts
declare const _default: import("@prismatic-io/spectral").CallableComponent<{
  key: "postgres";
  documentationUrl: "https://prismatic.io/docs/components/postgres/";
  public: true;
  display: {
    label: string;
    description: string;
    iconPath: string;
    category: "Data Platforms";
  };
  actions: {
    query: import("@prismatic-io/spectral").ActionDefinition<{
      postgresConnection: {
        label: string;
        comments: string;
        type: "connection";
        required: true;
      };
      queryField: {
        label: string;
        comments: string;
        type: "code";
        language: "pgsql";
        placeholder: string;
        required: true;
        example: string;
      };
      params: {
        label: string;
        comments: string;
        type: "data";
        required: false;
        collection: "keyvaluelist";
        clean: (value: unknown) => Record<string, unknown>;
      };
      paramsObject: {
        label: string;
        comments: string;
        type: "code";
        language: "json";
        placeholder: string;
        required: false;
        example: string;
        clean: (value: unknown) => object;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any[];
    }>;
  };
  connections: import("@prismatic-io/spectral").KeyedConnection<{
    key: "postgres";
    display: {
      label: string;
      description: string;
    };
    inputs: {
      host: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        shown: true;
        comments: string;
        example: string;
        onPremControlled: true;
      };
      port: {
        label: string;
        placeholder: string;
        type: "string";
        default: string;
        required: true;
        shown: true;
        comments: string;
        onPremControlled: true;
      };
      database: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        shown: true;
        comments: string;
        example: string;
      };
      username: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        shown: true;
        comments: string;
      };
      password: {
        label: string;
        placeholder: string;
        type: "password";
        required: false;
        shown: true;
        comments: string;
      };
      requireSSL: {
        label: string;
        comments: string;
        type: "boolean";
        required: true;
        default: string;
      };
      timeout: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        default: string;
        clean: (value: unknown, defaultValue?: number) => number;
      };
    };
  }, "postgres">[];
  triggers: {
    pollTable: import("@prismatic-io/spectral").PollingTriggerDefinition<{
      postgresConnection: {
        label: string;
        comments: string;
        type: "connection";
        required: true;
      };
      tableName: {
        label: string;
        comments: string;
        placeholder: string;
        example: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      cursorField: {
        label: string;
        default: string;
        example: string;
        placeholder: string;
        comments: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      castTimestampsToString: {
        label: string;
        default: string;
        comments: string;
        type: "boolean";
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      defaultCursorValue: {
        label: string;
        type: "string";
        placeholder: string;
        comments: string;
        example: string;
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      maxRecordsPerRecurrence: {
        label: string;
        type: "string";
        placeholder: string;
        comments: string;
        example: string;
        required: false;
        clean: (value: unknown) => number | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, import("@prismatic-io/spectral").TriggerPayload<Record<string, unknown>>, boolean, {
      payload: {
        body: {
          data: PollTableRow[];
        };
        paginationState: {
          cursor: CursorValue;
        } | undefined;
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
      };
      polledNoChanges: boolean;
    }, import("@prismatic-io/spectral").Inputs>;
  };
}>;
export = _default;