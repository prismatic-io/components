import { dataSource } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { selectBoardExamplePayload } from "../examplePayloads";
import { selectBoardInputs } from "../inputs";
import type { Board } from "../types";
import { toSortedPicklist } from "../util";

export const selectBoard = dataSource({
  display: {
    label: "Select Board",
    description: "Selects a board from the Canny account.",
  },
  dataSourceType: "picklist",
  inputs: selectBoardInputs,
  perform: async (_context, { connection }) => {
    const client = createClient(connection, false);
    const data = await client.post<{ boards: Board[] }>("/boards/list");
    const result = toSortedPicklist(
      data.boards,
      (b) => b.name,
      (b) => b.id,
    );
    return { result };
  },
  examplePayload: selectBoardExamplePayload,
});
