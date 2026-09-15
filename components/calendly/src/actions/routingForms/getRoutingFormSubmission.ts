import { action, outputSchema } from "@prismatic-io/spectral";
import { getRoutingFormSubmissionOutputSchema } from "../../outputSchemas";
import { getCalendlyClient } from "../../client";
import { getRoutingFormSubmissionInputs } from "../../inputs";
import { getRoutingFormSubmissionExamplePayload } from "../../examplePayloads";
export const getRoutingFormSubmission = action({
  display: {
    label: "Get Routing Form Submission",
    description: "Get a specified Routing Form Submission.",
  },
  performSafety: "safe",
  perform: async (context, { connection, uuid }) => {
    const client = getCalendlyClient(connection, context.debug.enabled);
    const { data } = await client.get(`/routing_form_submissions/${uuid}`);
    return { data };
  },
  inputs: getRoutingFormSubmissionInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getRoutingFormSubmissionOutputSchema,
  }),
  examplePayload: getRoutingFormSubmissionExamplePayload,
});
