import { action, outputSchema } from "@prismatic-io/spectral";
import { listEventsOutputSchema } from "../../outputSchemas";
import { getApi } from "../../api";
import { listEventsInputs as inputs } from "../../inputs";
import { fetchEvents } from "../../util";
import { listEventsExamplePayload } from "../../examplePayloads";
import { KlaviyoApi } from "../../constants";
import type {
  FieldsEvent,
  FieldsMetric,
  FieldsProfileEvent,
} from "../../types";
export const listEvents = action({
  display: {
    label: "List Events",
    description: "Get all events in an account.",
  },
  performSafety: "notAllowed",
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
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listEventsOutputSchema,
  }),
  examplePayload: listEventsExamplePayload,
});
