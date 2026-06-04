import type { Connection } from "@prismatic-io/spectral";
import { createClient as createHttpClient } from "@prismatic-io/spectral/dist/clients/http";
import type { CannyClient } from "./types";
import { BaseUrl, validateConnection } from "./util";







export const createClient = (
  connection: Connection,
  debug = false,
): CannyClient => {
  const apiKey = validateConnection(connection);

  const httpClientV1 = createHttpClient({
    baseUrl: BaseUrl.V1,
    headers: { "Content-Type": "application/json" },
    debug,
  });

  const httpClientV2 = createHttpClient({
    baseUrl: BaseUrl.V2,
    headers: { "Content-Type": "application/json" },
    debug,
  });

  const post = async <T = unknown>(
    path: string,
    body: Record<string, unknown> = {},
  ): Promise<T> => {
    const { data } = await httpClientV1.post<T>(path, {
      apiKey,
      ...body,
    });
    return data;
  };

  const postV2 = async <T = unknown>(
    path: string,
    body: Record<string, unknown> = {},
  ): Promise<T> => {
    const { data } = await httpClientV2.post<T>(path, {
      apiKey,
      ...body,
    });
    return data;
  };

  return { post, postV2, apiKey, httpClient: httpClientV1 };
};
