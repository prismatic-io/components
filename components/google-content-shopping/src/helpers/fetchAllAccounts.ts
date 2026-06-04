import type { content_v2_1 } from "googleapis";
import type { FetchAllAccountsOptions } from "../interfaces";

export const fetchAllAccounts = async ({
  client,
  fetchAll,
  params,
}: FetchAllAccountsOptions) => {
  let nextPageToken: string | null | undefined;
  let responseStructure: content_v2_1.Schema$AccountsListResponse = {};

  if (params && Object.keys(params).length > 0 && fetchAll) {
    delete params.pageToken;
    delete params.maxResults;
  }

  do {
    const { data } = await client.accounts.list(params);
    responseStructure = {
      ...data,
      resources: [
        ...(responseStructure.resources || []),
        ...(data.resources || []),
      ],
    };
    nextPageToken = data.nextPageToken;
  } while (nextPageToken && fetchAll);

  delete responseStructure.nextPageToken;

  return {
    data: responseStructure,
  };
};
