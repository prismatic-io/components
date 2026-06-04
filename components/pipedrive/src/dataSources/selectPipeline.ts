import { dataSource, type Element } from "@prismatic-io/spectral";
import { connectionInput } from "../inputs";
import { createClient } from "../client";
import { paginateRecordsWithCursor, sortRecords } from "../util";
import { WebhookVersion } from "../constants";

interface Pipeline {
  id: number;
  name: string;
}

export const selectPipeline = dataSource({
  display: {
    label: "Select Pipeline",
    description: "Select a Pipeline from a dropdown menu.",
  },
  inputs: {
    connectionInput,
  },
  perform: async (_context, { connectionInput }) => {
    const client = createClient(connectionInput, false, WebhookVersion.V2);
    const { data } = await paginateRecordsWithCursor<Pipeline>(client, "pipelines", {}, true);

    const objects = sortRecords(data, "name").map<Element>((pipeline) => ({
      key: pipeline.id.toString(),
      label: pipeline.name,
    }));

    return { result: objects };
  },
  dataSourceType: "picklist",
  examplePayload: {
    result: [{ label: "Sales Pipeline", key: "1" }],
  },
});
