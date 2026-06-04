import { dataSource, type Element } from "@prismatic-io/spectral";
import { getZendeskClient } from "../client";
import { selectNoteInputs } from "../inputs/dataSources/note";

export const selectNote = dataSource({
  display: {
    label: "Select Note",
    description: "Select a note from your Zendesk Sell account.",
  },
  inputs: selectNoteInputs,
  perform: async (_context, { connection }) => {
    const client = getZendeskClient(connection, false);
    const { data } = await client.get("/notes", {
      headers: { Accept: "application/json" },
    });

    return {
      result: data.items
        .map((note: any) => {
          return {
            key: note.data.id.toString(),
            label: note.data.content
              ? note.data.content.substring(0, 50) +
                (note.data.content.length > 50 ? "..." : "")
              : `Note ${note.data.id}`,
          } as Element;
        })
        .sort((a: Element, b: Element) =>
          (a.label ?? "") < (b.label ?? "") ? -1 : 1,
        ),
    };
  },
  dataSourceType: "picklist",
  examplePayload: {
    result: [{ label: "Example Note", key: "12345" }],
  },
});
