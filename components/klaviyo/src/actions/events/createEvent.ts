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
    {
      connection,
      eventProperties,
      eventTime,
      eventValue,
      eventValueCurrency,
      eventUniqueId,
      eventName,
      eventProfile,
    },
  ) => {
    const eventsApi = getApi(connection, KlaviyoApi.Events);
    const debug = context.debug.enabled;
    if (debug) {
      context.logger.debug({
        connection,
        eventProperties,
        eventTime,
        eventValue,
        eventValueCurrency,
        eventUniqueId,
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
          time: eventTime,
          value: eventValue,
          valueCurrency: eventValueCurrency,
          uniqueId: eventUniqueId,
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
