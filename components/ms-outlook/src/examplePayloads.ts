







import type {
  Calendar,
  Event,
  MailSearchFolder,
  Message,
  ScheduleInformation,
  Subscription,
} from "@microsoft/microsoft-graph-types";
import type { TriggerPayload } from "@prismatic-io/spectral";
import type { ODataAttrs, PaginatedResponse } from "./types";










export const listCalendarsExamplePayload = {
  data: {
    "@odata.context": "https://graph.microsoft.com/v1.0/$metadata#me/calendars",
    value: [
      {
        "@odata.id":
          "https://graph.microsoft.com/v1.0/users('ddfcd489-628b-40d7-b48b-57002df800e5@1717622f-1d94-4d0c-9d74-709fad664b77')/calendars('AAMkAGI2TGuLAAA=')",
        id: "AAMkAGI2TGuLAAA=",
        name: "Calendar",
        color: "auto",
        changeKey: "nfZyf7VcrEKLNoU37KWlkQAAA0x0+w==",
        canShare: true,
        canViewPrivateItems: true,
        hexColor: "",
        canEdit: true,
        allowedOnlineMeetingProviders: ["teamsForBusiness"],
        defaultOnlineMeetingProvider: "teamsForBusiness",
        isTallyingResponses: true,
        isRemovable: false,
        owner: {
          name: "John Doe",
          address: "john.doe@example.com",
        },
      },
    ],
  } as PaginatedResponse<Calendar & ODataAttrs>,
};






export const createCalendarExamplePayload = {
  data: {
    "@odata.context": "https://graph.microsoft.com/v1.0/$metadata#me/calendars/$entity",
    "@odata.id":
      "https://graph.microsoft.com/v1.0/users('266efe5a-0fd7-4edd-877b-b2d1e561f193@ae01a323-3934-4475-a32d-af1274312bb0')/calendars('AAMkADJmMVAAA=')",
    id: "AAMkADJmMVAAA=",
    name: "Volunteer",
    color: "auto",
    changeKey: "DxYSthXJXEWwAQSYQnXvIgAAIxGttg==",
    canShare: true,
    canViewPrivateItems: true,
    hexColor: "",
    canEdit: true,
    allowedOnlineMeetingProviders: ["teamsForBusiness"],
    defaultOnlineMeetingProvider: "teamsForBusiness",
    isTallyingResponses: true,
    isRemovable: false,
    owner: {
      name: "Samantha Booth",
      address: "samanthab@adatum.onmicrosoft.com",
    },
  } as Calendar & ODataAttrs,
};






export const updateCalendarExamplePayload = {
  data: {
    "@odata.context": "https://graph.microsoft.com/v1.0/$metadata#me/calendars/$entity",
    "@odata.id":
      "https://graph.microsoft.com/v1.0/users('266efe5a-0fd7-4edd-877b-b2d1e561f193@ae01a323-3934-4475-a32d-af1274312bb0')/calendars('AAMkADJmMVAAA=')",
    id: "AAMkADJmMVAAA=",
    name: "Social events",
    color: "auto",
    isDefaultCalendar: false,
    changeKey: "DxYSthXJXEWwAQSYQnXvIgAAIxGttg==",
    canShare: true,
    canViewPrivateItems: true,
    hexColor: "",
    canEdit: true,
    allowedOnlineMeetingProviders: ["teamsForBusiness"],
    defaultOnlineMeetingProvider: "teamsForBusiness",
    isTallyingResponses: true,
    isRemovable: false,
    owner: {
      name: "Samantha Booth",
      address: "samanthab@adatum.onmicrosoft.com",
    },
  } as Calendar & ODataAttrs,
};








export const deleteCalendarExamplePayload = { data: null };






export const getCalendarEventExamplePayload = {
  data: {
    "@odata.context": "https://graph.microsoft.com/v1.0/$metadata#me/calendars/$entity",
    "@odata.id":
      "https://graph.microsoft.com/v1.0/users('ddfcd489-628b-40d7-b48b-57002df800e5@1717622f-1d94-4d0c-9d74-709fad664b77')/calendars('AAMkAGI2TGuLAAA=')",
    id: "AAMkAGI2TGuLAAA=",
    name: "Calendar",
    color: "auto",
    isDefaultCalendar: false,
    changeKey: "nfZyf7VcrEKLNoU37KWlkQAAA0x0+w==",
    canShare: true,
    canViewPrivateItems: true,
    hexColor: "",
    canEdit: true,
    allowedOnlineMeetingProviders: ["teamsForBusiness"],
    defaultOnlineMeetingProvider: "teamsForBusiness",
    isTallyingResponses: true,
    isRemovable: false,
    owner: {
      name: "John Doe",
      address: "john.doe@example.com",
    },
  },
};






export const getScheduleExamplePayload = {
  data: {
    "@odata.context":
      "https://graph.microsoft.com/v1.0/$metadata#Collection(microsoft.graph.scheduleInformation)",
    value: [
      {
        scheduleId: "user1@example.com",
        availabilityView: "000220000",
        scheduleItems: [
          {
            isPrivate: false,
            status: "busy",
            subject: "Let's go for lunch",
            location: "Conference Room A",
            start: {
              dateTime: "2019-03-15T12:00:00.0000000",
              timeZone: "Pacific Standard Time",
            },
            end: {
              dateTime: "2019-03-15T14:00:00.0000000",
              timeZone: "Pacific Standard Time",
            },
          },
        ],
        workingHours: {
          daysOfWeek: ["monday", "tuesday", "wednesday", "thursday", "friday"],
          startTime: "08:00:00.0000000",
          endTime: "17:00:00.0000000",
          timeZone: {
            name: "Pacific Standard Time",
          },
        },
      },
      {
        scheduleId: "user2@example.com",
        availabilityView: "200220010",
        scheduleItems: [
          {
            status: "busy",
            start: {
              dateTime: "2019-03-15T08:30:00.0000000",
              timeZone: "Pacific Standard Time",
            },
            end: {
              dateTime: "2019-03-15T09:30:00.0000000",
              timeZone: "Pacific Standard Time",
            },
          },
          {
            status: "tentative",
            start: {
              dateTime: "2019-03-15T16:00:00.0000000",
              timeZone: "Pacific Standard Time",
            },
            end: {
              dateTime: "2019-03-15T17:00:00.0000000",
              timeZone: "Pacific Standard Time",
            },
          },
        ],
        workingHours: {
          daysOfWeek: ["monday", "tuesday", "wednesday", "thursday", "friday"],
          startTime: "08:00:00.0000000",
          endTime: "17:00:00.0000000",
        },
      },
    ],
  } as { value: ScheduleInformation[] } & ODataAttrs,
};










export const listEventsExamplePayload = {
  data: {
    "@odata.context":
      "https://graph.microsoft.com/v1.0/$metadata#users('cd209b0b-3f83-4c35-82d2-d88a61820480')/events(subject,body,bodyPreview,organizer,attendees,start,end,location)",
    value: [
      {
        "@odata.etag": 'W/"ZlnW4RIAV06KYYwlrfNZvQAAKGWwbw=="',
        id: "AAMkAGIAAAoZDOFAAA=",
        subject: "Orientation ",
        bodyPreview: "Please join us for the team orientation. Bring any questions you may have.",
        body: {
          contentType: "html",
          content:
            "<html><head></head><body><p>Please join us for the team orientation. Bring any questions you may have.</p></body></html>",
        },
        start: {
          dateTime: "2017-04-21T10:00:00.0000000",
          timeZone: "Pacific Standard Time",
        },
        end: {
          dateTime: "2017-04-21T12:00:00.0000000",
          timeZone: "Pacific Standard Time",
        },
        location: {
          displayName: "Assembly Hall",
          locationType: "default",
          uniqueId: "Assembly Hall",
          uniqueIdType: "private",
        },
        locations: [
          {
            displayName: "Assembly Hall",
            locationType: "default",
            uniqueIdType: "unknown",
          },
        ],
        attendees: [
          {
            type: "required",
            status: {
              response: "none",
              time: "0001-01-01T00:00:00Z",
            },
            emailAddress: {
              name: "John Doe",
              address: "john.doe@example.com",
            },
          },
          {
            type: "required",
            status: {
              response: "none",
              time: "0001-01-01T00:00:00Z",
            },
            emailAddress: {
              name: "Jane Smith",
              address: "jane.smith@example.com",
            },
          },
        ],
        organizer: {
          emailAddress: {
            name: "Samantha Booth",
            address: "samanthab@a830edad905084922E17020313.onmicrosoft.com",
          },
        },
      },
    ],
  } as PaginatedResponse<Event & ODataAttrs>,
};






export const createEventExamplePayload = {
  data: {
    subject: "Let's go for lunch",
    body: {
      contentType: "html",
      content: "Does noon work for you?",
    },
    start: {
      dateTime: "2017-04-15T12:00:00",
      timeZone: "Pacific Standard Time",
    },
    end: {
      dateTime: "2017-04-15T14:00:00",
      timeZone: "Pacific Standard Time",
    },
    location: {
      displayName: "Conference Room A",
    },
    attendees: [
      {
        emailAddress: {
          address: "john.doe@example.com",
          name: "John Doe",
        },
        type: "required",
      },
    ],
    allowNewTimeProposals: true,
    transactionId: "7E163156-7762-4BEB-A1C6-729EA81755A7",
  } as Event,
};






export const updateEventExamplePayload = {
  data: {
    subject: "Let's go for lunch",
    body: {
      contentType: "html",
      content: "Does noon work for you?",
    },
    start: {
      dateTime: "2017-04-15T12:00:00",
      timeZone: "Pacific Standard Time",
    },
    end: {
      dateTime: "2017-04-15T14:00:00",
      timeZone: "Pacific Standard Time",
    },
    location: {
      displayName: "Conference Room A",
    },
    attendees: [
      {
        emailAddress: {
          address: "john.doe@example.com",
          name: "John Doe",
        },
        type: "required",
      },
    ],
    allowNewTimeProposals: true,
    transactionId: "7E163156-7762-4BEB-A1C6-729EA81755A7",
  } as Event,
};








export const deleteEventExamplePayload = { data: null };








export const cancelEventExamplePayload = { data: null };










export const listMailFoldersExamplePayload = {
  data: {
    "@odata.context":
      "https://graph.microsoft.com/beta/$metadata#users('68ca8ec0-11f8-456b-a785-70d9936650d5')/mailFolders",
    value: [
      {
        id: "AQMkADYAAAIBCgAAAA==",
        displayName: "Deleted Items",
        parentFolderId: "AQMkADYAAAIBCAAAAA==",
        childFolderCount: 0,
        unreadItemCount: 0,
        totalItemCount: 0,
        isHidden: false,
      },
      {
        id: "AQMkADYAAAIBDwAAAA==",
        displayName: "Drafts",
        parentFolderId: "AQMkADYAAAIBCAAAAA==",
        childFolderCount: 0,
        unreadItemCount: 0,
        totalItemCount: 0,
        isHidden: false,
      },
      {
        id: "AQMkADYAAAIBDAAAAA==",
        displayName: "Inbox",
        parentFolderId: "AQMkADYAAAIBCAAAAA==",
        childFolderCount: 1,
        unreadItemCount: 70,
        totalItemCount: 71,
        isHidden: false,
      },
      {
        "@odata.type": "#microsoft.graph.mailSearchFolder",
        id: "AAMkADYRAAAZg1yTAAA=",
        displayName: "Weekly digests",
        parentFolderId: "AQMkADYAAAIBDAAAAA==",
        childFolderCount: 0,
        unreadItemCount: 4,
        totalItemCount: 5,
        isHidden: false,
        isSupported: true,
        filterQuery: "contains(subject, 'weekly digest')",
      },
      {
        id: "AQMkADYAAAIBGQAAAA==",
        displayName: "Junk Email",
        parentFolderId: "AQMkADYAAAIBCAAAAA==",
        childFolderCount: 0,
        unreadItemCount: 0,
        totalItemCount: 0,
        isHidden: false,
      },
      {
        id: "AQMkADYAAAIBCwAAAA==",
        displayName: "Outbox",
        parentFolderId: "AQMkADYAAAIBCAAAAA==",
        childFolderCount: 0,
        unreadItemCount: 0,
        totalItemCount: 0,
        isHidden: false,
      },
      {
        id: "AQMkADYAAAIBCQAAAA==",
        displayName: "Sent Items",
        parentFolderId: "AQMkADYAAAIBCAAAAA==",
        childFolderCount: 0,
        unreadItemCount: 0,
        totalItemCount: 0,
        isHidden: false,
      },
    ],
  } as PaginatedResponse<MailSearchFolder & ODataAttrs>,
};






export const createMailFolderExamplePayload = {
  data: {
    id: "AQMkADYAAAIBDAAAAA==",
    displayName: "Project Files",
    parentFolderId: "AQMkADYAAAIBCAAAAA==",
    childFolderCount: 0,
    unreadItemCount: 0,
    totalItemCount: 0,
    isHidden: false,
  } as MailSearchFolder,
};








export const deleteMailFolderExamplePayload = { data: null };










export const listMessagesExamplePayload = {
  data: {
    "@odata.context":
      "https://graph.microsoft.com/v1.0/$metadata#users('bb8775a4-4d8c-42cf-a1d4-4d58c2bb668f')/messages(sender,subject)",
    value: [
      {
        "@odata.etag": 'W/"CQAAABYAAADHcgC8Hl9tRZ/hc1wEUs1TAAAwR4Hg"',
        id: "AAMkAGUAAAwTW09AAA=",
        subject: "You have late tasks!",
        sender: {
          emailAddress: {
            name: "Microsoft Planner",
            address: "noreply@Planner.Office365.com",
          },
        },
      },
    ],
  } as PaginatedResponse<Message & ODataAttrs>,
};










export const getMessageByIdExamplePayload = {
  data: {
    message: {
      headers: {
        "mime-version": "1.0",
        date: "2022-09-19T20:09:01.000Z",
        "message-id": "<Test-message-id@mail.outlook.com>",
        subject: "Test Message",
        from: {
          value: [{ address: "example@outlook.com", name: "Example Example" }],
          html: '<span class="mp_address_group"><span class="mp_address_name">Example Example</span> &lt;<a href="mailto:example@gmail.com" class="mp_address_email">example@gmail.com</a>&gt;</span>',
          text: "Example Example <example@outlook.com>",
        },
        to: {
          value: [{ address: "example@outlook.com", name: "Example Example" }],
          html: '<span class="mp_address_group"><span class="mp_address_name">Example Example</span> &lt;<a href="mailto:example@gmail.com" class="mp_address_email">example@gmail.com</a>&gt;</span>',
          text: "Example Example <example@outlook.com>",
        },
        "content-type": {
          value: "multipart/mixed",
          params: { boundary: "000000000000680fa005e90d488f" },
        },
      } as Record<string, unknown>,
      attachments: [] as Array<{ contentType: string; data: unknown }>,
      text: "Example email body" as string | undefined,
      html: '<div dir="ltr">Example email body<div><br></div></div>\n' as string | false,
    },
    rawMessage: "Raw MIME message",
  },
};








export const sendMessageExamplePayload = { data: null };








export const deleteMessageExamplePayload = { data: null };










export const createEventSubscriptionExamplePayload = {
  data: {
    id: "e9d5b726-4478-4412-bfba-268530484566",
    resource: "me/events",
    changeType: "updated",
    notificationUrl: "https://example.com/webhook/",
    expirationDateTime: "2024-12-31T23:59:59.999Z",
    creatorId: "c8edbeda-c453-446c-91ce-c6d5c7310a6c",
    latestSupportedTlsVersion: "v1_2",
  } as Subscription,
};






export const createMailFolderSubscriptionExamplePayload = {
  data: {
    id: "7f105c7d-2dc5-4530-97cd-4e7ae6534c07",
    resource: "me/mailFolders('Inbox')/messages",
    changeType: "created,updated",
    notificationUrl: "https://example.com/webhook/",
    expirationDateTime: "2024-12-31T23:59:59.999Z",
    creatorId: "c8edbeda-c453-446c-91ce-c6d5c7310a6c",
    latestSupportedTlsVersion: "v1_2",
  } as Subscription,
};






export const listSubscriptionsExamplePayload = {
  data: {
    "@odata.context": "https://graph.microsoft.com/v1.0/$metadata#subscriptions",
    value: [
      {
        id: "e9d5b726-4478-4412-bfba-268530484566",
        resource: "me/events",
        changeType: "updated",
        clientState: null,
        notificationUrl: "https://example.com/webhook/",
        notificationQueryOptions: null,
        lifecycleNotificationUrl: null,
        expirationDateTime: "2024-12-31T23:59:59.999Z",
        creatorId: "c8edbeda-c453-446c-91ce-c6d5c7310a6c",
        includeResourceData: null,
        latestSupportedTlsVersion: "v1_2",
        encryptionCertificate: null,
        encryptionCertificateId: null,
        notificationUrlAppId: null,
      },
    ],
  } as PaginatedResponse<Subscription>,
};






export const updateEventSubscriptionExamplePayload = {
  data: {
    id: "e9d5b726-4478-4412-bfba-268530484566",
    resource: "me/events",
    changeType: "updated",
    notificationUrl: "https://example.com/webhook/",
    expirationDateTime: "2024-12-31T23:59:59.999Z",
    creatorId: "c8edbeda-c453-446c-91ce-c6d5c7310a6c",
    latestSupportedTlsVersion: "v1_2",
  } as Subscription,
};








export const deleteSubscriptionExamplePayload = { data: null };








export const deleteAllInstanceSubscriptionsExamplePayload = {
  data: {
    subscriptionsRemoved: [
      "26ebd1e9-c54a-4bbe-9583-fc05974952a4",
      "b9b27172-ee2e-4248-86df-fc98cb71d914",
    ],
  },
};












export const listSupportedLanguagesExamplePayload = {
  data: {
    "@odata.context":
      "https://graph.microsoft.com/v1.0/$metadata#Collection(microsoft.graph.localeInfo)",
    value: [
      {
        locale: "en-US",
        displayName: "English (United States)",
      },
      {
        locale: "es-ES",
        displayName: "Spanish (Spain)",
      },
    ],
  },
};








export const listSupportedTimezonesExamplePayload = {
  data: {
    "@odata.context":
      "https://graph.microsoft.com/v1.0/$metadata#Collection(microsoft.graph.timeZoneInformation)",
    value: [
      {
        alias: "Eastern Standard Time",
        displayName: "(UTC-05:00) Eastern Time (US & Canada)",
      },
      {
        alias: "Pacific Standard Time",
        displayName: "(UTC-08:00) Pacific Time (US & Canada)",
      },
    ],
  },
};










export const getCurrentUserExamplePayload = {
  data: {
    businessPhones: ["+1 555 555 5555"],
    displayName: "John Doe",
    givenName: "John",
    jobTitle: "Manager",
    mail: "john.doe@example.com",
    mobilePhone: "+1 555 555 5555",
    officeLocation: "example",
    preferredLanguage: "en-US",
    surname: "Doe",
    id: "3693-4789-a1c3-f4de565f",
  },
};













export const rawRequestExamplePayload = {
  data: {
    "@odata.context": "https://graph.microsoft.com/v1.0/$metadata#me/calendars",
    value: [
      {
        id: "AAMkAGI2TGuLAAA=",
        name: "Calendar",
        color: "auto",
        changeKey: "nfZyf7VcrEKLNoU37KWlkQAAA0x0+w==",
        canShare: true,
        canViewPrivateItems: true,
        canEdit: true,
        owner: {
          name: "John Doe",
          address: "john.doe@example.com",
        },
      },
    ],
  },
};


















export const webhookTriggerExamplePayload = {
  payload: {
    headers: {
      "Content-Type": "application/json",
    },
    queryParameters: {},
    rawBody: {
      data: "",
      contentType: "application/json",
    },
    body: {
      data: {
        value: [
          {
            subscriptionId: "e9d5b726-4478-4412-bfba-268530484566",
            subscriptionExpirationDateTime: "2024-12-31T23:59:59.999Z",
            changeType: "updated",
            resource: "Users/{user-id}/Events/{event-id}",
            resourceData: {
              "@odata.type": "#Microsoft.Graph.Event",
              "@odata.id": "Users/{user-id}/Events/{event-id}",
              "@odata.etag": 'W/"CQAAABYAAADHcgC8Hl9tRZ/hc1wEUs1TAAAwR4Hg"',
              id: "AAMkAGIAAAoZDOFAAA=",
            },
            clientState: "secretClientValue",
            tenantId: "1717622f-1d94-4d0c-9d74-709fad664b77",
          },
        ],
      },
      contentType: "application/json",
    },
    pathFragment: "",
    webhookUrls: {
      "Webhook Flow": "https://hooks.example.com/trigger/EXAMPLE",
    },
    webhookApiKeys: {
      "Webhook Flow": ["example-api-key"],
    },
    invokeUrl: "https://hooks.example.com/trigger/EXAMPLE",
    executionId: "SW5zdGFuY2VFeGVjdXRpb246MTIzNDU=",
    customer: {
      id: "Q3VzdG9tZXI6MTIzNDU=",
      externalId: "example-customer-external-id",
      name: "Example Customer",
    },
    instance: {
      id: "SW5zdGFuY2U6MTIzNDU=",
      name: "Example Instance",
    },
    user: {
      id: "VXNlcjoxMjM0NQ==",
      externalId: "example-user-external-id",
      name: "Example User",
      email: "user@example.com",
    },
  } as unknown as TriggerPayload,
  branch: "Notification",
};











export const webhookLifecycleTriggerExamplePayload = {
  payload: {
    headers: {
      "Content-Type": "application/json",
    },
    queryParameters: {},
    rawBody: {
      data: "",
      contentType: "application/json",
    },
    body: {
      data: {
        value: [
          {
            subscriptionId: "e9d5b726-4478-4412-bfba-268530484566",
            subscriptionExpirationDateTime: "2024-12-31T23:59:59.999Z",
            changeType: "updated",
            resource: "me/events/AAMkAGIAAAoZDOFAAA=",
            resourceData: {
              "@odata.type": "#Microsoft.Graph.Event",
              "@odata.id": "me/events/AAMkAGIAAAoZDOFAAA=",
              "@odata.etag": 'W/"ZlnW4RIAV06KYYwlrfNZvQAAKGWwbw=="',
              id: "AAMkAGIAAAoZDOFAAA=",
            },
            clientState: "secretClientValue",
            tenantId: "1717622f-1d94-4d0c-9d74-709fad664b77",
          },
        ],
      },
      contentType: "application/json",
    },
    pathFragment: "",
    webhookUrls: {
      "Calendar Event Webhook Flow": "https://hooks.example.com/trigger/EXAMPLE",
    },
    webhookApiKeys: {
      "Calendar Event Webhook Flow": ["example-api-key"],
    },
    invokeUrl: "https://hooks.example.com/trigger/EXAMPLE",
    executionId: "SW5zdGFuY2VFeGVjdXRpb246MTIzNDU=",
    customer: {
      id: "Q3VzdG9tZXI6MTIzNDU=",
      externalId: "example-customer-external-id",
      name: "Example Customer",
    },
    instance: {
      id: "SW5zdGFuY2U6MTIzNDU=",
      name: "Example Instance",
    },
    user: {
      id: "VXNlcjoxMjM0NQ==",
      externalId: "example-user-external-id",
      name: "Example User",
      email: "user@example.com",
    },
  } as unknown as TriggerPayload,
  branch: "Notification",
};












export const mailFolderWebhookTriggerExamplePayload = {
  payload: {
    headers: {
      "Content-Type": "application/json",
    },
    queryParameters: {},
    rawBody: {
      data: "",
      contentType: "application/json",
    },
    body: {
      data: {
        value: [
          {
            subscriptionId: "7f105c7d-2dc5-4530-97cd-4e7ae6534c07",
            subscriptionExpirationDateTime: "2024-12-31T23:59:59.999Z",
            changeType: "created",
            resource: "me/mailFolders('Inbox')/messages/AAMkAGUAAAwTW09AAA=",
            resourceData: {
              "@odata.type": "#Microsoft.Graph.Message",
              "@odata.id": "me/mailFolders('Inbox')/messages/AAMkAGUAAAwTW09AAA=",
              "@odata.etag": 'W/"CQAAABYAAADHcgC8Hl9tRZ/hc1wEUs1TAAAwR4Hg"',
              id: "AAMkAGUAAAwTW09AAA=",
            },
            clientState: "secretClientValue",
            tenantId: "1717622f-1d94-4d0c-9d74-709fad664b77",
          },
        ],
      },
      contentType: "application/json",
    },
    pathFragment: "",
    webhookUrls: {
      "Mail Message Webhook Flow": "https://hooks.example.com/trigger/EXAMPLE",
    },
    webhookApiKeys: {
      "Mail Message Webhook Flow": ["example-api-key"],
    },
    invokeUrl: "https://hooks.example.com/trigger/EXAMPLE",
    executionId: "SW5zdGFuY2VFeGVjdXRpb246MTIzNDU=",
    customer: {
      id: "Q3VzdG9tZXI6MTIzNDU=",
      externalId: "example-customer-external-id",
      name: "Example Customer",
    },
    instance: {
      id: "SW5zdGFuY2U6MTIzNDU=",
      name: "Example Instance",
    },
    user: {
      id: "VXNlcjoxMjM0NQ==",
      externalId: "example-user-external-id",
      name: "Example User",
      email: "user@example.com",
    },
  } as unknown as TriggerPayload,
  branch: "Notification",
};













export const pollChangesTriggerExamplePayload = {
  payload: {
    headers: {},
    queryParameters: {},
    rawBody: {
      data: "",
      contentType: "application/json",
    },
    body: {
      data: {
        created: [
          {
            "@odata.etag": 'W/"CQAAABYAAADHcgC8Hl9tRZ/hc1wEUs1TAAAwR4Hg"',
            id: "AAMkAGUAAAwTW09AAA=",
            subject: "Welcome to the project",
            createdDateTime: "2026-05-20T14:20:00Z",
            lastModifiedDateTime: "2026-05-20T14:20:00Z",
            sender: {
              emailAddress: {
                name: "Samantha Booth",
                address: "samanthab@adatum.onmicrosoft.com",
              },
            },
            from: {
              emailAddress: {
                name: "Samantha Booth",
                address: "samanthab@adatum.onmicrosoft.com",
              },
            },
            toRecipients: [
              {
                emailAddress: {
                  name: "John Doe",
                  address: "john.doe@example.com",
                },
              },
            ],
          },
        ],
        updated: [
          {
            "@odata.etag": 'W/"ZlnW4RIAV06KYYwlrfNZvQAAKGWwbw=="',
            id: "AAMkAGIAAAoZDOFAAA=",
            subject: "You have late tasks!",
            createdDateTime: "2026-05-12T09:00:00Z",
            lastModifiedDateTime: "2026-05-20T13:15:00Z",
            sender: {
              emailAddress: {
                name: "Microsoft Planner",
                address: "noreply@Planner.Office365.com",
              },
            },
            from: {
              emailAddress: {
                name: "Microsoft Planner",
                address: "noreply@Planner.Office365.com",
              },
            },
            toRecipients: [
              {
                emailAddress: {
                  name: "John Doe",
                  address: "john.doe@example.com",
                },
              },
            ],
          },
        ],
      },
      contentType: "application/json",
    },
    pathFragment: "",
    webhookUrls: {
      "Polling Flow": "https://hooks.example.com/trigger/EXAMPLE",
    },
    webhookApiKeys: {
      "Polling Flow": ["example-api-key"],
    },
    invokeUrl: "https://hooks.example.com/trigger/EXAMPLE",
    executionId: "SW5zdGFuY2VFeGVjdXRpb246MTIzNDU=",
    customer: {
      id: "Q3VzdG9tZXI6MTIzNDU=",
      externalId: "example-customer-external-id",
      name: "Example Customer",
    },
    instance: {
      id: "SW5zdGFuY2U6MTIzNDU=",
      name: "Example Instance",
    },
    user: {
      id: "VXNlcjoxMjM0NQ==",
      externalId: "example-user-external-id",
      name: "Example User",
      email: "user@example.com",
    },
  } as unknown as TriggerPayload,
  polledNoChanges: false as boolean | undefined,
};
