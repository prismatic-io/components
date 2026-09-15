import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";
import { paginator } from "./common";
export const getOrganizationMemberships = async (
  client: HttpClient,
  email: string | undefined,
  organization: string,
  user: string | undefined,
) => {
  const data = await paginator(client, "/organization_memberships", {
    email: email,
    organization: organization,
    user: user,
  });
  return data;
};
