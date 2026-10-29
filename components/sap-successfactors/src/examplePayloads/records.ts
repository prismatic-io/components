export const createRecordExamplePayload = {
  data: {
    __metadata: {
      uri: "https://api68sales.successfactors.com/odata/v2/Candidate(4181L)",
      type: "SFOData.Candidate",
    },
    candidateId: "4181",
    firstName: "Nancy",
    lastName: "Langworthy",
    primaryEmail: "nancy.langworthy@example.com",
    country: "US",
    creationDateTime: "/Date(1673880833000+0000)/",
    lastModifiedDateTime: "/Date(1673884433000+0000)/",
  },
};

export const getRecordExamplePayload = createRecordExamplePayload;

export const listRecordsExamplePayload = {
  data: [
    createRecordExamplePayload.data,
    {
      __metadata: {
        uri: "https://api68sales.successfactors.com/odata/v2/Candidate(4182L)",
        type: "SFOData.Candidate",
      },
      candidateId: "4182",
      firstName: "Marcelo",
      lastName: "Reis",
      primaryEmail: "marcelo.reis@example.com",
      country: "BR",
      creationDateTime: "/Date(1673967233000+0000)/",
      lastModifiedDateTime: "/Date(1673970833000+0000)/",
    },
  ],
};

export const deleteRecordExamplePayload = {
  data: "",
};
