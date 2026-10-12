export const getNoteFieldsExamplePayload = {
  data: {
    success: true,
    data: [
      {
        id: 1,
        key: "content",
        name: "Content",
        field_type: "text",
        active_flag: true,
        edit_flag: false,
        mandatory_flag: true,
      },
      {
        id: 2,
        key: "deal_id",
        name: "Deal",
        field_type: "int",
        active_flag: true,
        edit_flag: false,
        mandatory_flag: false,
      },
      {
        id: 3,
        key: "person_id",
        name: "Person",
        field_type: "int",
        active_flag: true,
        edit_flag: false,
        mandatory_flag: false,
      },
      {
        id: 4,
        key: "org_id",
        name: "Organization",
        field_type: "int",
        active_flag: true,
        edit_flag: false,
        mandatory_flag: false,
      },
    ],
  },
};
