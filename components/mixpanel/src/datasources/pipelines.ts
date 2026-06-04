import { dataSource, type Element } from "@prismatic-io/spectral";
import { createDataClient } from "../client";
import { connectionInput, project_id, dataAndDomain } from "../inputs";
import { Authorization } from "../enums/Authorization";

export const pipelines = dataSource({
  display: {
    label: "Fetch Pipelines",
    description: "Fetch an array of Pipelines",
  },
  inputs: {
    connection: connectionInput,
    dataAndDomain,
    project_id: { ...project_id, required: true },
  },
  perform: async (_context, { connection, dataAndDomain, project_id }) => {
    const client = createDataClient(
      dataAndDomain,
      connection,
      Authorization.Account,
      false,
    );
    const { data } = await client.get("/nessie/pipeline/jobs", {
      params: {
        project_id: project_id || undefined,
      },
    });
    if (data) {
      const result: Element[] = [];
      for (const pipelineId in data) {
        const pipeline = data[pipelineId];
        result.push({
          label: `${pipeline.name} - PipelineId: ${pipelineId}`,
          key: pipeline.name,
        });
      }
      return { result };
    }

    return { result: [] };
  },
  dataSourceType: "picklist",
  examplePayload: {
    result: [
      {
        label: "events-daily-bigquery-monoschema - PipelineId: 9876543210",
        key: "events-daily-bigquery-monoschema",
      },
      {
        label: "events-daily-bigquery-multischema - PipelineId: 9876543210",
        key: "events-daily-bigquery-multischema",
      },
    ],
  },
});
