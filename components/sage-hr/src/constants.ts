export const POLL_RESOURCE_CONFIG: Record<
  string,
  { label: string; endpoint: string }
> = {
  employees: { label: "Employees", endpoint: "/employees" },
  time_off_requests: {
    label: "Time-off Requests",
    endpoint: "/time-off/requests",
  },
  teams: { label: "Teams", endpoint: "/teams" },
  positions: { label: "Positions", endpoint: "/positions" },
};

export const pollResourceModel = Object.entries(POLL_RESOURCE_CONFIG).map(
  ([value, { label }]) => ({ label, value }),
);
