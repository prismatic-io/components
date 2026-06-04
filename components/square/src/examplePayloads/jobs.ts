










export const listJobsExamplePayload = {
  data: {
    jobs: [
      {
        id: "VDNpRv8da51NU8qZFC5zDWpF",
        title: "Cashier",
        is_tip_eligible: true,
        created_at: "2021-06-11T22:55:45Z",
        updated_at: "2021-06-11T22:55:45Z",
        version: 2,
      },
      {
        id: "1yJlHapkseYnNPETIU1B",
        title: "Server",
        is_tip_eligible: true,
        created_at: "2021-06-12T10:30:00Z",
        updated_at: "2021-06-12T10:30:00Z",
        version: 1,
      },
    ],
  },
};






export const createJobExamplePayload = {
  data: {
    job: {
      id: "1yJlHapkseYnNPETIU1B",
      title: "Cashier",
      is_tip_eligible: true,
      created_at: "2021-06-11T22:55:45Z",
      updated_at: "2021-06-11T22:55:45Z",
      version: 1,
    },
  },
};






export const retrieveJobExamplePayload = {
  data: {
    job: {
      id: "1yJlHapkseYnNPETIU1B",
      title: "Cashier",
      is_tip_eligible: true,
      created_at: "2021-06-11T22:55:45Z",
      updated_at: "2021-06-11T22:55:45Z",
      version: 2,
    },
  },
};






export const updateJobExamplePayload = {
  data: {
    job: {
      id: "1yJlHapkseYnNPETIU1B",
      title: "Senior Cashier",
      is_tip_eligible: true,
      created_at: "2021-06-11T22:55:45Z",
      updated_at: "2021-06-13T12:55:45Z",
      version: 2,
    },
  },
};
