import { action, outputSchema } from "@prismatic-io/spectral";
import { createClassicClient } from "../../client";
import { XML_HEADERS } from "../../constants";
import { createTagExamplePayload } from "../../examplePayloads";
import { createTagInputs } from "../../inputs";
import { createTagOutputSchema } from "../../outputSchemas";
import type { QpsServiceResponse, QualysTag } from "../../types";
import { parseXml } from "../../util";
export const createTag = action({
  display: {
    label: "Create Tag",
    description:
      "Create a new tag in Qualys using the Asset Management & Tagging (QPS) API.",
  },
  inputs: createTagInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: createTagOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      connection,
      tagName,
      parentTagId,
      color,
      criticalityScore,
      ruleType,
      ruleText,
    },
  ) => {
    const client = createClassicClient(connection, context.debug.enabled);
    const tagElements = [
      `<name>${tagName}</name>`,
      parentTagId ? `<parentTagId>${parentTagId}</parentTagId>` : "",
      color ? `<color>${color}</color>` : "",
      criticalityScore
        ? `<criticalityScore>${criticalityScore}</criticalityScore>`
        : "",
      ruleType ? `<ruleType>${ruleType}</ruleType>` : "",
      ruleText ? `<ruleText>${ruleText}</ruleText>` : "",
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
      "/qps/rest/2.0/create/am/tag",
      requestBody,
      { headers: XML_HEADERS },
    );
    const parsed = await parseXml<QpsServiceResponse<QualysTag>>(response.data);
    return { data: parsed };
  },
  examplePayload: createTagExamplePayload,
});
