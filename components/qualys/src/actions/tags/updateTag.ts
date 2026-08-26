import { action, outputSchema } from "@prismatic-io/spectral";
import { createClassicClient } from "../../client";
import { XML_HEADERS } from "../../constants";
import { updateTagExamplePayload } from "../../examplePayloads";
import { updateTagInputs } from "../../inputs";
import { updateTagOutputSchema } from "../../outputSchemas";
import type { QpsServiceResponse, QualysTag } from "../../types";
import { parseXml } from "../../util";
export const updateTag = action({
  display: {
    label: "Update Tag",
    description:
      "Update an existing tag in Qualys. This is a partial update — only provided fields are changed; omitted fields are left untouched.",
  },
  inputs: updateTagInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: updateTagOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (
    context,
    { connection, tagId, updateTagName, color, criticalityScore },
  ) => {
    const client = createClassicClient(connection, context.debug.enabled);
    const tagElements = [
      updateTagName ? `<name>${updateTagName}</name>` : "",
      color ? `<color>${color}</color>` : "",
      criticalityScore
        ? `<criticalityScore>${criticalityScore}</criticalityScore>`
        : "",
    ]
      .filter(Boolean)
      .join("");
    const requestBody = `<?xml version="1.0" encoding="UTF-8"?>
<ServiceRequest>
  <data>
    <Tag>${tagElements}</Tag>
  </data>
</ServiceRequest>`;
    const response = await client.post<string>(
      `/qps/rest/2.0/update/am/tag/${tagId}`,
      requestBody,
      { headers: XML_HEADERS },
    );
    const parsed = await parseXml<QpsServiceResponse<QualysTag>>(response.data);
    return { data: parsed };
  },
  examplePayload: updateTagExamplePayload,
});
