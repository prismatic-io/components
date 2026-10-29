export interface Cluster {
  cluster_id: string;
  spark_context_id: number;
  cluster_name: string;
  spark_version: string;
  aws_attributes: {
    zone_id: string;
    first_on_demand: number;
    availability: string;
    spot_bid_price_percent: number;
    ebs_volume_count: number;
  };
  node_type_id: string;
  driver_node_type_id: string;
  autotermination_minutes: number;
  enable_elastic_disk: boolean;
  disk_spec: {
    disk_count: number;
  };
  cluster_source: string;
  enable_local_disk_encryption: boolean;
  instance_source: {
    node_type_id: string;
  };
  driver_instance_source: {
    node_type_id: string;
  };
  state: string;
  state_message: string;
  start_time: number;
  terminated_time: number;
  last_state_loss_time: number;
  num_workers: number;
  default_tags: {
    Vendor: string;
    Creator: string;
    ClusterName: string;
    ClusterId: string;
  };
  creator_user_name: string;
  termination_reason: {
    code: string;
    parameters: {
      inactivity_duration_min: string;
    };
    type: string;
  };
  init_scripts_safe_mode: boolean;
  spec: {
    spark_version: string;
  };
}

export interface NodeType {
  node_type_id: string;
  memory_mb: number;
  num_cores: number;
  description: string;
  instance_type_id: string;
  is_deprecated: boolean;
  category: string;
  support_ebs_volumes: boolean;
  support_cluster_tags: boolean;
  num_gpus: number;
  node_instance_type: {
    instance_type_id: string;
    local_disks: number;
    local_disk_size_gb: number;
    instance_family: string;
    swap_size: string;
  };
  is_hidden: boolean;
  support_port_forwarding: boolean;
  supports_elastic_disk: boolean;
  display_order: number;
  is_io_cache_enabled: boolean;
}

export interface Warehouse {
  id: string;
  name: string;
  size: string;
  cluster_size: string;
  min_num_clusters: number;
  max_num_clusters: number;
  auto_stop_mins: number;
  auto_resume: boolean;
  creator_name: string;
  creator_id: number;
  tags: {
    custom_tags?: {
      key: string;
      value: string;
    }[];
  };
  spot_instance_policy: string;
  enable_photon: boolean;
  enable_serverless_compute: boolean;
  warehouse_type: string;
  num_clusters: number;
  num_active_sessions: number;
  state: string;
  jdbc_url: string;
  odbc_params: {
    hostname: string;
    path: string;
    protocol: string;
    port: number;
  };
  health: {
    status: string;
  };
}
