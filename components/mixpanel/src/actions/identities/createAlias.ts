import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import {
  connectionInput,
  verbose,
  redirect,
  strict,
  region,
  distinct_id,
  project_token,
  alias,
} from "../../inputs";
import { Authorization } from "../../enums/Authorization";
import { createAliasExamplePayload } from "../../examplePayloads";

export const createAlias = action({
  display: {
    label: "Create Alias",
    description: "Mixpanel supports adding an alias to a distinct id.",
  },
  inputs: {
    connection: connectionInput,
    region,
    distinct_id: { ...distinct_id, required: true },
    project_token,
    alias,
    strict,
    verbose,
    redirect,
  },
  perform: async (
    context,
    {
      connection,
      region,
      verbose,
      redirect,
      strict,
      distinct_id,
      project_token,
      alias,
    },
  ) => {
    const client = createClient(
      region,
      connection,
      Authorization.Fallback,
      context.debug.enabled,
    );
    const identityData = JSON.stringify({
      event: "$create_alias",
      properties: {
        distinct_id: distinct_id || undefined,
        alias: alias || undefined,
        token: project_token || undefined,
      },
    });
    const body = new URLSearchParams({
      data: identityData,
    });
    if (strict) {
      body.append("strict", strict);
    }
    const { data } = await client.post("/track#identity-create-alias", body, {
      params: {
        verbose: verbose || undefined,
        redirect: redirect || undefined,
      },
    });
    return {
      data,
    };
  },
  examplePayload: createAliasExamplePayload,
});
