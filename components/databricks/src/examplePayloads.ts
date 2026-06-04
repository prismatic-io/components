





export const getClusterExamplePayload = {
  data: {
    cluster_id: "1234-567890-reef123",
    spark_context_id: 4020997813441462000,
    cluster_name: "my-cluster",
    spark_version: "13.3.x-scala2.12",
    aws_attributes: {
      zone_id: "us-west-2c",
      first_on_demand: 1,
      availability: "SPOT_WITH_FALLBACK",
      spot_bid_price_percent: 100,
      ebs_volume_count: 0,
    },
    node_type_id: "i3.xlarge",
    driver_node_type_id: "i3.xlarge",
    autotermination_minutes: 120,
    enable_elastic_disk: false,
    disk_spec: {
      disk_count: 0,
    },
    cluster_source: "UI",
    enable_local_disk_encryption: false,
    instance_source: {
      node_type_id: "i3.xlarge",
    },
    driver_instance_source: {
      node_type_id: "i3.xlarge",
    },
    state: "TERMINATED",
    state_message: "Inactive cluster terminated (inactive for 120 minutes).",
    start_time: 1618263108824,
    terminated_time: 1619746525713,
    last_state_loss_time: 1619739324740,
    num_workers: 30,
    default_tags: {
      Vendor: "Databricks",
      Creator: "someone@example.com",
      ClusterName: "my-cluster",
      ClusterId: "1234-567890-reef123",
    },
    creator_user_name: "someone@example.com",
    termination_reason: {
      code: "INACTIVITY",
      parameters: {
        inactivity_duration_min: "120",
      },
      type: "SUCCESS",
    },
    init_scripts_safe_mode: false,
    spec: {
      spark_version: "13.3.x-scala2.12",
    },
  },
};







export const listClustersExamplePayload = {
  data: [getClusterExamplePayload.data],
};







export const listNodeTypesExamplePayload = {
  data: [
    {
      node_type_id: "r4.xlarge",
      memory_mb: 31232,
      num_cores: 4,
      description: "r4.xlarge",
      instance_type_id: "r4.xlarge",
      is_deprecated: false,
      category: "Memory Optimized",
      support_ebs_volumes: true,
      support_cluster_tags: true,
      num_gpus: 0,
      node_instance_type: {
        instance_type_id: "r4.xlarge",
        local_disks: 0,
        local_disk_size_gb: 0,
        instance_family: "EC2 r4 Family vCPUs",
        swap_size: "10g",
      },
      is_hidden: false,
      support_port_forwarding: true,
      supports_elastic_disk: true,
      display_order: 0,
      is_io_cache_enabled: false,
    },
  ],
};







export const terminateClusterExamplePayload = {
  data: "Cluster terminated successfully",
};







export const startTerminatedClusterExamplePayload = {
  data: "Cluster started successfully",
};







export const restartClusterExamplePayload = {
  data: "Cluster restarted successfully",
};







export const createExecutionContextExamplePayload = {
  data: {
    id: "1234-567890-reef123",
  },
};







export const getCommandStatusExamplePayload = {
  data: {
    id: "d4aa2c2f871048e797efdbe635de94be",
    status: "Running",
    result: null,
  },
};







export const runCommandExamplePayload = {
  data: {
    id: "d4aa2c2f871048e797efdbe635de94be",
  },
};







export const runSqlExamplePayload = {
  data: {
    statement_id: "01eea4a3-4f6d-1f31-a8d4-dbc7b6b1a5c4",
    status: {
      state: "SUCCEEDED",
    },
    manifest: {
      format: "JSON_ARRAY",
      schema: {
        column_count: 2,
        columns: [
          {
            name: "id",
            position: 0,
            type_name: "INT",
            type_text: "int",
          },
          {
            name: "name",
            position: 1,
            type_name: "STRING",
            type_text: "string",
          },
        ],
      },
      total_chunk_count: 1,
      chunks: [
        {
          chunk_index: 0,
          row_offset: 0,
          row_count: 2,
          byte_count: 28,
        },
      ],
      total_row_count: 2,
      total_byte_count: 28,
      is_volume_operation: false,
    },
    result: {
      chunk_index: 0,
      row_offset: 0,
      row_count: 2,
      data_array: [
        ["1", "Alice"],
        ["2", "Bob"],
      ],
    },
  },
};







export const getWarehouseExamplePayload = {
  data: {
    id: "0000000000000001",
    name: "Starter Warehouse",
    size: "SMALL",
    cluster_size: "Small",
    min_num_clusters: 1,
    max_num_clusters: 1,
    auto_stop_mins: 60,
    auto_resume: true,
    creator_name: "admin@example.com",
    creator_id: 5760885597616698,
    tags: {},
    spot_instance_policy: "COST_OPTIMIZED",
    enable_photon: true,
    enable_serverless_compute: false,
    warehouse_type: "PRO",
    num_clusters: 1,
    num_active_sessions: 0,
    state: "RUNNING",
    jdbc_url:
      "jdbc:spark://dbc-example-0001.cloud.databricks.com:443/default;transportMode=http;ssl=1;AuthMech=3;httpPath=/sql/1.0/warehouses/0000000000000001;",
    odbc_params: {
      hostname: "dbc-example-0001.cloud.databricks.com",
      path: "/sql/1.0/warehouses/0000000000000001",
      protocol: "https",
      port: 443,
    },
    health: {
      status: "HEALTHY",
    },
  },
};







export const listWarehousesExamplePayload = {
  data: [getWarehouseExamplePayload.data],
};







export const startWarehouseExamplePayload = {
  data: "Warehouse started",
};







export const stopWarehouseExamplePayload = {
  data: "Warehouse stopped",
};







export const getCurrentUserExamplePayload = {
  data: {
    emails: [
      {
        type: "work",
        value: "1d021345-e23c-4f29-84fa-d027a622259e",
        primary: true,
      },
    ],
    displayName: "Example Service User",
    schemas: [
      "urn:ietf:params:scim:schemas:core:2.0:User",
      "urn:ietf:params:scim:schemas:extension:workspace:2.0:User",
    ],
    name: {
      familyName: "User",
      givenName: "Example Service",
    },
    active: true,
    groups: [
      {
        display: "admins",
        type: "direct",
        value: "272831250941646",
        $ref: "Groups/272831250941646",
      },
    ],
    id: "7556761598142352",
    userName: "1d021345-e23c-4f29-84fa-d027a622259e",
  },
};







export const rawRequestExamplePayload = {
  data: {
    clusters: [
      {
        cluster_id: "1234-567890-reef123",
        cluster_name: "my-cluster",
        state: "RUNNING",
      },
    ],
  },
};
