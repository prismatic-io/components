//#region node_modules/axios/index.d.ts
type UppercaseMethod = 'GET' | 'DELETE' | 'HEAD' | 'OPTIONS' | 'POST' | 'PUT' | 'PATCH' | 'PURGE' | 'LINK' | 'UNLINK' | 'QUERY';
type Method = (UppercaseMethod | Lowercase<UppercaseMethod>) & {};
type ResponseType = 'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream' | 'formdata';
//#endregion
//#region npm-dist/.entry.d.ts
declare const _default: import("@prismatic-io/spectral").CallableComponent<{
  key: "ms-teams";
  public: true;
  documentationUrl: "https://prismatic.io/docs/components/ms-teams/";
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
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getWebinar: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      webinarId: {
        label: string;
        type: "string";
        required: true;
        clean: (param: unknown) => string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    publishWebinar: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      webinarId: {
        label: string;
        type: "string";
        required: true;
        clean: (param: unknown) => string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    cancelWebinar: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      webinarId: {
        label: string;
        type: "string";
        required: true;
        clean: (param: unknown) => string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listWebinars: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      role: {
        label: string;
        type: "string";
        required: false;
        model: {
          label: string;
          value: string;
        }[];
      };
      timeout: {
        label: string;
        type: "string";
        example: string;
        required: false;
        comments: string;
        clean: (value: unknown) => number;
      };
      top: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (param: unknown) => number;
      };
      skipToken: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (param: unknown) => string;
      };
      filter: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (param: unknown) => string;
      };
      orderBy: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      search: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (param: unknown) => string;
      };
      select: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (param: unknown) => string;
      };
      expand: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (param: unknown) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createWebinar: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      displayName: {
        comments: string;
        example: string;
        required: boolean;
        label: string;
        type: "string";
        clean: (param: unknown) => string;
      };
      descriptionContentType: {
        label: string;
        type: "string";
        required: true;
        model: {
          label: string;
          value: string;
        }[];
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      descriptionContent: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      startDateTime: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      endDateTime: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      timeZone: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      audience: {
        label: string;
        type: "string";
        required: false;
        model: {
          label: string;
          value: string;
        }[];
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      coOrganizers: {
        label: string;
        type: "code";
        language: "json";
        required: false;
        example: string;
        clean: (value: unknown) => object;
      };
      settings: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => {
          isAttendeeEmailNotificationEnabled: boolean;
        };
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getWebinarRegistration: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      webinarId: {
        label: string;
        type: "string";
        required: true;
      };
      registrationId: {
        label: string;
        type: "string";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createWebinarRegistration: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      webinarId: {
        label: string;
        type: "string";
        required: true;
      };
      firstName: {
        label: string;
        type: "string";
        required: true;
      };
      lastName: {
        label: string;
        type: "string";
        required: true;
      };
      email: {
        label: string;
        type: "string";
        required: true;
      };
      externalRegistrationInformation: {
        label: string;
        type: "code";
        language: "json";
        example: string;
      };
      registrationQuestionAnswers: {
        label: string;
        type: "code";
        language: "json";
        example: string;
      };
      preferredLanguage: {
        label: string;
        type: "string";
        example: string;
        default: string;
        required: true;
      };
      preferredTimezone: {
        label: string;
        example: string;
        type: "string";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    cancelWebinarRegistration: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      webinarId: {
        label: string;
        type: "string";
        required: true;
      };
      registrationId: {
        label: string;
        type: "string";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listWebinarRegistrations: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      webinarId: {
        label: string;
        type: "string";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getWebinarSession: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      webinarId: {
        label: string;
        type: "string";
        required: true;
        clean: (param: unknown) => string;
        dataSource: string;
      };
      sessionId: {
        label: string;
        type: "string";
        required: true;
        clean: (param: unknown) => string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listWebinarSessions: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      webinarId: {
        label: string;
        type: "string";
        required: true;
        clean: (param: unknown) => string;
        dataSource: string;
      };
      timeout: {
        label: string;
        type: "string";
        example: string;
        required: false;
        comments: string;
        clean: (value: unknown) => number;
      };
      top: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (param: unknown) => number;
      };
      skipToken: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (param: unknown) => string;
      };
      filter: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (param: unknown) => string;
      };
      orderBy: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      search: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (param: unknown) => string;
      };
      select: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (param: unknown) => string;
      };
      expand: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (param: unknown) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getSessionAttendanceReport: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      webinarId: {
        label: string;
        type: "string";
        required: true;
        clean: (param: unknown) => string;
        dataSource: string;
      };
      sessionId: {
        label: string;
        type: "string";
        required: true;
        clean: (param: unknown) => string;
        dataSource: string;
      };
      reportId: {
        label: string;
        required: true;
        type: "string";
      };
      timeout: {
        label: string;
        type: "string";
        example: string;
        required: false;
        comments: string;
        clean: (value: unknown) => number;
      };
      top: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (param: unknown) => number;
      };
      skipToken: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (param: unknown) => string;
      };
      filter: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (param: unknown) => string;
      };
      orderBy: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      search: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (param: unknown) => string;
      };
      select: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (param: unknown) => string;
      };
      expand: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (param: unknown) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listSessionAttendanceReports: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        comments: string;
        required: false;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      webinarId: {
        label: string;
        type: "string";
        required: true;
        clean: (param: unknown) => string;
        dataSource: string;
      };
      sessionId: {
        label: string;
        type: "string";
        required: true;
        clean: (param: unknown) => string;
        dataSource: string;
      };
      timeout: {
        label: string;
        type: "string";
        example: string;
        required: false;
        comments: string;
        clean: (value: unknown) => number;
      };
      top: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (param: unknown) => number;
      };
      skipToken: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (param: unknown) => string;
      };
      filter: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (param: unknown) => string;
      };
      orderBy: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      search: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (param: unknown) => string;
      };
      select: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (param: unknown) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listAttendanceRecords: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        comments: string;
        required: false;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      webinarId: {
        label: string;
        type: "string";
        required: true;
        clean: (param: unknown) => string;
        dataSource: string;
      };
      sessionId: {
        label: string;
        type: "string";
        required: true;
        clean: (param: unknown) => string;
        dataSource: string;
      };
      reportId: {
        label: string;
        required: true;
        type: "string";
      };
      timeout: {
        label: string;
        type: "string";
        example: string;
        required: false;
        comments: string;
        clean: (value: unknown) => number;
      };
      top: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (param: unknown) => number;
      };
      skipToken: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (param: unknown) => string;
      };
      filter: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (param: unknown) => string;
      };
      orderBy: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      search: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (param: unknown) => string;
      };
      select: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (param: unknown) => string;
      };
      expand: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (param: unknown) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    sendIncomingWebhookMessage: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      message: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    sendIncomingWebhookAdaptiveCard: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      cardPayload: {
        label: string;
        type: "data";
        required: true;
        placeholder: string;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listUsers: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        comments: string;
        required: false;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      timeout: {
        label: string;
        type: "string";
        example: string;
        required: false;
        comments: string;
        clean: (value: unknown) => number;
      };
      filter: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (param: unknown) => string;
      };
      top: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (param: unknown) => number;
      };
      skipToken: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (param: unknown) => string;
      };
      orderBy: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      search: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (param: unknown) => string;
      };
      select: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (param: unknown) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getUser: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      userId: {
        label: string;
        type: "string";
        example: string;
        comments: string;
        required: true;
        clean: (param: unknown) => string;
        dataSource: string;
      };
      timeout: {
        label: string;
        type: "string";
        example: string;
        required: false;
        comments: string;
        clean: (value: unknown) => number;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deleteUser: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      userId: {
        label: string;
        type: "string";
        example: string;
        comments: string;
        required: true;
        clean: (param: unknown) => string;
        dataSource: string;
      };
      timeout: {
        label: string;
        type: "string";
        example: string;
        required: false;
        comments: string;
        clean: (value: unknown) => number;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getCurrentUser: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      userPrincipalName: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      timeout: {
        label: string;
        type: "string";
        example: string;
        required: false;
        comments: string;
        clean: (value: unknown) => number;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listUsersTeams: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        comments: string;
        required: false;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      userId: {
        label: string;
        type: "string";
        example: string;
        comments: string;
        required: true;
        clean: (param: unknown) => string;
        dataSource: string;
      };
      timeout: {
        label: string;
        type: "string";
        example: string;
        required: false;
        comments: string;
        clean: (value: unknown) => number;
      };
      filter: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (param: unknown) => string;
      };
      top: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (param: unknown) => number;
      };
      skipToken: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (param: unknown) => string;
      };
      orderBy: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      search: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (param: unknown) => string;
      };
      select: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (param: unknown) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listTeams: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        comments: string;
        required: false;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      timeout: {
        label: string;
        type: "string";
        example: string;
        required: false;
        comments: string;
        clean: (value: unknown) => number;
      };
      filter: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (param: unknown) => string;
      };
      top: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (param: unknown) => number;
      };
      skipToken: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (param: unknown) => string;
      };
      orderBy: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      select: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (param: unknown) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listJoinedTeams: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        comments: string;
        required: false;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      userPrincipalName: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      timeout: {
        label: string;
        type: "string";
        example: string;
        required: false;
        comments: string;
        clean: (value: unknown) => number;
      };
      filter: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (param: unknown) => string;
      };
      top: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (param: unknown) => number;
      };
      skipToken: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (param: unknown) => string;
      };
      select: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (param: unknown) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listMembers: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        comments: string;
        required: false;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      teamId: {
        label: string;
        type: "string";
        required: true;
        example: string;
        comments: string;
        clean: (param: unknown) => string;
        dataSource: string;
      };
      timeout: {
        label: string;
        type: "string";
        example: string;
        required: false;
        comments: string;
        clean: (value: unknown) => number;
      };
      filter: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (param: unknown) => string;
      };
      top: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (param: unknown) => number;
      };
      skipToken: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (param: unknown) => string;
      };
      select: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (param: unknown) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    removeMember: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      teamId: {
        label: string;
        type: "string";
        required: true;
        example: string;
        comments: string;
        clean: (param: unknown) => string;
        dataSource: string;
      };
      memberId: {
        label: string;
        type: "string";
        required: true;
        example: string;
        comments: string;
        clean: (param: unknown) => string;
      };
      timeout: {
        label: string;
        type: "string";
        example: string;
        required: false;
        comments: string;
        clean: (value: unknown) => number;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getMember: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      teamId: {
        label: string;
        type: "string";
        required: true;
        example: string;
        comments: string;
        clean: (param: unknown) => string;
        dataSource: string;
      };
      memberId: {
        label: string;
        type: "string";
        required: true;
        example: string;
        comments: string;
        clean: (param: unknown) => string;
      };
      timeout: {
        label: string;
        type: "string";
        example: string;
        required: false;
        comments: string;
        clean: (value: unknown) => number;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    archiveTeam: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      teamId: {
        label: string;
        type: "string";
        required: true;
        example: string;
        comments: string;
        clean: (param: unknown) => string;
        dataSource: string;
      };
      timeout: {
        label: string;
        type: "string";
        example: string;
        required: false;
        comments: string;
        clean: (value: unknown) => number;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    addMember: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      teamId: {
        label: string;
        type: "string";
        required: true;
        example: string;
        comments: string;
        clean: (param: unknown) => string;
        dataSource: string;
      };
      roles: {
        label: string;
        type: "string";
        collection: "valuelist";
        comments: string;
        example: string;
        required: false;
      };
      userId: {
        label: string;
        type: "string";
        example: string;
        comments: string;
        required: true;
        clean: (param: unknown) => string;
        dataSource: string;
      };
      timeout: {
        label: string;
        type: "string";
        example: string;
        required: false;
        comments: string;
        clean: (value: unknown) => number;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createTeam: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      visibility: {
        label: string;
        type: "string";
        model: {
          label: string;
          value: string;
        }[];
        default: string;
        required: true;
        comments: string;
      };
      teamName: {
        label: string;
        type: "string";
        required: true;
        example: string;
        comments: string;
      };
      channelName: {
        label: string;
        type: "string";
        required: true;
        example: string;
        comments: string;
      };
      channelDescription: {
        label: string;
        type: "string";
        required: true;
        example: string;
        comments: string;
      };
      teamDescription: {
        label: string;
        type: "string";
        required: true;
        example: string;
        comments: string;
      };
      allowCreateUpdateChannels: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
      };
      allowUserDeleteMessages: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
      };
      allowUserEditMessages: {
        label: string;
        type: "boolean";
        comments: string;
        required: false;
      };
      allowGiphy: {
        label: string;
        type: "boolean";
        comments: string;
        required: false;
      };
      giphyContentRating: {
        label: string;
        type: "string";
        model: {
          label: string;
          value: string;
        }[];
        required: false;
      };
      timeout: {
        label: string;
        type: "string";
        example: string;
        required: false;
        comments: string;
        clean: (value: unknown) => number;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getTeam: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      teamId: {
        label: string;
        type: "string";
        required: true;
        example: string;
        comments: string;
        clean: (param: unknown) => string;
        dataSource: string;
      };
      timeout: {
        label: string;
        type: "string";
        example: string;
        required: false;
        comments: string;
        clean: (value: unknown) => number;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    updateTeam: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      teamId: {
        label: string;
        type: "string";
        required: true;
        example: string;
        comments: string;
        clean: (param: unknown) => string;
        dataSource: string;
      };
      visibility: {
        label: string;
        type: "string";
        model: {
          label: string;
          value: string;
        }[];
        default: string;
        required: true;
        comments: string;
      };
      teamName: {
        required: false;
        label: string;
        type: "string";
        example: string;
        comments: string;
      };
      teamDescription: {
        required: false;
        label: string;
        type: "string";
        example: string;
        comments: string;
      };
      allowCreateUpdateChannels: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
      };
      allowUserDeleteMessages: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
      };
      allowUserEditMessages: {
        label: string;
        type: "boolean";
        comments: string;
        required: false;
      };
      allowGiphy: {
        label: string;
        type: "boolean";
        comments: string;
        required: false;
      };
      giphyContentRating: {
        label: string;
        type: "string";
        model: {
          label: string;
          value: string;
        }[];
        required: false;
      };
      timeout: {
        label: string;
        type: "string";
        example: string;
        required: false;
        comments: string;
        clean: (value: unknown) => number;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listTeamsApps: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      timeout: {
        label: string;
        type: "string";
        example: string;
        required: false;
        comments: string;
        clean: (value: unknown) => number;
      };
      top: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (param: unknown) => number;
      };
      skipToken: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (param: unknown) => string;
      };
      filter: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (param: unknown) => string;
      };
      orderBy: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      select: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (param: unknown) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listChannels: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        comments: string;
        required: false;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      teamId: {
        label: string;
        type: "string";
        required: true;
        example: string;
        comments: string;
        clean: (param: unknown) => string;
        dataSource: string;
      };
      timeout: {
        label: string;
        type: "string";
        example: string;
        required: false;
        comments: string;
        clean: (value: unknown) => number;
      };
      filter: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (param: unknown) => string;
      };
      select: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (param: unknown) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getChannel: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      teamId: {
        label: string;
        type: "string";
        required: true;
        example: string;
        comments: string;
        clean: (param: unknown) => string;
        dataSource: string;
      };
      channelId: {
        label: string;
        type: "string";
        example: string;
        comments: string;
        required: true;
        clean: (param: unknown) => string;
        dataSource: string;
      };
      timeout: {
        label: string;
        type: "string";
        example: string;
        required: false;
        comments: string;
        clean: (value: unknown) => number;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deleteChannel: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      teamId: {
        label: string;
        type: "string";
        required: true;
        example: string;
        comments: string;
        clean: (param: unknown) => string;
        dataSource: string;
      };
      channelId: {
        label: string;
        type: "string";
        example: string;
        comments: string;
        required: true;
        clean: (param: unknown) => string;
        dataSource: string;
      };
      timeout: {
        label: string;
        type: "string";
        example: string;
        required: false;
        comments: string;
        clean: (value: unknown) => number;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createChannel: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      teamId: {
        label: string;
        type: "string";
        required: true;
        example: string;
        comments: string;
        clean: (param: unknown) => string;
        dataSource: string;
      };
      channelName: {
        label: string;
        type: "string";
        required: true;
        example: string;
        comments: string;
      };
      channelDescription: {
        label: string;
        type: "string";
        required: true;
        example: string;
        comments: string;
      };
      membershipType: {
        label: string;
        type: "string";
        model: {
          label: string;
          value: string;
        }[];
        required: true;
        comments: string;
      };
      visibility: {
        label: string;
        type: "string";
        model: {
          label: string;
          value: string;
        }[];
        default: string;
        required: true;
        comments: string;
      };
      timeout: {
        label: string;
        type: "string";
        example: string;
        required: false;
        comments: string;
        clean: (value: unknown) => number;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    updateChannel: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      teamId: {
        label: string;
        type: "string";
        required: true;
        example: string;
        comments: string;
        clean: (param: unknown) => string;
        dataSource: string;
      };
      channelId: {
        label: string;
        type: "string";
        example: string;
        comments: string;
        required: true;
        clean: (param: unknown) => string;
        dataSource: string;
      };
      channelName: {
        required: false;
        label: string;
        type: "string";
        example: string;
        comments: string;
      };
      channelDescription: {
        required: false;
        label: string;
        type: "string";
        example: string;
        comments: string;
      };
      visibility: {
        required: false;
        label: string;
        type: "string";
        model: {
          label: string;
          value: string;
        }[];
        default: string;
        comments: string;
      };
      timeout: {
        label: string;
        type: "string";
        example: string;
        required: false;
        comments: string;
        clean: (value: unknown) => number;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    sendChannelMessage: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      teamId: {
        label: string;
        type: "string";
        required: true;
        example: string;
        comments: string;
        clean: (param: unknown) => string;
        dataSource: string;
      };
      channelId: {
        label: string;
        type: "string";
        example: string;
        comments: string;
        required: true;
        clean: (param: unknown) => string;
        dataSource: string;
      };
      message: {
        label: string;
        type: "string";
        example: string;
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      contentType: {
        label: string;
        model: {
          label: string;
          value: string;
        }[];
        type: "string";
        required: false;
        default: string;
        comments: string;
      };
      timeout: {
        label: string;
        type: "string";
        example: string;
        required: false;
        comments: string;
        clean: (value: unknown) => number;
      };
      importance: {
        label: string;
        type: "string";
        default: string;
        model: {
          label: string;
          value: string;
        }[];
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    sendChannelAdaptiveCard: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      teamId: {
        label: string;
        type: "string";
        required: true;
        example: string;
        comments: string;
        clean: (param: unknown) => string;
        dataSource: string;
      };
      channelId: {
        label: string;
        type: "string";
        example: string;
        comments: string;
        required: true;
        clean: (param: unknown) => string;
        dataSource: string;
      };
      cardPayload: {
        label: string;
        type: "data";
        required: true;
        placeholder: string;
        comments: string;
      };
      importance: {
        label: string;
        type: "string";
        default: string;
        model: {
          label: string;
          value: string;
        }[];
      };
      timeout: {
        label: string;
        type: "string";
        example: string;
        required: false;
        comments: string;
        clean: (value: unknown) => number;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listChannelMessages: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      teamId: {
        label: string;
        type: "string";
        required: true;
        example: string;
        comments: string;
        clean: (param: unknown) => string;
        dataSource: string;
      };
      channelId: {
        label: string;
        type: "string";
        example: string;
        comments: string;
        required: true;
        clean: (param: unknown) => string;
        dataSource: string;
      };
      timeout: {
        label: string;
        type: "string";
        example: string;
        required: false;
        comments: string;
        clean: (value: unknown) => number;
      };
      top: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (param: unknown) => number;
      };
      skipToken: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (param: unknown) => string;
      };
      filter: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (param: unknown) => string;
      };
      orderBy: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      search: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (param: unknown) => string;
      };
      select: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (param: unknown) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listCatalogApps: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        comments: string;
        required: false;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      filter: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (param: unknown) => string;
      };
      select: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (param: unknown) => string;
      };
      expand: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (param: unknown) => string;
      };
      timeout: {
        label: string;
        type: "string";
        example: string;
        required: false;
        comments: string;
        clean: (value: unknown) => number;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listInstalledApps: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      teamId: {
        label: string;
        type: "string";
        required: true;
        example: string;
        comments: string;
        clean: (param: unknown) => string;
        dataSource: string;
      };
      filter: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (param: unknown) => string;
      };
      select: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (param: unknown) => string;
      };
      expand: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (param: unknown) => string;
      };
      timeout: {
        label: string;
        type: "string";
        example: string;
        required: false;
        comments: string;
        clean: (value: unknown) => number;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    addInstalledApp: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      teamId: {
        label: string;
        type: "string";
        required: true;
        example: string;
        comments: string;
        clean: (param: unknown) => string;
        dataSource: string;
      };
      appId: {
        label: string;
        type: "string";
        required: true;
        example: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      timeout: {
        label: string;
        type: "string";
        example: string;
        required: false;
        comments: string;
        clean: (value: unknown) => number;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    upgradeInstalledApp: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      teamId: {
        label: string;
        type: "string";
        required: true;
        example: string;
        comments: string;
        clean: (param: unknown) => string;
        dataSource: string;
      };
      appInstallationId: {
        label: string;
        type: "string";
        required: true;
        example: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      timeout: {
        label: string;
        type: "string";
        example: string;
        required: false;
        comments: string;
        clean: (value: unknown) => number;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    removeInstalledApp: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      teamId: {
        label: string;
        type: "string";
        required: true;
        example: string;
        comments: string;
        clean: (param: unknown) => string;
        dataSource: string;
      };
      appInstallationId: {
        label: string;
        type: "string";
        required: true;
        example: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      timeout: {
        label: string;
        type: "string";
        example: string;
        required: false;
        comments: string;
        clean: (value: unknown) => number;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
  };
  triggers: {
    webhook: import("@prismatic-io/spectral").TriggerDefinition<{
      signingSecrets: {
        label: string;
        type: "data";
        comments: string;
        required: true;
      };
      triggerResponse: {
        label: string;
        type: "code";
        language: "json";
        required: false;
        default: string;
      };
      failedResponse: {
        label: string;
        type: "code";
        language: "json";
        required: false;
        default: string;
      };
      debugVerification: {
        label: string;
        type: "boolean";
        default: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      payload: import("@prismatic-io/spectral").TriggerPayload<Record<string, unknown>>;
      response: {
        statusCode: number;
        contentType: string;
        body: string;
      };
    }, import("@prismatic-io/spectral").Inputs>;
  };
  connections: (import("@prismatic-io/spectral").KeyedConnection<{
    key: "oauth";
    display: {
      label: string;
      description: string;
    };
    oauth2Type: import("@prismatic-io/spectral").OAuth2Type.AuthorizationCode;
    inputs: {
      authorizeUrl: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        shown: true;
        comments: string;
        default: string;
      };
      tokenUrl: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        shown: true;
        comments: string;
        default: string;
      };
      scopes: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        shown: true;
        comments: string;
        default: string;
      };
      clientId: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        shown: true;
      };
      clientSecret: {
        label: string;
        placeholder: string;
        type: "password";
        required: true;
        shown: true;
      };
    };
  }, "oauth"> | import("@prismatic-io/spectral").KeyedConnection<{
    key: "clientCredentials";
    display: {
      label: string;
      description: string;
    };
    oauth2Type: import("@prismatic-io/spectral").OAuth2Type.ClientCredentials;
    inputs: {
      tokenUrl: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        shown: true;
        comments: string;
        default: string;
      };
      scopes: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        shown: false;
        comments: string;
        default: string;
      };
      clientId: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        shown: true;
      };
      clientSecret: {
        label: string;
        placeholder: string;
        type: "password";
        required: true;
        shown: true;
      };
    };
  }, "clientCredentials"> | import("@prismatic-io/spectral").KeyedConnection<{
    key: "webhook";
    display: {
      label: string;
      description: string;
    };
    inputs: {
      webhookUrl: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
      };
    };
  }, "webhook"> | import("@prismatic-io/spectral").KeyedConnection<{
    key: "adminConsent";
    display: {
      label: string;
      description: string;
    };
    oauth2Type: import("@prismatic-io/spectral").OAuth2Type.AuthorizationCode;
    inputs: {
      authorizeUrl: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        shown: true;
        comments: string;
        default: string;
      };
      tokenUrl: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        shown: true;
        comments: string;
        default: string;
      };
      scopes: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        shown: true;
        comments: string;
        default: string;
      };
      clientId: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        shown: true;
      };
      clientSecret: {
        label: string;
        placeholder: string;
        type: "password";
        required: true;
        shown: true;
      };
    };
  }, "adminConsent">)[];
  dataSources: {
    teamNames: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      userPrincipalName: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    channelNames: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      teamId: {
        dataSource: any;
        label: string;
        type: "string";
        required: true;
        example: string;
        comments: string;
        clean: (param: unknown) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    userNames: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    webinarNames: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      role: {
        model: any;
        default: string;
        comments: string;
        label: string;
        type: "string";
        required: false;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectWebinarSession: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      webinarId: {
        dataSource: any;
        label: string;
        type: "string";
        required: true;
        clean: (param: unknown) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
  };
}>;
export = _default;