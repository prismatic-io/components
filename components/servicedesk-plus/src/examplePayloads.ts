export const listAssetsResponse = {
  assets: [
    {
      loan: {
        start_time: {
          display_value: "Nov 10, 2016 11:44 AM",
          value: "1478758440000",
        },
        id: "1510894167438614",
        returned_time: {
          display_value: "Nov 10, 2016 11:44 AM",
          value: "1478758440000",
        },
        barcode: "test-barcode",
        due_by_time: {
          display_value: "Nov 10, 2016 11:44 AM",
          value: "1478758440000",
        },
        loan_id: {
          display_value: "CH 44",
          value: "44",
        },
      },
      retain_user_site: false,
      type: {
        name: "Asset",
        id: "2221589639239391",
      },
      last_updated_by: {
        email_id: "lincoln@zmail.com",
        is_technician: false,
        sms_mail: "linc123@xys_sms.co",
        phone: "test-phone",
        name: "Lincoln",
        mobile: "test-mobile",
        id: "1767056521034237",
        photo_url: "test-photo_url",
        is_vip_user: false,
      },
      id: "1535924695172238",
      purchase_cost: 1343434.4333,
      state: {
        name: "In Use",
        description: "test-description",
        id: "1880749423319170",
      },
      barcode: "test-barcode",
      created_time: {
        display_value: "Nov 10, 2016 11:44 AM",
        value: "1478758440000",
      },
      product: {
        part_no: "test-part_no",
        name: "test-name",
        id: "1976861984208771",
        manufacturer: "test-manufacturer",
      },
      created_by: {
        email_id: "lincoln@zmail.com",
        is_technician: false,
        sms_mail: "linc123@xys_sms.co",
        phone: "test-phone",
        name: "Lincoln",
        mobile: "test-mobile",
        id: "1621855055856191",
        photo_url: "test-photo_url",
        is_vip_user: false,
      },
      site: {
        deleted: false,
        name: "Custom Site",
        id: "1812928581155277",
      },
      product_type: {
        image: "test-image",
        name: "Workstation",
        id: "1754602739373275",
      },
      last_updated_time: {
        display_value: "Nov 10, 2016 11:44 AM",
        value: "1478758440000",
      },
      name: "192.0.2.1",
      location: "test-location",
      is_loanable: false,
      category: {
        name: "IT",
        description: "test-description",
        id: "1817089573167815",
      },
      state_history_comments: "test-state_history_comments",
    },
  ],
  response_status: [
    {
      status_code: 2000,
      status: "success",
    },
  ],
  list_info: {
    has_more_rows: false,
    row_count: 1,
  },
};

export const createAssetResponse = {
  response_status: {
    status_code: 2000,
    status: "success",
  },
  asset: {
    purchase_lot_id: null,
    acknowledgement: null,
    total_cost: "0.0",
    device_type: null,
    type: {
      name: "Asset",
      id: "207953000000005903",
    },
    lifecycle: null,
    last_updated_by: null,
    credential: null,
    suggested_owner: null,
    id: "207953000000314001",
    state: {
      internal_name: "In Store",
      name: "In Store",
      description: null,
      id: "207953000000006135",
    },
    barcode: null,
    product_depreciation: null,
    operational_cost: "0.0",
    asset_tag: null,
    created_time: {
      display_value: "Apr 17, 2024 04:01 PM",
      value: "1713387707981",
    },
    is_swscan_needed: false,
    created_by: {
      email_id: "example@company.com",
      is_technician: true,
      sms_mail: null,
      mobile: "",
      last_name: "",
      user_scope: "internal_user",
      sms_mail_id: null,
      cost_per_hour: "0",
      site: {
        deleted: false,
        name: "Base Site",
        id: "207953000000222001",
        is_default: true,
      },
      phone: "",
      employee_id: null,
      name: "TJ Tedrow",
      id: "207953000000274942",
      photo_url:
        "https://contacts.zoho.com/file?exp=10&ID=850344966&t=user&height=60&width=60",
      is_vip_user: false,
      department: null,
      first_name: "TJ Tedrow",
      job_title: null,
    },
    last_updated_time: null,
    purchase_order: null,
    network_adapters: [],
    name: "UniqueName",
    is_depreciation_configured: false,
    region: null,
    is_depreciation_calculated: false,
    loan: null,
    attachments: [],
    retain_user_site: true,
    is_asset_association_possible: true,
    acquisition_date: null,
    current_cost: "0.0",
    vendor: null,
    mac_address: null,
    purchase_cost: "0.0",
    department: null,
    depreciation: null,
    product: {
      part_no: "-",
      gl_code: null,
      product_type: {
        image: "Access_Points",
        name: "Access Point",
        id: "207953000000005925",
        display_name: "Access Points",
        mandatory: true,
      },
      software: null,
      name: "Product Name",
      id: "207953000000313007",
      type: {
        name: "Asset",
        id: "207953000000005903",
      },
      category: {
        name: "IT",
        description: "IT Assets and Components",
        id: "207953000000005899",
      },
      manufacturer: "-",
    },
    asset_depreciation: null,
    integration_mappings: [],
    expiry_date: null,
    used_by_asset: null,
    serial_number: null,
    warranty_expiry: null,
    ip_address: null,
    probe: null,
    site: {
      deleted: false,
      name: "Base Site",
      id: "207953000000222001",
      is_default: true,
    },
    product_type: {
      image: "Access_Points",
      name: "Access Point",
      id: "207953000000005925",
      display_name: "Access Points",
      mandatory: true,
    },
    discovered_serial_number: null,
    location: null,
    is_loaned: false,
    is_loanable: false,
    category: {
      name: "IT",
      description: "IT Assets and Components",
      id: "207953000000005899",
    },
    user: null,
    last_success_audit: null,
    last_audit: null,
  },
};

export const deleteResponse = {
  response_status: {
    status_code: 2000,
    status: "success",
  },
};

export const getProductResponse = {
  product: {
    is_laptop: false,
    part_no: "test-part_no",
    comments: "test-comments",
    product_type: {
      image: "test-image",
      name: "Workstation",
      id: "2247881320113485",
    },
    software: {
      is_parent_suite: false,
      name: "test-name",
      id: "1970019934993439",
    },
    name: "test-name",
    id: "2389334491499884",
    type: {
      name: "Asset",
      id: "2429804592656991",
    },
    category: {
      name: "IT",
      description: "test-description",
      id: "1875814009075528",
    },
    depreciation_detail: {
      useful_life: "2337459615672549",
      id: "2421818154117324",
      depreciation_percent: 1343434.4333,
      salvage_value: 1343434.4333,
    },
    manufacturer: "test-manufacturer",
  },
  response_status: {
    status_code: 2000,
    status: "success",
  },
};

export const listProductsResponse = {
  response_status: [
    {
      status_code: 2000,
      status: "success",
    },
  ],
  list_info: {
    has_more_rows: false,
    row_count: 1,
  },
  products: [
    {
      is_laptop: false,
      part_no: "test-part_no",
      comments: "test-comments",
      product_type: {
        image: "test-image",
        name: "Workstation",
        id: "1921325636821381",
      },
      software: {
        is_parent_suite: false,
        name: "test-name",
        id: "2456631449619317",
      },
      name: "test-name",
      id: "2390004684229909",
      type: {
        name: "Asset",
        id: "1825477048701112",
      },
      category: {
        name: "IT",
        description: "test-description",
        id: "2230240622346283",
      },
      depreciation_detail: {
        useful_life: "2296589928410633",
        id: "1926721364241665",
        depreciation_percent: 1343434.4333,
        salvage_value: 1343434.4333,
      },
      manufacturer: "test-manufacturer",
    },
  ],
};

export const listProductTypesResponse = {
  response_status: [
    {
      status_code: 2000,
      status: "success",
    },
  ],
  product_types: [
    {
      image: "test-image",
      name: "Workstation",
      description: "test-description",
      id: "2011402704295145",
      display_name: "test-display_name",
      type: {
        name: "Asset",
        id: "1717928672901287",
      },
      category: {
        name: "IT",
        description: "test-description",
        id: "1968174468165684",
      },
    },
  ],
  list_info: {
    has_more_rows: false,
    row_count: 1,
  },
};

export const getProductTypeResponse = {
  product_type: {
    image: "test-image",
    name: "Workstation",
    description: "test-description",
    id: "1654204619243101",
    display_name: "test-display_name",
    type: {
      name: "Asset",
      id: "1898443623900317",
    },
    category: {
      name: "IT",
      description: "test-description",
      id: "1699836392964313",
    },
  },
  response_status: {
    status_code: 2000,
    status: "success",
  },
};

export const listConfigurationItemsResponse = {
  response_status: [
    {
      status_code: 2000,
      status: "success",
    },
  ],
  list_info: {
    has_more_rows: false,
    sort_field: "name",
    row_count: 1,
  },
  ci_computer: [
    {
      created_time: {
        display_value: "Jul 30, 2021 07:44 PM",
        value: "1627654487657",
      },
      last_updated_by: {
        email_id: "lincoln@zmail.com",
        is_technician: true,
        sms_mail: "linc123@xys_sms.co",
        contact_info_id: "100000000000034009",
        mobile: "9876543210",
        last_name: null,
        user_scope: "0",
        phone: null,
        name: "Lincoln",
        id: "100000000000034007",
        photo_url: "test-photo-url",
        is_vip_user: false,
        department: {
          site: null,
          name: "Engineering",
          id: "100000000000005416",
        },
        first_name: "Lincoln",
        job_title: null,
      },
      ci_type: {
        api_plural_name: "ci_computer",
        name: "ci_computer",
        display_name_plural: "Computer",
        id: "100000000000030014",
        display_name: "Computer",
        icon_name: "exchange_server",
      },
      ci_attributes: {
        ref_model: null,
        txt_service_tag: null,
        ref_owned_by: {
          email_id: "lincoln@zmail.com",
          is_technician: true,
          sms_mail: "linc123@xys_sms.co",
          contact_info_id: "100000000000034009",
          mobile: "9876543210",
          last_name: null,
          user_scope: "0",
          phone: null,
          name: "Lincoln",
          id: "100000000000034007",
          photo_url: "test-photo-url",
          is_vip_user: false,
          department: {
            site: null,
            name: "Engineering",
            id: "100000000000005416",
          },
          first_name: "Lincoln",
          job_title: null,
        },
        txt_processor_name: null,
        txt_location: null,
        ref_managed_by: {
          email_id: "lincoln@zmail.com",
          is_technician: true,
          sms_mail: "linc123@xys_sms.co",
          contact_info_id: "100000000000034009",
          mobile: "9876543210",
          last_name: null,
          user_scope: "0",
          phone: null,
          name: "Lincoln",
          id: "100000000000034007",
          photo_url: "test-photo-url",
          is_vip_user: false,
          department: {
            site: null,
            name: "Engineering",
            id: "100000000000005416",
          },
          first_name: "Lincoln",
          job_title: null,
        },
        txt_manufacturer: "Dell",
        txt_os: "Windows",
        txt_serial_number: null,
        txt_ip_address: null,
        txt_mac_address: null,
        num_processor_count: null,
        txt_service_pack: null,
        ref_business_impact: {
          name: "Affects Department",
          id: "100000000000007152",
        },
      },
      last_updated_time: {
        display_value: "Jul 30, 2021 07:47 PM",
        value: "1627654669667",
      },
      name: "Dell Server",
      description: "Dell Server used for VMs",
      id: "100000000000034020",
      created_by: {
        email_id: "lincoln@zmail.com",
        is_technician: true,
        sms_mail: "linc123@xys_sms.co",
        contact_info_id: "100000000000034009",
        mobile: "9876543210",
        last_name: null,
        user_scope: "0",
        phone: null,
        name: "Lincoln",
        id: "100000000000034007",
        photo_url: "test-photo-url",
        is_vip_user: false,
        department: {
          site: null,
          name: "Engineering",
          id: "100000000000005416",
        },
        first_name: "Lincoln",
        job_title: null,
      },
      data_source: [],
    },
  ],
};

export const getConfigurationItemResponse = {
  response_status: {
    status_code: 2000,
    status: "success",
  },
  ci_computer: {
    linked_instance: "100000000000005416",
    created_time: {
      display_value: "Jul 30, 2021 07:44 PM",
      value: "1627654487657",
    },
    attachments: [],
    ci_attributes: {
      ref_model: null,
      txt_service_tag: null,
      ref_owned_by: {
        email_id: "lincoln@zmail.com",
        is_technician: true,
        sms_mail: "linc123@xys_sms.co",
        contact_info_id: "100000000000034009",
        mobile: "9876543210",
        last_name: null,
        user_scope: "0",
        phone: null,
        name: "Lincoln",
        id: "100000000000034007",
        photo_url: "test-photo-url",
        is_vip_user: false,
        department: {
          site: null,
          name: "Engineering",
          id: "100000000000005416",
        },
        first_name: "Lincoln",
        job_title: null,
      },
      txt_processor_name: null,
      txt_location: null,
      ref_managed_by: {
        email_id: "lincoln@zmail.com",
        is_technician: true,
        sms_mail: "linc123@xys_sms.co",
        contact_info_id: "100000000000034009",
        mobile: "9876543210",
        last_name: null,
        user_scope: "0",
        phone: null,
        name: "Lincoln",
        id: "100000000000034007",
        photo_url: "test-photo-url",
        is_vip_user: false,
        department: {
          site: null,
          name: "Engineering",
          id: "100000000000005416",
        },
        first_name: "Lincoln",
        job_title: null,
      },
      txt_manufacturer: "Dell",
      txt_os: "Windows",
      txt_serial_number: null,
      txt_ip_address: null,
      txt_mac_address: null,
      num_processor_count: null,
      txt_service_pack: null,
      ref_business_impact: {
        name: "Affects Department",
        id: "100000000000007152",
      },
    },
    description: "Dell Server used for VMs",
    created_by: {
      email_id: "lincoln@zmail.com",
      is_technician: true,
      sms_mail: "linc123@xys_sms.co",
      contact_info_id: "100000000000034009",
      mobile: "9876543210",
      last_name: null,
      user_scope: "0",
      phone: null,
      name: "Lincoln",
      id: "100000000000034007",
      photo_url: "test-photo-url",
      is_vip_user: false,
      department: {
        site: null,
        name: "Engineering",
        id: "100000000000005416",
      },
      first_name: "Lincoln",
      job_title: null,
    },
    data_source: [],
    last_updated_by: {
      email_id: "lincoln@zmail.com",
      is_technician: true,
      sms_mail: "linc123@xys_sms.co",
      contact_info_id: "100000000000034009",
      mobile: "9876543210",
      last_name: null,
      user_scope: "0",
      phone: null,
      name: "Lincoln",
      id: "100000000000034007",
      photo_url: "test-photo-url",
      is_vip_user: false,
      department: {
        site: null,
        name: "Engineering",
        id: "100000000000005416",
      },
      first_name: "Lincoln",
      job_title: null,
    },
    ci_type: {
      api_plural_name: "ci_computer",
      name: "ci_computer",
      display_name_plural: "Computer",
      id: "100000000000030014",
      display_name: "Computer",
      icon_name: "exchange_server",
    },
    linked_entity: {
      api_plural_name: "departments",
      name: "department",
      display_name_plural: "sdp.module.pluralname.departments",
      id: "100000000000004786",
      display_name: "Department",
      icon_name: null,
    },
    last_updated_time: {
      display_value: "Jul 30, 2021 07:47 PM",
      value: "1627654669667",
    },
    linked_instance_data: {
      site: null,
      name: "Engineering",
      id: "100000000000005416",
    },
    name: "Dell Server",
    id: "100000000000034020",
  },
};

export const listAssetsDatasource = {
  result: [
    { label: "192.0.2.1", key: "1817089573167815" },
    { label: "192.0.2.23", key: "1817089573167315" },
  ],
};

export const listProblemsDatasource = {
  result: [
    { label: "Test Problem", key: "4149000001355051" },
    { label: "Test Problem 2", key: "4149000001355052" },
  ],
};

export const listRequestsDatasource = {
  result: [
    { label: "Test Request 1", key: "4149000001355051" },
    { label: "Test Request 2", key: "4149000001355052" },
  ],
};

export const createProblemResponse = {
  data: {
    problem: {
      known_error_details: {
        known_error_details_updated_by: {
          email_id: "john@zylker.com",
          is_technician: true,
          sms_mail: null,
          mobile: null,
          last_name: null,
          user_scope: "internal_user",
          sms_mail_id: null,
          site: {
            deleted: false,
            name: "Base Site",
            id: "4149000001242001",
            is_default: true,
          },
          phone: null,
          employee_id: null,
          name: "John",
          id: "4149000000871029",
          photo_url: "https://contacts.localzoho.com/file?sample",
          is_vip_user: false,
          department: null,
          first_name: "John",
          job_title: null,
        },
        known_error_details_updated_on: {
          display_value: "Mar 6, 2023 03:21 PM",
          value: "1678096283689",
        },
        known_error_comments: null,
        is_known_error: false,
      },
      template: {
        inactive: false,
        name: "General Problem Template",
        id: "4149000000128011",
      },
      updated_time: null,
      attachments: [],
      display_id: {
        display_value: "PB-140",
        value: "140",
      },
      description: "<div>Description</div>",
      title: "Test Problem",
      lifecycle: null,
      assets: [],
      configuration_items: [
        {
          ci_type: {
            id: "4149000000141328",
          },
          name: "Hardware Problems",
          id: "4149000000288117",
        },
      ],
      urgency: {
        name: "Normal",
        id: "4149000000007921",
      },
      close_details: {
        close_details_updated_on: null,
        closure_code: null,
        close_details_comments: null,
        close_details_updated_by: null,
      },
      rel: {
        workarounds: null,
        resolutions: null,
      },
      reported_by: {
        email_id: "john@zylker.com",
        is_technician: true,
        sms_mail: null,
        mobile: null,
        last_name: null,
        user_scope: "internal_user",
        sms_mail_id: null,
        site: {
          deleted: false,
          name: "Base Site",
          id: "4149000001242001",
          is_default: true,
        },
        phone: null,
        employee_id: null,
        name: "John",
        id: "4149000000871029",
        photo_url: "https://contacts.localzoho.com/file?sample",
        is_vip_user: false,
        department: null,
        first_name: "John",
        job_title: null,
      },
      id: "4149000001355051",
      group: {
        site: {
          id: "4149000001242001",
        },
        deleted: false,
        name: "DBA Group",
        id: "4149000001032137",
      },
      root_cause: {
        root_cause_updated_by: {
          email_id: "john@zylker.com",
          is_technician: true,
          sms_mail: null,
          mobile: null,
          last_name: null,
          user_scope: "internal_user",
          sms_mail_id: null,
          site: {
            deleted: false,
            name: "Base Site",
            id: "4149000001242001",
            is_default: true,
          },
          phone: null,
          employee_id: null,
          name: "John",
          id: "4149000000871029",
          photo_url: "https://contacts.localzoho.com/file?sample",
          is_vip_user: false,
          department: null,
          first_name: "John",
          job_title: null,
        },
        root_cause_description: "Root Cause",
        root_cause_updated_on: {
          display_value: "Mar 6, 2023 03:21 PM",
          value: "1678096283690",
        },
      },
      item: {
        name: "Install",
        id: "4149000000006773",
      },
      resolution_details: {
        resolution_details_updated_by: {
          email_id: "john@zylker.com",
          is_technician: true,
          sms_mail: null,
          mobile: null,
          last_name: null,
          user_scope: "internal_user",
          sms_mail_id: null,
          site: {
            deleted: false,
            name: "Base Site",
            id: "4149000001242001",
            is_default: true,
          },
          phone: null,
          employee_id: null,
          name: "John",
          id: "4149000000871029",
          photo_url: "https://contacts.localzoho.com/file?sample",
          is_vip_user: false,
          department: null,
          first_name: "John",
          job_title: null,
        },
        resolution_details_description: "Resolution",
        resolution_details_updated_on: {
          display_value: "Mar 6, 2023 03:21 PM",
          value: "1678096283690",
        },
      },
      workaround_details: {
        workaround_details_description: "Workaround",
        workaround_details_updated_by: {
          email_id: "john@zylker.com",
          is_technician: true,
          sms_mail: null,
          mobile: null,
          last_name: null,
          user_scope: "internal_user",
          sms_mail_id: null,
          site: {
            deleted: false,
            name: "Base Site",
            id: "4149000001242001",
            is_default: true,
          },
          phone: null,
          employee_id: null,
          name: "John",
          id: "4149000000871029",
          photo_url: "https://contacts.localzoho.com/file?sample",
          is_vip_user: false,
          department: null,
          first_name: "John",
          job_title: null,
        },
        workaround_details_updated_on: {
          display_value: "Mar 6, 2023 03:21 PM",
          value: "1678096283690",
        },
      },
      impact: {
        name: "Affects Group",
        id: "4149000000008036",
      },
      technician: {
        email_id: "chine@haods.com",
        is_technician: true,
        sms_mail: null,
        mobile: null,
        last_name: null,
        user_scope: "internal_user",
        sms_mail_id: null,
        cost_per_hour: "0",
        site: {
          id: "4149000001242001",
        },
        phone: null,
        employee_id: null,
        name: "china ech",
        id: "4149000000766091",
        photo_url:
          "https://contacts.localzoho.com/file?exp=10&ID=-1&t=user&height=60&width=60",
        is_vip_user: false,
        department: null,
        first_name: "china ech",
        job_title: null,
      },
      closed_time: null,
      services: [
        {
          inactive: false,
          name: "Communication",
          id: "4149000001341526",
          sort_index: 0,
        },
        {
          inactive: false,
          name: "Application Login",
          id: "4149000001341618",
          sort_index: 0,
        },
      ],
      priority: {
        color: "#ff6600",
        name: "Medium",
        id: "4149000000006803",
      },
      due_by_time: {
        display_value: "Mar 8, 2023 02:07 PM",
        value: "1678264620000",
      },
      symptoms: {
        symptoms_updated_by: {
          email_id: "john@zylker.com",
          is_technician: true,
          sms_mail: null,
          mobile: null,
          last_name: null,
          user_scope: "internal_user",
          sms_mail_id: null,
          site: {
            deleted: false,
            name: "Base Site",
            id: "4149000001242001",
            is_default: true,
          },
          phone: null,
          employee_id: null,
          name: "John",
          id: "4149000000871029",
          photo_url: "https://contacts.localzoho.com/file?sample",
          is_vip_user: false,
          department: null,
          first_name: "John",
          job_title: null,
        },
        symptoms_description: "symptoms",
        symptoms_updated_on: {
          display_value: "Mar 6, 2023 03:21 PM",
          value: "1678096283689",
        },
      },
      site: {
        deleted: false,
        name: "Base Site",
        id: "4149000001242001",
        is_default: true,
      },
      udf_fields: {
        udf_char6: null,
        udf_char1: "YES",
        udf_char2: null,
        udf_char5: null,
        udf_ref2: null,
        udf_ref1: null,
        udf_ref8: null,
        udf_ref7: null,
        udf_ref6: null,
        udf_ref5: null,
        udf_ref4: null,
        udf_date3: null,
        udf_date2: null,
        udf_ref3: null,
      },
      impact_details: {
        impact_details_updated_on: {
          display_value: "Mar 6, 2023 03:21 PM",
          value: "1678096283690",
        },
        impact_details_updated_by: {
          email_id: "john@zylker.com",
          is_technician: true,
          sms_mail: null,
          mobile: null,
          last_name: null,
          user_scope: "internal_user",
          sms_mail_id: null,
          site: {
            deleted: false,
            name: "Base Site",
            id: "4149000001242001",
            is_default: true,
          },
          phone: null,
          employee_id: null,
          name: "John",
          id: "4149000000871029",
          photo_url: "https://contacts.localzoho.com/file?sample",
          is_vip_user: false,
          department: null,
          first_name: "John",
          job_title: null,
        },
        impact_details_description: "Impact Details",
      },
      reported_time: {
        display_value: "Mar 6, 2023 03:21 PM",
        value: "1678096283612",
      },
      problem_template_task_ids: [],
      category: {
        deleted: false,
        name: "Software",
        id: "4149000000006689",
      },
      subcategory: {
        name: "MS Office",
        id: "4149000000006717",
      },
      notes_present: false,
      status: {
        in_progress: true,
        internal_name: "Open",
        stop_timer: false,
        color: "#0066ff",
        name: "Open",
        id: "4149000000006657",
      },
    },
    response_status: {
      status_code: 2000,
      status: "success",
    },
  },
};

export const updateProblemResponse = createProblemResponse;

export const getProblemResponse = {
  data: {
    response_status: [
      {
        status_code: 2000,
        status: "success",
      },
    ],
    list_info: {
      has_more_rows: false,
      row_count: 1,
    },
    problem: createProblemResponse.data.problem,
  },
};

export const listProblemsResponse = {
  data: {
    response_status: [
      {
        status_code: 2000,
        status: "success",
      },
    ],
    list_info: {
      has_more_rows: false,
      row_count: 1,
    },
    problems: [createProblemResponse.data.problem],
  },
};

export const deleteProblemResponse = {
  data: {
    response_status: {
      status_code: 2000,
      status: "success",
    },
  },
};

export const createProblemNoteResponse = {
  data: {
    note: {
      performed_by: {
        email_id: "john.je@zylker.com",
        is_technician: true,
        sms_mail: null,
        mobile: null,
        last_name: "J",
        user_scope: "internal_user",
        sms_mail_id: null,
        site: {
          deleted: false,
          name: "Base Site",
          id: "100000000000006098",
          is_default: true,
        },
        phone: null,
        employee_id: null,
        name: "John",
        id: "100000000000036077",
        photo_url: "https://contacts.localzoho.com/file?sample",
        is_vip_user: false,
        department: null,
        first_name: "John",
        job_title: null,
      },
      description: "<div>Test Add Note</div>",
      id: "100000000000038247",
      performed_time: {
        display_value: "Feb 2, 2023 12:53 PM",
        value: "1675322599582",
      },
    },
    response_status: {
      status_code: 2000,
      status: "success",
    },
  },
};

export const deleteProblemNoteResponse = deleteProblemResponse;

export const getProblemNoteResponse = createProblemNoteResponse;

export const listProblemNotesResponse = {
  data: {
    notes: [createProblemNoteResponse.data.note],
    response_status: {
      status_code: 2000,
      status: "success",
    },
    list_info: {
      has_more_rows: false,
      row_count: 1,
    },
  },
};

export const updateProblemNoteResponse = createProblemNoteResponse;

export const createProblemTaskResponse = {
  data: {
    task: {
      percentage_completion: 45,
      estimated_effort_hours: null,
      attachments: [],
      email_before: "1800000",
      description: "<div>Add Task</div>",
      title: "Add Problem Task",
      marked_technician: null,
      problem: {
        id: "4149000001305071",
      },
      overdue: false,
      additional_cost: "150",
      actual_end_time: {
        display_value: "Feb 7, 2023 02:44 PM",
        value: "1675761240000",
      },
      id: "4149000001305075",
      actual_start_time: {
        display_value: "Feb 3, 2023 02:44 PM",
        value: "1675415640000",
      },
      group: null,
      owner: {
        email_id: "john@zylker.com",
        is_technician: true,
        sms_mail: null,
        mobile: null,
        last_name: null,
        user_scope: "internal_user",
        sms_mail_id: null,
        site: {
          deleted: false,
          name: "Base Site",
          id: "4149000001242001",
          is_default: true,
        },
        phone: null,
        employee_id: null,
        name: "John",
        id: "4149000000871029",
        photo_url: "https://contacts.localzoho.com/file?sample",
        is_vip_user: false,
        department: null,
        first_name: "John",
        job_title: null,
      },
      associated_entity: "problem",
      module: "Problem",
      index: 1,
      priority: {
        color: "#ff6600",
        name: "Medium",
        id: "4149000000006803",
      },
      created_by: {
        email_id: "john@zylker.com",
        is_technician: true,
        sms_mail: null,
        mobile: null,
        last_name: null,
        user_scope: "internal_user",
        sms_mail_id: null,
        site: {
          deleted: false,
          name: "Base Site",
          id: "4149000001242001",
          is_default: true,
        },
        phone: null,
        employee_id: null,
        name: "John",
        id: "4149000000871029",
        photo_url: "https://contacts.localzoho.com/file?sample",
        is_vip_user: false,
        department: null,
        first_name: "John",
        job_title: null,
      },
      scheduled_end_time: {
        display_value: "Feb 9, 2023 02:44 PM",
        value: "1675934040000",
      },
      marked_group: null,
      site: {
        deleted: false,
        name: "Base Site",
        id: "4149000001242001",
        is_default: true,
      },
      estimated_effort_minutes: null,
      deleted: false,
      estimated_effort: "1036800000",
      created_date: {
        display_value: "Feb 2, 2023 02:44 PM",
        value: "1675329299172",
      },
      estimated_effort_days: "12",
      task_type: null,
      scheduled_start_time: {
        display_value: "Feb 2, 2023 02:44 PM",
        value: "1675329240000",
      },
      status: {
        in_progress: true,
        internal_name: "Open",
        stop_timer: false,
        color: "#0066ff",
        name: "Open",
        id: "4149000000006657",
      },
    },
    response_status: {
      status_code: 2000,
      status: "success",
    },
  },
};

export const deleteProblemTaskResponse = deleteProblemResponse;

export const getProblemTaskResponse = createProblemTaskResponse;

export const listProblemTasksResponse = {
  data: {
    tasks: [createProblemTaskResponse.data.task],
    response_status: {
      status_code: 2000,
      status: "success",
    },
    list_info: {
      has_more_rows: false,
      row_count: 1,
    },
  },
};

export const updateProblemTaskResponse = createProblemTaskResponse;

export const createRequestResponse = {
  data: {
    request: {
      total_cost: "250",
      subject: "Need an External Monitor",
      resolution: {
        add_to_linked_requests: false,
        content: "The following is the resolution to the above request",
      },
      is_read: false,
      mode: {
        name: "E-Mail",
        id: "1948726349434187",
      },
      lifecycle: {
        inactive: false,
        is_published: false,
        name: "test-name",
        id: "2044673193715195",
      },
      assets: [
        {
          name: "192.0.2.1",
          id: "2476215879232669",
          barcode: "test-barcode",
        },
      ],
      configuration_items: [
        {
          linked_instance: "2045488344070845",
          name: "test-name",
          id: "1611839137508603",
        },
      ],
      project_id: "test-project_id",
      cancellation_requested: false,
      is_trashed: false,
      has_change_initiated_request: "true",
      id: "2290537481381500",
      assigned_time: {
        display_value: "Nov 10, 2016 11:44 AM",
        value: "1478758440000",
      },
      group: {
        site: "Custom Site",
        deleted: false,
        name: "Hardware Problems",
        id: "1646275022585519",
      },
      requester: {
        email_id: "lincoln@zmail.com",
        is_technician: false,
        sms_mail: "linc123@xys_sms.co",
        phone: "022-1234567890",
        name: "Lincoln",
        mobile: "1234567890",
        id: "2374730939861945",
        photo_url: "https://contacts.zoho.com/file?sample",
        is_vip_user: false,
        job_title: "Java Developer",
      },
      email_to: [],
      created_time: {
        display_value: "Nov 10, 2016 11:44 AM",
        value: "1478758440000",
      },
      item: {
        name: "Install",
        id: "2372339936802225",
      },
      cancel_flag_comments: {
        comment: "test-comment",
        id: "1859958322770061",
      },
      level: {
        name: "Tier 1",
        id: "2018182121337715",
      },
      on_behalf_of: {
        email_id: "lincoln@zmail.com",
        is_technician: false,
        sms_mail: "linc123@xys_sms.co",
        phone: "022-1234567890",
        name: "Lincoln",
        mobile: "1234567890",
        id: "1532347302595840",
        photo_url: "https://contacts.zoho.com/file?sample",
        is_vip_user: false,
        job_title: "Java Developer",
      },
      approval_status: {
        name: "Approved",
        id: "2383059912529037",
      },
      impact: {
        name: "Affects Business",
        id: "1765848093928449",
      },
      service_category: {
        inactive: false,
        name: "Corporate Website",
        id: "2329032013178322",
        sort_index: 7,
      },
      sla: {
        name: "High",
        duebyminutes: 21,
        id: "2267633716896305",
        duebyhours: false,
        duebydays: 41,
      },
      resolved_time: "null",
      priority: {
        color: "#ffffff",
        name: "High",
        id: "1967268183361012",
      },
      created_by: {
        email_id: "lincoln@zmail.com",
        is_technician: false,
        sms_mail: "linc123@xys_sms.co",
        phone: "022-1234567890",
        name: "Lincoln",
        mobile: "1234567890",
        id: "2070790206912927",
        photo_url: "https://contacts.zoho.com/file?sample",
        is_vip_user: false,
        job_title: "Java Developer",
      },
      first_response_due_by_time: {
        display_value: "Nov 10, 2016 11:44 AM",
        value: "1478758440000",
      },
      is_escalated: false,
      last_updated_time: "null",
      has_notes: false,
      udf_fields: {
        udf_ref1: {
          name: "test-name",
          id: "2470322684475602",
        },
        udf_boolean1: false,
        udf_long1: "2136851967326526",
        udf_date1: {
          display_value: "Nov 10, 2016 11:44 AM",
          value: "1478758440000",
        },
        udf_double1: "test-udf_double1",
        udf_char1: "test-udf_char1",
        deptheadid: {
          name: "test-name",
          id: "1975292840863883",
        },
      },
      status_change_comments: "test-status_change_comments",
      impact_details: "Details of the impact",
      subcategory: {
        name: "Adobe Reader",
        id: "2204017819975726",
      },
      email_cc: ["andrews@zmail.com"],
      deleted_time: "null",
      status: {
        in_progress: false,
        internal_name: "test-internal_name",
        stop_timer: false,
        color: "#ffffff",
        name: "Open",
        id: "2434907668683558",
      },
      template: {
        is_service_template: false,
        name: "Raise a New Monitor Request",
        id: "2174353095375675",
      },
      email_ids_to_notify: ["andrews@zmail.com"],
      attachments: [],
      request_type: {
        name: "Incident",
        id: "2147014131875404",
      },
      display_id: "39",
      time_elapsed: "2371520029466911",
      notification_status: "test-notification_status",
      has_purchase_orders: false,
      description: "Provide me an External Monitor",
      responded_time: "null",
      is_service_request: false,
      deleted_assets: [{}],
      urgency: {
        name: "Urgent",
        id: "2104949385602485",
      },
      has_request_initiated_change: false,
      request_template_task_ids: [
        {
          id: "2174353095375675",
          title: "Create SRS",
        },
      ],
      department: {
        name: "Administration",
        id: "2190218995208715",
      },
      is_reopened: false,
      editor_status: 27,
      editor: {
        email_id: "lincoln@zmail.com",
        is_technician: false,
        sms_mail: "linc123@xys_sms.co",
        phone: "022-1234567890",
        name: "Lincoln",
        mobile: "1234567890",
        id: "2458320955274024",
        photo_url: "https://contacts.zoho.com/file?sample",
        is_vip_user: false,
        job_title: "Java Developer",
      },
      has_draft: false,
      has_attachments: false,
      has_linked_requests: false,
      resources: {
        res_100000000000248391: {
          qstn_check_100000000000248371: [
            {
              name: "test-name-1",
            },
            {
              name: "test-name-2",
            },
          ],
          qstn_text_100000000000248377: {
            value: "text-box-value",
          },
          qstn_simple_100000000000248379: {
            name: "test-name",
          },
          qstn_select_100000000000248385: {
            name: "test-name",
          },
        },
      },
      is_overdue: false,
      technician: {
        email_id: "charles@zmail.com",
        cost_per_hour: 1343434.4333,
        phone: "test-phone",
        name: "Charles",
        mobile: "test-mobile",
        id: "2276596244154377",
        photo_url: "test-photo_url",
        sms_mail_id: "test-sms_mail_id",
      },
      delete_pre_template_tasks: false,
      has_problem: false,
      due_by_time: {
        display_value: "Nov 10, 2016 11:44 AM",
        value: "1478758440000",
      },
      is_fcr: false,
      has_project: false,
      site: {
        deleted: false,
        name: "Custom Site",
        id: "2222857346042280",
      },
      is_first_response_overdue: false,
      completed_time: "null",
      unreplied_count: "4",
      email_bcc: [],
      service_cost: "100",
      service_approvers: {
        org_roles: [
          {
            xpath: {
              path: "test-path",
              display_name: "test-display_name",
            },
          },
        ],
        users: [
          {
            email_id: "test@test.com",
            is_technician: false,
            sms_mail: "test-sms_mail",
            phone: "test-phone",
            name: "test-name",
            mobile: "test-mobile",
            id: "1939084650493601",
            photo_url: "test-photo_url",
            is_vip_user: false,
            job_title: "test-job_title",
          },
        ],
      },
      category: {
        deleted: false,
        name: "Software",
        id: "2411765802963298",
      },
    },
    response_status: {
      status_code: 2000,
      status: "success",
    },
  },
};

export const deleteRequestResponse = deleteProblemNoteResponse;

export const getRequestResponse = createRequestResponse;

export const listRequestsResponse = {
  data: {
    requests: [createRequestResponse.data.request],
    response_status: {
      status_code: 2000,
      status: "success",
    },
    list_info: {
      has_more_rows: false,
      row_count: 1,
    },
  },
};

export const updateRequestResponse = createRequestResponse;

export const createRequestTaskResponse = {
  data: {
    task: {
      percentage_completion: "30",
      request: {
        id: "1756402018589639",
      },
      estimated_effort_hours: "20",
      attachments: [],
      email_before: "3600000",
      description: "The SRS must contain all the requirements for the feature",
      title: "Create SRS",
      marked_technician: {
        email_id: "lincoln@zmail.com",
        is_technician: false,
        sms_mail: "linc123@xys_sms.co",
        phone: "022-1234567890",
        name: "Lincoln",
        mobile: "1234567890",
        id: "2443319112022586",
        photo_url:
          "https://contacts.zoho.com/file?exp\u003d10\u0026ID\u003d123\u0026t\u003duser\u0026height\u003d60\u0026width\u003d60",
        is_vip_user: false,
        department: null,
      },
      overdue: false,
      additional_cost: "100",
      actual_end_time: {
        display_value: "Dec 11, 2017 12:19 PM",
        value: "1512974940000",
      },
      id: "1504379411346066",
      actual_start_time: {
        display_value: "Jan 23, 2015 10:15 AM",
        value: "1421988300000",
      },
      owner: {
        email_id: "lincoln@zmail.com",
        is_technician: false,
        sms_mail: "linc123@xys_sms.co",
        phone: "022-1234567890",
        name: "Lincoln",
        mobile: "1234567890",
        id: "1871812265827162",
        photo_url:
          "https://contacts.zoho.com/file?exp\u003d10\u0026ID\u003d123\u0026t\u003duser\u0026height\u003d60\u0026width\u003d60",
        is_vip_user: false,
        department: null,
      },
      associated_entity: "request",
      module: "Request",
      priority: {
        color: "#ffffff",
        name: "High",
        id: "2474460469828007",
      },
      created_by: {
        email_id: "lincoln@zmail.com",
        is_technician: false,
        sms_mail: "linc123@xys_sms.co",
        phone: "022-1234567890",
        name: "Lincoln",
        mobile: "1234567890",
        id: "1577080616582153",
        photo_url:
          "https://contacts.zoho.com/file?exp\u003d10\u0026ID\u003d123\u0026t\u003duser\u0026height\u003d60\u0026width\u003d60",
        is_vip_user: false,
        department: null,
      },
      scheduled_end_time: {
        display_value: "Dec 11, 2017 12:19 PM",
        value: "1512974940000",
      },
      estimated_effort_minutes: "45",
      deleted: false,
      estimated_effort: "22845",
      created_date: {
        display_value: "Nov 10, 2016 11:44 AM",
        value: "1478758440000",
      },
      estimated_effort_days: "15",
      task_type: {
        color: "#ffffff",
        name: "Implementation",
        id: "1898428065971893",
      },
      scheduled_start_time: {
        display_value: "Jan 23, 2015 10:15 AM",
        value: "1421988300000",
      },
      status: {
        in_progress: false,
        internal_name: "test-internal_name",
        stop_timer: false,
        color: "#ffffff",
        name: "Open",
        id: "1822002620862973",
      },
    },
    response_status: {
      status_code: 2000,
      status: "success",
    },
  },
};

export const deleteRequestTaskResponse = deleteProblemNoteResponse;

export const getRequestTaskResponse = createRequestTaskResponse;

export const listRequestTasksResponse = {
  data: {
    tasks: [createRequestTaskResponse.data.task],
    response_status: {
      status_code: 2000,
      status: "success",
    },
    list_info: {
      has_more_rows: false,
      row_count: 1,
    },
  },
};

export const updateRequestTaskResponse = createRequestTaskResponse;
