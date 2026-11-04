//#region node_modules/axios/index.d.ts
type UppercaseMethod = 'GET' | 'DELETE' | 'HEAD' | 'OPTIONS' | 'POST' | 'PUT' | 'PATCH' | 'PURGE' | 'LINK' | 'UNLINK' | 'QUERY';
type Method = (UppercaseMethod | Lowercase<UppercaseMethod>) & {};
type ResponseType = 'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream' | 'formdata';
//#endregion
//#region src/types/index.d.ts
interface Webinar {
  webinarKey: string;
  webinarID: string;
  organizerKey: string;
  accountKey: string;
  subject: string;
  description: string;
  timeZone: string;
  approvalType: string;
  registrationUrl: string;
  impromptu: boolean;
  isPasswordProtected: boolean;
  recurrenceType: string;
  experienceType: string;
}
interface GoToWebinarResponse<T> {
  _embedded: Record<string, T[]>;
  page: {
    size: number;
    totalElements: number;
    totalPages: number;
    number: number;
  };
}
//#endregion
//#region npm-dist/.entry.d.ts
declare const _default: import("@prismatic-io/spectral").CallableComponent<{
  key: "gotowebinar";
  public: true;
  display: {
    label: string;
    category: "Application Connectors";
    description: string;
    iconPath: string;
  };
  hooks: {
    error: (error: unknown) => unknown;
  };
  documentationUrl: "https://prismatic.io/docs/components/gotowebinar/";
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
      data: {
        data: any;
      };
    }>;
    deleteInstancedWebhooksAction: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        message: string;
      };
    }>;
    getUserSubscription: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      userSubscriptionKey: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deleteUserSubscription: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      userSubscriptionKeys: {
        label: string;
        comments: string;
        type: "code";
        language: "json";
        required: true;
        example: string;
        clean: (value: unknown) => string[];
      };
      deleteWebhook: {
        label: string;
        comments: string;
        type: "boolean";
        required: true;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        message: string;
      };
    }>;
    createUserSubscription: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      webhookUrl: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      eventName: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        model: {
          value: string;
          label: string;
        }[];
        clean: (value: unknown, defaultValue?: string) => string;
      };
      eventVersion: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        default: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listUserSubscriptions: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    updateUserSubscription: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      webhookKey: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      userSubscriptionKey: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      userSubscriptionState: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
        model: {
          value: string;
          label: string;
        }[];
      };
      callbackUrl: {
        required: boolean;
        clean: (value: unknown) => string | undefined;
        label: string;
        comments: string;
        type: "string";
        example: string;
        placeholder: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        message: string;
      };
    }>;
    listSessionAttendees: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      webinarKey: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      sessionKey: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listAttendees: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      webinarKey: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      fetchAll: {
        label: string;
        comments: string;
        type: "boolean";
        required: false;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getAttendee: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      webinarKey: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      sessionKey: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      registrantKey: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getRegistrant: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      webinarKey: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      registrantKey: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createRegistrant: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      firstName: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      lastName: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      webinarKey: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
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
      phone: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      source: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      mailingAddress: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          address: {
            label: string;
            comments: string;
            type: "string";
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
          city: {
            label: string;
            comments: string;
            type: "string";
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
          state: {
            label: string;
            comments: string;
            type: "string";
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
          zipCode: {
            label: string;
            comments: string;
            type: "string";
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
          country: {
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
          organization: {
            label: string;
            comments: string;
            type: "string";
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
          jobTitle: {
            label: string;
            comments: string;
            type: "string";
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
          industry: {
            label: string;
            comments: string;
            type: "string";
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
          numberOfEmployees: {
            label: string;
            comments: string;
            type: "string";
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown) => number | undefined;
          };
          purchasingTimeFrame: {
            label: string;
            comments: string;
            type: "string";
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
          purchasingRole: {
            label: string;
            comments: string;
            type: "string";
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
          questionAndComments: {
            label: string;
            comments: string;
            type: "string";
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
          responses: {
            label: string;
            comments: string;
            type: "code";
            language: "json";
            required: false;
            example: string;
            clean: (value: unknown) => object | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        registrantKey: string;
        joinUrl: string;
      };
    }>;
    deleteRegistrant: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      webinarKey: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      registrantKey: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        message: string;
      };
    }>;
    listRegistrants: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      webinarKey: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          page: {
            label: string;
            comments: string;
            type: "string";
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown) => number | undefined;
          };
          limit: {
            label: string;
            comments: string;
            type: "string";
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown) => number | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        lastName: string;
        email: string;
        firstName: string;
        registrantKey: string;
        registrationDate: string;
        status: string;
        joinUrl: string;
        timeZone: string;
      }[];
    }>;
    getWebinars: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      fromTime: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      toTime: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      accountKey: {
        clean: (value: unknown) => string | undefined;
        required: boolean;
        comments: string;
        label: string;
        type: "string";
        example: string;
        placeholder: string;
      };
      fetchAll: {
        label: string;
        comments: string;
        type: "boolean";
        required: false;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          page: {
            label: string;
            comments: string;
            type: "string";
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown) => number | undefined;
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
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: Webinar[];
    } | {
      data: GoToWebinarResponse<Webinar>;
    }>;
    cancelWebinar: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      webinarKey: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      sendCancellationEmail: {
        label: string;
        comments: string;
        type: "string";
        model: {
          value: string;
          label: string;
        }[];
        required: false;
        clean: (value: unknown) => boolean | undefined;
      };
      deleteAll: {
        label: string;
        comments: string;
        type: "string";
        model: {
          value: string;
          label: string;
        }[];
        required: false;
        default: string;
        clean: (value: unknown) => boolean | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        message: string;
      };
    }>;
    createWebinar: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
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
      webinarType: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        model: {
          value: string;
          label: string;
        }[];
        clean: (value: unknown, defaultValue?: string) => string;
      };
      times: {
        label: string;
        comments: string;
        type: "code";
        language: "json";
        required: true;
        example: string;
        clean: (value: unknown) => object;
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
      experienceType: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        default: string;
        model: {
          value: string;
          label: string;
        }[];
        clean: (value: unknown) => string | undefined;
      };
      timeZone: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      emailSettings: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          confirmationEmail: {
            label: string;
            comments: string;
            type: "string";
            required: false;
            model: {
              value: string;
              label: string;
            }[];
            clean: (value: unknown) => {
              enabled: boolean;
            } | undefined;
          };
          reminderEmail: {
            label: string;
            comments: string;
            type: "string";
            required: false;
            model: {
              value: string;
              label: string;
            }[];
            clean: (value: unknown) => {
              enabled: boolean;
            } | undefined;
          };
          absenteeFollowUpEmail: {
            label: string;
            comments: string;
            type: "string";
            required: false;
            model: {
              value: string;
              label: string;
            }[];
            clean: (value: unknown) => {
              enabled: boolean;
            } | undefined;
          };
          attendeeFollowUpEmail: {
            label: string;
            comments: string;
            type: "string";
            required: false;
            model: {
              value: string;
              label: string;
            }[];
            clean: (value: unknown) => {
              enabled: boolean;
            } | undefined;
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
          recordingAssetKey: {
            label: string;
            comments: string;
            type: "string";
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
          isOndemand: {
            label: string;
            comments: string;
            type: "string";
            required: false;
            model: {
              value: string;
              label: string;
            }[];
            default: string;
            clean: (value: unknown) => boolean | undefined;
          };
          isBreakout: {
            label: string;
            comments: string;
            type: "string";
            required: false;
            model: {
              value: string;
              label: string;
            }[];
            default: string;
            clean: (value: unknown) => boolean | undefined;
          };
          isPasswordProtected: {
            label: string;
            comments: string;
            type: "string";
            required: false;
            model: {
              value: string;
              label: string;
            }[];
            default: string;
            clean: (value: unknown) => boolean | undefined;
          };
          locale: {
            label: string;
            comments: string;
            type: "string";
            required: false;
            model: {
              value: string;
              label: string;
            }[];
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    updateWebinar: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      webinarKey: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      notifyParticipants: {
        label: string;
        comments: string;
        type: "boolean";
        required: true;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      subject: {
        required: boolean;
        clean: (value: unknown) => string | undefined;
        label: string;
        comments: string;
        type: "string";
        example: string;
        placeholder: string;
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
      times: {
        required: boolean;
        comments: string;
        clean: (value: unknown) => object | undefined;
        example: string;
        label: string;
        type: "code";
        language: "json";
      };
      timeZone: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      locale: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        model: {
          value: string;
          label: string;
        }[];
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      emailSettings: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          confirmationEmail: {
            label: string;
            comments: string;
            type: "string";
            required: false;
            model: {
              value: string;
              label: string;
            }[];
            clean: (value: unknown) => {
              enabled: boolean;
            } | undefined;
          };
          reminderEmail: {
            label: string;
            comments: string;
            type: "string";
            required: false;
            model: {
              value: string;
              label: string;
            }[];
            clean: (value: unknown) => {
              enabled: boolean;
            } | undefined;
          };
          absenteeFollowUpEmail: {
            label: string;
            comments: string;
            type: "string";
            required: false;
            model: {
              value: string;
              label: string;
            }[];
            clean: (value: unknown) => {
              enabled: boolean;
            } | undefined;
          };
          attendeeFollowUpEmail: {
            label: string;
            comments: string;
            type: "string";
            required: false;
            model: {
              value: string;
              label: string;
            }[];
            clean: (value: unknown) => {
              enabled: boolean;
            } | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        message: string;
      };
    }>;
  };
  dataSources: {
    selectWebinar: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      accountKey: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      fromTime: {
        required: false;
        default: string;
        label: string;
        comments: string;
        type: "string";
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      toTime: {
        required: false;
        default: string;
        label: string;
        comments: string;
        type: "string";
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectOrganizer: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      accountKey: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      fromTime: {
        required: false;
        default: string;
        label: string;
        comments: string;
        type: "string";
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      toTime: {
        required: false;
        default: string;
        label: string;
        comments: string;
        type: "string";
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectRegistrant: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      webinarKey: {
        dataSource: undefined;
        label: string;
        comments: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectWebhook: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
  };
  connections: import("@prismatic-io/spectral").KeyedConnection<{
    key: "gotoWebinarOAuth2Connection";
    oauth2Type: import("@prismatic-io/spectral").OAuth2Type.AuthorizationCode;
    display: {
      label: string;
      description: string;
    };
    inputs: {
      authorizeUrl: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        shown: false;
        default: string;
      };
      tokenUrl: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        shown: false;
        default: string;
      };
      scopes: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        shown: true;
        default: string;
      };
      clientId: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        shown: true;
      };
      clientSecret: {
        label: string;
        comments: string;
        type: "password";
        required: true;
        shown: true;
      };
      organizerKey: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        shown: true;
      };
    };
  }, "gotoWebinarOAuth2Connection">[];
  triggers: {
    userSubscriptionTrigger: import("@prismatic-io/spectral").TriggerDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      eventName: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        model: {
          value: string;
          label: string;
        }[];
        clean: (value: unknown, defaultValue?: string) => string;
      };
      eventVersion: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        default: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, false, {
      payload: import("@prismatic-io/spectral").TriggerPayload;
    }, import("@prismatic-io/spectral").Inputs>;
    pollChangesTrigger: import("@prismatic-io/spectral").PollingTriggerDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
      };
      webinarKey: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
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
      payload: import("@prismatic-io/spectral").TriggerPayload;
    }, import("@prismatic-io/spectral").Inputs>;
  };
}>;
export = _default;