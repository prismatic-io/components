import { GENERAL_DELETE_MESSAGE } from "./constants";

export const GET_WEBINARS_EXAMPLE_PAYLOAD = {
  data: {
    _embedded: {
      webinars: [
        {
          webinarKey: "string",
          webinarID: "string",
          organizerKey: "string",
          accountKey: "string",
          subject: "string",
          description: "string",
          times: [
            {
              startTime: "2019-08-24T14:15:22Z",
              endTime: "2019-08-24T14:15:22Z",
            },
          ],
          timeZone: "string",
          locale: "en_US",
          approvalType: "string",
          registrationUrl: "string",
          impromptu: true,
          isPasswordProtected: true,
          recurrenceType: "string",
          experienceType: "string",
        },
      ],
    },
    page: {
      size: 0,
      totalElements: 0,
      totalPages: 0,
      number: 0,
    },
  },
};

export const DELETE_WEBINAR_EXAMPLE_PAYLOAD = GENERAL_DELETE_MESSAGE;

export const CREATE_WEBINAR_EXAMPLE_PAYLOAD = {
  data: {
    webinarKey: "string",
    recurrenceKey: "string",
  },
};

export const UPDATE_WEBINAR_EXAMPLE_PAYLOAD = GENERAL_DELETE_MESSAGE;

export const CREATE_REGISTRANT_EXAMPLE_PAYLOAD = {
  data: {
    registrantKey: "string",
    joinUrl: "string",
  },
};

export const GET_REGISTRANTS_EXAMPLE_PAYLOAD = {
  data: {
    lastName: "string",
    email: "string",
    firstName: "string",
    registrantKey: "string",
    registrationDate: "2019-08-24T14:15:22Z",
    source: "string",
    status: "APPROVED",
    joinUrl: "string",
    timeZone: "string",
    phone: "string",
    state: "string",
    city: "string",
    organization: "string",
    zipCode: "string",
    numberOfEmployees: "string",
    industry: "string",
    jobTitle: "string",
    purchasingRole: "string",
    implementationTimeFrame: "string",
    purchasingTimeFrame: "string",
    questionsAndComments: "string",
    employeeCount: "string",
    country: "string",
    address: "string",
    type: "LATE",
    unsubscribed: true,
    responses: [
      {
        answer: "string",
        question: "string",
      },
    ],
  },
};

export const LIST_REGISTRANTS_EXAMPLE_PAYLOAD = {
  data: [
    {
      lastName: "string",
      email: "string",
      firstName: "string",
      registrantKey: "string",
      registrationDate: "2019-08-24T14:15:22Z",
      status: "APPROVED",
      joinUrl: "string",
      timeZone: "string",
    },
  ],
};

export const LIST_ALL_ATTEENDEES_FOR_ALL_WEBINAR_SESSIONS_EXAMPLE_PAYLOAD = {
  data: {
    property1: {
      sessionInfo: {
        webinarName: "string",
        webinarId: "string",
        sessionKey: "string",
        timeZone: "string",
        experienceType: "CLASSIC",
        recurrencePeriod: "string",
        startTime: "2019-08-24T14:15:22Z",
        endTime: "2019-08-24T14:15:22Z",
        registrationEmailOpenedCount: "string",
        registrationLinkClickedCount: "string",
      },
      attendance: {
        registrantCount: 0,
        percentageAttendance: 0.1,
        averageInterestRating: 0.1,
        averageAttentiveness: 0.1,
        averageAttendanceTimeSeconds: 0.1,
      },
      pollsAndSurveys: {
        pollCount: 0,
        surveyCount: 0.1,
        questionsAsked: 0,
        percentagePollsCompleted: 0.1,
        percentageSurveysCompleted: 0.1,
      },
    },
    property2: {
      sessionInfo: {
        webinarName: "string",
        webinarId: "string",
        sessionKey: "string",
        timeZone: "string",
        experienceType: "CLASSIC",
        recurrencePeriod: "string",
        startTime: "2019-08-24T14:15:22Z",
        endTime: "2019-08-24T14:15:22Z",
        registrationEmailOpenedCount: "string",
        registrationLinkClickedCount: "string",
      },
      attendance: {
        registrantCount: 0,
        percentageAttendance: 0.1,
        averageInterestRating: 0.1,
        averageAttentiveness: 0.1,
        averageAttendanceTimeSeconds: 0.1,
      },
      pollsAndSurveys: {
        pollCount: 0,
        surveyCount: 0.1,
        questionsAsked: 0,
        percentagePollsCompleted: 0.1,
        percentageSurveysCompleted: 0.1,
      },
    },
  },
};

export const LIST_SESSION_ATTENDEES_EXAMPLE_PAYLOAD = {
  data: [
    {
      registrantKey: 0,
      firstName: "string",
      lastName: "string",
      email: "string",
      attendanceTimeInSeconds: 0,
      sessionKey: 0,
      attendance: [
        {
          joinTime: "2019-08-24T14:15:22Z",
          leaveTime: "2019-08-24T14:15:22Z",
        },
      ],
    },
  ],
};

export const GET_ATTENDEE_EXAMPLE_PAYLOAD = {
  data: {
    lastName: "string",
    email: "string",
    firstName: "string",
    registrantKey: 0,
    registrationDate: "2019-08-24T14:15:22Z",
    status: "APPROVED",
    joinUrl: "string",
    timeZone: "string",
  },
};

export const GET_USER_SUBSCRIPTION_EXAMPLE_PAYLOAD = {
  data: {
    callbackUrl: "string",
    eventName: "string",
    eventVersion: "string",
    product: "g2w",
    webhookKey: "string",
    userSubscriptionKey: "string",
    userSubscriptionState: "INACTIVE",
    activationState: "INACTIVE",
    createTime: "string",
  },
};

export const CREATE_USER_SUBSCRIPTION_EXAMPLE_PAYLOAD = {
  data: {
    _embedded: {
      userSubscriptions: [
        {
          callbackUrl: "string",
          eventName: "string",
          eventVersion: "string",
          product: "g2w",
          webhookKey: "string",
          userSubscriptionKey: "string",
          userSubscriptionState: "INACTIVE",
          activationState: "INACTIVE",
          createTime: "string",
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
          callbackUrl: "string",
          eventName: "string",
          eventVersion: "string",
          product: "g2w",
          webhookKey: "string",
          userSubscriptionKey: "string",
          userSubscriptionState: "INACTIVE",
          activationState: "INACTIVE",
          createTime: "string",
        },
      ],
    },
  },
};
