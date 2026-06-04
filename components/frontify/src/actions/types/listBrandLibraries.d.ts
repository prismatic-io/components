export default interface ListBrandLibrariesResponse {
  brand: {
    id: string;
    name: string;
    libraries: {
      total: number;
      hasNextPage: boolean;
      page: number;
      limit: number;
      items: {
        id: string;
        name: string;
      }[];
    };
  };
}
