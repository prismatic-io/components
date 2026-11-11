//#region npm-dist/.entry.d.ts
declare const _default: import("@prismatic-io/spectral").CallableComponent<{
  key: "redis";
  documentationUrl: "https://prismatic.io/docs/components/redis/";
  public: true;
  display: {
    label: string;
    category: "Data Platforms";
    description: string;
    iconPath: string;
  };
  actions: {
    get: import("@prismatic-io/spectral").ActionDefinition<{
      redisConnection: {
        label: string;
        type: "connection";
        required: true;
      };
      key: {
        label: string;
        type: "string";
        example: string;
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: string;
    }>;
    getTime: import("@prismatic-io/spectral").ActionDefinition<{
      redisConnection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown;
    }>;
    keys: import("@prismatic-io/spectral").ActionDefinition<{
      key: {
        label: string;
        type: "string";
        example: string;
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      redisConnection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: string[];
    }>;
    ping: import("@prismatic-io/spectral").ActionDefinition<{
      redisConnection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: string;
    }>;
    set: import("@prismatic-io/spectral").ActionDefinition<{
      key: {
        label: string;
        type: "string";
        example: string;
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      value: {
        label: string;
        type: "string";
        example: string;
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      redisConnection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: string;
    }>;
    flushAll: import("@prismatic-io/spectral").ActionDefinition<{
      redisConnection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: string;
    }>;
    deleteKey: import("@prismatic-io/spectral").ActionDefinition<{
      key: {
        label: string;
        type: "string";
        example: string;
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      redisConnection: {
        label: string;
        type: "connection";
        required: true;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: number;
    }>;
  };
  connections: import("@prismatic-io/spectral").KeyedConnection<{
    key: "redis";
    display: {
      label: string;
      description: string;
    };
    inputs: {
      host: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        shown: true;
        comments: string;
        default: string;
      };
      port: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        shown: true;
        comments: string;
      };
      password: {
        label: string;
        placeholder: string;
        type: "password";
        required: true;
        shown: true;
      };
      username: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        shown: true;
      };
      db: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        shown: true;
        comments: string;
        example: string;
      };
      useTls: {
        label: string;
        type: "boolean";
        required: false;
        shown: true;
        comments: string;
      };
      key: {
        label: string;
        type: "text";
        required: false;
        shown: true;
        comments: string;
      };
      cert: {
        label: string;
        type: "text";
        required: false;
        shown: true;
        comments: string;
      };
      ca: {
        label: string;
        type: "text";
        required: false;
        shown: true;
        comments: string;
      };
    };
  }, "redis">[];
  hooks: {
    error: (error: unknown) => unknown;
  };
}>;
export = _default;