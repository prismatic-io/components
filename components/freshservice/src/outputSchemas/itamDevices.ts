const itamDeviceBaseProperties = {
  device_id: { type: ["number", "string"] },
  name: { type: "string" },
  type_id: { type: ["number", "null"] },
  type: {
    type: ["string", "null"],
    enum: ["unknown", "physical", "virtual", "cluster", null],
  },
  serial_no: { type: ["string", "null"] },
  asset_no: { type: ["string", "null"] },
  uuid: { type: ["string", "null"] },
  notes: { type: ["string", "null"] },
  device_url: { type: ["string", "null"] },
  tags: { type: "array", items: { type: "string" } },
  aliases: { type: "array", items: { type: "string" } },
  custom_fields: { type: ["array", "object"] },
  first_added: { type: ["string", "null"] },
  last_updated: { type: ["string", "null"] },
  discovery_sources: {
    type: ["array", "object"],
    items: {
      type: "object",
      properties: {
        value: { type: ["string", "null"] },
        timestamp: { type: ["string", "null"], format: "date-time" },
      },
    },
  },
  hardware_id: { type: ["number", "null"] },
  hardware: { type: ["string", "null"] },
  physicalsubtype_id: { type: ["number", "null"] },
  physicalsubtype: { type: ["string", "null"] },
  total_cpus: { type: ["number", "null"] },
  core_per_cpu: { type: ["number", "null"] },
  threads_per_core: { type: ["number", "null"] },
  cpu_speed: { type: ["number", "string", "null"] },
  ram: { type: ["number", "string", "null"] },
  hard_disk_count: { type: ["number", "null"] },
  hard_disk_size: { type: ["number", "string", "null"] },
  virtual_host: { type: ["string", "null"] },
  blade_chassis: { type: ["string", "null"] },
  blade_slot_no: { type: ["number", "string", "null"] },
  device_virtual_host_id: { type: ["number", "null"] },
  device_cluster_id: { type: ["number", "null"] },
  virtualsubtype_id: { type: ["number", "null"] },
  virtualsubtype: { type: ["string", "null"] },
  os_id: { type: ["number", "null"] },
  os_name: { type: ["string", "null"] },
  os_version: { type: ["string", "null"] },
  os_architecture: { type: ["string", "null"] },
  data_center: { type: ["string", "null"] },
  building_id: { type: ["number", "null"] },
  storage_room: { type: ["string", "null"] },
  rack_id: { type: ["number", "null"] },
  location_id: { type: ["number", "null"] },
  additional_location_info: { type: ["string", "null"] },
  impact: { type: ["string", "null"] },
  state: { type: ["string", "null"] },
  usage_type: { type: ["string", "null"] },
  workspace_id: { type: ["number", "null"] },
  workspace: { type: ["string", "null"] },
  department_id: { type: ["number", "null"] },
  department: { type: ["string", "null"] },
  group_id: { type: ["number", "null"] },
  agent_id: { type: ["number", "null"] },
  user_id: { type: ["number", "null"] },
  technical_owner_user_id: { type: ["number", "null"] },
  functional_owner_user_id: { type: ["number", "null"] },
  objectcategory_id: { type: ["number", "null"] },
  objectcategory: { type: ["string", "null"] },
  service_level_id: { type: ["number", "null"] },
  service_level: { type: ["string", "null"] },
  customer_id: { type: ["number", "null"] },
  customer: { type: ["string", "null"] },
  customers: { type: ["array", "string", "null"] },
  in_service: { type: ["string", "boolean", "null"] },
};
export const itamDeviceOutputSchema = {
  type: "object" as const,
  properties: { ...itamDeviceBaseProperties },
  required: ["device_id"],
};
export const itamDevicesListOutputSchema = {
  type: "object" as const,
  properties: {
    meta: {
      type: "object",
      properties: {
        page: { type: "number" },
        per_page: { type: "number" },
        total_count: { type: "number" },
      },
      required: ["page", "per_page", "total_count"],
    },
    devices: {
      type: "array",
      items: {
        type: "object",
        properties: { ...itamDeviceBaseProperties },
        required: [],
      },
    },
  },
  required: ["meta", "devices"],
};
export const itamDeviceWriteOutputSchema = {
  type: "object" as const,
  properties: {
    action: {
      type: "string",
      description: "The write Freshservice reports having performed.",
    },
    id: {
      type: ["number", "null"],
      description: "The device_id of the affected record.",
    },
    name: { type: "string" },
    didSomethingChange: {
      type: "boolean",
      description:
        "False when the request matched a record but changed nothing.",
    },
    isNew: {
      type: "boolean",
      description:
        "True when the request created the record rather than updating one.",
    },
    code: {
      type: ["number", "null"],
      description:
        "The vendor status code sent alongside msg. Zero on success.",
    },
    raw: {
      type: "array",
      description:
        "The original positional tuple, in case a position is unmapped.",
    },
  },
  required: ["action", "isNew"],
};
