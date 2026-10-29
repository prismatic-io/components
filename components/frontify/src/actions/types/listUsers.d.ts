import type { UsersResponse } from "./shared";

export default interface ListUsersResponse {
  account: {
    users: UsersResponse;
  };
}
