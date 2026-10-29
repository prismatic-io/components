import { action, outputSchema } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import { SERVICES } from "../../constants";
import { updateTimeClockEventsByIdExamplePayload } from "../../examplePayloads";
import { updateTimeClockEventsByIdInputs } from "../../inputs";
import { updateTimeClockEventsByIdOutputSchema } from "../../outputSchemas";
import { getIdObject } from "../../util";

export const updateTimeClockEventsById = action({
  display: {
    label: "Update Time Clock Event by ID",
    description:
      "Updates the time clock event for the specified ID, replacing the existing time clock event with the specified data.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      connection,
      timeClockEventId,
      clockEventOverrideRate,
      referenceId,
      assignmentIds = {},
      clockEventComment,
      instanceId,
      instanceHref,
      instanceDescriptor,
      extraBody,
    },
  ) => {
    const client = getClient(connection, context.debug.enabled);
    const body = {
      overrideRate: clockEventOverrideRate,
      reference_ID: referenceId,
      timeEntryCode: getIdObject(assignmentIds.clockEventTimeEntryCodeId),
      projectPlanTask: getIdObject(assignmentIds.clockEventProjectPlanTaskId),
      project: getIdObject(assignmentIds.clockEventProjectId),
      comment: clockEventComment,
      id: instanceId,
      href: instanceHref,
      descriptor: instanceDescriptor,
      ...(extraBody || {}),
    };
    const { data } = await client.put(
      `${SERVICES.timeTracking}/timeClockEvents/${timeClockEventId}`,
      body,
    );
    return {
      data,
    };
  },
  examplePerform: async () => updateTimeClockEventsByIdExamplePayload,
  inputs: updateTimeClockEventsByIdInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: updateTimeClockEventsByIdOutputSchema,
  }),
  examplePayload: updateTimeClockEventsByIdExamplePayload,
});
