import { dataSource } from "@prismatic-io/spectral";
import { createAsanaClient } from "../client";
import { selectAttachmentExamplePayload } from "../examplePayloads";
import { selectAttachmentInputs } from "../inputs";
import type { DataSource } from "../types/Project";
import { fetchMoreData, mapToLabelKey } from "../util";
const selectAttachment = dataSource({
  display: {
    label: "Select Attachment",
    description: "Select an attachment from a dropdown menu.",
  },
  inputs: selectAttachmentInputs,
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
  examplePayload: selectAttachmentExamplePayload,
});
export default {
  selectAttachment,
};
