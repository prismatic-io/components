import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { createUserExamplePayload } from "../../examplePayloads";
import {
  connectionInput,
  custom_fields,
  department_ids,
  email,
  employee_id,
  external_department_ids,
  external_office_ids,
  first_name,
  last_name,
  office_ids,
  on_behalf_of_user_id,
  send_email_invite,
  version,
} from "../../inputs";
import { generatePayload } from "../../util";

export const createUser = action({
  display: {
    label: "Create User",
    description: "Creates a new user.",
  },
  perform: async (context, { connection, user_id, version, ...params }) => {
    const client = createClient(connection, version, context.debug.enabled);
    const userPayload = generatePayload(params);

    const { data } = await client.post(`/users`, userPayload, {
      headers: {
        "On-Behalf-Of": user_id,
        contentType: "application/json",
      },
    });
    return {
      data,
    };
  },
  inputs: {
    connection: connectionInput,
    version,
    user_id: on_behalf_of_user_id,
    first_name,
    last_name,
    email: { ...email, required: true },
    send_email_invite,
    employee_id,
    office_ids,
    external_office_ids,
    department_ids,
    external_department_ids,
    custom_fields,
  },
  examplePayload: createUserExamplePayload,
});
