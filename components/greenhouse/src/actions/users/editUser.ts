import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { editUserExamplePayload } from "../../examplePayloads";
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
  version,
} from "../../inputs";
import { generatePayload } from "../../util";

export const editUser = action({
  display: {
    label: "Edit User",
    description: "Updates an existing user.",
  },
  perform: async (context, { connection, user_id, version, ...params }) => {
    const client = createClient(connection, version, context.debug.enabled);
    const userPayload = generatePayload(params);
    const { data } = await client.patch(`/users`, userPayload, {
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
    version: { ...version, default: "v2" },
    user_id: on_behalf_of_user_id,
    first_name: {
      ...first_name,
      required: false,
      comments: "The user’s new first name. If included, this cannot be blank.",
    },
    last_name: {
      ...last_name,
      required: false,
      comments: "The user’s new last name. If included, this cannot be blank.",
    },
    email: {
      ...email,
      required: false,
      comments:
        "The user element must contain one of ‘employee_id’, 'email’, or 'user_id’, but not more than one. If included, this cannot be blank, nor can it match any other email for a user in this organization.",
    },
    employee_id: {
      ...employee_id,
      required: false,
      comments:
        "The user’s external employee id. If included, this cannot be blank, nor can it match any other employee-id for a user in this organization.",
    },
    office_ids: {
      ...office_ids,
      required: false,
      comments:
        "Replace the current offices for this user with new offices. An empty array will remove all offices on this user.",
    },
    external_office_ids: {
      ...external_office_ids,
      required: false,
      comments:
        "This may be used instead of office_ids and represents the ID of the office in an external system. If this is used, office_ids must be blank and vice versa.",
    },
    department_ids: {
      ...department_ids,
      required: false,
      comments:
        "Replace the current departments for this user with new departments. An empty array will remove all departments on this user.",
    },
    external_department_ids: {
      ...external_department_ids,
      required: false,
      comments:
        "This may be used instead of department_ids and represents the ID of the department in an external system. If used, department_ids must be blank and vice versa.",
    },
    custom_fields: {
      ...custom_fields,
      required: false,
      comments:
        "Array of hashes containing new custom field values. Passing an empty array does nothing.",
    },
  },
  examplePayload: editUserExamplePayload,
});
