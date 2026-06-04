export const eventsPayload = [
  {
    event_name: "Purchase",
    event_time: 1633552688,
    event_id: "event.id.123",
    event_source_url: "http://jaspers-market.com/product/123",
    action_source: "website",
    user_data: {
      client_ip_address: "192.19.9.9",
      client_user_agent: "test ua",
      em: ["309a0a5c3e211326ae75ca18196d301a9bdbd1a882a4d2569511033da23f0abd"],
      ph: [
        "254aa248acb47dd654ca3ea53f48c2c26d641d23d7e2e93a1ec56258df7674c4",
        "6f4fcb9deaeadc8f9746ae76d97ce1239e98b404efe5da3ee0b7149740f89ad6",
      ],
      fbc: "fb.1.1554763741205.AbCdEfGhIjKlMnOpQrStUvWxYz1234567890",
      fbp: "fb.1.1558571054389.1098115397",
    },
    custom_data: {
      value: 100.2,
      currency: "USD",
      content_ids: ["product.id.123"],
      content_type: "product",
    },
    opt_out: false,
  },
  {
    event_name: "Purchase",
    event_time: 1633552688,
    user_data: {
      client_ip_address: "192.88.9.9",
      client_user_agent: "test ua2",
    },
    custom_data: {
      value: 50.5,
      currency: "USD",
    },
    opt_out: false,
  },
];

export const moreDataExample = {
  event_id: "event.id.123",
  event_source_url: "http://jaspers-market.com",
  opt_out: false,
};

export const customDataExample = {
  currency: "usd",
  value: 123.45,
  contents: [
    {
      id: "product123",
      quantity: 1,
      delivery_category: "home_delivery",
    },
  ],
};

export const userDataExample = {
  em: ["309a0a5c3e211326ae75ca18196d301a9bdbd1a882a4d2569511033da23f0abd"],
  ph: [
    "254aa248acb47dd654ca3ea53f48c2c26d641d23d7e2e93a1ec56258df7674c4",
    "6f4fcb9deaeadc8f9746ae76d97ce1239e98b404efe5da3ee0b7149740f89ad6",
  ],
  client_ip_address: "123.123.123.123",
  client_user_agent: "$CLIENT_USER_AGENT",
  fbc: "fb.1.1554763741205.AbCdEfGhIjKlMnOpQrStUvWxYz1234567890",
  fbp: "fb.1.1558571054389.1098115397",
};
