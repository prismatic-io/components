import { action } from "@prismatic-io/spectral";
import { getApi } from "../../api";
import { bulkCreateEventsInputs as inputs } from "../../inputs/events";
import {
  EventBulkCreateJobEnum,
  type EventsBulkCreateJob,
  type EventsBulkCreateQueryResourceObject,
} from "klaviyo-api";
import { bulkCreateEventsExamplePayload } from "../../examplePayloads";
import { KlaviyoApi } from "../../enums/KlaviyoApi";

export const bulkCreateEvents = action({
  display: {
    label: "Bulk Create Events",
    description: "Create a batch of events for one or more profiles.",
  },
  perform: async (context, { connection, eventsArray }) => {
    const eventsApi = getApi(connection, KlaviyoApi.Events);
    const debug = context.debug.enabled;
    if (debug) {
      context.logger.debug({
        connection,
        eventsArray,
        debug,
      });
    }
    const events: EventsBulkCreateJob = {
      data: {
        type: EventBulkCreateJobEnum.EventBulkCreateJob,
        attributes: {
          eventsBulkCreate: {
            data: eventsArray as EventsBulkCreateQueryResourceObject[],
          },
        },
      },
    };
    await eventsApi.bulkCreateEvents(events);
    return {
      data: "Events created successfully.",
    };
  },
  inputs,
  examplePayload: bulkCreateEventsExamplePayload,
});
