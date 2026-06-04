

























const exampleRecordPayload = {
  id: 12,
  website_url: "/partners/john-doe-12",
  email: "john.doe@example.com",
  name: "John Doe",
  display_name: "John Doe",
  lang: "en_US",
};

export const listRecordsExamplePayload = {
  data: [exampleRecordPayload],
};

export const getRecordByIdExamplePayload = { data: exampleRecordPayload };

export const getRecordByExternalIdExamplePayload = {
  data: exampleRecordPayload,
};

export const deleteRecordByIdExamplePayload = { data: true };

export const createRecordExamplePayload = { data: 25 };

export const updateRecordExamplePayload = { data: true };

export const setExternalIdExamplePayload = { data: 21943 };
