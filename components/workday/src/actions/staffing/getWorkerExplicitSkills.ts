import { action, outputSchema } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import { SERVICES } from "../../constants";
import { getWorkerExplicitSkillsExamplePayload } from "../../examplePayloads";
import { paginateResults } from "../../util/pagination";
import { getWorkerExplicitSkillsInputs } from "../../inputs";
import { getWorkerExplicitSkillsOutputSchema } from "../../outputSchemas";
export const getWorkerExplicitSkills = action({
  display: {
    label: "Get Worker Explicit Skills",
    description:
      "Retrieves explicit skills for the specified worker ID. Supports optional filtering by skill name or skill source.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    { connection, workerId, extraParameters, fetchAll, pagination = {} },
  ) => {
    const client = getClient(connection, context.debug.enabled);
    return await paginateResults({
      client,
      endpoint: `${SERVICES.staffing}/workers/${workerId}/explicitSkills`,
      params: extraParameters,
      fetchAll,
      limit: pagination.limit,
      offset: pagination.offset,
    });
  },
  examplePerform: async () => getWorkerExplicitSkillsExamplePayload,
  inputs: getWorkerExplicitSkillsInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getWorkerExplicitSkillsOutputSchema,
  }),
  examplePayload: getWorkerExplicitSkillsExamplePayload,
});
