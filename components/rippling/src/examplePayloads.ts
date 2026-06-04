




export const listBusinessPartnersExamplePayload = {
  data: {
    results: [
      {
        id: "bp_01H5K8N2X3Y4Z5A6B7C8D9E0F1",
        created_at: "2024-01-15T10:30:00Z",
        updated_at: "2024-01-15T10:30:00Z",
        business_partner_group_id: "bpg_01H5K8N2X3Y4Z5A6B7C8D9E0F1",
        worker_id: "wkr_01H5K8N2X3Y4Z5A6B7C8D9E0F1",
        client_group_id: "grp_01H5K8N2X3Y4Z5A6B7C8D9E0F1",
        client_group_member_count: 25,
      },
    ],
    next_link: "https://rest.ripplingapis.com/business-partners?cursor=abc123",
  },
};

export const getBusinessPartnerExamplePayload = {
  data: {
    id: "bp_01H5K8N2X3Y4Z5A6B7C8D9E0F1",
    created_at: "2024-01-15T10:30:00Z",
    updated_at: "2024-01-15T10:30:00Z",
    business_partner_group_id: "bpg_01H5K8N2X3Y4Z5A6B7C8D9E0F1",
    worker_id: "wkr_01H5K8N2X3Y4Z5A6B7C8D9E0F1",
    client_group_id: "grp_01H5K8N2X3Y4Z5A6B7C8D9E0F1",
    client_group_member_count: 25,
  },
};

export const createBusinessPartnerExamplePayload = {
  data: {
    id: "bp_01H5K8N2X3Y4Z5A6B7C8D9E0F1",
    created_at: "2024-01-15T10:30:00Z",
    updated_at: "2024-01-15T10:30:00Z",
    business_partner_group_id: "bpg_01H5K8N2X3Y4Z5A6B7C8D9E0F1",
    worker_id: "wkr_01H5K8N2X3Y4Z5A6B7C8D9E0F1",
    client_group_id: null,
    client_group_member_count: 0,
  },
};

export const deleteBusinessPartnerExamplePayload = {
  data: {
    success: true,
    message:
      "Business partner bp_01H5K8N2X3Y4Z5A6B7C8D9E0F1 deleted successfully.",
  },
};


export const listBusinessPartnerGroupsExamplePayload = {
  data: {
    results: [
      {
        id: "bpg_01H5K8N2X3Y4Z5A6B7C8D9E0F1",
        created_at: "2024-01-10T09:00:00Z",
        updated_at: "2024-01-10T09:00:00Z",
        name: "HR Business Partners",
        domain: "HR",
        default_business_partner_id: "bp_01H5K8N2X3Y4Z5A6B7C8D9E0F1",
      },
    ],
    next_link: null,
  },
};

export const getBusinessPartnerGroupExamplePayload = {
  data: {
    id: "bpg_01H5K8N2X3Y4Z5A6B7C8D9E0F1",
    created_at: "2024-01-10T09:00:00Z",
    updated_at: "2024-01-10T09:00:00Z",
    name: "HR Business Partners",
    domain: "HR",
    default_business_partner_id: "bp_01H5K8N2X3Y4Z5A6B7C8D9E0F1",
  },
};

export const createBusinessPartnerGroupExamplePayload = {
  data: {
    id: "bpg_01H5K8N2X3Y4Z5A6B7C8D9E0F1",
    created_at: "2024-01-10T09:00:00Z",
    updated_at: "2024-01-10T09:00:00Z",
    name: "IT Business Partners",
    domain: "IT",
    default_business_partner_id: null,
  },
};

export const deleteBusinessPartnerGroupExamplePayload = {
  data: {
    success: true,
    message:
      "Business partner group bpg_01H5K8N2X3Y4Z5A6B7C8D9E0F1 deleted successfully.",
  },
};


export const listCompaniesV2ExamplePayload = {
  data: {
    results: [
      {
        id: "cmp_01H5K8N2X3Y4Z5A6B7C8D9E0F1",
        created_at: "2023-06-01T08:00:00Z",
        updated_at: "2024-01-15T12:00:00Z",
        name: "Acme Corporation",
        legal_name: "Acme Corporation Inc.",
        doing_business_as_name: "Acme Corp",
        phone: "+1-555-123-4567",
        primary_email: "contact@acmecorp.com",
        parent_legal_entity_id: "le_01H5K8N2X3Y4Z5A6B7C8D9E0F1",
        legal_entities_id: [
          "le_01H5K8N2X3Y4Z5A6B7C8D9E0F1",
          "le_02H5K8N2X3Y4Z5A6B7C8D9E0F2",
        ],
        physical_address: {
          type: "WORK",
          formatted: "123 Main Street, San Francisco, CA 94105, US",
          street_address: "123 Main Street",
          locality: "San Francisco",
          region: "CA",
          postal_code: "94105",
          country: "US",
        },
      },
    ],
    next_link: null,
  },
};


export const listWorkersExamplePayload = {
  data: {
    results: [
      {
        id: "wkr_01H5K8N2X3Y4Z5A6B7C8D9E0F1",
        created_at: "2023-03-15T10:00:00Z",
        updated_at: "2024-01-15T14:30:00Z",
        user_id: "usr_01H5K8N2X3Y4Z5A6B7C8D9E0F1",
        is_manager: true,
        manager_id: "wkr_02H5K8N2X3Y4Z5A6B7C8D9E0F2",
        legal_entity_id: "le_01H5K8N2X3Y4Z5A6B7C8D9E0F1",
        country: "US",
        start_date: "2023-03-15",
        end_date: null,
        number: 1001,
        work_email: "john.smith@acmecorp.com",
        personal_email: "john.smith@gmail.com",
        status: "ACTIVE",
        employment_type_id: "et_01H5K8N2X3Y4Z5A6B7C8D9E0F1",
        gender: "MALE",
        date_of_birth: "1985-07-22",
        location: {
          type: "OFFICE",
          work_location_id: "wl_01H5K8N2X3Y4Z5A6B7C8D9E0F1",
        },
      },
    ],
    next_link: "https://rest.ripplingapis.com/workers?cursor=xyz789",
  },
};

export const getWorkerExamplePayload = {
  data: {
    id: "wkr_01H5K8N2X3Y4Z5A6B7C8D9E0F1",
    created_at: "2023-03-15T10:00:00Z",
    updated_at: "2024-01-15T14:30:00Z",
    user_id: "usr_01H5K8N2X3Y4Z5A6B7C8D9E0F1",
    is_manager: true,
    manager_id: "wkr_02H5K8N2X3Y4Z5A6B7C8D9E0F2",
    legal_entity_id: "le_01H5K8N2X3Y4Z5A6B7C8D9E0F1",
    country: "US",
    start_date: "2023-03-15",
    end_date: null,
    number: 1001,
    work_email: "john.smith@acmecorp.com",
    personal_email: "john.smith@gmail.com",
    status: "ACTIVE",
    employment_type_id: "et_01H5K8N2X3Y4Z5A6B7C8D9E0F1",
    gender: "MALE",
    date_of_birth: "1985-07-22",
    location: {
      type: "OFFICE",
      work_location_id: "wl_01H5K8N2X3Y4Z5A6B7C8D9E0F1",
    },
  },
};


export const listUsersExamplePayload = {
  data: {
    results: [
      {
        id: "usr_01H5K8N2X3Y4Z5A6B7C8D9E0F1",
        created_at: "2023-03-15T10:00:00Z",
        updated_at: "2024-01-15T14:30:00Z",
        active: true,
        username: "john.smith@acmecorp.com",
        display_name: "John Smith",
        name: {
          formatted: "John Smith",
          family_name: "Smith",
          given_name: "John",
          middle_name: null,
          honorific_prefix: null,
          honorific_suffix: null,
        },
        emails: [
          {
            value: "john.smith@acmecorp.com",
            type: "WORK",
            display: "john.smith@acmecorp.com",
          },
        ],
        phone_numbers: [
          {
            value: "+1-555-987-6543",
            type: "WORK",
          },
        ],
        addresses: [
          {
            type: "HOME",
            formatted: "456 Oak Avenue, San Jose, CA 95112, US",
            street_address: "456 Oak Avenue",
            locality: "San Jose",
            region: "CA",
            postal_code: "95112",
            country: "US",
          },
        ],
        preferred_language: "en-US",
        locale: "en-US",
        timezone: "America/Los_Angeles",
        number: "1001",
      },
    ],
    next_link: null,
  },
};

export const getUserExamplePayload = {
  data: {
    id: "usr_01H5K8N2X3Y4Z5A6B7C8D9E0F1",
    created_at: "2023-03-15T10:00:00Z",
    updated_at: "2024-01-15T14:30:00Z",
    active: true,
    username: "john.smith@acmecorp.com",
    display_name: "John Smith",
    name: {
      formatted: "John Smith",
      family_name: "Smith",
      given_name: "John",
    },
    emails: [
      {
        value: "john.smith@acmecorp.com",
        type: "WORK",
      },
    ],
    preferred_language: "en-US",
    timezone: "America/Los_Angeles",
  },
};


export const listDepartmentsV2ExamplePayload = {
  data: {
    results: [
      {
        id: "dept_01H5K8N2X3Y4Z5A6B7C8D9E0F1",
        created_at: "2023-01-01T00:00:00Z",
        updated_at: "2024-01-10T08:00:00Z",
        name: "Engineering",
        parent_id: null,
        reference_code: "ENG-001",
        department_hierarchy_id: ["dept_01H5K8N2X3Y4Z5A6B7C8D9E0F1"],
      },
      {
        id: "dept_02H5K8N2X3Y4Z5A6B7C8D9E0F2",
        created_at: "2023-01-01T00:00:00Z",
        updated_at: "2024-01-10T08:00:00Z",
        name: "Backend Engineering",
        parent_id: "dept_01H5K8N2X3Y4Z5A6B7C8D9E0F1",
        reference_code: "ENG-002",
        department_hierarchy_id: [
          "dept_01H5K8N2X3Y4Z5A6B7C8D9E0F1",
          "dept_02H5K8N2X3Y4Z5A6B7C8D9E0F2",
        ],
      },
    ],
    next_link: null,
  },
};

export const getDepartmentExamplePayload = {
  data: {
    id: "dept_01H5K8N2X3Y4Z5A6B7C8D9E0F1",
    created_at: "2023-01-01T00:00:00Z",
    updated_at: "2024-01-10T08:00:00Z",
    name: "Engineering",
    parent_id: null,
    reference_code: "ENG-001",
    department_hierarchy_id: ["dept_01H5K8N2X3Y4Z5A6B7C8D9E0F1"],
  },
};


export const listTeamsV2ExamplePayload = {
  data: {
    results: [
      {
        id: "team_01H5K8N2X3Y4Z5A6B7C8D9E0F1",
        created_at: "2023-02-15T09:00:00Z",
        updated_at: "2024-01-12T11:00:00Z",
        name: "Platform Team",
        parent_id: null,
      },
      {
        id: "team_02H5K8N2X3Y4Z5A6B7C8D9E0F2",
        created_at: "2023-02-15T09:00:00Z",
        updated_at: "2024-01-12T11:00:00Z",
        name: "API Team",
        parent_id: "team_01H5K8N2X3Y4Z5A6B7C8D9E0F1",
      },
    ],
    next_link: null,
  },
};

export const getTeamExamplePayload = {
  data: {
    id: "team_01H5K8N2X3Y4Z5A6B7C8D9E0F1",
    created_at: "2023-02-15T09:00:00Z",
    updated_at: "2024-01-12T11:00:00Z",
    name: "Platform Team",
    parent_id: null,
  },
};


export const listWorkLocationsV2ExamplePayload = {
  data: {
    results: [
      {
        id: "wl_01H5K8N2X3Y4Z5A6B7C8D9E0F1",
        created_at: "2023-01-01T00:00:00Z",
        updated_at: "2024-01-05T10:00:00Z",
        name: "San Francisco HQ",
        address: {
          type: "WORK",
          formatted: "123 Main Street, San Francisco, CA 94105, US",
          street_address: "123 Main Street",
          locality: "San Francisco",
          region: "CA",
          postal_code: "94105",
          country: "US",
        },
      },
    ],
    next_link: null,
  },
};

export const getWorkLocationExamplePayload = {
  data: {
    id: "wl_01H5K8N2X3Y4Z5A6B7C8D9E0F1",
    created_at: "2023-01-01T00:00:00Z",
    updated_at: "2024-01-05T10:00:00Z",
    name: "San Francisco HQ",
    address: {
      type: "WORK",
      formatted: "123 Main Street, San Francisco, CA 94105, US",
      street_address: "123 Main Street",
      locality: "San Francisco",
      region: "CA",
      postal_code: "94105",
      country: "US",
    },
  },
};


export const listEmploymentTypesExamplePayload = {
  data: {
    results: [
      {
        id: "et_01H5K8N2X3Y4Z5A6B7C8D9E0F1",
        created_at: "2023-01-01T00:00:00Z",
        updated_at: "2023-01-01T00:00:00Z",
        label: "Full-Time Employee",
        name: "FULL_TIME",
        type: "EMPLOYEE",
        compensation_time_period: "SALARIED",
        amount_worked: "FULL-TIME",
      },
      {
        id: "et_02H5K8N2X3Y4Z5A6B7C8D9E0F2",
        created_at: "2023-01-01T00:00:00Z",
        updated_at: "2023-01-01T00:00:00Z",
        label: "Part-Time Employee",
        name: "PART_TIME",
        type: "EMPLOYEE",
        compensation_time_period: "HOURLY",
        amount_worked: "PART-TIME",
      },
      {
        id: "et_03H5K8N2X3Y4Z5A6B7C8D9E0F3",
        created_at: "2023-01-01T00:00:00Z",
        updated_at: "2023-01-01T00:00:00Z",
        label: "Contractor",
        name: "CONTRACTOR",
        type: "CONTRACTOR",
        compensation_time_period: "HOURLY",
        amount_worked: "FULL-TIME",
      },
    ],
    next_link: null,
  },
};

export const getEmploymentTypeExamplePayload = {
  data: {
    id: "et_01H5K8N2X3Y4Z5A6B7C8D9E0F1",
    created_at: "2023-01-01T00:00:00Z",
    updated_at: "2023-01-01T00:00:00Z",
    label: "Full-Time Employee",
    name: "FULL_TIME",
    type: "EMPLOYEE",
    compensation_time_period: "SALARIED",
    amount_worked: "FULL-TIME",
  },
};


export const listCustomFieldsV2ExamplePayload = {
  data: {
    results: [
      {
        id: "cf_01H5K8N2X3Y4Z5A6B7C8D9E0F1",
        created_at: "2023-05-01T00:00:00Z",
        updated_at: "2023-05-01T00:00:00Z",
        name: "Employee Badge Number",
        description: "Unique badge number for building access",
        required: false,
        type: "TEXT",
      },
      {
        id: "cf_02H5K8N2X3Y4Z5A6B7C8D9E0F2",
        created_at: "2023-05-01T00:00:00Z",
        updated_at: "2023-05-01T00:00:00Z",
        name: "Certification Date",
        description: "Date of professional certification",
        required: false,
        type: "DATE",
      },
    ],
    next_link: null,
  },
};


export const listCustomObjectsExamplePayload = {
  data: {
    results: [
      {
        id: "co_01H5K8N2X3Y4Z5A6B7C8D9E0F1",
        created_at: "2023-08-01T00:00:00Z",
        updated_at: "2024-01-10T00:00:00Z",
        name: "Equipment Assignment",
        description: "Track equipment assigned to employees",
        api_name: "equipment_assignment",
        category: "IT",
        plural_label: "Equipment Assignments",
      },
    ],
    next_link: null,
  },
};

export const getCustomObjectExamplePayload = {
  data: {
    id: "co_01H5K8N2X3Y4Z5A6B7C8D9E0F1",
    created_at: "2023-08-01T00:00:00Z",
    updated_at: "2024-01-10T00:00:00Z",
    name: "Equipment Assignment",
    description: "Track equipment assigned to employees",
    api_name: "equipment_assignment",
    category: "IT",
    plural_label: "Equipment Assignments",
  },
};

export const createCustomObjectExamplePayload = {
  data: {
    id: "co_02H5K8N2X3Y4Z5A6B7C8D9E0F2",
    created_at: "2024-01-15T00:00:00Z",
    updated_at: "2024-01-15T00:00:00Z",
    name: "Training Record",
    description: "Employee training and certification records",
    api_name: "training_record",
    category: "HR",
    plural_label: "Training Records",
  },
};

export const updateCustomObjectExamplePayload = {
  data: {
    id: "co_01H5K8N2X3Y4Z5A6B7C8D9E0F1",
    created_at: "2023-08-01T00:00:00Z",
    updated_at: "2024-01-15T12:00:00Z",
    name: "Equipment Assignment Updated",
    description: "Track equipment assigned to employees - updated",
    api_name: "equipment_assignment",
    category: "IT",
    plural_label: "Equipment Assignments",
  },
};

export const deleteCustomObjectExamplePayload = {
  data: {
    success: true,
    message: "Custom object equipment_assignment deleted successfully.",
  },
};


export const listObjectCategoriesExamplePayload = {
  data: {
    results: [
      {
        id: "oc_01H5K8N2X3Y4Z5A6B7C8D9E0F1",
        name: "HR",
        description: "Human Resources related objects",
      },
      {
        id: "oc_02H5K8N2X3Y4Z5A6B7C8D9E0F2",
        name: "IT",
        description: "Information Technology related objects",
      },
    ],
    next_link: null,
  },
};

export const getObjectCategoryExamplePayload = {
  data: {
    id: "oc_01H5K8N2X3Y4Z5A6B7C8D9E0F1",
    name: "HR",
    description: "Human Resources related objects",
  },
};

export const createObjectCategoryExamplePayload = {
  data: {
    id: "oc_03H5K8N2X3Y4Z5A6B7C8D9E0F3",
    name: "Finance",
    description: "Finance department objects",
  },
};

export const updateObjectCategoryExamplePayload = {
  data: {
    id: "oc_01H5K8N2X3Y4Z5A6B7C8D9E0F1",
    name: "Human Resources",
    description: "Human Resources related objects - updated",
  },
};

export const deleteObjectCategoryExamplePayload = {
  data: {
    success: true,
    message:
      "Object category oc_01H5K8N2X3Y4Z5A6B7C8D9E0F1 deleted successfully.",
  },
};


export const listEntitlementsExamplePayload = {
  data: {
    results: [
      {
        id: "ent_01H5K8N2X3Y4Z5A6B7C8D9E0F1",
        name: "API_Tier_1",
        description: "Access to Tier 1 API endpoints",
      },
      {
        id: "ent_02H5K8N2X3Y4Z5A6B7C8D9E0F2",
        name: "Time_And_Attendance_API",
        description: "Access to Time and Attendance API endpoints",
      },
    ],
    next_link: null,
  },
};


export const listJobFunctionsExamplePayload = {
  data: {
    results: [
      {
        id: "jf_01H5K8N2X3Y4Z5A6B7C8D9E0F1",
        created_at: "2023-01-01T00:00:00Z",
        updated_at: "2023-01-01T00:00:00Z",
        name: "Software Engineering",
      },
      {
        id: "jf_02H5K8N2X3Y4Z5A6B7C8D9E0F2",
        created_at: "2023-01-01T00:00:00Z",
        updated_at: "2023-01-01T00:00:00Z",
        name: "Product Management",
      },
    ],
    next_link: null,
  },
};

export const getJobFunctionExamplePayload = {
  data: {
    id: "jf_01H5K8N2X3Y4Z5A6B7C8D9E0F1",
    created_at: "2023-01-01T00:00:00Z",
    updated_at: "2023-01-01T00:00:00Z",
    name: "Software Engineering",
  },
};


export const listSupergroupsExamplePayload = {
  data: {
    results: [
      {
        id: "sg_01H5K8N2X3Y4Z5A6B7C8D9E0F1",
        created_at: "2023-04-01T00:00:00Z",
        updated_at: "2024-01-10T00:00:00Z",
        name: "All Employees",
        type: "DYNAMIC",
      },
    ],
    next_link: null,
  },
};

export const getSupergroupExamplePayload = {
  data: {
    id: "sg_01H5K8N2X3Y4Z5A6B7C8D9E0F1",
    created_at: "2023-04-01T00:00:00Z",
    updated_at: "2024-01-10T00:00:00Z",
    name: "All Employees",
    type: "DYNAMIC",
  },
};


export const getSsoMeExamplePayload = {
  data: {
    id: "usr_01H5K8N2X3Y4Z5A6B7C8D9E0F1",
    email: "john.smith@acmecorp.com",
    name: "John Smith",
    company_id: "cmp_01H5K8N2X3Y4Z5A6B7C8D9E0F1",
    worker_id: "wkr_01H5K8N2X3Y4Z5A6B7C8D9E0F1",
  },
};






export const getCompaniesExamplePayload = {
  data: {
    id: "5f8a7b6c5d4e3f2a1b0c9d8e",
    name: "Acme Corporation",
    ein: "12-3456789",
    address: {
      street: "123 Main Street",
      city: "San Francisco",
      state: "CA",
      zip: "94105",
      country: "US",
    },
    phone: "+1-555-123-4567",
  },
};


export const getEmployeesExamplePayload = {
  data: [
    {
      id: "5f8a7b6c5d4e3f2a1b0c9d8e",
      firstName: "John",
      lastName: "Smith",
      email: "john.smith@acmecorp.com",
      personalEmail: "john.smith@gmail.com",
      phoneNumber: "+1-555-987-6543",
      employmentType: "FULL_TIME",
      department: "Engineering",
      title: "Senior Software Engineer",
      startDate: "2023-03-15",
      endDate: null,
      status: "ACTIVE",
      manager: "5f8a7b6c5d4e3f2a1b0c9d8f",
      workLocation: "San Francisco HQ",
    },
  ],
};

export const getEmployeesEmployeeIdExamplePayload = {
  data: {
    id: "5f8a7b6c5d4e3f2a1b0c9d8e",
    firstName: "John",
    lastName: "Smith",
    email: "john.smith@acmecorp.com",
    personalEmail: "john.smith@gmail.com",
    phoneNumber: "+1-555-987-6543",
    employmentType: "FULL_TIME",
    department: "Engineering",
    title: "Senior Software Engineer",
    startDate: "2023-03-15",
    endDate: null,
    status: "ACTIVE",
    manager: "5f8a7b6c5d4e3f2a1b0c9d8f",
    workLocation: "San Francisco HQ",
    ssn: "***-**-1234",
    dateOfBirth: "1985-07-22",
    address: {
      street: "456 Oak Avenue",
      city: "San Jose",
      state: "CA",
      zip: "95112",
      country: "US",
    },
  },
};

export const getEmployeesIncludeTerminatedExamplePayload = {
  data: [
    {
      id: "5f8a7b6c5d4e3f2a1b0c9d8e",
      firstName: "John",
      lastName: "Smith",
      email: "john.smith@acmecorp.com",
      status: "ACTIVE",
    },
    {
      id: "5f8a7b6c5d4e3f2a1b0c9d8f",
      firstName: "Jane",
      lastName: "Doe",
      email: "jane.doe@acmecorp.com",
      status: "TERMINATED",
      endDate: "2023-12-31",
    },
  ],
};


export const getDepartmentsExamplePayload = {
  data: [
    {
      id: "5f8a7b6c5d4e3f2a1b0c9d8e",
      name: "Engineering",
      parent: null,
    },
    {
      id: "5f8a7b6c5d4e3f2a1b0c9d8f",
      name: "Backend Engineering",
      parent: "5f8a7b6c5d4e3f2a1b0c9d8e",
    },
  ],
};


export const getTeamsExamplePayload = {
  data: [
    {
      id: "5f8a7b6c5d4e3f2a1b0c9d8e",
      name: "Platform Team",
      parent: null,
    },
    {
      id: "5f8a7b6c5d4e3f2a1b0c9d8f",
      name: "API Team",
      parent: "5f8a7b6c5d4e3f2a1b0c9d8e",
    },
  ],
};


export const getWorkLocationsExamplePayload = {
  data: [
    {
      id: "5f8a7b6c5d4e3f2a1b0c9d8e",
      name: "San Francisco HQ",
      address: {
        street: "123 Main Street",
        city: "San Francisco",
        state: "CA",
        zip: "94105",
        country: "US",
      },
    },
  ],
};


export const getCustomFieldsExamplePayload = {
  data: [
    {
      id: "5f8a7b6c5d4e3f2a1b0c9d8e",
      name: "Employee Badge Number",
      type: "TEXT",
      required: false,
    },
    {
      id: "5f8a7b6c5d4e3f2a1b0c9d8f",
      name: "Certification Date",
      type: "DATE",
      required: false,
    },
  ],
};


export const getLevelsExamplePayload = {
  data: [
    {
      id: "5f8a7b6c5d4e3f2a1b0c9d8e",
      name: "L1 - Entry Level",
      rank: 1,
    },
    {
      id: "5f8a7b6c5d4e3f2a1b0c9d8f",
      name: "L2 - Junior",
      rank: 2,
    },
    {
      id: "5f8a7b6c5d4e3f2a1b0c9d90",
      name: "L3 - Mid-Level",
      rank: 3,
    },
    {
      id: "5f8a7b6c5d4e3f2a1b0c9d91",
      name: "L4 - Senior",
      rank: 4,
    },
  ],
};


export const getMeExamplePayload = {
  data: {
    id: "5f8a7b6c5d4e3f2a1b0c9d8e",
    email: "john.smith@acmecorp.com",
    firstName: "John",
    lastName: "Smith",
    role: "ADMIN",
    companyId: "5f8a7b6c5d4e3f2a1b0c9d8f",
  },
};


export const getGroupsExamplePayload = {
  data: [
    {
      id: "5f8a7b6c5d4e3f2a1b0c9d8e",
      name: "Engineering Group",
      spokeId: "spoke_123",
      users: ["usr_001", "usr_002", "usr_003"],
      version: 1,
    },
  ],
};

export const postGroupsExamplePayload = {
  data: {
    id: "5f8a7b6c5d4e3f2a1b0c9d8f",
    name: "New Engineering Group",
    spokeId: "spoke_456",
    users: ["usr_001"],
    version: 1,
  },
};

export const putGroupsGroupIdExamplePayload = {
  data: {
    id: "5f8a7b6c5d4e3f2a1b0c9d8e",
    name: "Updated Engineering Group",
    spokeId: "spoke_123",
    users: ["usr_001", "usr_002", "usr_003", "usr_004"],
    version: 2,
  },
};

export const patchGroupsGroupIdExamplePayload = {
  data: {
    id: "5f8a7b6c5d4e3f2a1b0c9d8e",
    name: "Patched Engineering Group",
    spokeId: "spoke_123",
    users: ["usr_001", "usr_002"],
    version: 3,
  },
};

export const deleteGroupsGroupIdExamplePayload = {
  data: null,
};


export const getLeaveRequestsExamplePayload = {
  data: [
    {
      id: "5f8a7b6c5d4e3f2a1b0c9d8e",
      requestedBy: "5f8a7b6c5d4e3f2a1b0c9d8f",
      status: "PENDING",
      startDate: "2024-02-01",
      endDate: "2024-02-05",
      leavePolicy: "PTO",
      reason: "Family vacation",
      processedBy: null,
    },
  ],
};

export const processLeaveRequestsExamplePayload = {
  data: {
    id: "5f8a7b6c5d4e3f2a1b0c9d8e",
    requestedBy: "5f8a7b6c5d4e3f2a1b0c9d8f",
    status: "APPROVED",
    startDate: "2024-02-01",
    endDate: "2024-02-05",
    leavePolicy: "PTO",
    reason: "Family vacation",
    processedBy: "5f8a7b6c5d4e3f2a1b0c9d90",
  },
};


export const getSamlIdpMetadataExamplePayload = {
  data: {
    entityId: "https://app.rippling.com/saml/metadata",
    ssoUrl: "https://app.rippling.com/saml/sso",
    certificate:
      "-----BEGIN CERTIFICATE-----\nMIIC...\n-----END CERTIFICATE-----",
  },
};


export const postAtsCandidatesPushCandidateExamplePayload = {
  data: {
    id: "5f8a7b6c5d4e3f2a1b0c9d8e",
    candidateId: "candidate_ext_001",
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    phoneNumber: "+1-555-234-5678",
    jobTitle: "Software Engineer",
    startDate: "2024-03-01",
    department: "Engineering",
    salaryUnit: "YEAR",
    salaryPerUnit: 120000,
    currency: "USD",
    employmentType: "FULL_TIME",
    status: "CREATED",
  },
};


export const getCompanyActivityExamplePayload = {
  data: {
    data: {
      events: [
        {
          id: "5ed7052182a6a429a4af3fb9",
          request_data: null,
          linked_events: [],
          subjects: [
            {
              instance: "5c6324b602bf9a760b7a4329",
              type: "GROUP",
              display_name: "Everyone",
              icon: null,
            },
            {
              instance: "5c6324b502bf9a760b7a4318",
              type: "SPOKE_USER",
              display_name: "apps+test@rippling.com",
              icon: null,
            },
          ],
          event_type: "EXTERNAL_GROUP_MEMBER_REMOVE",
          timestamp: "2024-01-15T10:30:00Z",
          company: "595f75ffd2a5f80ae22ce88e",
          spoke: "5c63187a3698be3692ce328f",
          owner: "5c63232bc5929135ddadbfab",
          initiator: {
            type: "EXTERNAL",
            role: null,
            display_name: "External",
            icon: null,
          },
          event_reason: {
            reason: "CHANGE_SYNCED_FROM_EXTERNAL_APP",
            message: "Activity emanated from External App",
          },
          name: "Account removed from group",
        },
      ],
      next: "5f4d9d82f6c26e0a83aa6ea8",
    },
    error: null,
  },
};


export const postMarkAppInstalledExamplePayload = {
  data: {
    ok: true,
  },
};


export const rawRequestExamplePayload = {
  data: {
    message: "Raw request completed successfully",
  },
};

export const rawRequestV2ExamplePayload = {
  data: {
    message: "Raw request to V2 API completed successfully",
  },
};
