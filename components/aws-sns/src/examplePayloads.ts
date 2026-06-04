




import type {
  CreateTopicResponse,
  PublishResponse,
  SubscribeResponse,
  ListTopicsResponse,
  GetTopicAttributesResponse,
  ListSubscriptionsByTopicResponse,
  PublishBatchCommandOutput,
  ListPhoneNumbersOptedOutResponse,
} from "@aws-sdk/client-sns";




export const createTopicExamplePayload = {
  data: {
    TopicArn: "arn:aws:sns:us-east-1:123456789012:MyExampleTopic",
  } as CreateTopicResponse,
};




export const publishMessageExamplePayload = {
  data: {
    MessageId: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    SequenceNumber: "10000000000000001000",
  } as PublishResponse,
};




export const publishSmsExamplePayload = {
  data: {
    MessageId: "b2c3d4e5-f6a7-8901-bcde-f12345678901",
  } as PublishResponse,
};




export const publishBatchMessagesExamplePayload = {
  data: {
    $metadata: {
      httpStatusCode: 200,
      requestId: "3df5ab1c-8e8a-426f-a2d1-bd7a39ef8651",
      attempts: 1,
      totalRetryDelay: 0,
    },
    Successful: [
      {
        Id: "msg-1",
        MessageId: "c3d4e5f6-a7b8-9012-cdef-123456789012",
        SequenceNumber: "10000000000000001001",
      },
      {
        Id: "msg-2",
        MessageId: "d4e5f6a7-b8c9-0123-def1-234567890123",
        SequenceNumber: "10000000000000001002",
      },
    ],
    Failed: [
      {
        Id: "msg-3",
        Code: "InvalidParameter",
        Message: "Invalid message structure",
        SenderFault: true,
      },
    ],
  } as PublishBatchCommandOutput,
};




export const subscribeExamplePayload = {
  data: {
    SubscriptionArn:
      "arn:aws:sns:us-east-1:123456789012:MyExampleTopic:a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  } as SubscribeResponse,
};




export const subscribePendingExamplePayload = {
  data: {
    SubscriptionArn: "pending confirmation",
  } as SubscribeResponse,
};




export const unsubscribeExamplePayload = {
  data: {},
};




export const listTopicsExamplePayload = {
  data: {
    Topics: [
      {
        TopicArn: "arn:aws:sns:us-east-1:123456789012:MyExampleTopic",
      },
      {
        TopicArn: "arn:aws:sns:us-east-1:123456789012:AnotherTopic",
      },
      {
        TopicArn: "arn:aws:sns:us-east-1:123456789012:ProductionAlerts",
      },
    ],
    NextToken: "AAEBAf/8v+7MSvN8MkD9xZHCrFKL6RQ7UHJ9PJhWOH5Yqvf1H8EXAMPLE",
  } as ListTopicsResponse,
};




export const getTopicAttributesExamplePayload = {
  data: {
    Attributes: {
      TopicArn: "arn:aws:sns:us-east-1:123456789012:MyExampleTopic",
      Owner: "123456789012",
      Policy:
        '{"Version":"2012-10-17","Id":"__default_policy_ID","Statement":[{"Sid":"__default_statement_ID","Effect":"Allow","Principal":{"AWS":"*"},"Action":["SNS:GetTopicAttributes","SNS:SetTopicAttributes","SNS:AddPermission","SNS:RemovePermission","SNS:DeleteTopic","SNS:Subscribe","SNS:ListSubscriptionsByTopic","SNS:Publish"],"Resource":"arn:aws:sns:us-east-1:123456789012:MyExampleTopic","Condition":{"StringEquals":{"AWS:SourceOwner":"123456789012"}}}]}',
      DisplayName: "My Example Topic",
      SubscriptionsPending: "0",
      SubscriptionsConfirmed: "3",
      SubscriptionsDeleted: "0",
      DeliveryPolicy:
        '{"http":{"defaultHealthyRetryPolicy":{"minDelayTarget":20,"maxDelayTarget":20,"numRetries":3,"numMaxDelayRetries":0,"numNoDelayRetries":0,"numMinDelayRetries":0,"backoffFunction":"linear"},"disableSubscriptionOverrides":false}}',
      EffectiveDeliveryPolicy:
        '{"http":{"defaultHealthyRetryPolicy":{"minDelayTarget":20,"maxDelayTarget":20,"numRetries":3,"numMaxDelayRetries":0,"numNoDelayRetries":0,"numMinDelayRetries":0,"backoffFunction":"linear"},"disableSubscriptionOverrides":false}}',
      TracingConfig: "PassThrough",
      ContentBasedDeduplication: "false",
      FifoTopic: "false",
    },
  } as GetTopicAttributesResponse,
};




export const listSubscriptionsExamplePayload = {
  data: {
    Subscriptions: [
      {
        SubscriptionArn:
          "arn:aws:sns:us-east-1:123456789012:MyExampleTopic:a1b2c3d4-e5f6-7890-abcd-ef1234567890",
        Owner: "123456789012",
        Protocol: "https",
        Endpoint: "https://example.com/webhook",
        TopicArn: "arn:aws:sns:us-east-1:123456789012:MyExampleTopic",
      },
      {
        SubscriptionArn:
          "arn:aws:sns:us-east-1:123456789012:MyExampleTopic:b2c3d4e5-f6a7-8901-bcde-f12345678901",
        Owner: "123456789012",
        Protocol: "sqs",
        Endpoint: "arn:aws:sqs:us-east-1:123456789012:MyQueue",
        TopicArn: "arn:aws:sns:us-east-1:123456789012:MyExampleTopic",
      },
      {
        SubscriptionArn: "PendingConfirmation",
        Owner: "123456789012",
        Protocol: "email",
        Endpoint: "admin@example.com",
        TopicArn: "arn:aws:sns:us-east-1:123456789012:MyExampleTopic",
      },
      {
        SubscriptionArn: "PendingConfirmation",
        Owner: "123456789012",
        Protocol: "sms",
        Endpoint: "+12125551234",
        TopicArn: "arn:aws:sns:us-east-1:123456789012:MyExampleTopic",
      },
    ],
    NextToken: "AAEBAf/8v+7MSvN8MkD9xZHCrFKL6RQ7UHJ9PJhWOH5Yqvf1H8EXAMPLE",
  } as ListSubscriptionsByTopicResponse,
};




export const deleteTopicExamplePayload = {
  data: {},
};




export const listOptOutNumbersExamplePayload = {
  data: {
    phoneNumbers: ["+12125551001", "+12125551002", "+12125551003"],
    nextToken: "AAEBAf/8v+7MSvN8MkD9xZHCrFKL6RQ7UHJ9PJhWOH5Yqvf1H8EXAMPLE",
  } as ListPhoneNumbersOptedOutResponse,
};
