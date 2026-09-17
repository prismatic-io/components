import { action, outputSchema } from "@prismatic-io/spectral";
import { createDataClient } from "../../client";
import { listPipelinesInputs } from "../../inputs";
import { Authorization } from "../../enums/authorization";
import { listPipelinesExamplePayload } from "../../examplePayloads";
import { listPipelinesOutputSchema } from "../../outputSchemas";
export const listPipelines = action({
  display: {
    label: "List Pipelines",
    description:
      "Returns the list of all the pipelines scheduled for a project.",
  },
  inputs: listPipelinesInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listPipelinesOutputSchema,
  }),
  performSafety: "safe",
  perform: async (context, { connection, project_id, dataAndDomain }) => {
    const client = createDataClient(
      dataAndDomain,
      connection,
      Authorization.Account,
      context.debug.enabled,
    );
    const { data } = await client.get("/nessie/pipeline/jobs", {
      params: {
        project_id,
      },
    });
    return {
      data,
    };
  },
  examplePayload: listPipelinesExamplePayload,
});
