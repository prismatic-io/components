import { action } from "@prismatic-io/spectral";
import { createDataBricksClient } from "../client";
import {
  getClusterExamplePayload,
  listClustersExamplePayload,
  listNodeTypesExamplePayload,
  restartClusterExamplePayload,
  startTerminatedClusterExamplePayload,
  terminateClusterExamplePayload,
} from "../examplePayloads";
import { clusterIdInput, connectionInput } from "../inputs";
import type { Cluster, NodeType } from "../types";

const getCluster = action({
  display: {
    label: "Get Cluster",
    description: "Get a Databricks cluster by ID",
  },
  inputs: {
    connection: connectionInput,
    clusterId: clusterIdInput,
  },
  perform: async (context, params) => {
    const client = createDataBricksClient(
      params.connection,
      "2.0",
      context.debug.enabled,
    );
    const response = await client.get<Cluster>("clusters/get", {
      params: { cluster_id: params.clusterId },
    });
    return { data: response.data };
  },
  examplePayload: getClusterExamplePayload,
});

const listClusters = action({
  display: {
    label: "List Clusters",
    description:
      "Return information about all pinned clusters, active clusters, up to 200 of the most recently terminated all-purpose clusters in the past 30 days, and up to 30 of the most recently terminated job clusters in the past 30 days.",
  },
  inputs: { connection: connectionInput },
  perform: async (context, params) => {
    const client = createDataBricksClient(
      params.connection,
      "2.0",
      context.debug.enabled,
    );
    const {
      data: { clusters },
    } = await client.get<{ clusters: Cluster[] }>("clusters/list");
    return { data: clusters || [] };
  },
  examplePayload: listClustersExamplePayload,
});

const listNodeTypes = action({
  display: {
    label: "List Node Types",
    description:
      "Returns a list of supported Spark node types. These node types can be used to launch a cluster.",
  },
  inputs: { connection: connectionInput },
  perform: async (context, params) => {
    const client = createDataBricksClient(
      params.connection,
      "2.0",
      context.debug.enabled,
    );
    const response = await client.get<{ node_types: NodeType[] }>(
      "clusters/list-node-types",
    );
    return { data: response.data.node_types };
  },
  examplePayload: listNodeTypesExamplePayload,
});

const terminateCluster = action({
  display: {
    label: "Terminate Cluster",
    description: "Terminate a Databricks cluster by ID",
  },
  inputs: {
    connection: connectionInput,
    clusterId: clusterIdInput,
  },
  perform: async (context, params) => {
    const client = createDataBricksClient(
      params.connection,
      "2.0",
      context.debug.enabled,
    );
    await client.post("clusters/delete", { cluster_id: params.clusterId });
    return { data: "Cluster terminated successfully" };
  },
  examplePayload: terminateClusterExamplePayload,
});

const startTerminatedCluster = action({
  display: {
    label: "Start Terminated Cluster",
    description: "Start a terminated Databricks cluster by ID",
  },
  inputs: {
    connection: connectionInput,
    clusterId: clusterIdInput,
  },
  perform: async (context, params) => {
    const client = createDataBricksClient(
      params.connection,
      "2.0",
      context.debug.enabled,
    );
    await client.post("clusters/start", { cluster_id: params.clusterId });
    return { data: "Cluster started successfully" };
  },
  examplePayload: startTerminatedClusterExamplePayload,
});

const restartCluster = action({
  display: {
    label: "Restart Cluster",
    description: "Restart a Databricks cluster by ID",
  },
  inputs: {
    connection: connectionInput,
    clusterId: clusterIdInput,
  },
  perform: async (context, params) => {
    const client = createDataBricksClient(
      params.connection,
      "2.0",
      context.debug.enabled,
    );
    await client.post("clusters/restart", { cluster_id: params.clusterId });
    return { data: "Cluster restarted successfully" };
  },
  examplePayload: restartClusterExamplePayload,
});

export default {
  getCluster,
  listClusters,
  listNodeTypes,
  restartCluster,
  startTerminatedCluster,
  terminateCluster,
};
