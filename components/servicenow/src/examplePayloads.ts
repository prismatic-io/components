import type { TriggerPayload } from "@prismatic-io/spectral";
export const listAttachmentsExamplePayload = {
  data: {
    result: [
      {
        table_sys_id: "5054b6f8c0a800060056addcf551ecf8",
        size_bytes: "462",
        download_link:
          "https://instance.service-now.com/api/now/attachment/615ea769c0a80166001cf5f2367302f5/file",
        sys_updated_on: "2009-05-21 04:12:21",
        sys_id: "615ea769c0a80166001cf5f2367302f5",
        image_height: "",
        sys_created_on: "2009-05-21 04:12:21",
        file_name: "blocks.swf",
        sys_created_by: "glide.maint",
        compressed: "true",
        average_image_color: "",
        sys_updated_by: "glide.maint",
        sys_tags: "",
        table_name: "content_block_programmatic",
        image_width: "",
        sys_mod_count: "0",
        content_type: "application/x-shockwave-flash",
        size_compressed: "485",
      },
    ],
  },
};
export const getAttachmentExamplePayload = {
  data: {
    result: {
      table_sys_id: "5054b6f8c0a800060056addcf551ecf8",
      size_bytes: "462",
      download_link:
        "https://instance.service-now.com/api/now/attachment/615ea769c0a80166001cf5f2367302f5/file",
      sys_updated_on: "2009-05-21 04:12:21",
      sys_id: "615ea769c0a80166001cf5f2367302f5",
      image_height: "",
      sys_created_on: "2009-05-21 04:12:21",
      file_name: "blocks.swf",
      sys_created_by: "glide.maint",
      compressed: "true",
      average_image_color: "",
      sys_updated_by: "glide.maint",
      sys_tags: "",
      table_name: "content_block_programmatic",
      image_width: "",
      sys_mod_count: "0",
      content_type: "application/x-shockwave-flash",
      size_compressed: "485",
    },
  },
};
export const getAttachmentFileExamplePayload = {
  data: Buffer.from("file contents"),
};
export const deleteAttachmentExamplePayload = {
  data: "",
};
export const uploadAttachmentExamplePayload = {
  data: {
    result: {
      average_image_color: "",
      compressed: "true",
      content_type: "image/jpeg",
      created_by_name: "System Administrator",
      download_link:
        "https://instance.service-now.com/api/now/attachment/994adbc64f511200adf9f8e18110c796/file",
      file_name: "banner-CS0001345_v1_1.jpeg",
      image_height: "",
      image_width: "",
      size_bytes: "36597",
      size_compressed: "25130",
      sys_created_by: "admin",
      sys_created_on: "2016-02-02 14:00:21",
      sys_id: "994adbc64f511200adf9f8e18110c796",
      sys_mod_count: "0",
      sys_tags: "",
      sys_updated_by: "admin",
      sys_updated_on: "2016-02-02 14:00:21",
      table_name: "incident",
      table_sys_id: "d71f7935c0a8016700802b64c67c11c6",
      updated_by_name: "System Administrator",
    },
  },
};
export const multipartUploadAttachmentExamplePayload = {
  data: {
    result: {
      table_sys_id: "d71f7935c0a8016700802b64c67c11c6",
      size_bytes: "36597",
      download_link:
        "https://instance.service-now.com/api/now/attachment/994adbc64f511200adf9f8e18110c796/file",
      sys_updated_on: "2016-02-02 14:00:21",
      sys_id: "994adbc64f511200adf9f8e18110c796",
      image_height: "",
      sys_created_on: "2016-02-02 14:00:21",
      file_name: "banner-CS0001345_v1_1.jpeg",
      sys_created_by: "admin",
      compressed: "true",
      average_image_color: "",
      sys_updated_by: "admin",
      sys_tags: "",
      table_name: "incident",
      image_width: "",
      sys_mod_count: "0",
      content_type: "image/jpeg",
      size_compressed: "25130",
    },
  },
};
export const listConfigurationItemsExamplePayload = {
  data: {
    result: [
      {
        sys_id: "3a290cc60a0a0bb400000bdb386af1cf",
        name: "PS LinuxApp01",
      },
    ],
  },
};
export const getConfigurationItemAttributesExamplePayload = {
  data: {
    result: {
      outbound_relations: [
        {
          sys_id: "3a62e64ac0a8ce0100aead1e3fd5439f",
          type: {
            display_value: "Depends on::Used by",
            link: "https://instance.servicenow.com/api/now/table/cmdb_rel_type/1a9cb166f1571100a92eb60da2bce5c5",
            value: "1a9cb166f1571100a92eb60da2bce5c5",
          },
          target: {
            display_value: "PS ORA01",
            link: "https://instance.servicenow.com/api/now/cmdb/instance/cmdb_ci/3a307c930a0a0bb400353965d0b8861f",
            value: "3a307c930a0a0bb400353965d0b8861f",
          },
        },
        {
          sys_id: "3a67513fc0a8ce0100914a76cea11b02",
          type: {
            display_value: "Exchanges data with::Exchanges data with",
            link: "https://instance.servicenow.com/api/now/table/cmdb_rel_type/607ad1b2c0a8010e01941856b365af90",
            value: "607ad1b2c0a8010e01941856b365af90",
          },
          target: {
            display_value: "PS ORA01",
            link: "https://instance.servicenow.com/api/now/cmdb/instance/cmdb_ci/3a307c930a0a0bb400353965d0b8861f",
            value: "3a307c930a0a0bb400353965d0b8861f",
          },
        },
      ],
      attributes: {
        firewall_status: "Intranet",
        os_address_width: "",
        operational_status: "1",
        sys_updated_on: "2020-07-08 11:16:51",
        used_for: "Production",
        sys_created_by: "glide.maint",
        ram: "2048",
        cpu_speed: "2800",
        sys_domain_path: "/",
        classification: "Production",
        disk_space: "40",
        can_print: "false",
        sys_class_name: "cmdb_ci_linux_server",
        cpu_count: "1",
        cpu_type: "Intel",
        install_date: "2019-08-18 08:00:00",
        asset_tag: "P1000091",
        internet_facing: "false",
        install_status: "1",
        name: "PS LinuxApp01",
        virtual: "false",
        sys_id: "3a290cc60a0a0bb400000bdb386af1cf",
        os_version: "2.6.9-22.0.1.ELsmp",
        unverified: "false",
        skip_sync: "false",
        sys_updated_by: "system",
        sys_created_on: "2008-10-26 17:17:28",
        cd_rom: "false",
        monitor: "false",
        cost: "45557.5",
        os: "Linux Red Hat",
        sys_mod_count: "24",
        cost_cc: "USD",
        attested: "false",
        fault_count: "0",
      },
      inbound_relations: [
        {
          sys_id: "3a5e4d8ac0a8ce010005145afb730818",
          type: {
            display_value: "Depends on::Used by",
            link: "https://instance.servicenow.com/api/now/table/cmdb_rel_type/1a9cb166f1571100a92eb60da2bce5c5",
            value: "1a9cb166f1571100a92eb60da2bce5c5",
          },
          target: {
            display_value: "PS Apache01",
            link: "https://instance.servicenow.com/api/now/cmdb/instance/cmdb_ci/3a27d4370a0a0bb4006316812bf45439",
            value: "3a27d4370a0a0bb4006316812bf45439",
          },
        },
      ],
    },
  },
};
export const deleteConfigurationItemExamplePayload = {
  data: null,
};
export const getCMDBClassMetaDataExamplePayload = {
  data: {
    result: {
      icon_url: "images/app.ngbsm/computer.svg",
      is_extendable: true,
      parent: "cmdb_ci_hardware",
      children: [
        "cmdb_ci_ucs_blade",
        "cmdb_ci_pc_hardware",
        "cmdb_ci_ucs_rack_unit",
        "cmdb_ci_mainframe_hardware",
        "cmdb_ci_server",
        "cmdb_ci_storage_switch",
      ],
      name: "cmdb_ci_computer",
      icon: "c6442dd69fb00200eb3919eb552e7012",
      attributes: [
        {
          is_inherited: "false",
          is_mandatory: "false",
          is_read_only: "false",
          default_value: null,
          label: "OS Address Width (bits)",
          type: "integer",
          element: "os_address_width",
          max_length: "40",
          is_display: "false",
        },
        {
          is_inherited: "true",
          is_mandatory: "false",
          is_read_only: "true",
          default_value: "false",
          label: "Skip sync",
          type: "boolean",
          element: "skip_sync",
          max_length: "40",
          is_display: "false",
        },
      ],
      relationship_rules: [
        {
          parent: "cmdb_ci_computer",
          relation_type: "cb5592603751200032ff8c00dfbe5d17",
          child: "dscy_route_next_hop",
        },
        {
          parent: "cmdb_ci_computer",
          relation_type: "55c95bf6c0a8010e0118ec7056ebc54d",
          child: "cmdb_ci_storage_pool",
        },
      ],
      label: "Computer",
    },
  },
};
export const pollChangesTriggerExamplePayload: {
  payload: TriggerPayload;
} = {
  payload: {
    body: {
      data: {
        created: [
          {
            sys_id: "a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6",
            sys_created_on: "2026-01-15 14:30:00",
            sys_updated_on: "2026-01-15 14:30:00",
            sys_created_by: "admin",
            sys_updated_by: "admin",
            sys_mod_count: "0",
            number: "INC0012345",
            short_description: "Unable to access email",
            state: "1",
            priority: "3",
            category: "inquiry",
          },
        ],
        updated: [
          {
            sys_id: "b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6a7",
            sys_created_on: "2025-12-01 09:00:00",
            sys_updated_on: "2026-01-15 14:35:00",
            sys_created_by: "admin",
            sys_updated_by: "service.desk",
            sys_mod_count: "5",
            number: "INC0012300",
            short_description: "VPN connection drops intermittently",
            state: "2",
            priority: "2",
            category: "network",
          },
        ],
      },
    },
    headers: {},
    queryParameters: {},
    rawBody: {
      data: undefined,
      contentType: undefined,
    },
    pathFragment: "",
    webhookUrls: {},
    webhookApiKeys: {},
    invokeUrl: "",
    executionId: "",
    customer: {
      id: "Q3VzdG9tZXI6MTIzNDU2NzgtMTIzNC00NTY3LTg5YWItY2RlZjAxMjM0NTY3",
      name: "Example Customer",
      externalId: "ext-cust-001",
    },
    instance: {
      id: "SW5zdGFuY2U6MTIzNDU2NzgtMTIzNC00NTY3LTg5YWItY2RlZjAxMjM0NTY3",
      name: "ServiceNow - Production",
    },
    user: {
      id: "VXNlcjoxMjM0NTY3OC0xMjM0LTQ1NjctODlhYi1jZGVmMDEyMzQ1Njc=",
      email: "user@example.com",
      name: "Example User",
      externalId: "ext-user-001",
    },
    integration: {
      id: "SW50ZWdyYXRpb246MTIzNDU2NzgtMTIzNC00NTY3LTg5YWItY2RlZjAxMjM0NTY3",
      name: "ServiceNow - Record Sync",
      versionSequenceId: "VmVyc2lvbjoxMjM0NTY3OC0xMjM0LTQ1Njc=",
      externalVersion: "1.0.0",
    },
    flow: {
      id: "Rmxvdzo4NzY1NDMyMS0xMjM0LTQ1NjctODlhYi1jZGVmMDEyMzQ1Njc=",
      name: "New and Updated Records",
      stableId: "",
    },
    startedAt: "",
    globalDebug: false,
  },
};
export const createConfigurationItemExamplePayload = {
  data: {
    result: {
      outbound_relations: [
        {
          sys_id: "403ff2641b425010593876a61a4bcb4b",
          type: {
            display_value: "Depends on::Used by",
            link: "https://instance.servicenow.com/api/now/table/cmdb_rel_type/1a9cb166f1571100a92eb60da2bce5c5",
            value: "1a9cb166f1571100a92eb60da2bce5c5",
          },
          target: {
            display_value: "PS ORA01",
            link: "https://instance.servicenow.com/api/now/cmdb/instance/cmdb_ci/3a307c930a0a0bb400353965d0b8861f",
            value: "3a307c930a0a0bb400353965d0b8861f",
          },
        },
      ],
      attributes: {
        firewall_status: "Intranet",
        operational_status: "1",
        sys_updated_on: "2020-07-13 20:27:28",
        discovery_source: "ServiceNow",
        first_discovered: "2020-07-13 20:27:28",
        used_for: "Production",
        sys_created_by: "dora.gray",
        sys_domain_path: "/",
        classification: "Production",
        can_print: "false",
        sys_class_name: "cmdb_ci_linux_server",
        internet_facing: "true",
        hardware_status: "installed",
        install_status: "1",
        name: "lnux299",
        subcategory: "Computer",
        virtual: "false",
        sys_id: "0c3ff2641b425010593876a61a4bcb39",
        unverified: "false",
        skip_sync: "false",
        sys_updated_by: "dora.gray",
        sys_created_on: "2020-07-13 20:27:28",
        cd_rom: "false",
        monitor: "false",
        sys_mod_count: "0",
        cost_cc: "USD",
        attested: "false",
        category: "Hardware",
        fault_count: "0",
      },
      inbound_relations: [
        {
          sys_id: "c03ff2641b425010593876a61a4bcb49",
          type: {
            display_value: "Depends on::Used by",
            link: "https://instance.servicenow.com/api/now/table/cmdb_rel_type/1a9cb166f1571100a92eb60da2bce5c5",
            value: "1a9cb166f1571100a92eb60da2bce5c5",
          },
          target: {
            display_value: "PS Apache01",
            link: "https://instance.servicenow.com/api/now/cmdb/instance/cmdb_ci/3a27d4370a0a0bb4006316812bf45439",
            value: "3a27d4370a0a0bb4006316812bf45439",
          },
        },
      ],
    },
  },
};
