import { input } from "@prismatic-io/spectral";
import { applicantOnboardingProcessPayload } from "../exampleInputs";
import { cleanObject, cleanString } from "../util";
import { connection } from "./common";


export const contextTemplates = input({
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

export const applicantOnboarding = input({
  label: "Applicant Onboarding",
  type: "code",
  language: "json",
  required: true,
  comments:
    "The applicant onboarding data, the example payload has a the structure of a minimal onboarding inprogress payload for a US Client applicant. Please refer to the docs to see examples from other countries and full list of fields",
  example: JSON.stringify(applicantOnboardingProcessPayload, null, 2),
  clean: cleanObject,
});

export const $filterOnboard = input({
  label: "Filter",
  type: "string",
  required: false,
  comments:
    "Specifies an expression to filter onboarding metadata results. Use OData filter syntax to match specific template codes or criteria.",
  placeholder:
    "meta/applicantOnboarding/onboardingTemplateCode/code eq '{{onboardingTemplateCode}}'",
  example:
    "meta/applicantOnboarding/onboardingTemplateCode/code eq '{{onboardingTemplateCode}}'",
  clean: cleanString,
});


export const createApplicantOnboardingInputs = {
  connection,
  contextTemplates,
  applicantOnboarding,
};
