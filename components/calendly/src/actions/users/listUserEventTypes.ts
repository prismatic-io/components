import { action, outputSchema } from "@prismatic-io/spectral";
import { listUserEventTypesOutputSchema } from "../../outputSchemas";
import { getCalendlyClient } from "../../client";
import { listUserEventTypesInputs } from "../../inputs";
import { listUserEventTypesExamplePayload } from "../../examplePayloads";
import { getEventTypes } from "../../util";
export const listUserEventTypes = action({
  display: {
    label: "List User's Event Types",
    description: "Returns all Event Types associated with a specified User.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      connection,
      adminManaged,
      organization,
      user,
      userAvailabilitySchedule,
      active,
      sort,
    },
  ) => {
    const client = getCalendlyClient(connection, context.debug.enabled);
    const data = await getEventTypes(
      client,
      adminManaged,
      organization,
      user,
      userAvailabilitySchedule,
      active,
      sort,
    );
    return { data };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => ({
    data: listUserEventTypesExamplePayload.data,
  }),
  inputs: listUserEventTypesInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listUserEventTypesOutputSchema,
  }),
  examplePayload: listUserEventTypesExamplePayload,
});
