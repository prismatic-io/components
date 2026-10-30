import { dataSource, type Element } from "@prismatic-io/spectral";
import { createV3Client } from "../client";
import { selectPriorityExamplePayload } from "../examplePayloads";
import { selectPriorityInputs } from "../inputs";

const selectPriority = dataSource({
  display: {
    label: "Select Priority",
    description: "Select a priority.",
  },
  inputs: selectPriorityInputs,
  perform: async (_context, { jiraConnection }) => {
    const client = await createV3Client(jiraConnection, false);
    const { data }: { data: { id: string; name: string }[] } =
      await client.get("/priority");
    const result = data.map<Element>(({ id, name }) => ({
      label: name,
      key: id,
    }));
    return { result };
  },
  dataSourceType: "picklist",
  examplePayload: selectPriorityExamplePayload,
});
export default {
  selectPriority,
};
