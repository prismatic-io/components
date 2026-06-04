import { input } from "@prismatic-io/spectral";
import { connection, fields } from "./shared";
import {
  FIELDS_EVENT_MODEL,
  FIELDS_METRIC_MODEL,
  FIELDS_PROFILE_EVENT_MODEL,
} from "../constants";
import {
  cleanCodeInput,
  cleanDate,
  cleanNumberInput,
  cleanStringInput,
} from "../utils";

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
  comments: "The properties of the event.",
  type: "code",
  language: "json",
  required: true,
  example: JSON.stringify(
    {
      newKey: "New Value",
    },
    null,
    2,
  ),
  clean: (value) => cleanCodeInput(value, "Event Properties"),
});

const eventTime = input({
  label: "Event Time",
  comments:
    "When this event occurred. By default, the time the request was received will be used.",
  type: "string",
  required: false,
  example: "2024-07-10T14:48:00.000Z",
  placeholder: "2024-07-10T14:48:00.000Z",
  clean: (value) => cleanDate(value, "Event Time"),
});

const eventValue = input({
  label: "Event Value",
  comments: "A numeric, monetary value to associate with this event.",
  type: "string",
  required: false,
  example: "10",
  placeholder: "10",
  clean: cleanNumberInput,
});

const eventValueCurrency = input({
  label: "Event Value Currency",
  comments:
    "The ISO 4217 currency code of the value associated with the event.",
  type: "string",
  required: false,
  example: "USD",
  placeholder: "USD",
  clean: cleanStringInput,
});

const eventUniqueId = input({
  label: "Event Unique ID",
  comments: "A unique identifier for this event.",
  type: "string",
  required: false,
  example: "123",
  placeholder: "123",
  clean: cleanStringInput,
});

const eventName = input({
  label: "Event Name",
  comments: "Name of the event.",
  type: "string",
  required: true,
  example: "Viewed Product",
  placeholder: "Viewed Product",
  clean: cleanStringInput,
});

const eventProfile = input({
  label: "Event Profile",
  comments: "The profile associated with this event.",
  type: "code",
  language: "json",
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

export const createEventInputs = {
  connection,
  eventName,
  eventProfile,
  eventProperties,
  eventTime,
  eventValue,
  eventValueCurrency,
  eventUniqueId,
};

const eventId = input({
  label: "Event ID",
  comments: "The ID of the event.",
  type: "string",
  required: true,
  example: "5nJKMJuHUQy",
  placeholder: "5nJKMJuHUQy",
  dataSource: "selectEvent",
  clean: cleanStringInput,
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
