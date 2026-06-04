import { dataSource, type Element } from "@prismatic-io/spectral";
import type { Member } from "@slack/web-api/dist/types/response/UsersListResponse";
import { createOauthClient } from "../client";
import { selectUsersInputs } from "../inputs";

export const selectUsers = dataSource({
  display: {
    label: "Select User",
    description: "Select a user from a dropdown menu (up to 10,000 users).",
  },
  inputs: selectUsersInputs,
  perform: async (context, params) => {
    const client = await createOauthClient({
      slackConnection: params.connection,
    });
    let users: Member[] = [];
    let cursor = null;
    let counter = 1;

    do {
      const data = await client.users.list({
        cursor,
        limit: 1000,
      });
      users = [...users, ...data.members];
      cursor = data.response_metadata?.next_cursor;
      counter += 1;
    } while (cursor && counter < 10);

    const objects = users.map<Element>((user) => ({
      key: user.id,
      label: params.showIdInDropdown
        ? `${user.name} (ID: ${user.id})`
        : `${user.name}`,
    }));

    return { result: objects };
  },
  dataSourceType: "picklist",
  examplePayload: {
    result: [
      { key: "C123456", label: "Jhon (ID: C123456)" },
      { key: "C000000", label: "Doe (ID: C000000)" },
    ],
  },
});
