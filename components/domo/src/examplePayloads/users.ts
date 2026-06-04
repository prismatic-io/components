













export const getUserExamplePayload = {
  data: {
    id: 87264918,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    alternateEmail: "jsmith@personal.com",
    role: "Admin",
    title: "Data Engineering Lead",
    phone: "+1-512-555-0142",
    location: "Austin, TX",
    timezone: "America/Chicago",
    locale: "en-US",
    employeeNumber: "EMP-1042",
    createdAt: "2022-06-15T13:00:00.000Z",
    updatedAt: "2024-02-20T09:30:00.000Z",
    image: "https://example.domo.com/avatar/87264918",
    groups: [{ id: 400112, name: "Analytics Team" }],
    active: true,
  },
};

export const listUsersExamplePayload = {
  data: [
    getUserExamplePayload.data,
    {
      id: 54320910,
      name: "Carlos Rivera",
      email: "carlos.rivera@example.com",
      alternateEmail: null,
      role: "Participant",
      title: "Business Analyst",
      phone: "+1-737-555-0185",
      location: "Denver, CO",
      timezone: "America/Denver",
      locale: "en-US",
      employeeNumber: "EMP-2078",
      createdAt: "2023-01-10T08:00:00.000Z",
      updatedAt: "2024-01-05T16:45:00.000Z",
      image: null,
      groups: [],
      active: true,
    },
  ],
};

export const createUserExamplePayload = getUserExamplePayload;

export const updateUserExamplePayload = {
  data: {
    ...getUserExamplePayload.data,
    title: "Senior Data Engineering Lead",
    updatedAt: "2024-04-01T10:00:00.000Z",
  },
};

export const deleteUserExamplePayload = { data: null };
