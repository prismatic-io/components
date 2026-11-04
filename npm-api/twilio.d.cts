//#region node_modules/axios/index.d.ts
type UppercaseMethod = 'GET' | 'DELETE' | 'HEAD' | 'OPTIONS' | 'POST' | 'PUT' | 'PATCH' | 'PURGE' | 'LINK' | 'UNLINK' | 'QUERY';
type Method = (UppercaseMethod | Lowercase<UppercaseMethod>) & {};
type ResponseType = 'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream' | 'formdata';
//#endregion
//#region npm-dist/.entry.d.ts
declare const _default: import("@prismatic-io/spectral").CallableComponent<{
  key: "twilio";
  documentationUrl: "https://prismatic.io/docs/components/twilio/";
  public: true;
  display: {
    label: string;
    description: string;
    iconPath: string;
    category: "Application Connectors";
  };
  actions: {
    sendSMS: import("@prismatic-io/spectral").ActionDefinition<{
      twilioConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      to: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      from: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      message: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        body: string;
        numSegments: string;
        direction: import("twilio/lib/rest/api/v2010/account/message").MessageDirection;
        from: string;
        to: string;
        dateUpdated: Date;
        price: string;
        errorMessage: string;
        uri: string;
        accountSid: string;
        numMedia: string;
        status: import("twilio/lib/rest/api/v2010/account/message").MessageStatus;
        messagingServiceSid: string;
        sid: string;
        dateSent: Date;
        dateCreated: Date;
        errorCode: number;
        priceUnit: string;
        apiVersion: string;
        subresourceUris: Record<string, string>;
      };
    }>;
    getSMS: import("@prismatic-io/spectral").ActionDefinition<{
      twilioConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      sid: {
        label: string;
        placeholder: string;
        required: true;
        type: "string";
        comments: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        body: string;
        numSegments: string;
        direction: import("twilio/lib/rest/api/v2010/account/message").MessageDirection;
        from: string;
        to: string;
        dateUpdated: Date;
        price: string;
        errorMessage: string;
        uri: string;
        accountSid: string;
        numMedia: string;
        status: import("twilio/lib/rest/api/v2010/account/message").MessageStatus;
        messagingServiceSid: string;
        sid: string;
        dateSent: Date;
        dateCreated: Date;
        errorCode: number;
        priceUnit: string;
        apiVersion: string;
        subresourceUris: Record<string, string>;
      };
    }>;
    listMessages: import("@prismatic-io/spectral").ActionDefinition<{
      twilioConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        body: string;
        numSegments: string;
        direction: import("twilio/lib/rest/api/v2010/account/message").MessageDirection;
        from: string;
        to: string;
        dateUpdated: Date;
        price: string;
        errorMessage: string;
        uri: string;
        accountSid: string;
        numMedia: string;
        status: import("twilio/lib/rest/api/v2010/account/message").MessageStatus;
        messagingServiceSid: string;
        sid: string;
        dateSent: Date;
        dateCreated: Date;
        errorCode: number;
        priceUnit: string;
        apiVersion: string;
        subresourceUris: Record<string, string>;
      }[];
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
      twilioConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
  };
  dataSources: {
    selectMessage: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
  };
  triggers: {
    webhook: import("@prismatic-io/spectral").TriggerDefinition<{}, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      payload: import("@prismatic-io/spectral").TriggerPayload<Record<string, unknown>>;
    }, import("@prismatic-io/spectral").Inputs>;
    pollChangesTrigger: import("@prismatic-io/spectral").PollingTriggerDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
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
      from: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      to: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
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
  connections: (import("@prismatic-io/spectral").KeyedConnection<{
    key: "apiKeySecret";
    display: {
      label: string;
      description: string;
    };
    inputs: {
      accountSid: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        shown: true;
        comments: string;
        example: string;
      };
      apiKey: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        shown: true;
        comments: string;
        example: string;
      };
      apiSecret: {
        label: string;
        placeholder: string;
        type: "password";
        required: true;
        shown: true;
        comments: string;
      };
    };
  }, "apiKeySecret"> | import("@prismatic-io/spectral").KeyedConnection<{
    key: "basic";
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
        comments: string;
        required: true;
        shown: true;
      };
    };
  }, "basic">)[];
}>;
export = _default;