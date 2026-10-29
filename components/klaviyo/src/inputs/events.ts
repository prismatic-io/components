import { input, structuredObjectInput, util } from "@prismatic-io/spectral";
import { connection, fields } from "./common";
import {
  FIELDS_EVENT_MODEL,
  FIELDS_METRIC_MODEL,
  FIELDS_PROFILE_EVENT_MODEL,
} from "../constants";
import {
  cleanCodeInput,
  cleanCodeInputOrEmptyObject,
  cleanDate,
  cleanNumberInput,
  cleanStringInput,
} from "../util";
const fieldsEvent = input({
  ...fields,
  label: "Event Fields",
  comments: "Event fields to include in the response.",
  model: FIELDS_EVENT_MODEL,
});
const fieldsMetric = input({
  ...fields,
  label: "Metric Fields",
  comments: "Metric fields to include in the response.",
  model: FIELDS_METRIC_MODEL,
});
const fieldsProfile = input({
  ...fields,
  label: "Profile Fields",
  comments: "Profile fields to include in the response.",
  model: FIELDS_PROFILE_EVENT_MODEL,
});
export const listEventsInputs = {
  connection,
  fieldsEvent,
  fieldsMetric,
  fieldsProfile,
};
const eventProperties = input({
  label: "Event Properties",
  comments: "A JSON object of custom key-value pairs to attach to the event.",
  type: "code",
  language: "json",
  placeholder: "Enter event properties as JSON",
  required: true,
  example: JSON.stringify(
    {
      newKey: "New Value",
    },
    null,
    2,
  ),
  clean: (value) => cleanCodeInputOrEmptyObject(value, "Event Properties"),
});
const eventTime = input({
  label: "Time",
  comments:
    "When this event occurred, as an ISO 8601 datetime. By default, the time the request was received will be used.",
  type: "string",
  required: false,
  example: "2024-07-10T14:48:00.000Z",
  placeholder: "Enter a timestamp (ISO 8601)",
  clean: (value) => cleanDate(value, "Time"),
});
const eventValue = input({
  label: "Value",
  comments: "A numeric, monetary value to associate with this event.",
  type: "string",
  required: false,
  example: "10",
  placeholder: "Enter a numeric value",
  clean: cleanNumberInput,
});
const eventValueCurrency = input({
  label: "Value Currency",
  comments:
    "The ISO 4217 currency code of the value associated with the event.",
  type: "string",
  required: false,
  example: "USD",
  placeholder: "Enter a currency code",
  clean: cleanStringInput,
});
const eventUniqueId = input({
  label: "Unique ID",
  comments:
    "A deduplication key for the event. When the same unique ID is sent again for the same profile and metric, only the first event is recorded.",
  type: "string",
  required: false,
  example: "123",
  placeholder: "Enter a unique event ID",
  clean: cleanStringInput,
});
const eventName = input({
  label: "Event Name",
  comments: "The metric name that identifies this event type.",
  type: "string",
  required: true,
  example: "Viewed Product",
  placeholder: "Enter an event name",
  clean: util.types.toString,
});
const eventProfile = input({
  label: "Event Profile",
  comments:
    "The profile the event is attributed to, as a JSON object of profile attributes. Include email or phoneNumber to identify the profile.",
  type: "code",
  language: "json",
  placeholder: "Enter profile attributes as JSON",
  required: true,
  example: JSON.stringify(
    {
      phoneNumber: "+15005550006",
      firstName: "Sarah",
      lastName: "Mason",
      organization: "Example Corporation",
      title: "Regional Manager",
      image:
        "https://images.pexels.com/photos/3760854/pexels-photo-3760854.jpeg",
      location: {
        address1: "89 E 42nd St",
        address2: "1st floor",
        city: "New York",
        country: "United States",
        region: "NY",
        zip: "10017",
        timezone: "America/New_York",
        ip: "127.0.0.1",
      },
      properties: {
        newKey: "New Value",
      },
      meta: {
        patchProperties: {
          append: {
            newKey: "New Value",
          },
          unappend: {
            newKey: "New Value",
          },
          unset: ["skus"],
        },
      },
      email: "sarah.mason@klaviyo-demo.com",
    },
    null,
    2,
  ),
  clean: (value) => cleanCodeInput(value, "Event Profile"),
});
const eventFields = structuredObjectInput({
  label: "Event Details",
  required: false,
  comments: "Timestamp, monetary value, currency, and unique ID.",
  inputs: { eventTime, eventValue, eventValueCurrency, eventUniqueId },
});
export const createEventInputs = {
  connection,
  eventName,
  eventProfile,
  eventProperties,
  eventFields,
};
const eventId = input({
  label: "Event ID",
  comments: "The unique identifier for the event.",
  type: "string",
  required: true,
  example: "5nJKMJuHUQy",
  placeholder: "Enter an event ID",
  dataSource: "selectEvent",
  clean: util.types.toString,
});
export const getEventInputs = {
  connection,
  eventId,
  fieldsEvent,
  fieldsMetric,
  fieldsProfile,
};
const eventsArray = input({
  label: "Events Array",
  comments: "An array of events to create.",
  type: "code",
  language: "json",
  placeholder: "Enter events as a JSON array",
  required: true,
  example: JSON.stringify(
    [
      {
        type: "event-bulk-create",
        attributes: {
          profile: {
            data: {
              type: "profile",
              attributes: {
                email: "sarah.mason@klaviyo-demo.com",
                phoneNumber: "+15005550006",
                firstName: "Sarah",
                lastName: "Mason",
                organization: "Example Corporation",
                title: "Regional Manager",
                image:
                  "https://images.pexels.com/photos/3760854/pexels-photo-3760854.jpeg",
                location: {
                  address1: "89 E 42nd St",
                  address2: "1st floor",
                  city: "New York",
                  country: "United States",
                  latitude: "40.7128",
                  longitude: "74.0060",
                  region: "NY",
                  zip: "10017",
                  timezone: "America/New_York",
                  ip: "127.0.0.1",
                },
              },
              meta: {
                patchProperties: {
                  unset: ["skus"],
                },
              },
            },
          },
          events: {
            data: [
              {
                type: "event",
                attributes: {
                  properties: {
                    newKey: "New Value",
                  },
                  time: null,
                  value: 9.99,
                  valueCurrency: "USD",
                  metric: {
                    data: {
                      type: "metric",
                      attributes: {
                        name: "Viewed Product",
                      },
                    },
                  },
                  uniqueId: "123",
                },
              },
            ],
          },
        },
      },
    ],
    null,
    2,
  ),
  clean: (value) => cleanCodeInput(value, "Events Array"),
});
export const bulkCreateEventsInputs = {
  connection,
  eventsArray,
};
