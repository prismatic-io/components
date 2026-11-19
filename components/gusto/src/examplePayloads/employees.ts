const employeePayload = {
  uuid: "d7282d99-ab6b-42f5-ba45-f4a670e886a8",
  first_name: "Boaty",
  middle_initial: null,
  last_name: "Koss",
  email: "keena.feest@kiehn.co.uk",
  company_uuid: "e904cc79-818a-4da8-9d37-0be0a86fdda8",
  manager_uuid: null,
  version: "a5cec1f1c0135feb3e76ca6ea3c46176",
  current_employment_status: "full_time",
  onboarding_status: "onboarding_completed",
  preferred_first_name: null,
  department_uuid: null,
  employee_code: "46f036",
  payment_method: "Direct Deposit",
  department: null,
  terminated: false,
  two_percent_shareholder: false,
  onboarded: true,
  historical: false,
  has_ssn: true,
  onboarding_documents_config: {
    uuid: null,
    i9_document: false,
  },
  jobs: [
    {
      uuid: "bc875f9d-adc5-40f6-99db-ed8470bda25f",
      version: "863bcd01c51fcfa2468d604cffec7413",
      employee_uuid: "d7282d99-ab6b-42f5-ba45-f4a670e886a8",
      current_compensation_uuid: "2ec164d0-808b-446c-8120-8cfb500945d0",
      payment_unit: "Year",
      primary: true,
      two_percent_shareholder: false,
      state_wc_covered: null,
      state_wc_class_code: null,
      title: "",
      compensations: [
        {
          uuid: "2ec164d0-808b-446c-8120-8cfb500945d0",
          employee_uuid: "d7282d99-ab6b-42f5-ba45-f4a670e886a8",
          version: "db7bfb49a4f0893432cb562311bfcad9",
          payment_unit: "Year",
          flsa_status: "Exempt",
          adjust_for_minimum_wage: false,
          minimum_wages: [],
          job_uuid: "bc875f9d-adc5-40f6-99db-ed8470bda25f",
          effective_date: "2025-06-09",
          rate: "80000.00",
        },
      ],
      rate: "80000.00",
      hire_date: "2024-06-09",
    },
  ],
  eligible_paid_time_off: [],
  terminations: [],
  garnishments: [],
  date_of_birth: "2005-06-09",
  ssn: "",
  phone: null,
  work_email: null,
  current_home_address: {
    street_1: "412 Kiera Stravenue",
    street_2: "Suite 391",
    city: "San Francisco",
    state: "CA",
    zip: "94107",
    country: "USA",
    active: true,
    uiud: "sample-uuid-123231",
  },
  all_home_addresses: [
    {
      street_1: "412 Kiera Stravenue",
      street_2: "Suite 391",
      city: "San Francisco",
      state: "CA",
      zip: "94107",
      country: "USA",
      active: true,
      uiud: "sample-uuid-123231",
    },
    {
      street_1: "123 Example Rd",
      street_2: null,
      city: "Example City",
      state: "EX",
      zip: "12345",
      country: "USA",
      active: false,
      uiud: "another-sample-uuid-456789",
    },
  ],
  member_portal_invitation_status: {
    status: "sent",
    token_expired: false,
    welcome_email_sent_at: "2024-01-15T14:30:00Z",
    last_password_resent_at: null,
  },
  partner_portal_invitation_sent: true,
};

export const listEmployeesExamplePayload = {
  data: { data: [employeePayload], headers: {} },
};

export const getEmployeeExamplePayload = {
  data: { data: employeePayload, headers: {} },
};

export const createEmployeeExamplePayload = {
  data: { data: employeePayload, headers: {} },
};

export const findEmployeeByEmailExamplePayload = {
  data: { data: employeePayload, headers: {} as Record<string, string> },
};
