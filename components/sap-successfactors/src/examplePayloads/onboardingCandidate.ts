const onboardingCandidateInfo = {
  __metadata: {
    uri: "https://api68sales.successfactors.com/odata/v2/OnboardingCandidateInfo('4181')",
    type: "SFOData.OnboardingCandidateInfo",
  },
  candidateId: "4181",
  applicantId: "4181",
  fName: "Nancy",
  lName: "Langworthy",
  email: "nancy.langworthy@example.com",
  jobTitle: "Senior Software Engineer",
  jobReqId: "3040",
  department: "Engineering",
  division: "Product",
  location: "San Francisco",
  payGrade: "GR-07",
  workCountry: "US",
  hireDate: "/Date(1675209600000)/",
  hired: false,
  readyToHire: true,
  internalHire: false,
  globalAssignment: false,
  crossboarded: false,
  fromExternalATS: false,
  failedSEBEventsOccured: false,
  onboardingLocale: "en_US",
  managerId: "108",
  hrManagerId: "110",
  processorId: "112",
  userId: null,
  kmsUserId: null,
  mdfSystemRecordStatus: "active",
  createdBy: "admin",
  createdDateTime: "/Date(1673880833000)/",
  lastModifiedBy: "admin",
  lastModifiedDateTime: "/Date(1673884433000)/",
};

export const createOnboardingCandidateInfoExamplePayload = {
  data: {
    d: onboardingCandidateInfo,
  },
};

export const getOnboardingCandidateInfoExamplePayload =
  createOnboardingCandidateInfoExamplePayload;

export const listOnboardingCandidateInfoExamplePayload = {
  data: [onboardingCandidateInfo],
};

export const updateOnboardingCandidateInfoExamplePayload = {
  data: "",
};

export const deleteOnboardingCandidateInfoExamplePayload = {
  data: "",
};
