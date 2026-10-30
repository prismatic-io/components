import { dataSource, type Element, util } from "@prismatic-io/spectral";
import { createClient } from "../client";
import {
  selectBoardExamplePayload,
  selectBoardVersionExamplePayload,
} from "../examplePayloads";
import { selectBoardInputs, selectBoardVersionInputs } from "../inputs";

const selectBoard = dataSource({
  display: {
    label: "Select Board",
    description: "Select a board.",
  },
  inputs: selectBoardInputs,
  perform: async (
    _context,
    { jiraConnection, startAt, maxResults, filter },
  ) => {
    const client = await createClient(jiraConnection, false);

    const {
      data,
    }: {
      data: {
        values: {
          id: number;
          self: string;
          name: string;
          type: string;
        }[];
      };
    } = await client.get("/board", {
      params: {
        startAt,
        maxResults,
        filter,
      },
    });
    const result = data.values.map<Element>(({ name, id }) => ({
      label: name,
      key: util.types.toString(id),
    }));
    return { result };
  },
  dataSourceType: "picklist",
  examplePayload: selectBoardExamplePayload,
});

const selectBoardVersion = dataSource({
  display: {
    label: "Select Board Version",
    description: "Select a board version.",
  },
  inputs: selectBoardVersionInputs,
  perform: async (
    _context,
    { jiraConnection, boardId, startAt, maxResults },
  ) => {
    const client = await createClient(jiraConnection, false);

    const {
      data,
    }: {
      data: {
        values: {
          id: number;
          name: string;
        }[];
      };
    } = await client.get(`/board/${boardId}/version`, {
      params: {
        startAt,
        maxResults,
      },
    });
    const result = data.values.map<Element>(({ name, id }) => ({
      label: name,
      key: util.types.toString(id),
    }));
    return { result };
  },
  dataSourceType: "picklist",
  examplePayload: selectBoardVersionExamplePayload,
});

export default {
  selectBoard,
  selectBoardVersion,
};
