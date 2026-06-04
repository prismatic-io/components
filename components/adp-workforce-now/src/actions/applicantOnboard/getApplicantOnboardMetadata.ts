import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getApplicantOnboardMetadataResponse } from "../../examplePayloads";
import { $filterOnboard, connection, contextTemplates } from "../../inputs";

export const getApplicantOnboardMetadata = action({
  display: {
    label: "Get Applicant Onboard Metadata",
    description:
      "Retrieves metadata for the applicant onboarding process, including available fields, templates, and configuration options.",
  },
  inputs: {
    contextTemplates,
    $filter: $filterOnboard,
    connection,
  },
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
  examplePayload: {
    data: getApplicantOnboardMetadataResponse,
  },
});
