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
