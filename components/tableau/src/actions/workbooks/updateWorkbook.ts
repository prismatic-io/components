import { action, util } from "@prismatic-io/spectral";
import { updateWorkbookExamplePayload } from "../../examplePayloads";
import { updateWorkbookInputs } from "../../inputs";
import { getTableauClient } from "../../util";
export const updateWorkbook = action({
  display: {
    label: "Update Workbook",
    description:
      "Update the information and metadata of an existing workbook by ID.",
  },
  examplePayload: updateWorkbookExamplePayload,
  perform: async (context, params) => {
    const client = await getTableauClient({
      tableauConnection: params.tableauConnection,
      timeout: util.types.toInt(params.timeout),
      debug: context.debug.enabled,
    });
    const response = await client.put(`/workbooks/${params.workbookId}`, {
      workbook: {
        name: params.workbookName,
        showTabs: params.showTabs,
        project: {
          id: params.projectId,
        },
        owner: {
          id: params.userId,
        },
      },
    });
    return {
      data: response.data,
    };
  },
  inputs: updateWorkbookInputs,
});
