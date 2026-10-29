import { Bucket } from "@aws-sdk/client-s3";
//#region node_modules/@smithy/types/dist-types/response.d.ts
/**
 * @public
 */
interface ResponseMetadata {
  /**
   * The status code of the last HTTP response received for this operation.
   */
  httpStatusCode?: number;
  /**
   * A unique identifier for the last request sent for this operation. Often
   * requested by AWS service teams to aid in debugging.
   */
  requestId?: string;
  /**
   * A secondary identifier for the last request sent. Used for debugging.
   */
  extendedRequestId?: string;
  /**
   * A tertiary identifier for the last request sent. Used for debugging.
   */
  cfId?: string;
  /**
   * The number of times this operation was attempted.
   */
  attempts?: number;
  /**
   * The total amount of time (in milliseconds) that was spent waiting between
   * retry attempts.
   */
  totalRetryDelay?: number;
}
//#endregion
//#region node_modules/@smithy/types/dist-types/http/httpHandlerInitialization.d.ts
declare global {
  /**
   * interface merging stub.
   */
  interface RequestInit {}
}
//#endregion
//#region src/types/polling.d.ts
type PolledBucket = Omit<Bucket, "CreationDate"> & {
  CreationDate: string;
};
//#endregion
//#region npm-dist/.entry.d.ts
declare const _default: import("@prismatic-io/spectral").CallableComponent<{
  key: "aws-s3";
  documentationUrl: "https://prismatic.io/docs/components/aws-s3/";
  public: true;
  display: {
    label: string;
    description: string;
    iconPath: string;
    category: "Data Platforms";
  };
  connections: (import("@prismatic-io/spectral").DefaultConnectionDefinition | ({
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
  } & {
    key: "apiKeySecret";
  }))[];
  actions: {
    closeUploadStream: import("@prismatic-io/spectral").ActionDefinition<{
      uploadId: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    createUploadStream: import("@prismatic-io/spectral").ActionDefinition<{
      objectKey: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      bucket: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      tagging: {
        label: string;
        placeholder: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => import("@prismatic-io/spectral").KeyValuePair[];
      };
      acl: {
        label: string;
        comments: string;
        type: "string";
        model: {
          label: string;
          value: string;
        }[];
        default: string;
        clean: (value: unknown) => import("@aws-sdk/client-s3").ObjectCannedACL;
      };
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
      dynamicAccessKeyId: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
      };
      dynamicSecretAccessKey: {
        label: string;
        type: "password";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
      };
      dynamicSessionToken: {
        label: string;
        type: "password";
        required: false;
        clean: (value: unknown) => string;
        comments: string;
      };
      accessKey: {
        label: string;
        type: "connection";
        required: false;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: string;
    }>;
    writeUploadStream: import("@prismatic-io/spectral").ActionDefinition<{
      uploadId: {
        label: string;
        type: "string";
        required: true;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      fileContents: {
        label: string;
        placeholder: string;
        type: "data";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown) => import("@prismatic-io/spectral").DataPayload;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    bucketEventTriggerConfiguration: import("@prismatic-io/spectral").ActionDefinition<{
      snsTopicArn: {
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      eventsList: {
        label: string;
        comments: string;
        type: "string";
        collection: "valuelist";
        model: {
          label: string;
          value: string;
        }[];
        example: string;
        placeholder: string;
        required: true;
        clean: (value: unknown) => string[];
      };
      bucket: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      eventNotificationName: {
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      bucketOwnerAccountid: {
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
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
      dynamicAccessKeyId: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
      };
      dynamicSecretAccessKey: {
        label: string;
        type: "password";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
      };
      dynamicSessionToken: {
        label: string;
        type: "password";
        required: false;
        clean: (value: unknown) => string;
        comments: string;
      };
      awsConnection: {
        label: string;
        type: "connection";
        required: false;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: import("@aws-sdk/client-s3").PutBucketNotificationConfigurationCommandOutput;
    }>;
    createTopic: import("@prismatic-io/spectral").ActionDefinition<{
      name: {
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
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
      dynamicAccessKeyId: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
      };
      dynamicSecretAccessKey: {
        label: string;
        type: "password";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
      };
      dynamicSessionToken: {
        label: string;
        type: "password";
        required: false;
        clean: (value: unknown) => string;
        comments: string;
      };
      awsConnection: {
        label: string;
        type: "connection";
        required: false;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: import("@aws-sdk/client-sns").CreateTopicCommandOutput;
    }>;
    subscribeToTopic: import("@prismatic-io/spectral").ActionDefinition<{
      snsTopicArn: {
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      endpoint: {
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
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
      dynamicAccessKeyId: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
      };
      dynamicSecretAccessKey: {
        label: string;
        type: "password";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
      };
      dynamicSessionToken: {
        label: string;
        type: "password";
        required: false;
        clean: (value: unknown) => string;
        comments: string;
      };
      awsConnection: {
        label: string;
        type: "connection";
        required: false;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: import("@aws-sdk/client-sns").SubscribeCommandOutput;
    }>;
    unsubscribeFromTopic: import("@prismatic-io/spectral").ActionDefinition<{
      subscriptionArn: {
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
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
      dynamicAccessKeyId: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
      };
      dynamicSecretAccessKey: {
        label: string;
        type: "password";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
      };
      dynamicSessionToken: {
        label: string;
        type: "password";
        required: false;
        clean: (value: unknown) => string;
        comments: string;
      };
      awsConnection: {
        label: string;
        type: "connection";
        required: false;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: import("@aws-sdk/client-sns").UnsubscribeCommandOutput;
    }>;
    updateTopicPolicy: import("@prismatic-io/spectral").ActionDefinition<{
      bucket: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      snsTopicArn: {
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      bucketOwnerAccountid: {
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
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
      dynamicAccessKeyId: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
      };
      dynamicSecretAccessKey: {
        label: string;
        type: "password";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
      };
      dynamicSessionToken: {
        label: string;
        type: "password";
        required: false;
        clean: (value: unknown) => string;
        comments: string;
      };
      awsConnection: {
        label: string;
        type: "connection";
        required: false;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: import("@aws-sdk/client-sns").SetTopicAttributesCommandOutput;
    }>;
    copyObject: import("@prismatic-io/spectral").ActionDefinition<{
      sourceBucket: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      destinationBucket: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      sourceKey: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      destinationKey: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      acl: {
        label: string;
        comments: string;
        type: "string";
        model: {
          label: string;
          value: string;
        }[];
        default: string;
        clean: (value: unknown) => import("@aws-sdk/client-s3").ObjectCannedACL;
      };
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
      dynamicAccessKeyId: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
      };
      dynamicSecretAccessKey: {
        label: string;
        type: "password";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
      };
      dynamicSessionToken: {
        label: string;
        type: "password";
        required: false;
        clean: (value: unknown) => string;
        comments: string;
      };
      accessKey: {
        label: string;
        type: "connection";
        required: false;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: import("@aws-sdk/client-s3").CopyObjectCommandOutput;
    }>;
    deleteObject: import("@prismatic-io/spectral").ActionDefinition<{
      bucket: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      objectKey: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
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
      dynamicAccessKeyId: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
      };
      dynamicSecretAccessKey: {
        label: string;
        type: "password";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
      };
      dynamicSessionToken: {
        label: string;
        type: "password";
        required: false;
        clean: (value: unknown) => string;
        comments: string;
      };
      accessKey: {
        label: string;
        type: "connection";
        required: false;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: import("@aws-sdk/client-s3").DeleteObjectCommandOutput;
    }>;
    deleteObjects: import("@prismatic-io/spectral").ActionDefinition<{
      bucket: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      objectKeys: {
        label: string;
        placeholder: string;
        type: "string";
        collection: "valuelist";
        required: true;
        comments: string;
        example: string;
        clean: (objectKeys: unknown) => import("@aws-sdk/client-s3").ObjectIdentifier[];
      };
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
      dynamicAccessKeyId: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
      };
      dynamicSecretAccessKey: {
        label: string;
        type: "password";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
      };
      dynamicSessionToken: {
        label: string;
        type: "password";
        required: false;
        clean: (value: unknown) => string;
        comments: string;
      };
      accessKey: {
        label: string;
        type: "connection";
        required: false;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: import("@aws-sdk/client-s3").DeleteObjectsCommandOutput;
    }>;
    generatePresignedUrl: import("@prismatic-io/spectral").ActionDefinition<{
      bucket: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      objectKey: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      actionType: {
        label: string;
        type: "string";
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        required: true;
        default: string;
        placeholder: string;
        model: {
          label: string;
          value: string;
        }[];
      };
      expirationSeconds: {
        label: string;
        type: "string";
        required: true;
        default: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: number) => number;
      };
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
      dynamicAccessKeyId: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
      };
      dynamicSecretAccessKey: {
        label: string;
        type: "password";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
      };
      dynamicSessionToken: {
        label: string;
        type: "password";
        required: false;
        clean: (value: unknown) => string;
        comments: string;
      };
      accessKey: {
        label: string;
        type: "connection";
        required: false;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: string;
    }>;
    getObject: import("@prismatic-io/spectral").ActionDefinition<{
      bucket: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      objectKey: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      versionId: {
        comments: string;
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
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
      dynamicAccessKeyId: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
      };
      dynamicSecretAccessKey: {
        label: string;
        type: "password";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
      };
      dynamicSessionToken: {
        label: string;
        type: "password";
        required: false;
        clean: (value: unknown) => string;
        comments: string;
      };
      accessKey: {
        label: string;
        type: "connection";
        required: false;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: Buffer<ArrayBuffer>;
      contentType: string;
    }>;
    getObjectAttributes: import("@prismatic-io/spectral").ActionDefinition<{
      bucket: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      objectKey: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      objectAttributes: {
        label: string;
        type: "string";
        collection: "valuelist";
        required: true;
        model: {
          label: import("@aws-sdk/client-s3").ObjectAttributes;
          value: import("@aws-sdk/client-s3").ObjectAttributes;
        }[];
        comments: string;
        placeholder: string;
        clean: (attributes: unknown) => import("@aws-sdk/client-s3").ObjectAttributes[];
      };
      versionId: {
        comments: string;
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
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
      dynamicAccessKeyId: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
      };
      dynamicSecretAccessKey: {
        label: string;
        type: "password";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
      };
      dynamicSessionToken: {
        label: string;
        type: "password";
        required: false;
        clean: (value: unknown) => string;
        comments: string;
      };
      accessKey: {
        label: string;
        type: "connection";
        required: false;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: import("@aws-sdk/client-s3").GetObjectAttributesCommandOutput;
    }>;
    headObject: import("@prismatic-io/spectral").ActionDefinition<{
      bucket: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      objectKey: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      versionId: {
        comments: string;
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
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
      dynamicAccessKeyId: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
      };
      dynamicSecretAccessKey: {
        label: string;
        type: "password";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
      };
      dynamicSessionToken: {
        label: string;
        type: "password";
        required: false;
        clean: (value: unknown) => string;
        comments: string;
      };
      accessKey: {
        label: string;
        type: "connection";
        required: false;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: import("@aws-sdk/client-s3").HeadObjectCommandOutput;
    }>;
    listObjects: import("@prismatic-io/spectral").ActionDefinition<{
      bucket: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      includeMetadata: {
        label: string;
        type: "boolean";
        required: true;
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          maxKeys: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            example: string;
            placeholder: string;
            clean: (value: unknown) => number | undefined;
          };
          continuationToken: {
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
      prefix: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        default: string;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
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
      dynamicAccessKeyId: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
      };
      dynamicSecretAccessKey: {
        label: string;
        type: "password";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
      };
      dynamicSessionToken: {
        label: string;
        type: "password";
        required: false;
        clean: (value: unknown) => string;
        comments: string;
      };
      accessKey: {
        label: string;
        type: "connection";
        required: false;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: string[] | import("@aws-sdk/client-s3").ListObjectsV2CommandOutput;
    }>;
    putObject: import("@prismatic-io/spectral").ActionDefinition<{
      bucket: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      fileContents: {
        label: string;
        placeholder: string;
        type: "data";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown) => import("@prismatic-io/spectral").DataPayload;
      };
      objectKey: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      tagging: {
        label: string;
        placeholder: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => import("@prismatic-io/spectral").KeyValuePair[];
      };
      acl: {
        label: string;
        comments: string;
        type: "string";
        model: {
          label: string;
          value: string;
        }[];
        default: string;
        clean: (value: unknown) => import("@aws-sdk/client-s3").ObjectCannedACL;
      };
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
      dynamicAccessKeyId: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
      };
      dynamicSecretAccessKey: {
        label: string;
        type: "password";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
      };
      dynamicSessionToken: {
        label: string;
        type: "password";
        required: false;
        clean: (value: unknown) => string;
        comments: string;
      };
      accessKey: {
        label: string;
        type: "connection";
        required: false;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: import("@aws-sdk/client-s3").PutObjectCommandOutput;
    }>;
    getObjectLockConfiguration: import("@prismatic-io/spectral").ActionDefinition<{
      bucket: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
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
      dynamicAccessKeyId: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
      };
      dynamicSecretAccessKey: {
        label: string;
        type: "password";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
      };
      dynamicSessionToken: {
        label: string;
        type: "password";
        required: false;
        clean: (value: unknown) => string;
        comments: string;
      };
      accessKey: {
        label: string;
        type: "connection";
        required: false;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: import("@aws-sdk/client-s3").GetObjectLockConfigurationCommandOutput;
    }>;
    getObjectRetention: import("@prismatic-io/spectral").ActionDefinition<{
      bucket: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      objectKey: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      versionId: {
        comments: string;
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
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
      dynamicAccessKeyId: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
      };
      dynamicSecretAccessKey: {
        label: string;
        type: "password";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
      };
      dynamicSessionToken: {
        label: string;
        type: "password";
        required: false;
        clean: (value: unknown) => string;
        comments: string;
      };
      accessKey: {
        label: string;
        type: "connection";
        required: false;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: import("@aws-sdk/client-s3").GetObjectRetentionCommandOutput;
    }>;
    putObjectLockConfiguration: import("@prismatic-io/spectral").ActionDefinition<{
      bucket: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      defaultRetentionMode: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown) => import("@aws-sdk/client-s3").ObjectLockRetentionMode;
      };
      defaultRetentionDays: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown, defaultValue?: number) => number;
      };
      defaultRetentionYears: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown, defaultValue?: number) => number;
      };
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
      dynamicAccessKeyId: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
      };
      dynamicSecretAccessKey: {
        label: string;
        type: "password";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
      };
      dynamicSessionToken: {
        label: string;
        type: "password";
        required: false;
        clean: (value: unknown) => string;
        comments: string;
      };
      accessKey: {
        label: string;
        type: "connection";
        required: false;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: import("@aws-sdk/client-s3").PutObjectLockConfigurationCommandOutput;
    }>;
    putObjectRetention: import("@prismatic-io/spectral").ActionDefinition<{
      bucket: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      objectKey: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      retentionMode: {
        label: string;
        comments: string;
        type: "string";
        required: false;
        placeholder: string;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown) => import("@aws-sdk/client-s3").ObjectLockRetentionMode;
      };
      retainUntilDate: {
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        required: false;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      versionId: {
        label: string;
        type: "string";
        required: false;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
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
      dynamicAccessKeyId: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
      };
      dynamicSecretAccessKey: {
        label: string;
        type: "password";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
      };
      dynamicSessionToken: {
        label: string;
        type: "password";
        required: false;
        clean: (value: unknown) => string;
        comments: string;
      };
      accessKey: {
        label: string;
        type: "connection";
        required: false;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: import("@aws-sdk/client-s3").PutObjectRetentionCommandOutput;
    }>;
    abortMultipartUpload: import("@prismatic-io/spectral").ActionDefinition<{
      bucket: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      objectKey: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      uploadId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        example: string;
        placeholder: string;
      };
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
      dynamicAccessKeyId: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
      };
      dynamicSecretAccessKey: {
        label: string;
        type: "password";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
      };
      dynamicSessionToken: {
        label: string;
        type: "password";
        required: false;
        clean: (value: unknown) => string;
        comments: string;
      };
      accessKey: {
        label: string;
        type: "connection";
        required: false;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: import("@aws-sdk/client-s3").AbortMultipartUploadCommandOutput;
    }>;
    completeMultipartUpload: import("@prismatic-io/spectral").ActionDefinition<{
      bucket: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      objectKey: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      uploadId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        example: string;
        placeholder: string;
      };
      parts: {
        label: string;
        type: "data";
        comments: string;
        placeholder: string;
        required: true;
        clean: (value: unknown) => import("@aws-sdk/client-s3").Part[];
      };
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
      dynamicAccessKeyId: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
      };
      dynamicSecretAccessKey: {
        label: string;
        type: "password";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
      };
      dynamicSessionToken: {
        label: string;
        type: "password";
        required: false;
        clean: (value: unknown) => string;
        comments: string;
      };
      accessKey: {
        label: string;
        type: "connection";
        required: false;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: import("@aws-sdk/client-s3").CompleteMultipartUploadCommandOutput;
    }>;
    createMultipartUpload: import("@prismatic-io/spectral").ActionDefinition<{
      bucket: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      objectKey: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      tagging: {
        label: string;
        placeholder: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => import("@prismatic-io/spectral").KeyValuePair[];
      };
      acl: {
        label: string;
        comments: string;
        type: "string";
        model: {
          label: string;
          value: string;
        }[];
        default: string;
        clean: (value: unknown) => import("@aws-sdk/client-s3").ObjectCannedACL;
      };
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
      dynamicAccessKeyId: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
      };
      dynamicSecretAccessKey: {
        label: string;
        type: "password";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
      };
      dynamicSessionToken: {
        label: string;
        type: "password";
        required: false;
        clean: (value: unknown) => string;
        comments: string;
      };
      accessKey: {
        label: string;
        type: "connection";
        required: false;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: import("@aws-sdk/client-s3").CreateMultipartUploadCommandOutput;
    }>;
    generatePresignedForMultiparUploads: import("@prismatic-io/spectral").ActionDefinition<{
      bucket: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      objectKey: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      urlsToGenerate: {
        label: string;
        type: "string";
        required: true;
        default: string;
        placeholder: string;
        example: string;
        comments: string;
        clean: (value: unknown) => number;
      };
      uploadId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        example: string;
        placeholder: string;
      };
      expirationSeconds: {
        label: string;
        type: "string";
        required: true;
        default: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: number) => number;
      };
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
      dynamicAccessKeyId: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
      };
      dynamicSecretAccessKey: {
        label: string;
        type: "password";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
      };
      dynamicSessionToken: {
        label: string;
        type: "password";
        required: false;
        clean: (value: unknown) => string;
        comments: string;
      };
      accessKey: {
        label: string;
        type: "connection";
        required: false;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        url: any;
        partNumber: number;
      }[];
    }>;
    listMultipartUploads: import("@prismatic-io/spectral").ActionDefinition<{
      bucket: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
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
      dynamicAccessKeyId: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
      };
      dynamicSecretAccessKey: {
        label: string;
        type: "password";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
      };
      dynamicSessionToken: {
        label: string;
        type: "password";
        required: false;
        clean: (value: unknown) => string;
        comments: string;
      };
      accessKey: {
        label: string;
        type: "connection";
        required: false;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: import("@aws-sdk/client-s3").ListMultipartUploadsCommandOutput;
    }>;
    listParts: import("@prismatic-io/spectral").ActionDefinition<{
      bucket: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      objectKey: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      uploadId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        example: string;
        placeholder: string;
      };
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
      dynamicAccessKeyId: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
      };
      dynamicSecretAccessKey: {
        label: string;
        type: "password";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
      };
      dynamicSessionToken: {
        label: string;
        type: "password";
        required: false;
        clean: (value: unknown) => string;
        comments: string;
      };
      accessKey: {
        label: string;
        type: "connection";
        required: false;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: import("@aws-sdk/client-s3").ListPartsCommandOutput;
    }>;
    uploadPart: import("@prismatic-io/spectral").ActionDefinition<{
      bucket: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      objectKey: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      uploadId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
        example: string;
        placeholder: string;
      };
      partNumber: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: number) => number;
      };
      fileChunk: {
        label: string;
        type: "data";
        required: true;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => Buffer;
      };
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
      dynamicAccessKeyId: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
      };
      dynamicSecretAccessKey: {
        label: string;
        type: "password";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
      };
      dynamicSessionToken: {
        label: string;
        type: "password";
        required: false;
        clean: (value: unknown) => string;
        comments: string;
      };
      accessKey: {
        label: string;
        type: "connection";
        required: false;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        part: {
          ETag: string;
          PartNumber: number;
        };
        ServerSideEncryption?: import("@aws-sdk/client-s3").ServerSideEncryption | undefined;
        ETag?: string | undefined;
        ChecksumCRC32?: string | undefined;
        ChecksumCRC32C?: string | undefined;
        ChecksumCRC64NVME?: string | undefined;
        ChecksumSHA1?: string | undefined;
        ChecksumSHA256?: string | undefined;
        ChecksumSHA512?: string | undefined;
        ChecksumMD5?: string | undefined;
        ChecksumXXHASH64?: string | undefined;
        ChecksumXXHASH3?: string | undefined;
        ChecksumXXHASH128?: string | undefined;
        SSECustomerAlgorithm?: string | undefined;
        SSECustomerKeyMD5?: string | undefined;
        SSEKMSKeyId?: string | undefined;
        BucketKeyEnabled?: boolean | undefined;
        RequestCharged?: import("@aws-sdk/client-s3").RequestCharged | undefined;
        $metadata: ResponseMetadata;
      };
    }>;
    getCurrentAccount: import("@prismatic-io/spectral").ActionDefinition<{
      dynamicAccessKeyId: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
      };
      dynamicSecretAccessKey: {
        label: string;
        type: "password";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
      };
      dynamicSessionToken: {
        label: string;
        type: "password";
        required: false;
        clean: (value: unknown) => string;
        comments: string;
      };
      accessKey: {
        label: string;
        type: "connection";
        required: false;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: import("@aws-sdk/client-sts").GetCallerIdentityCommandOutput;
    }>;
    deleteBucket: import("@prismatic-io/spectral").ActionDefinition<{
      bucket: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
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
      dynamicAccessKeyId: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
      };
      dynamicSecretAccessKey: {
        label: string;
        type: "password";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
      };
      dynamicSessionToken: {
        label: string;
        type: "password";
        required: false;
        clean: (value: unknown) => string;
        comments: string;
      };
      accessKey: {
        label: string;
        type: "connection";
        required: false;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: import("@aws-sdk/client-s3").DeleteBucketCommandOutput;
    }>;
    getBucketLocation: import("@prismatic-io/spectral").ActionDefinition<{
      bucket: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      dynamicAccessKeyId: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
      };
      dynamicSecretAccessKey: {
        label: string;
        type: "password";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
      };
      dynamicSessionToken: {
        label: string;
        type: "password";
        required: false;
        clean: (value: unknown) => string;
        comments: string;
      };
      accessKey: {
        label: string;
        type: "connection";
        required: false;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: string;
    }>;
    headBucket: import("@prismatic-io/spectral").ActionDefinition<{
      bucket: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
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
      dynamicAccessKeyId: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
      };
      dynamicSecretAccessKey: {
        label: string;
        type: "password";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
      };
      dynamicSessionToken: {
        label: string;
        type: "password";
        required: false;
        clean: (value: unknown) => string;
        comments: string;
      };
      accessKey: {
        label: string;
        type: "connection";
        required: false;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: import("@aws-sdk/client-s3").HeadBucketCommandOutput;
    }>;
    listBuckets: import("@prismatic-io/spectral").ActionDefinition<{
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
      dynamicAccessKeyId: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
      };
      dynamicSecretAccessKey: {
        label: string;
        type: "password";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
      };
      dynamicSessionToken: {
        label: string;
        type: "password";
        required: false;
        clean: (value: unknown) => string;
        comments: string;
      };
      accessKey: {
        label: string;
        type: "connection";
        required: false;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: import("@aws-sdk/client-s3").Bucket[];
    }>;
    getBucketNotificationConfiguration: import("@prismatic-io/spectral").ActionDefinition<{
      bucket: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
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
      dynamicAccessKeyId: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
      };
      dynamicSecretAccessKey: {
        label: string;
        type: "password";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
      };
      dynamicSessionToken: {
        label: string;
        type: "password";
        required: false;
        clean: (value: unknown) => string;
        comments: string;
      };
      accessKey: {
        label: string;
        type: "connection";
        required: false;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: import("@aws-sdk/client-s3").NotificationConfiguration;
    }>;
    putBucketNotificationConfiguration: import("@prismatic-io/spectral").ActionDefinition<{
      bucket: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      topicConfigurations: {
        label: string;
        type: "code";
        language: "json";
        placeholder: string;
        required: false;
        default: string;
        example: string;
        comments: string;
        clean: (topicConfigurations: unknown) => import("@aws-sdk/client-s3").TopicConfiguration[];
      };
      queueConfigurations: {
        label: string;
        type: "code";
        language: "json";
        placeholder: string;
        required: false;
        default: string;
        example: string;
        comments: string;
        clean: (queueConfigurations: unknown) => import("@aws-sdk/client-s3").QueueConfiguration[];
      };
      lambdaFunctionConfigurations: {
        label: string;
        type: "code";
        language: "json";
        placeholder: string;
        required: false;
        default: string;
        example: string;
        comments: string;
        clean: (lambdaFunctionConfigurations: unknown) => import("@aws-sdk/client-s3").LambdaFunctionConfiguration[];
      };
      eventBridgeConfiguration: {
        label: string;
        type: "code";
        language: "json";
        placeholder: string;
        required: false;
        default: string;
        example: string;
        comments: string;
        clean: (eventBridgeConfiguration: unknown) => import("@aws-sdk/client-s3").EventBridgeConfiguration;
      };
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
      dynamicAccessKeyId: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
      };
      dynamicSecretAccessKey: {
        label: string;
        type: "password";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
      };
      dynamicSessionToken: {
        label: string;
        type: "password";
        required: false;
        clean: (value: unknown) => string;
        comments: string;
      };
      accessKey: {
        label: string;
        type: "connection";
        required: false;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: import("@aws-sdk/client-s3").PutBucketNotificationConfigurationCommandOutput;
    }>;
  };
  dataSources: {
    selectBucket: import("@prismatic-io/spectral").DataSourceDefinition<{
      dynamicAccessKeyId: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
      };
      dynamicSecretAccessKey: {
        label: string;
        type: "password";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
      };
      dynamicSessionToken: {
        label: string;
        type: "password";
        required: false;
        clean: (value: unknown) => string;
        comments: string;
      };
      accessKey: {
        label: string;
        type: "connection";
        required: false;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectRegion: import("@prismatic-io/spectral").DataSourceDefinition<{}, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
  };
  triggers: {
    snsS3NotificationWebhook: import("@prismatic-io/spectral").TriggerDefinition<{
      expectedTopicArn: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, true, {
      branch: string;
      payload: import("@prismatic-io/spectral").TriggerPayload;
    }, import("@prismatic-io/spectral").Inputs>;
    pollChangesFilesTrigger: import("@prismatic-io/spectral").PollingTriggerDefinition<{
      bucket: {
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
        clean: (value: unknown) => string;
      };
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
      dynamicAccessKeyId: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
      };
      dynamicSecretAccessKey: {
        label: string;
        type: "password";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
      };
      dynamicSessionToken: {
        label: string;
        type: "password";
        required: false;
        clean: (value: unknown) => string;
        comments: string;
      };
      accessKey: {
        label: string;
        type: "connection";
        required: false;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, import("@prismatic-io/spectral").TriggerPayload<Record<string, unknown>>, boolean, {
      payload: import("@prismatic-io/spectral").TriggerPayload & {
        body: {
          data: string[];
        };
      };
      polledNoChanges: boolean;
    }, import("@prismatic-io/spectral").Inputs>;
    pollNewBucketsTrigger: import("@prismatic-io/spectral").PollingTriggerDefinition<{
      lookBackDate: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => string;
      };
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
      dynamicAccessKeyId: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
      };
      dynamicSecretAccessKey: {
        label: string;
        type: "password";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
      };
      dynamicSessionToken: {
        label: string;
        type: "password";
        required: false;
        clean: (value: unknown) => string;
        comments: string;
      };
      accessKey: {
        label: string;
        type: "connection";
        required: false;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, import("@prismatic-io/spectral").TriggerPayload<Record<string, unknown>>, boolean, {
      payload: {
        body: {
          data: PolledBucket[];
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
        paginationState?: Record<string, unknown>;
      };
      polledNoChanges: boolean;
    }, import("@prismatic-io/spectral").Inputs>;
  };
  hooks: {
    error: (error: unknown) => unknown;
  };
}>;
export = _default;