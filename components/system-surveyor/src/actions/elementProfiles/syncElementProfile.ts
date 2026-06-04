import { action } from "@prismatic-io/spectral";
import { createSsvClient } from "../../client";
import { syncElementProfileExamplePayload } from "../../examplePayloads/elementProfiles";
import { syncElementProfileInputs } from "../../inputs";






export const syncElementProfile = action({
  display: {
    label: "Sync Element Profile",
    description: "Create a new or update an existing Element Profile.",
  },
  inputs: syncElementProfileInputs,
  perform: async (
    context,
    { ssvConnection, teamId, elementId, name, content, accessories },
  ) => {
    const client = await createSsvClient(ssvConnection, context);
    const requiredContent = content ? content : {};
    const requestData = {
      name,
      content: requiredContent,
      accessories,
    };

    const { data } = await client.post(
      `/v3/team/${teamId}/element_profile/${elementId}/save`,
      requestData,
    );

    return { data };
  },
  examplePayload: syncElementProfileExamplePayload,
});
