import { action } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import { SERVICES } from "../../constants";
import { getWorkerBusinessTitleChangesExamplePayload } from "../../examplePayloads";
import { getWorkerBusinessTitleChangesInputs } from "../../inputs";

export const getWorkerBusinessTitleChanges = action({
  display: {
    label: "Get Worker Business Title Changes",
    description:
      "Retrieves a collection of business title changes for the specified worker.",
  },
  perform: async (context, { connection, workerId, limit, offset }) => {
    const client = getClient(connection, context.debug.enabled);
    const { data } = await client.get(
      `${SERVICES.common}/workers/${workerId}/businessTitleChanges`,
      { params: { limit, offset } },
    );
    return {
      data,
    };
  },
  inputs: getWorkerBusinessTitleChangesInputs,
  examplePayload: getWorkerBusinessTitleChangesExamplePayload,
});
