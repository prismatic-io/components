



















const timeEntryObject = {
  id: "2004673344540003622",
  wid: "9012345",
  user: {
    id: 81942673,
    username: "John Doe",
    color: "#7b68ee",
    email: "john.doe@example.com",
    profilePicture: null,
  },
  billable: false,
  start: "1704067200000",
  end: "1704070800000",
  duration: "3600000",
  description: "Working on homepage layout",
  source: "clickup",
  at: "1704070800000",
  is_locked: false,
  task_location: {
    list_id: "124",
    folder_id: "457",
    space_id: "790",
    list_name: "Sprint Backlog",
    folder_name: "Website Redesign",
    space_name: "Engineering",
  },
  task: {
    id: "9hx",
    name: "Design Homepage",
    status: {
      status: "in progress",
      color: "#4194f6",
      type: "custom",
      orderindex: 1,
    },
    custom_type: null,
  },
  tags: [
    {
      name: "development",
      tag_bg: "#1e90ff",
      tag_fg: "#ffffff",
      creator: 81942673,
    },
  ],
  task_url: "https://app.clickup.com/t/9hx",
};

export const getSingularTimeEntryExamplePayload = {
  data: {
    data: timeEntryObject,
  },
};

export const getTimeEntriesWithinDateRangeExamplePayload = {
  data: {
    data: [timeEntryObject],
  },
};

export const createTimeEntryExamplePayload = {
  data: {
    data: timeEntryObject,
  },
};

export const updateTimeEntryExamplePayload = {
  data: {
    data: timeEntryObject,
  },
};

export const startTimeEntryExamplePayload = {
  data: {
    data: timeEntryObject,
  },
};

export const stopTimeEntryExamplePayload = {
  data: {
    data: timeEntryObject,
  },
};

export const deleteTimeEntryExamplePayload = {
  data: null,
};
