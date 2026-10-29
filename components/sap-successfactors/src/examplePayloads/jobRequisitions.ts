export const createJobRequisitionExamplePayload = {
  data: {
    __metadata: {
      uri: "https://api68sales.successfactors.com/odata/v2/JobRequisition(3040L)",
      type: "SFOData.JobRequisition",
    },
    jobReqId: "3040",
    jobTitle: "Senior Software Engineer",
    status: "Approved",
    templateId: "664",
    stateCode: "CA",
    country: "US",
    department: "Engineering",
    division: "Product",
    location: "San Francisco",
    createdDateTime: "/Date(1673880833000+0000)/",
    lastModifiedDateTime: "/Date(1673884433000+0000)/",
  },
};

export const listJobRequisitionsExamplePayload = {
  data: [createJobRequisitionExamplePayload.data],
};

export const deleteJobRequisitionExamplePayload = {
  data: "",
};
