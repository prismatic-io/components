



export const getContactExamplePayload = {
  data: {
    contact_id: "string",
    user_id: "string",
    name: "string",
    groupid: "string",
    description: "string",
    online_state: 0,
    email: "string",
    profilepicture_url: "string",
    supported_features: "string",
  },
};

export const createContactExamplePayload = getContactExamplePayload;

export const listContactsExamplePayload = {
  data: {
    contacts: [getContactExamplePayload.data],
    invitations: [
      {
        groupid: "string",
        email: "string",
      },
    ],
  },
};
