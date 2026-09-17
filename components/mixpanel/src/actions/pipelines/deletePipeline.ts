import { action } from "@prismatic-io/spectral";
import { createDataClient } from "../../client";
import { deletePipelineInputs } from "../../inputs";
import { Authorization } from "../../enums/authorization";
import { deletePipelineExamplePayload } from "../../examplePayloads";
export const deletePipeline = action({
  display: {
    label: "Delete Pipeline",
    description:
      "Deletes the pipeline and stops any future jobs to be scheduled for the pipeline.",
  },
  inputs: deletePipelineInputs,
  performSafety: "notAllowed",
  perform: async (
    context,
    { connection, project_id, dataAndDomain, name, useProjectToken },
  ) => {
    const client = createDataClient(
      dataAndDomain,
      connection,
      useProjectToken ? Authorization.Token : Authorization.Account,
      context.debug.enabled,
    );
    const { data } = await client.post("/nessie/pipeline/cancel", {
      project_id,
      name,
    });
    return {
      data,
    };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => deletePipelineExamplePayload,
  examplePayload: deletePipelineExamplePayload,
});
