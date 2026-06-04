





export const getPriceExamplePayload = {
  data: {
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
  } as unknown,
};




export const createPriceExamplePayload = getPriceExamplePayload;




export const updatePriceExamplePayload = getPriceExamplePayload;






export const listPricesExamplePayload = {
  data: {
    object: "list",
    data: [getPriceExamplePayload.data],
    has_more: false,
    url: "/v1/prices",
  } as unknown,
};
