import { action } from "@prismatic-io/spectral";
import { getApi } from "../../api";
import { getEventInputs as inputs } from "../../inputs/events";
import type { FieldsEvent } from "../../types/FieldsEvent";
import { getEventExamplePayload } from "../../examplePayloads";
import { KlaviyoApi } from "../../enums/KlaviyoApi";
import type { FieldsMetric } from "../../types/FieldsMetric";
import type { FieldsProfileEvent } from "../../types/FieldsProfileEvent";
import { getIncludeParams } from "../../utils";

export const getEvent = action({
  display: {
    label: "Get Event",
    description: "Get an event with the given event ID.",
  },
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

    const { body } = await eventsApi.getEvent(eventId!, {
      ...params,
      include: getIncludeParams(params.fieldsProfile, params.fieldsMetric),
    });
    return {
      data: body,
    };
  },
  inputs,
  examplePayload: getEventExamplePayload,
});
