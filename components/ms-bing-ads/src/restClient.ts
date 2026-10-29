import {
  createClient,
  type HttpClient,
} from "@prismatic-io/spectral/dist/clients/http";

import { MsAdsRestService } from "./constants";
import type { GetRestClientProps } from "./types";
import {
  getRestAuthHeaders,
  getRestBaseUrl,
  validateRestConnection,
} from "./util";

export const getRestClient = ({
  connection,
  debug = false,
  accountId,
  customerId,
}: GetRestClientProps): HttpClient => {
  validateRestConnection(connection);

  return createClient({
    baseUrl: getRestBaseUrl(connection, MsAdsRestService.CampaignManagement),
    debug,
    responseType: "json",
    headers: {
      ...getRestAuthHeaders(connection),
      "Content-Type": "application/json",
      ...(customerId ? { CustomerId: customerId } : {}),
      ...(accountId ? { CustomerAccountId: accountId } : {}),
    },
  });
};
