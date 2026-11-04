//#region npm-dist/.entry.d.ts
declare const _default: import("@prismatic-io/spectral").CallableComponent<{
  key: "aws-glue";
  public: true;
  documentationUrl: "https://prismatic.io/docs/components/aws-glue/";
  display: {
    label: string;
    description: string;
    iconPath: string;
    category: "Data Platforms";
  };
  actions: {
    listTriggers: import("@prismatic-io/spectral").ActionDefinition<{
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
      maxItems: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => number | undefined;
      };
      marker: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      awsConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: import("@aws-sdk/client-glue").ListTriggersResponse;
    }>;
    startTrigger: import("@prismatic-io/spectral").ActionDefinition<{
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
      name: {
        dataSource: string;
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      awsConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: import("@aws-sdk/client-glue").StartTriggerResponse;
    }>;
    stopTrigger: import("@prismatic-io/spectral").ActionDefinition<{
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
      name: {
        dataSource: string;
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      awsConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: import("@aws-sdk/client-glue").StopTriggerResponse;
    }>;
    getJobRun: import("@prismatic-io/spectral").ActionDefinition<{
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
      name: {
        dataSource: string;
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      runId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      awsConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: import("@aws-sdk/client-glue").GetJobRunResponse;
    }>;
    listJobs: import("@prismatic-io/spectral").ActionDefinition<{
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
      marker: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      maxItems: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => number | undefined;
      };
      awsConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: import("@aws-sdk/client-glue").ListJobsResponse;
    }>;
    startJobRun: import("@prismatic-io/spectral").ActionDefinition<{
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
      name: {
        dataSource: string;
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      capacity: {
        label: string;
        type: "string";
        example: string;
        required: false;
        comments: string;
        clean: (value: unknown, defaultValue?: number) => number;
      };
      security: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
      args: {
        label: string;
        placeholder: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        comments: string;
        clean: (value: unknown) => Record<string, string>;
      };
      awsConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: import("@aws-sdk/client-glue").StartJobRunResponse;
    }>;
    stopJobRun: import("@prismatic-io/spectral").ActionDefinition<{
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
      name: {
        dataSource: string;
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      jobRunIds: {
        label: string;
        type: "string";
        collection: "valuelist";
        required: true;
        comments: string;
      };
      awsConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: import("@aws-sdk/client-glue").BatchStopJobRunResponse;
    }>;
    listCrawlers: import("@prismatic-io/spectral").ActionDefinition<{
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
      maxItems: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => number | undefined;
      };
      marker: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      awsConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: import("@aws-sdk/client-glue").ListCrawlersResponse;
    }>;
    startCrawler: import("@prismatic-io/spectral").ActionDefinition<{
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
      name: {
        dataSource: string;
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      awsConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: import("@aws-sdk/client-glue").StartCrawlerResponse;
    }>;
    stopCrawler: import("@prismatic-io/spectral").ActionDefinition<{
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
      name: {
        dataSource: string;
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      awsConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: import("@aws-sdk/client-glue").StopCrawlerResponse;
    }>;
  };
  connections: (import("@prismatic-io/spectral").DefaultConnectionDefinition | import("@prismatic-io/spectral").KeyedConnection<{
    key: "apiKeySecret";
    display: {
      label: string;
      description: string;
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
    selectJob: import("@prismatic-io/spectral").DataSourceDefinition<{
      awsRegion: {
        dataSource: undefined;
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      awsConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectCrawler: import("@prismatic-io/spectral").DataSourceDefinition<{
      awsRegion: {
        dataSource: undefined;
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      awsConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectTrigger: import("@prismatic-io/spectral").DataSourceDefinition<{
      awsRegion: {
        dataSource: undefined;
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      awsConnection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
  };
}>;
export = _default;