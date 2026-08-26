import { action, outputSchema } from "@prismatic-io/spectral";
import { createClassicClient } from "../../client";
import { TEXT_XML_HEADERS } from "../../constants";
import { updateAssetTagsExamplePayload } from "../../examplePayloads";
import { updateAssetTagsInputs } from "../../inputs";
import { updateAssetTagsOutputSchema } from "../../outputSchemas";
import { parseXml } from "../../util";
export const updateAssetTags = action({
  display: {
    label: "Update Asset Tags",
    description:
      "Add or remove tags on an asset. Consolidates assign and remove into one action. Static tags only — Qualys rejects dynamic tags. When changing a value-bearing tag (e.g., LS:DomainRole=X), remove the old tag before adding the new one to avoid stale entries.",
  },
  inputs: updateAssetTagsInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: updateAssetTagsOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (
    context,
    { connection, assetId, tagsToAdd, tagsToRemove },
  ) => {
    const client = createClassicClient(connection, context.debug.enabled);
    const tagElements: string[] = [];
    if (tagsToAdd.length > 0) {
      const addTags = tagsToAdd
        .map((id) => `<TagSimple><id>${id}</id></TagSimple>`)
        .join("");
      tagElements.push(`<add>${addTags}</add>`);
    }
    if (tagsToRemove.length > 0) {
      const removeTags = tagsToRemove
        .map((id) => `<TagSimple><id>${id}</id></TagSimple>`)
        .join("");
      tagElements.push(`<remove>${removeTags}</remove>`);
    }
    const requestBody = `<?xml version="1.0" encoding="UTF-8"?>
<ServiceRequest>
  <data>
    <Asset>
      <tags>
        ${tagElements.join("")}
      </tags>
    </Asset>
  </data>
</ServiceRequest>`;
    const response = await client.post<string>(
      `/qps/rest/2.0/update/am/asset/${assetId}`,
      requestBody,
      { headers: TEXT_XML_HEADERS },
    );
    const parsed = await parseXml<Record<string, unknown>>(
      response.data as string,
    );
    return { data: parsed };
  },
  examplePayload: updateAssetTagsExamplePayload,
});
