import { action, outputSchema } from "@prismatic-io/spectral";
import { listRoutingFormSubmissionsOutputSchema } from "../../outputSchemas";
import { getCalendlyClient } from "../../client";
import { listRoutingFormSubmissionsInputs } from "../../inputs";
import { listRoutingFormSubmissionsExamplePayload } from "../../examplePayloads";
import { paginator } from "../../util";
export const listRoutingFormSubmissions = action({
  display: {
    label: "List Routing Form Submissions",
    description:
      "Get a list of Routing Form Submissions for a specified Routing Form.",
  },
  performSafety: "notAllowed",
  perform: async (context, { connection, form, sort }) => {
    const client = getCalendlyClient(connection, context.debug.enabled);
    const data = await paginator(client, "/routing_form_submissions", {
      form,
      sort: sort,
    });
    return { data };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => ({
    data: listRoutingFormSubmissionsExamplePayload.data,
  }),
  inputs: listRoutingFormSubmissionsInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listRoutingFormSubmissionsOutputSchema,
  }),
  examplePayload: listRoutingFormSubmissionsExamplePayload,
});
