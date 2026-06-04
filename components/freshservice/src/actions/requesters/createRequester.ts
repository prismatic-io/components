import { action } from "@prismatic-io/spectral";
import { createFreshserviceClient } from "../../client";
import { createRequesterExamplePayload as examplePayload } from "../../examplePayloads";
import { createRequesterInputs as inputs } from "../../inputs/requesters";

export const createRequester = action({
  display: {
    label: "Create Requester",
    description: "Creates a new requester in Freshservice.",
  },
  perform: async (
    context,
    {
      connection,
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

    const { data } = await client.post(`/requesters`, payload);

    return {
      data,
    };
  },
  inputs,
  examplePayload,
});
