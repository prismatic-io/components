import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getScriptExamplePayload } from "../../examplePayloads";
import { getScriptInputs } from "../../inputs";
import type { Script } from "../../types";

export const getScript = action({
  display: {
    label: "Get Script",
    description: "Get a single script by ID.",
  },
  inputs: getScriptInputs,
  perform: async (context, { connection, resourceId }) => {
    const client = await createClient(connection, context.debug.enabled);
    const { data } = await client.get<Script>(`/v1/scripts/${resourceId}`);
    return { data };
  },
  examplePayload: getScriptExamplePayload,
});
