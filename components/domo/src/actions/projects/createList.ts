import { action, util } from "@prismatic-io/spectral";
import { getDomoClient } from "../../client";
import { createListInputs } from "../../inputs";
import type { CreateListBody } from "../types/CreateListBody";
import { createListExamplePayload } from "../../examplePayloads";

export const createList = action({
  display: {
    label: "Create List",
    description: "Creates a new list within a given project.",
  },
  examplePayload: createListExamplePayload,
  perform: async (context, { connection, projectId, name, type, index }) => {
    const client = await getDomoClient(connection, context.debug.enabled);
    const body: CreateListBody = {
      name,
      type,
      ...(index.length && { index: util.types.toNumber(index) }),
    };
    const { data } = await client.post(`/projects/${projectId}/lists`, body, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    return { data };
  },
  inputs: createListInputs,
});
export default { createList };
