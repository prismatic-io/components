import { action, outputSchema } from "@prismatic-io/spectral";
import { listEventsOutputSchema } from "../../outputSchemas";
import { getCalendlyClient } from "../../client";
import { listEventsInputs } from "../../inputs";
import { listEventsExamplePayload } from "../../examplePayloads";
import { getEvents } from "../../util";
export const listEvents = action({
  display: {
    label: "List Events",
    description: "Returns a list of Events.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      connection,
      inviteeEmail,
      maxStartTime,
      minStartTime,
      organization,
      sort,
      status,
      user,
    },
  ) => {
    const client = getCalendlyClient(connection, context.debug.enabled);
    const data = await getEvents(
      client,
      inviteeEmail,
      maxStartTime,
      minStartTime,
      organization,
      sort,
      status,
      user,
    );
    return { data };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => ({
    data: listEventsExamplePayload.data,
  }),
  inputs: listEventsInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listEventsOutputSchema,
  }),
  examplePayload: listEventsExamplePayload,
});
