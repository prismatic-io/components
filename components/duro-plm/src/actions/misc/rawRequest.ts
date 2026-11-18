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
  performSafety: "notAllowed",
  perform: async (
    context,
    { connection, query, variables, variablesObject },
  ) => {
    if (
      variablesObject !== undefined &&
      (typeof variablesObject !== "object" ||
        variablesObject === null ||
        Array.isArray(variablesObject))
    ) {
      throw new Error("Variables Object must be a valid JSON object");
    }
    const client = createDuroClient(
      connection,
      context.debug.enabled,
      context.logger,
    );
    const data = await client.request(query ?? "", {
      ...variables,
      ...variablesObject,
    });
    return { data };
  },
  examplePayload: rawRequestExamplePayload,
});
