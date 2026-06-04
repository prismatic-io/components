import { dataSource, type Element } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { selectEventHookExamplePayload } from "../examplePayloads/dataSources";
import { connection } from "../inputs/general";
import { listAllEventHooksFN } from "../util/eventHooks";

export const selectEventHook = dataSource({
  display: {
    label: "Select Event Hook",
    description: "A picklist of Event Hooks in your Okta Org.",
  },
  inputs: {
    connection,
  },
  perform: async (_context, { connection }) => {
    const client = await createClient(connection, false);
    const data = await listAllEventHooksFN(client);

    const result = data.map<Element>((eventHook) => ({
      label: eventHook.name,
      key: eventHook.id,
    }));

    return {
      result,
    };
  },
  examplePayload: selectEventHookExamplePayload,
  dataSourceType: "picklist",
});
