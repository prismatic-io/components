import { input } from "@prismatic-io/spectral";
import { applicantOnboardingProcessPayload } from "../exampleInputs";
import { cleanObject, cleanString } from "../util";
import { $filter, connection } from "./common";

const contextTemplates = input({
  label: "Context Templates",
  type: "string",
  model: [
    {
      label: "United States Templates",
      value: "US",
    },
    {
      label: "Canadian Templates",
      value: "CA",
    },
    {
      label: "International Templates",
      value: "INT",
    },
  ],
  required: true,
  default: "US",
  comments: "The geopolitical context template for the onboarding process.",
  placeholder: "Select context template",
  clean: cleanString,
});

const applicantOnboarding = input({
  label: "Applicant Onboarding",
  type: "code",
  language: "json",
  required: true,
  comments:
    "The applicant onboarding data as JSON. The example is a minimal in-progress onboarding payload for a US client applicant; refer to the ADP API documentation for payloads from other countries and the full list of fields.",
  placeholder: "Enter applicant onboarding JSON",
  example: JSON.stringify(applicantOnboardingProcessPayload, null, 2),
  clean: cleanObject,
});

export const getApplicantOnboardMetadataInputs = {
  contextTemplates,
  $filter: {
    ...$filter,
    comments:
      "Specifies an expression to filter onboarding metadata results. Use OData filter syntax to match specific template codes or criteria.",
    placeholder: "Enter filter expression",
    example:
      "meta/applicantOnboarding/onboardingTemplateCode/code eq '{{onboardingTemplateCode}}'",
  },
  connection,
};

export const postApplicantOnboardProcessInputs = {
  applicantOnboarding,
  connection,
};
