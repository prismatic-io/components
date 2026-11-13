import {
  attendeeSchema,
  dateTimeTimeZoneSchema,
  itemBodySchema,
  locationSchema,
  nullableBoolean,
  nullableDateTime,
  nullableEnum,
  nullableInteger,
  nullableString,
  ONLINE_MEETING_PROVIDERS,
  onlineMeetingInfoSchema,
  patternedRecurrenceSchema,
  recipientSchema,
  responseStatusSchema,
  stringArray,
  deleteResultSchema,
} from "./shared";

const eventSchema = {
  type: "object" as const,
  properties: {
    "@odata.etag": nullableString,
    allowNewTimeProposals: nullableBoolean,
    attendees: { type: "array" as const, items: attendeeSchema },
    body: itemBodySchema,
    bodyPreview: nullableString,
    cancelledOccurrences: stringArray,
    categories: stringArray,
    changeKey: nullableString,
    createdDateTime: nullableDateTime,
    end: dateTimeTimeZoneSchema,
    hasAttachments: nullableBoolean,
    hideAttendees: nullableBoolean,
    iCalUId: nullableString,
    id: { type: "string" },
    importance: nullableEnum(["low", "normal", "high"]),
    isAllDay: nullableBoolean,
    isCancelled: nullableBoolean,
    isDraft: nullableBoolean,
    isOnlineMeeting: nullableBoolean,
    isOrganizer: nullableBoolean,
    isReminderOn: nullableBoolean,
    lastModifiedDateTime: nullableDateTime,
    location: locationSchema,
    locations: { type: "array" as const, items: locationSchema },
    onlineMeeting: onlineMeetingInfoSchema,
    onlineMeetingProvider: nullableEnum(ONLINE_MEETING_PROVIDERS),
    onlineMeetingUrl: nullableString,
    organizer: recipientSchema,
    originalEndTimeZone: nullableString,
    originalStart: nullableDateTime,
    originalStartTimeZone: nullableString,
    recurrence: patternedRecurrenceSchema,
    reminderMinutesBeforeStart: nullableInteger,
    responseRequested: nullableBoolean,
    responseStatus: responseStatusSchema,
    sensitivity: nullableEnum(["normal", "personal", "private", "confidential"]),
    seriesMasterId: nullableString,
    showAs: nullableEnum(["free", "tentative", "busy", "oof", "workingElsewhere", "unknown"]),
    start: dateTimeTimeZoneSchema,
    subject: nullableString,
    transactionId: nullableString,
    type: nullableEnum(["singleInstance", "occurrence", "exception", "seriesMaster"]),
    webLink: nullableString,
  },
  required: ["id"],
};

const eventEntitySchema = {
  ...eventSchema,
  properties: {
    "@odata.context": nullableString,
    ...eventSchema.properties,
  },
};

export const getCalendarEventOutputSchema = eventEntitySchema;

export const listEventsOutputSchema = {
  type: "object" as const,
  properties: {
    "@odata.context": nullableString,
    value: { type: "array" as const, items: eventSchema },
    "@odata.nextLink": nullableString,
  },
  required: ["value"],
};

export const createEventOutputSchema = eventEntitySchema;

export const updateEventOutputSchema = eventEntitySchema;

export const deleteEventOutputSchema = deleteResultSchema;

export const cancelEventOutputSchema = deleteResultSchema;
