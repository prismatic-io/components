const timeEntryBase = {
  id: "2004673344540003622",
  wid: "9012345",
  user: {
    id: 81942673,
    username: "John Doe",
    color: "#7b68ee",
    email: "john.doe@example.com",
    initials: "JD",
    profilePicture:
      "https://attachments.clickup.com/profilePictures/81942673_abc.jpg",
  },
  billable: false,
  start: "1704067200000",
  description: "Working on homepage layout",
  source: "clickup",
  is_locked: false,
  task_location: {
    list_id: 124,
    folder_id: 457,
    space_id: 790,
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
const timeEntryObject = {
  ...timeEntryBase,
  end: "1704070800000",
  duration: "3600000",
  at: "1704070800000",
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
const timerEntryObject = {
  ...timeEntryBase,
  end: 1704070800000,
  duration: 3600000,
  at: 1704070800000,
};
export const startTimeEntryExamplePayload = {
  data: {
    data: {
      ...timeEntryBase,
      duration: -1704067200000,
      at: 1704067200000,
    },
  },
};
export const stopTimeEntryExamplePayload = {
  data: {
    data: timerEntryObject,
  },
};
export const deleteTimeEntryExamplePayload = {
  data: {
    data: timerEntryObject,
  },
};
