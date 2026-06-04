





export const getInvoiceExamplePayload = {
  data: {
    id: "in_1MtHbELkdIwHu7ixl4OzzPMv",
    object: "invoice",
    account_country: "US",
    account_name: "Acme Corporation",
    account_tax_ids: null,
    amount_due: 5000,
    amount_paid: 0,
    amount_remaining: 5000,
    amount_shipping: 0,
    application: null,
    application_fee_amount: null,
    attempt_count: 0,
    attempted: false,
    auto_advance: false,
    automatic_tax: {
      enabled: false,
      liability: null,
      status: null,
    },
    billing_reason: "manual",
    charge: null,
    collection_method: "charge_automatically",
    created: 1716397800,
    currency: "usd",
    custom_fields: null,
    customer: "cus_NffrFeUfNV2Hib",
    customer_address: null,
    customer_email: "jenny.rosen@example.com",
    customer_name: "Jenny Rosen",
    customer_phone: null,
    customer_shipping: null,
    customer_tax_exempt: "none",
    customer_tax_ids: [],
    default_payment_method: null,
    default_source: null,
    default_tax_rates: [],
    description: "Monthly subscription invoice",
    discount: null,
    discounts: [],
    due_date: null,
    effective_at: null,
    ending_balance: null,
    footer: null,
    from_invoice: null,
    hosted_invoice_url: null,
    invoice_pdf: null,
    last_finalization_error: null,
    latest_revision: null,
    lines: {
      object: "list",
      data: [],
      has_more: false,
      url: "/v1/invoices/in_1MtHbELkdIwHu7ixl4OzzPMv/lines",
    },
    livemode: false,
    metadata: {},
    next_payment_attempt: null,
    number: null,
    on_behalf_of: null,
    paid: false,
    paid_out_of_band: false,
    payment_intent: null,
    payment_settings: {
      default_mandate: null,
      payment_method_options: null,
      payment_method_types: null,
    },
    period_end: 1716397800,
    period_start: 1716397800,
    post_payment_credit_notes_amount: 0,
    pre_payment_credit_notes_amount: 0,
    quote: null,
    receipt_number: null,
    rendering_options: null,
    shipping_cost: null,
    shipping_details: null,
    starting_balance: 0,
    statement_descriptor: null,
    status: "draft",
    status_transitions: {
      finalized_at: null,
      marked_uncollectible_at: null,
      paid_at: null,
      voided_at: null,
    },
    subscription: null,
    subtotal: 5000,
    subtotal_excluding_tax: 5000,
    tax: null,
    test_clock: null,
    total: 5000,
    total_discount_amounts: [],
    total_excluding_tax: 5000,
    total_tax_amounts: [],
    transfer_data: null,
    webhooks_delivered_at: null,
  } as unknown,
};




export const createInvoiceExamplePayload = getInvoiceExamplePayload;




export const updateInvoiceExamplePayload = getInvoiceExamplePayload;






export const deleteInvoiceExamplePayload = {
  data: {
    id: "in_1MtHbELkdIwHu7ixl4OzzPMv",
    object: "invoice",
    deleted: true,
  } as unknown,
};






export const listInvoicesExamplePayload = {
  data: {
    object: "list",
    data: [getInvoiceExamplePayload.data],
    has_more: false,
    url: "/v1/invoices",
  } as unknown,
};
