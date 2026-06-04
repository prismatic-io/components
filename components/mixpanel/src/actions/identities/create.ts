import { action } from "@prismatic-io/spectral";
import { createNoAuthClient } from "../../client";
import {
  connectionInput,
  verbose,
  redirect,
  strict,
  region,
  identified_id,
  anon_id,
  project_token,
} from "../../inputs";
import { createIdentityExamplePayload } from "../../examplePayloads";

export const createIdentity = action({
  display: {
    label: "Create Identity",
    description: "Creates a new Identity",
  },
  inputs: {
    connection: connectionInput,
    region,
    identified_id,
    anon_id,
    project_token,
    strict,
    verbose,
    redirect,
  },
  perform: async (
    context,
    {
      connection,
      verbose,
      redirect,
      region,
      strict,
      identified_id,
      anon_id,
      project_token,
    },
  ) => {
    const client = createNoAuthClient(
      region,
      connection,
      context.debug.enabled,
    );
    const identityData = JSON.stringify({
      event: "$identify",
      properties: {
        $identified_id: identified_id || undefined,
        $anon_id: anon_id || undefined,
        token: project_token || undefined,
      },
    });
    const body = new URLSearchParams({
      data: identityData,
    });
    if (strict) {
      body.append("strict", strict);
    }
    const { data } = await client.post("/track#create-identity", body, {
      params: {
        verbose: verbose || undefined,
        redirect: redirect || undefined,
      },
    });
    return {
      data,
    };
  },
  examplePayload: createIdentityExamplePayload,
});
