import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getProblemNoteResponse as examplePayload } from "../../examplePayloads";
import { getProblemNoteInputs as inputs } from "../../inputs";

export const getProblemNote = action({
  display: {
    label: "Get Problem Note",
    description: "Get a problem note",
  },
  inputs,
  perform: async (context, { connectionInput, noteProblemId, toGetNoteId }) => {
    const client = createClient(connectionInput, context.debug.enabled);

    const { data } = await client.get(
      `/problems/${noteProblemId}/notes/${toGetNoteId}`,
    );
    return { data };
  },
  examplePayload,
});
