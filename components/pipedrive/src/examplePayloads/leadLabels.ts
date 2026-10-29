const leadLabelRecord = {
  id: "f08b42a0-4eb5-11ec-81d3-0242ac130003",
  name: "Hot Lead",
  color: "red",
  add_time: "2024-06-15 10:00:00",
  update_time: "2024-06-15 10:00:00",
};

export const getLeadLabelsExamplePayload = {
  data: {
    success: true,
    data: [
      leadLabelRecord,
      {
        id: "a12b34c0-5fb6-11ec-92e4-0242ac140004",
        name: "Warm Lead",
        color: "yellow",
        add_time: "2024-06-15 10:00:00",
        update_time: "2024-06-15 10:00:00",
      },
      {
        id: "b23c45d0-6gc7-11ec-a3f5-0242ac150005",
        name: "Cold Lead",
        color: "blue",
        add_time: "2024-06-15 10:00:00",
        update_time: "2024-06-15 10:00:00",
      },
    ],
  },
};

export const addLeadLabelExamplePayload = {
  data: {
    success: true,
    data: leadLabelRecord,
  },
};

export const updateLeadLabelExamplePayload = {
  data: {
    success: true,
    data: leadLabelRecord,
  },
};

export const deleteLeadLabelExamplePayload = {
  data: {
    success: true,
    data: {
      id: "f08b42a0-4eb5-11ec-81d3-0242ac130003",
    },
  },
};
