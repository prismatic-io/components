import { action } from "@prismatic-io/spectral";
import { createClient } from "../../../client";
import { listUsersExamplePayload } from "../../../examplePayloads";
import {
  connectionInput,
  created_after,
  created_before,
  email,
  employee_id,
  pagination,
  updated_after,
  updated_before,
  user_attributes,
  version,
} from "../../../inputs";
import { generatePayload } from "../../../util";
export const listUsers = action({
  display: {
    label: "List Users (Harvest v1/v2)",
    description: "Retrieves a list of users.",
  },
  perform: async (
    context,
    {
      connection,
      version,
      pagination = {},
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
      per_page: pagination.per_page,
      page: pagination.page,
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
    pagination,
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
