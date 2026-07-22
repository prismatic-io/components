import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { createScriptExamplePayload } from "../../examplePayloads";
import { createScriptInputs } from "../../inputs";
import type { JamfCreateResponse } from "../../types";
export const createScript = action({
  display: {
    label: "Create Script",
    description: "Create a new script.",
  },
  inputs: createScriptInputs,
  perform: async (
    context,
    { connection, scriptName, scriptCategoryId, additionalFields },
  ) => {
    const { scriptContents, scriptPriority, scriptInfo, scriptNotes } =
      additionalFields;
    const client = await createClient(connection, context.debug.enabled);
    const body = {
      name: scriptName,
      scriptContents,
      categoryId: scriptCategoryId,
      priority: scriptPriority,
      info: scriptInfo,
      notes: scriptNotes,
    };
    const { data } = await client.post<JamfCreateResponse>("/v1/scripts", body);
    return { data };
  },
  examplePayload: createScriptExamplePayload,
});
