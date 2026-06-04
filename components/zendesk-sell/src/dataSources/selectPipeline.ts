import { dataSource, type Element } from "@prismatic-io/spectral";
import { getZendeskClient } from "../client";
import { selectPipelineInputs } from "../inputs/dataSources/pipeline";

export const selectPipeline = dataSource({
  display: {
    label: "Select Pipeline",
    description: "Select a pipeline from your Zendesk Sell account.",
  },
  inputs: selectPipelineInputs,
  perform: async (_context, { connection }) => {
    const client = getZendeskClient(connection, false);
    const { data } = await client.get("/pipelines", {
      headers: { Accept: "application/json" },
    });

    return {
      result: data.items
        .map((pipeline: any) => {
          return {
            key: pipeline.data.id.toString(),
            label: pipeline.data.name,
          } as Element;
        })
        .sort((a: Element, b: Element) =>
          (a.label ?? "") < (b.label ?? "") ? -1 : 1,
        ),
    };
  },
  dataSourceType: "picklist",
  examplePayload: {
    result: [{ label: "Example Pipeline", key: "12345" }],
  },
});
