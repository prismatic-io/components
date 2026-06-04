






export const getGroupExamplePayload = {
  data: {
    id: "00g1emaKYZTWRYYRRTSK",
    created: "2015-02-06T10:11:28.000Z",
    lastUpdated: "2015-10-05T19:16:43.000Z",
    lastMembershipUpdated: "2015-11-28T19:15:32.000Z",
    objectClass: ["okta:user_group"],
    type: "OKTA_GROUP",
    profile: {
      name: "West Coast users",
      description: "All users West of The Rockies",
    },
    _links: {
      logo: [
        {
          name: "medium",
          href: "https://{yourOktaDomain}/img/logos/groups/okta-medium.png",
          type: "image/png",
        },
        {
          name: "large",
          href: "https://{yourOktaDomain}/img/logos/groups/okta-large.png",
          type: "image/png",
        },
      ],
      users: {
        href: "https://{yourOktaDomain}/api/v1/groups/00g1emaKYZTWRYYRRTSK/users",
      },
      apps: {
        href: "https://{yourOktaDomain}/api/v1/groups/00g1emaKYZTWRYYRRTSK/apps",
      },
    },
  },
};

export const createGroupExamplePayload = getGroupExamplePayload;

export const updateGroupExamplePayload = getGroupExamplePayload;

export const listGroupsExamplePayload = {
  data: [getGroupExamplePayload.data],
};

export const assignUserToGroupExamplePayload = {
  data: {
    success: true,
    message: `User 123 added to group 123`,
  },
};

export const removeUserFromGroupExamplePayload = {
  data: {
    success: true,
    message: `User 123 removed from group 123`,
  },
};

export const deleteGroupExamplePayload = {
  data: {
    id: "00g1emaKYZTWRYYRRTSK",
    status: "DELETED",
  },
};

export const listGroupUsersExamplePayload = {
  data: [
    {
      id: "00u118oQYT4TBTemp0g4",
      status: "ACTIVE",
      created: "2022-04-04T15:56:05.000Z",
      activated: null,
      statusChanged: null,
      lastLogin: "2022-05-04T19:50:52.000Z",
      lastUpdated: "2022-05-05T18:15:44.000Z",
      passwordChanged: "2022-04-04T16:00:22.000Z",
      type: {
        id: "oty1162QAr8hJjTaq0g4",
      },
      profile: {
        firstName: "Alice",
        lastName: "Smith",
        mobilePhone: null,
        secondEmail: null,
        login: "alice.smith@example.com",
        email: "alice.smith@example.com",
      },
      credentials: {
        password: {},
        provider: {
          type: "OKTA",
          name: "OKTA",
        },
      },
      _links: {
        self: {
          href: "http://your-subdomain.okta.com/api/v1/users/00u118oQYT4TBGuay0g4",
        },
      },
    },
  ],
};
