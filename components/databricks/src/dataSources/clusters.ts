import { dataSource } from "@prismatic-io/spectral";
import { createDataBricksClient } from "../client";
import { connectionInput } from "../inputs";
import type { Cluster, NodeType } from "../types";

const selectCluster = dataSource({
  dataSourceType: "picklist",
  display: {
    label: "Select Cluster",
    description: "Select a Databricks cluster.",
  },
  inputs: {
    connection: connectionInput,
  },
  perform: async (_context, params) => {
    const client = createDataBricksClient(params.connection, "2.0", false);
    const {
      data: { clusters },
    } = await client.get<{ clusters: Cluster[] }>("clusters/list");
    if (!clusters) {
      throw new Error("No Databricks clusters found in workspace");
    }
    return {
      result: clusters.map((cluster) => ({
        key: cluster.cluster_id,
        label: `${cluster.cluster_name} (${cluster.node_type_id})`,
      })),
    };
  },
});

const selectNodeType = dataSource({
  dataSourceType: "picklist",
  display: {
    label: "Select Node Type",
    description: "Select a Databricks node type.",
  },
  inputs: {
    connection: connectionInput,
  },
  perform: async (_context, params) => {
    const client = createDataBricksClient(params.connection, "2.0", false);
    const response = await client.get<{ node_types: NodeType[] }>(
      "clusters/list-node-types",
    );
    return {
      result: response.data.node_types.map((nodeType) => ({
        key: nodeType.node_type_id,
        label: nodeType.description,
      })),
    };
  },
});

export default { selectCluster, selectNodeType };
