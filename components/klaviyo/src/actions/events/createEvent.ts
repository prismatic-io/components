import { action, outputSchema } from "@prismatic-io/spectral";
import { createEventOutputSchema } from "../../outputSchemas";
import { getApi } from "../../api";
import { createEventInputs as inputs } from "../../inputs";
import {
  type EventCreateQueryV2,
  EventEnum,
  type EventProfileCreateQueryResourceObjectAttributes,
  MetricEnum,
  ProfileEnum,
} from "klaviyo-api";
import { createEventExamplePayload } from "../../examplePayloads";
import { KlaviyoApi } from "../../constants";
export const createEvent = action({
  display: {
    label: "Create Event",
    description: "Create a new event to track a profiles activity.",
  },
  performSafety: "notAllowed",
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
          properties: eventProperties,
          time: eventFields.eventTime,
          value: eventFields.eventValue,
          valueCurrency: eventFields.eventValueCurrency,
          uniqueId: eventFields.eventUniqueId,
          metric: {
            data: {
              type: MetricEnum.Metric,
              attributes: {
                name: eventName,
              },
            },
          },
          profile: {
            data: {
              type: ProfileEnum.Profile,
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
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: createEventOutputSchema,
  }),
  examplePayload: createEventExamplePayload,
});
