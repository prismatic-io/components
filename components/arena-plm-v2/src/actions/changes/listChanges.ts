import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { listChangesExamplePayload } from "../../examplePayloads";
import { listChangesInputs } from "../../inputs";
import { listChangesOutputSchema } from "../../outputSchemas";
import type { ChangeCompactVo } from "../../types";
import { handleArenaError } from "../../util";
import { fetchArenaList } from "../../util/pagination";
export const listChanges = action({
  display: {
    label: "List Changes",
    description:
      "Get changes from the Arena PLM system with filtering options.",
  },
  inputs: listChangesInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listChangesOutputSchema,
  }),
  examplePayload: listChangesExamplePayload,
  perform: async (
    context,
    {
      connection,
      number,
      title,
      effectiveDateTime,
      submissionDateTime,
      lifecycleStatusType,
      implementationStatus,
      categoryGuid,
      creatorGuid,
      any: anySearch,
      pagination,
      includeChildCategories,
      fetchAll,
    },
  ) => {
    try {
      const client = await createArenaClient(context, connection);
      const params = {
        number,
        title,
        effectiveDateTime,
        submissionDateTime,
        "lifecycleStatus.type": lifecycleStatusType,
        implementationStatus,
        "category.guid": categoryGuid,
        "creator.guid": creatorGuid,
        any: anySearch?.trim(),
        offset: pagination?.offset,
        limit: pagination?.limit,
        includeChildCategories,
      };
      const result = await fetchArenaList<ChangeCompactVo>(
        client,
        "/changes",
        params,
        fetchAll,
      );
      context.logger.info("Retrieved changes", { count: result.count });
      return { data: result };
    } catch (error) {
      handleArenaError(error, context.logger, "List Changes");
    }
  },
});
