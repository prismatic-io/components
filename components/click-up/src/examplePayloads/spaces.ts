















const spaceObject = {
  id: "790",
  name: "Engineering",
  private: false,
  statuses: [
    {
      id: "p790_awaiting",
      status: "to do",
      type: "open",
      orderindex: 0,
      color: "#d3d3d3",
    },
    {
      id: "p790_inprogress",
      status: "in progress",
      type: "custom",
      orderindex: 1,
      color: "#4194f6",
    },
    {
      id: "p790_review",
      status: "review",
      type: "custom",
      orderindex: 2,
      color: "#a875ff",
    },
    {
      id: "p790_closed",
      status: "complete",
      type: "closed",
      orderindex: 3,
      color: "#6bc950",
    },
  ],
  multiple_assignees: true,
  features: {
    due_dates: {
      enabled: true,
      start_date: true,
      remap_due_dates: true,
      remap_closed_due_date: false,
    },
    sprints: { enabled: false },
    time_tracking: { enabled: true },
    points: { enabled: false },
    custom_items: { enabled: false },
    tags: { enabled: true },
    time_estimates: { enabled: true },
    check_unresolved: {
      enabled: true,
      subtasks: null,
      checklists: null,
      comments: null,
    },
    zoom: { enabled: false },
    milestones: { enabled: false },
    remap_dependencies: { enabled: true },
    dependency_warning: { enabled: true },
    multiple_assignees: { enabled: true },
    emails: { enabled: true },
  },
  archived: false,
};

export const getSpaceExamplePayload = {
  data: spaceObject,
};

export const listSpacesExamplePayload = {
  data: {
    spaces: [spaceObject],
  },
};

export const createSpaceExamplePayload = {
  data: spaceObject,
};

export const updateSpaceExamplePayload = {
  data: spaceObject,
};

export const deleteSpaceExamplePayload = {
  data: null,
};
