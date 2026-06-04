import { dataSource } from "@prismatic-io/spectral";
import { createAsanaClient } from "../client";
import { connectionInput, taskId } from "../inputs";
import { fetchMoreData, mapToLabelKey } from "../util";
import type { DataSource } from "../types/Project";

const selectAttachment = dataSource({
  display: {
    label: "Select Attachment",
    description: "Select an attachment from a dropdown menu.",
  },
  inputs: {
    connection: connectionInput,
    taskId: { ...taskId, dataSource: undefined },
  },
  perform: async (_context, { connection, taskId }) => {
    const client = await createAsanaClient(connection, false);
    const data = await fetchMoreData<DataSource>(
      client,
      `/tasks/${taskId}/attachments`,
      [],
      true,
    );

    const result = mapToLabelKey(data);
    return { result };
  },
  dataSourceType: "picklist",
  examplePayload: {
    result: [{ label: "Screenshot.png", key: "12345" }],
  },
});

export default {
  selectAttachment,
};
