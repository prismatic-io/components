import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { rowsAddToSheetExamplePayload } from "../../examplePayloads";
import { rowsAddToSheetInputs } from "../../inputs";
import type { Rows } from "../../types";
import { mapColumn } from "../../util";

export const rowsAddToSheet = action({
  display: {
    label: "Add/Update Row",
    description: "Adds or updates a row on a sheet.",
  },
  perform: async (
    { debug: { enabled: debug } },
    {
      allowPartialSuccess,
      columnValues,
      connection,
      dynamicColumns,
      overrideValidation,
      position,
      sheetId,
      updateIdentifier,
    },
  ) => {
    const client = createClient(connection, debug);
    const { data: columnData } = await client.get(
      `/sheets/${sheetId}/columns`,
      {
        params: { includeAll: true },
      },
    );

    
    
    const columnDataObject = Object.fromEntries(
      columnData.data.map(({ title, id, type }) => [title, { id, type }]),
    );

    
    const source = dynamicColumns?.length
      ? dynamicColumns
      : columnValues?.length
        ? columnValues
        : null;

    if (!source) {
      throw new Error("No column values provided");
    }

    
    
    const cells: Rows[] = source.map(({ key, value }) =>
      mapColumn(key, value, columnDataObject),
    );

    const params = {
      allowPartialSuccess,
      overrideValidation,
    };

    if (updateIdentifier) {
      const { data } = await client.put(
        `/sheets/${sheetId}/rows`,
        { id: updateIdentifier, cells },
        {
          params,
        },
      );
      return { data };
    } else {
      const { data } = await client.post(
        `/sheets/${sheetId}/rows`,
        { [position]: true, cells },
        {
          params,
        },
      );

      return { data };
    }
  },
  inputs: rowsAddToSheetInputs,
  examplePayload: rowsAddToSheetExamplePayload,
});
