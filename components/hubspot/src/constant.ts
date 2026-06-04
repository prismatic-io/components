export const SEARCH_ENDPOINTS = [
  { label: "Companies", value: "/crm/v3/objects/companies/search" },
  { label: "Contacts", value: "/crm/v3/objects/contacts/search" },
  { label: "Custom objects", value: "/crm/v3/objects/{objectType}/search" },
  { label: "Deals", value: "/crm/v3/objects/deals/search" },
  {
    label: "Feedback submissions",
    value: "/crm/v3/objects/feedback_submissions/search",
  },
  { label: "Line items", value: "/crm/v3/objects/line_items/search" },
  { label: "Products", value: "/crm/v3/objects/products/search" },
  { label: "Quotes", value: "/crm/v3/objects/quotes/search" },
  { label: "Tickets", value: "/crm/v3/objects/tickets/search" },
  { label: "Calls", value: "/crm/v3/objects/calls/search" },
  { label: "Emails", value: "/crm/v3/objects/emails/search" },
  { label: "Meetings", value: "/crm/v3/objects/meetings/search" },
  { label: "Notes", value: "/crm/v3/objects/notes/search" },
  { label: "Tasks", value: "/crm/v3/objects/tasks/search" },
];

export const HUBSPOT_DATE_PROPERTIES = {
  "/crm/v3/objects/carts/search": {
    createdate: "createdate",
    hs_lastmodifieddate: "hs_lastmodifieddate",
  },
  "/crm/v3/objects/companies/search": {
    createdate: "createdate",
    hs_lastmodifieddate: "hs_lastmodifieddate",
  },
  "/crm/v3/objects/contacts/search": {
    createdate: "createdate",
    lastmodifieddate: "lastmodifieddate",
  },
  "/crm/v3/objects/deals/search": {
    createdate: "createdate",
    hs_lastmodifieddate: "hs_lastmodifieddate",
  },
  "/crm/v3/objects/deal_split/search": {
    hs_createdate: "hs_createdate",
    hs_lastmodifieddate: "hs_lastmodifieddate",
  },
  "/crm/v3/objects/discounts/search": {
    createdate: "createdate",
    hs_lastmodifieddate: "hs_lastmodifieddate",
  },
  "/crm/v3/objects/feedback_submissions/search": {
    hs_createdate: "hs_createdate",
    hs_lastmodifieddate: "hs_lastmodifieddate",
  },
  "/crm/v3/objects/fees/search": {
    createdate: "createdate",
    hs_lastmodifieddate: "hs_lastmodifieddate",
  },
  "/crm/v3/objects/invoices/search": {
    createdate: "createdate",
    hs_lastmodifieddate: "hs_lastmodifieddate",
  },
  "/crm/v3/objects/leads/search": {
    createdate: "createdate",
    hs_lastmodifieddate: "hs_lastmodifieddate",
  },
  "/crm/v3/objects/line_items/search": {
    createdate: "createdate",
    hs_lastmodifieddate: "hs_lastmodifieddate",
  },
  "/crm/v3/objects/orders/search": {
    createdate: "createdate",
    hs_lastmodifieddate: "hs_lastmodifieddate",
  },
  "/crm/v3/objects/commerce_payments/search": {
    createdate: "createdate",
    hs_lastmodifieddate: "hs_lastmodifieddate",
  },
  "/crm/v3/objects/products/search": {
    createdate: "createdate",
    hs_lastmodifieddate: "hs_lastmodifieddate",
  },
  "/crm/v3/objects/quotes/search": {
    hs_createdate: "hs_createdate",
    hs_lastmodifieddate: "hs_lastmodifieddate",
  },
  "/crm/v3/objects/subscriptions/search": {
    hs_createdate: "hs_createdate",
    hs_lastmodifieddate: "hs_lastmodifieddate",
  },
  "/crm/v3/objects/taxes/search": {
    createdate: "createdate",
    hs_lastmodifieddate: "hs_lastmodifieddate",
  },
  "/crm/v3/objects/tickets/search": {
    createdate: "createdate",
    hs_lastmodifieddate: "hs_lastmodifieddate",
  },
  "/crm/v3/objects/calls/search": {
    hs_createdate: "hs_createdate",
    hs_lastmodifieddate: "hs_lastmodifieddate",
  },
  "/crm/v3/objects/emails/search": {
    hs_createdate: "hs_createdate",
    hs_lastmodifieddate: "hs_lastmodifieddate",
  },
  "/crm/v3/objects/meetings/search": {
    hs_createdate: "hs_createdate",
    hs_lastmodifieddate: "hs_lastmodifieddate",
  },
  "/crm/v3/objects/notes/search": {
    hs_createdate: "hs_createdate",
    hs_lastmodifieddate: "hs_lastmodifieddate",
  },
  "/crm/v3/objects/tasks/search": {
    hs_createdate: "hs_createdate",
    hs_lastmodifieddate: "hs_lastmodifieddate",
  },
};
