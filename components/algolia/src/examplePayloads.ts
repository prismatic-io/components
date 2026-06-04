








export const listIndexesExamplePayload = {
  data: {
    items: [
      {
        name: "contacts",
        createdAt: "2013-08-15T19:49:47.714Z",
        updatedAt: "2013-08-17T07:59:28.313Z",
        entries: 2436442,
        dataSize: 224152664,
        fileSize: 269450853,
        lastBuildTimeS: 0,
        numberOfPendingTask: 0,
        pendingTask: false,
      },
    ],
    nbPages: 1,
  },
};






export const deleteIndexExamplePayload = {
  data: {
    deletedAt: "2013-01-18T15:33:13.556Z",
    taskID: 721,
  },
};






export const moveIndexExamplePayload = {
  data: {
    updatedAt: "2013-08-21T13:20:18.960Z",
    taskID: 10210332,
  },
};






export const copyIndexExamplePayload = {
  data: {
    updatedAt: "2013-08-21T13:20:18.960Z",
    taskID: 10210332,
  },
};




export const updateBatchIndicesExamplePayload = {
  data: {
    taskID: {
      contacts: 792,
      public_contacts: 793,
    },
    objectIDs: ["6891", "6892"],
  },
};






export const getSettingsExamplePayload = {
  data: {
    minWordSizefor1Typo: 4,
    minWordSizefor2Typos: 8,
    hitsPerPage: 20,
    searchableAttributes: null,
    attributesToRetrieve: null,
    attributesToSnippet: null,
    attributesToHighlight: null,
    ranking: [
      "typo",
      "geo",
      "words",
      "proximity",
      "attribute",
      "exact",
      "custom",
    ],
    customRanking: null,
    separatorsToIndex: "",
    queryType: "prefixAll",
  },
};






export const setSettingsExamplePayload = {
  data: {
    updatedAt: "2013-08-21T13:20:18.960Z",
    taskID: 10210332,
  },
};






export const copySettingsExamplePayload = {
  data: {
    updatedAt: "2013-08-21T13:20:18.960Z",
    taskID: 10210332,
  },
};
