//#region npm-dist/.entry.d.ts
declare const _default: import("@prismatic-io/spectral").CallableComponent<{
  key: "sap-ecc";
  public: true;
  documentationUrl: "https://prismatic.io/docs/components/sap-ecc/";
  display: {
    label: string;
    description: string;
    category: "Application Connectors";
    iconPath: string;
  };
  connections: import("@prismatic-io/spectral").KeyedConnection<{
    key: "sapEcc";
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
        required: true;
        shown: true;
        comments: string;
        default: string;
        onPremControlled: true;
      };
      sapClient: {
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
        required: true;
        shown: true;
        comments: string;
      };
      password: {
        label: string;
        placeholder: string;
        type: "password";
        required: true;
        shown: true;
        comments: string;
      };
    };
  }, "sapEcc">[];
  actions: {
    readTable: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      endpoint: {
        label: string;
        type: "string";
        required: true;
        default: "/sap/bc/soap/rfc";
        comments: string;
        example: "/sap/bc/soap/rfc";
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      tableName: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      fields: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      rowCount: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      rowSkips: {
        label: string;
        type: "string";
        required: false;
        default: string;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      whereClause: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        rows: Record<string, string>[];
        rowCount: number;
      };
    }>;
    callBapi: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      endpoint: {
        label: string;
        type: "string";
        required: true;
        default: "/sap/bc/soap/rfc";
        comments: string;
        example: "/sap/bc/soap/rfc";
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      bapiName: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      bapiParameters: {
        label: string;
        type: "code";
        required: false;
        language: "xml";
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      commitTransaction: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      waitOnCommit: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: Record<string, unknown> | undefined;
    }>;
    sendSoapRequest: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      endpoint: {
        label: string;
        type: "string";
        required: true;
        default: string;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      soapAction: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      soapBody: {
        label: string;
        type: "code";
        language: "xml";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      responseAsJson: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      commitTransaction: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      waitOnCommit: {
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
    sendIdoc: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      idocData: {
        label: string;
        type: "code";
        language: "xml";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      endpoint: {
        label: string;
        type: "string";
        required: true;
        default: "/sap/bc/idoc_xml/inbound";
        comments: string;
        example: "/sap/bc/idoc_xml/inbound";
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getIdocStatus: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      idocNumber: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      endpoint: {
        label: string;
        type: "string";
        required: true;
        default: "/sap/bc/soap/rfc";
        comments: string;
        example: "/sap/bc/soap/rfc";
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        rows: Record<string, string>[];
        rowCount: number;
      };
    }>;
  };
  dataSources: {
    selectBapi: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      endpoint: {
        label: string;
        type: "string";
        required: true;
        default: "/sap/bc/soap/rfc";
        comments: string;
        example: "/sap/bc/soap/rfc";
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      searchPattern: {
        label: string;
        type: "string";
        required: false;
        default: string;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
  };
  triggers: {
    pollIdocTrigger: import("@prismatic-io/spectral").PollingTriggerDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      endpoint: {
        label: string;
        type: "string";
        required: true;
        default: "/sap/bc/soap/rfc";
        comments: string;
        example: "/sap/bc/soap/rfc";
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      rowCount: {
        label: string;
        type: "string";
        required: false;
        default: string;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => number | undefined;
      };
      messageType: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      direction: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown) => string | undefined;
      };
      startingDocnum: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, import("@prismatic-io/spectral").TriggerPayload<Record<string, unknown>>, boolean, {
      payload: import("@prismatic-io/spectral").TriggerPayload;
    } | undefined, import("@prismatic-io/spectral").Inputs>;
  };
  hooks: {
    error: (error: unknown) => unknown;
  };
}>;
export = _default;