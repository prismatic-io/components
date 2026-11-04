//#region node_modules/axios/index.d.ts
type UppercaseMethod = 'GET' | 'DELETE' | 'HEAD' | 'OPTIONS' | 'POST' | 'PUT' | 'PATCH' | 'PURGE' | 'LINK' | 'UNLINK' | 'QUERY';
type Method = (UppercaseMethod | Lowercase<UppercaseMethod>) & {};
type ResponseType = 'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream' | 'formdata';
//#endregion
//#region src/constants.d.ts
declare enum TriggerBranches {
  Notification = "Notification",
  URLValidation = "URL Validation"
}
//#endregion
//#region npm-dist/.entry.d.ts
declare const _default: import("@prismatic-io/spectral").CallableComponent<{
  key: "ms-intune";
  public: true;
  documentationUrl: "https://prismatic.io/docs/components/ms-intune/";
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
    createUser: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      accountEnabled: {
        label: string;
        type: "boolean";
        required: true;
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      displayName: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      forceChangePasswordNextSignIn: {
        label: string;
        type: "boolean";
        required: true;
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      password: {
        label: string;
        type: "password";
        required: true;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      userPrincipalName: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      domain: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      additionalProperties: {
        label: string;
        type: "code";
        language: "json";
        required: false;
        comments: string;
        clean: (value: unknown) => object | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deleteUser: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      userId: {
        label: string;
        comments: string;
        example: string;
        placeholder: string;
        type: "string";
        required: true;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getUser: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      userId: {
        label: string;
        comments: string;
        example: string;
        placeholder: string;
        type: "string";
        required: true;
        clean: (value: unknown) => string | undefined;
        dataSource: string;
      };
      $select: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listUsers: import("@prismatic-io/spectral").ActionDefinition<{
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
        required: false;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          $top: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          $skip: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          $skipToken: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
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
          $filter: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            placeholder: string;
            example: string;
            default: string;
            clean: (value: unknown) => string | undefined;
          };
          $select: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          $expand: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          $orderBy: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          $count: {
            label: string;
            type: "boolean";
            comments: string;
            required: false;
            default: string;
            clean: (value: unknown, defaultValue?: boolean) => boolean;
          };
          $search: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          $format: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    reprocessUserLicenseAssignment: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      userId: {
        label: string;
        comments: string;
        example: string;
        placeholder: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    updateUser: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      userId: {
        label: string;
        comments: string;
        example: string;
        placeholder: string;
        type: "string";
        required: true;
        clean: (value: unknown) => string | undefined;
      };
      accountEnabled: {
        label: string;
        type: "boolean";
        required: true;
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      displayName: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
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
      domain: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      name: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          givenName: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          surname: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      jobTitle: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      additionalProperties: {
        label: string;
        type: "code";
        language: "json";
        required: false;
        comments: string;
        clean: (value: unknown) => object | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createSubscription: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      changeType: {
        label: string;
        type: "string";
        collection: "valuelist";
        required: true;
        comments: string;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown) => string[];
      };
      notificationUrl: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      resource: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      expirationDateTime: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      lifecycleNotificationUrl: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      bodyFields: {
        example: string;
        label: string;
        type: "code";
        language: "json";
        comments: string;
        required: false;
        clean: (value: unknown) => object;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any[];
    }>;
    updateSubscription: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      subscriptionId: {
        comments: string;
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      notificationUrl: {
        required: boolean;
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      expirationDateTime: {
        required: boolean;
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deleteSubscription: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      subscriptionId: {
        comments: string;
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: string;
    }>;
    getSubscription: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      subscriptionId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listSubscriptions: import("@prismatic-io/spectral").ActionDefinition<{
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
        required: false;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      $skipToken: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deleteAllSubscription: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      notificationUrl: {
        comments: string;
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: string[];
    }>;
    listSoftwareUpdateStatusSummary: import("@prismatic-io/spectral").ActionDefinition<{
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
        required: false;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      $skipToken: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      filters: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          $select: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          $expand: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          $search: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          $format: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    updateSoftwareUpdateStatusSummary: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      displayName: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      deviceCounts: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          compliantDeviceCount: {
            label: string;
            comments: string;
            type: "string";
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: number) => number;
          };
          nonCompliantDeviceCount: {
            label: string;
            comments: string;
            type: "string";
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: number) => number;
          };
          remediatedDeviceCount: {
            label: string;
            comments: string;
            type: "string";
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: number) => number;
          };
          errorDeviceCount: {
            label: string;
            comments: string;
            type: "string";
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: number) => number;
          };
          unknownDeviceCount: {
            label: string;
            comments: string;
            type: "string";
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: number) => number;
          };
          conflictDeviceCount: {
            label: string;
            comments: string;
            type: "string";
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: number) => number;
          };
          notApplicableDeviceCount: {
            label: string;
            comments: string;
            type: "string";
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: number) => number;
          };
        };
      } & {
        type: "structuredObject";
      };
      userCounts: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          compliantUserCount: {
            label: string;
            comments: string;
            type: "string";
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: number) => number;
          };
          nonCompliantUserCount: {
            label: string;
            comments: string;
            type: "string";
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: number) => number;
          };
          remediatedUserCount: {
            label: string;
            comments: string;
            type: "string";
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: number) => number;
          };
          errorUserCount: {
            label: string;
            comments: string;
            type: "string";
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: number) => number;
          };
          unknownUserCount: {
            label: string;
            comments: string;
            type: "string";
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: number) => number;
          };
          conflictUserCount: {
            label: string;
            comments: string;
            type: "string";
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: number) => number;
          };
          notApplicableUserCount: {
            label: string;
            comments: string;
            type: "string";
            required: false;
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: number) => number;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getMobileApp: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      mobileAppId: {
        label: string;
        comments: string;
        example: string;
        placeholder: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listMobileApps: import("@prismatic-io/spectral").ActionDefinition<{
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
        required: false;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          $top: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          $skip: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          $skipToken: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
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
          $filter: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            placeholder: string;
            example: string;
            default: string;
            clean: (value: unknown) => string | undefined;
          };
          $select: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          $expand: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          $orderBy: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          $count: {
            label: string;
            type: "boolean";
            comments: string;
            required: false;
            default: string;
            clean: (value: unknown, defaultValue?: boolean) => boolean;
          };
          $search: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          $format: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    assignMobileApp: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      mobileAppId: {
        comments: string;
        label: string;
        example: string;
        placeholder: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      groupId: {
        label: string;
        comments: string;
        example: string;
        placeholder: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      intent: {
        label: string;
        comments: string;
        example: string;
        model: {
          label: string;
          value: string;
        }[];
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      target: {
        label: string;
        type: "string";
        comments: string;
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      settings: {
        label: string;
        type: "string";
        comments: string;
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listMobileAppAssignments: import("@prismatic-io/spectral").ActionDefinition<{
      $filter: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
        default: string;
        clean: (value: unknown) => string | undefined;
      };
      $select: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      $expand: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      $orderBy: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      $top: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      $skip: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      $count: {
        label: string;
        type: "boolean";
        comments: string;
        required: false;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      $search: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      $format: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      $skipToken: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      mobileAppId: {
        label: string;
        comments: string;
        example: string;
        placeholder: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        comments: string;
        required: false;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getMobileAppAssignment: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      mobileAppId: {
        label: string;
        comments: string;
        example: string;
        placeholder: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      mobileAppAssignmentId: {
        label: string;
        comments: string;
        example: string;
        placeholder: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createMobileAppAssignment: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      mobileAppId: {
        comments: string;
        label: string;
        example: string;
        placeholder: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      intent: {
        label: string;
        comments: string;
        example: string;
        model: {
          label: string;
          value: string;
        }[];
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      target: {
        label: string;
        type: "string";
        comments: string;
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      settings: {
        label: string;
        type: "string";
        comments: string;
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    updateMobileAppAssignment: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      mobileAppId: {
        comments: string;
        label: string;
        example: string;
        placeholder: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      mobileAppAssignmentId: {
        comments: string;
        label: string;
        example: string;
        placeholder: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      intent: {
        label: string;
        comments: string;
        example: string;
        model: {
          label: string;
          value: string;
        }[];
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      target: {
        label: string;
        type: "string";
        comments: string;
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      settings: {
        label: string;
        type: "string";
        comments: string;
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deleteMobileAppAssignment: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      mobileAppId: {
        comments: string;
        label: string;
        example: string;
        placeholder: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      mobileAppAssignmentId: {
        comments: string;
        label: string;
        example: string;
        placeholder: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: string;
    }>;
    rawRequest: import("@prismatic-io/spectral").ActionDefinition<{
      url: {
        comments: string;
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        example: string;
        clean: (value: unknown) => string;
      };
      debugRequest: {
        comments: string;
        label: string;
        type: "boolean";
        required: false;
        clean: (value: unknown) => boolean;
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
      apiVersion: {
        label: string;
        type: "string";
        model: import("@prismatic-io/spectral").InputFieldChoice[];
        required: true;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    addMembersToGroup: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      groupId: {
        comments: string;
        dataSource: string;
        label: string;
        example: string;
        placeholder: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      memberIdsString: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      memberIds: {
        label: string;
        comments: string;
        type: "code";
        language: "json";
        required: false;
        example: string;
        clean: (value: unknown) => string[] | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        message: string;
      };
    }>;
    addMemberToGroup: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      groupId: {
        comments: string;
        dataSource: string;
        label: string;
        example: string;
        placeholder: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      memberId: {
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
    listMembersFromGroup: import("@prismatic-io/spectral").ActionDefinition<{
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
        required: false;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      groupId: {
        comments: string;
        dataSource: string;
        label: string;
        example: string;
        placeholder: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      $top: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      filters: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          $filter: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            placeholder: string;
            example: string;
            default: string;
            clean: (value: unknown) => string | undefined;
          };
          $count: {
            label: string;
            type: "boolean";
            comments: string;
            required: false;
            default: string;
            clean: (value: unknown, defaultValue?: boolean) => boolean;
          };
          $select: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          $search: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          $expand: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deleteMemberFromGroup: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      groupId: {
        label: string;
        comments: string;
        example: string;
        placeholder: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      memberId: {
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
      data: string;
    }>;
    listManagedApps: import("@prismatic-io/spectral").ActionDefinition<{
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
        required: false;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          $top: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          $skip: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          $skipToken: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
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
          $filter: {
            default: string;
            label: string;
            type: "string";
            comments: string;
            required: false;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          $select: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          $expand: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          $orderBy: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          $count: {
            label: string;
            type: "boolean";
            comments: string;
            required: false;
            default: string;
            clean: (value: unknown, defaultValue?: boolean) => boolean;
          };
          $search: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          $format: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getManagedApp: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      appId: {
        label: string;
        comments: string;
        example: string;
        placeholder: string;
        type: "string";
        required: true;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createManagedApp: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      odataTypeApp: {
        label: string;
        comments: string;
        type: "string";
        placeholder: string;
        example: string;
        required: true;
        clean: (value: unknown) => string | undefined;
      };
      displayName: {
        label: string;
        comments: string;
        type: "string";
        placeholder: string;
        example: string;
        required: true;
        clean: (value: unknown) => string | undefined;
      };
      description: {
        label: string;
        comments: string;
        type: "string";
        placeholder: string;
        example: string;
        required: true;
        clean: (value: unknown) => string | undefined;
      };
      isFeatured: {
        label: string;
        comments: string;
        type: "boolean";
        required: true;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      specificPlatformProperties: {
        label: string;
        comments: string;
        type: "code";
        language: "json";
        example: string;
        required: true;
        clean: (value: unknown) => object | undefined;
      };
      additionalFields: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          publisher: {
            label: string;
            comments: string;
            type: "string";
            placeholder: string;
            example: string;
            required: false;
            clean: (value: unknown) => string | undefined;
          };
          largeIconType: {
            label: string;
            comments: string;
            type: "string";
            placeholder: string;
            example: string;
            required: false;
            clean: (value: unknown) => string | undefined;
          };
          largeIconValue: {
            label: string;
            comments: string;
            type: "string";
            placeholder: string;
            example: string;
            required: false;
            clean: (value: unknown) => string | undefined;
          };
          privacyInformationUrl: {
            label: string;
            comments: string;
            type: "string";
            placeholder: string;
            example: string;
            required: false;
            clean: (value: unknown) => string | undefined;
          };
          informationUrl: {
            label: string;
            comments: string;
            type: "string";
            placeholder: string;
            example: string;
            required: false;
            clean: (value: unknown) => string | undefined;
          };
          owner: {
            label: string;
            comments: string;
            type: "string";
            placeholder: string;
            example: string;
            required: false;
            clean: (value: unknown) => string | undefined;
          };
          developer: {
            label: string;
            comments: string;
            type: "string";
            placeholder: string;
            example: string;
            required: false;
            clean: (value: unknown) => string | undefined;
          };
          notes: {
            label: string;
            comments: string;
            type: "string";
            placeholder: string;
            example: string;
            required: false;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deleteManagedApp: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      mobileAppId: {
        label: string;
        comments: string;
        placeholder: string;
        example: string;
        type: "string";
        required: true;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    updateManagedApp: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      mobileAppId: {
        label: string;
        comments: string;
        placeholder: string;
        example: string;
        type: "string";
        required: true;
        dataSource: string;
        clean: (value: unknown) => string | undefined;
      };
      odataTypeApp: {
        label: string;
        comments: string;
        type: "string";
        placeholder: string;
        example: string;
        required: true;
        clean: (value: unknown) => string | undefined;
      };
      isFeatured: {
        label: string;
        comments: string;
        type: "boolean";
        required: true;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      displayName: {
        label: string;
        comments: string;
        type: "string";
        placeholder: string;
        example: string;
        required: false;
        clean: (value: unknown) => string | undefined;
      };
      description: {
        label: string;
        comments: string;
        type: "string";
        placeholder: string;
        example: string;
        required: false;
        clean: (value: unknown) => string | undefined;
      };
      additionalFields: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          publisher: {
            label: string;
            comments: string;
            type: "string";
            placeholder: string;
            example: string;
            required: false;
            clean: (value: unknown) => string | undefined;
          };
          largeIconType: {
            label: string;
            comments: string;
            type: "string";
            placeholder: string;
            example: string;
            required: false;
            clean: (value: unknown) => string | undefined;
          };
          largeIconValue: {
            label: string;
            comments: string;
            type: "string";
            placeholder: string;
            example: string;
            required: false;
            clean: (value: unknown) => string | undefined;
          };
          privacyInformationUrl: {
            label: string;
            comments: string;
            type: "string";
            placeholder: string;
            example: string;
            required: false;
            clean: (value: unknown) => string | undefined;
          };
          informationUrl: {
            label: string;
            comments: string;
            type: "string";
            placeholder: string;
            example: string;
            required: false;
            clean: (value: unknown) => string | undefined;
          };
          owner: {
            label: string;
            comments: string;
            type: "string";
            placeholder: string;
            example: string;
            required: false;
            clean: (value: unknown) => string | undefined;
          };
          developer: {
            label: string;
            comments: string;
            type: "string";
            placeholder: string;
            example: string;
            required: false;
            clean: (value: unknown) => string | undefined;
          };
          notes: {
            label: string;
            comments: string;
            type: "string";
            placeholder: string;
            example: string;
            required: false;
            clean: (value: unknown) => string | undefined;
          };
          specificPlatformProperties: {
            label: string;
            comments: string;
            type: "code";
            language: "json";
            example: string;
            required: false;
            clean: (value: unknown) => object | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createGroup: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      displayName: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        clean: (value: unknown) => string | undefined;
      };
      mailNickname: {
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        required: true;
        clean: (value: unknown) => string | undefined;
      };
      securityEnabled: {
        label: string;
        type: "boolean";
        comments: string;
        required: true;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      mailEnabled: {
        label: string;
        type: "boolean";
        comments: string;
        required: true;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      additionalFields: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          description: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
          assignedLabels: {
            label: string;
            type: "code";
            language: "json";
            comments: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          visibility: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      bodyFields: {
        label: string;
        type: "code";
        language: "json";
        comments: string;
        required: false;
        example: string;
        clean: (value: unknown) => object;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    updateGroup: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      groupId: {
        comments: string;
        label: string;
        example: string;
        placeholder: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      displayName: {
        required: boolean;
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      mailNickname: {
        required: boolean;
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      securityEnabled: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        model: {
          label: string;
          value: string;
        }[];
        default: string;
        clean: (value: unknown) => boolean | undefined;
      };
      additionalFields: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          description: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
          assignedLabels: {
            label: string;
            type: "code";
            language: "json";
            comments: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          visibility: {
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      bodyFields: {
        label: string;
        type: "code";
        language: "json";
        comments: string;
        required: false;
        example: string;
        clean: (value: unknown) => object;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: string;
    }>;
    deleteGroup: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      groupId: {
        comments: string;
        label: string;
        example: string;
        placeholder: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: string;
    }>;
    getGroup: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      groupId: {
        comments: string;
        label: string;
        example: string;
        placeholder: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listGroups: import("@prismatic-io/spectral").ActionDefinition<{
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
        required: false;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      $top: {
        label: string;
        type: "string";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      filters: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          $count: {
            label: string;
            type: "boolean";
            comments: string;
            required: false;
            default: string;
            clean: (value: unknown, defaultValue?: boolean) => boolean;
          };
          $expand: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          $filter: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            placeholder: string;
            example: string;
            default: string;
            clean: (value: unknown) => string | undefined;
          };
          $orderBy: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          $search: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          $select: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listDomains: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          $top: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          $skip: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          $skipToken: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
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
          $filter: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            placeholder: string;
            example: string;
            default: string;
            clean: (value: unknown) => string | undefined;
          };
          $select: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          $expand: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          $orderBy: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          $count: {
            label: string;
            type: "boolean";
            comments: string;
            required: false;
            default: string;
            clean: (value: unknown, defaultValue?: boolean) => boolean;
          };
          $search: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          $format: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deleteManagedDevice: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      managedDeviceId: {
        label: string;
        comments: string;
        example: string;
        placeholder: string;
        type: "string";
        required: true;
        clean: (value: unknown) => string | undefined;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getManagedDevice: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      managedDeviceId: {
        label: string;
        comments: string;
        example: string;
        placeholder: string;
        type: "string";
        required: true;
        clean: (value: unknown) => string | undefined;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listManagedDevices: import("@prismatic-io/spectral").ActionDefinition<{
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
        required: false;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          $top: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          $skip: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          $skipToken: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
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
          $filter: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            placeholder: string;
            example: string;
            default: string;
            clean: (value: unknown) => string | undefined;
          };
          $select: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          $expand: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          $orderBy: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          $count: {
            label: string;
            type: "boolean";
            comments: string;
            required: false;
            default: string;
            clean: (value: unknown, defaultValue?: boolean) => boolean;
          };
          $search: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          $format: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    retireDevice: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      managedDeviceId: {
        comments: string;
        label: string;
        example: string;
        placeholder: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    updateManagedDevice: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      managedDeviceId: {
        label: string;
        comments: string;
        example: string;
        placeholder: string;
        type: "string";
        required: true;
        clean: (value: unknown) => string | undefined;
        dataSource: string;
      };
      managedDeviceName: {
        label: string;
        comments: string;
        example: string;
        placeholder: string;
        type: "string";
        required: false;
        clean: (value: unknown) => string | undefined;
      };
      notes: {
        label: string;
        comments: string;
        example: string;
        placeholder: string;
        type: "string";
        required: false;
        clean: (value: unknown) => string | undefined;
      };
      extraFields: {
        label: string;
        comments: string;
        type: "code";
        language: "json";
        required: false;
        clean: (value: unknown) => object | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    wipeDevice: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      managedDeviceId: {
        comments: string;
        label: string;
        example: string;
        placeholder: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listDeviceConfigurations: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getDeviceConfigurations: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      deviceConfigurationId: {
        label: string;
        example: string;
        placeholder: string;
        comments: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getDetectedApp: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      detectedAppId: {
        label: string;
        comments: string;
        example: string;
        placeholder: string;
        type: "string";
        required: true;
        dataSource: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listDetectedApps: import("@prismatic-io/spectral").ActionDefinition<{
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
        required: false;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          $top: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          $skip: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          $skipToken: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
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
          $filter: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            placeholder: string;
            example: string;
            default: string;
            clean: (value: unknown) => string | undefined;
          };
          $select: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          $expand: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          $orderBy: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          $count: {
            label: string;
            type: "boolean";
            comments: string;
            required: false;
            default: string;
            clean: (value: unknown, defaultValue?: boolean) => boolean;
          };
          $search: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          $format: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    assignDeviceCompliancePolicy: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      deviceCompliancePolicyId: {
        comments: string;
        label: string;
        example: string;
        placeholder: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
      assignId: {
        label: string;
        example: string;
        placeholder: string;
        comments: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      target: {
        label: string;
        type: "string";
        comments: string;
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      collectionId: {
        label: string;
        example: string;
        placeholder: string;
        comments: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getDeviceCompliancePolicy: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      deviceCompliancePolicyId: {
        label: string;
        example: string;
        placeholder: string;
        comments: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listDeviceCompliancePolicies: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listDeviceCompliancePolicySettingStateSummaries: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getDeviceCompliancePolicySettingStateSummary: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      deviceCompliancePolicySettingStateSummaryId: {
        label: string;
        example: string;
        placeholder: string;
        comments: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listDirectoryAudits: import("@prismatic-io/spectral").ActionDefinition<{
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
        required: false;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          $top: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
          $skipToken: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
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
          $filter: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            placeholder: string;
            example: string;
            default: string;
            clean: (value: unknown) => string | undefined;
          };
          $orderBy: {
            label: string;
            type: "string";
            comments: string;
            required: false;
            placeholder: string;
            example: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getDirectoyAudit: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      microsoftEntraId: {
        label: string;
        example: string;
        placeholder: string;
        comments: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
  };
  connections: (import("@prismatic-io/spectral").KeyedConnection<{
    key: "msIntuneOAuth2";
    oauth2Type: import("@prismatic-io/spectral").OAuth2Type.AuthorizationCode;
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
        comments: string;
        example: string;
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
  }, "msIntuneOAuth2"> | import("@prismatic-io/spectral").KeyedConnection<{
    key: "oauth2-client-credentials";
    oauth2Type: import("@prismatic-io/spectral").OAuth2Type.ClientCredentials;
    display: {
      label: string;
      description: string;
    };
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
        example: string;
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
  }, "oauth2-client-credentials">)[];
  dataSources: {
    selectDetectedApp: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectDeviceCompliancePolicy: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectDeviceCompliancePolicySettingStateSummary: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectDeviceConfiguration: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectDirectoryAudit: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectGroup: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectManagedDevice: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectMember: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      groupId: {
        dataSource: undefined;
        comments: string;
        label: string;
        example: string;
        placeholder: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectMobileApp: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectMobileAppAssignment: import("@prismatic-io/spectral").DataSourceDefinition<{
      mobileAppId: {
        dataSource: undefined;
        label: string;
        comments: string;
        example: string;
        placeholder: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectSubscription: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectUser: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
  };
  triggers: {
    resourceTrigger: import("@prismatic-io/spectral").TriggerDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      expirationDateTime: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      changeType: {
        label: string;
        type: "string";
        collection: "valuelist";
        required: true;
        comments: string;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown) => string[];
      };
      resource: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, true, {
      payload: import("@prismatic-io/spectral").TriggerPayload<Record<string, unknown>>;
      branch: TriggerBranches;
    }, import("@prismatic-io/spectral").Inputs>;
  };
}>;
export = _default;