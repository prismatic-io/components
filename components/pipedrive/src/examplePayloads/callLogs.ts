const callLogRecord = {
  id: "abc123def456",
  has_recording: false,
  company_id: 12882925,
  user_id: 18487521,
  activity_id: 5,
  subject: "Sales call with prospect",
  duration: "00:05:32",
  outcome: "connected",
  from_phone_number: "+15551234567",
  to_phone_number: "+15559876543",
  start_time: "2024-09-27T14:00:00.000Z",
  end_time: "2024-09-27T14:05:32.000Z",
  person_id: 3,
  org_id: 2,
  deal_id: 1,
  note: "<p>Discussed pricing options</p>",
};

export const addCallLogExamplePayload = {
  data: {
    success: true,
    data: callLogRecord,
  },
};

export const getUserCallLogsExamplePayload = {
  data: {
    success: true,
    data: [callLogRecord],
    additional_data: {
      pagination: {
        start: 0,
        limit: 50,
        more_items_in_collection: false,
      },
    },
  },
};

export const deleteCallLogExamplePayload = {
  data: {
    success: true,
    data: {
      id: "abc123def456",
    },
  },
};

export const getCallLogExamplePayload = {
  data: {
    success: true,
    data: callLogRecord,
  },
};
