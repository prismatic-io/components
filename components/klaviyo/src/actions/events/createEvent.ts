import { action } from "@prismatic-io/spectral";
import { getApi } from "../../api";
import { createEventInputs as inputs } from "../../inputs/events";
import {
  type EventCreateQueryV2,
  EventEnum,
  type EventProfileCreateQueryResourceObjectAttributes,
} from "klaviyo-api";
import { createEventExamplePayload } from "../../examplePayloads";
import { KlaviyoApi } from "../../enums/KlaviyoApi";
export const createEvent = action({
  display: {
    label: "Create Event",
    description: "Create a new event to track a profiles activity.",
  },
  perform: async (
    context,
    { connection, eventProperties, eventFields, eventName, eventProfile },
  ) => {
    const eventsApi = getApi(connection, KlaviyoApi.Events);
    const debug = context.debug.enabled;
    if (debug) {
      context.logger.debug({
        connection,
        eventProperties,
        eventFields,
        eventName,
        eventProfile,
        debug,
      });
    }
    const event: EventCreateQueryV2 = {
      data: {
        type: EventEnum.Event,
        attributes: {
          properties: eventProperties!,
          time: eventFields.eventTime,
          value: eventFields.eventValue,
          valueCurrency: eventFields.eventValueCurrency,
          uniqueId: eventFields.eventUniqueId,
          metric: {
            data: {
              type: "metric",
              attributes: {
                name: eventName!,
              },
            },
          },
          profile: {
            data: {
              type: "profile",
              attributes:
                eventProfile as EventProfileCreateQueryResourceObjectAttributes,
            },
          },
        },
      },
    };
    await eventsApi.createEvent(event);
    return {
      data: "Event created successfully.",
    };
  },
  inputs,
  examplePayload: createEventExamplePayload,
});
