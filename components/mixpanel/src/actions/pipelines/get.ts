import { action } from "@prismatic-io/spectral";
import { createDataClient } from "../../client";
import {
  connectionInput,
  project_id,
  dataAndDomain,
  name,
  summary,
  status,
} from "../../inputs";
import { Authorization } from "../../enums/Authorization";
import { getPipelineExamplePayload } from "../../examplePayloads";

export const getPipeline = action({
  display: {
    label: "Get Pipeline",
    description:
      "Given the name of the pipeline this API returns the status of the pipeline.",
  },
  inputs: {
    connection: connectionInput,
    dataAndDomain,
    project_id: { ...project_id, required: true },
    name,
    summary,
    status,
  },
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
        project_id: project_id || undefined,
        name: name || undefined,
        summary,
        status: status || undefined,
      },
    });
    return {
      data,
    };
  },
  examplePayload: getPipelineExamplePayload,
});
