import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { listRequirementsExamplePayload } from "../../examplePayloads";
import { listRequirementsInputs } from "../../inputs";
import { requirementListSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
import { fetchArenaList } from "../../util/pagination";
export const listRequirements = action({
  display: {
    label: "List Requirements",
    description: "Search for requirements using filters.",
  },
  inputs: listRequirementsInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: requirementListSchema,
  }),
  examplePayload: listRequirementsExamplePayload,
  perform: async (context, params) => {
    try {
      const client = await createArenaClient(context, params.connection);
      const queryParams = {
        number: params.number,
        title: params.title,
        status: params.status,
        "assignee.fullName": params.assigneeFullName,
        "assignee.guid": params.assigneeGuid,
        "creator.fullName": params.creatorFullName,
        "creator.guid": params.creatorGuid,
        modificationDateTime: params.modificationDateTime,
        priority: params.priority,
        description: params.description,
        any: params.any,
        "template.guid": params.templateGuid,
        offset: params.pagination?.offset,
        limit: params.pagination?.limit,
      };
      const data = await fetchArenaList(
        client,
        "/requirements",
        queryParams,
        params.fetchAll,
      );
      return { data };
    } catch (error) {
      handleArenaError(error, context.logger, "List Requirements");
    }
  },
});
