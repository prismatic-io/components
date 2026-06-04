import { dataSource, type Element } from "@prismatic-io/spectral";
import { getZendeskClient } from "../client";
import { selectTaskInputs } from "../inputs/dataSources/task";

export const selectTask = dataSource({
  display: {
    label: "Select Task",
    description: "Select a task from your Zendesk Sell account.",
  },
  inputs: selectTaskInputs,
  perform: async (_context, { connection }) => {
    const client = getZendeskClient(connection, false);
    const { data } = await client.get("/tasks", {
      headers: { Accept: "application/json" },
    });

    return {
      result: data.items
        .map((task: any) => {
          return {
            key: task.data.id.toString(),
            label: task.data.content
              ? task.data.content.substring(0, 50) +
                (task.data.content.length > 50 ? "..." : "")
              : `Task ${task.data.id}`,
          } as Element;
        })
        .sort((a: Element, b: Element) =>
          (a.label ?? "") < (b.label ?? "") ? -1 : 1,
        ),
    };
  },
  dataSourceType: "picklist",
  examplePayload: {
    result: [{ label: "Example Task", key: "12345" }],
  },
});
