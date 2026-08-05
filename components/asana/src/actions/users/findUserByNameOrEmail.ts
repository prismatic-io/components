import { action } from "@prismatic-io/spectral";
import { createAsanaClient } from "../../client";
import { findUserByNameOrEmailExamplePayload } from "../../examplePayloads";
import { findUserByNameOrEmailInputs } from "../../inputs";
import type { PaginatedResponse, User } from "../../types";
export const findUserByNameOrEmail = action({
  display: {
    label: "Find User by Name or Email",
    description: "Find a user by name or email address within a workspace.",
  },
  perform: async (context, params) => {
    const client = await createAsanaClient(
      params.asanaConnection,
      context.debug.enabled,
    );
    let offset: string | undefined;
    let stop = false;
    while (!stop) {
      const response: PaginatedResponse<User> = await client.get(`/users`, {
        params: {
          offset,
          workspace: params.workspaceId || undefined,
          opt_fields: params.optFields,
        },
      });
      const filteredData = response.data.data.filter(
        (user) =>
          params.userName === user.name || params.userEmail === user.email,
      );
      if (filteredData.length > 0) {
        return { data: filteredData[0] };
      }
      offset = response.data.next_page?.offset;
      if (!offset) {
        stop = true;
      }
    }
    throw new Error(
      `No user could be found with name "${params.userName}" or email "${params.userEmail}".`,
    );
  },
  inputs: findUserByNameOrEmailInputs,
  examplePayload: findUserByNameOrEmailExamplePayload,
});
