import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";
import { paginator } from "./common";
export const getEventTypes = async (
  client: HttpClient,
  adminManaged: boolean,
  organization: string,
  user: string | undefined,
  userAvailabilitySchedule: string | undefined,
  active: boolean,
  sort: string | undefined,
) => {
  const data = await paginator(client, "/event_types", {
    admin_managed: adminManaged,
    organization: organization,
    user: user,
    user_availability_schedule: userAvailabilitySchedule,
    active,
    sort: sort,
  });
  return data;
};
