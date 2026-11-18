import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { SUCCESS_RESPONSE } from "../../constants";
import { upsertApplicationExamplePayload as examplePayload } from "../../examplePayloads";
import { upsertApplicationInputs as inputs } from "../../inputs/application";
import { upsertApplicationOutputSchema } from "../../outputSchemas";
import { getUpsertHeader } from "../../util";

export const upsertApplication = action({
  display: {
    label: "Upsert Application",
    description:
      "Create a new application if it doesn't exist, or update the properties of an existing application.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    { connection, uniqueName, useAsUpsert, displayName, additionalProperties },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    const payload = {
      displayName,
      ...(additionalProperties || {}),
    };
    const { data } = await client.patch(
      `/applications(uniqueName='${uniqueName}')`,
      payload,
      { headers: getUpsertHeader(useAsUpsert) },
    );
    return {
      data: data ? data : SUCCESS_RESPONSE,
    };
  },
  examplePerform: async () => examplePayload,
  inputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: upsertApplicationOutputSchema,
  }),
  examplePayload,
});
