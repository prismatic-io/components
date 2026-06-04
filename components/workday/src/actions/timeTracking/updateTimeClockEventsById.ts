import { action } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import { SERVICES } from "../../constants";
import { updateTimeClockEventsByIdExamplePayload } from "../../examplePayloads";
import { updateTimeClockEventsByIdInputs } from "../../inputs";
import { getIdObject } from "../../util";

export const updateTimeClockEventsById = action({
  display: {
    label: "Update Time Clock Event by ID",
    description:
      "Updates the time clock event for the specified ID, replacing the existing time clock event with the specified data.",
  },
  perform: async (
    context,
    {
      connection,
      timeClockEventId,
      clockEventDateTime,
      clockEventTimeZoneId,
      clockEventOverrideRate,
      referenceId,
      clockEventTimeEntryCodeId,
      clockEventProjectPlanTaskId,
      clockEventProjectId,
      clockEventComment,
      instanceId,
      instanceHref,
      instanceDescriptor,
      additionalFields,
    },
  ) => {
    const client = getClient(connection, context.debug.enabled);
    const body = {
      dateTime: clockEventDateTime,
      timeZone: getIdObject(clockEventTimeZoneId),
      overrideRate: clockEventOverrideRate,
      reference_ID: referenceId,
      timeEntryCode: getIdObject(clockEventTimeEntryCodeId),
      projectPlanTask: getIdObject(clockEventProjectPlanTaskId),
      project: getIdObject(clockEventProjectId),
      comment: clockEventComment,
      id: instanceId,
      href: instanceHref,
      descriptor: instanceDescriptor,
      ...(additionalFields || {}),
    };
    const { data } = await client.put(
      `${SERVICES.timeTracking}/timeClockEvents/${timeClockEventId}`,
      body,
    );
    return {
      data,
    };
  },
  inputs: updateTimeClockEventsByIdInputs,
  examplePayload: updateTimeClockEventsByIdExamplePayload,
});
