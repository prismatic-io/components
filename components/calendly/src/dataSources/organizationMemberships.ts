import { dataSource } from "@prismatic-io/spectral";
import {
  connection,
  email,
  organization,
  user,
  returnUuidOnly,
} from "../inputs";
import { getCalendlyClient } from "../client";
import { getOrganizationMemberships, extractUuidFromUri } from "../util";

export const organizationMemberships = dataSource({
  display: {
    label: "Select Organization Membership",
    description: "Select an Organization Membership.",
  },
  inputs: {
    connection,
    email: {
      ...email,
      comments: "Indicates if the results should be filtered by email address",
      example: "user@example.com",
    },
    organization: {
      ...organization,
      comments: "Indicates if the results should be filtered by organization",
    },
    user: {
      ...user,
      comments: "Indicates if the results should be filtered by user",
      example: "https://api.calendly.com/users/UR1234567890",
    },
    returnUuidOnly,
  },
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
        (membership: { user: { uri: string; name: string } }) => ({
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
