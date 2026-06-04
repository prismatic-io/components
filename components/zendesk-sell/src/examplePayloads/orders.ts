






const orderData = {
  id: 5612840,
  deal_id: 8150614,
  discount: 10,
  created_at: "2025-01-12T08:30:45Z",
  updated_at: "2025-01-12T08:30:45Z",
};


export const createOrderExamplePayload = {
  data: {
    data: orderData,
    meta: {
      type: "order",
    },
  },
};


export const getOrderExamplePayload = {
  data: {
    data: orderData,
    meta: {
      type: "order",
    },
  },
};


export const updateOrderExamplePayload = {
  data: {
    data: orderData,
    meta: {
      type: "order",
    },
  },
};


export const listOrderExamplePayload = {
  data: {
    items: [
      {
        data: orderData,
        meta: {
          type: "order",
        },
      },
    ],
    meta: {
      type: "collection",
      count: 1,
      links: {
        self: "https://api.getbase.com/v2/orders?page=1&per_page=25",
        first_page: "https://api.getbase.com/v2/orders?page=1&per_page=25",
        next_page: null,
      },
    },
  },
};


export const deleteOrderExamplePayload = {
  data: null,
};







export const getOrdersStreamExamplePayload = {
  data: {
    items: [
      {
        data: {
          id: 5612840,
        },
        meta: {
          type: "order",
          sync: {
            event_type: "created",
            ack_key: "Order-5612840-1",
            revision: 1,
          },
        },
      },
    ],
    meta: {
      type: "collection",
      count: 1,
      links: {},
    },
  },
};
