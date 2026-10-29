import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";
import { CONFLICT_STATUSES, ETAG_RETRY_LIMIT } from "../constants";
import type { Etagged } from "../types";
const statusOf = (error: unknown): number | undefined =>
  (
    error as {
      response?: {
        status?: number;
      };
    }
  )?.response?.status;
const isConflict = (error: unknown): boolean =>
  CONFLICT_STATUSES.includes(statusOf(error) ?? 0);
const writeWithEtag = async <T>(
  client: HttpClient,
  path: string,
  providedEtag: string | undefined,
  write: (etag: string) => Promise<T>,
): Promise<T> => {
  if (providedEtag) {
    return write(providedEtag);
  }
  let lastError: unknown;
  for (let attempt = 0; attempt <= ETAG_RETRY_LIMIT; attempt += 1) {
    const etag = await resolveEtag(client, path);
    try {
      return await write(etag);
    } catch (error) {
      if (!isConflict(error)) {
        throw error;
      }
      lastError = error;
    }
  }
  throw new Error(
    `Microsoft Planner reported a version conflict on ${path} after ${ETAG_RETRY_LIMIT + 1} attempts. The resource is being modified concurrently by another client.`,
    { cause: lastError },
  );
};
export const patchWithEtag = async <T>(
  client: HttpClient,
  path: string,
  body: Record<string, unknown>,
  providedEtag?: string,
): Promise<T> =>
  writeWithEtag(client, path, providedEtag, async (etag) => {
    const { data } = await client.patch<T>(path, body, {
      headers: {
        "If-Match": etag,
        "Content-Type": "application/json",
        Prefer: "return=representation",
      },
    });
    return data;
  });
export const deleteWithEtag = async (
  client: HttpClient,
  path: string,
  providedEtag?: string,
): Promise<void> => {
  await writeWithEtag(client, path, providedEtag, async (etag) => {
    await client.delete(path, { headers: { "If-Match": etag } });
  });
};
export const resolveEtag = async (
  client: HttpClient,
  path: string,
): Promise<string> => {
  const { data } = await client.get<Etagged>(path);
  const etag = data["@odata.etag"];
  if (!etag) {
    throw new Error(
      `Microsoft Planner did not return an @odata.etag for ${path}. An etag is required to modify or delete this resource.`,
    );
  }
  return etag;
};
