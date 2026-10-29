import type { TriggerPayload } from "@prismatic-io/spectral";
import { GENERAL_DELETE_MESSAGE } from "../constants";

export const GET_WEBINARS_EXAMPLE_PAYLOAD = {
  data: {
    _embedded: {
      webinars: [
        {
          webinarKey: "8978964909939938573",
          webinarID: "204586973",
          organizerKey: "8456783923409587345",
          accountKey: "9384756102938475610",
          subject: "Q3 Product Launch Webinar",
          description:
            "Join us for a live walkthrough of our latest product features.",
          times: [
            {
              startTime: "2024-09-10T15:00:00Z",
              endTime: "2024-09-10T16:00:00Z",
            },
          ],
          timeZone: "America/New_York",
          locale: "en_US",
          approvalType: "AUTOMATIC",
          registrationUrl:
            "https://attendee.gotowebinar.com/register/8978964909939938573",
          impromptu: false,
          isPasswordProtected: false,
          recurrenceType: "single_session",
          experienceType: "CLASSIC",
        },
      ],
    },
    page: {
      size: 20,
      totalElements: 1,
      totalPages: 1,
      number: 0,
    },
  },
};

export const DELETE_WEBINAR_EXAMPLE_PAYLOAD = GENERAL_DELETE_MESSAGE;

export const CREATE_WEBINAR_EXAMPLE_PAYLOAD = {
  data: {
    webinarKey: "8978964909939938573",
    recurrenceKey: "5647382910564738291",
  },
};

export const UPDATE_WEBINAR_EXAMPLE_PAYLOAD = GENERAL_DELETE_MESSAGE;

export const CREATE_REGISTRANT_EXAMPLE_PAYLOAD = {
  data: {
    registrantKey: "1234567890",
    joinUrl:
      "https://global.gotowebinar.com/join/8978964909939938573/1234567890",
  },
};

export const GET_REGISTRANTS_EXAMPLE_PAYLOAD = {
  data: {
    lastName: "Doe",
    email: "jane.doe@example.com",
    firstName: "Jane",
    registrantKey: "1234567890",
    registrationDate: "2024-08-24T14:15:22Z",
    source: "Marketing Email",
    status: "APPROVED",
    joinUrl:
      "https://global.gotowebinar.com/join/8978964909939938573/1234567890",
    timeZone: "America/New_York",
    phone: "+1-555-123-4567",
    state: "New York",
    city: "New York",
    organization: "Acme Corporation",
    zipCode: "10001",
    numberOfEmployees: "201-500",
    industry: "Technology",
    jobTitle: "Engineering Manager",
    purchasingRole: "Decision Maker",
    implementationTimeFrame: "1-3 months",
    purchasingTimeFrame: "Within 6 months",
    questionsAndComments: "Looking forward to the demo.",
    employeeCount: "250",
    country: "United States",
    address: "123 Main Street",
    type: "LATE",
    unsubscribed: false,
    responses: [
      {
        answer: "Yes",
        question: "Are you currently evaluating webinar platforms?",
      },
    ],
  },
};

export const LIST_REGISTRANTS_EXAMPLE_PAYLOAD = {
  data: [
    {
      lastName: "Doe",
      email: "jane.doe@example.com",
      firstName: "Jane",
      registrantKey: "1234567890",
      registrationDate: "2024-08-24T14:15:22Z",
      status: "APPROVED",
      joinUrl:
        "https://global.gotowebinar.com/join/8978964909939938573/1234567890",
      timeZone: "America/New_York",
    },
    {
      lastName: "Smith",
      email: "john.smith@example.com",
      firstName: "John",
      registrantKey: "9876543210",
      registrationDate: "2024-08-25T09:42:10Z",
      status: "WAITING",
      joinUrl:
        "https://global.gotowebinar.com/join/8978964909939938573/9876543210",
      timeZone: "America/Los_Angeles",
    },
  ],
};

export const LIST_ALL_ATTEENDEES_FOR_ALL_WEBINAR_SESSIONS_EXAMPLE_PAYLOAD = {
  data: {
    property1: {
      sessionInfo: {
        webinarName: "Q3 Product Launch Webinar",
        webinarId: "204586973",
        sessionKey: "111111111111111111",
        timeZone: "America/New_York",
        experienceType: "CLASSIC",
        recurrencePeriod: "SINGLE_SESSION",
        startTime: "2024-09-10T15:00:00Z",
        endTime: "2024-09-10T16:00:00Z",
        registrationEmailOpenedCount: "120",
        registrationLinkClickedCount: "95",
      },
      attendance: {
        registrantCount: 150,
        percentageAttendance: 72.5,
        averageInterestRating: 4.2,
        averageAttentiveness: 0.87,
        averageAttendanceTimeSeconds: 2640.0,
      },
      pollsAndSurveys: {
        pollCount: 3,
        surveyCount: 1.0,
        questionsAsked: 12,
        percentagePollsCompleted: 68.4,
        percentageSurveysCompleted: 41.2,
      },
    },
    property2: {
      sessionInfo: {
        webinarName: "Q3 Product Launch Webinar",
        webinarId: "204586973",
        sessionKey: "222222222222222222",
        timeZone: "America/New_York",
        experienceType: "CLASSIC",
        recurrencePeriod: "SINGLE_SESSION",
        startTime: "2024-09-17T15:00:00Z",
        endTime: "2024-09-17T16:00:00Z",
        registrationEmailOpenedCount: "98",
        registrationLinkClickedCount: "80",
      },
      attendance: {
        registrantCount: 130,
        percentageAttendance: 65.0,
        averageInterestRating: 3.9,
        averageAttentiveness: 0.81,
        averageAttendanceTimeSeconds: 2400.0,
      },
      pollsAndSurveys: {
        pollCount: 2,
        surveyCount: 1.0,
        questionsAsked: 8,
        percentagePollsCompleted: 55.0,
        percentageSurveysCompleted: 38.5,
      },
    },
  },
};

export const LIST_SESSION_ATTENDEES_EXAMPLE_PAYLOAD = {
  data: [
    {
      registrantKey: 1234567890,
      firstName: "Jane",
      lastName: "Doe",
      email: "jane.doe@example.com",
      attendanceTimeInSeconds: 3540,
      sessionKey: 204586973,
      attendance: [
        {
          joinTime: "2024-09-10T15:01:30Z",
          leaveTime: "2024-09-10T16:00:30Z",
        },
      ],
    },
  ],
};

export const GET_ATTENDEE_EXAMPLE_PAYLOAD = {
  data: {
    lastName: "Doe",
    email: "jane.doe@example.com",
    firstName: "Jane",
    registrantKey: 1234567890,
    registrationDate: "2024-08-24T14:15:22Z",
    status: "APPROVED",
    joinUrl:
      "https://global.gotowebinar.com/join/8978964909939938573/1234567890",
    timeZone: "America/New_York",
  },
};

export const GET_USER_SUBSCRIPTION_EXAMPLE_PAYLOAD = {
  data: {
    callbackUrl: "https://hooks.example.com/gotowebinar/registrant-added",
    eventName: "registrant.added",
    eventVersion: "1.0.0",
    product: "g2w",
    webhookKey: "7766554433221100",
    userSubscriptionKey: "5544332211009988",
    userSubscriptionState: "ACTIVE",
    activationState: "ACTIVATED",
    createTime: "2024-08-20T10:30:00Z",
  },
};

export const CREATE_USER_SUBSCRIPTION_EXAMPLE_PAYLOAD = {
  data: {
    _embedded: {
      userSubscriptions: [
        {
          callbackUrl: "https://hooks.example.com/gotowebinar/registrant-added",
          eventName: "registrant.added",
          eventVersion: "1.0.0",
          product: "g2w",
          webhookKey: "7766554433221100",
          userSubscriptionKey: "5544332211009988",
          userSubscriptionState: "ACTIVE",
          activationState: "ACTIVATED",
          createTime: "2024-08-20T10:30:00Z",
        },
      ],
    },
  },
};

export const LIST_USER_SUBSCRIPTIONS_EXAMPLE_PAYLOAD = {
  data: {
    _embedded: {
      userSubscriptions: [
        {
          callbackUrl: "https://hooks.example.com/gotowebinar/registrant-added",
          eventName: "registrant.added",
          eventVersion: "1.0.0",
          product: "g2w",
          webhookKey: "7766554433221100",
          userSubscriptionKey: "5544332211009988",
          userSubscriptionState: "ACTIVE",
          activationState: "ACTIVATED",
          createTime: "2024-08-20T10:30:00Z",
        },
      ],
    },
  },
};

export const pollChangesTriggerExamplePayload: { payload: TriggerPayload } = {
  payload: {
    headers: {},
    queryParameters: {},
    rawBody: { data: null },
    body: {
      data: {
        created: [LIST_REGISTRANTS_EXAMPLE_PAYLOAD.data[0]],
      },
    },
    pathFragment: "",
    webhookUrls: {},
    webhookApiKeys: {},
    invokeUrl: "",
    executionId: "RXhhbXBsZUV4ZWN1dGlvblJlc3VsdElk",
    customer: {
      id: "testCustomerId",
      name: "Test Customer",
      externalId: "testExternalId",
    },
    instance: { id: "testInstanceId", name: "Test Instance" },
    user: {
      id: "testUserId",
      email: "user@example.com",
      name: "Test User",
      externalId: "testUserExternalId",
    },
    integration: {
      id: "testIntegrationId",
      name: "Test Integration",
      versionSequenceId: "1",
      externalVersion: "",
    },
    flow: { id: "testFlowId", name: "Test Flow", stableId: "testFlowStableId" },
    startedAt: "2024-01-15T00:00:00.000Z",
    globalDebug: false,
  },
};

export const userSubscriptionTriggerExamplePayload: {
  payload: TriggerPayload;
} = {
  payload: {
    headers: {
      "Content-Type": "application/json",
    },
    queryParameters: {},
    rawBody: { data: null },
    body: {
      data: {
        accountKey: "9384756102938475610",
        organizerKey: "8456783923409587345",
        webinarKey: "8978964909939938573",
        eventKey: "registrant.added",
        eventName: "registrant.added",
        eventVersion: "1.0.0",
        registrantKey: "1234567890",
        timestamp: "2024-09-01T12:00:00Z",
      },
    },
    pathFragment: "",
    webhookUrls: {},
    webhookApiKeys: {},
    invokeUrl: "",
    executionId: "RXhhbXBsZUV4ZWN1dGlvblJlc3VsdElk",
    customer: {
      id: "testCustomerId",
      name: "Test Customer",
      externalId: "testExternalId",
    },
    instance: { id: "testInstanceId", name: "Test Instance" },
    user: {
      id: "testUserId",
      email: "user@example.com",
      name: "Test User",
      externalId: "testUserExternalId",
    },
    integration: {
      id: "testIntegrationId",
      name: "Test Integration",
      versionSequenceId: "1",
      externalVersion: "",
    },
    flow: { id: "testFlowId", name: "Test Flow", stableId: "testFlowStableId" },
    startedAt: "2024-01-15T00:00:00.000Z",
    globalDebug: false,
  },
};
