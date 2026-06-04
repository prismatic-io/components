import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { copyRowsExamplePayload } from "../../examplePayloads";
import { copyRowsInputs } from "../../inputs";

export const copyRows = action({
  display: {
    label: "Copy Rows",
    description: "Copies rows to another sheet.",
  },
  perform: async ({ debug: { enabled: debug } }, params) => {
    const client = createClient(params.connection, debug);
    const { data } = await client.post(
      `/sheets/${params.sheetId}/rows/copy`,
      { rowIds: params.rowIds, to: { sheetId: params.toSheetId } },
      { params: { include: "all" } },
    );
    return { data };
  },
  inputs: copyRowsInputs,
  examplePayload: copyRowsExamplePayload,
});
