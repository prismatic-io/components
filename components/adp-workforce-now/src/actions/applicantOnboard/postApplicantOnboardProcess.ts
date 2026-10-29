import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { postApplicantOnboardProcessExamplePayload } from "../../examplePayloads";
import { postApplicantOnboardProcessInputs } from "../../inputs";
import { postApplicantOnboardProcessOutputSchema } from "../../outputSchemas";

export const postApplicantOnboardProcess = action({
  display: {
    label: "Post Applicant Onboard Process",
    description: "Manage data related to the applicant onboarding request.",
  },
  inputs: postApplicantOnboardProcessInputs,
  performSafety: "notAllowed",
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
  examplePerform: async (): Promise<{ data: unknown }> =>
    postApplicantOnboardProcessExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: postApplicantOnboardProcessOutputSchema,
  }),
  examplePayload: postApplicantOnboardProcessExamplePayload,
});
