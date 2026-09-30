import { action, outputSchema } from "@prismatic-io/spectral";
import { pageSingleSchema } from "../../outputSchemas";
import { createClient } from "../../client";
import { getPageInputs } from "../../inputs";
import { getPageExamplePayload } from "../../examplePayloads";
export const getPage = action({
  display: {
    label: "Get Page",
    description: "Returns a specific Page.",
  },
  inputs: getPageInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: pageSingleSchema,
  }),
  performSafety: "safe",
  perform: async (context, { connectionInput, pageId, additionalFields }) => {
    const client = await createClient(connectionInput, context.debug.enabled);
    const params = {
      "body-format": additionalFields.bodyFormat,
      "get-draft": additionalFields.getDraft,
      version: additionalFields.previousVersion,
      "include-labels": additionalFields.includeLabels,
      "include-properties": additionalFields.includeProperties,
      "include-operations": additionalFields.includeOperations,
      "include-likes": additionalFields.includeLikes,
      "include-versions": additionalFields.includeVersions,
      "include-version": additionalFields.includeVersion,
      "include-favorited-by-current-user-status":
        additionalFields.includeFavoritedByCurrentUserStatus,
    };
    const { data } = await client.get(`/pages/${pageId}`, {
      params,
    });
    return {
      data,
    };
  },
  examplePayload: {
    data: getPageExamplePayload,
  },
});
