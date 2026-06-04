export const createCandidateExamplePayload = {
  data: {
    __metadata: {
      uri: "https://api68sales.successfactors.com/odata/v2/Candidate(4181L)",
      type: "SFOData.Candidate",
    },
    candidateId: "4181",
    lastName: "Langworthy",
    firstName: "Nancy",
  },
};

export const listCandidatesExamplePayload = {
  data: [createCandidateExamplePayload.data],
};
