export const nullableString = { type: ["string", "null"] };
export const nullableDateTime = { type: ["string", "null"], format: "date-time" };
export const nullableBoolean = { type: ["boolean", "null"] };
export const nullableInteger = { type: ["integer", "null"] };
export const nullableNumber = { type: ["number", "null"] };
export const stringArray = { type: "array" as const, items: { type: "string" } };

export const deleteResultSchema = {
  type: "object" as const,
  properties: {
    success: { type: "boolean", enum: [true] },
    id: { type: "string" },
    message: { type: "string" },
  },
  required: ["success", "id", "message"],
};

export const nullableEnum = (values: string[]) => ({
  type: ["string", "null"],
  enum: [...values, null],
});

const DAYS_OF_WEEK = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

export const daysOfWeekArray = {
  type: "array" as const,
  items: { type: "string", enum: DAYS_OF_WEEK },
};

export const emailAddressSchema = {
  type: ["object", "null"],
  properties: {
    address: nullableString,
    name: nullableString,
  },
};

export const recipientSchema = {
  type: ["object", "null"],
  properties: {
    emailAddress: emailAddressSchema,
  },
};

export const recipientArray = { type: "array" as const, items: recipientSchema };

export const dateTimeTimeZoneSchema = {
  type: ["object", "null"],
  properties: {
    dateTime: nullableString,
    timeZone: nullableString,
  },
};

export const itemBodySchema = {
  type: ["object", "null"],
  properties: {
    content: nullableString,
    contentType: nullableEnum(["text", "html"]),
  },
};

export const responseStatusSchema = {
  type: ["object", "null"],
  properties: {
    response: nullableEnum([
      "none",
      "organizer",
      "tentativelyAccepted",
      "accepted",
      "declined",
      "notResponded",
    ]),
    time: nullableDateTime,
  },
};

export const ONLINE_MEETING_PROVIDERS = [
  "unknown",
  "skypeForBusiness",
  "skypeForConsumer",
  "teamsForBusiness",
];

const physicalAddressSchema = {
  type: ["object", "null"],
  properties: {
    city: nullableString,
    countryOrRegion: nullableString,
    postalCode: nullableString,
    state: nullableString,
    street: nullableString,
  },
};

const geoCoordinatesSchema = {
  type: ["object", "null"],
  properties: {
    accuracy: nullableNumber,
    altitude: nullableNumber,
    altitudeAccuracy: nullableNumber,
    latitude: nullableNumber,
    longitude: nullableNumber,
  },
};

export const locationSchema = {
  type: ["object", "null"],
  properties: {
    address: physicalAddressSchema,
    coordinates: geoCoordinatesSchema,
    displayName: nullableString,
    locationEmailAddress: nullableString,
    locationUri: nullableString,
    locationType: nullableEnum([
      "default",
      "conferenceRoom",
      "homeAddress",
      "businessAddress",
      "geoCoordinates",
      "streetAddress",
      "hotel",
      "restaurant",
      "localBusiness",
      "postalAddress",
    ]),
    uniqueId: nullableString,
    uniqueIdType: nullableString,
  },
};

export const attendeeSchema = {
  type: ["object", "null"],
  properties: {
    emailAddress: emailAddressSchema,
    proposedNewTime: {
      type: ["object", "null"],
      properties: {
        start: dateTimeTimeZoneSchema,
        end: dateTimeTimeZoneSchema,
      },
    },
    status: responseStatusSchema,
    type: nullableEnum(["required", "optional", "resource"]),
  },
};

export const patternedRecurrenceSchema = {
  type: ["object", "null"],
  properties: {
    pattern: {
      type: ["object", "null"],
      properties: {
        dayOfMonth: nullableInteger,
        daysOfWeek: daysOfWeekArray,
        firstDayOfWeek: nullableEnum(DAYS_OF_WEEK),
        index: nullableEnum(["first", "second", "third", "fourth", "last"]),
        interval: nullableInteger,
        month: nullableInteger,
        type: nullableEnum([
          "daily",
          "weekly",
          "absoluteMonthly",
          "relativeMonthly",
          "absoluteYearly",
          "relativeYearly",
        ]),
      },
    },
    range: {
      type: ["object", "null"],
      properties: {
        endDate: nullableString,
        numberOfOccurrences: nullableInteger,
        recurrenceTimeZone: nullableString,
        startDate: nullableString,
        type: nullableEnum(["endDate", "noEnd", "numbered"]),
      },
    },
  },
};

export const onlineMeetingInfoSchema = {
  type: ["object", "null"],
  properties: {
    conferenceId: nullableString,
    joinUrl: nullableString,
    phones: {
      type: "array" as const,
      items: {
        type: "object" as const,
        properties: {
          number: nullableString,
          type: nullableEnum([
            "home",
            "business",
            "mobile",
            "other",
            "assistant",
            "homeFax",
            "businessFax",
            "otherFax",
            "pager",
            "radio",
          ]),
        },
      },
    },
    quickDial: nullableString,
    tollFreeNumbers: stringArray,
    tollNumber: nullableString,
  },
};
