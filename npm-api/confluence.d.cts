//#region node_modules/axios/index.d.ts
type UppercaseMethod = 'GET' | 'DELETE' | 'HEAD' | 'OPTIONS' | 'POST' | 'PUT' | 'PATCH' | 'PURGE' | 'LINK' | 'UNLINK' | 'QUERY';
type Method = (UppercaseMethod | Lowercase<UppercaseMethod>) & {};
type ResponseType = 'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream' | 'formdata';
//#endregion
//#region src/types/index.d.ts
interface Version {
  createdAt?: string;
  message?: string;
  number?: number;
  minorEdit?: boolean;
  authorId?: string;
}
interface Page {
  title: string;
  id: string;
  createdAt?: string;
  version?: Version;
}
//#endregion
//#region npm-dist/.entry.d.ts
declare const _default: import("@prismatic-io/spectral").CallableComponent<{
  key: "confluence";
  public: true;
  documentationUrl: "https://prismatic.io/docs/components/confluence/";
  display: {
    label: string;
    description: string;
    iconPath: string;
    category: "Application Connectors";
  };
  actions: {
    graphqlRequest: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      query: {
        label: string;
        type: "code";
        required: true;
        language: "graphql";
        default: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      variables: {
        label: string;
        type: "string";
        required: false;
        collection: "keyvaluelist";
        comments: string;
        clean: (value: unknown) => Record<string, unknown>;
      };
      headers: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        collection: "keyvaluelist";
        clean: (value: unknown) => Record<string, unknown>;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    rawRequest: import("@prismatic-io/spectral").ActionDefinition<{
      url: {
        comments: string;
        example: string;
        placeholder: string;
        label: string;
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
      data: {
        data: any;
      };
    }>;
    getSpace: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      spaceId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        example: string;
        placeholder: string;
        dataSource: string;
      };
      queryParameters: {
        label: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        comments: string;
        clean: (keyvaluelist: unknown) => Record<string, string>;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listSpaces: import("@prismatic-io/spectral").ActionDefinition<{
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
          limit: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            clean: (value: unknown) => number | undefined;
            example: string;
            default: string;
          };
          cursor: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            clean: (value: unknown) => string | undefined;
            example: string;
            placeholder: string;
          };
        };
      } & {
        type: "structuredObject";
      };
      queryParameters: {
        label: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        comments: string;
        clean: (keyvaluelist: unknown) => Record<string, string>;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createPage: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      spaceId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        example: string;
        placeholder: string;
        dataSource: string;
      };
      status: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown, defaultValue?: string) => string;
      };
      title: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        example: string;
        placeholder: string;
      };
      parentId: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        example: string;
        placeholder: string;
      };
      body: {
        label: string;
        type: "code";
        language: "json";
        comments: string;
        default: string;
        clean: (value: unknown) => any;
        required: true;
      };
      embedded: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      privateInput: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      queryParameters: {
        label: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        comments: string;
        clean: (keyvaluelist: unknown) => Record<string, string>;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deletePage: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
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
        clean: (value: unknown, defaultValue?: string) => string;
        example: string;
        placeholder: string;
        dataSource: string;
      };
      purge: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      draft: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, any>;
    getPage: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
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
          bodyFormat: {
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
          getDraft: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            clean: (value: unknown, defaultValue?: boolean) => boolean;
          };
          previousVersion: {
            label: string;
            type: "string";
            required: false;
            example: string;
            placeholder: string;
            comments: string;
            clean: (value: unknown) => number | undefined;
          };
          includeLabels: {
            label: string;
            type: "boolean";
            required: false;
            comments: string;
            clean: (value: unknown, defaultValue?: boolean) => boolean;
          };
          includeProperties: {
            label: string;
            type: "boolean";
            required: false;
            comments: string;
            clean: (value: unknown, defaultValue?: boolean) => boolean;
          };
          includeOperations: {
            label: string;
            type: "boolean";
            required: false;
            comments: string;
            clean: (value: unknown, defaultValue?: boolean) => boolean;
          };
          includeLikes: {
            label: string;
            type: "boolean";
            required: false;
            comments: string;
            clean: (value: unknown, defaultValue?: boolean) => boolean;
          };
          includeVersions: {
            label: string;
            type: "boolean";
            required: false;
            comments: string;
            clean: (value: unknown, defaultValue?: boolean) => boolean;
          };
          includeVersion: {
            label: string;
            type: "boolean";
            required: false;
            comments: string;
            clean: (value: unknown, defaultValue?: boolean) => boolean;
            default: string;
          };
          includeFavoritedByCurrentUserStatus: {
            label: string;
            type: "boolean";
            required: false;
            comments: string;
            clean: (value: unknown, defaultValue?: boolean) => boolean;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listPages: import("@prismatic-io/spectral").ActionDefinition<{
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
          limit: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            clean: (value: unknown) => number | undefined;
            example: string;
            default: string;
          };
          cursor: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            clean: (value: unknown) => string | undefined;
            example: string;
            placeholder: string;
          };
        };
      } & {
        type: "structuredObject";
      };
      id: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      spaceIdFilter: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      sort: {
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
      statusPages: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      titlePages: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      bodyFormatPages: {
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
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listPagesInSpace: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      spaceId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
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
      depth: {
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
      sort: {
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
      status: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown, defaultValue?: string) => string;
      };
      titlePages: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      bodyFormatPages: {
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
            clean: (value: unknown) => number | undefined;
            example: string;
            default: string;
          };
          cursor: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            clean: (value: unknown) => string | undefined;
            example: string;
            placeholder: string;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    updatePage: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
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
        clean: (value: unknown, defaultValue?: string) => string;
        example: string;
        placeholder: string;
        dataSource: string;
      };
      status: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown, defaultValue?: string) => string;
      };
      title: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        example: string;
        placeholder: string;
      };
      body: {
        label: string;
        type: "code";
        language: "json";
        comments: string;
        default: string;
        clean: (value: unknown) => any;
        required: true;
      };
      version: {
        label: string;
        type: "code";
        language: "json";
        comments: string;
        default: string;
        clean: (value: unknown) => any;
        required: true;
      };
      spaceId: {
        required: boolean;
        clean: (value: unknown) => string | undefined;
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
      };
      parentId: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        example: string;
        placeholder: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createContentPropertyForAttachment: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      attachmentId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        example: string;
        placeholder: string;
        dataSource: string;
      };
      bodyData: {
        label: string;
        type: "code";
        language: "json";
        comments: string;
        default: string;
        clean: (value: unknown) => any;
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createContentPropertyForCustomContent: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      customContentId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        example: string;
        placeholder: string;
      };
      bodyData: {
        label: string;
        type: "code";
        language: "json";
        comments: string;
        default: string;
        clean: (value: unknown) => any;
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createContentPropertyForPage: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
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
        clean: (value: unknown, defaultValue?: string) => string;
        example: string;
        placeholder: string;
        dataSource: string;
      };
      bodyData: {
        label: string;
        type: "code";
        language: "json";
        comments: string;
        default: string;
        clean: (value: unknown) => any;
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deleteContentPropertyForAttachment: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      attachmentId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        example: string;
        placeholder: string;
        dataSource: string;
      };
      propertyId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        example: string;
        placeholder: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, any>;
    deleteContentPropertyForCustomContent: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      customContentId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        example: string;
        placeholder: string;
      };
      propertyId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        example: string;
        placeholder: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, any>;
    deleteContentPropertyForPage: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
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
        clean: (value: unknown, defaultValue?: string) => string;
        example: string;
        placeholder: string;
        dataSource: string;
      };
      propertyId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        example: string;
        placeholder: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, any>;
    getContentPropertiesForAttachments: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      attachmentId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        example: string;
        placeholder: string;
        dataSource: string;
      };
      propertyId: {
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
    getContentPropertiesForCustomContent: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      customContentId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        example: string;
        placeholder: string;
      };
      propertyId: {
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
    getContentPropertiesForPage: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
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
        clean: (value: unknown, defaultValue?: string) => string;
        example: string;
        placeholder: string;
        dataSource: string;
      };
      propertyId: {
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
    listContentPropertiesForAttachments: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      attachmentId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
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
          limit: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            clean: (value: unknown) => number | undefined;
            example: string;
            default: string;
          };
          cursor: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            clean: (value: unknown) => string | undefined;
            example: string;
            placeholder: string;
          };
        };
      } & {
        type: "structuredObject";
      };
      sort: {
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
      queryParameters: {
        label: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        comments: string;
        clean: (keyvaluelist: unknown) => Record<string, string>;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listContentPropertiesForCustomContent: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      customContentId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        example: string;
        placeholder: string;
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
            label: string;
            type: "string";
            required: false;
            comments: string;
            clean: (value: unknown) => number | undefined;
            example: string;
            default: string;
          };
          cursor: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            clean: (value: unknown) => string | undefined;
            example: string;
            placeholder: string;
          };
        };
      } & {
        type: "structuredObject";
      };
      sort: {
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
      queryParameters: {
        label: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        comments: string;
        clean: (keyvaluelist: unknown) => Record<string, string>;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listContentPropertiesForPage: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
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
          limit: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            clean: (value: unknown) => number | undefined;
            example: string;
            default: string;
          };
          cursor: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            clean: (value: unknown) => string | undefined;
            example: string;
            placeholder: string;
          };
        };
      } & {
        type: "structuredObject";
      };
      sort: {
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
      queryParameters: {
        label: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        comments: string;
        clean: (keyvaluelist: unknown) => Record<string, string>;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    updateContentPropertyForAttachment: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      attachmentId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        example: string;
        placeholder: string;
        dataSource: string;
      };
      propertyId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        example: string;
        placeholder: string;
      };
      bodyData: {
        default: string;
        label: string;
        type: "code";
        language: "json";
        comments: string;
        clean: (value: unknown) => any;
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    updateContentPropertyForCustomContent: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      customContentId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        example: string;
        placeholder: string;
      };
      propertyId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        example: string;
        placeholder: string;
      };
      bodyData: {
        default: string;
        label: string;
        type: "code";
        language: "json";
        comments: string;
        clean: (value: unknown) => any;
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    updateContentPropertyForPage: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
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
        clean: (value: unknown, defaultValue?: string) => string;
        example: string;
        placeholder: string;
        dataSource: string;
      };
      propertyId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        example: string;
        placeholder: string;
      };
      bodyData: {
        default: string;
        label: string;
        type: "code";
        language: "json";
        comments: string;
        clean: (value: unknown) => any;
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deleteAttachment: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      attachmentId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        example: string;
        placeholder: string;
        dataSource: string;
      };
      purgeAttachment: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, any>;
    getAttachment: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      attachmentId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        example: string;
        placeholder: string;
        dataSource: string;
      };
      queryParameters: {
        label: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        comments: string;
        clean: (keyvaluelist: unknown) => Record<string, string>;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getPageAttachment: import("@prismatic-io/spectral").ActionDefinition<{
      connectionInput: {
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
        clean: (value: unknown, defaultValue?: string) => string;
        example: string;
        placeholder: string;
        dataSource: string;
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
            clean: (value: unknown) => number | undefined;
            example: string;
            default: string;
          };
          cursor: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            clean: (value: unknown) => string | undefined;
            example: string;
            placeholder: string;
          };
        };
      } & {
        type: "structuredObject";
      };
      queryParameters: {
        label: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        comments: string;
        clean: (keyvaluelist: unknown) => Record<string, string>;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listAttachments: import("@prismatic-io/spectral").ActionDefinition<{
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
          limit: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            clean: (value: unknown) => number | undefined;
            example: string;
            default: string;
          };
          cursor: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            clean: (value: unknown) => string | undefined;
            example: string;
            placeholder: string;
          };
        };
      } & {
        type: "structuredObject";
      };
      queryParameters: {
        label: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        comments: string;
        clean: (keyvaluelist: unknown) => Record<string, string>;
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
        default: string;
        comments: string;
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
      apiSiteOverride: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        shown: true;
        comments: string;
        example: string;
      };
    };
  }, "oauth2"> | import("@prismatic-io/spectral").KeyedConnection<{
    key: "basic";
    display: {
      label: string;
      description: string;
    };
    inputs: {
      email: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        shown: true;
        comments: string;
        example: string;
      };
      apiToken: {
        label: string;
        placeholder: string;
        type: "password";
        required: true;
        shown: true;
        comments: string;
        example: string;
      };
      host: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        shown: true;
        comments: string;
        example: string;
      };
    };
  }, "basic">)[];
  dataSources: {
    listAttachments: import("@prismatic-io/spectral").DataSourceDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    listPages: import("@prismatic-io/spectral").DataSourceDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      spaceId: {
        dataSource: any;
        comments: string;
        required: boolean;
        clean: (value: unknown) => string | undefined;
        label: string;
        type: "string";
        example: string;
        placeholder: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    listSpaces: import("@prismatic-io/spectral").DataSourceDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      sortByName: {
        label: string;
        comments: string;
        type: "boolean";
        required: boolean;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
  };
  triggers: {
    newSpacesPollingTrigger: import("@prismatic-io/spectral").PollingTriggerDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      lookBackDate: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, import("@prismatic-io/spectral").TriggerPayload<Record<string, unknown>>, boolean, import("@prismatic-io/spectral").TriggerBaseResult<import("@prismatic-io/spectral").TriggerPayload<Record<string, unknown>>>, import("@prismatic-io/spectral").Inputs>;
    pagesPollingTrigger: import("@prismatic-io/spectral").PollingTriggerDefinition<{
      connectionInput: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      lookBackDate: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, import("@prismatic-io/spectral").TriggerPayload<Record<string, unknown>>, boolean, import("@prismatic-io/spectral").TriggerBaseResult<import("@prismatic-io/spectral").TriggerPayload<Record<string, unknown>> & {
      body: {
        data: {
          createdRecords: Page[];
          updatedRecords: Page[];
        };
      };
    }>, import("@prismatic-io/spectral").Inputs>;
  };
  hooks: {
    error: (error: unknown) => unknown;
  };
}>;
export = _default;