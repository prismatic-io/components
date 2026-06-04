import { dataSource, type Element } from "@prismatic-io/spectral";
import { getMondayClient } from "../client";
import { selectBoardInputs } from "../inputs";
import type { BoardIdName } from "../types";
import { getAllBoards } from "../util";

export const selectBoard = dataSource({
  display: {
    label: "Select Board",
    description: "Select a board from the list of boards.",
  },
  inputs: selectBoardInputs,
  perform: async (_context, { connection }) => {
    const client = getMondayClient(connection, false);

    const { boards } = await getAllBoards<BoardIdName>(client, true);

    const result = boards.map<Element>((board) => ({
      label: board.name,
      key: board.id,
    }));
    return { result };
  },
  dataSourceType: "picklist",
});
