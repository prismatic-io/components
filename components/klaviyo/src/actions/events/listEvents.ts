import { action } from "@prismatic-io/spectral";
import { getApi } from "../../api";
import { listEventsInputs as inputs } from "../../inputs/events";
import type { FieldsEvent } from "../../types/FieldsEvent";
import { fetchEvents } from "../../utils";
import { listEventsExamplePayload } from "../../examplePayloads";
import { KlaviyoApi } from "../../enums/KlaviyoApi";
import type { FieldsMetric } from "../../types/FieldsMetric";
import type { FieldsProfileEvent } from "../../types/FieldsProfileEvent";

export const listEvents = action({
  display: {
    label: "List Events",
    description: "Get all events in an account.",
  },
  perform: async (
    context,
    { connection, fieldsEvent, fieldsMetric, fieldsProfile },
  ) => {
    const eventsApi = getApi(connection, KlaviyoApi.Events);
    const debug = context.debug.enabled;
    if (debug) {
      context.logger.debug({
        connection,
        fieldsEvent,
        fieldsMetric,
        fieldsProfile,
        debug,
      });
    }
    const data = await fetchEvents(
      eventsApi,
      fieldsEvent as FieldsEvent[],
      fieldsMetric as FieldsMetric[],
      fieldsProfile as FieldsProfileEvent[],
      [],
      [],
    );

    return {
      data,
    };
  },
  inputs,
  examplePayload: listEventsExamplePayload,
});
