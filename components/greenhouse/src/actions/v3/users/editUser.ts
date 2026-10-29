import { action } from "@prismatic-io/spectral";
import { createV3Client } from "../../../client";
import { editUserV3ExamplePayload } from "../../../examplePayloads/v3/users";
import { editUserV3Inputs } from "../../../inputs/v3/users";
import { generatePayload } from "../../../util";

export const editUserV3 = action({
  display: {
    label: "Edit User",
    description: "Updates an existing user in Greenhouse.",
  },
  inputs: editUserV3Inputs,
  perform: async (
    context,
    {
      connection,
      userId,
      firstNameOptional: firstName,
      lastNameOptional: lastName,
      primaryEmailOptional: primaryEmail,
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
      job_title: jobTitle,
      employee_id: employeeId,
      office_ids: officeIds,
      external_office_ids: externalOfficeIds,
      department_ids: departmentIds,
      external_department_ids: externalDepartmentIds,
      interviewer_tag_ids: interviewerTagIds,
      custom_fields: customFields,
    });

    const { data } = await client.patch(`/users/${userId}`, body);
    return { data };
  },
  examplePayload: editUserV3ExamplePayload,
});
