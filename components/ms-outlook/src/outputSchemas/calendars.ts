import {
  dateTimeTimeZoneSchema,
  daysOfWeekArray,
  emailAddressSchema,
  nullableBoolean,
  nullableEnum,
  nullableString,
  ONLINE_MEETING_PROVIDERS,
} from "./shared";

const calendarSchema = {
  type: "object" as const,
  properties: {
    "@odata.id": nullableString,
    allowedOnlineMeetingProviders: {
      type: "array" as const,
      items: { type: "string", enum: ONLINE_MEETING_PROVIDERS },
    },
    canEdit: nullableBoolean,
    canShare: nullableBoolean,
    canViewPrivateItems: nullableBoolean,
    changeKey: nullableString,
    color: nullableEnum([
      "auto",
      "lightBlue",
      "lightGreen",
      "lightOrange",
      "lightGray",
      "lightYellow",
      "lightTeal",
      "lightPink",
      "lightBrown",
      "lightRed",
      "maxColor",
    ]),
    defaultOnlineMeetingProvider: nullableEnum(ONLINE_MEETING_PROVIDERS),
    hexColor: nullableString,
    id: { type: "string" },
    isDefaultCalendar: nullableBoolean,
    isRemovable: nullableBoolean,
    isSharedWithMe: nullableBoolean,
    isTallyingResponses: nullableBoolean,
    name: nullableString,
    owner: emailAddressSchema,
  },
  required: ["id"],
};

const calendarEntitySchema = {
  ...calendarSchema,
  properties: {
    "@odata.context": nullableString,
    ...calendarSchema.properties,
  },
};

export const listCalendarsOutputSchema = {
  type: "object" as const,
  properties: {
    "@odata.context": nullableString,
    value: { type: "array" as const, items: calendarSchema },
    "@odata.nextLink": nullableString,
  },
  required: ["value"],
};

export const createCalendarOutputSchema = calendarEntitySchema;

export const updateCalendarOutputSchema = calendarEntitySchema;

const scheduleItemSchema = {
  type: "object" as const,
  properties: {
    start: dateTimeTimeZoneSchema,
    end: dateTimeTimeZoneSchema,
    isPrivate: nullableBoolean,
    location: nullableString,
    status: nullableEnum(["free", "tentative", "busy", "oof", "workingElsewhere", "unknown"]),
    subject: nullableString,
  },
};

const scheduleInformationSchema = {
  type: "object" as const,
  properties: {
    availabilityView: nullableString,
    error: {
      type: ["object", "null"],
      properties: {
        message: nullableString,
        responseCode: nullableString,
      },
    },
    scheduleId: nullableString,
    scheduleItems: { type: "array" as const, items: scheduleItemSchema },
    workingHours: {
      type: ["object", "null"],
      properties: {
        daysOfWeek: daysOfWeekArray,
        startTime: nullableString,
        endTime: nullableString,
        timeZone: {
          type: ["object", "null"],
          properties: {
            name: nullableString,
          },
          additionalProperties: true,
        },
      },
    },
  },
};

export const getScheduleOutputSchema = {
  type: "object" as const,
  properties: {
    "@odata.context": nullableString,
    value: { type: "array" as const, items: scheduleInformationSchema },
  },
  required: ["value"],
};
