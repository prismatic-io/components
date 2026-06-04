import { dataSource, type Element, util } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { selectRowInputs } from "../inputs";

export const selectRow = dataSource({
  display: {
    label: "Select Row",
    description: "Select a row from a specific sheet.",
  },
  dataSourceType: "picklist",
  inputs: selectRowInputs,
  perform: async (_context, { connection, sheetId }) => {
    const client = createClient(connection, false);
    const {
      data: { data: rows },
    } = await client.get(`/sheets/${sheetId}`, {
      params: { include: "rowNumbers" },
    });

    if (!rows || !Array.isArray(rows)) {
      return { result: [] };
    }

    const result: Element[] = rows.map((row, index) => {
      let label = `Row ${row.rowNumber || index + 1}`;
      if (row.cells && row.cells.length > 0) {
        const firstCell = row.cells.find((cell) => cell.value);
        if (firstCell?.value) {
          label = `${firstCell.value} (Row ${row.rowNumber})`;
        }
      }

      return {
        label,
        key: util.types.toString(row.id),
      };
    });

    return { result };
  },
});
