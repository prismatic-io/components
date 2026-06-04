





export const getSubscriptionExamplePayload = {
  data: {
    id: "sub_1MowQVLkdIwHu7ixeRlqHVzs",
    object: "subscription",
    application: null,
    application_fee_percent: null,
    automatic_tax: {
      enabled: false,
      liability: null,
    },
    billing_cycle_anchor: 1716397800,
    billing_thresholds: null,
    cancel_at: null,
    cancel_at_period_end: false,
    canceled_at: null,
    cancellation_details: {
      comment: null,
      feedback: null,
      reason: null,
    },
    collection_method: "charge_automatically",
    created: 1716397800,
    currency: "usd",
    current_period_end: 1719076200,
    current_period_start: 1716397800,
    customer: "cus_NffrFeUfNV2Hib",
    days_until_due: null,
    default_payment_method: null,
    default_source: null,
    default_tax_rates: [],
    description: null,
    discount: null,
    ended_at: null,
    invoice_settings: {
      account_tax_ids: null,
      issuer: {
        type: "self",
      },
    },
    items: {
      object: "list",
      data: [
        {
          id: "si_NcLYdDxLHxlFo7",
          object: "subscription_item",
          billing_thresholds: null,
          created: 1716397800,
          metadata: {},
          plan: {
            id: "price_1MoBy5LkdIwHu7ixZhnattbH",
            object: "plan",
            active: true,
            aggregate_usage: null,
            amount: 1000,
            amount_decimal: "1000",
            billing_scheme: "per_unit",
            created: 1716397800,
            currency: "usd",
            interval: "month",
            interval_count: 1,
            livemode: false,
            metadata: {},
            nickname: "Standard Monthly",
            product: "prod_NWjs8kKbJWmuuc",
            tiers_mode: null,
            transform_usage: null,
            trial_period_days: null,
            usage_type: "licensed",
          },
          price: {
            id: "price_1MoBy5LkdIwHu7ixZhnattbH",
            object: "price",
            active: true,
            billing_scheme: "per_unit",
            created: 1716397800,
            currency: "usd",
            custom_unit_amount: null,
            livemode: false,
            lookup_key: null,
            metadata: {},
            nickname: "Standard Monthly",
            product: "prod_NWjs8kKbJWmuuc",
            recurring: {
              aggregate_usage: null,
              interval: "month",
              interval_count: 1,
              trial_period_days: null,
              usage_type: "licensed",
            },
            tax_behavior: "unspecified",
            tiers_mode: null,
            transform_quantity: null,
            type: "recurring",
            unit_amount: 1000,
            unit_amount_decimal: "1000",
          },
          quantity: 1,
          subscription: "sub_1MowQVLkdIwHu7ixeRlqHVzs",
          tax_rates: [],
        },
      ],
      has_more: false,
      url: "/v1/subscription_items?subscription=sub_1MowQVLkdIwHu7ixeRlqHVzs",
    },
    latest_invoice: "in_1MowQVLkdIwHu7ixuzkSPfKd",
    livemode: false,
    metadata: {},
    next_pending_invoice_item_invoice: null,
    on_behalf_of: null,
    pause_collection: null,
    payment_settings: {
      payment_method_options: null,
      payment_method_types: null,
      save_default_payment_method: "off",
    },
    pending_invoice_item_interval: null,
    pending_setup_intent: null,
    pending_update: null,
    schedule: null,
    start_date: 1716397800,
    status: "active",
    test_clock: null,
    transfer_data: null,
    trial_end: null,
    trial_settings: {
      end_behavior: {
        missing_payment_method: "create_invoice",
      },
    },
    trial_start: null,
  } as unknown,
};




export const createSubscriptionExamplePayload = getSubscriptionExamplePayload;




export const updateSubscriptionExamplePayload = getSubscriptionExamplePayload;









export const deleteSubscriptionExamplePayload = {
  data: {
    ...(getSubscriptionExamplePayload.data as Record<string, unknown>),
    status: "canceled",
    canceled_at: 1716401400,
    ended_at: 1716401400,
    cancellation_details: {
      comment: null,
      feedback: null,
      reason: "cancellation_requested",
    },
  } as unknown,
};






export const listSubscriptionsExamplePayload = {
  data: {
    object: "list",
    data: [getSubscriptionExamplePayload.data],
    has_more: false,
    url: "/v1/subscriptions",
  } as unknown,
};
