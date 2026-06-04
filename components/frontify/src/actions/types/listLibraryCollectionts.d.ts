export default interface ListLibraryCollectionsResponse {
  library: {
    id: string;
    name: string;
    collections: {
      total: number;
      page: number;
      limit: number;
      hasNextPage: boolean;
      items: {
        id: string;
        name: string;
        assets: {
          total: number;
          page: number;
          limit: number;
          hasNextPage: boolean;
          items: {
            id: string;
          }[];
        };
      }[];
    };
  };
}
