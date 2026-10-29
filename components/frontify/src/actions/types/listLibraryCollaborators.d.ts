import type { UsersResponse } from "./shared";

export default interface ListLibraryCollaboratorsResponse {
  library: {
    id: string;
    name: string;
    collaborators: {
      users: UsersResponse;
    };
  };
}
