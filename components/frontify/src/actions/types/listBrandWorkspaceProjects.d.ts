export default interface ListBrandWorkspaceProjectsResponse {
  brand: {
    id: string;
    name: string;
    workspaceProjects: {
      total: number;
      limit: number;
      page: number;
      hasNextPage: boolean;
      items: {
        id: string;
        name: string;
      }[];
    };
  };
}
