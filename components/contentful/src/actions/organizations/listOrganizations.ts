import { action } from "@prismatic-io/spectral";
import type { Organization, OrganizationProp } from "contentful-management";
import { createClient } from "../../client";
import { listOrganizationsExamplePayload } from "../../examplePayloads";
import { listOrganizationsInputs } from "../../inputs";
import { getAllPaginatedItems } from "../../util";

export const listOrganizations = action({
  display: {
    label: "List Organizations",
    description: "Retrieves all organizations the account has access to.",
  },
  perform: async (context, { connection }) => {
    const client = createClient(connection, context);

    const allItems: OrganizationProp[] = await getAllPaginatedItems<
      Organization,
      OrganizationProp
    >(client.getOrganizations.bind(client));

    return {
      data: allItems,
    };
  },
  inputs: listOrganizationsInputs,
  examplePayload: { data: listOrganizationsExamplePayload },
});
