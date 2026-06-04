import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import {
  connectionInput,
  propertiesToUpdate,
  verbose,
  redirect,
  region,
} from "../../inputs";
import { Authorization } from "../../enums/Authorization";
import { updateMultipleProfilesExamplePayload } from "../../examplePayloads";

export const updateMultipleProfiles = action({
  display: {
    label: "Update Multiple Profiles",
    description: "Send a batch of profile updates.",
  },
  inputs: {
    connection: connectionInput,
    propertiesToUpdate,
    verbose,
    redirect,
    region,
  },
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
          verbose: verbose || undefined,
          redirect: redirect || undefined,
        },
      },
    );
    return {
      data,
    };
  },
  examplePayload: updateMultipleProfilesExamplePayload,
});
