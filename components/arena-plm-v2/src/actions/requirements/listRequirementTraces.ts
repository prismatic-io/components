import { action, outputSchema, util } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { listRequirementTracesExamplePayload } from "../../examplePayloads";
import { listRequirementTracesInputs } from "../../inputs";
import { listRequirementTracesOutputSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const listRequirementTraces = action({
  display: {
    label: "List Requirement Traces",
    description: "Get requirement traces by direction.",
  },
  inputs: listRequirementTracesInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listRequirementTracesOutputSchema,
  }),
  examplePayload: listRequirementTracesExamplePayload,
  perform: async (context, params) => {
    try {
      const client = await createArenaClient(context, params.connection);
      const dir = params.direction
        ? params.direction === "UPSTREAM"
          ? "Upstream"
          : "Downstream"
        : undefined;
      const queryParams = {
        direction: dir,
        suspect:
          params.suspect != null
            ? util.types.toBool(params.suspect)
            : undefined,
      };
      const { data } = await client.get(
        `/requirements/${params.requirementGuid}/trace`,
        { params: queryParams },
      );
      return { data };
    } catch (error) {
      handleArenaError(error, context.logger, "List Requirement Traces");
    }
  },
});
