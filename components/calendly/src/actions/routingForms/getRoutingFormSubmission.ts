import { action } from "@prismatic-io/spectral";
import { getCalendlyClient } from "../../client";
import { connection, uuid } from "../../inputs";
import { getRoutingFormSubmissionExamplePayload } from "../../examplePayloads";

export const getRoutingFormSubmission = action({
  display: {
    label: "Get Routing Form Submission",
    description: "Get a specified Routing Form Submission.",
  },
  perform: async (context, { connection, uuid }) => {
    const client = getCalendlyClient(connection, context.debug.enabled);

    const { data } = await client.get(`/routing_form_submissions/${uuid}`);
    return { data };
  },
  inputs: {
    connection,
    uuid,
  },
  examplePayload: getRoutingFormSubmissionExamplePayload,
});
