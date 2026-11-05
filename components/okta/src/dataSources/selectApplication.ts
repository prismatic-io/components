import { dataSource, type Element } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { selectApplicationExamplePayload } from "../examplePayloads/dataSources";
import { connection } from "../inputs/general";
import type { Application } from "../interfaces/application";
import { paginateRecordsWithLink } from "../util/util";

export const selectApplication = dataSource({
  display: {
    label: "Select Application",
    description: "A picklist of Applications in your Okta Org.",
  },
  inputs: {
    connection,
  },
  perform: async (_context, { connection }) => {
    const client = await createClient(connection, false);
    const data = await paginateRecordsWithLink<Application>(client, "/apps", true, {});

    const result = data.map<Element>((app) => ({
      label: app.label,
      key: app.id.toString(),
    }));

    return {
      result,
    };
  },
  examplePayload: selectApplicationExamplePayload,
  dataSourceType: "picklist",
});
