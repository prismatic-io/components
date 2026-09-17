import { action, outputSchema } from "@prismatic-io/spectral";
import { createDataClient } from "../../client";
import { getPipelineInputs } from "../../inputs";
import { Authorization } from "../../enums/authorization";
import { getPipelineExamplePayload } from "../../examplePayloads";
import { getPipelineOutputSchema } from "../../outputSchemas";
export const getPipeline = action({
  display: {
    label: "Get Pipeline",
    description:
      "Given the name of the pipeline this API returns the status of the pipeline.",
  },
  inputs: getPipelineInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getPipelineOutputSchema,
  }),
  performSafety: "safe",
  perform: async (
    context,
    { connection, project_id, dataAndDomain, name, summary, status },
  ) => {
    const client = createDataClient(
      dataAndDomain,
      connection,
      Authorization.Account,
      context.debug.enabled,
    );
    const { data } = await client.get("/nessie/pipeline/status", {
      params: {
        project_id,
        name,
        summary,
        status,
      },
    });
    return {
      data,
    };
  },
  examplePayload: getPipelineExamplePayload,
});
