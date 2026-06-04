import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { columnsAddToSheetExamplePayload } from "../../examplePayloads";
import { columnsAddToSheetInputs } from "../../inputs";

export const columnsAddToSheet = action({
  display: {
    label: "Add Column to Sheet",
    description: "Adds a column to a sheet.",
  },
  perform: async ({ debug: { enabled: debug } }, params) => {
    const client = createClient(params.connection, debug);

    
    const columnData: Record<string, unknown> = {
      title: params.title,
      type: params.type,
      formula: params.formula,
      hidden: params.hidden,
      index: params.index,
      description: params.description,
      locked: params.locked,
      options: params.options,
      width: params.width,
    };

    
    if (params.type !== "TEXT_NUMBER") {
      columnData.validation = params.validation;
    }

    const { data } = await client.post(
      `/sheets/${params.sheetId}/columns`,
      columnData,
    );
    return { data };
  },
  inputs: columnsAddToSheetInputs,
  examplePayload: columnsAddToSheetExamplePayload,
});
