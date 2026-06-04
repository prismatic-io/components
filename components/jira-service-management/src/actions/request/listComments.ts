import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listCommentsExamplePayload } from "../../examplePayloads";
import { listCommentsInputs } from "../../inputs";
import type { Comment } from "../../types";
import { getPaginatedData } from "../../util";

export const listComments = action({
  display: {
    label: "List Comments",
    description: "Returns comments for a service request.",
  },
  inputs: listCommentsInputs,
  perform: async (
    context,
    { connection, issueIdOrKey, start, limit, fetchAll },
  ) => {
    const { client } = await createClient(connection, context.debug.enabled);
    const { data } = await getPaginatedData<Comment>(
      client,
      `/request/${issueIdOrKey}/comment`,
      fetchAll,
      { params: { start, limit } },
    );
    return { data };
  },
  examplePayload: listCommentsExamplePayload,
});
