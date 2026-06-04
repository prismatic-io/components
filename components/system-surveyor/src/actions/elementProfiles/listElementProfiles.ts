import { action } from "@prismatic-io/spectral";
import { createSsvClient } from "../../client";
import { listElementProfilesExamplePayload } from "../../examplePayloads/elementProfiles";
import { listElementProfilesInputs } from "../../inputs";
import { fetchPaginatedResults } from "../../util";






export const listElementProfiles = action({
  display: {
    label: "List Element Profiles",
    description: "Retrieve element profiles available for a specific team.",
  },
  inputs: listElementProfilesInputs,
  perform: async (
    context,
    { ssvConnection, teamId, fetchAll, pageNumber, pageSize },
  ) => {
    const client = await createSsvClient(ssvConnection, context);

    const data = await fetchPaginatedResults(
      client,
      `/v3/team/${teamId}/element_profiles`,
      {
        fetchAll,
        pageNumber,
        pageSize,
      },
    );

    return { data };
  },
  examplePayload: listElementProfilesExamplePayload,
});
