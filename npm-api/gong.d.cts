//#region node_modules/axios/index.d.ts
type UppercaseMethod = 'GET' | 'DELETE' | 'HEAD' | 'OPTIONS' | 'POST' | 'PUT' | 'PATCH' | 'PURGE' | 'LINK' | 'UNLINK' | 'QUERY';
type Method = (UppercaseMethod | Lowercase<UppercaseMethod>) & {};
type ResponseType = 'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream' | 'formdata';
//#endregion
//#region src/types.d.ts
interface GongRecord {
  id: string;
  [key: string]: unknown;
}
//#endregion
//#region npm-dist/.entry.d.ts
declare const _default: import("@prismatic-io/spectral").CallableComponent<{
  key: "gong";
  public: true;
  documentationUrl: "https://prismatic.io/docs/components/gong/";
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
    listWorkspaces: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    rawRequest: import("@prismatic-io/spectral").ActionDefinition<{
      url: {
        example: string;
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
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
    customActionEvent: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      reportingSystem: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
      };
      eventTimestamp: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
      };
      eventId: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
      };
      contentId: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
      };
      contentUrl: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
      };
      contentTitle: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
      };
      actionName: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
      };
      eventInfoUrl: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
      };
      actor: {
        label: string;
        type: "code";
        language: "json";
        example: string;
        clean: (value: unknown) => any;
        required: false;
      };
      crmContext: {
        label: string;
        type: "code";
        language: "json";
        example: string;
        clean: (value: unknown) => any;
        required: false;
      };
      contentProperties: {
        label: string;
        type: "code";
        language: "json";
        example: string;
        clean: (value: unknown) => any;
        required: false;
      };
      eventProperties: {
        label: string;
        type: "code";
        language: "json";
        example: string;
        clean: (value: unknown) => any;
        required: false;
      };
      userAgent: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
      };
      mobileAppId: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
      };
      agentPlatform: {
        label: string;
        type: "string";
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        model: {
          label: string;
          value: string;
        }[];
        required: false;
        example: string;
      };
      workspaceId: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
      };
      nonCompanyParticipants: {
        label: string;
        type: "code";
        language: "json";
        example: string;
        clean: (value: unknown) => any;
        required: false;
      };
      moreInfoUrl: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        example: string;
        placeholder: string;
      };
      shareId: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        example: string;
        placeholder: string;
      };
      sharer: {
        label: string;
        type: "code";
        language: "json";
        example: string;
        clean: (value: unknown) => any;
        required: false;
      };
      sharingMessageSubject: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
      };
      sharingMessageBody: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    customSharedEvent: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      reportingSystem: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
      };
      eventTimestamp: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
      };
      eventId: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
      };
      contentId: {
        required: true;
        comments: string;
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        example: string;
        placeholder: string;
      };
      contentUrl: {
        required: true;
        comments: string;
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        example: string;
        placeholder: string;
      };
      contentTitle: {
        required: true;
        comments: string;
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        example: string;
        placeholder: string;
      };
      shareId: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        example: string;
        placeholder: string;
      };
      shareInfoUrl: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
      };
      sharingMessageSubject: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
      };
      sharingMessageBody: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
      };
      sharer: {
        label: string;
        type: "code";
        language: "json";
        example: string;
        clean: (value: unknown) => any;
        required: false;
      };
      recipients: {
        label: string;
        type: "code";
        language: "json";
        example: string;
        clean: (value: unknown) => any;
        required: false;
      };
      crmContext: {
        label: string;
        type: "code";
        language: "json";
        example: string;
        clean: (value: unknown) => any;
        required: false;
      };
      contentProperties: {
        label: string;
        type: "code";
        language: "json";
        example: string;
        clean: (value: unknown) => any;
        required: false;
      };
      eventProperties: {
        label: string;
        type: "code";
        language: "json";
        example: string;
        clean: (value: unknown) => any;
        required: false;
      };
      workspaceId: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
      };
      actionName: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
      };
      nonCompanyParticipants: {
        label: string;
        type: "code";
        language: "json";
        example: string;
        clean: (value: unknown) => any;
        required: false;
      };
      moreInfoUrl: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        example: string;
        placeholder: string;
      };
      mobileAppId: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
      };
      agentPlatform: {
        label: string;
        type: "string";
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        model: {
          label: string;
          value: string;
        }[];
        required: false;
        example: string;
      };
      userAgent: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    customViewedEvent: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      reportingSystem: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
      };
      eventTimestamp: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
      };
      eventId: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
      };
      contentId: {
        required: true;
        comments: string;
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        example: string;
        placeholder: string;
      };
      contentUrl: {
        required: true;
        comments: string;
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        example: string;
        placeholder: string;
      };
      contentTitle: {
        required: true;
        comments: string;
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        example: string;
        placeholder: string;
      };
      viewActionTitle: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
      };
      shareId: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        example: string;
        placeholder: string;
      };
      viewInfoUrl: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
      };
      viewer: {
        label: string;
        type: "code";
        language: "json";
        example: string;
        clean: (value: unknown) => any;
        required: false;
      };
      crmContext: {
        label: string;
        type: "code";
        language: "json";
        example: string;
        clean: (value: unknown) => any;
        required: false;
      };
      contentProperties: {
        label: string;
        type: "code";
        language: "json";
        example: string;
        clean: (value: unknown) => any;
        required: false;
      };
      eventProperties: {
        label: string;
        type: "code";
        language: "json";
        example: string;
        clean: (value: unknown) => any;
        required: false;
      };
      userAgent: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
      };
      mobileAppId: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
      };
      agentPlatform: {
        label: string;
        type: "string";
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        model: {
          label: string;
          value: string;
        }[];
        required: false;
        example: string;
      };
      workspaceId: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
      };
      nonCompanyParticipants: {
        label: string;
        type: "code";
        language: "json";
        example: string;
        clean: (value: unknown) => any;
        required: false;
      };
      moreInfoUrl: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        example: string;
        placeholder: string;
      };
      actionName: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
      };
      sharer: {
        label: string;
        type: "code";
        language: "json";
        example: string;
        clean: (value: unknown) => any;
        required: false;
      };
      sharingMessageSubject: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
      };
      sharingMessageBody: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getLogsDataByTypeAndTimeRange: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      cursor: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
      };
      logType: {
        label: string;
        type: "string";
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        model: {
          label: string;
          value: string;
        }[];
        required: true;
      };
      fromDateTime: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
      };
      toDateTime: {
        comments: string;
        required: false;
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        example: string;
        placeholder: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listReferencesToAPhoneNumber: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      phoneNumber: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listReferencesToAnEmailAddress: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      emailAddress: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deleteEmailAddressAndAssociatedElements: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      emailAddress: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deletePhoneNumberAndAssociatedElements: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      phoneNumber: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createNewGongMeeting: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      startTime: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
      };
      endTime: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
      };
      organizerEmail: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
      };
      invitees: {
        label: string;
        type: "code";
        language: "json";
        comments: string;
        example: string;
        clean: (value: unknown) => any;
        required: true;
      };
      externalId: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
      };
      title: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    updateGongMeeting: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      meetingId: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
      };
      startTime: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
      };
      endTime: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
      };
      organizerEmail: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
      };
      invitees: {
        label: string;
        type: "code";
        language: "json";
        comments: string;
        example: string;
        clean: (value: unknown) => any;
        required: true;
      };
      externalId: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
      };
      title: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deleteMeeting: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      meetingId: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listLibraryFolders: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      workspaceId: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listCallsInFolder: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      workspaceId: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
      };
      folderId: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
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
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
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
      cursor: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
      };
      includeAvatars: {
        label: string;
        type: "boolean";
        required: false;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
        comments: string;
        example: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listCallsUsingGet: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      cursor: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
      };
      fromDateTime: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
      };
      toDateTime: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
      };
      workspaceId: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getCallUsingGet: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      callId: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createNewCall: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      clientUniqueId: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
      };
      primaryUser: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
      };
      parties: {
        label: string;
        type: "code";
        language: "json";
        comments: string;
        example: string;
        clean: (value: unknown) => any;
        required: true;
      };
      direction: {
        label: string;
        type: "string";
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        model: {
          label: string;
          value: string;
        }[];
        required: true;
        example: string;
      };
      actualStart: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
      };
      scheduledStart: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
      };
      scheduledEnd: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
      };
      title: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
      };
      purpose: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
      };
      duration: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown) => number | undefined;
        comments: string;
        example: string;
        placeholder: string;
      };
      disposition: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
      };
      contextParam: {
        label: string;
        type: "code";
        language: "json";
        comments: string;
        example: string;
        clean: (value: unknown) => any;
        required: false;
      };
      customData: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
      };
      speakersTimeline: {
        label: string;
        type: "code";
        language: "json";
        comments: string;
        example: string;
        clean: (value: unknown) => any;
        required: false;
      };
      meetingUrl: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
      };
      callProviderCode: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
      };
      downloadMediaUrl: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
      };
      workspaceId: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
      };
      languageCode: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    addMedia: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      callId: {
        comments: string;
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        example: string;
        placeholder: string;
        dataSource: string;
      };
      fileInput: {
        comments: string;
        label: string;
        type: "data";
        required: true;
        clean: (value: unknown) => import("@prismatic-io/spectral").DataPayload;
        example: string;
      };
      fileName: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        example: string;
        placeholder: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getCallTranscript: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      cursor: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
      };
      fromDateTime: {
        required: false;
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
      };
      toDateTime: {
        required: false;
        label: string;
        type: "string";
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
      };
      workspaceId: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
      };
      callIds: {
        label: string;
        type: "string";
        collection: "valuelist";
        required: false;
        comments: string;
        default: string[];
        clean: (value: unknown) => string[];
        example: string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
  };
  connections: (import("@prismatic-io/spectral").KeyedConnection<{
    oauth2Type: import("@prismatic-io/spectral").OAuth2Type.AuthorizationCode;
    key: "oauth2";
    display: {
      label: string;
      description: string;
    };
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
        default: string;
        comments: string;
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
        comments: string;
      };
      clientSecret: {
        label: string;
        placeholder: string;
        type: "password";
        required: true;
        shown: true;
        comments: string;
      };
    };
  }, "oauth2"> | import("@prismatic-io/spectral").KeyedConnection<{
    key: "gongApiKey";
    display: {
      label: string;
      description: string;
    };
    inputs: {
      baseUrl: {
        label: string;
        required: true;
        shown: true;
        type: "string";
        example: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      accessKey: {
        label: string;
        required: true;
        type: "string";
        comments: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      accessKeySecret: {
        label: string;
        required: true;
        shown: true;
        type: "password";
        comments: string;
      };
    };
  }, "gongApiKey">)[];
  triggers: {
    webhook: import("@prismatic-io/spectral").TriggerDefinition<{
      rules: {
        label: string;
        type: "jsonForm";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      payload: import("@prismatic-io/spectral").TriggerPayload<Record<string, unknown>>;
    }, import("@prismatic-io/spectral").Inputs>;
    pollChangesTrigger: import("@prismatic-io/spectral").PollingTriggerDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      resourceType: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        model: {
          label: "Calls" | "Users";
          value: string;
        }[];
        clean: (value: unknown, defaultValue?: string) => string;
      };
      showNewRecords: {
        label: string;
        type: "boolean";
        required: true;
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
      payload: {
        body: {
          data: {
            created: GongRecord[];
            updated: any[];
          };
        };
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
        paginationState?: Record<string, unknown>;
      };
      polledNoChanges: boolean;
    }, import("@prismatic-io/spectral").Inputs>;
  };
  dataSources: {
    folders: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      workspaceId: {
        required: true;
        dataSource: any;
        label: string;
        type: "string";
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    workspaces: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    users: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    calls: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      workspaceId: {
        dataSource: any;
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown) => string | undefined;
        comments: string;
        example: string;
        placeholder: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
  };
}>;
export = _default;