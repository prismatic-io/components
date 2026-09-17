import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { createProfileInputs } from "../../inputs";
import { Authorization } from "../../enums/authorization";
import { createProfileExamplePayload } from "../../examplePayloads";
import { ingestionAckOutputSchema } from "../../outputSchemas";
export const createProfile = action({
  display: {
    label: "Create Profile",
    description:
      "Takes a JSON object containing names and values of profile properties. This API will return a 200 OK even if there are data validation issues. To ensure the request actually succeeded, check the response body.",
  },
  inputs: createProfileInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: ingestionAckOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (
    context,
    { connection, region, properties, verbose, redirect },
  ) => {
    const client = createClient(
      region,
      connection,
      Authorization.Fallback,
      context.debug.enabled,
    );
    const { data } = await client.post("/engage#profile-set", properties, {
      params: {
        verbose,
        redirect,
      },
    });
    return {
      data,
    };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => createProfileExamplePayload,
  examplePayload: createProfileExamplePayload,
});
