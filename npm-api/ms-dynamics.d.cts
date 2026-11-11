//#region node_modules/axios/index.d.ts
type UppercaseMethod = 'GET' | 'DELETE' | 'HEAD' | 'OPTIONS' | 'POST' | 'PUT' | 'PATCH' | 'PURGE' | 'LINK' | 'UNLINK' | 'QUERY';
type Method = (UppercaseMethod | Lowercase<UppercaseMethod>) & {};
type ResponseType = 'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream' | 'formdata';
//#endregion
//#region src/inputs/entities.d.ts
interface CreateAction {
  collection: string;
  action: "create";
  returnRepresentation?: boolean;
  data: Record<string, unknown>;
}
interface UpdateAction {
  collection: string;
  action: "update";
  key: string;
  returnRepresentation?: boolean;
  data: Record<string, unknown>;
}
interface DeleteAction {
  collection: string;
  action: "delete";
  key: string;
}
//#endregion
//#region npm-dist/.entry.d.ts
declare const _default: import("@prismatic-io/spectral").CallableComponent<{
  key: "ms-dynamics";
  public: true;
  documentationUrl: "https://prismatic.io/docs/components/ms-dynamics/";
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
    getCurrentUser: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    fetchXml: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      entityType: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      xmlQuery: {
        label: string;
        placeholder: string;
        type: "code";
        language: "xml";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      includeAnnotations: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      impersonateUserId: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
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
        comments: string;
        inputs: {
          pageNumber: {
            label: string;
            placeholder: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            clean: (value: unknown) => number | undefined;
          };
          nextPageId: {
            label: string;
            placeholder: string;
            type: "string";
            required: false;
            comments: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    rawRequestV2: import("@prismatic-io/spectral").ActionDefinition<{
      url: {
        example: string;
        comments: string;
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
    queryEntities: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      entityType: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      fieldNames: {
        label: string;
        placeholder: string;
        type: "string";
        collection: "valuelist";
        required: true;
        comments: string;
        clean: (rawValue: unknown) => string[] | undefined;
      };
      filterExpression: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      orderByFieldNames: {
        label: string;
        placeholder: string;
        type: "string";
        collection: "valuelist";
        required: false;
        comments: string;
        clean: (rawValue: unknown) => string[] | undefined;
      };
      expandPropertyNames: {
        label: string;
        placeholder: string;
        type: "string";
        collection: "valuelist";
        required: false;
        comments: string;
        clean: (rawValue: unknown) => import("dynamics-web-api").Expand[] | undefined;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      recordsPerPage: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        default: string;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: number) => number;
      };
      nextPageId: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    getEntity: import("@prismatic-io/spectral").ActionDefinition<{
      entityType: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      entityId: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      fieldNames: {
        required: boolean;
        label: string;
        placeholder: string;
        type: "string";
        collection: "valuelist";
        comments: string;
        clean: (rawValue: unknown) => string[] | undefined;
      };
      expandPropertyNames: {
        label: string;
        placeholder: string;
        type: "string";
        collection: "valuelist";
        required: false;
        comments: string;
        clean: (rawValue: unknown) => import("dynamics-web-api").Expand[] | undefined;
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
    createEntity: import("@prismatic-io/spectral").ActionDefinition<{
      entityType: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      dynamicValues: {
        label: string;
        type: "data";
        required: false;
        clean: (value: unknown) => Record<string, unknown>;
      };
      fieldValues: {
        label: string;
        placeholder: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        comments: string;
        clean: (rawValue: unknown) => Record<string, unknown>;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        [x: string]: unknown;
      };
    }>;
    updateEntity: import("@prismatic-io/spectral").ActionDefinition<{
      entityType: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      entityId: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      fieldValues: {
        label: string;
        placeholder: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        comments: string;
        clean: (rawValue: unknown) => Record<string, unknown>;
      };
      dynamicValues: {
        label: string;
        type: "data";
        required: false;
        clean: (value: unknown) => Record<string, unknown>;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        [x: string]: unknown;
      };
    }>;
    deleteEntity: import("@prismatic-io/spectral").ActionDefinition<{
      entityType: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      entityId: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
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
    upsertEntity: import("@prismatic-io/spectral").ActionDefinition<{
      entityType: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      entityId: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      fieldValues: {
        label: string;
        placeholder: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        comments: string;
        clean: (rawValue: unknown) => Record<string, unknown>;
      };
      dynamicValues: {
        label: string;
        type: "data";
        required: false;
        clean: (value: unknown) => Record<string, unknown>;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        [x: string]: unknown;
      };
    }>;
    getEntitiesMetaData: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      defaultSelectedRecordTypes: {
        label: string;
        placeholder: string;
        type: "string";
        collection: "valuelist";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => string[];
      };
      recordTypeFilter: {
        label: string;
        placeholder: string;
        type: "string";
        collection: "valuelist";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => string[];
      };
      includeAllCustomRecordTypes: {
        label: string;
        type: "boolean";
        required: true;
        default: string;
        comments: string;
        clean: (value: unknown) => boolean;
      };
      includeOnlyTopLevelRecordTypes: {
        label: string;
        type: "boolean";
        required: true;
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        object: {
          key: any;
          label: any;
        };
        defaultSelected: boolean;
        fields: {
          key: any;
          label: any;
        }[];
      }[];
    }>;
    getEntityMetaData: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      entityType: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      lookupField: {
        label: string;
        required: false;
        default: string;
        type: "boolean";
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        result: any;
      };
    }>;
    batchEntityActions: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      actions: {
        label: string;
        comments: string;
        required: true;
        type: "code";
        language: "json";
        clean: (actions: unknown) => (CreateAction | UpdateAction | DeleteAction)[];
        example: string;
        default: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any[];
    }>;
    listEntities: import("@prismatic-io/spectral").ActionDefinition<{
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
        comments: string;
        inputs: {
          maxPageSize: {
            label: string;
            placeholder: string;
            type: "string";
            required: false;
            default: string;
            comments: string;
            example: string;
            clean: (value: unknown) => number | undefined;
          };
          nextLink: {
            label: string;
            placeholder: string;
            type: "string";
            required: false;
            comments: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        entities: any;
        totalCount: any;
        nextLink: any;
        hasMore: boolean;
      };
    }>;
    listEntitiesAction: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      includeCustom: {
        label: string;
        type: "boolean";
        default: string;
        required: false;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      includeOnlyTopLevel: {
        label: string;
        type: "boolean";
        default: string;
        required: false;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      includeDetails: {
        label: string;
        type: "boolean";
        default: string;
        required: false;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        entities: ({
          entityId: any;
          logicalName: any;
          schemaName: any;
          displayName: any;
          pluralDisplayName: any;
          isCustomEntity: any;
          isChildEntity: any;
        } | {
          description: any;
          ownershipType: any;
          isActivity: any;
          isBusinessProcessEnabled: any;
          isValidForAdvancedFind: any;
          isValidForQueue: any;
          entityColor: any;
          iconLargeName: any;
          iconMediumName: any;
          iconSmallName: any;
          entityId: any;
          logicalName: any;
          schemaName: any;
          displayName: any;
          pluralDisplayName: any;
          isCustomEntity: any;
          isChildEntity: any;
        })[];
        totalCount: number;
        customEntitiesCount: number;
        systemEntitiesCount: number;
      };
    }>;
    queryAttributes: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      entityId: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      attributeType: {
        required: boolean;
        label: string;
        placeholder: string;
        type: "string";
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      fieldNames: {
        required: boolean;
        label: string;
        placeholder: string;
        type: "string";
        collection: "valuelist";
        comments: string;
        clean: (rawValue: unknown) => string[] | undefined;
      };
      filterExpression: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      expandPropertyNames: {
        label: string;
        placeholder: string;
        type: "string";
        collection: "valuelist";
        required: false;
        comments: string;
        clean: (rawValue: unknown) => import("dynamics-web-api").Expand[] | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        value: {
          "@odata.type": string;
          MetadataId: string;
          LogicalName: string;
          SchemaName: string;
          AttributeType: string;
          AttributeTypeName: {
            Value: string;
          };
          IsCustomAttribute: boolean;
          IsPrimaryId: boolean;
          IsPrimaryName: boolean;
          IsValidForRead: boolean;
          IsValidForCreate: boolean;
          IsValidForUpdate: boolean;
          RequiredLevel: {
            Value: string;
            CanBeChanged: boolean;
          };
          DisplayName: {
            UserLocalizedLabel: {
              Label: string;
              LanguageCode: number;
            };
            LocalizedLabels: {
              Label: string;
              LanguageCode: number;
            }[];
          };
          Description: {
            UserLocalizedLabel: {
              Label: string;
              LanguageCode: number;
            };
            LocalizedLabels: any[];
          };
          MaxLength: number;
        }[];
      };
    }>;
    getAttribute: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      entityId: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      attributeType: {
        label: string;
        placeholder: string;
        comments: string;
        example: string;
        dataSource: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      fieldNames: {
        label: string;
        placeholder: string;
        type: "string";
        collection: "valuelist";
        required: true;
        comments: string;
        clean: (rawValue: unknown) => string[] | undefined;
      };
      expandPropertyNames: {
        label: string;
        placeholder: string;
        type: "string";
        collection: "valuelist";
        required: false;
        comments: string;
        clean: (rawValue: unknown) => import("dynamics-web-api").Expand[] | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createAttribute: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      entityId: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      attributeBody: {
        label: string;
        type: "code";
        language: "json";
        required: true;
        comments: string;
        default: string;
        clean: (value: unknown) => object;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    updateAttribute: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      entityId: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      attributeBody: {
        label: string;
        type: "code";
        language: "json";
        required: true;
        comments: string;
        default: string;
        clean: (value: unknown) => object;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listAttributesAction: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      entityId: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      attributeType: {
        required: boolean;
        label: string;
        placeholder: string;
        type: "string";
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      includeDetails: {
        label: string;
        type: "boolean";
        default: string;
        required: false;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        entityId: string;
        attributes: ({
          logicalName: any;
          displayName: any;
          attributeType: any;
          description: any;
          isCustomAttribute: any;
          isPrimaryId: any;
          isPrimaryName: any;
          requiredLevel: any;
          isValidForRead: any;
          isValidForCreate: any;
          isValidForUpdate: any;
        } | {
          schemaName: any;
          isSecured: any;
          isAuditEnabled: any;
          isValidForAdvancedFind: any;
          logicalName: any;
          displayName: any;
          attributeType: any;
          description: any;
          isCustomAttribute: any;
          isPrimaryId: any;
          isPrimaryName: any;
          requiredLevel: any;
          isValidForRead: any;
          isValidForCreate: any;
          isValidForUpdate: any;
        })[];
        totalCount: number;
        customAttributesCount: number;
        systemAttributesCount: number;
        attributesByType: Record<string, number>;
        primaryIdAttribute: any;
        primaryNameAttribute: any;
      };
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
      webApiUrl: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        shown: true;
        comments: string;
        example: string;
      };
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
        example: string;
        comments: string;
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
    key: "clientCredentials";
    display: {
      label: string;
      description: string;
    };
    oauth2Type: import("@prismatic-io/spectral").OAuth2Type.ClientCredentials;
    inputs: {
      webApiUrl: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        shown: true;
        comments: string;
        example: string;
      };
      tokenUrl: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        shown: true;
        comments: string;
        example: string;
      };
      scopes: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        shown: true;
        comments: string;
        example: string;
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
  }, "clientCredentials">)[];
  dataSources: {
    getEntitiesMetaData: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      defaultSelectedRecordTypes: {
        label: string;
        placeholder: string;
        type: "string";
        collection: "valuelist";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => string[];
      };
      recordTypeFilter: {
        label: string;
        placeholder: string;
        type: "string";
        collection: "valuelist";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => string[];
      };
      includeAllCustomRecordTypes: {
        label: string;
        type: "boolean";
        required: true;
        default: string;
        comments: string;
        clean: (value: unknown) => boolean;
      };
      includeOnlyTopLevelRecordTypes: {
        label: string;
        type: "boolean";
        required: true;
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "objectSelection">;
    entityTypes: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      includeCustom: {
        label: string;
        type: "boolean";
        default: string;
        required: false;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      includeOnlyTopLevel: {
        label: string;
        type: "boolean";
        default: string;
        required: false;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    entities: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      includeCustom: {
        label: string;
        type: "boolean";
        default: string;
        required: false;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      includeOnlyTopLevel: {
        label: string;
        type: "boolean";
        default: string;
        required: false;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    attributes: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      entityId: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
  };
  triggers: {
    dynamicsWebhookTrigger: import("@prismatic-io/spectral").TriggerDefinition<{
      webhookKey: {
        label: string;
        placeholder: string;
        type: "password";
        required: false;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, true, {
      payload: import("@prismatic-io/spectral").TriggerPayload<Record<string, unknown>>;
      response: {
        statusCode: number;
        contentType: string;
      };
      branch: string;
    }, import("@prismatic-io/spectral").Inputs>;
    pollChangesTrigger: import("@prismatic-io/spectral").PollingTriggerDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      entityType: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      lookBackDate: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      filterExpression: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
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
      polledNoChanges: boolean;
    }, import("@prismatic-io/spectral").Inputs>;
  };
}>;
export = _default;