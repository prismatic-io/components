import { action } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "../../client";
import { searchTeamMembersExamplePayload } from "../../examplePayloads";
import { searchTeamMembersInputs } from "../../inputs";

export const searchTeamMembers = action({
  display: {
    label: "Search Team Members",
    description: "Searches for team members based on the given filters.",
  },
  perform: async (
    context,
    { searchQuery, squareConnection, pagination = {} },
  ) => {
    const client = await createAuthorizedClient(
      squareConnection,
      context.debug.enabled,
    );

    const requestBody: {
      limit?: number;
      query: unknown;
      cursor?: string;
    } = {
      query: searchQuery,
    };

    if (typeof pagination.limit === "number") {
      requestBody.limit = pagination.limit;
    }

    if (typeof pagination.cursor === "string" && pagination.cursor !== "") {
      requestBody.cursor = pagination.cursor;
    }

    const response = await client.request({
      url: "/v2/team-members/search",
      method: "POST",
      data: requestBody,
    });

    return {
      data: response.data,
    };
  },
  inputs: searchTeamMembersInputs,
  examplePayload: searchTeamMembersExamplePayload,
});
