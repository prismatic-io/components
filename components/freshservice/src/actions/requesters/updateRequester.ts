import { action } from "@prismatic-io/spectral";
import { createFreshserviceClient } from "../../client";
import { updateRequesterExamplePayload as examplePayload } from "../../examplePayloads";
import { updateRequesterInputs as inputs } from "../../inputs/requesters";

export const updateRequester = action({
  display: {
    label: "Update Requester",
    description: "Updates an existing requester.",
  },
  perform: async (
    context,
    {
      connection,
      requesterId,
      firstName,
      primaryEmail,
      lastName,
      jobTitle,
      workPhoneNumber,
      mobilePhoneNumber,
      reportingManagerId,
      secondaryEmails,
      departmentIds,
      address,
      requestersAdditionalFields,
    },
  ) => {
    const client = createFreshserviceClient(connection, context.debug.enabled);

    const payload = {
      first_name: firstName,
      primary_email: primaryEmail,
      last_name: lastName,
      job_title: jobTitle,
      work_phone_number: workPhoneNumber,
      mobile_phone_number: mobilePhoneNumber,
      reporting_manager_id: reportingManagerId,
      secondary_emails: secondaryEmails,
      department_ids: departmentIds,
      address,
      ...requestersAdditionalFields,
    };

    const { data } = await client.put(`/requesters/${requesterId}`, payload);

    return {
      data,
    };
  },
  inputs,
  examplePayload,
});
