import { action, outputSchema, util } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { updateChangeImplementationTaskExamplePayload } from "../../examplePayloads";
import { updateChangeImplementationTaskInputs } from "../../inputs";
import { changeImplementationTaskSchema } from "../../outputSchemas";
import type { ChangeImplementationTaskUpdateVo } from "../../types";
import {
  handleArenaError,
  resolveImplementationTaskAssignee,
  toOptionalString,
} from "../../util";
export const updateChangeImplementationTask = action({
  display: {
    label: "Update Change Implementation Task",
    description: "Update an existing implementation task for a change.",
  },
  inputs: updateChangeImplementationTaskInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: changeImplementationTaskSchema,
  }),
  examplePayload: updateChangeImplementationTaskExamplePayload,
  perform: async (context, params) => {
    try {
      const client = await createArenaClient(context, params.connection);
      const requestData: ChangeImplementationTaskUpdateVo = {
        name: toOptionalString(params.name),
        assignee: resolveImplementationTaskAssignee(
          params.assigneeUserGuid,
          params.assigneeUserGroupGuid,
        ),
        dueDate: toOptionalString(params.dueDate),
        status: toOptionalString(params.status),
      };
      const { data } = await client.put(
        `/changes/${util.types.toString(params.changeGuid)}/implementationtasks/${util.types.toString(params.implementationTaskGuid)}`,
        requestData,
      );
      return { data };
    } catch (error) {
      handleArenaError(
        error,
        context.logger,
        "Update Change Implementation Task",
      );
    }
  },
});
