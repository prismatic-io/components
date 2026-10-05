import type {
  GetBucketNotificationConfigurationCommandOutput,
  PutBucketNotificationConfigurationCommandOutput,
} from "@aws-sdk/client-s3";
export const putBucketNotificationConfigurationExamplePayload: {
  data: PutBucketNotificationConfigurationCommandOutput;
} = {
  data: {
    $metadata: {
      httpStatusCode: 200,
      requestId: "3G6FNXP71KGVQ",
      extendedRequestId:
        "epeRYyT9tl3QOMTMck4AG+NqmGa5fRKv5nME7gRl8KMxfnCAKWZzKbWVKp4ED7RaZIGvVcS=",
      cfId: null,
      attempts: 1,
      totalRetryDelay: 0,
    },
  },
};
export const getBucketNotificationConfigurationExamplePayload: {
  data: GetBucketNotificationConfigurationCommandOutput;
} = {
  data: {
    $metadata: {
      httpStatusCode: 200,
      requestId: "2KMYXFM4GHPES",
      extendedRequestId:
        "dLu9EloFaZ2UeACk5l4IovjfHXHTkM7kFLdThrbIJIjn05dgO7bdU3TUJ7/8DzZvcQ==",
      cfId: null,
      attempts: 1,
      totalRetryDelay: 0,
    },
    LambdaFunctionConfigurations: [
      {
        Id: "Lambda",
        LambdaFunctionArn: "arn:aws:lambda:us-east-2:1234:function:Function",
        Events: ["s3:ObjectRemoved:*"],
      },
    ],
    QueueConfigurations: [
      {
        Id: "Queue",
        QueueArn: "arn:aws:sqs:us-east-2:1234:Queue",
        Events: ["s3:ObjectCreated:*"],
      },
    ],
    TopicConfigurations: [
      {
        Id: "Topic",
        TopicArn: "arn:aws:sns:us-east-2:1234:Topic",
        Events: ["s3:ObjectRestore:*"],
      },
    ],
  },
};
