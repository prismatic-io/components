import { action } from "@prismatic-io/spectral";
import { createZoomClient } from "../../client";
import {
  connection,
  includeFields,
  license,
  roleId,
  userStatus,
} from "../../inputs";
import { getAllPaginationResults } from "../../util";
import type { User } from "../../interfaces/User";
import { listUsersExamplePayload } from "../../examplePayloads";

export const listUsers = action({
  display: {
    label: "List Users",
    description: "List all users connected to your Zoom account",
  },
  perform: async (
    { debug: { enabled: debug } },
    { connection, status, roleId, includeFields, license },
  ) => {
    const client = createZoomClient({ connection, debug });

    const data: { users: User[] } = await getAllPaginationResults<User>(
      client,
      `/users`,
      "users",
      {
        status,
        role_id: roleId,
        include_fields: includeFields,
        license,
      },
    );

    return {
      data,
    };
  },
  inputs: {
    connection,
    status: userStatus,
    roleId,
    includeFields,
    license,
  },
  examplePayload: listUsersExamplePayload,
});
