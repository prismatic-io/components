import { dataSource, type Element, util } from "@prismatic-io/spectral";
import { createClient } from "../connections/auth";
import { boardId, connectionInput, filter, maxResults, startAt } from "../inputs";

const selectBoard = dataSource({
  display: {
    label: "Select Board",
    description: "Select a board.",
  },
  inputs: {
    jiraConnection: connectionInput,
    startAt,
    maxResults,
    filter,
  },
  perform: async (_context, { jiraConnection, startAt, maxResults, filter }) => {
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
        startAt: startAt || undefined,
        maxResults: maxResults || undefined,
        filter: filter || undefined,
      },
    });
    const result = data.values.map<Element>(({ name, id }) => ({
      label: name,
      key: util.types.toString(id),
    }));
    return { result };
  },
  dataSourceType: "picklist",
});

const selectBoardVersion = dataSource({
  display: {
    label: "Select Board Version",
    description: "Select a board version.",
  },
  inputs: {
    jiraConnection: connectionInput,
    boardId: {
      ...boardId,
      dataSource: undefined,
    },
    startAt,
    maxResults,
  },
  perform: async (_context, { jiraConnection, boardId, startAt, maxResults }) => {
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
        startAt: startAt || undefined,
        maxResults: maxResults || undefined,
      },
    });
    const result = data.values.map<Element>(({ name, id }) => ({
      label: name,
      key: util.types.toString(id),
    }));
    return { result };
  },
  dataSourceType: "picklist",
});

export default {
  selectBoard,
  selectBoardVersion,
};
