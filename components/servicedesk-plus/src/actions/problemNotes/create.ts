import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { createProblemNoteResponse as examplePayload } from "../../examplePayloads";
import { createProblemNoteInputs as inputs } from "../../inputs";
import { createPayload } from "../../util";

export const createProblemNote = action({
  display: {
    label: "Create Problem Note",
    description: "Create a new problem note",
  },
  inputs,
  perform: async (
    context,
    {
      connectionInput,
      noteProblemId,
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
    const { data } = await client.post(
      `/problems/${noteProblemId}/notes`,
      payload,
    );
    return { data };
  },
  examplePayload,
});
