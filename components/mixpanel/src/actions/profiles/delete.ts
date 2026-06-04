import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import {
  connectionInput,
  deleteProfiles,
  verbose,
  region,
  redirect,
} from "../../inputs";
import { Authorization } from "../../enums/Authorization";
import { deleteProfileExamplePayload } from "../../examplePayloads";

export const deleteProfile = action({
  display: {
    label: "Delete Profile",
    description:
      "Permanently delete the profile from Mixpanel, along with all of its properties.",
  },
  inputs: {
    connection: connectionInput,
    deleteProfiles,
    verbose,
    redirect,
    region,
  },
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
          verbose: verbose || undefined,
          redirect: redirect || undefined,
        },
      },
    );
    return { data };
  },
  examplePayload: deleteProfileExamplePayload,
});
