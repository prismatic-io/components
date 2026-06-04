






export const createOrUpdateEventSubscriptionExamplePayload = {
  data: {
    properties: {
      topic:
        "/subscriptions/68sd45s0-422e-a06a-57xsasawed5f7a/resourceGroups/duumy/providers/microsoft.eventgrid/topics/duumytesttopic1",
      provisioningState: "Creating",
      destination: {
        properties: {
          endpointUrl: null,
          endpointBaseUrl:
            "https://test.azurewebsites.net/api/HttpTrigger1?code=1234567890",
        },
        endpointType: "WebHook",
      },
      filter: {
        subjectBeginsWith: "",
        subjectEndsWith: "",
      },
      labels: null,
      eventDeliverySchema: "EventGridSchema",
      retryPolicy: {
        maxDeliveryAttempts: 10,
        eventTimeToLiveInMinutes: 5,
      },
    },
    systemData: null,
    id: "/subscriptions/68sd45s0-422e-a06a-57xsasawed5f7a/resourceGroups/duumy/providers/Microsoft.EventGrid/topics/duumyTestTopic1/providers/Microsoft.EventGrid/eventSubscriptions/duumyTestTopicEventSubscription2",
    name: "duumyTestTopicEventSubscription2",
    type: "Microsoft.EventGrid/eventSubscriptions",
  },
};

export const getEventSubscriptionExamplePayload = {
  data: {
    properties: {
      destination: {
        properties: {
          endpointBaseUrl: "https://requestb.in/15ksip71",
        },
        endpointType: "WebHook",
      },
      filter: {
        isSubjectCaseSensitive: false,
        subjectBeginsWith: "ExamplePrefix",
        subjectEndsWith: "ExampleSuffix",
      },
      labels: ["label1", "label2"],
      provisioningState: "Succeeded",
      topic:
        "/subscriptions/5b4b650e-28b9-4790-b3ab-ddbd88d727c4/resourceGroups/examplerg/providers/microsoft.eventgrid/topics/exampletopic2",
    },
    id: "/subscriptions/5b4b650e-28b9-4790-b3ab-ddbd88d727c4/resourceGroups/examplerg/providers/Microsoft.EventGrid/topics/exampletopic2/providers/Microsoft.EventGrid/eventSubscriptions/examplesubscription1",
    name: "examplesubscription1",
    type: "Microsoft.EventGrid/eventSubscriptions",
  },
};

export const listEventSubscriptionsExamplePayload = {
  data: {
    value: [getEventSubscriptionExamplePayload.data],
    nextLink: null,
  },
};
