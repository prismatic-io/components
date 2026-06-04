import { dataSource } from "@prismatic-io/spectral";
import { connection } from "../inputs";
import { getCalendlyClient } from "../client";
import { extractUuidFromUri } from "../util";

export const organizations = dataSource({
  display: {
    label: "Select Organization",
    description:
      "Returns the current user's organization for use in other inputs.",
  },
  inputs: {
    connection,
  },
  perform: async (context, { connection }) => {
    const client = getCalendlyClient(connection, false);
    const { data } = await client.get("/users/me");
    const orgUri = data?.resource?.current_organization;

    if (!orgUri) {
      return { result: [] };
    }

    return {
      result: [
        {
          key: orgUri,
          label: `Organization (${extractUuidFromUri(orgUri)})`,
        },
      ],
    };
  },
  dataSourceType: "picklist",
});
