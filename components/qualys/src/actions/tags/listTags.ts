import { action, outputSchema } from "@prismatic-io/spectral";
import { createClassicClient } from "../../client";
import { Messages } from "../../constants";
import { listTagsExamplePayload } from "../../examplePayloads";
import { listTagsInputs } from "../../inputs";
import { listTagsOutputSchema } from "../../outputSchemas";
import type { FilterCriteria } from "../../types";
import { fetchTags } from "../../util";
export const listTags = action({
  display: {
    label: "List Tags",
    description:
      "Search for tags in Qualys using the Asset Management & Tagging (QPS) API.",
  },
  inputs: listTagsInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listTagsOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (
    context,
    { connection, fetchAll, pageSize, tagNameFilter, parentTagId },
  ) => {
    const client = createClassicClient(connection, context.debug.enabled);
    const criteria: FilterCriteria[] = [];
    if (tagNameFilter) {
      criteria.push({
        field: "name",
        operator: "CONTAINS",
        value: tagNameFilter,
      });
    }
    if (parentTagId) {
      criteria.push({
        field: "parent",
        operator: "EQUALS",
        value: parentTagId,
      });
    }
    const allTags = await fetchTags(client, {
      fetchAll,
      pageSize,
      criteria,
    });
    return {
      data: {
        ServiceResponse: {
          responseCode: Messages.SUCCESS,
          count: allTags.length,
          data: allTags,
        },
      },
    };
  },
  examplePayload: listTagsExamplePayload,
});
