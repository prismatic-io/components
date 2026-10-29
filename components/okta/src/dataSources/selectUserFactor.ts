import { dataSource, type Element } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { selectUserFactorExamplePayload } from "../examplePayloads/dataSources";
import { connection } from "../inputs/general";
import { userId } from "../inputs/users";
import type { Factor } from "../interfaces/user";

export const selectUserFactor = dataSource({
  display: {
    label: "Select User Factor",
    description: "A picklist of a user's factors in your Okta Org.",
  },
  inputs: {
    userId: {
      ...userId,
      dataSource: undefined,
    },
    connection,
  },
  perform: async (_context, { connection, userId }) => {
    const client = await createClient(connection, false);
    const { data } = await client.get<Factor[]>(`/users/${userId}/factors`);

    const result = data.map<Element>((factor) => ({
      label: factor.profile.questionText || factor.id,
      key: factor.id,
    }));

    return {
      result,
    };
  },
  examplePayload: selectUserFactorExamplePayload,
  dataSourceType: "picklist",
});
