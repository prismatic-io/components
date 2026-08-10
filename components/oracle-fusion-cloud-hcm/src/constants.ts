export const ATOM_FEED_CONFIG: Record<
  string,
  {
    label: string;
  }
> = {
  NewHire: { label: "New Hire" },
  EmployeeUpdate: { label: "Employee Update" },
  Assignment: { label: "Assignment" },
  Termination: { label: "Termination" },
};
export const REST_RESOURCE_CONFIG: Record<
  string,
  {
    label: string;
    endpoint: string;
  }
> = {
  Workers: { label: "Workers", endpoint: "/publicWorkers" },
  Departments: { label: "Departments", endpoint: "/organizations" },
  Jobs: { label: "Jobs", endpoint: "/jobs" },
  Locations: { label: "Locations", endpoint: "/locationsV2" },
};
export const FETCH_ALL_PAGE_SIZE = 500;
export const DATASOURCE_PAGE_SIZE = 500;
