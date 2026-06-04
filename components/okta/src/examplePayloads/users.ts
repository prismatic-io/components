






export const getUserExamplePayload = {
  data: {
    id: "00u118oQYT4TBGuay0g4",
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
    realmId: "guo1afiNtSnZYILxO0g4",
    credentials: {
      password: {},
      provider: {},
    },
    _links: {
      self: {},
    },
  },
};

export const listUsersExamplePayload = {
  data: [getUserExamplePayload.data],
};

export const createUserExamplePayload = getUserExamplePayload;

export const updateUserExamplePayload = getUserExamplePayload;

export const activateUserExamplePayload = {
  data: {
    activationToken: "XE6wE17zmphl3KqAPFxO",
    activationUrl: "https://{yourOktaDomain}/welcome/XE6wE17zmphl3KqAPFxO",
  },
};

export const resetUserPasswordExamplePayload = {
  data: {
    summary: "Reset password without sending email",
    resetPasswordUrl: "https://{yourOktaDomain}/reset_password/XE6wE17zmphl3KqAPFxO",
  },
};

export const setUserPasswordExamplePayload = {
  data: {
    password: {},
    recovery_question: {
      question: "Who's a major player in the cowboy scene?",
    },
    provider: {
      type: "OKTA",
      name: "OKTA",
    },
  },
};

export const listUserGroupsExamplePayload = {
  data: [
    {
      id: "0gabcd1234",
      profile: {
        name: "Cloud app users",
        description: "Users can access cloud apps",
      },
    },
    {
      id: "0gefgh5678",
      profile: {
        name: "Internal app users",
        description: "Users can access internal apps",
      },
    },
  ],
};

export const deactivateUserExamplePayload = {
  data: {
    id: "userId",
    status: "DEPROVISIONED",
  },
};

export const deleteUserExamplePayload = {
  data: {
    id: "userId",
    status: "DELETED",
  },
};

export const unlockUserExamplePayload = {
  data: {
    id: "userId",
    status: "ACTIVE",
  },
};

export const unsuspendUserExamplePayload = unlockUserExamplePayload;

export const suspendUserExamplePayload = {
  data: {
    id: "userId",
    status: "SUSPENDED",
  },
};

export const listUserApplicationsExamplePayload = {
  data: [
    {
      id: "00ub0oNGTSWTBKOLGLNR",
      label: "Google Apps Mail",
      linkUrl: "https://{yourOktaDomain}/home/google/0oa3omz2i9XRNSRIHBZO/50",
      logoUrl: "https://{yourOktaDomain}/img/logos/google-mail.png",
      appName: "google",
      appInstanceId: "0oa3omz2i9XRNSRIHBZO",
      appAssignmentId: "0ua3omz7weMMMQJERBKY",
      credentialsSetup: false,
      hidden: false,
      sortOrder: 0,
    },
    {
      id: "00ub0oNGTSWTBKOLGLNR",
      label: "Google Apps Calendar",
      linkUrl: "https://{yourOktaDomain}/home/google/0oa3omz2i9XRNSRIHBZO/54",
      logoUrl: "https://{yourOktaDomain}/img/logos/google-calendar.png",
      appName: "google",
      appInstanceId: "0oa3omz2i9XRNSRIHBZO",
      appAssignmentId: "0ua3omz7weMMMQJERBKY",
      credentialsSetup: false,
      hidden: false,
      sortOrder: 1,
    },
    {
      id: "00ub0oNGTSWTBKOLGLNR",
      label: "Box",
      linkUrl: "https://{yourOktaDomain}/home/boxnet/0oa3ompioiQCSTOYXVBK/72",
      logoUrl: "https://{yourOktaDomain}/img/logos/box.png",
      appName: "boxnet",
      appInstanceId: "0oa3ompioiQCSTOYXVBK",
      appAssignmentId: "0ua3omx46lYEZLPPRWBO",
      credentialsSetup: false,
      hidden: false,
      sortOrder: 3,
    },
    {
      id: "00ub0oNGTSWTBKOLGLNR",
      label: "Salesforce.com",
      linkUrl: "https://{yourOktaDomain}/home/salesforce/0oa12ecnxtBQMKOXJSMF/46",
      logoUrl: "https://{yourOktaDomain}/img/logos/salesforce_logo.png",
      appName: "salesforce",
      appInstanceId: "0oa12ecnxtBQMKOXJSMF",
      appAssignmentId: "0ua173qgj5VAVOBQMCVB",
      credentialsSetup: true,
      hidden: false,
      sortOrder: 2,
    },
  ],
};

export const clearUserSessionsExamplePayload = {
  data: {
    id: "userId",
    status: "SESSIONS_CLEARED",
  },
};

export const getUserFactorsExamplePayload = {
  data: [
    {
      id: "ufs2bysphxKODSZKWVCT",
      factorType: "question",
      provider: "OKTA",
      vendorName: "OKTA",
      status: "ACTIVE",
      created: "2014-04-15T18:10:06.000Z",
      lastUpdated: "2014-04-15T18:10:06.000Z",
      profile: {
        question: "favorite_art_piece",
        questionText: "What is your favorite piece of art?",
      },
      _links: {
        questions: {
          href: "https://{yourOktaDomain}/api/v1/users/00u15s1KDETTQMQYABRL/factors/questions",
          hints: {
            allow: ["GET"],
          },
        },
        self: {
          href: "https://{yourOktaDomain}/api/v1/users/00u15s1KDETTQMQYABRL/factors/ufs2bysphxKODSZKWVCT",
          hints: {
            allow: ["GET", "DELETE"],
          },
        },
        user: {
          href: "https://{yourOktaDomain}/api/v1/users/00u15s1KDETTQMQYABRL",
          hints: {
            allow: ["GET"],
          },
        },
      },
    },
    {
      id: "ostf2gsyictRQDSGTDZE",
      factorType: "token:software:totp",
      provider: "OKTA",
      status: "PENDING_ACTIVATION",
      created: "2014-06-27T20:27:33.000Z",
      lastUpdated: "2014-06-27T20:27:33.000Z",
      profile: {
        credentialId: "dade.murphy@example.com",
      },
      _links: {
        next: {
          name: "activate",
          href: "https://{yourOktaDomain}/api/v1/users/00u15s1KDETTQMQYABRL/factors/ostf2gsyictRQDSGTDZE/lifecycle/activate",
          hints: {
            allow: ["POST"],
          },
        },
        self: {
          href: "https://{yourOktaDomain}/api/v1/users/00u15s1KDETTQMQYABRL/factors/ostf2gsyictRQDSGTDZE",
          hints: {
            allow: ["GET"],
          },
        },
        user: {
          href: "https://{yourOktaDomain}/api/v1/users/00u15s1KDETTQMQYABRL",
          hints: {
            allow: ["GET"],
          },
        },
      },
      _embedded: {
        activation: {
          timeStep: 30,
          sharedSecret: "HE64TMLL2IUZW2ZLB",
          encoding: "base32",
          keyLength: 16,
        },
      },
    },
  ],
};

export const unenrollUserFactorExamplePayload = {
  data: {
    id: "opf1abcd2EFGHijkL3m4",
    status: "UNENROLLED",
  },
};

export const listUserTypesExamplePayload = {
  data: [
    {
      id: "otyfnly5cQjJT9PnR0g4",
      displayName: "New user type",
      name: "newUserType",
      description: "A new custom user type",
      createdBy: "sprz9fj1ycBcsgopy1d6",
      lastUpdatedBy: "sprz9fj1ycBcsgopy1d6",
      created: "2021-07-05T20:40:38.000Z",
      lastUpdated: "2021-07-05T20:40:38.000Z",
      default: false,
      _links: {
        self: {
          href: "https://{yourOktaDomain}/api/v1/meta/schemas/user/oscz9fj2jMiRBC1ZT1d6",
        },
        schema: {
          href: "https://{yourOktaDomain}/api/v1/meta/schemas/user/oscz9fj2jMiRBC1ZT1d6",
        },
      },
    },
    {
      id: "otyz9fj2jMiRBC1ZT1d6",
      displayName: "User",
      name: "user",
      description: "Okta user profile template with default permission settings",
      createdBy: "sprz9fj1ycBcsgopy1d6",
      lastUpdatedBy: "sprz9fj1ycBcsgopy1d6",
      created: "2021-07-05T20:40:38.000Z",
      lastUpdated: "2021-07-05T20:40:38.000Z",
      default: true,
      _links: {
        self: {
          href: "https://{yourOktaDomain}/api/v1/meta/schemas/user/oscz9fj2jMiRBC1ZT1d6",
        },
        schema: {
          href: "https://{yourOktaDomain}/api/v1/meta/schemas/user/oscz9fj2jMiRBC1ZT1d6",
        },
      },
    },
  ],
};
