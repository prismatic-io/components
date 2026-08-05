import type { Element } from "@prismatic-io/spectral";
import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";
import type { DataSource } from "../types/Project";
export const fetchMoreData = async <T>(
  client: HttpClient,
  url: string,
  fetchedRecords: T[],
  fetchAll = false,
  params?: Record<string, unknown>,
): Promise<T[]> => {
  const { data: records } = await client.get(url, {
    params,
  });
  const { data, next_page } = records;
  if (!fetchAll) {
    return data;
  }
  if (data?.length) {
    fetchedRecords.push(...data);
  }
  if (next_page) {
    return await fetchMoreData(client, next_page.uri, fetchedRecords, true);
  }
  return fetchedRecords;
};
export const handleMultipleWorkspacesError = (err: unknown) => {
  const error = err as {
    response: {
      data: {
        errors: {
          message: string;
        }[];
      };
    };
  };
  if (error) {
    if (
      error?.response?.data?.errors?.[0]?.message?.includes(
        "This request accesses data in multiple workspaces",
      )
    ) {
      throw new Error("Workspace ID must be provided");
    }
  }
};
export const mapToLabelKey = (data: DataSource[]): Element[] => {
  return data.map<Element>(({ gid, name }) => ({
    label: name,
    key: gid,
  }));
};
