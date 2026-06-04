import { action } from "@prismatic-io/spectral";
import { createDataClient } from "../../client";
import {
  connectionInput,
  project_id,
  dataAndDomain,
  name,
  useProjectToken,
} from "../../inputs";
import { Authorization } from "../../enums/Authorization";
import { deletePipelineExamplePayload } from "../../examplePayloads";

export const deletePipeline = action({
  display: {
    label: "Delete Pipeline",
    description:
      "Deletes the pipeline and stops any future jobs to be scheduled for the pipeline.",
  },
  inputs: {
    connection: connectionInput,
    useProjectToken: { ...useProjectToken, default: "true" },
    dataAndDomain,
    name,
    project_id,
  },
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
      project_id: project_id || undefined,
      name: name || undefined,
    });
    return {
      data,
    };
  },
  examplePayload: deletePipelineExamplePayload,
});
