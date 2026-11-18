import type { GraphQLClient } from "graphql-request";
import type { ComponentEdge } from "../types/ComponentEdge";
import type { ComponentNode } from "../types/ComponentNode";
import type { ListComponentsResponse } from "../types/ListComponentsResponse";

const mapComponentEdges = (edges: ComponentEdge[]): ComponentNode[] =>
  edges.map((edge) => edge.node);

export const getComponentsList = async (
  client: GraphQLClient,
  query: string,
  first: number,
  libraryType: string,
): Promise<ComponentNode[]> => {
  const variables = {
    first,
    libraryType,
  };

  const data = await client.request<ListComponentsResponse>(query, variables);

  const edges = data?.components?.connection?.edges ?? [];

  const mappedEdges = mapComponentEdges(edges);

  return mappedEdges;
};
