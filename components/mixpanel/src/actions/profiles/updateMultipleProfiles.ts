import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { updateMultipleProfilesInputs } from "../../inputs";
import { Authorization } from "../../enums/authorization";
import { updateMultipleProfilesExamplePayload } from "../../examplePayloads";
import { ingestionAckOutputSchema } from "../../outputSchemas";
export const updateMultipleProfiles = action({
  display: {
    label: "Update Multiple Profiles",
    description: "Send a batch of profile updates.",
  },
  inputs: updateMultipleProfilesInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: ingestionAckOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (
    context,
    { connection, region, propertiesToUpdate, verbose, redirect },
  ) => {
    const client = createClient(
      region,
      connection,
      Authorization.Fallback,
      context.debug.enabled,
    );
    const { data } = await client.post(
      "/engage#profile-batch-update",
      propertiesToUpdate,
      {
        params: {
          verbose,
          redirect,
        },
      },
    );
    return {
      data,
    };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => updateMultipleProfilesExamplePayload,
  examplePayload: updateMultipleProfilesExamplePayload,
});
