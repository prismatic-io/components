//#region npm-dist/.entry.d.ts
declare const _default: import("@prismatic-io/spectral").CallableComponent<{
  key: "aws-dynamodb";
  documentationUrl: "https://prismatic.io/docs/components/aws-dynamodb/";
  public: true;
  display: {
    label: string;
    description: string;
    iconPath: string;
    category: "Data Platforms";
  };
  actions: {
    createItem: import("@prismatic-io/spectral").ActionDefinition<{
      awsRegion: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      tableName: {
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        comments: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      item: {
        label: string;
        type: "string";
        collection: "keyvaluelist";
        required: true;
        placeholder: string;
        comments: string;
        example: string;
      };
      itemTypes: {
        label: string;
        type: "string";
        collection: "keyvaluelist";
        required: true;
        model: {
          label: string;
          value: string;
        }[];
        example: string;
        placeholder: string;
        comments: string;
      };
      conditionExpression: {
        label: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      expressionAttributeValues: {
        required: false;
        label: string;
        type: "string";
        collection: "keyvaluelist";
        placeholder: string;
        example: string;
        comments: string;
      };
      expressionAttributeValueTypes: {
        required: false;
        label: string;
        type: "string";
        collection: "keyvaluelist";
        model: {
          label: string;
          value: string;
        }[];
        placeholder: string;
        comments: string;
      };
      awsConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: import("@aws-sdk/client-dynamodb").PutItemCommandOutput;
    }>;
    createTable: import("@prismatic-io/spectral").ActionDefinition<{
      awsRegion: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      tableName: {
        dataSource: undefined;
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      keySchema: {
        label: string;
        type: "code";
        required: true;
        language: "json";
        example: string;
        comments: string;
        clean: (value: unknown) => object;
      };
      attributeDefinition: {
        label: string;
        type: "code";
        language: "json";
        required: true;
        example: string;
        comments: string;
        clean: (value: unknown) => object;
      };
      billingMode: {
        label: string;
        type: "string";
        required: true;
        default: string;
        model: {
          label: string;
          value: string;
        }[];
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      readCapacityUnits: {
        label: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown) => number | undefined;
      };
      writeCapacityUnits: {
        label: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown) => number | undefined;
      };
      awsConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: import("@aws-sdk/client-dynamodb").CreateTableCommandOutput;
    }>;
    deleteItem: import("@prismatic-io/spectral").ActionDefinition<{
      awsRegion: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      tableName: {
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        comments: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      value: {
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      rangeKeyValue: {
        label: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      conditionExpression: {
        label: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      expressionAttributeValues: {
        required: false;
        label: string;
        type: "string";
        collection: "keyvaluelist";
        placeholder: string;
        example: string;
        comments: string;
      };
      expressionAttributeValueTypes: {
        required: false;
        label: string;
        type: "string";
        collection: "keyvaluelist";
        model: {
          label: string;
          value: string;
        }[];
        placeholder: string;
        comments: string;
      };
      awsConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: import("@aws-sdk/client-dynamodb").DeleteItemCommandOutput;
    }>;
    deleteTable: import("@prismatic-io/spectral").ActionDefinition<{
      awsRegion: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      tableName: {
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        comments: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      awsConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: import("@aws-sdk/client-dynamodb").DeleteTableCommandOutput;
    }>;
    describeTable: import("@prismatic-io/spectral").ActionDefinition<{
      awsRegion: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      tableName: {
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        comments: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      awsConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: import("@aws-sdk/client-dynamodb").DescribeTableCommandOutput;
    }>;
    getItem: import("@prismatic-io/spectral").ActionDefinition<{
      awsRegion: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      tableName: {
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        comments: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      value: {
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      rangeKeyValue: {
        label: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      awsConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        result: import("@aws-sdk/client-dynamodb").GetItemCommandOutput;
        found: boolean;
      };
    }>;
    listTables: import("@prismatic-io/spectral").ActionDefinition<{
      awsRegion: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      awsConnection: {
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
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        result: string[];
        found: boolean;
      };
    } | {
      data: {
        result: import("@aws-sdk/client-dynamodb").ListTablesCommandOutput;
        found: boolean;
      };
    }>;
    updateItem: import("@prismatic-io/spectral").ActionDefinition<{
      awsRegion: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      tableName: {
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        comments: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      value: {
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      rangeKeyValue: {
        label: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      query: {
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      conditionExpression: {
        label: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      queryParams: {
        label: string;
        type: "string";
        collection: "keyvaluelist";
        required: true;
        placeholder: string;
        example: string;
        comments: string;
      };
      queryParamTypes: {
        label: string;
        type: "string";
        collection: "keyvaluelist";
        required: true;
        model: {
          label: string;
          value: string;
        }[];
        placeholder: string;
        comments: string;
      };
      awsConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: import("@aws-sdk/client-dynamodb").UpdateItemCommandOutput;
    }>;
    rawRequest: import("@prismatic-io/spectral").ActionDefinition<{
      awsRegion: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      statement: {
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      parameters: {
        label: string;
        type: "code";
        required: false;
        language: "json";
        default: string;
        comments: string;
        clean: (value: unknown) => object | undefined;
      };
      queryParameters: {
        label: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        placeholder: string;
        comments: string;
        clean: (value: unknown) => Record<string, object> | undefined;
      };
      awsConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: import("@aws-sdk/lib-dynamodb").ExecuteStatementCommandOutput;
    }>;
    queryItems: import("@prismatic-io/spectral").ActionDefinition<{
      awsRegion: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      tableName: {
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        comments: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      expressionAttributeValues: {
        required: false;
        label: string;
        type: "string";
        collection: "keyvaluelist";
        placeholder: string;
        example: string;
        comments: string;
      };
      expressionAttributeValueTypes: {
        required: false;
        label: string;
        type: "string";
        collection: "keyvaluelist";
        model: {
          label: string;
          value: string;
        }[];
        placeholder: string;
        comments: string;
      };
      keyConditionExpression: {
        label: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      filterExpression: {
        label: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      queryParameters: {
        label: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        placeholder: string;
        comments: string;
        clean: (value: unknown) => Record<string, object> | undefined;
      };
      awsConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, any>;
  };
  connections: (import("@prismatic-io/spectral").DefaultConnectionDefinition | import("@prismatic-io/spectral").KeyedConnection<{
    key: "apiKeySecret";
    display: {
      description: string;
      label: string;
    };
    inputs: {
      accessKeyId: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        shown: true;
        comments: string;
        example: string;
      };
      secretAccessKey: {
        label: string;
        placeholder: string;
        type: "password";
        required: true;
        shown: true;
        comments: string;
        example: string;
      };
    };
  }, "apiKeySecret">)[];
  dataSources: {
    selectRegion: import("@prismatic-io/spectral").DataSourceDefinition<{}, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectTable: import("@prismatic-io/spectral").DataSourceDefinition<{
      awsConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      awsRegion: {
        dataSource: undefined;
        model: undefined;
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
  };
}>;
export = _default;