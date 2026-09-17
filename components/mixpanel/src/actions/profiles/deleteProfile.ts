import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { deleteProfileInputs } from "../../inputs";
import { Authorization } from "../../enums/authorization";
import { deleteProfileExamplePayload } from "../../examplePayloads";
import { ingestionAckOutputSchema } from "../../outputSchemas";
export const deleteProfile = action({
  display: {
    label: "Delete Profile",
    description:
      "Permanently delete the profile from Mixpanel, along with all of its properties.",
  },
  inputs: deleteProfileInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: ingestionAckOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (
    context,
    { connection, deleteProfiles, region, verbose, redirect },
  ) => {
    const client = createClient(
      region,
      connection,
      Authorization.Fallback,
      context.debug.enabled,
    );
    const { data } = await client.post(
      "/engage#profile-delete",
      deleteProfiles,
      {
        params: {
          verbose,
          redirect,
        },
      },
    );
    return { data };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => deleteProfileExamplePayload,
  examplePayload: deleteProfileExamplePayload,
});
