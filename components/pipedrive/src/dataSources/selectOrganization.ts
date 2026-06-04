import { dataSource, type Element } from "@prismatic-io/spectral";
import { connectionInput } from "../inputs";
import { createClient } from "../client";
import { paginateRecordsWithCursor, sortRecords } from "../util";
import { organizationsDatasource } from "../examplePayloads/datasources";
import type { Organization } from "../types/organization";
import { WebhookVersion } from "../constants";

export const selectOrganization = dataSource({
  display: {
    label: "Select Organization",
    description: "Select an Organization from a dropdown menu.",
  },
  inputs: {
    connectionInput,
  },
  perform: async (_context, { connectionInput }) => {
    const client = createClient(connectionInput, false, WebhookVersion.V2);
    const { data } = await paginateRecordsWithCursor<Organization>(
      client,
      "organizations",
      {},
      true,
    );

    const objects = sortRecords(data, "id").map<Element>((organization) => ({
      key: organization.id.toString(),
      label: organization.org_name,
    }));

    return { result: objects };
  },
  dataSourceType: "picklist",
  examplePayload: {
    result: organizationsDatasource,
  },
});
