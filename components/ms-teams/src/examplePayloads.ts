


















export const listChannelsExamplePayload = {
  data: {
    "@odata.context":
      "https://graph.microsoft.com/v1.0/$metadata#teams('id')/channels",
    "@odata.count": 1,
    value: [
      {
        id: "19:Qm7ZZyj4FQ-TZJMWDJYIKML19X",
        createdDateTime: "2022-05-11T05:24:49.127Z",
        displayName: "General",
        isFavoriteByDefault: false,
        email: "General.TeamName@example.onmicrosoft.com",
        webUrl: "https://teams.microsoft.com/l/channel/example-id",
        membershipType: "standard",
      },
    ],
  },
};






export const listChannelMessagesExamplePayload = {
  data: {
    "@odata.context":
      "https://graph.microsoft.com/v1.0/$metadata#teams('id')/channels('id')/messages",
    "@odata.count": 1,
    value: [
      {
        id: "1652419568857",
        replyToId: "1652419568577",
        etag: "1652419568857",
        messageType: "message",
        createdDateTime: "2022-05-13T05:26:08.857Z",
        lastModifiedDateTime: "2022-05-13T05:26:08.857Z",
        lastEditedDateTime: "2022-05-13T05:26:08.857Z",
        deletedDateTime: null,
        subject: "Project Update",
        summary: "Weekly project status update",
        chatId: null,
        importance: "normal",
        locale: "en-us",
        webUrl: "https://teams.microsoft.com/l/message/example",
        eventDetail: null,
        from: {
          application: null,
          device: null,
          user: {
            id: "8b081ef6-4792-4def-b2c9-c363a1bf41d5",
            displayName: "Adele Vance",
            userIdentityType: "aadUser",
          },
        },
        body: { contentType: "text", content: "Hello World" },
      },
    ],
  },
};








export const listUsersExamplePayload = {
  data: {
    "@odata.context": "https://graph.microsoft.com/v1.0/$metadata#users",
    value: [
      {
        businessPhones: ["+1 425 555 0109"],
        displayName: "Adele Vance",
        givenName: "Adele",
        jobTitle: "Retail Manager",
        mail: "AdeleV@contoso.onmicrosoft.com",
        mobilePhone: "+1 425 555 0100",
        officeLocation: "18/2111",
        preferredLanguage: "en-US",
        surname: "Vance",
        id: "87d349ed-44d7-43e1-9a83-5f2406dee5bd",
      },
    ],
  },
};






export const getUserExamplePayload = {
  data: {
    businessPhones: ["+1 425 555 0109"],
    displayName: "Adele Vance",
    givenName: "Adele",
    jobTitle: "Retail Manager",
    mail: "AdeleV@contoso.onmicrosoft.com",
    mobilePhone: "+1 425 555 0100",
    officeLocation: "18/2111",
    preferredLanguage: "en-US",
    surname: "Vance",
    id: "87d349ed-44d7-43e1-9a83-5f2406dee5bd",
  },
};






export const deleteUserExamplePayload = {
  data: null,
};






export const getCurrentUserExamplePayload = {
  data: {
    businessPhones: ["+1 425 555 0109"],
    displayName: "Adele Vance",
    givenName: "Adele",
    jobTitle: "Retail Manager",
    mail: "AdeleV@contoso.onmicrosoft.com",
    mobilePhone: "+1 425 555 0100",
    officeLocation: "18/2111",
    preferredLanguage: "en-US",
    surname: "Vance",
    id: "87d349ed-44d7-43e1-9a83-5f2406dee5bd",
  },
};








export const listTeamsExamplePayload = {
  data: {
    "@odata.context": "https://graph.microsoft.com/v1.0/$metadata#groups",
    "@odata.count": 1,
    value: [
      {
        id: "aa6fsa5a-ed8e-4af1-aef4-bce66f795ea5",
        createdDateTime: "2022-01-15T10:30:00Z",
        displayName: "Engineering Team",
        description: "Cross-functional engineering team",
        internalId: "aa6fsa5a-ed8e-aef4-bce66f795ea5",
        classification: null,
        specialization: null,
        visibility: "public",
        summary: "Engineering team collaboration space",
      },
    ],
  },
};






export const listJoinedTeamsExamplePayload = {
  data: {
    "@odata.context": "https://graph.microsoft.com/v1.0/$metadata#teams",
    "@odata.count": 1,
    value: [
      {
        id: "aa6fsa5a-ed8e-4af1-aef4-bce66f795ea5",
        createdDateTime: "2022-01-15T10:30:00Z",
        displayName: "Engineering Team",
        description: "Cross-functional engineering team",
        internalId: "aa6fsa5a-ed8e-aef4-bce66f795ea5",
        classification: null,
        specialization: null,
        visibility: "public",
        summary: "Engineering team collaboration space",
      },
    ],
  },
};






export const listMembersExamplePayload = {
  data: {
    "@odata.context":
      "https://graph.microsoft.com/v1.0/$metadata#teams('id')/members",
    "@odata.count": 1,
    value: [
      {
        "@odata.type": "#microsoft.graph.aadUserConversationMember",
        id: "4e99b7ea-68dd-43a0-ae3f-1b2c3d4e5f6a",
        roles: ["owner"],
        displayName: "Adele Vance",
        userId: "87d349ed-44d7-43e1-9a83-5f2406dee5bd",
        email: "AdeleV@contoso.onmicrosoft.com",
        tenantId: "72f988bf-86f1-41af-91ab-2d7cd011db47",
      },
    ],
  },
};






export const getMemberExamplePayload = {
  data: {
    "@odata.type": "#microsoft.graph.aadUserConversationMember",
    id: "4e99b7ea-68dd-43a0-ae3f-1b2c3d4e5f6a",
    roles: ["owner"],
    displayName: "Adele Vance",
    userId: "87d349ed-44d7-43e1-9a83-5f2406dee5bd",
    email: "AdeleV@contoso.onmicrosoft.com",
    tenantId: "72f988bf-86f1-41af-91ab-2d7cd011db47",
  },
};






export const addMemberExamplePayload = {
  data: {
    "@odata.type": "#microsoft.graph.aadUserConversationMember",
    id: "4e99b7ea-68dd-43a0-ae3f-1b2c3d4e5f6a",
    roles: ["owner"],
    displayName: "Adele Vance",
    userId: "87d349ed-44d7-43e1-9a83-5f2406dee5bd",
    email: "AdeleV@contoso.onmicrosoft.com",
    tenantId: "72f988bf-86f1-41af-91ab-2d7cd011db47",
  },
};








export const listAttendanceRecordsExamplePayload = {
  data: {
    "@odata.context":
      "https://graph.microsoft.com/beta/$metadata#solutions/virtualEvents/webinars('f8ce2a5f-0e6a-4186-aa90-1f64bc023566@5466a424-aadf-425c-9b24-034ca28d4bdd')/sessions('8d62dd52-4dff-4c75-96a9-f905cc3ff942')/attendanceReports('b76965d4-0763-496e-9980-b323c5f3aa3b')/attendancerecords",
    value: [
      {
        emailAddress: "frederick.cormier@contoso.com",
        totalAttendanceInSeconds: 322,
        role: "Organizer",
        registrantId: null,
        identity: {
          id: "dc17674c-81d9-4adb-bfb2-8f6a442e4623",
          displayName: "Frederick Cormier",
          tenantId: null,
        },
        attendanceIntervals: [
          {
            joinDateTime: "2021-10-05T04:38:27.6027225Z",
            leaveDateTime: "2021-10-05T04:43:49.7702391Z",
            durationInSeconds: 322,
          },
        ],
      },
      {
        emailAddress: "lisa.adkins@contoso.com",
        totalAttendanceInSeconds: 314,
        role: "Presenter",
        registrantId: null,
        identity: {
          id: "57caaef9-5ed0-48d5-8862-e5abfa71b3e9",
          displayName: "Lisa Adkins",
          tenantId: null,
        },
        attendanceIntervals: [
          {
            joinDateTime: "2021-10-04T23:13:43.3776519Z",
            leaveDateTime: "2021-10-04T23:18:57.5639338Z",
            durationInSeconds: 314,
          },
        ],
      },
    ],
  },
};

const webinarExampleData = {
  "@odata.type": "#microsoft.graph.virtualEventWebinar",
  id: "88b245ac-b0b2-f1aa-e34a-c81c27abdac2@f9448ec4-804b-46af-b810-62085248da33",
  status: "published",
  displayName: "The Impact of Tech on Our Lives",
  description: {
    contentType: "text",
    content:
      "Discusses how technology has changed the way we communicate, work, and interact with each other.",
  },
  startDateTime: {
    dateTime: "2023-03-30T10:00:00",
    timeZone: "Pacific Standard Time",
  },
  endDateTime: {
    dateTime: "2023-03-30T17:00:00",
    timeZone: "Pacific Standard Time",
  },
  createdBy: {
    application: null,
    device: null,
    user: {
      "@odata.type": "#microsoft.graph.communicationsUserIdentity",
      id: "b7ef013a-c73c-4ec7-8ccb-e56290f45f68",
      displayName: "Diane Demoss",
      tenantId: "77229959-e479-4a73-b6e0-ddac27be315c",
    },
  },
  audience: "everyone",
  coOrganizers: [
    {
      id: "7b7e1acd-a3e0-4533-8c1d-c1a4ca0b2e2b",
      displayName: "Kenneth Brown",
      tenantId: "77229959-e479-4a73-b6e0-ddac27be315c",
    },
  ],
  settings: {
    isAttendeeEmailNotificationEnabled: false,
  },
  externalEventInformation: [
    {
      applicationId: "67a527ba-ef0e-4ba2-88b6-4fa5e9711757",
      externalEventId: "myExternalEventId",
    },
  ],
};






export const getSessionAttendanceReportExamplePayload = {
  data: {
    value: [webinarExampleData],
  },
};






export const listSessionAttendanceReportsExamplePayload = {
  data: {
    "@odata.context":
      "https://graph.microsoft.com/beta/$metadata#solutions/virtualEvents/webinars('f8ce2a5f-0e6a-4186-aa90-1f64bc023566@5466a424-aadf-425c-9b24-034ca28d4bdd')/sessions('8d62dd52-4dff-4c75-96a9-f905cc3ff942')/attendanceReports",
    value: [webinarExampleData],
  },
};






export const getWebinarSessionExamplePayload = {
  data: {
    value: [webinarExampleData],
  },
};






export const listWebinarSessionsExamplePayload = {
  data: {
    value: [
      {
        "@odata.type": "#microsoft.graph.virtualEventSession",
        id: "8d62dd52-4dff-4c75-96a9-f905cc3ff942",
        startDateTime: "2023-08-08T12:30:00Z",
        endDateTime: "2023-08-09T22:00:00Z",
        joinWebUrl:
          "https://teams.microsoft.com/l/meetup-join/19%3ameeting_ZDVjNzk3OWEtYjc2NS00NTA1LTkyMzQtYTYzMGI5YmFmMjM5%40thread.v2/0?context=%7b%22Tid%22%3a%2272f988bf-86f1-41af-91ab-2d7cd011db47%22%2c%22Oid%22%3a%221cd068e4-5b08-4e75-a7f9-7b4e067a0820%22%7d",
        subject: "Session one",
        isBroadcast: null,
        broadcastSettings: null,
        capabilities: [],
        audioConferencing: null,
        chatInfo: null,
        videoTeleconferenceId: null,
        externalId: null,
        joinMeetingIdSettings: null,
        lobbyBypassSettings: null,
        isEntryExitAnnounced: null,
        allowedPresenters: null,
        allowAttendeeToEnableMic: null,
        allowAttendeeToEnableCamera: null,
        allowMeetingChat: null,
        shareMeetingChatHistoryDefault: null,
        allowTeamworkReactions: null,
        recordAutomatically: null,
        watermarkProtection: null,
        allowParticipantsToChangeName: null,
      },
    ],
  },
};






export const listWebinarsExamplePayload = {
  data: {
    value: [webinarExampleData],
  },
};

const registrationExampleData = {
  "@odata.type": "#microsoft.graph.virtualEventRegistration",
  id: "127962bb-84e1-7b62-fd98-1c9d39def7b6",
  userId: "b7ef013a-c73c-4ec7-8ccb-e56290f45f68",
  firstName: "Emilee",
  lastName: "Pham",
  email: "EmileeMPham@contoso.com",
  externalRegistrationInformation: {
    referrer: "Facebook",
    registrationId: "myExternalRegistrationId",
  },
  status: "registered",
  registrationDateTime: "2023-03-07T22:04:17",
  cancelationDateTime: null,
  registrationQuestionAnswers: [
    {
      questionId: "95320781-96b3-4b8f-8cf8-e6561d23447a",
      displayName: null,
      value: null,
      booleanValue: null,
      multiChoiceValues: ["Seattle"],
    },
    {
      questionId: "4577afdb-8bee-4219-b482-04b52c6b855c",
      displayName: null,
      value: null,
      booleanValue: true,
      multiChoiceValues: [],
    },
    {
      questionId: "80fefcf1-caf7-4cd3-b8d7-159e17c47f20",
      displayName: null,
      value: null,
      booleanValue: null,
      multiChoiceValues: ["Cancun", "Hoboken", "Beijing"],
    },
  ],
};






export const createWebinarRegistrationExamplePayload = {
  data: registrationExampleData,
};






export const cancelWebinarRegistrationExamplePayload = {
  data: registrationExampleData,
};






export const getWebinarRegistrationExamplePayload = {
  data: registrationExampleData,
};






export const listWebinarRegistrationsExamplePayload = {
  data: {
    value: [registrationExampleData],
  },
};






export const getWebinarExamplePayload = {
  data: {
    value: [webinarExampleData],
  },
};






export const cancelWebinarExamplePayload = {
  data: {},
};






export const publishWebinarExamplePayload = {
  data: {},
};






export const createWebinarExamplePayload = {
  data: {
    "@odata.context":
      "https://graph.microsoft.com/v1.0/$metadata#solutions/virtualEvents/webinars/$entity",
    id: "88b245ac-b0b2-f1aa-e34a-c81c27abdac2@f9448ec4-804b-46af-b810-62085248da33",
    audience: "everyone",
    status: "draft",
    displayName: "The Impact of Tech on Our Lives",
    coOrganizers: [],
    description: {
      content:
        "Discusses how technology has changed the way we communicate, work, and interact with each other.",
      contentType: "html",
    },
    startDateTime: {
      dateTime: "2025-06-28T04:00:00",
      timeZone: "Pacific Standard Time",
    },
    endDateTime: {
      dateTime: "2025-06-28T05:00:00",
      timeZone: "Pacific Standard Time",
    },
    createdBy: {
      application: null,
      device: null,
      user: {
        "@odata.type": "#microsoft.graph.communicationsUserIdentity",
        id: "b7ef013a-c73c-4ec7-8ccb-e56290f45f68",
        displayName: "Diane Demoss",
        tenantId: "77229959-e479-4a73-b6e0-ddac27be315c",
      },
    },
    settings: {
      isAttendeeEmailNotificationEnabled: false,
    },
    externalEventInformation: [],
  },
};
