import type { PageInfo } from "./PageInfo";

export interface ObjectNodes<T> {
  nodes: T[];
  pageInfo: PageInfo;
}
