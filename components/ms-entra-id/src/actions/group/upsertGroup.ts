import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { SUCCESS_RESPONSE } from "../../constants";
import { emptyExamplePayload as examplePayload } from "../../examplePayloads";
import { upsertGroupInputs as inputs } from "../../inputs/group";
import { getUpsertHeader } from "../../util";

export const upsertGroup = action({
  display: {
    label: "Upsert Group",
    description:
      "Create a new group if it doesn't exist, or update the properties of an existing group.",
  },
  perform: async (
    context,
    {
      connection,
      uniqueName,
      useAsUpsert,
      displayName,
      mailEnabled,
      mailNickname,
      securityEnabled,
      groupTypes,
      additionalProperties,
    },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    const payload = {
      displayName,
      mailEnabled,
      mailNickname,
      securityEnabled,
      groupTypes,
      ...(additionalProperties || {}),
    };
    const { data } = await client.patch(
      `/groups(uniqueName='${uniqueName}')`,
      payload,
      { headers: getUpsertHeader(useAsUpsert) },
    );
    
    return {
      data: data ? data : SUCCESS_RESPONSE,
    };
  },
  inputs,
  examplePayload,
});
