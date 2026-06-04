import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { updateProblemNoteResponse as examplePayload } from "../../examplePayloads";
import { updateProblemNoteInputs as inputs } from "../../inputs";
import { createPayload } from "../../util";

export const updateProblemNote = action({
  display: {
    label: "Update Problem Note",
    description: "Update a problem note",
  },
  inputs,
  perform: async (
    context,
    {
      connectionInput,
      noteProblemId,
      toUpdateNoteId,
      noteDescription,
      notifyTo,
      additionalFields,
    },
  ) => {
    const client = createClient(connectionInput, context.debug.enabled);
    const payload = createPayload({
      note: {
        description: noteDescription,
        notify_to: notifyTo,
        ...additionalFields,
      },
    });
    const { data } = await client.put(
      `/problems/${noteProblemId}/notes/${toUpdateNoteId}`,
      payload,
    );
    return { data };
  },
  examplePayload,
});
