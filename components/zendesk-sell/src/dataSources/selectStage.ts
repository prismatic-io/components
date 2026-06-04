import { dataSource, type Element } from "@prismatic-io/spectral";
import { getZendeskClient } from "../client";
import { selectStageInputs } from "../inputs/dataSources/stage";

export const selectStage = dataSource({
  display: {
    label: "Select Stage",
    description: "Select a stage from your Zendesk Sell account.",
  },
  inputs: selectStageInputs,
  perform: async (_context, { connection }) => {
    const client = getZendeskClient(connection, false);
    const { data } = await client.get("/stages", {
      headers: { Accept: "application/json" },
    });

    return {
      result: data.items
        .map((stage: any) => {
          return {
            key: stage.data.id.toString(),
            label: stage.data.name,
          } as Element;
        })
        .sort((a: Element, b: Element) =>
          (a.label ?? "") < (b.label ?? "") ? -1 : 1,
        ),
    };
  },
  dataSourceType: "picklist",
  examplePayload: {
    result: [{ label: "Example Stage", key: "12345" }],
  },
});
