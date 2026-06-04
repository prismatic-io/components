export const AVAILABLE_PROTOCOLS = [
  {
    value: "/odata/v2/",
    label: "OData v2",
  },
  {
    value: "/odatav4/",
    label: "OData v4",
  },
  {
    value: "/rest/",
    label: "REST",
  },
];

export const PAGINATION_DEFAULT_LIMIT = 250;

export const NO_CONTENT_RESPONSE_TEXT = "Action completed successfully";

export const NO_CONTENT_RESPONSE = {
  data: NO_CONTENT_RESPONSE_TEXT,
};




export const POLL_RESOURCE_CONFIG: Record<
  string,
  { endpoint: string; timestampField: string; label: string }
> = {
  candidate: {
    endpoint: "/Candidate",
    timestampField: "lastModifiedDateTime",
    label: "Candidate",
  },
  jobApplication: {
    endpoint: "/JobApplication",
    timestampField: "lastModifiedDateTime",
    label: "Job Application",
  },
  jobRequisition: {
    endpoint: "/JobRequisition",
    timestampField: "lastModifiedDateTime",
    label: "Job Requisition",
  },
  onboardingCandidateInfo: {
    endpoint: "/OnboardingCandidateInfo",
    timestampField: "lastModifiedDateTime",
    label: "Onboarding Candidate Info",
  },
};
