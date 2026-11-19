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
