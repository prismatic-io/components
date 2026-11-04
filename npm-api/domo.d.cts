//#region node_modules/axios/index.d.ts
type UppercaseMethod = 'GET' | 'DELETE' | 'HEAD' | 'OPTIONS' | 'POST' | 'PUT' | 'PATCH' | 'PURGE' | 'LINK' | 'UNLINK' | 'QUERY';
type Method = (UppercaseMethod | Lowercase<UppercaseMethod>) & {};
type ResponseType = 'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream' | 'formdata';
//#endregion
//#region src/types.d.ts
interface DomoRecord {
  id: string | number;
  [key: string]: unknown;
}
//#endregion
//#region npm-dist/.entry.d.ts
declare const _default: import("@prismatic-io/spectral").CallableComponent<{
  key: "domo";
  public: true;
  display: {
    label: string;
    category: "Application Connectors";
    description: string;
    iconPath: string;
  };
  actions: {
    listAccounts: import("@prismatic-io/spectral").ActionDefinition<{
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
          limit: {
            required: false;
            comments: string;
            label: string;
            type: "string";
            placeholder: string;
            example: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          offset: {
            required: false;
            comments: string;
            label: string;
            type: "string";
            placeholder: string;
            example: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    getAccounts: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      accountTypeId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        placeholder: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createAccount: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      name: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      id: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      password: {
        label: string;
        type: "password";
        required: false;
        comments: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      authenticateBy: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      url: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      username: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    updateAccount: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      accountId: {
        required: true;
        comments: string;
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      updateAccountBody: {
        label: string;
        type: "code";
        language: "json";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deleteAccount: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      accountId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        placeholder: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    shareAccount: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      userArray: {
        label: string;
        comments: string;
        type: "string";
        collection: "valuelist";
        required: true;
        placeholder: string;
        example: string;
        clean: (stringsArray: unknown) => string[];
      };
      accountId: {
        required: true;
        comments: string;
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
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
          limit: {
            required: false;
            comments: string;
            label: string;
            type: "string";
            placeholder: string;
            example: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          offset: {
            required: false;
            comments: string;
            label: string;
            type: "string";
            placeholder: string;
            example: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
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
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createUser: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      email: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      role: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        default: string;
        placeholder: string;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown, defaultValue?: string) => string;
      };
      name: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      sendInvite: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      profile: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          alternateEmail: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          employeeNumber: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          locale: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          location: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          phone: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          timezone: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          title: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
        };
      } & {
        type: "structuredObject";
      };
      userBody: {
        label: string;
        type: "code";
        language: "json";
        required: false;
        comments: string;
        example: string;
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
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      email: {
        required: false;
        label: string;
        type: "string";
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      name: {
        required: false;
        comments: string;
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      role: {
        required: false;
        comments: string;
        label: string;
        type: "string";
        default: string;
        placeholder: string;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown, defaultValue?: string) => string;
      };
      roled: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      profile: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          alternateEmail: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          employeeNumber: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          locale: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          location: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          phone: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          timezone: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          title: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
        };
      } & {
        type: "structuredObject";
      };
      updateUserBody: {
        label: string;
        type: "code";
        language: "json";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
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
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getActivityLogEntries: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      start: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      end: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      user: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          limit: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          offset: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    listDataSets: import("@prismatic-io/spectral").ActionDefinition<{
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
      nameLike: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      sort: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          limit: {
            required: false;
            comments: string;
            label: string;
            type: "string";
            placeholder: string;
            example: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          offset: {
            required: false;
            comments: string;
            label: string;
            type: "string";
            placeholder: string;
            example: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    getDataSet: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      datasetId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        placeholder: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createDataSet: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      name: {
        required: true;
        comments: string;
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      description: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      rows: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      columns: {
        label: string;
        type: "code";
        language: "json";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    updateDataSet: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      datasetId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        placeholder: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      updateDataSetBody: {
        label: string;
        type: "code";
        language: "json";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deleteDataSet: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      datasetId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        placeholder: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    queryDataSet: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      datasetId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        placeholder: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      sql: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    importDataIntoDataSet: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      datasetId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        placeholder: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      csvBody: {
        label: string;
        type: "text";
        required: true;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    exportDataFromDataSet: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      datasetId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        placeholder: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      fileName: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      includeHeader: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        default: string;
        placeholder: string;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown, defaultValue?: string) => string;
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
          limit: {
            required: false;
            comments: string;
            label: string;
            type: "string";
            placeholder: string;
            example: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          offset: {
            required: false;
            comments: string;
            label: string;
            type: "string";
            placeholder: string;
            example: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    getGroup: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      groupId: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
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
      name: {
        required: true;
        comments: string;
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
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
        label: string;
        comments: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      updateGroupBody: {
        label: string;
        type: "code";
        language: "json";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deleteGroup: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      groupId: {
        required: true;
        comments: string;
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    addUserToGroup: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      groupId: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      userId: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    removeUserFromGroup: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      groupId: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      userId: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listUsersInGroup: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      groupId: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
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
          limit: {
            required: false;
            comments: string;
            label: string;
            type: "string";
            placeholder: string;
            example: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          offset: {
            required: false;
            comments: string;
            label: string;
            type: "string";
            placeholder: string;
            example: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    listPages: import("@prismatic-io/spectral").ActionDefinition<{
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
          limit: {
            required: false;
            comments: string;
            label: string;
            type: "string";
            placeholder: string;
            example: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          offset: {
            required: false;
            comments: string;
            label: string;
            type: "string";
            placeholder: string;
            example: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    getPage: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      pageId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        placeholder: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createPage: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      name: {
        comments: string;
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      parentId: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      locked: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        default: string;
        placeholder: string;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown, defaultValue?: string) => string;
      };
      cardIds: {
        label: string;
        comments: string;
        type: "string";
        collection: "valuelist";
        required: false;
        placeholder: string;
        example: string;
        clean: (stringsArray: unknown) => number[];
      };
      userIds: {
        label: string;
        comments: string;
        type: "string";
        collection: "valuelist";
        required: false;
        placeholder: string;
        example: string;
        clean: (stringsArray: unknown) => number[];
      };
      groupIds: {
        label: string;
        comments: string;
        type: "string";
        collection: "valuelist";
        required: false;
        placeholder: string;
        example: string;
        clean: (stringsArray: unknown) => number[];
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    updatePage: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      pageId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        placeholder: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      updatePageBody: {
        label: string;
        type: "code";
        language: "json";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deletePage: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      pageId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        placeholder: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listProjects: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getProject: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      projectId: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createProject: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      members: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      name: {
        required: true;
        comments: string;
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      publicInput: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        default: string;
        placeholder: string;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown, defaultValue?: string) => string;
      };
      description: {
        required: false;
        comments: string;
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      dueDate: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      membersArray: {
        label: string;
        type: "string";
        collection: "valuelist";
        comments: string;
        required: false;
        placeholder: string;
        example: string;
        clean: (stringsArray: unknown) => number[];
      };
      publicBody: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        default: string;
        placeholder: string;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown, defaultValue?: string) => string;
      };
      bodyName: {
        required: false;
        comments: string;
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    updateProject: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      projectId: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      projectDetails: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          description: {
            required: false;
            comments: string;
            label: string;
            type: "string";
            placeholder: string;
            example: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          dueDate: {
            required: false;
            comments: string;
            label: string;
            type: "string";
            placeholder: string;
            example: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          name: {
            required: false;
            comments: string;
            label: string;
            type: "string";
            placeholder: string;
            example: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          publicUpdate: {
            required: false;
            comments: string;
            default: string;
            model: {
              label: string;
              value: string;
            }[];
            label: string;
            type: "string";
            placeholder: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          updateProjectBody: {
            label: string;
            type: "code";
            language: "json";
            required: false;
            comments: string;
            example: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deleteProject: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      projectId: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    addAttachment: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      projectId: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      listId: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      taskId: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    downloadAttachment: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      listId: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      projectId: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      taskId: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      attachmentId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deleteAttachment: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
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
        placeholder: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      taskId: {
        required: true;
        comments: string;
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      attachmentId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getListOfAttachments: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      projectId: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      listId: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      taskId: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getProjectMembers: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      projectId: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    updateProjectMembers: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      projectId: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      updateProjectMembersBody: {
        label: string;
        type: "code";
        language: "json";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listProjectLists: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      projectId: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getList: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      projectId: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      listId: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createList: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      name: {
        required: true;
        comments: string;
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      type: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown, defaultValue?: string) => string;
      };
      index: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      projectId: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    updateList: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      listId: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      projectId: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      index: {
        required: true;
        comments: string;
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      name: {
        required: true;
        comments: string;
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      type: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown, defaultValue?: string) => string;
      };
      updateListBody: {
        label: string;
        type: "code";
        language: "json";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deleteList: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      projectId: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      listId: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listProjectListTasks: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      projectId: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      listId: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
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
          limit: {
            required: false;
            comments: string;
            label: string;
            type: "string";
            placeholder: string;
            example: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          offset: {
            required: false;
            comments: string;
            label: string;
            type: "string";
            placeholder: string;
            example: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    getTask: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      listId: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      projectId: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      taskId: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createTask: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
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
        placeholder: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      listId: {
        required: true;
        comments: string;
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      taskName: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      taskDetails: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          contributors: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          description: {
            required: false;
            comments: string;
            label: string;
            type: "string";
            placeholder: string;
            example: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          dueDate: {
            required: false;
            comments: string;
            label: string;
            type: "string";
            placeholder: string;
            example: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          ownedBy: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          priority: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          tags: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          taskObjectBody: {
            label: string;
            type: "code";
            language: "json";
            required: false;
            comments: string;
            example: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    updateTask: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      taskId: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      listId: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      projectId: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      taskName: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      taskDetails: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          description: {
            label: string;
            comments: string;
            type: "string";
            required: true;
            placeholder: string;
            example: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          contributors: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          dueDate: {
            label: string;
            comments: string;
            type: "string";
            required: false;
            placeholder: string;
            example: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          ownedBy: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          priority: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          tags: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          updateTaskBody: {
            label: string;
            type: "code";
            language: "json";
            required: false;
            comments: string;
            example: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listStreams: import("@prismatic-io/spectral").ActionDefinition<{
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
          limit: {
            required: false;
            comments: string;
            label: string;
            type: "string";
            placeholder: string;
            example: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          offset: {
            required: false;
            comments: string;
            label: string;
            type: "string";
            placeholder: string;
            example: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    getStream: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      streamId: {
        required: true;
        comments: string;
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      fields: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createStream: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      dataSet: {
        label: string;
        comments: string;
        type: "string";
        collection: "valuelist";
        required: true;
        placeholder: string;
        example: string;
        clean: (stringsArray: unknown) => string[];
      };
      updateMethod: {
        label: string;
        type: "string";
        required: false;
        default: string;
        comments: string;
        placeholder: string;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown, defaultValue?: string) => string;
      };
      name: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      description: {
        required: false;
        comments: string;
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      columns: {
        required: false;
        comments: string;
        label: string;
        type: "code";
        language: "json";
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      updateMethodBody: {
        required: false;
        comments: string;
        label: string;
        type: "string";
        default: string;
        placeholder: string;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    updateStream: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      streamId: {
        required: true;
        comments: string;
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      updateMethodString: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      updateMethodBody: {
        label: string;
        type: "code";
        language: "json";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deleteStream: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      streamId: {
        required: true;
        comments: string;
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    searchStream: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      qualifiers: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      fields: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listStreamExecution: import("@prismatic-io/spectral").ActionDefinition<{
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
      streamId: {
        required: true;
        comments: string;
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          limit: {
            required: false;
            comments: string;
            label: string;
            type: "string";
            placeholder: string;
            example: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          offset: {
            required: false;
            comments: string;
            label: string;
            type: "string";
            placeholder: string;
            example: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    getStreamExecution: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      streamId: {
        required: true;
        comments: string;
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      executionId: {
        required: true;
        comments: string;
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createStreamExecution: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      streamId: {
        required: true;
        comments: string;
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    uploadDataPart: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      streamId: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      executionId: {
        required: true;
        comments: string;
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      partId: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    commitStreamExecution: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      streamId: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      executionId: {
        comments: string;
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    abortStreamExecution: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      streamId: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      executionId: {
        label: string;
        comments: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
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
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
  };
  triggers: {
    pollChangesTrigger: import("@prismatic-io/spectral").PollingTriggerDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      resourceType: {
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
      lookBackDate: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => string;
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
      payload: import("@prismatic-io/spectral").TriggerPayload<Record<string, unknown>> & {
        body: {
          data: {
            created: DomoRecord[];
            updated: DomoRecord[];
          };
        };
      };
      polledNoChanges: boolean;
    }, import("@prismatic-io/spectral").Inputs>;
  };
  connections: import("@prismatic-io/spectral").KeyedConnection<{
    key: "oauth";
    display: {
      label: string;
      description: string;
    };
    inputs: {
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
        comments: string;
      };
      scopes: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        default: string;
      };
    };
  }, "oauth">[];
  dataSources: {
    selectUser: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      limit: {
        required: false;
        comments: string;
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      offset: {
        required: false;
        comments: string;
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    streams: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      limit: {
        required: false;
        comments: string;
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      offset: {
        required: false;
        comments: string;
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectStreamExecution: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      streamId: {
        dataSource: undefined;
        label: string;
        comments: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      limit: {
        required: false;
        comments: string;
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      offset: {
        required: false;
        comments: string;
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    projects: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    projectLists: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      projectId: {
        dataSource: undefined;
        label: string;
        comments: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectTask: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      projectId: {
        dataSource: undefined;
        label: string;
        comments: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      listId: {
        dataSource: undefined;
        label: string;
        comments: string;
        type: "string";
        required: true;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      limit: {
        required: false;
        comments: string;
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      offset: {
        required: false;
        comments: string;
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    pages: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      limit: {
        required: false;
        comments: string;
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      offset: {
        required: false;
        comments: string;
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    groups: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      limit: {
        required: false;
        comments: string;
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      offset: {
        required: false;
        comments: string;
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectDataSet: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      limit: {
        required: false;
        comments: string;
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      offset: {
        required: false;
        comments: string;
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    accounts: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      limit: {
        required: false;
        comments: string;
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      offset: {
        required: false;
        comments: string;
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    accountTypes: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      limit: {
        required: false;
        comments: string;
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      offset: {
        required: false;
        comments: string;
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
  };
  documentationUrl: "https://prismatic.io/docs/components/domo/";
  hooks: {
    error: (error: unknown) => unknown;
  };
}>;
export = _default;