import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { upsertApplicationExamplePayload as examplePayload } from "../../examplePayloads";
import { upsertApplicationInputs as inputs } from "../../inputs/application";
import { getUpsertHeader } from "../../util";

export const upsertApplication = action({
  display: {
    label: "Upsert Application",
    description:
      "Create a new application if it doesn't exist, or update the properties of an existing application.",
  },
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
      data,
    };
  },
  inputs,
  examplePayload,
});
