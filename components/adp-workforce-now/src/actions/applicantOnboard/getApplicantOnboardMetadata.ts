import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getApplicantOnboardMetadataExamplePayload } from "../../examplePayloads";
import { getApplicantOnboardMetadataInputs } from "../../inputs";
import { getApplicantOnboardMetadataOutputSchema } from "../../outputSchemas";
export const getApplicantOnboardMetadata = action({
  display: {
    label: "Get Applicant Onboard Metadata",
    description:
      "Retrieves metadata for the applicant onboarding process, including available fields, templates, and configuration options.",
  },
  inputs: getApplicantOnboardMetadataInputs,
  performSafety: "safe",
  perform: async (context, { connection, contextTemplates, $filter }) => {
    const axiosClient = await createClient(
      context,
      connection,
      context.debug.enabled,
    );
    const { data } = await axiosClient.get("/hcm/v2/applicant.onboard/meta", {
      params: {
        $filter,
      },
      headers: {
        "ADP-Context-ExpressionID": `country=${contextTemplates}`,
      },
    });
    return { data };
  },
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getApplicantOnboardMetadataOutputSchema,
  }),
  examplePayload: getApplicantOnboardMetadataExamplePayload,
});
