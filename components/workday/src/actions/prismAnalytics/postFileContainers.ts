import { action } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import { SERVICES } from "../../constants";
import { postFileContainersExamplePayload } from "../../examplePayloads";
import { postFileContainersInputs } from "../../inputs";

export const postFileContainers = action({
  display: {
    label: "Create File Container",
    description: "Creates a new file container.",
  },
  perform: async (context, { connection, tenant }) => {
    const client = getClient(connection, context.debug.enabled);
    const { data } = await client.post(
      `${SERVICES.prismAnalytics}/${tenant}/fileContainers`,
    );
    return {
      data,
    };
  },
  inputs: postFileContainersInputs,
  examplePayload: postFileContainersExamplePayload,
});
