import { action } from "@prismatic-io/spectral";
import { createSsvClient } from "../../client";
import { getElementProfileAccessoriesExamplePayload } from "../../examplePayloads/elementProfiles";
import { getElementProfileAccessoriesInputs } from "../../inputs";






export const getElementProfileAccessories = action({
  display: {
    label: "Get Element Profile Accessories",
    description:
      "Retrieve accessories associated with a specific element profile.",
  },
  inputs: getElementProfileAccessoriesInputs,
  perform: async (context, { ssvConnection, teamId, elementId }) => {
    const client = await createSsvClient(ssvConnection, context);
    const { data } = await client.get(
      `/v3/team/${teamId}/element_profile/${elementId}/accessories`,
    );

    return { data };
  },
  examplePayload: getElementProfileAccessoriesExamplePayload,
});
