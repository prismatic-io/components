import { action } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import { SERVICES } from "../../constants";
import { postTableExamplePayload } from "../../examplePayloads";
import { postTableInputs } from "../../inputs";

export const postTable = action({
  display: {
    label: "Create Table",
    description: "Creates a new table with the specified name.",
  },
  perform: async (
    context,
    {
      connection,
      tenant,
      displayName,
      description,
      documentation,
      enableForAnalysis,
      name,
      tags,
      fields,
    },
  ) => {
    const client = getClient(connection, context.debug.enabled);
    const body = {
      displayName,
      description,
      documentation,
      enableForAnalysis,
      name,
      tags,
      fields,
    };
    const { data } = await client.post(
      `${SERVICES.prismAnalytics}/${tenant}/tables`,
      body,
    );
    return {
      data,
    };
  },
  inputs: postTableInputs,
  examplePayload: postTableExamplePayload,
});
