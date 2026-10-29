import { action } from "@prismatic-io/spectral";
import { createDuroClient } from "../../client";
import { rawRequestInputs } from "../../inputs/misc";
import { rawRequestExamplePayload } from "../../examplePayloads";

export const rawRequest = action({
  display: {
    label: "Raw Request",
    description: "Make a generic request to the Duro API",
  },
  inputs: rawRequestInputs,
  perform: async (
    context,
    { connection, query, variables, variablesObject },
  ) => {
    const client = createDuroClient(connection, context.debug.enabled);
    const data = await client.request(query ?? "", {
      ...variables,
      ...variablesObject,
    });
    return { data };
  },
  examplePayload: rawRequestExamplePayload,
});
