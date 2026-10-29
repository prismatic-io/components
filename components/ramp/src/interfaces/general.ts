export interface ListPage {
  next?: string;
}

export interface GenericListData<T> {
  data: T[];
  page: ListPage | null;
}
