import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";
import { paginator } from "./common";
export const getRoutingForms = async (
  client: HttpClient,
  organization: string,
  sort: string | undefined,
) => {
  const data = await paginator(client, "/routing_forms", {
    organization,
    sort,
  });
  return data;
};
