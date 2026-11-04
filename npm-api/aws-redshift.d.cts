//#region npm-dist/.entry.d.ts
declare const _default: import("@prismatic-io/spectral").CallableComponent<{
  key: "aws-redshift";
  public: true;
  display: {
    label: string;
    description: string;
    iconPath: string;
    category: "Application Connectors";
  };
  documentationUrl: "https://prismatic.io/docs/components/aws-redshift/";
  connections: (import("@prismatic-io/spectral").DefaultConnectionDefinition | import("@prismatic-io/spectral").KeyedConnection<{
    key: "awsAccessKeySecret";
    display: {
      label: string;
      description: string;
    };
    inputs: {
      accessKeyId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
      };
      secretAccessKey: {
        label: string;
        type: "password";
        required: true;
        comments: string;
        example: string;
      };
    };
  }, "awsAccessKeySecret">)[];
  dataSources: {
    selectRegion: import("@prismatic-io/spectral").DataSourceDefinition<{}, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
  };
  actions: {
    describeStatement: import("@prismatic-io/spectral").ActionDefinition<{
      awsConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      statementId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      awsRegion: {
        required: true;
        label: string;
        placeholder: string;
        type: "string";
        comments: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: import("@aws-sdk/client-redshift-data").DescribeStatementCommandOutput;
    }>;
    executeStatement: import("@prismatic-io/spectral").ActionDefinition<{
      awsConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      sqlStatement: {
        label: string;
        type: "code";
        language: "sql";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      databaseName: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      awsRegion: {
        required: true;
        label: string;
        placeholder: string;
        type: "string";
        comments: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      workgroupName: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      clusterIdentifier: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      getStatementResult: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
        example: string;
        default: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      databaseUser: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      secretArn: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      sqlParameters: {
        label: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        comments: string;
        example: string;
        clean: (sqlParameters: unknown) => import("@aws-sdk/client-redshift-data").SqlParameter[] | undefined;
      };
      additionalFields: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          statementName: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
          resultFormat: {
            label: string;
            type: "string";
            required: false;
            default: string;
            comments: string;
            example: string;
            placeholder: string;
            model: {
              label: string;
              value: string;
            }[];
            clean: (value: unknown) => import("@aws-sdk/client-redshift-data").ResultFormatString | undefined;
          };
          sessionKeepAliveSeconds: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            placeholder: string;
            clean: (value: unknown) => number | undefined;
          };
          clientToken: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
          sessionId: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        executeStatement: import("@aws-sdk/client-redshift-data").ExecuteStatementCommandOutput;
        statementResults?: import("@aws-sdk/client-redshift-data").GetStatementResultCommandOutput | null;
      };
    }>;
    getStatementResult: import("@prismatic-io/spectral").ActionDefinition<{
      awsConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      statementId: {
        comments: string;
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      awsRegion: {
        required: true;
        label: string;
        placeholder: string;
        type: "string";
        comments: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      nextToken: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: import("@aws-sdk/client-redshift-data").GetStatementResultCommandOutput;
    }>;
    listStatements: import("@prismatic-io/spectral").ActionDefinition<{
      awsConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      awsRegion: {
        required: true;
        label: string;
        placeholder: string;
        type: "string";
        comments: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      status: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        model: {
          label: string;
          value: string;
        }[];
        default: string;
        clean: (value: unknown) => import("@aws-sdk/client-redshift-data").StatusString;
      };
      filters: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          databaseName: {
            required: false;
            comments: string;
            label: string;
            type: "string";
            example: string;
            placeholder: string;
            clean: (value: unknown, defaultValue?: string) => string;
          };
          workgroupName: {
            required: false;
            comments: string;
            label: string;
            type: "string";
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
          clusterIdentifier: {
            required: false;
            comments: string;
            label: string;
            type: "string";
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
          statementName: {
            comments: string;
            label: string;
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
          nextToken: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            placeholder: string;
            clean: (value: unknown) => string | undefined;
          };
          maxResults: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            placeholder: string;
            clean: (value: unknown) => number | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: import("@aws-sdk/client-redshift-data").ListStatementsCommandOutput;
    }>;
    rawRequest: import("@prismatic-io/spectral").ActionDefinition<{
      awsConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      awsRegion: {
        required: true;
        label: string;
        placeholder: string;
        type: "string";
        comments: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      body: {
        label: string;
        type: "code";
        language: "json";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      action: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
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
  };
  hooks: {
    error: (error: unknown) => unknown;
  };
}>;
export = _default;