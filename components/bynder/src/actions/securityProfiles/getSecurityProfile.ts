import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getSecurityProfileResponse } from "../../examplePayloads";
import { connection, id } from "../../inputs";

export const getSecurityProfile = action({
  display: {
    label: "Get Security Profile",
    description: "Retrieve a specified security profile",
  },
  inputs: {
    id: {
      ...id,
      label: "Security Profile ID",
      comments: "The ID of the security profile to retrieve.",
      dataSource: "selectSecurityProfile",
    },
    connection,
  },
  perform: async (context, { connection, id }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(`/profiles/${id}`);
    return { data };
  },
  examplePayload: {
    data: getSecurityProfileResponse,
  },
});
