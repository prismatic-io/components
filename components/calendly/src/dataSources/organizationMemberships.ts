import { dataSource } from "@prismatic-io/spectral";
import { organizationMembershipsInputs } from "../inputs";
import { getCalendlyClient } from "../client";
import { getOrganizationMemberships, extractUuidFromUri } from "../util";
export const organizationMemberships = dataSource({
  display: {
    label: "Select Organization Membership",
    description: "Select an Organization Membership.",
  },
  inputs: organizationMembershipsInputs,
  perform: async (
    context,
    { connection, email, organization, user, returnUuidOnly },
  ) => {
    const client = getCalendlyClient(connection, false);
    const data = await getOrganizationMemberships(
      client,
      email,
      organization,
      user,
    );
    return {
      result: data.map(
        (membership: {
          user: {
            uri: string;
            name: string;
          };
        }) => ({
          key: returnUuidOnly
            ? extractUuidFromUri(membership.user.uri)
            : membership.user.uri,
          label: membership.user.name,
        }),
      ),
    };
  },
  dataSourceType: "picklist",
});
