export const listMembersFromGroupExamplePayload = {
  data: {
    "@odata.context":
      "https://graph.microsoft.com/v1.0/$metadata#directoryObjects",
    value: [
      {
        id: "11111111-2222-3333-4444-555555555555",
        mail: "user1@contoso.com",
      },
    ],
  },
};

export const addMemberToGroupExamplePayload = {
  data: {
    message: "Successfully added member(s) to group.",
  },
};

export const addMembersToGroupExamplePayload = {
  data: {
    message: "Successfully added member(s) to group.",
  },
};

export const deleteMemberFromGroupExamplePayload = {
  data: {
    success: true,
    id: "11111111-2222-3333-4444-555555555555",
    message: "Member removed from group successfully.",
  },
};

export const selectMemberExamplePayload = {
  result: [
    {
      label: "user1@contoso.com",
      key: "11111111-2222-3333-4444-555555555555",
    },
  ],
};
