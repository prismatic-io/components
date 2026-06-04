import type { PaginationLink } from "./PaginationLink";

export interface PaginationResponse {
  previous?: PaginationLink;
  next?: PaginationLink;
}
