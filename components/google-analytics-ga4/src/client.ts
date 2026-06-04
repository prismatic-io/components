import { createClient } from "@prismatic-io/spectral/dist/clients/http";
import { ANALYTICS_ENDPOINTS } from "./constants";
import type { CreateAnalyticsClientProps } from "./types";

export const createAnalyticsClient = ({
  connection,
  endpointType,
  debug,
}: CreateAnalyticsClientProps) => {
  const accessToken = connection.token?.access_token;
  return createClient({
    baseUrl: ANALYTICS_ENDPOINTS[endpointType],
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    debug,
  });
};
