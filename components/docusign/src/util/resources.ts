import type { HttpClient } from "@prismatic-io/spectral/http";

export const getFolders = async (
  client: HttpClient,
  count: string,
  include: string | undefined,
  includeItems: boolean,
  startPosition: string,
  subFolderDepth: string | undefined,
  userFilter: string | undefined,
) => {
  const { data } = await client.get(`/folders`, {
    params: {
      count: count || undefined,
      include: include || undefined,
      include_items: includeItems,
      start_position: startPosition || undefined,
      sub_folder_depth: subFolderDepth || undefined,
      user_filter: userFilter || undefined,
    },
  });
  return data;
};

export const getTemplates = async (client: HttpClient) => {
  const { data } = await client.get(`/templates`);
  return data;
};
