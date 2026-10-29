export const createJobApplicationExamplePayload = {
  data: {
    __metadata: {
      uri: "https://api68sales.successfactors.com/odata/v2/JobApplication(388L)",
      type: "SFOData.JobApplication",
    },
    applicationId: "388",
    lastName: "Reis",
    firstName: "Marcelo",
    status: "Open",
    appStatus: "11811",
    jobReqId: "3040",
    posTitle: "Senior Software Engineer",
    jobCode: null,
    appLastModifiedDateTime: "/Date(1673884433000+0000)/",
  },
};

export const listJobApplicationsExamplePayload = {
  data: [createJobApplicationExamplePayload.data],
};
