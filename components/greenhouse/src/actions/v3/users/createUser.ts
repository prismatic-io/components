import { action } from "@prismatic-io/spectral";
import { createV3Client } from "../../../client";
import { createUserV3ExamplePayload } from "../../../examplePayloads/v3/users";
import { createUserV3Inputs } from "../../../inputs/v3/users";
import { generatePayload } from "../../../util";

export const createUserV3 = action({
  display: {
    label: "Create User",
    description: "Creates a new user in Greenhouse.",
  },
  inputs: createUserV3Inputs,
  perform: async (
    context,
    {
      connection,
      firstName,
      lastName,
      primaryEmailRequired: primaryEmail,
      sendEmailInvite,
      jobTitle,
      employeeId,
      officeIdsWrite: officeIds,
      externalOfficeIds,
      departmentIdsWrite: departmentIds,
      externalDepartmentIds,
      interviewerTagIds,
      customFields,
    },
  ) => {
    const client = createV3Client(connection, context.debug.enabled);

    const body = generatePayload({
      first_name: firstName,
      last_name: lastName,
      primary_email: primaryEmail,
      send_email_invite: sendEmailInvite,
      job_title: jobTitle,
      employee_id: employeeId,
      office_ids: officeIds,
      external_office_ids: externalOfficeIds,
      department_ids: departmentIds,
      external_department_ids: externalDepartmentIds,
      interviewer_tag_ids: interviewerTagIds,
      custom_fields: customFields,
    });

    const { data } = await client.post("/users", body);
    return { data };
  },
  examplePayload: createUserV3ExamplePayload,
});
