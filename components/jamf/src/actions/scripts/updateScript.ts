import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { updateScriptExamplePayload } from "../../examplePayloads";
import { updateScriptInputs } from "../../inputs";
import type { Script } from "../../types";
import { mergeDefined } from "../../util";
export const updateScript = action({
  display: {
    label: "Update Script",
    description: "Update an existing script.",
  },
  inputs: updateScriptInputs,
  perform: async (
    context,
    { connection, resourceId, scriptCategoryId, additionalFields },
  ) => {
    const {
      scriptName,
      scriptContents,
      scriptPriority,
      scriptInfo,
      scriptNotes,
    } = additionalFields;
    const client = await createClient(connection, context.debug.enabled);
    const { data: existing } = await client.get<Script>(
      `/v1/scripts/${resourceId}`,
    );
    const body = mergeDefined(existing, {
      name: scriptName,
      scriptContents,
      categoryId: scriptCategoryId,
      priority: scriptPriority,
      info: scriptInfo,
      notes: scriptNotes,
    });
    const { data } = await client.put<Script>(
      `/v1/scripts/${resourceId}`,
      body,
    );
    return { data };
  },
  examplePayload: updateScriptExamplePayload,
});
