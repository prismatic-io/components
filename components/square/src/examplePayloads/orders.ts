










export const searchOrdersExamplePayload = {
  data: {
    orders: [
      {
        id: "CAISENgvhpdP05f1DWG9H8yMn4kZY",
        location_id: "L88917AVBK2S5",
        line_items: [
          {
            uid: "8uSwfzvUPRF6AiX",
            name: "New York Strip Steak",
            quantity: "1",
            base_price_money: {
              amount: 1599,
              currency: "USD",
            },
            gross_sales_money: {
              amount: 1599,
              currency: "USD",
            },
            total_tax_money: {
              amount: 0,
              currency: "USD",
            },
            total_discount_money: {
              amount: 0,
              currency: "USD",
            },
            total_money: {
              amount: 1599,
              currency: "USD",
            },
          },
        ],
        fulfillments: [
          {
            uid: "zQtAx35fPVLLx6V",
            type: "PICKUP",
            state: "PROPOSED",
            pickup_details: {
              recipient: {
                display_name: "John Doe",
                phone_number: "+1-415-555-1234",
              },
              schedule_type: "SCHEDULED",
              pickup_at: "2023-05-10T18:00:00Z",
            },
          },
        ],
        state: "OPEN",
        version: 1,
        total_money: {
          amount: 1599,
          currency: "USD",
        },
        total_tax_money: {
          amount: 0,
          currency: "USD",
        },
        total_discount_money: {
          amount: 0,
          currency: "USD",
        },
        total_tip_money: {
          amount: 0,
          currency: "USD",
        },
        total_service_charge_money: {
          amount: 0,
          currency: "USD",
        },
        created_at: "2023-05-08T14:30:00.000Z",
        updated_at: "2023-05-08T14:30:00.000Z",
      },
    ],
    cursor: "5Ekfj4JXW8dJxBSXVYEIWkOcW9h8PBDyQh...",
  },
};






export const retrieveOrderExamplePayload = {
  data: {
    order: {
      id: "CAISENgvhpdP05f1DWG9H8yMn4kZY",
      location_id: "L88917AVBK2S5",
      line_items: [
        {
          uid: "8uSwfzvUPRF6AiX",
          name: "New York Strip Steak",
          quantity: "1",
          catalog_object_id: "W62UWFY35CWMYGVWK6TWJDNI",
          catalog_version: 1479335124878,
          base_price_money: {
            amount: 1599,
            currency: "USD",
          },
          gross_sales_money: {
            amount: 1599,
            currency: "USD",
          },
          total_tax_money: {
            amount: 0,
            currency: "USD",
          },
          total_discount_money: {
            amount: 0,
            currency: "USD",
          },
          total_money: {
            amount: 1599,
            currency: "USD",
          },
        },
      ],
      fulfillments: [
        {
          uid: "zQtAx35fPVLLx6V",
          type: "PICKUP",
          state: "PROPOSED",
          pickup_details: {
            recipient: {
              customer_id: "JDKYHBWT1D4F8MFH63DBMEN8Y4",
              display_name: "John Doe",
              email_address: "john.doe@example.com",
              phone_number: "+1-415-555-1234",
            },
            schedule_type: "SCHEDULED",
            pickup_at: "2023-05-10T18:00:00Z",
            pickup_window_duration: "PT30M",
          },
        },
      ],
      state: "OPEN",
      version: 1,
      total_money: {
        amount: 1599,
        currency: "USD",
      },
      total_tax_money: {
        amount: 0,
        currency: "USD",
      },
      total_discount_money: {
        amount: 0,
        currency: "USD",
      },
      total_tip_money: {
        amount: 0,
        currency: "USD",
      },
      total_service_charge_money: {
        amount: 0,
        currency: "USD",
      },
      created_at: "2023-05-08T14:30:00.000Z",
      updated_at: "2023-05-08T14:30:00.000Z",
      source: {
        name: "My App",
      },
    },
  },
};






export const batchRetrieveOrdersExamplePayload = {
  data: {
    orders: [
      {
        id: "CAISENgvhpdP05f1DWG9H8yMn4kZY",
        location_id: "L88917AVBK2S5",
        state: "OPEN",
        version: 1,
        created_at: "2023-05-08T14:30:00.000Z",
        updated_at: "2023-05-08T14:30:00.000Z",
      },
    ],
  },
};






export const createOrderExamplePayload = {
  data: {
    order: {
      id: "DAISENgvhpdP05f1DWG9H8yMn4kZZ",
      location_id: "L88917AVBK2S5",
      line_items: [
        {
          uid: "9vSwfzvUPRF6AiY",
          name: "Cheeseburger",
          quantity: "2",
          base_price_money: {
            amount: 899,
            currency: "USD",
          },
          gross_sales_money: {
            amount: 1798,
            currency: "USD",
          },
          total_tax_money: {
            amount: 0,
            currency: "USD",
          },
          total_discount_money: {
            amount: 0,
            currency: "USD",
          },
          total_money: {
            amount: 1798,
            currency: "USD",
          },
        },
      ],
      state: "OPEN",
      version: 1,
      total_money: {
        amount: 1798,
        currency: "USD",
      },
      created_at: "2023-05-09T10:15:00.000Z",
      updated_at: "2023-05-09T10:15:00.000Z",
    },
  },
};






export const updateOrderExamplePayload = {
  data: {
    order: {
      id: "CAISENgvhpdP05f1DWG9H8yMn4kZY",
      location_id: "L88917AVBK2S5",
      line_items: [
        {
          uid: "8uSwfzvUPRF6AiX",
          name: "New York Strip Steak",
          quantity: "2",
          base_price_money: {
            amount: 1599,
            currency: "USD",
          },
          gross_sales_money: {
            amount: 3198,
            currency: "USD",
          },
          total_money: {
            amount: 3198,
            currency: "USD",
          },
        },
      ],
      state: "OPEN",
      version: 2,
      total_money: {
        amount: 3198,
        currency: "USD",
      },
      created_at: "2023-05-08T14:30:00.000Z",
      updated_at: "2023-05-08T15:00:00.000Z",
    },
  },
};






export const cloneOrderExamplePayload = {
  data: {
    order: {
      id: "EAISENgvhpdP05f1DWG9H8yMn4kZA",
      location_id: "L88917AVBK2S5",
      line_items: [
        {
          uid: "0wTxgzvUPRF6AiZ",
          name: "New York Strip Steak",
          quantity: "1",
          base_price_money: {
            amount: 1599,
            currency: "USD",
          },
          gross_sales_money: {
            amount: 1599,
            currency: "USD",
          },
          total_money: {
            amount: 1599,
            currency: "USD",
          },
        },
      ],
      state: "DRAFT",
      version: 1,
      total_money: {
        amount: 1599,
        currency: "USD",
      },
      created_at: "2023-05-09T11:00:00.000Z",
      updated_at: "2023-05-09T11:00:00.000Z",
    },
  },
};
