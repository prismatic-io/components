import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import {
  connectionInput,
  region,
  properties,
  verbose,
  redirect,
} from "../../inputs";
import { Authorization } from "../../enums/Authorization";
import { createProfileExamplePayload } from "../../examplePayloads";

export const createProfile = action({
  display: {
    label: "Create Profile",
    description:
      "Takes a JSON object containing names and values of profile properties. This API will return a 200 OK even if there are data validation issues. To ensure the request actually succeeded, you need to check the response body.",
  },
  inputs: {
    connection: connectionInput,
    properties,
    verbose,
    redirect,
    region,
  },
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
        verbose: verbose || undefined,
        redirect: redirect || undefined,
      },
    });
    return {
      data,
    };
  },
  examplePayload: createProfileExamplePayload,
});
