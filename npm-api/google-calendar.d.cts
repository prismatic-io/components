import { calendar_v3 } from "@googleapis/calendar";
//#region node_modules/gaxios/build/src/common.d.ts
interface Headers {
  [index: string]: any;
}
interface GaxiosXMLHttpRequest {
  responseURL: string;
}
//#endregion
//#region node_modules/axios/index.d.ts
type UppercaseMethod = 'GET' | 'DELETE' | 'HEAD' | 'OPTIONS' | 'POST' | 'PUT' | 'PATCH' | 'PURGE' | 'LINK' | 'UNLINK' | 'QUERY';
type Method = (UppercaseMethod | Lowercase<UppercaseMethod>) & {};
type ResponseType = 'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream' | 'formdata';
//#endregion
//#region src/types.d.ts
type ProcessedEvent = {
  changeType: "created" | "updated" | "deleted" | "unknown";
  id?: string;
  summary: string;
  status?: string;
  start?: calendar_v3.Schema$EventDateTime;
  end?: calendar_v3.Schema$EventDateTime;
  created?: string;
  updated?: string;
  organizer?: string;
  attendees?: Array<{
    email?: string;
    responseStatus?: string;
    optional?: boolean;
  }>;
  location?: string;
  description?: string;
  recurringEventId?: string;
  htmlLink?: string;
};
type EventChangeSummary = {
  totalChanges: number;
  created: number;
  updated: number;
  deleted: number;
  syncTokenAvailable: boolean;
  syncTokenUpdated?: boolean;
};
type CategorizedEventChanges = {
  summary: EventChangeSummary;
  createdEvents: ProcessedEvent[];
  updatedEvents: ProcessedEvent[];
  deletedEvents: ProcessedEvent[];
  allChanges: ProcessedEvent[];
};
interface PollEventsPage extends Record<string, unknown> {
  pageToken: string;
  drainStartedAt: string;
  syncToken?: string;
}
//#endregion
//#region npm-dist/.entry.d.ts
declare const _default: import("@prismatic-io/spectral").CallableComponent<{
  key: "google-calendar";
  public: true;
  documentationUrl: "https://prismatic.io/docs/components/google-calendar/";
  display: {
    label: string;
    description: string;
    iconPath: string;
    category: "Application Connectors";
  };
  actions: {
    listCalendar: import("@prismatic-io/spectral").ActionDefinition<{
      pageToken: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown) => string;
      };
      maxResults: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown) => number;
      };
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
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        data: import("@googleapis/calendar").calendar_v3.Schema$CalendarList;
        status: number;
        statusText: string;
        headers: Headers;
        request: GaxiosXMLHttpRequest;
        config: void;
      };
    }>;
    createCalendar: import("@prismatic-io/spectral").ActionDefinition<{
      summary: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        comments: string;
      };
      description: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        comments: string;
      };
      timeZone: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        comments: string;
      };
      googleConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        data: import("@googleapis/calendar").calendar_v3.Schema$Calendar;
        status: number;
        statusText: string;
        headers: Headers;
        request: GaxiosXMLHttpRequest;
        config: void;
      };
    }>;
    getCalendar: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      calendarId: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        data: import("@googleapis/calendar").calendar_v3.Schema$Calendar;
        status: number;
        statusText: string;
        headers: Headers;
        request: GaxiosXMLHttpRequest;
        config: void;
      };
    }>;
    deleteCalendar: import("@prismatic-io/spectral").ActionDefinition<{
      calendarId: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        data: void;
        status: number;
        statusText: string;
        headers: Headers;
        request: GaxiosXMLHttpRequest;
        config: void;
      };
    }>;
    listEvents: import("@prismatic-io/spectral").ActionDefinition<{
      googleConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      calendarId: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      maxResults: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown) => number;
      };
      pageToken: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown) => string;
      };
      syncToken: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        comments: string;
        example: string;
        clean: (value: unknown) => string;
      };
      maxAttendees: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown) => number;
      };
      orderBy: {
        label: string;
        type: "string";
        model: {
          label: string;
          value: string;
        }[];
        required: false;
        placeholder: string;
        comments: string;
        clean: (value: unknown) => string;
      };
      q: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown) => string;
      };
      showDeleted: {
        label: string;
        type: "boolean";
        default: string;
        required: false;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      showHiddenInvitations: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      singleEvents: {
        label: string;
        type: "boolean";
        default: string;
        required: false;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      timeMin: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown) => string;
      };
      timeMax: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown) => string;
      };
      updatedMin: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown) => string;
      };
      timeZone: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        data: import("@googleapis/calendar").calendar_v3.Schema$Events;
        status: number;
        statusText: string;
        headers: Headers;
        request: GaxiosXMLHttpRequest;
        config: void;
      };
    }>;
    createEvent: import("@prismatic-io/spectral").ActionDefinition<{
      calendarId: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      summary: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        comments: string;
      };
      description: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        comments: string;
      };
      timeZone: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        comments: string;
      };
      startTime: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        comments: string;
      };
      endTime: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        comments: string;
      };
      eventLocation: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        comments: string;
      };
      attendees: {
        label: string;
        type: "code";
        default: string;
        language: "json";
        required: false;
        comments: string;
        clean: (value: unknown) => import("@googleapis/calendar").calendar_v3.Schema$EventAttendee[];
      };
      remindMethod: {
        label: string;
        type: "string";
        model: {
          label: string;
          value: string;
        }[];
        required: false;
        placeholder: string;
        comments: string;
      };
      useDefaultReminder: {
        label: string;
        type: "boolean";
        required: true;
        comments: string;
      };
      remindMinutes: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        comments: string;
      };
      addConferenceEvent: {
        label: string;
        type: "boolean";
        default: string;
        required: false;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      sendUpdates: {
        label: string;
        type: "string";
        model: {
          label: string;
          value: string;
        }[];
        required: false;
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        data: import("@googleapis/calendar").calendar_v3.Schema$Event;
        status: number;
        statusText: string;
        headers: Headers;
        request: GaxiosXMLHttpRequest;
        config: void;
      };
    }>;
    getEvent: import("@prismatic-io/spectral").ActionDefinition<{
      calendarId: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      eventId: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        dataSource: string;
        example: string;
        comments: string;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        data: import("@googleapis/calendar").calendar_v3.Schema$Event;
        status: number;
        statusText: string;
        headers: Headers;
        request: GaxiosXMLHttpRequest;
        config: void;
      };
    }>;
    updateEvent: import("@prismatic-io/spectral").ActionDefinition<{
      calendarId: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      eventId: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        dataSource: string;
        example: string;
        comments: string;
      };
      summary: {
        required: false;
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        comments: string;
      };
      description: {
        required: false;
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        comments: string;
      };
      timeZone: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        comments: string;
      };
      startTime: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        comments: string;
      };
      endTime: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        comments: string;
      };
      eventLocation: {
        required: false;
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        comments: string;
      };
      attendees: {
        label: string;
        type: "code";
        default: string;
        language: "json";
        required: false;
        comments: string;
        clean: (value: unknown) => import("@googleapis/calendar").calendar_v3.Schema$EventAttendee[];
      };
      useDefaultReminder: {
        label: string;
        type: "boolean";
        required: true;
        comments: string;
      };
      remindMethod: {
        label: string;
        type: "string";
        model: {
          label: string;
          value: string;
        }[];
        required: false;
        placeholder: string;
        comments: string;
      };
      remindMinutes: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        comments: string;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      sendUpdates: {
        comments: string;
        label: string;
        type: "string";
        model: {
          label: string;
          value: string;
        }[];
        required: false;
        default: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        data: import("@googleapis/calendar").calendar_v3.Schema$Event;
        status: number;
        statusText: string;
        headers: Headers;
        request: GaxiosXMLHttpRequest;
        config: void;
      };
    }>;
    deleteEvent: import("@prismatic-io/spectral").ActionDefinition<{
      calendarId: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      eventId: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        dataSource: string;
        example: string;
        comments: string;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      sendUpdates: {
        comments: string;
        label: string;
        type: "string";
        model: {
          label: string;
          value: string;
        }[];
        required: false;
        default: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        data: void;
        status: number;
        statusText: string;
        headers: Headers;
        request: GaxiosXMLHttpRequest;
        config: void;
      };
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
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
  };
  hooks: {
    error: (error: unknown) => unknown;
  };
  connections: import("@prismatic-io/spectral").KeyedConnection<{
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
        example: string;
        comments: string;
        shown: true;
      };
      clientSecret: {
        label: string;
        placeholder: string;
        type: "password";
        example: string;
        comments: string;
        required: true;
        shown: true;
      };
    };
  }, "oauth2">[];
  dataSources: {
    selectCalendar: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectEvent: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      calendarId: {
        comments: string;
        dataSource: any;
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
  };
  triggers: {
    calendarChangeEvents: import("@prismatic-io/spectral").TriggerDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      calendarId: {
        comments: string;
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, true, {
      payload: import("@prismatic-io/spectral").TriggerPayload<Record<string, unknown>>;
      branch: string;
      response: {
        statusCode: number;
        contentType: string;
      };
    }, import("@prismatic-io/spectral").Inputs>;
    pollEventsTrigger: import("@prismatic-io/spectral").PollingTriggerDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      calendarId: {
        comments: string;
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
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
      payload: {
        paginationState: PollEventsPage;
        body: {
          data: {
            changes: CategorizedEventChanges;
            calendarId: string;
            syncToken: string;
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
      };
      polledNoChanges: boolean;
    }, import("@prismatic-io/spectral").Inputs>;
  };
}>;
export = _default;