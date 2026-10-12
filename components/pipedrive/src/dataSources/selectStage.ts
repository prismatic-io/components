import { dataSource, type Element } from "@prismatic-io/spectral";
import { connectionInput } from "../inputs";
import { createClient } from "../client";
import { paginateRecordsWithCursor, sortRecords } from "../util";
import { WebhookVersion } from "../constants";
import { selectStageExamplePayload } from "../examplePayloads";
interface Stage {
  id: number;
  name: string;
  pipeline_name: string;
}
export const selectStage = dataSource({
  display: {
    label: "Select Stage",
    description: "Select a Stage from a dropdown menu.",
  },
  inputs: {
    connectionInput,
  },
  perform: async (_context, { connectionInput }) => {
    const client = createClient(connectionInput, false, WebhookVersion.V2);
    const { data } = await paginateRecordsWithCursor<Stage>(
      client,
      "stages",
      {},
      true,
    );
    const objects = sortRecords(data, "name").map<Element>((stage) => ({
      key: stage.id.toString(),
      label: stage.pipeline_name
        ? `${stage.name} (${stage.pipeline_name})`
        : stage.name,
    }));
    return { result: objects };
  },
  dataSourceType: "picklist",
  examplePayload: selectStageExamplePayload,
});
