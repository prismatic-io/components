export const createJobApplicationExamplePayload = {
  data: {
    __metadata: {
      uri: "https://api68sales.successfactors.com/odata/v2/JobApplication(388L)",
      type: "SFOData.JobApplication",
    },
    applicationId: "388",
    lastName: "Test",
    firstName: "Test",
    status: "Open",
  },
};

export const listJobApplicationsExamplePayload = {
  data: [createJobApplicationExamplePayload.data],
};
