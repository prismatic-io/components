export interface PageOptions {
  fetchAll: boolean;
  perPage?: number;
  page?: number;
}
export interface KeysetOrder {
  order_by: string;
  sort: "asc" | "desc";
}
