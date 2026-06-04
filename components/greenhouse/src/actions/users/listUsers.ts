import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listUsersExamplePayload } from "../../examplePayloads";
import {
  connectionInput,
  created_after,
  created_before,
  email,
  employee_id,
  page,
  per_page,
  updated_after,
  updated_before,
  user_attributes,
  version,
} from "../../inputs";

import { generatePayload } from "../../util";

export const listUsers = action({
  display: {
    label: "List Users",
    description: "Retrieves a list of users.",
  },
  perform: async (
    context,
    {
      connection,
      version,
      per_page,
      page,
      employee_id,
      created_before,
      created_after,
      updated_after,
      updated_before,
      email,
      user_attributes,
    },
  ) => {
    const client = createClient(connection, version, context.debug.enabled);
    const params = generatePayload({
      per_page,
      page,
      employee_id,
      created_before,
      created_after,
      updated_after,
      updated_before,
      email,
      user_attributes,
    });
    const { data } = await client.get("/users", {
      params,
    });
    return {
      data,
    };
  },
  inputs: {
    connection: connectionInput,
    version,
    per_page,
    page,
    employee_id,
    created_before,
    created_after,
    updated_after,
    updated_before,
    email,
    user_attributes,
  },
  examplePayload: listUsersExamplePayload,
});
