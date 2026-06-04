



import type { AirtableRecord } from "../types";







export const recordExamplePayload = {
  data: {
    id: "recZ6qSLw0OCA6Xul",
    createdTime: "2022-06-01T17:50:40.000Z",
    fields: {
      Notes: "We finished this and we're ready to move on to our backlog",
      Status: "Complete",
      "Start date": "2022-05-31",
      Projects: "Updated sales process",
      Priority: "High",
      "Assigned to": "Jane Doe",
      Count: 42,
    },
  } as AirtableRecord,
};

export const createRecordExamplePayload = recordExamplePayload;
export const getRecordExamplePayload = recordExamplePayload;
export const updateRecordExamplePayload = recordExamplePayload;






export const listRecordsExamplePayload = {
  data: [
    {
      id: "recZ6qSLw0OCA6Xul",
      createdTime: "2022-06-01T17:50:40.000Z",
      fields: {
        Notes: "We finished this and we're ready to move on to our backlog",
        Status: "Complete",
        "Start date": "2022-05-31",
        Projects: "Updated sales process",
        Priority: "High",
        "Assigned to": "Jane Doe",
        Count: 42,
      },
    },
    {
      id: "rec3EKPqD9kLdNPx2",
      createdTime: "2022-05-15T14:23:10.000Z",
      fields: {
        Notes: "Initial setup and configuration",
        Status: "In Progress",
        "Start date": "2022-05-15",
        Projects: "New feature development",
        Priority: "Medium",
        "Assigned to": "John Smith",
        Count: 15,
      },
    },
  ] as AirtableRecord[],
};






export const deleteRecordExamplePayload = {
  data: {
    deleted: true,
    id: "recZ6qSLw0OCA6Xul",
  },
};
