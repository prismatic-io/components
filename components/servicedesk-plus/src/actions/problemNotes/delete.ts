import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { deleteProblemNoteResponse as examplePayload } from "../../examplePayloads";
import { deleteProblemNoteInputs as inputs } from "../../inputs";

export const deleteProblemNote = action({
  display: {
    label: "Delete Problem Note",
    description: "Delete a problem note",
  },
  inputs,
  perform: async (
    context,
    { connectionInput, noteProblemId, toDeleteNoteId },
  ) => {
    const client = createClient(connectionInput, context.debug.enabled);

    const { data } = await client.delete(
      `/problems/${noteProblemId}/notes/${toDeleteNoteId}`,
    );
    return { data };
  },
  examplePayload,
});
