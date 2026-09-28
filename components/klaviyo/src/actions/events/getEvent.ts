import { action, outputSchema } from "@prismatic-io/spectral";
import { getEventOutputSchema } from "../../outputSchemas";
import { getApi } from "../../api";
import { getEventInputs as inputs } from "../../inputs";
import { getEventExamplePayload } from "../../examplePayloads";
import { KlaviyoApi } from "../../constants";
import { getIncludeParams } from "../../util";
import type {
  FieldsEvent,
  FieldsMetric,
  FieldsProfileEvent,
} from "../../types";
export const getEvent = action({
  display: {
    label: "Get Event",
    description: "Get an event with the given event ID.",
  },
  performSafety: "safe",
  perform: async (
    context,
    { connection, eventId, fieldsEvent, fieldsMetric, fieldsProfile },
  ) => {
    const eventsApi = getApi(connection, KlaviyoApi.Events);
    const debug = context.debug.enabled;
    if (debug) {
      context.logger.debug({
        connection,
        eventId,
        fieldsEvent,
        fieldsMetric,
        fieldsProfile,
        debug,
      });
    }
    const params = {
      fieldsEvent: fieldsEvent as FieldsEvent[],
      fieldsMetric: fieldsMetric as FieldsMetric[],
      fieldsProfile: fieldsProfile as FieldsProfileEvent[],
    };
    const { body } = await eventsApi.getEvent(eventId, {
      ...params,
      include: getIncludeParams(params.fieldsProfile, params.fieldsMetric),
    });
    return {
      data: body,
    };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => ({
    data: getEventExamplePayload.data,
  }),
  inputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getEventOutputSchema,
  }),
  examplePayload: getEventExamplePayload,
});
