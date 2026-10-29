export const createCandidateExamplePayload = {
  data: {
    __metadata: {
      uri: "https://api68sales.successfactors.com/odata/v2/Candidate(4181L)",
      type: "SFOData.Candidate",
    },
    candidateId: "4181",
    lastName: "Langworthy",
    firstName: "Nancy",
    primaryEmail: "nancy.langworthy@example.com",
    cellPhone: null,
    country: "US",
    address: null,
    city: null,
    zip: null,
    creationDateTime: "/Date(1673880833000+0000)/",
    lastModifiedDateTime: "/Date(1673884433000+0000)/",
  },
};

export const listCandidatesExamplePayload = {
  data: [createCandidateExamplePayload.data],
};
