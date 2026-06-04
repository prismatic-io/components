import { action } from "@prismatic-io/spectral";
import { createDataClient } from "../../client";
import { connectionInput, project_id, dataAndDomain } from "../../inputs";
import { Authorization } from "../../enums/Authorization";
import { listPipelinesExamplePayload } from "../../examplePayloads";

export const listPipelines = action({
  display: {
    label: "List Pipelines",
    description:
      "Returns the list of all the pipelines scheduled for a project.",
  },
  inputs: {
    connection: connectionInput,
    dataAndDomain,
    project_id: { ...project_id, required: true },
  },
  perform: async (context, { connection, project_id, dataAndDomain }) => {
    const client = createDataClient(
      dataAndDomain,
      connection,
      Authorization.Account,
      context.debug.enabled,
    );
    const { data } = await client.get("/nessie/pipeline/jobs", {
      params: {
        project_id: project_id || undefined,
      },
    });
    return {
      data,
    };
  },
  examplePayload: listPipelinesExamplePayload,
});
