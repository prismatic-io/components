import { action, util } from "@prismatic-io/spectral";
import { deleteWorkbookExamplePayload } from "../../examplePayloads";
import { deleteWorkbookInputs } from "../../inputs";
import { getTableauClient } from "../../util";
export const deleteWorkbook = action({
  display: {
    label: "Delete Workbook",
    description: "Delete an existing workbook by ID.",
  },
  examplePayload: deleteWorkbookExamplePayload,
  perform: async (context, params) => {
    const client = await getTableauClient({
      tableauConnection: params.tableauConnection,
      timeout: util.types.toInt(params.timeout),
      debug: context.debug.enabled,
    });
    const response = await client.delete(`/workbooks/${params.workbookId}`);
    return {
      data: response.data,
    };
  },
  inputs: deleteWorkbookInputs,
});
