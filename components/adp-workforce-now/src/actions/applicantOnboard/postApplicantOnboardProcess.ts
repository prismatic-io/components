import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getApplicantOnboardMetadataResponse } from "../../examplePayloads";
import { applicantOnboarding, connection } from "../../inputs";

export const postApplicantOnboardProcess = action({
  display: {
    label: "Post Applicant Onboard Process",
    description: "Manage data related to the applicant onboarding request.",
  },
  inputs: {
    applicantOnboarding,
    connection,
  },
  perform: async (context, { connection, applicantOnboarding }) => {
    const axiosClient = await createClient(
      context,
      connection,
      context.debug.enabled,
    );
    const { data } = await axiosClient.post("/hcm/v2/applicant.onboard", {
      applicantOnboarding,
    });
    return { data };
  },
  examplePayload: {
    data: getApplicantOnboardMetadataResponse,
  },
});
