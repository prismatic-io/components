import { action } from "@prismatic-io/spectral";
import { createZoomClient } from "../../client";
import {
  connection,
  meetingId,
  email,
  firstName,
  lastName,
  address,
  city,
  country,
  zip,
  state,
  phone,
  industry,
  org,
  jobTitle,
  purchasingTimeFrame,
  roleInPurchaseProcess,
  numberOfEmployees,
  comments,
  ocurrenceIds,
  autoApprove,
  language,
  customQuestions,
} from "../../inputs";
import { addMeetingRegistrantExamplePayload } from "../../examplePayloads";

export const addMeetingRegistrant = action({
  display: {
    label: "Add Meeting Registrant",
    description: "Add a new registrant to an existing meeting",
  },
  perform: async (
    { debug: { enabled: debug } },
    {
      connection,
      meetingId,
      email,
      firstName,
      lastName,
      address,
      city,
      country,
      zip,
      state,
      phone,
      industry,
      org,
      jobTitle,
      purchasingTimeFrame,
      roleInPurchaseProcess,
      numberOfEmployees,
      customQuestions,
      language,
      autoApprove,
      comments,
      ocurrenceIds,
    },
  ) => {
    const client = createZoomClient({ connection, debug });

    const registrantData = {
      email,
      first_name: firstName,
      last_name: lastName,
      address,
      city,
      country,
      zip,
      state,
      phone,
      industry,
      org,
      job_title: jobTitle,
      purchasing_time_frame: purchasingTimeFrame,
      role_in_purchase_process: roleInPurchaseProcess,
      no_of_employees: numberOfEmployees,
      comments,
      custom_questions: customQuestions,
      language,
      auto_approve: autoApprove,
    };

    const { data } = await client.post(
      `/meetings/${meetingId}/registrants`,
      registrantData,
      {
        params: {
          occurrence_ids: ocurrenceIds,
        },
      },
    );

    return {
      data,
    };
  },
  inputs: {
    connection,
    meetingId,
    email,
    firstName,
    lastName,
    address,
    city,
    country,
    zip,
    state,
    phone,
    industry,
    org,
    jobTitle,
    purchasingTimeFrame,
    roleInPurchaseProcess,
    numberOfEmployees,
    customQuestions,
    language,
    autoApprove,
    comments,
    ocurrenceIds,
  },
  examplePayload: addMeetingRegistrantExamplePayload,
});
