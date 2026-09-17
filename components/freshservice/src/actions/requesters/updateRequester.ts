import { action, outputSchema } from "@prismatic-io/spectral";
import { createFreshserviceClient } from "../../client";
import { updateRequesterExamplePayload as examplePayload } from "../../examplePayloads";
import { updateRequesterInputs as inputs } from "../../inputs";
import { requesterOutputSchema } from "../../outputSchemas";
export const updateRequester = action({
  display: {
    label: "Update Requester",
    description: "Updates an existing requester.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      connection,
      requesterId,
      jobTitle,
      firstName,
      lastName,
      contactInfo,
      reportingManagerId,
      departmentIds,
      requestersAdditionalFields,
    },
  ) => {
    const client = createFreshserviceClient(connection, {
      debug: context.debug.enabled,
    });
    const payload = {
      first_name: firstName,
      primary_email: contactInfo.primaryEmail,
      last_name: lastName,
      job_title: jobTitle,
      work_phone_number: contactInfo.workPhoneNumber,
      mobile_phone_number: contactInfo.mobilePhoneNumber,
      reporting_manager_id: reportingManagerId,
      secondary_emails: contactInfo.secondaryEmails,
      department_ids: departmentIds,
      address: contactInfo.address,
      ...requestersAdditionalFields,
    };
    const { data } = await client.put(`/requesters/${requesterId}`, payload);
    return {
      data,
    };
  },
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: requesterOutputSchema,
  }),
  inputs,
  examplePayload,
});
