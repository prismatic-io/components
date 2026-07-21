import { action, util } from "@prismatic-io/spectral";
import { getWorkbookExamplePayload } from "../../examplePayloads";
import { getWorkbookInputs } from "../../inputs";
import { getTableauClient } from "../../util";
export const getWorkbook = action({
  display: {
    label: "Get Workbook",
    description: "Retrieve an existing workbook by ID.",
  },
  examplePayload: getWorkbookExamplePayload,
  perform: async (context, params) => {
    const client = await getTableauClient({
      tableauConnection: params.tableauConnection,
      timeout: util.types.toInt(params.timeout),
      debug: context.debug.enabled,
    });
    const response = await client.get(`/workbooks/${params.workbookId}`);
    return {
      data: response.data,
    };
  },
  inputs: getWorkbookInputs,
});
