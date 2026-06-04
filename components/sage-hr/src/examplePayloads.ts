







export const listEmployeesExamplePayload = {
  data: {
    data: [
      {
        id: 19,
        email: "john@example.com",
        first_name: "John",
        last_name: "Doe",
        picture_url: "https://example.com/john.png",
        employment_start_date: "2014-08-25",
        date_of_birth: "1991-02-13",
        team: "Sage HR",
        team_id: 1,
        position: "Api developer",
        position_id: 123,
        reports_to_employee_id: 5,
        work_phone: "555-0505",
        home_phone: "555-0506",
        mobile_phone: "555-0507",
        gender: "Male",
        street_first: "84 Glenwood Street",
        street_second: "Peoria",
        city: "London",
        post_code: 99999,
        country: "GB",
        employee_number: "A01",
        employment_status: "Full-time",
        nationality: "Spanish",
        marital_status: "Married",
        personal_identification_number: "1",
        tax_number: "1",
        team_history: [
          {
            team_id: 1,
            start_date: "2018-01-01",
            end_date: "201-01-01",
            team_name: "Some Team",
          },
        ],
        employment_status_history: [
          {
            employment_status_id: 1,
            start_date: "2018-01-01",
            end_date: "201-01-01",
            employment_statu_name: "Full time",
          },
        ],
        position_history: [
          {
            position_id: 1,
            start_date: "2018-01-01",
            end_date: "201-01-01",
            position_name: "Developer",
            position_code: "1234",
          },
        ],
      },
    ],
    meta: {
      current_page: 1,
      next_page: 2,
      previous_page: null,
      total_pages: 2,
      per_page: 50,
      total_entries: 75,
    },
  },
};

export const getEmployeeExamplePayload = {
  data: {
    data: {
      id: 19,
      email: "john@example.com",
      first_name: "John",
      last_name: "Doe",
      picture_url: "https://example.com/john.png",
      employment_start_date: "2014-08-25",
      date_of_birth: "1991-02-13",
      team: "Sage HR",
      team_id: 6742,
      position: "Api developer",
      position_id: 123,
      reports_to_employee_id: 5,
      work_phone: "555-0505",
      home_phone: "555-0506",
      mobile_phone: "555-0507",
      gender: "Male",
      street_first: "84 Glenwood Street",
      street_second: "Peoria",
      city: "London",
      post_code: 99999,
      country: "GB",
      employee_number: "A1",
      employment_status: "Full-time",
      nationality: "Spanish",
      marital_status: "Married",
      personal_identification_number: "1",
      tax_number: "1",
      team_history: [
        {
          team_id: 1,
          start_date: "2018-01-01",
          end_date: "201-01-01",
          team_name: "Some Team",
        },
      ],
      employment_status_history: [
        {
          employment_status_id: 1,
          start_date: "2018-01-01",
          end_date: "201-01-01",
          employment_statu_name: "Full time",
        },
      ],
      position_history: [
        {
          position_id: 1,
          start_date: "2018-01-01",
          end_date: "201-01-01",
          position_name: "Developer",
          position_code: "1234",
        },
      ],
    },
  },
};

export const createEmployeeExamplePayload = {
  data: {
    data: {
      id: 1,
    },
  },
};

export const updateEmployeeExamplePayload = {
  data: {
    data: {
      id: 1711,
    },
  },
};

export const terminateEmployeeExamplePayload = {
  data: {},
};

export const rehireEmployeeExamplePayload = {
  data: {},
};

export const listTerminatedEmployeesExamplePayload = {
  data: {
    data: [
      {
        id: 19,
        termination_date: "2015-05-28",
        employee_number: "123",
        email: "john@example.com",
        first_name: "John",
        last_name: "Doe",
        picture_url: "https://example.com/john.png",
        employment_start_date: "2014-08-25",
        date_of_birth: "1991-02-13",
        position: "Api developer",
        personal_identification_number: "1",
        tax_number: "1",
        team_history: [
          {
            team_id: 1,
            start_date: "2018-01-01",
            end_date: "201-01-01",
            team_name: "Some Team",
          },
        ],
        employment_status_history: [
          {
            employment_status_id: 1,
            start_date: "2018-01-01",
            end_date: "201-01-01",
            employment_statu_name: "Full time",
          },
        ],
        position_history: [
          {
            position_id: 1,
            start_date: "2018-01-01",
            end_date: "201-01-01",
            position_name: "Developer",
            position_code: "1234",
          },
        ],
      },
    ],
    meta: {
      current_page: 1,
      next_page: 2,
      previous_page: null,
      total_pages: 2,
      per_page: 50,
      total_entries: 75,
    },
  },
};

export const getTerminatedEmployeeExamplePayload = {
  data: {
    data: {
      id: 19,
      email: "john@example.com",
      first_name: "John",
      last_name: "Doe",
      picture_url: "https://example.com/john.png",
      employment_start_date: "2014-08-25",
      date_of_birth: "1991-02-13",
      position: "Api developer",
      position_id: 1234,
      reports_to_employee_id: 1000,
      work_phone: "867-5309",
      home_phone: "555-5555",
      mobile_phone: "555-1234",
      gender: "Male",
      street_first: "123 some Street",
      stree_second: "3A",
      city: "London",
      post_code: "E8 1LA",
      country: "GB",
      employee_number: 123,
      personal_identification_number: "1",
      tax_number: "1",
      termination_date: "2015-05-28",
      termination: {
        reason: "Moving location",
        comments: "Moving to",
      },
    },
  },
};

export const getEmployeeCompensationsExamplePayload = {
  data: {
    data: [
      {
        start_date: "2017-01-01",
        end_date: "2019-01-01",
        currency: "EUR",
        amount: 1234,
        period: "monthly",
        comment: "Starting salary",
        category: "Salary",
      },
    ],
    meta: {
      current_page: 1,
      next_page: 2,
      previous_page: null,
      total_pages: 2,
      per_page: 50,
      total_entries: 75,
    },
  },
};

export const getEmployeeCustomFieldsExamplePayload = {
  data: {
    data: [
      {
        id: 1,
        label: "Hobby",
        type: "CustomDropdownField",
        value: "Hockey",
        options: ["Hockey", "Football", "Voleyball"],
      },
      {
        id: 2,
        label: "Languages",
        type: "CustomTags",
        options: null,
        value: ["English", "Latvian", "Estonian"],
      },
    ],
  },
};

export const updateEmployeeCustomFieldExamplePayload = {
  data: {
    data: null,
  },
};





export const listPositionsExamplePayload = {
  data: {
    data: [
      {
        id: 19,
        title: "CFO",
        description: "...",
        code: "X2",
      },
      {
        id: 20,
        title: "CEO",
        description: null,
        code: null,
      },
    ],
    meta: {
      current_page: 1,
      next_page: 2,
      previous_page: null,
      total_pages: 2,
      per_page: 50,
      total_entries: 75,
    },
  },
};

export const listTeamsExamplePayload = {
  data: {
    data: [
      {
        id: 19,
        name: "Sales",
        manager_ids: [1, 2],
        employee_ids: [5, 7, 90],
      },
    ],
    meta: {
      current_page: 1,
      next_page: 2,
      previous_page: null,
      total_pages: 2,
      per_page: 50,
      total_entries: 75,
    },
  },
};





const documentPayload = {
  id: 18,
  document_category_id: 15,
  description: "",
  company_id: 5,
  file_name: "test_pdf.pdf",
  file_content_type: "application/pdf",
  file_size: 6193,
  file_updated_at: "2021-06-09T07:32:16.562-07:00",
  shared_with_direct_manager: false,
  shared_with_team_manager: true,
  created_by: 5,
  source: "web",
  created_at: "2021-06-09T14:32:20Z",
  updated_at: "2021-06-09T14:32:20Z",
  shared_with_everyone: false,
  last_edited_by: 5,
  document_template_pattern_id: null,
  acceptance_required: false,
  acceptance_deadline: null,
  file_scan_started_at: null,
  file_scan_result: "Pass",
  document_type: "",
  document_type_other: "",
  right_to_work_number: "",
  expiration_date: null,
  document_expires: false,
};

export const getDocumentExamplePayload = {
  data: {
    data: documentPayload,
  },
};

export const createDocumentExamplePayload = {
  data: {
    data: {
      id: 1,
    },
  },
};

export const deleteDocumentExamplePayload = {
  data: {
    data: {
      id: 1,
    },
  },
};

export const updateDocumentExamplePayload = {
  data: {
    data: documentPayload,
  },
};

export const listDocumentsExamplePayload = {
  data: {
    data: [
      {
        id: 18,
        document_category_id: 15,
        description: "",
        company_id: 5,
        file_name: "test_pdf.pdf",
        file_content_type: "application/pdf",
        file_size: 6193,
        file_updated_at: "2021-06-09T07:32:16.562-07:00",
        shared_with_team_manager: true,
        shared_with_direct_manager: false,
        created_by: 5,
        source: "web",
        created_at: "2021-06-09T14:32:20Z",
        updated_at: "2021-06-09T14:32:20Z",
        shared_with_everyone: false,
        last_edited_by: 5,
        document_template_pattern_id: null,
        acceptance_required: false,
        acceptance_deadline: null,
        file_scan_started_at: null,
        file_scan_result: "Pass",
        document_type: "",
        document_type_other: "",
        right_to_work_number: "",
        expiration_date: null,
        document_expires: false,
      },
      {
        id: 19,
        document_category_id: 15,
        description: "",
        company_id: 5,
        file_name: "test_pdf2.pdf",
        file_content_type: "application/pdf",
        file_size: 6193,
        file_updated_at: "2021-06-09T07:59:56.762-07:00",
        shared_with_managers: true,
        created_by: 5,
        source: "web",
        created_at: "2021-06-09T15:00:20Z",
        updated_at: "2021-06-09T15:00:20Z",
        shared_with_direct_manager: false,
        shared_with_team_manager: true,
        last_edited_by: 5,
        document_template_pattern_id: null,
        acceptance_required: false,
        acceptance_deadline: null,
        file_scan_started_at: null,
        file_scan_result: "Pass",
        document_type: "",
        document_type_other: "",
        right_to_work_number: "",
        expiration_date: null,
        document_expires: false,
      },
    ],
  },
};





export const createProjectExamplePayload = {
  data: {
    data: {
      id: 1,
    },
  },
};

export const updateProjectExamplePayload = {
  data: {
    data: {
      id: 1,
    },
  },
};

export const closeProjectExamplePayload = {
  data: {
    data: {
      id: 1,
    },
  },
};

export const createProjectsExamplePayload = {
  data: {
    data: {
      id: 1,
    },
  },
};

export const updateProjectsExamplePayload = {
  data: {
    data: {
      id: 1,
    },
  },
};





export const timeClockingInAndOutExamplePayload = {
  data: {
    errors: ["error 1", "error 2"],
  },
};





export const createTimeOffRequestsExamplePayload = {
  data: {
    data: {
      id: 1,
    },
  },
};

export const listTimeOffRequestsExamplePayload = {
  data: {
    data: [
      {
        id: 2902504,
        status: "Approved",
        status_code: "approved",
        policy_id: 1,
        employee_id: 1,
        replacement: {
          id: 2,
          full_name: "John Doe",
        },
        details: "Birthday lunch",
        is_multi_date: false,
        is_single_day: true,
        is_part_of_day: true,
        first_part_of_day: false,
        second_part_of_day: true,
        start_date: "2018-05-24",
        end_date: "2018-05-24",
        request_date: "2018-05-22",
        approval_date: null,
        hours: 3.5,
        fields: [
          {
            title: "Approved by manager?",
            answer: "yes",
          },
        ],
      },
    ],
    meta: {
      current_page: 1,
      next_page: 2,
      previous_page: null,
      total_pages: 2,
      per_page: 50,
      total_entries: 75,
    },
  },
};

export const listTimeOffBalancesExamplePayload = {
  data: {
    data: [
      {
        policy_id: 1,
        used: 5.6,
        available: 2,
      },
      {
        policy_id: 2,
        used: 75,
        available: null,
      },
    ],
  },
};





export const selectEmployeeExamplePayload = {
  result: [{ label: "John Doe", key: "19" }],
};

export const teamsExamplePayload = {
  result: [
    {
      label: "Sales",
      key: "19",
    },
  ],
};

export const selectDocumentExamplePayload = {
  result: [{ label: "test_pdf.pdf", key: "18" }],
};

export const projectsExamplePayload = {
  result: [
    {
      label: "Project Name.",
      key: "123",
    },
  ],
};

export const positionsExamplePayload = {
  result: [
    {
      label: "CFO",
      key: "19",
    },
  ],
};
