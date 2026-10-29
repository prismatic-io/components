import type { JamfUser, RichPagedResponse } from "../types";

export const listUsersExamplePayload: { data: RichPagedResponse<JamfUser> } = {
  data: {
    results: [
      {
        id: "42",
        username: "jdoe",
        realname: "Jane Doe",
        email: "jdoe@example.com",
        position: "Software Engineer",
        enableCustomPhotoUrl: false,
        customPhotoUrl: null,
        ldapServer: null,
        extensionAttributes: [],
      },
    ],
    totalCount: 1,
    page: 0,
    pageSize: 100,
    totalPages: 1,
    hasNext: false,
    hasPrevious: false,
  },
};
