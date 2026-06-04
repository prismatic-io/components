import type { Nodes } from "./Nodes";
import type { PageInfo } from "./PageInfo";

export interface PaginatedNodes {
  nodes: Nodes;
  pageInfo: PageInfo;
}
