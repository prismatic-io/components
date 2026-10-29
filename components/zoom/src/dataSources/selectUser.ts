import { dataSource, type Element } from "@prismatic-io/spectral";
import { connection } from "../inputs";
import { createZoomClient } from "../client";
import { getAllPaginationResults } from "../util";
import type { User } from "../interfaces/User";

export const selectUser = dataSource({
  display: {
    label: "Select User",
    description: "A Picklist of Zoom users.",
  },
  dataSourceType: "picklist",
  inputs: { connection },
  perform: async (_context, { connection }) => {
    const client = createZoomClient({ connection });
    const data: { users: User[] } = await getAllPaginationResults<User>(
      client,
      "/users",
      "users",
    );

    const result = data.users.map(({ id, display_name }): Element => {
      return {
        label: display_name,
        key: id,
      };
    });

    return {
      result,
    };
  },
});
