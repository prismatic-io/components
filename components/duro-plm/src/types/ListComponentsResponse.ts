import type { ComponentEdge } from "./ComponentEdge";

export interface ListComponentsResponse {
  components?: {
    connection?: {
      edges?: ComponentEdge[];
    };
  };
}
