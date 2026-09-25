import { dataSource, type Element, util } from "@prismatic-io/spectral";
import { createClient } from "../auth";
import { selectUserExamplePayload } from "../examplePayloads";
import { selectUserInputs } from "../inputs";
import { byElementLabel } from "../util";
export const selectUser = dataSource({
  display: {
    label: "Select User",
    description: "Select a user from the Zendesk account.",
  },
  perform: async (_context, { zendeskConnection }) => {
    const client = createClient({
      zendeskConnection,
    });
    const result = await client.users.list();
    return {
      result: result
        .map<Element>((user) => ({
          label: user.name,
          key: util.types.toString(user.id),
        }))
        .sort(byElementLabel),
    };
  },
  inputs: selectUserInputs,
  dataSourceType: "picklist",
  examplePayload: selectUserExamplePayload,
});
