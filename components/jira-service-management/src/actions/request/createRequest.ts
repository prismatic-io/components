import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { createRequestExamplePayload } from "../../examplePayloads";
import { createRequestInputs } from "../../inputs";

export const createRequest = action({
  display: {
    label: "Create Request",
    description: "Creates a new service request in the specified service desk.",
  },
  inputs: createRequestInputs,
  perform: async (
    context,
    {
      connection,
      serviceDeskId,
      requestTypeId,
      requestSummary,
      requestDescription,
      requestFieldValues,
      raiseOnBehalfOf,
      additionalFields,
    },
  ) => {
    const { client } = await createClient(connection, context.debug.enabled);
    const body = {
      ...additionalFields,
      serviceDeskId,
      requestTypeId,
      raiseOnBehalfOf,
      requestFieldValues: {
        summary: requestSummary,
        description: requestDescription,
        ...requestFieldValues,
      },
    };

    const { data } = await client.post("/request", body);
    return { data };
  },
  examplePayload: createRequestExamplePayload,
});
