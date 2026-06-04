import { action } from "@prismatic-io/spectral";
import { getCalendlyClient } from "../../client";
import { connection, email, organization, user } from "../../inputs";
import { listOrganizationMembershipsExamplePayload } from "../../examplePayloads";
import { getOrganizationMemberships } from "../../util";

export const listOrganizationMemberships = action({
  display: {
    label: "List Organization Memberships",
    description:
      "Use this to list the Organization Memberships for all users belonging to an organization.",
  },
  perform: async (context, { connection, email, organization, user }) => {
    const client = getCalendlyClient(connection, context.debug.enabled);

    const data = await getOrganizationMemberships(
      client,
      email,
      organization,
      user,
    );
    return { data };
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
      dataSource: "organizations",
      comments: "Indicates if the results should be filtered by organization",
    },
    user: {
      ...user,
      comments: "Indicates if the results should be filtered by user",
      example: "https://api.calendly.com/users/UR1234567890",
    },
  },
  examplePayload: listOrganizationMembershipsExamplePayload,
});
