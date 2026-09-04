import { action, outputSchema, util } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { createChangeImplementationTaskExamplePayload } from "../../examplePayloads";
import { createChangeImplementationTaskInputs } from "../../inputs";
import { changeImplementationTaskSchema } from "../../outputSchemas";
import type { ChangeImplementationTaskCreateVo } from "../../types";
import {
  handleArenaError,
  resolveImplementationTaskAssignee,
  toOptionalString,
} from "../../util";
export const createChangeImplementationTask = action({
  display: {
    label: "Create Change Implementation Task",
    description: "Create a new implementation task for a change.",
  },
  inputs: createChangeImplementationTaskInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: changeImplementationTaskSchema,
  }),
  examplePayload: createChangeImplementationTaskExamplePayload,
  perform: async (context, params) => {
    try {
      const client = await createArenaClient(context, params.connection);
      const requestData: ChangeImplementationTaskCreateVo = {
        name: util.types.toString(params.name),
        assignee: resolveImplementationTaskAssignee(
          params.assigneeUserGuid,
          params.assigneeUserGroupGuid,
        ),
        dueDate: toOptionalString(params.dueDate),
      };
      const { data } = await client.post(
        `/changes/${util.types.toString(params.changeGuid)}/implementationtasks`,
        requestData,
      );
      return { data };
    } catch (error) {
      handleArenaError(
        error,
        context.logger,
        "Create Change Implementation Task",
      );
    }
  },
});
