export const listAssignableUsersExamplePayload = {
  data: [
    {
      displayName: "exampleUser",
      accountId: "example-483204",
      accountType: "atlassian",
      emailAddress: "someone@example.com",
      active: true,
    },
    {
      displayName: "exampleUser",
      accountId: "example-483204",
      accountType: "atlassian",
      emailAddress: "someone@example.com",
      active: true,
    },
  ],
};

export const getUserExamplePayload = {
  data: {
    self: "https://your-domain.atlassian.net/rest/api/3/user?accountId=5b10a2844c20165700ede21g",
    accountId: "5b10a2844c20165700ede21g",
    accountType: "atlassian",
    emailAddress: "john.doe@example.com",
    avatarUrls: {
      "48x48":
        "https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/5b10a2844c20165700ede21g/48x48.png",
      "24x24":
        "https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/5b10a2844c20165700ede21g/24x24.png",
      "16x16":
        "https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/5b10a2844c20165700ede21g/16x16.png",
      "32x32":
        "https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/5b10a2844c20165700ede21g/32x32.png",
    },
    displayName: "John Doe",
    active: true,
    timeZone: "America/Los_Angeles",
    locale: "en_US",
    groups: {
      size: 3,
      items: [],
    },
    applicationRoles: {
      size: 1,
      items: [],
    },
    expand: "groups,applicationRoles",
  },
};

export const getCurrentUserExamplePayload = {
  data: {
    self: "https://your-domain.atlassian.net/rest/api/3/user?accountId=5b10a2844c20165700ede21g",
    accountId: "5b10a2844c20165700ede21g",
    accountType: "atlassian",
    emailAddress: "current.user@example.com",
    avatarUrls: {
      "48x48":
        "https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/5b10a2844c20165700ede21g/48x48.png",
      "24x24":
        "https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/5b10a2844c20165700ede21g/24x24.png",
      "16x16":
        "https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/5b10a2844c20165700ede21g/16x16.png",
      "32x32":
        "https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/5b10a2844c20165700ede21g/32x32.png",
    },
    displayName: "Current User",
    active: true,
    timeZone: "America/New_York",
    locale: "en_US",
  },
};

export const createUserExamplePayload = {
  data: {
    self: "https://your-domain.atlassian.net/rest/api/2/user?username=newuser",
    key: "newuser",
    name: "newuser",
    emailAddress: "newuser@example.com",
    displayName: "New User",
    active: true,
    timeZone: "America/Los_Angeles",
  },
};

export const findUserExamplePayload = {
  data: [
    {
      self: "https://your-domain.atlassian.net/rest/api/3/user?accountId=5b10a2844c20165700ede21g",
      accountId: "5b10a2844c20165700ede21g",
      accountType: "atlassian",
      avatarUrls: {
        "48x48":
          "https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/5b10a2844c20165700ede21g/48x48.png",
        "24x24":
          "https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/5b10a2844c20165700ede21g/24x24.png",
        "16x16":
          "https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/5b10a2844c20165700ede21g/16x16.png",
        "32x32":
          "https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/5b10a2844c20165700ede21g/32x32.png",
      },
      displayName: "John Smith",
      active: true,
    },
  ],
};

export const searchUsersExamplePayload = {
  data: [
    {
      self: "https://your-domain.atlassian.net/rest/api/3/user?accountId=5b10a2844c20165700ede21g",
      accountId: "5b10a2844c20165700ede21g",
      accountType: "atlassian",
      avatarUrls: {
        "48x48":
          "https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/5b10a2844c20165700ede21g/48x48.png",
        "24x24":
          "https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/5b10a2844c20165700ede21g/24x24.png",
        "16x16":
          "https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/5b10a2844c20165700ede21g/16x16.png",
        "32x32":
          "https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/5b10a2844c20165700ede21g/32x32.png",
      },
      displayName: "Jane Doe",
      active: true,
    },
    {
      self: "https://your-domain.atlassian.net/rest/api/3/user?accountId=5b10a2844c20165700ede22h",
      accountId: "5b10a2844c20165700ede22h",
      accountType: "atlassian",
      avatarUrls: {
        "48x48":
          "https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/5b10a2844c20165700ede22h/48x48.png",
        "24x24":
          "https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/5b10a2844c20165700ede22h/24x24.png",
        "16x16":
          "https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/5b10a2844c20165700ede22h/16x16.png",
        "32x32":
          "https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/5b10a2844c20165700ede22h/32x32.png",
      },
      displayName: "Bob Wilson",
      active: true,
    },
  ],
};
