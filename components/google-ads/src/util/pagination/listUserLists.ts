import type { HttpClient } from "@prismatic-io/spectral/http";
import { GOOGLE_ADS_ACCOUNT_TYPE } from "../../constants";
import type { DataManagerUserList, ListUserListsResponse } from "../../types";

export async function listAllUserLists(
  client: HttpClient,
  customerId: string,
): Promise<DataManagerUserList[]> {
  const path = `/accountTypes/${GOOGLE_ADS_ACCOUNT_TYPE}/accounts/${customerId}/userLists`;
  const userLists: DataManagerUserList[] = [];
  let pageToken: string | undefined;
  do {
    const { data } = await client.get<ListUserListsResponse>(path, {
      params: { pageToken },
    });
    userLists.push(...(data.userLists ?? []));
    pageToken = data.nextPageToken;
  } while (pageToken !== undefined && pageToken !== "");
  return userLists;
}
