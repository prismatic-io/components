import type { UsersResponse } from "./shared";

export default interface ListUserGroupsResponse {
  account: {
    id: string;
    userGroups: {
      total: number;
      page: number;
      limit: number;
      hasNextPage: boolean;
      items: UserGroup[];
    };
  };
}

interface UserGroup {
  id: string;
  name: string;
  users: UsersResponse;
}
