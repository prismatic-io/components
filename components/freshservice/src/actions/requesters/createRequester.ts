import { action, outputSchema } from "@prismatic-io/spectral";
import { createFreshserviceClient } from "../../client";
import { createRequesterExamplePayload as examplePayload } from "../../examplePayloads";
import { createRequesterInputs as inputs } from "../../inputs";
import { requesterOutputSchema } from "../../outputSchemas";
export const createRequester = action({
  display: {
    label: "Create Requester",
    description: "Creates a new requester in Freshservice.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      connection,
      firstName,
      primaryEmail,
      lastName,
      jobTitle,
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
      primary_email: primaryEmail,
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
    const { data } = await client.post(`/requesters`, payload);
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
