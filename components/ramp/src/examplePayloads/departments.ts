export const getDepartmentResponse = {
  id: "c16b6ee1-2f5d-45e9-9fb4-c1c541a9ea70",
  name: "Bookkeeping",
};

export const listDepartmentsResponse = {
  data: [getDepartmentResponse],
  page: {
    next: "https://api.example.com/departments?page=2",
  },
};
