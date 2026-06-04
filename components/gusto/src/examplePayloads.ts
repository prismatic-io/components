














const companyPayload = {
  uuid: "c7a07c73-a703-4462-9343-1b181182b6e0",
  name: "Shoppe Studios LLC",
  trade_name: "Record Shoppe",
  is_partner_managed: true,
  tier: "complete",
  locations: [
    {
      street_1: "412 Kiera Stravenue",
      street_2: "Suite 391",
      city: "San Francisco",
      state: "CA",
      zip: "94107",
      country: "USA",
      active: true,
    },
    {
      street_1: "644 Fay Vista",
      street_2: "Suite 842",
      city: "Richmond",
      state: "VA",
      zip: "23218",
      country: "USA",
      active: true,
    },
  ],
  ein: "00-0000001",
  entity_type: "C-Corporation",
  pay_schedule_type: "by_department",
  join_date: "2024-01-15",
  funding_type: "ach",
  slug: "shoppe-studios-llc",
  is_suspended: false,
  company_status: "Approved",
  is_high_risk_business: false,
  is_marijuana_business: false,
  contractor_only: false,
  compensations: {
    hourly: [
      {
        uuid: "7da6b57d-22f9-11f1-ad28-0242ac100003",
        name: "Overtime",
        multiple: 1.5,
      },
      {
        uuid: "7da6b5ec-22f9-11f1-ad28-0242ac100003",
        name: "Double overtime",
        multiple: 2,
      },
      {
        uuid: "7da6b22f-22f9-11f1-ad28-0242ac100003",
        name: "Regular",
        multiple: 1,
      },
      {
        uuid: "7da6b3ac-22f9-11f1-ad28-0242ac100003",
        name: "Outstanding vacation",
        multiple: 1,
      },
      {
        uuid: "7da6b532-22f9-11f1-ad28-0242ac100003",
        name: "Holiday",
        multiple: 1,
      },
      {
        uuid: "7da6b44e-22f9-11f1-ad28-0242ac100003",
        name: "Emergency sick - self care",
        multiple: 1,
      },
      {
        uuid: "7da6b49d-22f9-11f1-ad28-0242ac100003",
        name: "Emergency sick - caring for others",
        multiple: 1,
      },
      {
        uuid: "7da6b4e6-22f9-11f1-ad28-0242ac100003",
        name: "FMLA Public Health Emergency Leave",
        multiple: 1,
      },
    ],
    fixed: [
      {
        uuid: "7da68d82-22f9-11f1-ad28-0242ac100003",
        name: "Bonus",
      },
      {
        uuid: "7da69024-22f9-11f1-ad28-0242ac100003",
        name: "Commission",
      },
      {
        uuid: "7da69104-22f9-11f1-ad28-0242ac100003",
        name: "Paycheck Tips",
      },
      {
        uuid: "7da6918f-22f9-11f1-ad28-0242ac100003",
        name: "Cash Tips",
      },
      {
        uuid: "7da69216-22f9-11f1-ad28-0242ac100003",
        name: "Correction Payment",
      },
      {
        uuid: "7da692a6-22f9-11f1-ad28-0242ac100003",
        name: "Severance",
      },
      {
        uuid: "7da69356-22f9-11f1-ad28-0242ac100003",
        name: "Minimum Wage Adjustment",
      },
      {
        uuid: null,
        name: "Reimbursement",
      },
    ],
    paid_time_off: [
      {
        uuid: "7dcdcb77-22f9-11f1-ad28-0242ac100003",
        name: "Vacation Hours",
      },
      {
        uuid: "7dcdcc8b-22f9-11f1-ad28-0242ac100003",
        name: "Sick Hours",
      },
      {
        uuid: null,
        name: "Holiday Hours",
      },
    ],
  },
  primary_signatory: {
    uuid: "2d7cd96f-e2fb-4db7-8c04-99ef531b4527",
    first_name: "Alda",
    middle_initial: "",
    last_name: "Carter",
    phone: "4160000000",
    email: "louie.hessel7757869450111547@zemlak.biz",
    home_address: {
      street_1: "524 Roob Divide",
      street_2: "Suite 565",
      city: "San Francisco",
      state: "CA",
      zip: "94107",
      country: "USA",
    },
  },
  primary_payroll_admin: {
    first_name: "Ian",
    last_name: "Labadie",
    phone: "1-565-710-7559",
    email: "louie.hessel7757869450111547@zemlak.biz",
  },
};






export const listCompaniesExamplePayload = {
  data: { data: [companyPayload], headers: {} },
};






export const getCompanyExamplePayload = {
  data: { data: companyPayload, headers: {} },
};






export const listCompanyAdminsExamplePayload = {
  data: {
    data: [
      {
        uuid: "987058cc-23ee-46e9-81ef-5cee086cceca",
        first_name: "John",
        last_name: "Smith",
        email: "jsmith99@gmail.com",
        phone: "8009360383",
      },
    ],
    headers: {},
  },
};








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
  data: { data: employeePayload, headers: {} },
};








const paySchedulePayload = {
  uuid: "f2a69c38-e2f9-4e31-b5c5-4754fc60a052",
  version: "68934a3e9455fa72420237eb05902327",
  frequency: "Monthly",
  anchor_pay_date: "2022-12-11",
  anchor_end_of_pay_period: "2022-11-13",
  day_1: 11,
  day_2: null,
  name: null,
  custom_name: "every 11th of the month",
  auto_pilot: true,
  active: true,
  auto_payroll_enablement_blockers: null,
};






export const listPaySchedulesExamplePayload = {
  data: { data: [paySchedulePayload], headers: {} },
};






export const getPayScheduleExamplePayload = {
  data: { data: [paySchedulePayload], headers: {} },
};








export const terminateEmployeeExamplePayload = {
  data: {
    data: {
      uuid: "f8a034b0-91e3-4976-b762-3f8a1d47c950",
      employee_uuid: "9779767c-6044-48e0-bf68-aeb370b9a2e7",
      active: true,
      effective_date: "2024-03-15",
      run_termination_payroll: false,
    },
    headers: {},
  },
};








const webhookSubscriptionPayload = {
  uuid: "c5fdae57-5483-4529-9aae-f0edceed92d4",
  url: "https://partner-app.com/subscriber",
  status: "verified",
  subscription_types: [
    "BankAccount",
    "Company",
    "CompanyBenefit",
    "Contractor",
    "ContractorPayment",
    "Employee",
    "EmployeeBenefit",
    "EmployeeJobCompensation",
    "ExternalPayroll",
    "Form",
    "Location",
    "Notification",
    "Payroll",
    "PayrollSync",
    "PaySchedule",
    "Signatory",
  ],
};






export const listWebhookSubscriptionsExamplePayload = {
  data: { data: [webhookSubscriptionPayload], headers: {} },
};






export const getWebhookSubscriptionExamplePayload = {
  data: { data: webhookSubscriptionPayload, headers: {} },
};






export const createWebhookSubscriptionExamplePayload = {
  data: { data: webhookSubscriptionPayload, headers: {} },
};






export const updateWebhookSubscriptionExamplePayload = {
  data: { data: webhookSubscriptionPayload, headers: {} },
};






export const deleteWebhookSubscriptionExamplePayload = {
  data: { message: "The resource was deleted successfully." },
};








export const getWebhookEventsExamplePayload = {
  data: {
    data: [
      {
        uuid: "f7397a24-57ad-4fae-b011-d258e8232900",
        event_type: "employee.created",
        resource_type: "Company",
        resource_uuid: "92a20431-9489-4bde-ad27-6feb20b969d5",
        entity_type: "Employee",
        entity_uuid: "92a20431-9489-4bde-ad27-6feb20b969d5",
        timestamp: 1686784995,
      },
    ],
    headers: {},
  },
};
