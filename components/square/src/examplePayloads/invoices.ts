










export const listInvoicesExamplePayload = {
  data: {
    invoices: [
      {
        id: "gt2j3hd5ci0b3lv",
        version: 0,
        location_id: "L88917AVBK2S5",
        order_id: "CAISENgvhpdP05f1DWG9H8yMn4kZY",
        primary_recipient: {
          customer_id: "JDKYHBWT1D4F8MFH63DBMEN8Y4",
          given_name: "Amelia",
          family_name: "Earhart",
          email_address: "amelia.earhart@example.com",
        },
        payment_requests: [
          {
            uid: "2da7964f-f3d2-4f43-81e8-5aa220bf3355",
            request_type: "BALANCE",
            due_date: "2030-01-24",
            computed_amount_money: {
              amount: 10000,
              currency: "USD",
            },
            total_completed_amount_money: {
              amount: 0,
              currency: "USD",
            },
          },
        ],
        invoice_number: "000001",
        title: "Event Planning Services",
        description: "We appreciate your business!",
        scheduled_at: "2030-01-13T10:00:00Z",
        public_url: "https://squareup.com/pay-invoice/gt2j3hd5ci0b3lv",
        status: "DRAFT",
        timezone: "America/Los_Angeles",
        created_at: "2023-05-01T15:00:00Z",
        updated_at: "2023-05-01T15:00:00Z",
      },
    ],
    cursor: "MTY1Njk2OTU5NjEzMjAwMDAwMA==",
  },
};







export const searchInvoicesExamplePayload = listInvoicesExamplePayload;






export const getInvoiceExamplePayload = {
  data: {
    invoice: {
      id: "gt2j3hd5ci0b3lv",
      version: 0,
      location_id: "L88917AVBK2S5",
      order_id: "CAISENgvhpdP05f1DWG9H8yMn4kZY",
      primary_recipient: {
        customer_id: "JDKYHBWT1D4F8MFH63DBMEN8Y4",
        given_name: "Amelia",
        family_name: "Earhart",
        email_address: "amelia.earhart@example.com",
        phone_number: "+1-212-555-4240",
      },
      payment_requests: [
        {
          uid: "2da7964f-f3d2-4f43-81e8-5aa220bf3355",
          request_type: "BALANCE",
          due_date: "2030-01-24",
          computed_amount_money: {
            amount: 10000,
            currency: "USD",
          },
          total_completed_amount_money: {
            amount: 0,
            currency: "USD",
          },
        },
      ],
      invoice_number: "000001",
      title: "Event Planning Services",
      description: "We appreciate your business!",
      scheduled_at: "2030-01-13T10:00:00Z",
      public_url: "https://squareup.com/pay-invoice/gt2j3hd5ci0b3lv",
      status: "DRAFT",
      timezone: "America/Los_Angeles",
      created_at: "2023-05-01T15:00:00Z",
      updated_at: "2023-05-01T15:00:00Z",
      accepted_payment_methods: {
        card: true,
        square_gift_card: false,
        bank_account: false,
        buy_now_pay_later: false,
        cash_app_pay: false,
      },
    },
  },
};






export const updateInvoiceExamplePayload = {
  data: {
    invoice: {
      id: "gt2j3hd5ci0b3lv",
      version: 1,
      location_id: "L88917AVBK2S5",
      order_id: "CAISENgvhpdP05f1DWG9H8yMn4kZY",
      primary_recipient: {
        customer_id: "JDKYHBWT1D4F8MFH63DBMEN8Y4",
        given_name: "Amelia",
        family_name: "Earhart",
        email_address: "amelia.earhart@example.com",
      },
      payment_requests: [
        {
          uid: "2da7964f-f3d2-4f43-81e8-5aa220bf3355",
          request_type: "BALANCE",
          due_date: "2030-01-25",
          computed_amount_money: {
            amount: 12000,
            currency: "USD",
          },
          total_completed_amount_money: {
            amount: 0,
            currency: "USD",
          },
        },
      ],
      invoice_number: "000001",
      title: "Event Planning Services - Updated",
      description: "Updated invoice details",
      status: "DRAFT",
      timezone: "America/Los_Angeles",
      created_at: "2023-05-01T15:00:00Z",
      updated_at: "2023-05-02T10:00:00Z",
    },
  },
};






export const publishInvoiceExamplePayload = {
  data: {
    invoice: {
      id: "gt2j3hd5ci0b3lv",
      version: 1,
      location_id: "L88917AVBK2S5",
      order_id: "CAISENgvhpdP05f1DWG9H8yMn4kZY",
      primary_recipient: {
        customer_id: "JDKYHBWT1D4F8MFH63DBMEN8Y4",
      },
      payment_requests: [
        {
          uid: "2da7964f-f3d2-4f43-81e8-5aa220bf3355",
          request_type: "BALANCE",
          due_date: "2030-01-24",
          computed_amount_money: {
            amount: 10000,
            currency: "USD",
          },
        },
      ],
      invoice_number: "000001",
      title: "Event Planning Services",
      public_url: "https://squareup.com/pay-invoice/gt2j3hd5ci0b3lv",
      status: "UNPAID",
      timezone: "America/Los_Angeles",
      created_at: "2023-05-01T15:00:00Z",
      updated_at: "2023-05-02T11:00:00Z",
    },
  },
};






export const cancelInvoiceExamplePayload = {
  data: {
    invoice: {
      id: "gt2j3hd5ci0b3lv",
      version: 2,
      location_id: "L88917AVBK2S5",
      status: "CANCELED",
      created_at: "2023-05-01T15:00:00Z",
      updated_at: "2023-05-03T09:00:00Z",
    },
  },
};







export const deleteInvoiceExamplePayload = {
  data: {},
};
