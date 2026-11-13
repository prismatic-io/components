import type { Calendar, Event, ScheduleInformation } from "@microsoft/microsoft-graph-types";
import type { ODataAttrs, PaginatedResponse } from "../types";

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

export const deleteCalendarExamplePayload = {
  data: { success: true, id: "AAMkAGI2TGuLAAA=", message: "Calendar deleted successfully" },
};

export const getCalendarEventExamplePayload = {
  data: {
    "@odata.context":
      "https://graph.microsoft.com/v1.0/$metadata#users('cd209b0b-3f83-4c35-82d2-d88a61820480')/events/$entity",
    "@odata.etag": 'W/"ZlnW4RIAV06KYYwlrfNZvQAAKGWwbw=="',
    id: "AAMkAGIAAAoZDOFAAA=",
    createdDateTime: "2026-10-14T17:45:11.4387213Z",
    lastModifiedDateTime: "2026-10-14T17:46:02.8714302Z",
    changeKey: "ZlnW4RIAV06KYYwlrfNZvQAAKGWwbw==",
    categories: [],
    transactionId: "7E163156-7762-4BEB-A1C6-729EA81755A7",
    originalStartTimeZone: "Pacific Standard Time",
    originalEndTimeZone: "Pacific Standard Time",
    iCalUId:
      "040000008200E00074C5B7101A82E00800000000DA2B357D94D9DC01000000000000000010000000EBE1B3A6C0E3E64A8C0C8F4B1E3F0A2D",
    reminderMinutesBeforeStart: 15,
    isReminderOn: true,
    hasAttachments: false,
    subject: "Quarterly planning review",
    bodyPreview: "Let's review the Q1 roadmap and agree on owners for each initiative.",
    importance: "normal",
    sensitivity: "normal",
    isAllDay: false,
    isCancelled: false,
    isOrganizer: true,
    responseRequested: true,
    seriesMasterId: null,
    showAs: "busy",
    type: "singleInstance",
    webLink:
      "https://outlook.office365.com/owa/?itemid=AAMkAGIAAAoZDOFAAA%3D&exvsurl=1&path=/calendar/item",
    onlineMeetingUrl: null,
    isOnlineMeeting: false,
    onlineMeetingProvider: "unknown",
    allowNewTimeProposals: true,
    isDraft: false,
    hideAttendees: false,
    responseStatus: {
      response: "organizer",
      time: "0001-01-01T00:00:00Z",
    },
    body: {
      contentType: "html",
      content:
        "<html><head></head><body><p>Let's review the Q1 roadmap and agree on owners for each initiative.</p></body></html>",
    },
    start: {
      dateTime: "2026-11-12T10:00:00.0000000",
      timeZone: "Pacific Standard Time",
    },
    end: {
      dateTime: "2026-11-12T11:00:00.0000000",
      timeZone: "Pacific Standard Time",
    },
    location: {
      displayName: "Conference Room A",
      locationType: "default",
      uniqueId: "Conference Room A",
      uniqueIdType: "private",
    },
    locations: [
      {
        displayName: "Conference Room A",
        locationType: "default",
        uniqueId: "Conference Room A",
        uniqueIdType: "private",
      },
    ],
    recurrence: null,
    attendees: [
      {
        type: "required",
        status: {
          response: "accepted",
          time: "2026-10-14T18:02:37Z",
        },
        emailAddress: {
          name: "Jane Smith",
          address: "jane.smith@example.com",
        },
      },
    ],
    organizer: {
      emailAddress: {
        name: "John Doe",
        address: "john.doe@example.com",
      },
    },
    onlineMeeting: null,
  } as Event & ODataAttrs,
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

export const selectCalendarExamplePayload = {
  result: [{ label: "Calendar", key: "AAMkAGI2TGuLAAA=" }],
};
